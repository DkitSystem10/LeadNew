-- =====================================================
-- COMPLETE DATABASE BACKUP - ALL TABLES
-- Lead Centre Application
-- Run this ENTIRE file in Supabase SQL Editor
-- This will create all tables with complete structure
-- =====================================================

-- =====================================================
-- COMMON FUNCTIONS
-- =====================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- 1. VENDOR APPLICATIONS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS vendor_applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    date DATE NOT NULL,
    category VARCHAR(255),
    categoryname VARCHAR(255),
    vendor_name VARCHAR(255) NOT NULL,
    company_name VARCHAR(255) NOT NULL,
    company_address TEXT NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    appointment_status VARCHAR(10) NOT NULL CHECK (appointment_status IN ('yes', 'no')),
    business_type VARCHAR(50) NOT NULL CHECK (business_type IN ('supplier', 'distributor', 'service-provider', 'manufacturer', 'others')),
    upload_file_url TEXT,
    remarks TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for vendor_applications
CREATE INDEX IF NOT EXISTS idx_vendor_applications_email ON vendor_applications(email);
CREATE INDEX IF NOT EXISTS idx_vendor_applications_date ON vendor_applications(date);
CREATE INDEX IF NOT EXISTS idx_vendor_applications_category ON vendor_applications(category);

-- Trigger for vendor_applications
DROP TRIGGER IF EXISTS update_vendor_applications_updated_at ON vendor_applications;
CREATE TRIGGER update_vendor_applications_updated_at
    BEFORE UPDATE ON vendor_applications
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- 2. B2B APPLICATIONS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS b2b_applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    date DATE NOT NULL,
    contact_person_name VARCHAR(255) NOT NULL,
    organization_name VARCHAR(255) NOT NULL,
    organization_address TEXT NOT NULL,
    business_type VARCHAR(50) NOT NULL CHECK (business_type IN ('technology', 'manufacturing', 'retail', 'services', 'consulting', 'others')),
    mode_of_business VARCHAR(50) NOT NULL CHECK (mode_of_business IN ('freelancer', 'partnership', 'co-worker', 'consultant', 'others')),
    company_website_email VARCHAR(255) NOT NULL,
    upload_file_url TEXT,
    remarks TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for b2b_applications
CREATE INDEX IF NOT EXISTS idx_b2b_applications_org_name ON b2b_applications(organization_name);
CREATE INDEX IF NOT EXISTS idx_b2b_applications_date ON b2b_applications(date);

