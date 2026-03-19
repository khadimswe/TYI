"""
Transcript upload route.
Mirrors the n8n Transcript flow:
  Form submission → Extract PDF text → GPT-4.1-mini parse → 
  Code (cast numeric) → If GPA >= 3.0 → approvedForTutoring / deniedTutoring →
  strings to arrays → combining arrays → Split Courses → coursesTableGen →
  Insert into TutoringClasses
"""
import logging
from fastapi import APIRouter, UploadFile, File, Form, HTTPException

from app.config import settings
from app.db import get_supabase
from app.models import TranscriptUploadResponse
from app.services.pdf_service import extract_text_from_pdf
from app.services.openai_service import parse_transcript

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/transcript", tags=["transcript"])


@router.post("/upload", response_model=TranscriptUploadResponse)
async def upload_transcript(
    pdf: UploadFile = File(...),
    user_id: str = Form(...),
    email: str = Form(""),
    phone_number: str = Form(""),
    username: str = Form(""),
    password: str = Form(""),
):
    """
    1. Create the user's account_info row (if it doesn't exist yet)
    2. Extract text from the uploaded PDF
    3. Send to GPT-4.1-mini for structured parsing
    4. Evaluate GPA against MIN_TUTOR_GPA
    5. Write to tutoring_approval
    6. If approved, split courses and write each to tutoring_classes
    """
    try:
        if not pdf.filename.lower().endswith(".pdf"):
            raise HTTPException(status_code=400, detail="Only PDF files are accepted")

        sb = get_supabase()

        # ── Ensure account_info row exists ───────────────────────────
        logger.info("👤 Checking if user %s exists...", user_id)
        existing = sb.table("account_info").select("id").eq("id", user_id).execute()

        if not existing.data:
            if (not (email or phone_number) or not username or not password):
                raise HTTPException(
                    status_code=400,
                    detail="New user requires (email OR phone_number), username, and password",
                )
            import bcrypt
            password_hash = bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()
            contact = email or phone_number
            logger.info("📝 Creating account for %s (%s)...", username, contact)
            sb.table("account_info").insert({
                "id": user_id,
                "username": username,
                "email": email,
                "phone_number": phone_number,
                "password_hash": password_hash,
            }).execute()
            logger.info("✅ Account created for %s", username)
        else:
            logger.info("✅ User already exists, skipping account creation")

        # ── Extract PDF text ─────────────────────────────────────────
        logger.info("📄 Reading PDF...")
        file_bytes = await pdf.read()
        text = extract_text_from_pdf(file_bytes)

        if not text.strip():
            raise HTTPException(status_code=422, detail="Could not extract text from PDF")

        # ── GPT parse (mirrors "Message a model" node) ──────────────
        logger.info("🤖 Sending to GPT for parsing...")
        parsed = await parse_transcript(text)

        gpa = parsed.TotalInstitution_GPA or 0.0
        approved = gpa >= settings.MIN_TUTOR_GPA
        logger.info("📊 GPA: %.2f — %s", gpa, "APPROVED" if approved else "DENIED")

        # ── Write to tutoring_approval ───────────────────────────────
        course_titles = ", ".join(c.CourseTakenTitle for c in parsed.InstatutionCredit_CoursesTaken)
        course_grades = ", ".join(c.CourseTakenGrade for c in parsed.InstatutionCredit_CoursesTaken)

        sb.table("tutoring_approval").insert({
            "user_id": user_id,
            "name": parsed.StudentInformation_Name,
            "degree": parsed.StudentInformation_CurrentProgram,
            "current_gpa": gpa,
            "approved_gpa": approved,
            "course_taken_titles": course_titles,
            "course_taken_grades": course_grades,
        }).execute()
        logger.info("💾 Wrote tutoring_approval row")

        # ── If approved, write individual courses to tutoring_classes ──
        verified_courses = []
        if approved and parsed.InstatutionCredit_CoursesTaken:
            rows = []
            for course in parsed.InstatutionCredit_CoursesTaken:
                grade = course.CourseTakenGrade.strip().upper()
                can_tutor = grade in ("A", "A+", "A-", "B", "B+")
                rows.append({
                    "user_id": user_id,
                    "name": parsed.StudentInformation_Name,
                    "class_name": course.CourseTakenTitle,
                    "class_grade": course.CourseTakenGrade,
                    "can_tutor": can_tutor,
                })
                if can_tutor:
                    verified_courses.append(course.CourseTakenTitle)
            if rows:
                sb.table("tutoring_classes").insert(rows).execute()
                logger.info("💾 Wrote %d tutoring_classes rows", len(rows))

        logger.info("✅ Transcript upload complete for user %s", user_id)
        return TranscriptUploadResponse(
            success=True,
            message="Approved for tutoring!" if approved else "GPA below minimum – not approved for tutoring",
            approved=approved,
            gpa=gpa,
            courses_count=len(parsed.InstatutionCredit_CoursesTaken),
        )

    except HTTPException:
        raise
    except Exception as e:
        logger.exception("❌ Transcript upload failed: %s", str(e))
        return TranscriptUploadResponse(
            success=False,
            message=f"Server error: {str(e)}",
        )
