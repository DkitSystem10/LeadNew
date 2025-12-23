-- Create specialized table for 15-Years Career Roadmap (College Student)
CREATE TABLE IF NOT EXISTS roadmap_college_student_applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    submission_date DATE NOT NULL DEFAULT CURRENT_DATE,
    full_name VARCHAR(255) NOT NULL,
    age INTEGER NOT NULL,
    degree_course VARCHAR(255) NOT NULL,
    institution_name VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    contact_number VARCHAR(50) NOT NULL,
    email_id VARCHAR(255) NOT NULL,
    current_year_semester VARCHAR(100) NOT NULL,
    major_specialization VARCHAR(255) NOT NULL,
    current_cgpa_percentage VARCHAR(100) NOT NULL,
    key_skills TEXT NOT NULL,
    guidance_needed TEXT NOT NULL, -- Stored as comma-separated string
    career_intention TEXT,
    course_satisfaction VARCHAR(50) NOT NULL, -- Yes, No, Confused
    preferred_future_path VARCHAR(100) NOT NULL, -- Higher studies, Job, etc.
    planning_study_abroad VARCHAR(50) NOT NULL, -- Yes, Maybe, No
    target_country VARCHAR(255),
    mentoring_interest VARCHAR(10) NOT NULL, -- Yes, No
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE roadmap_college_student_applications ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public inserts
CREATE POLICY "Allow public insert for Roadmap College Student" 
ON roadmap_college_student_applications FOR INSERT 
TO public 
WITH CHECK (true);

-- Create policy to allow authenticated users to select
CREATE POLICY "Allow authenticated select for Roadmap College Student" 
ON roadmap_college_student_applications FOR SELECT 
TO authenticated 
USING (true);

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION update_roadmap_college_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_roadmap_college_student_applications_updated_at
    BEFORE UPDATE ON roadmap_college_student_applications
    FOR EACH ROW
    EXECUTE FUNCTION update_roadmap_college_updated_at_column();
