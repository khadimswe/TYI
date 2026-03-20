-- ============================================================
-- Migration 002 – Allow phone-only signups
--
-- 1. Make email nullable (users can sign up with phone only)
-- 2. Add UNIQUE constraint on phone_number (prevent duplicates)
-- 3. Drop the NOT NULL on email so phone-only rows are valid
-- ============================================================

-- Allow email to be NULL for phone-only users
ALTER TABLE account_info
    ALTER COLUMN email DROP NOT NULL;

-- Ensure phone_number is unique when provided (ignores NULLs automatically)
CREATE UNIQUE INDEX IF NOT EXISTS idx_account_info_phone_unique
    ON account_info (phone_number)
    WHERE phone_number IS NOT NULL AND phone_number != '';
