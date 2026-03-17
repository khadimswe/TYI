"""
Schedule upload route.
Mirrors the n8n Schedule flow:
  Form submission1 → Extract PDF → Upload to Drive → Merge1 →
  GPT-4.1-mini parse → Code (date ISO) → Insert row into CalandarInfo
"""
from fastapi import APIRouter, UploadFile, File, Form, HTTPException

from app.db import get_supabase
from app.models import ScheduleUploadResponse
from app.services.pdf_service import extract_text_from_pdf
from app.services.openai_service import parse_schedule

router = APIRouter(prefix="/api/schedule", tags=["schedule"])


@router.post("/upload", response_model=ScheduleUploadResponse)
async def upload_schedule(
    pdf: UploadFile = File(...),
    user_id: str = Form(...),
):
    """
    1. Extract text from the uploaded schedule PDF
    2. Send to GPT-4.1-mini for structured parsing
    3. Write each assignment to calendar_info
    """
    if not pdf.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are accepted")

    file_bytes = await pdf.read()
    text = extract_text_from_pdf(file_bytes)

    if not text.strip():
        raise HTTPException(status_code=422, detail="Could not extract text from PDF")

    # ── GPT parse (mirrors "Message a model1" node) ──────────
    parsed = await parse_schedule(text)

    sb = get_supabase()

    # ── Insert each assignment into calendar_info (mirrors "Insert row2") ──
    rows = []
    for a in parsed.assignments:
        rows.append({
            "user_id": user_id,
            "assignment": a.assignment,
            "type": a.type,
            "details": a.details,
            "start_date": a.start_date or None,
            "end_date": a.due_date or None,
        })

    if rows:
        sb.table("calendar_info").insert(rows).execute()

    return ScheduleUploadResponse(
        success=True,
        message=f"Parsed {len(rows)} assignments from schedule",
        assignments_count=len(rows),
    )
