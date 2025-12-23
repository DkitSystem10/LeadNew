-- SQL script to add 'pincode' column to all career guidance related tables

-- 1. Student Career Counselling
ALTER TABLE student_career_counselling ADD COLUMN IF NOT EXISTS pincode VARCHAR(10);

-- 2. Suitability Test
ALTER TABLE suitability_test_applications ADD COLUMN IF NOT EXISTS pincode VARCHAR(10);

-- 3. Study Abroad Guidance
ALTER TABLE study_abroad_guidance_applications ADD COLUMN IF NOT EXISTS pincode VARCHAR(10);

-- 4. 15-Year Career Roadmap (School)
ALTER TABLE roadmap_school_student_applications ADD COLUMN IF NOT EXISTS pincode VARCHAR(10);

-- 5. 15-Year Career Roadmap (College)
ALTER TABLE roadmap_college_student_applications ADD COLUMN IF NOT EXISTS pincode VARCHAR(10);

-- 6. 15-Year Career Roadmap (Professional)
ALTER TABLE roadmap_professional_applications ADD COLUMN IF NOT EXISTS pincode VARCHAR(10);
