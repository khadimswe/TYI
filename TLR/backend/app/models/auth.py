"""
Auth request / response schemas.
"""
from pydantic import BaseModel, Field
from typing import Optional


class LoginRequest(BaseModel):
    identifier: str = Field(..., description="Username, email, or phone")
    password: str


# ── Nested records returned inside the login response ────────

class ScheduleItem(BaseModel):
    """One row from calendar_info."""
    id: str
    assignment: str
    type: Optional[str] = None
    details: Optional[str] = None
    start_date: Optional[str] = None
    end_date: Optional[str] = None


class TutoringApprovalItem(BaseModel):
    """One row from tutoring_approval."""
    id: str
    name: str
    degree: Optional[str] = None
    current_gpa: Optional[float] = None
    approved_gpa: Optional[bool] = None
    course_taken_titles: Optional[str] = None
    course_taken_grades: Optional[str] = None


class TutoringClassItem(BaseModel):
    """One row from tutoring_classes."""
    id: str
    name: str
    class_name: str
    class_grade: Optional[str] = None
    can_tutor: Optional[bool] = None


# ── Responses ────────────────────────────────────────────────

class LoginResponse(BaseModel):
    success: bool
    message: str
    user_id: Optional[str] = None
    username: Optional[str] = None
    email: Optional[str] = None
    phone_number: Optional[str] = None
    # Related records (populated on successful login)
    schedule: Optional[list[ScheduleItem]] = None
    tutoring_approval: Optional[list[TutoringApprovalItem]] = None
    tutoring_classes: Optional[list[TutoringClassItem]] = None


class SignupRequest(BaseModel):
    username: str
    email: Optional[str] = None
    phone_number: Optional[str] = None
    password: str


class SignupResponse(BaseModel):
    success: bool
    message: str
    user_id: Optional[str] = None
