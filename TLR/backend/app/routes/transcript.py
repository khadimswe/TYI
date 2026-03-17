"""
Transcript upload route.
Mirrors the n8n Transcript flow:
  Form submission → Extract PDF text → GPT-4.1-mini parse → 
  Code (cast numeric) → If GPA >= 3.0 → approvedForTutoring / deniedTutoring →
  strings to arrays → combining arrays → Split Courses → coursesTableGen →
  Insert into TutoringClasses
"""
from fastapi import APIRouter, UploadFile, File, Form, HTTPException

from app.config import settings
from app.db import get_supabase
from app.models import TranscriptUploadResponse
from app.services.pdf_service import extract_text_from_pdf
from app.services.openai_service import parse_transcript

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
    if not pdf.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are accepted")

    file_bytes = await pdf.read()
    text = extract_text_from_pdf(file_bytes)

    if not text.strip():
        raise HTTPException(status_code=422, detail="Could not extract text from PDF")

    # ── GPT parse (mirrors "Message a model" node) ──────────
    parsed = await parse_transcript(text)

    gpa = parsed.TotalInstitution_GPA or 0.0
    approved = gpa >= settings.MIN_TUTOR_GPA

    sb = get_supabase()

    # ── Write to tutoring_approval (mirrors approvedForTutoring / deniedTutoring) ──
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

    # ── If approved, write individual courses to tutoring_classes ──
    #    Mirrors: strings to arrays → combining arrays → Split Courses →
    #    coursesTableGen → approvedForTutoring1
    if approved and parsed.InstatutionCredit_CoursesTaken:
        rows = []
        for course in parsed.InstatutionCredit_CoursesTaken:
            grade = course.CourseTakenGrade.strip().upper()
            # Determine can_tutor: grade is A or B (mirrors the n8n "If gpa >= 3." check on grade)
            can_tutor = grade in ("A", "A+", "A-", "B", "B+")
            rows.append({
                "user_id": user_id,
                "name": parsed.StudentInformation_Name,
                "class_name": course.CourseTakenTitle,
                "class_grade": course.CourseTakenGrade,
                "can_tutor": can_tutor,
            })
        if rows:
            sb.table("tutoring_classes").insert(rows).execute()

    return TranscriptUploadResponse(
        success=True,
        message="Approved for tutoring!" if approved else "GPA below minimum – not approved for tutoring",
        approved=approved,
        gpa=gpa,
        courses_count=len(parsed.InstatutionCredit_CoursesTaken),
    )
