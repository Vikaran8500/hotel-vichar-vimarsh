-- ==============================================================================
-- HOTEL VICHAR VIMARSH — DATABASE MIGRATION
-- Migration: 20261018000000_create_booking_enquiries.sql
-- Description: Creates the booking_enquiries table with strict constraints,
--              reference code generator, audit triggers, and Row Level Security.
-- ==============================================================================

-- 1. Ensure required extensions
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. Create the booking_enquiries table
CREATE TABLE IF NOT EXISTS public.booking_enquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reference_code VARCHAR(32) NOT NULL UNIQUE,
    guest_name VARCHAR(120) NOT NULL,
    mobile_number VARCHAR(20) NOT NULL,
    email_address VARCHAR(255),
    room_category VARCHAR(100) NOT NULL,
    check_in_date DATE NOT NULL,
    check_out_date DATE NOT NULL,
    number_of_guests INTEGER NOT NULL DEFAULT 1,
    special_requests TEXT,
    status VARCHAR(30) NOT NULL DEFAULT 'New',
    notification_status VARCHAR(20) NOT NULL DEFAULT 'pending',
    notification_error TEXT,
    ip_hash VARCHAR(64),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),

    -- Constraints & Data Integrity
    CONSTRAINT chk_enquiry_dates CHECK (check_out_date > check_in_date),
    CONSTRAINT chk_guest_count CHECK (number_of_guests >= 1 AND number_of_guests <= 10),
    CONSTRAINT chk_guest_name_len CHECK (char_length(trim(guest_name)) >= 2),
    CONSTRAINT chk_mobile_len CHECK (char_length(trim(mobile_number)) >= 7),
    CONSTRAINT chk_enquiry_status CHECK (status IN ('New', 'Contacted', 'Confirmed', 'Cancelled', 'Archived')),
    CONSTRAINT chk_notification_status CHECK (notification_status IN ('pending', 'sent', 'failed')),
    CONSTRAINT chk_room_category CHECK (
        room_category IN (
            'Budget Single Bed Room',
            'Small Economy Double Room',
            'Premium Double Room with Jacuzzi'
        )
    )
);

-- 3. Helpful Column Comments for schema clarity
COMMENT ON TABLE public.booking_enquiries IS 'Stores guest accommodation inquiries for Hotel Vichar Vimarsh. Does not constitute confirmed bookings.';
COMMENT ON COLUMN public.booking_enquiries.reference_code IS 'Human-readable unique identifier formatted like VV-YYYYMMDD-XXXX.';
COMMENT ON COLUMN public.booking_enquiries.notification_status IS 'Tracks Resend email dispatch state (pending, sent, or failed).';
COMMENT ON COLUMN public.booking_enquiries.ip_hash IS 'Pseudonymized SHA-256 hash of client IP for server-side rate-limiting audit.';

-- 4. Create Performance & Lookup Indexes
CREATE INDEX IF NOT EXISTS idx_booking_enquiries_created_at
    ON public.booking_enquiries (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_booking_enquiries_status
    ON public.booking_enquiries (status);

CREATE INDEX IF NOT EXISTS idx_booking_enquiries_dates
    ON public.booking_enquiries (check_in_date, check_out_date);

CREATE INDEX IF NOT EXISTS idx_booking_enquiries_reference
    ON public.booking_enquiries (reference_code);

-- 5. Trigger to automatically keep updated_at current
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_booking_enquiries_updated_at ON public.booking_enquiries;
CREATE TRIGGER set_booking_enquiries_updated_at
    BEFORE UPDATE ON public.booking_enquiries
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- 6. Helper function to generate unique, collision-resistant reference codes
-- Format: VV-YYYYMMDD-XXXX (e.g. VV-20261018-8A3F)
CREATE OR REPLACE FUNCTION public.generate_enquiry_reference_code()
RETURNS TEXT AS $$
DECLARE
    date_part TEXT;
    random_part TEXT;
    candidate TEXT;
    collision_count INT;
BEGIN
    date_part := to_char(timezone('utc'::text, now()), 'YYYYMMDD');
    LOOP
        -- 4 uppercase alphanumeric characters excluding easily confused characters (O, 0, I, 1)
        random_part := upper(substr(replace(replace(replace(replace(encode(gen_random_bytes(4), 'hex'), '0', 'X'), 'o', 'Y'), '1', 'Z'), 'l', 'W'), 1, 4));
        candidate := 'VV-' || date_part || '-' || random_part;
        
        SELECT COUNT(*) INTO collision_count FROM public.booking_enquiries WHERE reference_code = candidate;
        IF collision_count = 0 THEN
            RETURN candidate;
        END IF;
    END LOOP;
END;
$$ LANGUAGE plpgsql VOLATILE;

-- 7. ROW LEVEL SECURITY (RLS) POLICIES
-- Security Principle: Least Privilege
-- Public anonymous users MUST NOT be able to view, list, modify, or delete any guest records.
ALTER TABLE public.booking_enquiries ENABLE ROW LEVEL SECURITY;

-- Deny all public read/write by default (RLS default behaviour when enabled).
-- Edge Functions utilize the SUPABASE_SERVICE_ROLE_KEY which automatically bypasses RLS on the server.

-- Authenticated staff policy (for future hotel administration dashboard)
CREATE POLICY "Staff can view all inquiries"
    ON public.booking_enquiries
    FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Staff can update inquiry status"
    ON public.booking_enquiries
    FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Revoke all permissions from the public anon role on this table to prevent direct API snooping
REVOKE SELECT, UPDATE, DELETE, TRUNCATE ON public.booking_enquiries FROM anon;
GRANT SELECT, UPDATE ON public.booking_enquiries TO authenticated;
