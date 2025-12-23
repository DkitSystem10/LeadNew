-- Create specialized table for Student Career Counselling
CREATE TABLE IF NOT EXISTS student_career_counselling (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    submission_date DATE NOT NULL DEFAULT CURRENT_DATE,
    student_name VARCHAR(255) NOT NULL,
    age INTEGER NOT NULL,
    current_class_year VARCHAR(255) NOT NULL,
    school_college_name VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    current_stream_subjects VARCHAR(255) NOT NULL,
    last_exam_result VARCHAR(255) NOT NULL,
    subject_enjoy_most VARCHAR(255) NOT NULL,
    subject_struggle_with VARCHAR(255) NOT NULL,
    has_career_goal VARCHAR(50) NOT NULL, -- Yes, No, Not sure
    career_goal_mention TEXT,
    biggest_confusion VARCHAR(255), -- Too many choices, Family pressure, etc.
    counselling_expectation TEXT NOT NULL,
    preferred_mode VARCHAR(50) NOT NULL, -- Online, Offline
    preferred_language VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE student_career_counselling ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public inserts
CREATE POLICY "Allow public insert for Student Career Counselling" 
ON student_career_counselling FOR INSERT 
TO public 
WITH CHECK (true);

-- Create policy to allow authenticated users to select
CREATE POLICY "Allow authenticated select for Student Career Counselling" 
ON student_career_counselling FOR SELECT 
TO authenticated 
USING (true);

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_student_career_counselling_updated_at
    BEFORE UPDATE ON student_career_counselling
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
