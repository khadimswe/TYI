"""
OpenAI service – mirrors the GPT-4.1-mini calls in the n8n workflow.
"""
from __future__ import annotations
import asyncio
import json
from openai import OpenAI
from app.config import settings
from app.models import TranscriptParsed, ScheduleParsed

_client: OpenAI | None = None


def _get_openai() -> OpenAI:
    global _client
    if _client is None:
        _client = OpenAI(api_key=settings.OPENAI_API_KEY)
    return _client


TRANSCRIPT_SYSTEM = (
    "You are a professional transcript analyzer. "
    "Do not hallucinate or make up input data. "
    "If you cannot find data for specific fields leave blank. "
    "Use your best judgement."
)

TRANSCRIPT_USER = """
Using the input provided below, extract and return a clean JSON object with this structure:

{{
  "StudentInformation_Name": "",
  "StudentInformation_CurrentProgram": "",
  "InstatutionCredit_CoursesTaken": [
    {{ "CourseTakenTitle": "", "CourseTakenGrade": "" }}
  ],
  "TotalInstitution_AttemptedHours": "",
  "TotalInstitution_PassedHours": "",
  "TotalInstitution_GPA": "",
  "CoursesInProgress_Title": []
}}

--- TRANSCRIPT TEXT ---
{text}
"""

SCHEDULE_SYSTEM = (
    "You are a professional class schedule analyzer. "
    "Do not hallucinate or make up input data. "
    "If you cannot find data for specific fields leave blank. "
    "Use your best judgement."
)

SCHEDULE_USER = """
Using the input provided below, extract and return a clean JSON object with this structure:

{{
  "assignments": [
    {{
      "assignment": "",
      "start_date": "",
      "due_date": "",
      "details": "",
      "type": ""
    }}
  ]
}}

--- SCHEDULE TEXT ---
{text}
"""


async def parse_transcript(text: str) -> TranscriptParsed:
    """Call GPT-4.1-mini to extract structured transcript data."""
    def _call():
        client = _get_openai()
        resp = client.chat.completions.create(
            model="gpt-4.1-mini",
            response_format={"type": "json_object"},
            messages=[
                {"role": "system", "content": TRANSCRIPT_SYSTEM},
                {"role": "user", "content": TRANSCRIPT_USER.format(text=text)},
            ],
        )
        return json.loads(resp.choices[0].message.content)

    raw = await asyncio.to_thread(_call)
    return TranscriptParsed(**raw)


async def parse_schedule(text: str) -> ScheduleParsed:
    """Call GPT-4.1-mini to extract structured schedule/calendar data."""
    def _call():
        client = _get_openai()
        resp = client.chat.completions.create(
            model="gpt-4.1-mini",
            response_format={"type": "json_object"},
            messages=[
                {"role": "system", "content": SCHEDULE_SYSTEM},
                {"role": "user", "content": SCHEDULE_USER.format(text=text)},
            ],
        )
        return json.loads(resp.choices[0].message.content)

    raw = await asyncio.to_thread(_call)
    return ScheduleParsed(**raw)
