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
):
    """
    1. Extract text from the uploaded PDF
    2. Send to GPT-4.1-mini for structured parsing
    3. Evaluate GPA against MIN_TUTOR_GPA
    4. Write to tutoring_approval
    5. If approved, split courses and write each to tutoring_classes
    """
    try:
        logger.info(f"📥 Transcript upload started: user_id={user_id}, filename={pdf.filename}")
        
        if not pdf.filename.lower().endswith(".pdf"):
            raise HTTPException(status_code=400, detail="Only PDF files are accepted")

        file_bytes = await pdf.read()
        logger.info(f"✅ PDF read: {len(file_bytes)} bytes")
        
        text = extract_text_from_pdf(file_bytes)
        logger.info(f"✅ Text extracted: {len(text)} chars")

        if not text.strip():
            raise HTTPException(status_code=422, detail="Could not extract text from PDF")

        # ── GPT parse (mirrors "Message a model" node) ──────────
        logger.info("🤖 Parsing transcript with GPT...")
        parsed = await parse_transcript(text)
        logger.info(f"✅ Parsed: {parsed.StudentInformation_Name}, GPA={parsed.TotalInstitution_GPA}")

        gpa = parsed.TotalInstitution_GPA or 0.0
        approved = gpa >= settings.MIN_TUTOR_GPA
        logger.info(f"📊 Approval decision: GPA {gpa} >= {settings.MIN_TUTOR_GPA}? {approved}")

        sb = get_supabase()
        logger.info("📡 Connected to Supabase")

        # ── Ensure test user exists (for development/testing) ──
        test_user_id = user_id
        if user_id == 'f47ac10b-58cc-4372-a567-0e02b2c3d479':
            # Check if user exists
            existing = sb.table("account_info").select("id").eq("id", user_id).execute()
            if not existing.data:
                logger.info("👤 Creating test user...")
                import bcrypt
                password_hash = bcrypt.hashpw(b"test_password", bcrypt.gensalt()).decode()
                sb.table("account_info").insert({
                    "id": user_id,
                    "username": "test_user",
                    "email": "test@example.com",
                    "password_hash": password_hash,
                }).execute()
                logger.info("✅ Test user created")
            else:
                logger.info("✅ Test user already exists")

        # ── Write to tutoring_approval (mirrors approvedForTutoring / deniedTutoring) ──
        course_titles = ", ".join(c.CourseTakenTitle for c in parsed.InstatutionCredit_CoursesTaken)
        course_grades = ", ".join(c.CourseTakenGrade for c in parsed.InstatutionCredit_CoursesTaken)

        logger.info(f"💾 Inserting tutoring_approval record...")
        sb.table("tutoring_approval").insert({
            "user_id": user_id,
            "name": parsed.StudentInformation_Name,
            "degree": parsed.StudentInformation_CurrentProgram,
            "current_gpa": float(gpa),
            "approved_gpa": approved,
            "course_taken_titles": course_titles,
            "course_taken_grades": course_grades,
        }).execute()
        logger.info(f"✅ tutoring_approval inserted")

        # ── If approved, write individual courses to tutoring_classes ──
        verified_courses = []
        if approved and parsed.InstatutionCredit_CoursesTaken:
            logger.info(f"🎓 Processing {len(parsed.InstatutionCredit_CoursesTaken)} courses...")
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
                logger.info(f"✅ tutoring_classes inserted: {len(rows)} courses")

        logger.info(f"✅ Upload complete: approved={approved}, GPA={gpa}")
        return TranscriptUploadResponse(
            success=True,
            message="Approved for tutoring!" if approved else "GPA below minimum – not approved for tutoring",
            approved=approved,
            gpa=gpa,
            courses_count=len(parsed.InstatutionCredit_CoursesTaken),
            verified_courses=verified_courses,
        )
        
    except Exception as e:
        logger.error(f"❌ Error during transcript upload: {str(e)}", exc_info=True)
        return TranscriptUploadResponse(
            success=False,
            message=f"Error: {str(e)}",
            approved=False,
            gpa=0.0,
            courses_count=0,
            verified_courses=[],
        )
