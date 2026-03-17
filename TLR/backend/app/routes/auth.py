"""
Auth routes – login & signup.
Mirrors the n8n Login webhook flow:
  Login → extract identifier/password → normalize phone → query accountInfo
  → check if user found → compare password → respond
"""
from fastapi import APIRouter, HTTPException
import bcrypt

from app.db import get_supabase
from app.models import (
    LoginRequest, LoginResponse,
    SignupRequest, SignupResponse,
)

router = APIRouter(prefix="/api/auth", tags=["auth"])


# ── Login ────────────────────────────────────────────────────
@router.post("/login", response_model=LoginResponse)
async def login(body: LoginRequest):
    """
    Accepts identifier (username / email / phone) + password.
    Looks up the user in account_info, then verifies the password hash.
    """
    sb = get_supabase()
    raw = body.identifier.strip()
    phone_digits = "".join(c for c in raw if c.isdigit())

    # Query by username OR email OR phone (case-insensitive for text)
    result = (
        sb.table("account_info")
        .select("id, username, email, phone_number, password_hash")
        .or_(
            f"username.ilike.{raw},"
            f"email.ilike.{raw},"
            f"phone_number.eq.{phone_digits}"
        )
        .limit(1)
        .execute()
    )

    if not result.data:
        return LoginResponse(success=False, message="Invalid credentials")

    user = result.data[0]

    # Compare submitted password against stored bcrypt hash
    if not bcrypt.checkpw(
        body.password.encode("utf-8"),
        user["password_hash"].encode("utf-8"),
    ):
        return LoginResponse(success=False, message="Invalid credentials")

    return LoginResponse(
        success=True,
        message="Login successful",
        user_id=user["id"],
        username=user["username"],
    )


# ── Signup ───────────────────────────────────────────────────
@router.post("/signup", response_model=SignupResponse)
async def signup(body: SignupRequest):
    """
    Creates a new account in account_info.
    Password is bcrypt-hashed before storage.
    """
    sb = get_supabase()

    # Check for existing username or email
    existing = (
        sb.table("account_info")
        .select("id")
        .or_(
            f"username.ilike.{body.username},"
            f"email.ilike.{body.email}"
        )
        .limit(1)
        .execute()
    )
    if existing.data:
        return SignupResponse(success=False, message="Username or email already exists")

    hashed = bcrypt.hashpw(body.password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")

    insert = (
        sb.table("account_info")
        .insert({
            "username": body.username.lower(),
            "email": body.email.lower(),
            "phone_number": body.phone_number or "",
            "password_hash": hashed,
        })
        .execute()
    )

    if not insert.data:
        raise HTTPException(status_code=500, detail="Failed to create account")

    return SignupResponse(
        success=True,
        message="Account created",
        user_id=insert.data[0]["id"],
    )
