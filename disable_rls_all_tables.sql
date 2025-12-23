-- DISABLE Row Level Security for all application tables
-- This allows direct data insertion without any security policy checks

-- 1. Core Application Tables
ALTER TABLE vendor_applications DISABLE ROW LEVEL SECURITY;
ALTER TABLE b2b_applications DISABLE ROW LEVEL SECURITY;
ALTER TABLE partner DISABLE ROW LEVEL SECURITY;
ALTER TABLE job_seeker_applications DISABLE ROW LEVEL SECURITY;
ALTER TABLE student_internship_applications DISABLE ROW LEVEL SECURITY;
ALTER TABLE course_enquiry_registrations DISABLE ROW LEVEL SECURITY;

-- 2. Career Guidance Specialized Tables
ALTER TABLE student_career_counselling DISABLE ROW LEVEL SECURITY;
ALTER TABLE suitability_test_applications DISABLE ROW LEVEL SECURITY;
ALTER TABLE study_abroad_guidance_applications DISABLE ROW LEVEL SECURITY;

-- 3. 15-Year Career Roadmap Tables
ALTER TABLE roadmap_school_student_applications DISABLE ROW LEVEL SECURITY;
ALTER TABLE roadmap_college_student_applications DISABLE ROW LEVEL SECURITY;
ALTER TABLE roadmap_professional_applications DISABLE ROW LEVEL SECURITY;

-- Optional: Drop existing policies to keep the DB clean (optional)
DROP POLICY IF EXISTS "Allow public insert" ON vendor_applications;
DROP POLICY IF EXISTS "Allow public insert" ON b2b_applications;
DROP POLICY IF EXISTS "Allow public insert" ON partner;
DROP POLICY IF EXISTS "Allow public insert" ON job_seeker_applications;
DROP POLICY IF EXISTS "Allow public insert" ON student_internship_applications;
DROP POLICY IF EXISTS "Allow public insert" ON course_enquiry_registrations;
DROP POLICY IF EXISTS "Allow public insert for Student Career Counselling" ON student_career_counselling;
DROP POLICY IF EXISTS "Allow public insert for Suitability Test" ON suitability_test_applications;
DROP POLICY IF EXISTS "Allow public insert for Study Abroad" ON study_abroad_guidance_applications;
DROP POLICY IF EXISTS "Allow public insert for Roadmap School Student" ON roadmap_school_student_applications;
DROP POLICY IF EXISTS "Allow public insert for Roadmap College Student" ON roadmap_college_student_applications;
DROP POLICY IF EXISTS "Allow public insert for Roadmap Professional" ON roadmap_professional_applications;
