# n8n Workflow Reference Files

These JSON files are **reference exports** from the original n8n workflow
that defined the backend logic. They are split into one file per flow for
clarity.

Each file can be imported directly into n8n if needed, but the primary
backend now lives in `../app/` as a FastAPI application.

## Files

| File | Flow | Backend Endpoint |
|------|------|-----------------|
| `transcript-submission.json` | PDF upload → GPT parse → GPA check → approve/deny → split courses → insert | `POST /api/transcript/upload` |
| `schedule-submission.json` | PDF upload → GPT parse → format dates → insert calendar rows | `POST /api/schedule/upload` |
| `login-verification.json` | Webhook → extract fields → normalize phone → DB lookup → password verify → respond | `POST /api/auth/login` |

## Legacy

| File | Note |
|------|------|
| `TYI - Email Verification copy (1).json` | Original combined workflow with all 3 flows. Kept for reference; prefer the split files above. |
| `package.json` / `package-lock.json` | Old Node.js artifacts from initial n8n setup. Can be removed once the team confirms they aren't needed. |
