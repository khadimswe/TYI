"""
Auth routes – login & signup.
Mirrors the n8n Login webhook flow:
  Login → extract identifier/password → normalize phone → query accountInfo
  → check if user found → compare password → respond
"""
import re
from fastapi import APIRouter, HTTPException
import bcrypt

from app.db import get_supabase
from app.models import (
    LoginRequest, LoginResponse,
    SignupRequest, SignupResponse,
    ScheduleItem, TutoringApprovalItem, TutoringClassItem,
)

router = APIRouter(prefix="/api/auth", tags=["auth"])

# ── helpers ──────────────────────────────────────────────────
_PHONE_RE = re.compile(r"^\+?\d[\d\-\(\)\s]{6,}\d$")   # loose phone pattern
_EMAIL_RE = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")  # simple email check


def _normalize_phone(raw: str) -> str:
    """Strip everything except digits from a phone string."""
    return "".join(c for c in raw if c.isdigit())


def _looks_like_phone(raw: str) -> bool:
    """Return True if *raw* looks like a phone number (7+ digits)."""
    return bool(_PHONE_RE.match(raw)) and len(_normalize_phone(raw)) >= 7


def _looks_like_email(raw: str) -> bool:
    return bool(_EMAIL_RE.match(raw))


def _fetch_user_records(sb, user_id: str) -> dict:
    """
    Fetch the user's schedule, tutoring approval, and tutoring classes
    from Supabase. Returns them as lists ready for the response model.
    """
    # ── calendar_info (schedule) ─────────────────────────────
    sched_result = (
        sb.table("calendar_info")
        .select("id, assignment, type, details, start_date, end_date")
        .eq("user_id", user_id)
        .order("start_date")
        .execute()
    )
    schedule = [ScheduleItem(**r) for r in (sched_result.data or [])]

    # ── tutoring_approval ────────────────────────────────────
    approval_result = (
        sb.table("tutoring_approval")
        .select("id, name, degree, current_gpa, approved_gpa, course_taken_titles, course_taken_grades")
        .eq("user_id", user_id)
        .order("created_at", desc=True)
        .execute()
    )
    tutoring_approval = [TutoringApprovalItem(**r) for r in (approval_result.data or [])]

    # ── tutoring_classes ─────────────────────────────────────
    classes_result = (
        sb.table("tutoring_classes")
        .select("id, name, class_name, class_grade, can_tutor")
        .eq("user_id", user_id)
        .order("class_name")
        .execute()
    )
    tutoring_classes = [TutoringClassItem(**r) for r in (classes_result.data or [])]

    return {
        "schedule": schedule,
        "tutoring_approval": tutoring_approval,
        "tutoring_classes": tutoring_classes,
    }


# ── Login ────────────────────────────────────────────────────
@router.post("/login", response_model=LoginResponse)
async def login(body: LoginRequest):
    """
    Accepts identifier (username / email / phone) + password.
    Looks up the user in account_info, then verifies the password hash.

    The identifier is inspected to decide which column(s) to query:
      • contains '@'      → query by email
      • 7+ digits         → query by phone_number
      • otherwise / always → query by username
    Multiple conditions are OR-ed so the user doesn't have to think
    about which type of identifier they're entering.
    """
    sb = get_supabase()
    raw = body.identifier.strip()

    if not raw or not body.password.strip():
        return LoginResponse(success=False, message="Email/phone/username and password are required")

    # ── Build dynamic OR filter ──────────────────────────────
    conditions: list[str] = []

    # Always try username (case-insensitive)
    conditions.append(f"username.ilike.{raw}")

    # If it looks like an email, also match on email
    if _looks_like_email(raw):
        conditions.append(f"email.ilike.{raw}")

    # If it looks like a phone number, also match on phone_number
    if _looks_like_phone(raw):
        digits = _normalize_phone(raw)
        conditions.append(f"phone_number.eq.{digits}")

    or_filter = ",".join(conditions)

    result = (
        sb.table("account_info")
        .select("id, username, email, phone_number, password_hash")
        .or_(or_filter)
        .limit(1)
        .execute()
    )

    if not result.data:
        return LoginResponse(success=False, message="Invalid credentials")

    user = result.data[0]

    # Guard against missing / empty hash (should not happen, but be safe)
    stored_hash = user.get("password_hash") or ""
    if not stored_hash:
        return LoginResponse(success=False, message="Invalid credentials")

    # Compare submitted password against stored bcrypt hash
    try:
        password_ok = bcrypt.checkpw(
            body.password.encode("utf-8"),
            stored_hash.encode("utf-8"),
        )
    except (ValueError, TypeError):
        # Corrupt hash in DB – treat as invalid
        return LoginResponse(success=False, message="Invalid credentials")

    if not password_ok:
        return LoginResponse(success=False, message="Invalid credentials")

    # ── Fetch related records (schedule, tutoring) ───────────
    records = _fetch_user_records(sb, user["id"])

    return LoginResponse(
        success=True,
        message="Login successful",
        user_id=user["id"],
        username=user["username"],
        email=user.get("email"),
        phone_number=user.get("phone_number"),
        schedule=records["schedule"],
        tutoring_approval=records["tutoring_approval"],
        tutoring_classes=records["tutoring_classes"],
    )


