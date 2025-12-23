import { supabase, uploadFile } from '../lib/supabase'

/**
 * Submit Vendor Application
 */
export const submitVendorApplication = async (formData) => {
  try {
    let uploadFileUrl = null

    // Upload file if provided (don't fail if upload fails)
    if (formData.uploadFile) {
      try {
        uploadFileUrl = await uploadFile(formData.uploadFile, 'applications', 'vendor')
      } catch (uploadError) {
        console.warn('File upload failed, continuing without file:', uploadError)
        // Continue without file URL
      }
    }

    const { data, error } = await supabase
      .from('vendor_applications')
      .insert([
        {
          date: formData.date,
          category: formData.category,
          categoryname: formData.category,
          vendor_name: formData.vendorName,
          company_name: formData.companyName,
          company_address: formData.companyAddress,
          email: formData.email,
          phone_number: formData.phoneNumber,
          appointment_status: formData.appointmentStatus,
          business_type: formData.businessType,
          upload_file_url: uploadFileUrl,
          remarks: formData.remarks || null
        }
      ])
      .select()

    if (error) {
      console.error('Supabase error:', error)
      throw new Error(error.message || 'Failed to save application. Please check your database setup.')
    }
    return { success: true, data }
  } catch (error) {
    console.error('Error submitting vendor application:', error)
    throw error
  }
}

/**
 * Submit B2B Application
 */
export const submitB2BApplication = async (formData) => {
  try {
    let uploadFileUrl = null

    // Upload file if provided (don't fail if upload fails)
    if (formData.uploadFile) {
      try {
        uploadFileUrl = await uploadFile(formData.uploadFile, 'applications', 'b2b')
      } catch (uploadError) {
        console.warn('File upload failed, continuing without file:', uploadError)
      }
    }

    const { data, error } = await supabase
      .from('b2b_applications')
      .insert([
        {
          date: formData.date,
          contact_person_name: formData.contactPersonName,
          organization_name: formData.organizationName,
          organization_address: formData.organizationAddress,
          business_type: formData.businessType,
          mode_of_business: formData.modeOfBusiness,
          company_website_email: formData.companyWebsiteEmail,
          upload_file_url: uploadFileUrl,
          remarks: formData.remarks || null
        }
      ])
      .select()

    if (error) {
      console.error('Supabase error:', error)
      throw new Error(error.message || 'Failed to save application. Please check your database setup.')
    }
    return { success: true, data }
  } catch (error) {
    console.error('Error submitting B2B application:', error)
    throw error
  }
}

/**
 * Submit Partners Application
 */
export const submitPartnersApplication = async (formData) => {
  try {
    let uploadFileUrl = null

    // Upload file if provided (don't fail if upload fails)
    if (formData.uploadFile) {
      try {
        uploadFileUrl = await uploadFile(formData.uploadFile, 'applications', 'partners')
      } catch (uploadError) {
        console.warn('File upload failed, continuing without file:', uploadError)
      }
    }

    const { data, error } = await supabase
      .from('partner')
      .insert([
        {
          date: formData.date,
          category: formData.category,
          contact_person_name: formData.contactPersonName,
          organization_name: formData.organizationName,
          organization_address: formData.organizationAddress,
          email: formData.email,
          phone_number: formData.phoneNumber,
          upload_file_url: uploadFileUrl,
          remarks: formData.remarks || null
        }
      ])
      .select()

    if (error) {
      console.error('Supabase error:', error)
      throw new Error(error.message || 'Failed to save application. Please check your database setup.')
    }
    return { success: true, data }
  } catch (error) {
    console.error('Error submitting partners application:', error)
    throw error
  }
}

/**
 * Submit Job Seeker Application
 */
export const submitJobSeekerApplication = async (formData) => {
  try {
    let uploadResumeUrl = null

    // Upload resume if provided (don't fail if upload fails)
    if (formData.uploadResume) {
      try {
        uploadResumeUrl = await uploadFile(formData.uploadResume, 'applications', 'job-seekers')
      } catch (uploadError) {
        console.warn('File upload failed, continuing without file:', uploadError)
      }
    }

    const { data, error } = await supabase
      .from('job_seeker_applications')
      .insert([
        {
          date: formData.date,
          category: formData.category,
          categoryname: formData.category,
          full_name: formData.fullName,
          gender: formData.gender,
          dob: formData.dob,
          age: parseInt(formData.age) || 0,
          address: formData.address,
          blood_group: formData.bloodGroup,
          contact_number: formData.contactNumber,
          email: formData.email,
          qualification: formData.qualification,
          department: formData.department,
          years_of_experience: formData.yearsOfExperience,
          preferred_job_type: formData.preferredJobType,
          upload_resume_url: uploadResumeUrl,
          remarks: formData.remarks || null
        }
      ])
      .select()

    if (error) {
      console.error('Supabase error:', error)
      throw new Error(error.message || 'Failed to save application. Please check your database setup.')
    }
    return { success: true, data }
  } catch (error) {
    console.error('Error submitting job seeker application:', error)
    throw error
  }
}

