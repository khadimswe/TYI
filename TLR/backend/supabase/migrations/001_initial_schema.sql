-- ============================================================
-- TagYouAreIt – Supabase Schema
-- Based on n8n workflow + CSV database templates
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ──────────────────────────────────────────────────────────────
-- 1. account_info  (maps to AccountInfo CSV)
-- ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS account_info (
    id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username      TEXT UNIQUE NOT NULL,
    phone_number  TEXT,
    email         TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,       -- bcrypt hash, never plain text
    created_at    TIMESTAMPTZ DEFAULT now(),
    updated_at    TIMESTAMPTZ DEFAULT now()
);

-- Index for the login lookup (username OR email OR phone)
CREATE INDEX idx_account_info_login
    ON account_info (LOWER(username), LOWER(email), phone_number);

-- ──────────────────────────────────────────────────────────────
-- 2. calendar_info  (maps to CalandarInfo CSV)
--    Stores parsed schedule assignments per user
-- ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS calendar_info (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id     UUID REFERENCES account_info(id) ON DELETE CASCADE,
    assignment  TEXT NOT NULL,
    type        TEXT,                  -- Exam, Quiz, Homework, etc.
    details     TEXT,
    start_date  TIMESTAMPTZ,
    end_date    TIMESTAMPTZ,
    created_at  TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_calendar_user ON calendar_info (user_id);

-- ──────────────────────────────────────────────────────────────
-- 3. tutoring_approval  (maps to tutoringApproval CSV)
--    Written after transcript is parsed & GPA evaluated
-- ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS tutoring_approval (
    id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id           UUID REFERENCES account_info(id) ON DELETE CASCADE,
    name              TEXT NOT NULL,
    degree            TEXT,
    current_gpa       NUMERIC(3,2),
    approved_gpa      BOOLEAN DEFAULT false,  -- true if GPA >= 3.0
    course_taken_titles  TEXT,                 -- comma-separated list
    course_taken_grades  TEXT,                 -- comma-separated list
    created_at        TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_tutoring_approval_user ON tutoring_approval (user_id);

-- ──────────────────────────────────────────────────────────────
-- 4. tutoring_classes  (maps to TutoringClasses CSV)
--    One row per course the student can tutor
-- ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS tutoring_classes (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id         UUID REFERENCES account_info(id) ON DELETE CASCADE,
    name            TEXT NOT NULL,
    class_name      TEXT NOT NULL,
    class_grade     TEXT,
    can_tutor       BOOLEAN DEFAULT false,  -- auto-set based on grade
    created_at      TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_tutoring_classes_user ON tutoring_classes (user_id);

-- ──────────────────────────────────────────────────────────────
-- Row-Level Security (RLS) – basic policies
-- ──────────────────────────────────────────────────────────────
ALTER TABLE account_info       ENABLE ROW LEVEL SECURITY;
ALTER TABLE calendar_info      ENABLE ROW LEVEL SECURITY;
ALTER TABLE tutoring_approval  ENABLE ROW LEVEL SECURITY;
ALTER TABLE tutoring_classes   ENABLE ROW LEVEL SECURITY;

-- Service-role key bypasses RLS; these policies are for
-- anon / authenticated users hitting Supabase directly.
-- The backend uses the service-role key.