# ── Get user profile + records ───────────────────────────────
@router.get("/me/{user_id}", response_model=LoginResponse)
async def get_me(user_id: str):
    """
    Fetch account info + schedule + tutoring records for a user.
    Used by the frontend to refresh data after login without
    requiring the password again.
    """
    sb = get_supabase()

    result = (
        sb.table("account_info")
        .select("id, username, email, phone_number")
        .eq("id", user_id)
        .limit(1)
        .execute()
    )

    if not result.data:
        return LoginResponse(success=False, message="User not found")

    user = result.data[0]
    records = _fetch_user_records(sb, user["id"])

    return LoginResponse(
        success=True,
        message="OK",
        user_id=user["id"],
        username=user["username"],
        email=user.get("email"),
        phone_number=user.get("phone_number"),
        schedule=records["schedule"],
        tutoring_approval=records["tutoring_approval"],
        tutoring_classes=records["tutoring_classes"],
    )


# ── Signup ───────────────────────────────────────────────────
@router.post("/signup", response_model=SignupResponse)
async def signup(body: SignupRequest):
    """
    Creates a new account in account_info.
    Password is bcrypt-hashed before storage.
    User must supply at least an email OR a phone_number (or both).
    """
    sb = get_supabase()

    email = (body.email or "").strip().lower()
    phone = _normalize_phone(body.phone_number or "")
    username = body.username.strip().lower()

    # Must have at least one contact method
    if not email and not phone:
        return SignupResponse(success=False, message="Email or phone number is required")

    if not username:
        return SignupResponse(success=False, message="Username is required")

    # ── Check for duplicates (username, email, phone) ────────
    dup_conditions = [f"username.ilike.{username}"]
    if email:
        dup_conditions.append(f"email.ilike.{email}")
    if phone:
        dup_conditions.append(f"phone_number.eq.{phone}")

    existing = (
        sb.table("account_info")
        .select("id, username, email, phone_number")
        .or_(",".join(dup_conditions))
        .limit(1)
        .execute()
    )

    if existing.data:
        # Give a helpful message about *what* is taken
        row = existing.data[0]
        if (row.get("username") or "").lower() == username:
            return SignupResponse(success=False, message="Username already taken")
        if email and (row.get("email") or "").lower() == email:
            return SignupResponse(success=False, message="Email already registered")
        if phone and (row.get("phone_number") or "") == phone:
            return SignupResponse(success=False, message="Phone number already registered")
        return SignupResponse(success=False, message="Account already exists")

    hashed = bcrypt.hashpw(body.password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")

    row_data = {
        "username": username,
        "password_hash": hashed,
    }
    # Only set email / phone if provided (avoids UNIQUE constraint on empty strings)
    if email:
        row_data["email"] = email
    if phone:
        row_data["phone_number"] = phone

    insert = (
        sb.table("account_info")
        .insert(row_data)
        .execute()
    )

    if not insert.data:
        raise HTTPException(status_code=500, detail="Failed to create account")

    return SignupResponse(
        success=True,
        message="Account created",
        user_id=insert.data[0]["id"],
    )
