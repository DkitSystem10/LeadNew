-- Create specialized table for 15-Years Career Roadmap (School Student)
CREATE TABLE IF NOT EXISTS roadmap_school_student_applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    submission_date DATE NOT NULL DEFAULT CURRENT_DATE,
    student_name VARCHAR(255) NOT NULL,
    age INTEGER NOT NULL,
    current_class VARCHAR(100) NOT NULL,
    school_name VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    parent_guardian_name VARCHAR(255) NOT NULL,
    parent_contact_number VARCHAR(50) NOT NULL,
    current_board_syllabus VARCHAR(200) NOT NULL,
    subjects_studied TEXT NOT NULL,
    last_exam_result VARCHAR(255) NOT NULL,
    favourite_subject VARCHAR(255) NOT NULL,
    most_difficult_subject VARCHAR(255) NOT NULL,
    support_needed TEXT NOT NULL, -- Stored as comma-separated string
    has_career_idea VARCHAR(50) NOT NULL, -- Yes, No, Not Sure
    career_idea_mention TEXT,
    biggest_confusion VARCHAR(255) NOT NULL,
    preferred_mode VARCHAR(50) NOT NULL, -- Online, Offline
    preferred_language VARCHAR(100) NOT NULL,
    parent_concern TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE roadmap_school_student_applications ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public inserts
CREATE POLICY "Allow public insert for Roadmap School Student" 
ON roadmap_school_student_applications FOR INSERT 
TO public 
WITH CHECK (true);

-- Create policy to allow authenticated users to select
CREATE POLICY "Allow authenticated select for Roadmap School Student" 
ON roadmap_school_student_applications FOR SELECT 
TO authenticated 
USING (true);

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION update_roadmap_school_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_roadmap_school_student_applications_updated_at
    BEFORE UPDATE ON roadmap_school_student_applications
    FOR EACH ROW
    EXECUTE FUNCTION update_roadmap_school_updated_at_column();
