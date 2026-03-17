"""
TagYouAreIt backend – configuration loaded from environment.
"""
import os
from dotenv import load_dotenv

load_dotenv()


class Settings:
    SUPABASE_URL: str = os.getenv("SUPABASE_URL", "")
    SUPABASE_SERVICE_KEY: str = os.getenv("SUPABASE_SERVICE_KEY", "")
    OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY", "")
    FRONTEND_ORIGIN: str = os.getenv("FRONTEND_ORIGIN", "*")
    MIN_TUTOR_GPA: float = float(os.getenv("MIN_TUTOR_GPA", "3.0"))


settings = Settings()
