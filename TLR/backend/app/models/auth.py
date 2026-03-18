"""
Auth request / response schemas.
"""
from pydantic import BaseModel, Field
from typing import Optional


class LoginRequest(BaseModel):
    identifier: str = Field(..., description="Username, email, or phone")
    password: str


class LoginResponse(BaseModel):
    success: bool
    message: str
    user_id: Optional[str] = None
    username: Optional[str] = None


class SignupRequest(BaseModel):
    username: str
    email: str
    phone_number: Optional[str] = None
    password: str


class SignupResponse(BaseModel):
    success: bool
    message: str
    user_id: Optional[str] = None
