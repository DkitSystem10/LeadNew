-- SQL to update career_guidance_applications table with new fields for separate forms
ALTER TABLE career_guidance_applications 
ADD COLUMN IF NOT EXISTS current_class_year VARCHAR(255),
ADD COLUMN IF NOT EXISTS school_college_name VARCHAR(255),
ADD COLUMN IF NOT EXISTS city VARCHAR(255),
ADD COLUMN IF NOT EXISTS current_stream_subjects TEXT,
ADD COLUMN IF NOT EXISTS last_exam_result VARCHAR(255),
ADD COLUMN IF NOT EXISTS subject_enjoy_most VARCHAR(255),
ADD COLUMN IF NOT EXISTS subject_struggle_with VARCHAR(255),
ADD COLUMN IF NOT EXISTS has_career_goal VARCHAR(255),
ADD COLUMN IF NOT EXISTS career_goal_mention TEXT,
ADD COLUMN IF NOT EXISTS biggest_confusion VARCHAR(255),
ADD COLUMN IF NOT EXISTS counselling_expectation TEXT,
ADD COLUMN IF NOT EXISTS preferred_mode VARCHAR(255),
ADD COLUMN IF NOT EXISTS preferred_language VARCHAR(255),
-- New fields for Suitability Test
ADD COLUMN IF NOT EXISTS education_level VARCHAR(255),
ADD COLUMN IF NOT EXISTS subjects_well_performing TEXT,
ADD COLUMN IF NOT EXISTS activities_enjoy_most VARCHAR(255),
ADD COLUMN IF NOT EXISTS prefer_working_with VARCHAR(255),
ADD COLUMN IF NOT EXISTS logic_solving VARCHAR(10),
ADD COLUMN IF NOT EXISTS creative_tasks VARCHAR(10),
ADD COLUMN IF NOT EXISTS test_reason VARCHAR(255),
ADD COLUMN IF NOT EXISTS assessment_consent VARCHAR(10),
-- New fields for Study Abroad Guidance
ADD COLUMN IF NOT EXISTS current_qualification VARCHAR(255),
ADD COLUMN IF NOT EXISTS highest_qualification VARCHAR(255),
ADD COLUMN IF NOT EXISTS academic_score_gpa VARCHAR(255),
ADD COLUMN IF NOT EXISTS medium_of_instruction VARCHAR(255),
ADD COLUMN IF NOT EXISTS intended_study_level VARCHAR(255),
ADD COLUMN IF NOT EXISTS preferred_field VARCHAR(255),
ADD COLUMN IF NOT EXISTS english_test_status VARCHAR(255),
ADD COLUMN IF NOT EXISTS target_intake_year VARCHAR(255),
ADD COLUMN IF NOT EXISTS budget_range VARCHAR(255),
-- New fields for 15-Years Career Roadmap (3 types)
ADD COLUMN IF NOT EXISTS roadmap_type VARCHAR(255),
ADD COLUMN IF NOT EXISTS parent_contact_number VARCHAR(255),
ADD COLUMN IF NOT EXISTS current_board_syllabus VARCHAR(255),
ADD COLUMN IF NOT EXISTS subjects_studied TEXT,
ADD COLUMN IF NOT EXISTS favourite_subject VARCHAR(255),
ADD COLUMN IF NOT EXISTS most_difficult_subject VARCHAR(255),
ADD COLUMN IF NOT EXISTS support_needed TEXT,
ADD COLUMN IF NOT EXISTS career_idea VARCHAR(255),
ADD COLUMN IF NOT EXISTS biggest_confusion_roadmap VARCHAR(255),
ADD COLUMN IF NOT EXISTS parent_concern TEXT,
ADD COLUMN IF NOT EXISTS degree_course VARCHAR(255),
ADD COLUMN IF NOT EXISTS institution_name VARCHAR(255),
ADD COLUMN IF NOT EXISTS current_year_semester VARCHAR(255),
ADD COLUMN IF NOT EXISTS major_specialization VARCHAR(255),
ADD COLUMN IF NOT EXISTS current_cgpa_percentage VARCHAR(255),
ADD COLUMN IF NOT EXISTS key_skills TEXT,
ADD COLUMN IF NOT EXISTS career_intention TEXT,
ADD COLUMN IF NOT EXISTS course_satisfaction VARCHAR(255),
ADD COLUMN IF NOT EXISTS preferred_future_path VARCHAR(255),
ADD COLUMN IF NOT EXISTS planning_study_abroad VARCHAR(255),
ADD COLUMN IF NOT EXISTS mentoring_interest VARCHAR(255),
ADD COLUMN IF NOT EXISTS current_job_role VARCHAR(255),
ADD COLUMN IF NOT EXISTS industry_sector VARCHAR(255),
ADD COLUMN IF NOT EXISTS work_experience VARCHAR(255),
ADD COLUMN IF NOT EXISTS core_skills_current_job TEXT,
ADD COLUMN IF NOT EXISTS certifications_training TEXT,
ADD COLUMN IF NOT EXISTS job_satisfaction_level INTEGER,
ADD COLUMN IF NOT EXISTS guidance_reason TEXT,
ADD COLUMN IF NOT EXISTS career_switch_plan VARCHAR(255),
ADD COLUMN IF NOT EXISTS upskill_willingness VARCHAR(255),
ADD COLUMN IF NOT EXISTS specific_challenge TEXT;

-- Disable CHECK constraints if they exist to allow more flexible values
-- (Note: Standard Supabase tables might have these from initial setup)
ALTER TABLE career_guidance_applications DROP CONSTRAINT IF EXISTS career_guidance_applications_standard_year_check;
ALTER TABLE career_guidance_applications DROP CONSTRAINT IF EXISTS career_guidance_applications_studies_preference_check;
ALTER TABLE career_guidance_applications DROP CONSTRAINT IF EXISTS career_guidance_applications_abroad_local_check;
ALTER TABLE career_guidance_applications DROP CONSTRAINT IF EXISTS career_guidance_applications_preferred_mode_of_study_check;
ALTER TABLE career_guidance_applications DROP CONSTRAINT IF EXISTS career_guidance_applications_career_support_duration_check;
ALTER TABLE career_guidance_applications DROP CONSTRAINT IF EXISTS career_guidance_applications_mentorship_required_check;
