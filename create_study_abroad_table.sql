-- Create specialized table for Study Abroad Guidance Applications
CREATE TABLE IF NOT EXISTS study_abroad_guidance_applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    submission_date DATE NOT NULL DEFAULT CURRENT_DATE,
    student_name VARCHAR(255) NOT NULL,
    age INTEGER NOT NULL,
    current_qualification VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    contact_number VARCHAR(50) NOT NULL,
    highest_qualification VARCHAR(255) NOT NULL,
    academic_score_gpa VARCHAR(255) NOT NULL,
    medium_of_instruction VARCHAR(100) NOT NULL,
    preferred_countries TEXT NOT NULL,
    intended_study_level VARCHAR(100) NOT NULL,
    preferred_field VARCHAR(255) NOT NULL,
    english_test_status VARCHAR(100) NOT NULL,
    target_intake_year VARCHAR(100) NOT NULL,
    budget_range VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE study_abroad_guidance_applications ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public inserts
CREATE POLICY "Allow public insert for Study Abroad Guidance" 
ON study_abroad_guidance_applications FOR INSERT 
TO public 
WITH CHECK (true);

-- Create policy to allow authenticated users to select
CREATE POLICY "Allow authenticated select for Study Abroad Guidance" 
ON study_abroad_guidance_applications FOR SELECT 
TO authenticated 
USING (true);

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION update_study_abroad_guidance_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_study_abroad_guidance_applications_updated_at
    BEFORE UPDATE ON study_abroad_guidance_applications
    FOR EACH ROW
    EXECUTE FUNCTION update_study_abroad_guidance_updated_at_column();
