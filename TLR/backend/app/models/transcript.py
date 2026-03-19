"""
Transcript parsing & upload schemas.
"""
from __future__ import annotations
from pydantic import BaseModel
from typing import Optional


class CourseRecord(BaseModel):
    CourseTakenTitle: str = ""
    CourseTakenGrade: str = ""


class TranscriptParsed(BaseModel):
    """Structured output returned by GPT after parsing a transcript PDF."""
    StudentInformation_Name: str = ""
    StudentInformation_CurrentProgram: str = ""
    InstatutionCredit_CoursesTaken: list[CourseRecord] = []
    TotalInstitution_AttemptedHours: Optional[float] = None
    TotalInstitution_PassedHours: Optional[float] = None
    TotalInstitution_GPA: Optional[float] = None
    CoursesInProgress_Title: list[str] = []


class TranscriptUploadResponse(BaseModel):
    success: bool
    message: str
    approved: Optional[bool] = None
    gpa: Optional[float] = None
    courses_count: Optional[int] = None
    verified_courses: list[str] = []
