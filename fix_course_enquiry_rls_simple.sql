-- =====================================================
-- SIMPLE FIX: Drop all policies and recreate
-- Run this in Supabase SQL Editor
-- =====================================================

-- Step 1: Drop ALL existing policies (safe to run multiple times)
DO $$ 
DECLARE
    r RECORD;
BEGIN
    FOR r IN (
        SELECT policyname 
        FROM pg_policies 
        WHERE tablename = 'course_enquiry_registrations'
    ) LOOP
        EXECUTE 'DROP POLICY IF EXISTS "' || r.policyname || '" ON course_enquiry_registrations';
    END LOOP;
END $$;

-- Step 2: Ensure RLS is enabled
ALTER TABLE course_enquiry_registrations ENABLE ROW LEVEL SECURITY;

-- Step 3: Create policy to allow PUBLIC inserts (for anonymous form submissions)
CREATE POLICY "Allow public insert for course enquiries"
ON course_enquiry_registrations
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Step 4: Create policy to allow authenticated users to read
CREATE POLICY "Allow authenticated read for course enquiries"
ON course_enquiry_registrations
FOR SELECT
TO authenticated
USING (true);

-- Step 5: Verify policies
SELECT policyname, cmd, roles
FROM pg_policies
WHERE tablename = 'course_enquiry_registrations';
