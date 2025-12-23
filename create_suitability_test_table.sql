-- Create specialized table for Suitability Test Applications
CREATE TABLE IF NOT EXISTS suitability_test_applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    submission_date DATE NOT NULL DEFAULT CURRENT_DATE,
    candidate_name VARCHAR(255) NOT NULL,
    age INTEGER NOT NULL,
    education_level VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    subjects_well_performing TEXT NOT NULL,
    activities_enjoy_most VARCHAR(255) NOT NULL,
    prefer_working_with VARCHAR(255) NOT NULL,
    logic_solving VARCHAR(10) NOT NULL,
    creative_tasks VARCHAR(10) NOT NULL,
    test_reason VARCHAR(255) NOT NULL,
    assessment_consent VARCHAR(10) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE suitability_test_applications ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public inserts
CREATE POLICY "Allow public insert for Suitability Test" 
ON suitability_test_applications FOR INSERT 
TO public 
WITH CHECK (true);

-- Create policy to allow authenticated users to select
CREATE POLICY "Allow authenticated select for Suitability Test" 
ON suitability_test_applications FOR SELECT 
TO authenticated 
USING (true);

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION update_suitability_test_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_suitability_test_applications_updated_at
    BEFORE UPDATE ON suitability_test_applications
    FOR EACH ROW
    EXECUTE FUNCTION update_suitability_test_updated_at_column();