/**
 * Submit Student Internship Application
 */
export const submitStudentInternshipApplication = async (formData) => {
  try {
    let uploadFileUrl = null

    // Upload file if provided (don't fail if upload fails)
    if (formData.uploadFile) {
      try {
        uploadFileUrl = await uploadFile(formData.uploadFile, 'applications', 'student-internship')
      } catch (uploadError) {
        console.warn('File upload failed, continuing without file:', uploadError)
      }
    }

    const { data, error } = await supabase
      .from('student_internship_applications')
      .insert([
        {
          date: formData.date,
          category: formData.category,
          categoryname: formData.category,
          full_name: formData.fullName,
          registration_number: formData.registrationNumber,
          address: formData.address,
          email: formData.email,
          contact_number: formData.contactNumber,
          blood_group: formData.bloodGroup,
          dob: formData.dob,
          age: parseInt(formData.age) || 0,
          gender: formData.gender,
          college_institution_name: formData.collegeInstitutionName,
          course_type: formData.courseType,
          department: formData.department,
          internship_domain: formData.internshipDomain,
          duration: formData.duration,
          upload_file_url: uploadFileUrl,
          remarks: formData.remarks || null
        }
      ])
      .select()

    if (error) {
      console.error('Supabase error:', error)
      throw new Error(error.message || 'Failed to save application. Please check your database setup.')
    }
    return { success: true, data }
  } catch (error) {
    console.error('Error submitting student internship application:', error)
    throw error
  }
}

/**
 * Submit Career Guidance Application
 */
