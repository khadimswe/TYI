# TagYouAreIt – Backend API

FastAPI backend that replaces the n8n workflow logic with Python endpoints the React Native frontend can call via webhooks, connected to **Supabase** for persistence and **OpenAI** for PDF parsing.

## Architecture

```
Frontend (React Native / Expo)
      │
      ▼  HTTP / webhooks
┌─────────────────────────┐
│   FastAPI  (this repo)  │
│  /api/auth/login        │──▶ Supabase  account_info
│  /api/auth/signup       │──▶ Supabase  account_info
│  /api/transcript/upload │──▶ OpenAI → Supabase  tutoring_approval + tutoring_classes
│  /api/schedule/upload   │──▶ OpenAI → Supabase  calendar_info
└─────────────────────────┘
```

## Endpoints (webhooks)

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/auth/login` | Login with username/email/phone + password |
| POST | `/api/auth/signup` | Create a new account |
| POST | `/api/transcript/upload` | Upload transcript PDF → parse → GPA check → approve/deny tutoring |
| POST | `/api/schedule/upload` | Upload schedule PDF → parse → store assignments |
| GET  | `/health` | Health check |

## Quick Start

```bash
cd TLR/backend

# 1. Create virtualenv and install deps
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# 2. Copy env template and fill in your keys
cp .env.example .env
# Edit .env with your Supabase URL, service key, and OpenAI key

# 3. Run the Supabase migration
# (paste the SQL from supabase/migrations/001_initial_schema.sql
#  into the Supabase SQL Editor, or use the Supabase CLI)

# 4. Start the server
uvicorn app.main:app --reload --port 8000
```

The API will be available at `http://localhost:8000`.

## Supabase Tables

| Table | Purpose |
|-------|---------|
| `account_info` | User accounts (username, email, phone, password hash) |
| `calendar_info` | Parsed schedule assignments per user |
| `tutoring_approval` | Transcript GPA evaluation results |
| `tutoring_classes` | Individual courses a user can tutor |

## How It Maps to the n8n Workflow

| n8n Flow | Backend Endpoint |
|----------|-----------------|
| Transcript: Form → Extract PDF → GPT parse → GPA check → approve/deny → split courses | `POST /api/transcript/upload` |
| Schedule: Form → Extract PDF → GPT parse → Insert calendar rows | `POST /api/schedule/upload` |
| Login: Webhook → extract fields → normalize phone → query DB → verify password | `POST /api/auth/login` |

## Frontend Integration

The React Native app calls these endpoints using `fetch()`:

```js
// Example: login
const res = await fetch('http://localhost:8000/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ identifier: 'adamb', password: 'test' }),
});
const data = await res.json();
```

```js
// Example: transcript upload
const formData = new FormData();
formData.append('pdf', { uri: fileUri, name: 'transcript.pdf', type: 'application/pdf' });
formData.append('user_id', userId);

const res = await fetch('http://localhost:8000/api/transcript/upload', {
  method: 'POST',
  body: formData,
});
```
