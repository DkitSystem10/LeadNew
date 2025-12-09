-- =====================================================
-- FIX RLS POLICY FOR course_enquiry_registrations TABLE
-- Run this in Supabase SQL Editor to fix the RLS error
-- =====================================================

-- Ensure RLS is enabled
ALTER TABLE course_enquiry_registrations ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Enable insert for anonymous users" ON course_enquiry_registrations;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON course_enquiry_registrations;
DROP POLICY IF EXISTS "Enable read for authenticated users" ON course_enquiry_registrations;
DROP POLICY IF EXISTS "Allow public insert" ON course_enquiry_registrations;
DROP POLICY IF EXISTS "Allow public read for authenticated" ON course_enquiry_registrations;

-- Allow public/anonymous users to INSERT (for form submissions)
CREATE POLICY "Allow public insert"
ON course_enquiry_registrations
FOR INSERT
TO public
WITH CHECK (true);

-- Allow authenticated users to SELECT/READ
CREATE POLICY "Allow authenticated read"
ON course_enquiry_registrations
FOR SELECT
TO authenticated
USING (true);

-- Also allow service role to do everything (for admin operations)
CREATE POLICY "Allow service role all operations"
ON course_enquiry_registrations
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Verify the policies
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies
WHERE tablename = 'course_enquiry_registrations';
