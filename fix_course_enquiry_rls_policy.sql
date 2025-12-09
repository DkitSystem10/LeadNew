-- =====================================================
-- FIX RLS POLICY ERROR FOR course_enquiry_registrations
-- Run this in Supabase SQL Editor
-- This will fix: "new row violates row-level security policy"
-- =====================================================

-- Step 1: Check current RLS status
SELECT 
    tablename,
    CASE WHEN rowsecurity THEN 'ENABLED' ELSE 'DISABLED' END as rls_status
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename = 'course_enquiry_registrations';

-- Step 2: Drop ALL existing policies dynamically (handles any policy name)
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

-- Also explicitly drop known policy names (backup method)
DROP POLICY IF EXISTS "Allow public insert for course enquiries" ON course_enquiry_registrations;
DROP POLICY IF EXISTS "Allow authenticated read for course enquiries" ON course_enquiry_registrations;

-- Step 3: Ensure RLS is enabled (required for policies)
ALTER TABLE course_enquiry_registrations ENABLE ROW LEVEL SECURITY;

-- Step 4: Create policy to allow PUBLIC inserts (for anonymous form submissions)
-- This allows anyone (anonymous users) to insert rows
-- Method 1: Allow both anonymous and authenticated users
CREATE POLICY "Allow public insert for course enquiries"
ON course_enquiry_registrations
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Alternative Method 2: If Method 1 doesn't work, try this (allows all roles)
-- CREATE POLICY "Allow all insert for course enquiries"
-- ON course_enquiry_registrations
-- FOR INSERT
-- WITH CHECK (true);

-- Step 5: Create policy to allow authenticated users to read
CREATE POLICY "Allow authenticated read for course enquiries"
ON course_enquiry_registrations
FOR SELECT
TO authenticated
USING (true);

-- Step 6: Verify policies were created
SELECT 
    policyname,
    cmd as command,
    roles,
    qual as using_expression,
    with_check as with_check_expression
FROM pg_policies
WHERE tablename = 'course_enquiry_registrations'
ORDER BY policyname;

-- Expected Result:
-- You should see 2 policies:
-- 1. "Allow public insert for course enquiries" (INSERT, public)
-- 2. "Allow authenticated read for course enquiries" (SELECT, authenticated)

-- =====================================================
-- ALTERNATIVE: If you want to DISABLE RLS completely
-- (Only use if policies still don't work)
-- =====================================================
-- ALTER TABLE course_enquiry_registrations DISABLE ROW LEVEL SECURITY;
