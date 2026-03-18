"""
Schedule parsing & upload schemas.
"""
from __future__ import annotations
from pydantic import BaseModel
from typing import Optional


class AssignmentRecord(BaseModel):
    assignment: str = ""
    start_date: Optional[str] = None
    due_date: Optional[str] = None
    details: str = ""
    type: str = ""


class ScheduleParsed(BaseModel):
    """Structured output returned by GPT after parsing a schedule PDF."""
    assignments: list[AssignmentRecord] = []


class ScheduleUploadResponse(BaseModel):
    success: bool
    message: str
    assignments_count: Optional[int] = None