-- Trigger for b2b_applications
DROP TRIGGER IF EXISTS update_b2b_applications_updated_at ON b2b_applications;
CREATE TRIGGER update_b2b_applications_updated_at
    BEFORE UPDATE ON b2b_applications
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- 3. PARTNER TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS partner (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    date DATE NOT NULL,
    category VARCHAR(255) NOT NULL,
    categoryname VARCHAR(255),
    contact_person_name VARCHAR(255) NOT NULL,
    organization_name VARCHAR(255) NOT NULL,
    organization_address TEXT NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    upload_file_url TEXT,
    remarks TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for partner
CREATE INDEX IF NOT EXISTS idx_partner_email ON partner(email);
CREATE INDEX IF NOT EXISTS idx_partner_organization_name ON partner(organization_name);
CREATE INDEX IF NOT EXISTS idx_partner_date ON partner(date);
CREATE INDEX IF NOT EXISTS idx_partner_category ON partner(category);
CREATE INDEX IF NOT EXISTS idx_partner_categoryname ON partner(categoryname);

-- Trigger for partner
DROP TRIGGER IF EXISTS update_partner_updated_at ON partner;
CREATE TRIGGER update_partner_updated_at
    BEFORE UPDATE ON partner
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- 4. JOB SEEKER APPLICATIONS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS job_seeker_applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    date DATE NOT NULL,
    category VARCHAR(255),
    categoryname VARCHAR(255),
    full_name VARCHAR(255) NOT NULL,
    gender VARCHAR(20) NOT NULL CHECK (gender IN ('male', 'female', 'other', 'prefer-not-to-say')),
    dob DATE NOT NULL,
    age INTEGER NOT NULL CHECK (age > 0 AND age <= 120),
    address TEXT NOT NULL,
    blood_group VARCHAR(10) NOT NULL,
    contact_number VARCHAR(20) NOT NULL,
    email VARCHAR(255) NOT NULL,
    qualification VARCHAR(20) NOT NULL CHECK (qualification IN ('10th', '12th', 'diploma', 'ug', 'pg', 'phd')),
    department VARCHAR(50) NOT NULL CHECK (department IN ('hr', 'it', 'marketing', 'finance', 'sales', 'production', 'others')),
    years_of_experience VARCHAR(20) NOT NULL CHECK (years_of_experience IN ('fresher', '1-2', '3-5', '5+')),
    preferred_job_type VARCHAR(20) NOT NULL CHECK (preferred_job_type IN ('full-time', 'part-time', 'hybrid', 'remote')),
    upload_resume_url TEXT,
    remarks TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for job_seeker_applications
CREATE INDEX IF NOT EXISTS idx_job_seeker_applications_email ON job_seeker_applications(email);
CREATE INDEX IF NOT EXISTS idx_job_seeker_applications_department ON job_seeker_applications(department);
CREATE INDEX IF NOT EXISTS idx_job_seeker_applications_date ON job_seeker_applications(date);
CREATE INDEX IF NOT EXISTS idx_job_seeker_applications_category ON job_seeker_applications(category);

-- Trigger for job_seeker_applications
DROP TRIGGER IF EXISTS update_job_seeker_applications_updated_at ON job_seeker_applications;
CREATE TRIGGER update_job_seeker_applications_updated_at
    BEFORE UPDATE ON job_seeker_applications
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- 5. STUDENT INTERNSHIP APPLICATIONS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS student_internship_applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    date DATE NOT NULL,
    category VARCHAR(255),
    categoryname VARCHAR(255),
    full_name VARCHAR(255) NOT NULL,
    registration_number VARCHAR(100) NOT NULL,
    address TEXT NOT NULL,
    email VARCHAR(255) NOT NULL,
    contact_number VARCHAR(20) NOT NULL,
    blood_group VARCHAR(10) NOT NULL,
    dob DATE NOT NULL,
    age INTEGER NOT NULL CHECK (age > 0 AND age <= 120),
    gender VARCHAR(20) NOT NULL CHECK (gender IN ('male', 'female', 'other', 'prefer-not-to-say')),
    college_institution_name VARCHAR(255) NOT NULL,
    course_type VARCHAR(20) NOT NULL CHECK (course_type IN ('ug', 'pg', 'certification')),
    department VARCHAR(50) NOT NULL CHECK (department IN ('computer-science', 'electrical', 'mechanical', 'civil', 'electronics', 'business', 'others')),
    internship_domain VARCHAR(20) NOT NULL CHECK (internship_domain IN ('it', 'non-it', 'others')),
    duration VARCHAR(20) NOT NULL CHECK (duration IN ('3-months', '6-months')),
    upload_file_url TEXT,
    remarks TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for student_internship_applications
CREATE INDEX IF NOT EXISTS idx_student_internship_applications_email ON student_internship_applications(email);
CREATE INDEX IF NOT EXISTS idx_student_internship_applications_reg_no ON student_internship_applications(registration_number);
CREATE INDEX IF NOT EXISTS idx_student_internship_applications_date ON student_internship_applications(date);
CREATE INDEX IF NOT EXISTS idx_student_internship_applications_category ON student_internship_applications(category);

-- Trigger for student_internship_applications
DROP TRIGGER IF EXISTS update_student_internship_applications_updated_at ON student_internship_applications;
CREATE TRIGGER update_student_internship_applications_updated_at
    BEFORE UPDATE ON student_internship_applications
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- 6. CAREER GUIDANCE APPLICATIONS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS career_guidance_applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    date DATE NOT NULL,
    category VARCHAR(255),
    categoryname VARCHAR(255),
    student_name VARCHAR(255) NOT NULL,
    standard_year VARCHAR(20) NOT NULL CHECK (standard_year IN ('9th', '10th', '11th', '12th', '1st-year', '2nd-year', '3rd-year', '4th-year', 'graduate')),
    date_of_birth DATE NOT NULL,
    age INTEGER NOT NULL CHECK (age > 0 AND age <= 100),
    gender VARCHAR(10) NOT NULL CHECK (gender IN ('male', 'female', 'other')),
    location VARCHAR(255) NOT NULL,
    contact_number VARCHAR(20) NOT NULL,
    email VARCHAR(255) NOT NULL,
    parent_guardian_name VARCHAR(255) NOT NULL,
    studies_preference VARCHAR(50) NOT NULL CHECK (studies_preference IN ('science', 'commerce', 'arts', 'engineering', 'medical', 'law', 'business', 'others')),
    abroad_local VARCHAR(10) NOT NULL CHECK (abroad_local IN ('local', 'abroad')),
    preferred_country VARCHAR(255),
    city_if_abroad VARCHAR(255),
    preferred_university VARCHAR(255),
    career_interest VARCHAR(255),
    skills_strengths TEXT,
    academic_performance VARCHAR(255),
    hobbies_extracurricular TEXT,
    preferred_mode_of_study VARCHAR(20) NOT NULL CHECK (preferred_mode_of_study IN ('online', 'offline', 'hybrid')),
    career_support_duration VARCHAR(20) NOT NULL CHECK (career_support_duration IN ('1-year', '2-years', '5-years', '15-years')),
    mentorship_required VARCHAR(5) NOT NULL CHECK (mentorship_required IN ('yes', 'no')),
    remarks_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for career_guidance_applications
CREATE INDEX IF NOT EXISTS idx_career_guidance_applications_email ON career_guidance_applications(email);
CREATE INDEX IF NOT EXISTS idx_career_guidance_applications_student_name ON career_guidance_applications(student_name);
CREATE INDEX IF NOT EXISTS idx_career_guidance_applications_date ON career_guidance_applications(date);
CREATE INDEX IF NOT EXISTS idx_career_guidance_applications_category ON career_guidance_applications(category);

-- Trigger for career_guidance_applications
DROP TRIGGER IF EXISTS update_career_guidance_applications_updated_at ON career_guidance_applications;
CREATE TRIGGER update_career_guidance_applications_updated_at
    BEFORE UPDATE ON career_guidance_applications
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- 7. COURSE ENQUIRY REGISTRATIONS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS course_enquiry_registrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    date DATE NOT NULL,
    category VARCHAR(255) NOT NULL,
    sub_category VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    date_of_birth DATE NOT NULL,
    age INTEGER NOT NULL,
    address TEXT NOT NULL,
    course_enquiry TEXT NOT NULL,
    remarks TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for course_enquiry_registrations
CREATE INDEX IF NOT EXISTS idx_course_enquiry_registrations_email ON course_enquiry_registrations(email);
CREATE INDEX IF NOT EXISTS idx_course_enquiry_registrations_phone_number ON course_enquiry_registrations(phone_number);
CREATE INDEX IF NOT EXISTS idx_course_enquiry_registrations_category ON course_enquiry_registrations(category);
CREATE INDEX IF NOT EXISTS idx_course_enquiry_registrations_sub_category ON course_enquiry_registrations(sub_category);
CREATE INDEX IF NOT EXISTS idx_course_enquiry_registrations_date ON course_enquiry_registrations(date);
CREATE INDEX IF NOT EXISTS idx_course_enquiry_registrations_date_of_birth ON course_enquiry_registrations(date_of_birth);

-- Trigger for course_enquiry_registrations
DROP TRIGGER IF EXISTS update_course_enquiry_registrations_updated_at ON course_enquiry_registrations;
CREATE TRIGGER update_course_enquiry_registrations_updated_at
    BEFORE UPDATE ON course_enquiry_registrations
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- VENDOR APPLICATIONS RLS
ALTER TABLE vendor_applications ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public insert for vendors" ON vendor_applications;
CREATE POLICY "Allow public insert for vendors"
ON vendor_applications
FOR INSERT
TO anon, authenticated
WITH CHECK (true);
DROP POLICY IF EXISTS "Allow authenticated read for vendors" ON vendor_applications;
CREATE POLICY "Allow authenticated read for vendors"
ON vendor_applications
FOR SELECT
TO authenticated
USING (true);

-- B2B APPLICATIONS RLS
ALTER TABLE b2b_applications ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public insert for b2b" ON b2b_applications;
CREATE POLICY "Allow public insert for b2b"
ON b2b_applications
FOR INSERT
TO anon, authenticated
WITH CHECK (true);
DROP POLICY IF EXISTS "Allow authenticated read for b2b" ON b2b_applications;
CREATE POLICY "Allow authenticated read for b2b"
ON b2b_applications
FOR SELECT
TO authenticated
USING (true);

-- PARTNER RLS
ALTER TABLE partner ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public insert for partners" ON partner;
CREATE POLICY "Allow public insert for partners"
ON partner
FOR INSERT
TO anon, authenticated
WITH CHECK (true);
DROP POLICY IF EXISTS "Allow authenticated read for partners" ON partner;
CREATE POLICY "Allow authenticated read for partners"
ON partner
FOR SELECT
TO authenticated
USING (true);

-- JOB SEEKER APPLICATIONS RLS
ALTER TABLE job_seeker_applications ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public insert for job seekers" ON job_seeker_applications;
CREATE POLICY "Allow public insert for job seekers"
ON job_seeker_applications
FOR INSERT
TO anon, authenticated
WITH CHECK (true);
DROP POLICY IF EXISTS "Allow authenticated read for job seekers" ON job_seeker_applications;
CREATE POLICY "Allow authenticated read for job seekers"
ON job_seeker_applications
FOR SELECT
TO authenticated
USING (true);

-- STUDENT INTERNSHIP APPLICATIONS RLS
ALTER TABLE student_internship_applications ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public insert for student internships" ON student_internship_applications;
CREATE POLICY "Allow public insert for student internships"
ON student_internship_applications
FOR INSERT
TO anon, authenticated
WITH CHECK (true);
DROP POLICY IF EXISTS "Allow authenticated read for student internships" ON student_internship_applications;
CREATE POLICY "Allow authenticated read for student internships"
ON student_internship_applications
FOR SELECT
TO authenticated
USING (true);

-- CAREER GUIDANCE APPLICATIONS RLS
ALTER TABLE career_guidance_applications ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public insert for career guidance" ON career_guidance_applications;
CREATE POLICY "Allow public insert for career guidance"
ON career_guidance_applications
FOR INSERT
TO anon, authenticated
WITH CHECK (true);
DROP POLICY IF EXISTS "Allow authenticated read for career guidance" ON career_guidance_applications;
CREATE POLICY "Allow authenticated read for career guidance"
ON career_guidance_applications
FOR SELECT
TO authenticated
USING (true);

-- COURSE ENQUIRY REGISTRATIONS RLS
ALTER TABLE course_enquiry_registrations ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public insert for course enquiries" ON course_enquiry_registrations;
CREATE POLICY "Allow public insert for course enquiries"
ON course_enquiry_registrations
FOR INSERT
TO anon, authenticated
WITH CHECK (true);
DROP POLICY IF EXISTS "Allow authenticated read for course enquiries" ON course_enquiry_registrations;
CREATE POLICY "Allow authenticated read for course enquiries"
ON course_enquiry_registrations
FOR SELECT
TO authenticated
USING (true);

-- =====================================================
-- VERIFICATION - Check all tables and RLS status
-- =====================================================
SELECT 
    tablename,
    CASE WHEN rowsecurity THEN 'RLS ENABLED' ELSE 'RLS DISABLED' END as rls_status
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN (
    'vendor_applications',
    'b2b_applications',
    'partner',
    'job_seeker_applications',
    'student_internship_applications',
    'career_guidance_applications',
    'course_enquiry_registrations'
)
ORDER BY tablename;

-- =====================================================
-- BACKUP COMPLETE!
-- All 7 tables created with indexes, triggers, and RLS policies
-- =====================================================