export const submitCareerGuidanceApplication = async (formData) => {
  try {
    let table = ''
    let dataToInsert = {}

    // Route to specialized tables based on category/subcategory
    if (formData.category === 'Student Career Counselling') {
      table = 'student_career_counselling'
      dataToInsert = {
        student_name: formData.studentName,
        age: parseInt(formData.age) || 0,
        current_class_year: formData.currentClassYear || null,
        school_college_name: formData.schoolCollegeName || null,
        city: formData.city || null,
        current_stream_subjects: formData.currentStreamSubjects || null,
        last_exam_result: formData.lastExamResult || null,
        subject_enjoy_most: formData.subjectEnjoyMost || null,
        subject_struggle_with: formData.subjectStruggleWith || null,
        has_career_goal: formData.hasCareerGoal || null,
        career_goal_mention: formData.careerGoalMention || null,
        biggest_confusion: formData.biggestConfusion || null,
        counselling_expectation: formData.counsellingExpectation || null,
        preferred_mode: formData.preferredMode || null,
        preferred_language: formData.preferredLanguage || null,
        pincode: formData.pincode || null
      }
    } else if (formData.category === 'Suitability test') {
      table = 'suitability_test_applications'
      dataToInsert = {
        candidate_name: formData.studentName,
        age: parseInt(formData.age) || 0,
        education_level: formData.educationLevel || null,
        city: formData.city || null,
        subjects_well_performing: formData.subjectsWellPerforming || null,
        activities_enjoy_most: formData.activitiesEnjoyMost || null,
        prefer_working_with: formData.preferWorkingWith || null,
        logic_solving: formData.logicSolving || null,
        creative_tasks: formData.creativeTasks || null,
        test_reason: formData.testReason || null,
        assessment_consent: formData.assessmentConsent || null,
        pincode: formData.pincode || null
      }
    } else if (formData.category === 'Study Abroad Guidance') {
      table = 'study_abroad_guidance_applications'
      dataToInsert = {
        student_name: formData.studentName,
        age: parseInt(formData.age) || 0,
        current_qualification: formData.currentQualification || null,
        city: formData.city || null,
        contact_number: formData.contactNumber || null,
        highest_qualification: formData.highestQualification || null,
        academic_score_gpa: formData.academicScoreGpa || null,
        medium_of_instruction: formData.mediumOfInstruction || null,
        preferred_countries: formData.preferredCountry || null,
        intended_study_level: formData.intendedStudyLevel || null,
        preferred_field: formData.preferredField || null,
        english_test_status: formData.englishTestStatus || null,
        target_intake_year: formData.targetIntakeYear || null,
        budget_range: formData.budgetRange || null,
        pincode: formData.pincode || null
      }
    } else if (formData.category === '15 Years Career Roadmap') {
      if (formData.roadmapType === 'school') {
        table = 'roadmap_school_student_applications'
        dataToInsert = {
          student_name: formData.studentName,
          age: parseInt(formData.age) || 0,
          current_class: formData.currentClass || null,
          school_name: formData.schoolName || null,
          city: formData.city || null,
          parent_guardian_name: formData.parentGuardianName || null,
          parent_contact_number: formData.parentContactNumber || null,
          current_board_syllabus: formData.currentBoardSyllabus || null,
          subjects_studied: formData.subjectsStudied || null,
          last_exam_result: formData.lastExamResult || null,
          favourite_subject: formData.favouriteSubject || null,
          most_difficult_subject: formData.mostDifficultSubject || null,
          support_needed: Array.isArray(formData.supportNeeded) ? formData.supportNeeded.join(', ') : formData.supportNeeded || null,
          has_career_idea: formData.careerIdea || null,
          career_idea_mention: formData.careerGoalMention || null,
          biggest_confusion: formData.biggestConfusionRoadmap || null,
          preferred_mode: formData.preferredMode || null,
          preferred_language: formData.preferredLanguage || null,
          parent_concern: formData.parentConcern || null,
          pincode: formData.pincode || null
        }
      } else if (formData.roadmapType === 'college') {
        table = 'roadmap_college_student_applications'
        dataToInsert = {
          full_name: formData.studentName,
          age: parseInt(formData.age) || 0,
          degree_course: formData.degreeCourse || null,
          institution_name: formData.institutionName || null,
          city: formData.city || null,
          contact_number: formData.contactNumber || null,
          email_id: formData.email || null,
          current_year_semester: formData.currentYearSemester || null,
          major_specialization: formData.majorSpecialization || null,
          current_cgpa_percentage: formData.currentCgpaPercentage || null,
          key_skills: formData.keySkills || null,
          guidance_needed: Array.isArray(formData.supportNeeded) ? formData.supportNeeded.join(', ') : formData.supportNeeded || null,
          career_intention: formData.careerIntention || null,
          course_satisfaction: formData.courseSatisfaction || null,
          preferred_future_path: formData.preferredFuturePath || null,
          planning_study_abroad: formData.planningStudyAbroad || null,
          target_country: formData.preferredCountry || null,
          mentoring_interest: formData.mentoringInterest || null,
          pincode: formData.pincode || null
        }
      } else if (formData.roadmapType === 'professional') {
        table = 'roadmap_professional_applications'
        dataToInsert = {
          full_name: formData.studentName,
          age: parseInt(formData.age) || 0,
          current_job_role: formData.currentJobRole || null,
          industry_sector: formData.industrySector || null,
          total_work_experience: formData.workExperience || null,
          city: formData.city || null,
          contact_number: formData.contactNumber || null,
          core_skills_current_job: formData.coreSkillsCurrentJob || null,
          certifications_training: formData.certificationsTraining || null,
          job_satisfaction_level: parseInt(formData.jobSatisfactionLevel) || 0,
          support_looking_for: Array.isArray(formData.supportNeeded) ? formData.supportNeeded.join(', ') : formData.supportNeeded || null,
          primary_reason_guidance: formData.guidanceReason || null,
          career_switch_2_years: formData.careerSwitchPlan || null,
          upskill_willingness: formData.upskillWillingness || null,
          mentoring_interest: formData.mentoringInterest || null,
          specific_challenge: formData.specificChallenge || null,
          pincode: formData.pincode || null
        }
      }
    }

    if (!table) {
      throw new Error('Invalid specialized application type')
    }

    const { data, error } = await supabase
      .from(table)
      .insert([dataToInsert])
      .select()

    if (error) {
      console.error(`Supabase error (${table}):`, error)
      throw new Error(error.message || `Failed to save ${table} application.`)
    }
    return { success: true, data }
  } catch (error) {
    console.error('Error submitting career guidance application:', error)
    throw error
  }
}

/**
 * Submit Training Session Application
 */
export const submitTrainingSessionApplication = async (formData) => {
  try {
    const { data, error } = await supabase
      .from('course_enquiry_registrations')
      .insert([
        {
          date: formData.date,
          category: formData.category || null,
          sub_category: formData.subCategory || null,
          name: formData.name || null,
          email: formData.email,
          phone_number: formData.phoneNumber || null,
          date_of_birth: formData.dateOfBirth || null,
          age: formData.age ? parseInt(formData.age) : null,
          address: formData.address,
          course_enquiry: formData.courseEnquiry || null,
          remarks: formData.remarks || null
        }
      ])
      .select()

    if (error) {
      console.error('Supabase error:', error)
      throw new Error(error.message || 'Failed to save application. Please check your database setup.')
    }
    return { success: true, data }
  } catch (error) {
    console.error('Error submitting course enquiry application:', error)
    throw error
  }
}

