"""
Models package – re-exports all schemas for easy imports.

Usage:
    from app.models import LoginRequest, TranscriptUploadResponse, ...
"""
from app.models.auth import (
    LoginRequest,
    LoginResponse,
    SignupRequest,
    SignupResponse,
    ScheduleItem,
    TutoringApprovalItem,
    TutoringClassItem,
)
from app.models.transcript import (
    CourseRecord,
    TranscriptParsed,
    TranscriptUploadResponse,
)
from app.models.schedule import (
    AssignmentRecord,
    ScheduleParsed,
    ScheduleUploadResponse,
)

__all__ = [
    # Auth
    "LoginRequest",
    "LoginResponse",
    "SignupRequest",
    "SignupResponse",
    "ScheduleItem",
    "TutoringApprovalItem",
    "TutoringClassItem",
    # Transcript
    "CourseRecord",
    "TranscriptParsed",
    "TranscriptUploadResponse",
    # Schedule
    "AssignmentRecord",
    "ScheduleParsed",
    "ScheduleUploadResponse",
]
