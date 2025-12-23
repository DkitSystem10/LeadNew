-- Create specialized table for 15-Years Career Roadmap (Working Professional)
CREATE TABLE IF NOT EXISTS roadmap_professional_applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    submission_date DATE NOT NULL DEFAULT CURRENT_DATE,
    full_name VARCHAR(255) NOT NULL,
    age INTEGER NOT NULL,
    current_job_role VARCHAR(255) NOT NULL,
    industry_sector VARCHAR(255) NOT NULL,
    total_work_experience VARCHAR(100) NOT NULL,
    city VARCHAR(255) NOT NULL,
    contact_number VARCHAR(50) NOT NULL,
    core_skills_current_job TEXT NOT NULL,
    certifications_training TEXT,
    job_satisfaction_level INTEGER NOT NULL, -- 1 to 5
    support_looking_for TEXT NOT NULL, -- Stored as comma-separated string
    primary_reason_guidance TEXT NOT NULL,
    career_switch_2_years VARCHAR(50) NOT NULL, -- Yes, No, Exploring
    upskill_willingness VARCHAR(10) NOT NULL, -- Yes, No
    mentoring_interest VARCHAR(10) NOT NULL, -- Yes, No
    specific_challenge TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE roadmap_professional_applications ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public inserts
CREATE POLICY "Allow public insert for Roadmap Professional" 
ON roadmap_professional_applications FOR INSERT 
TO public 
WITH CHECK (true);

-- Create policy to allow authenticated users to select
CREATE POLICY "Allow authenticated select for Roadmap Professional" 
ON roadmap_professional_applications FOR SELECT 
TO authenticated 
USING (true);

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION update_roadmap_professional_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_roadmap_professional_applications_updated_at
    BEFORE UPDATE ON roadmap_professional_applications
    FOR EACH ROW
    EXECUTE FUNCTION update_roadmap_professional_updated_at_column();
