import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FormInput from '../components/FormInput'
import FormSelect from '../components/FormSelect'
import FormTextarea from '../components/FormTextarea'
import { validateEmail, validatePhone, validateRequired, getTodayDate } from '../utils/validation'
import { submitCareerGuidanceApplication } from '../utils/formSubmission'

const CareerGuidancePage = () => {
  const navigate = useNavigate()
  const [view, setView] = useState('subcategories') // 'subcategories', 'form'
  const [selectedSubCategory, setSelectedSubCategory] = useState('')

  const [formData, setFormData] = useState({
    date: getTodayDate(),
    category: '',
    studentName: '',
    standardYear: '',
    dateOfBirth: '',
    age: '',
    gender: '',
    location: '',
    contactNumber: '',
    email: '',
    parentGuardianName: '',
    studiesPreference: '',
    studiesPreferenceOthers: '',
    abroadLocal: '',
    preferredCountry: '',
    cityIfAbroad: '',
    preferredUniversity: '',
    careerInterest: '',
    skillsStrengths: '',
    academicPerformance: '',
    hobbiesExtracurricular: '',
    preferredModeOfStudy: '',
    careerSupportDuration: '',
    mentorshipRequired: '',
    remarksNotes: '',
    // New specialized fields for Student Career Counselling
    currentClassYear: '',
    schoolCollegeName: '',
    city: '',
    currentStreamSubjects: '',
    lastExamResult: '',
    subjectEnjoyMost: '',
    subjectStruggleWith: '',
    hasCareerGoal: '',
    careerGoalMention: '',
    biggestConfusion: '',
    counsellingExpectation: '',
    preferredMode: '',
    preferredLanguage: '',
    preferredLanguageOthers: '',
    pincode: '',
    cityOthers: '',
    currentClassYearOthers: '',
    currentClassOthers: '',
    currentBoardSyllabusOthers: '',
    favouriteSubjectOthers: '',
    mostDifficultSubjectOthers: '',
    subjectEnjoyMostOthers: '',
    subjectStruggleWithOthers: '',
    // New specialized fields for Suitability Test
    educationLevel: '',
    subjectsWellPerforming: '',
    activitiesEnjoyMost: '',
    preferWorkingWith: '',
    logicSolving: '',
    creativeTasks: '',
    testReason: '',
    assessmentConsent: '',
    // New specialized fields for Study Abroad Guidance
    currentQualification: '',
    highestQualification: '',
    academicScoreGpa: '',
    mediumOfInstruction: '',
    intendedStudyLevel: '',
    preferredField: '',
    englishTestStatus: '',
    targetIntakeYear: '',
    budgetRange: '',
    // New specialized fields for 15-Years Career Roadmap (3 types)
    roadmapType: '', // 'school', 'college', 'professional'
    parentContactNumber: '',
    currentBoardSyllabus: '',
    subjectsStudied: '',
    favouriteSubject: '',
    mostDifficultSubject: '',
    supportNeeded: [], // Array for checkboxes
    careerIdea: '',
    biggestConfusionRoadmap: '',
    parentConcern: '',
    degreeCourse: '',
    institutionName: '',
    currentYearSemester: '',
    majorSpecialization: '',
    currentCgpaPercentage: '',
    keySkills: '',
    careerIntention: '',
    courseSatisfaction: '',
    preferredFuturePath: '',
    planningStudyAbroad: '',
    mentoringInterest: '',
    currentJobRole: '',
    industrySector: '',
    workExperience: '',
    coreSkillsCurrentJob: '',
    certificationsTraining: '',
    jobSatisfactionLevel: '',
    guidanceReason: '',
    careerSwitchPlan: '',
    upskillWillingness: '',
    specificChallenge: ''
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const standardYearOptions = [
    { value: '9th', label: '9th Standard' },
    { value: '10th', label: '10th Standard' },
    { value: '11th', label: '11th Standard' },
    { value: '12th', label: '12th Standard' },
    { value: '1st-year', label: '1st Year' },
    { value: '2nd-year', label: '2nd Year' },
    { value: '3rd-year', label: '3rd Year' },
    { value: '4th-year', label: '4th Year' },
    { value: 'graduate', label: 'Graduate' }
  ]

  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' }
  ]

  const studiesPreferenceOptions = [
    { value: 'science', label: 'Science' },
    { value: 'commerce', label: 'Commerce' },
    { value: 'arts', label: 'Arts' },
    { value: 'engineering', label: 'Engineering' },
    { value: 'medical', label: 'Medical' },
    { value: 'law', label: 'Law' },
    { value: 'business', label: 'Business' },
    { value: 'others', label: 'Others' }
  ]

  const abroadLocalOptions = [
    { value: 'local', label: 'Local' },
    { value: 'abroad', label: 'Abroad' }
  ]

  const preferredModeOfStudyOptions = [
    { value: 'online', label: 'Online' },
    { value: 'offline', label: 'Offline' },
    { value: 'hybrid', label: 'Hybrid' }
  ]

  const careerSupportDurationOptions = [
    { value: '1-year', label: '1 Year' },
    { value: '2-years', label: '2 Years' },
    { value: '5-years', label: '5 Years' },
    { value: '15-years', label: '15 Years' }
  ]

  const mentorshipRequiredOptions = [
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' }
  ]

  const classOptions = [
    { value: '9th Standard', label: '9th Standard' },
    { value: '10th Standard', label: '10th Standard' },
    { value: '11th Standard', label: '11th Standard' },
    { value: '12th Standard', label: '12th Standard' },
    { value: '1st Year UG', label: '1st Year UG' },
    { value: '2nd Year UG', label: '2nd Year UG' },
    { value: '3rd Year UG', label: '3rd Year UG' },
    { value: '4th Year UG', label: '4th Year UG' },
    { value: 'Graduate', label: 'Graduate' },
    { value: 'Working Professional', label: 'Working Professional' }
  ]

  const languageOptions = [
    { value: 'Tamil', label: 'Tamil' },
    { value: 'English', label: 'English' },
    { value: 'Hindi', label: 'Hindi' },
    { value: 'Malayalam', label: 'Malayalam' },
    { value: 'Telugu', label: 'Telugu' },
    { value: 'Kannada', label: 'Kannada' },
    { value: 'Others', label: 'Others' }
  ]

  const boardOptions = [
    { value: 'State Board', label: 'State Board' },
    { value: 'CBSE', label: 'CBSE' },
    { value: 'ICSE', label: 'ICSE' },
    { value: 'IGCSE', label: 'IGCSE' },
    { value: 'IB', label: 'IB' },
    { value: 'Others', label: 'Others' }
  ]

  const subjectOptions = [
    { value: 'Mathematics', label: 'Mathematics' },
    { value: 'Physics', label: 'Physics' },
    { value: 'Chemistry', label: 'Chemistry' },
    { value: 'Biology', label: 'Biology' },
    { value: 'Computer Science', label: 'Computer Science' },
    { value: 'Economics', label: 'Economics' },
    { value: 'Accountancy', label: 'Accountancy' },
    { value: 'Business Studies', label: 'Business Studies' },
    { value: 'History', label: 'History' },
    { value: 'Geography', label: 'Geography' },
    { value: 'English', label: 'English' },
    { value: 'Tamil', label: 'Tamil' },
    { value: 'Others', label: 'Others' }
  ]

  const educationLevelOptions = [
    { value: 'School (9th-10th)', label: 'School (9th-10th)' },
    { value: 'Higher Secondary (11th-12th)', label: 'Higher Secondary (11th-12th)' },
    { value: 'Diploma', label: 'Diploma' },
    { value: 'Undergraduate (UG)', label: 'Undergraduate (UG)' },
    { value: 'Postgraduate (PG)', label: 'Postgraduate (PG)' },
    { value: 'PhD / Research', label: 'PhD / Research' }
  ]

  const careerGuidanceSubCategories = [
    {
      id: 'student-career-counselling',
      label: 'Student Career Counselling',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=1200&fit=crop&q=80',
      icon: (
        <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none">
          <defs>
            <linearGradient id="counsellingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF6B6B" />
              <stop offset="100%" stopColor="#FF8E53" />
            </linearGradient>
          </defs>
          <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" stroke="url(#counsellingGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="url(#counsellingGradient)" fillOpacity="0.1" />
        </svg>
      )
    },
    {
      id: 'suitability-test',
      label: 'Suitability test',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=1200&fit=crop&q=80',
      icon: (
        <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none">
          <defs>
            <linearGradient id="testGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#667EEA" />
              <stop offset="100%" stopColor="#764BA2" />
            </linearGradient>

          </defs>
          <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" stroke="url(#testGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="url(#testGradient)" fillOpacity="0.1" />
        </svg>
      )
    },
    {
      id: 'study-abroad-guidance',
      label: 'Study Abroad Guidance',
      image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&h=1200&fit=crop&q=80',
      icon: (
        <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none">
          <defs>
            <linearGradient id="abroadGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4ECDC4" />
              <stop offset="100%" stopColor="#44A08D" />
            </linearGradient>
          </defs>
          <circle cx="12" cy="12" r="10" stroke="url(#abroadGradient)" strokeWidth="2" fill="url(#abroadGradient)" fillOpacity="0.1" />
          <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" stroke="url(#abroadGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    },
    {
      id: '15-years-career-roadmap',
      label: '15 Years Career Roadmap',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=1200&fit=crop&q=80',
      icon: (
        <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none">
          <defs>
            <linearGradient id="roadmapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FA709A" />
              <stop offset="100%" stopColor="#FEE140" />
            </linearGradient>
          </defs>
          <path d="M3 3v18h18M7 16l4-4 4 4 6-6" stroke="url(#roadmapGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="url(#roadmapGradient)" fillOpacity="0.1" />
          <circle cx="7" cy="7" r="2" fill="url(#roadmapGradient)" fillOpacity="0.4" />
          <circle cx="17" cy="17" r="2" fill="url(#roadmapGradient)" fillOpacity="0.4" />
        </svg>
      )
    }
  ]

  const resetFormData = () => {
    return {
      date: getTodayDate(),
      category: '',
      studentName: '',
      standardYear: '',
      dateOfBirth: '',
      age: '',
      gender: '',
      location: '',
      contactNumber: '',
      email: '',
      parentGuardianName: '',
      studiesPreference: '',
      studiesPreferenceOthers: '',
      abroadLocal: '',
      preferredCountry: '',
      cityIfAbroad: '',
      preferredUniversity: '',
      careerInterest: '',
      skillsStrengths: '',
      academicPerformance: '',
      hobbiesExtracurricular: '',
      preferredModeOfStudy: '',
      careerSupportDuration: '',
      mentorshipRequired: '',
      remarksNotes: '',
      currentClassYear: '',
      schoolCollegeName: '',
      city: '',
      currentStreamSubjects: '',
      lastExamResult: '',
      subjectEnjoyMost: '',
      subjectStruggleWith: '',
      hasCareerGoal: '',
      careerGoalMention: '',
      biggestConfusion: '',
      counsellingExpectation: '',
      preferredMode: '',
      preferredLanguage: '',
      preferredLanguageOthers: '',
      pincode: '',
      cityOthers: '',
      currentClassYearOthers: '',
      currentClassOthers: '',
      currentBoardSyllabusOthers: '',
      favouriteSubjectOthers: '',
      mostDifficultSubjectOthers: '',
      subjectEnjoyMostOthers: '',
      subjectStruggleWithOthers: '',
      educationLevel: '',
      subjectsWellPerforming: '',
      activitiesEnjoyMost: '',
      preferWorkingWith: '',
      logicSolving: '',
      creativeTasks: '',
      testReason: '',
      assessmentConsent: '',
      currentQualification: '',
      highestQualification: '',
      academicScoreGpa: '',
      mediumOfInstruction: '',
      intendedStudyLevel: '',
      preferredField: '',
      englishTestStatus: '',
      targetIntakeYear: '',
      budgetRange: '',
      roadmapType: '',
      parentContactNumber: '',
      currentBoardSyllabus: '',
      subjectsStudied: '',
      favouriteSubject: '',
      mostDifficultSubject: '',
      supportNeeded: [],
      careerIdea: '',
      biggestConfusionRoadmap: '',
      parentConcern: '',
      degreeCourse: '',
      institutionName: '',
      currentYearSemester: '',
      majorSpecialization: '',
      currentCgpaPercentage: '',
      keySkills: '',
      careerIntention: '',
      courseSatisfaction: '',
      preferredFuturePath: '',
      planningStudyAbroad: '',
      mentoringInterest: '',
      currentJobRole: '',
      industrySector: '',
      workExperience: '',
      coreSkillsCurrentJob: '',
      certificationsTraining: '',
      jobSatisfactionLevel: '',
      guidanceReason: '',
      careerSwitchPlan: '',
      upskillWillingness: '',
      specificChallenge: ''
    }
  }

  const handleSubCategoryClick = (subCategoryId) => {
    const subCategory = careerGuidanceSubCategories.find(sc => sc.id === subCategoryId)
    setSelectedSubCategory(subCategoryId)
    // Reset all form data and set new category
    const freshData = resetFormData()
    setFormData({
      ...freshData,
      category: subCategory?.label || ''
    })
    setErrors({}) // Clear all errors
    setView('form')
  }

  const handleBackToSubCategories = () => {
    setView('subcategories')
    setSelectedSubCategory('')
    // Completely reset form data
    setFormData(resetFormData())
    setErrors({}) // Clear all errors
  }

  const handleCategorySelect = (categoryValue) => {
    setFormData(prev => ({
      ...prev,
      category: categoryValue
    }))
    // Clear error for category
    if (errors.category) {
      setErrors(prev => ({
        ...prev,
        category: ''
      }))
    }
  }

  const calculateAge = (dateOfBirth) => {
    if (!dateOfBirth) return ''

    const today = new Date()
    const birthDate = new Date(dateOfBirth)

    if (isNaN(birthDate.getTime())) return ''

    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }

    return age > 0 ? age.toString() : ''
  }

  const fetchCityFromPincode = async (pincode) => {
    try {
      const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`)
      const data = await response.json()
      if (data && data[0] && data[0].Status === 'Success') {
        const district = data[0].PostOffice[0].District
        setFormData(prev => ({
          ...prev,
          city: district
        }))

        if (errors.city) {
          setErrors(prev => ({ ...prev, city: '' }))
        }
      }
    } catch (error) {
      console.error('Error fetching city:', error)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target

    // Phone number validation: allow only digits and max 10 chars
    if (name === 'contactNumber' || name === 'parentContactNumber' || name === 'phoneNumber') {
      if (!/^\d*$/.test(value)) return // Allow only digits
      if (value.length > 10) return // Max 10 digits
    }

    setFormData(prev => {
      const updatedData = {
        ...prev,
        [name]: value
      }

      if (name === 'dateOfBirth') {
        const calculatedAge = calculateAge(value)
        updatedData.age = calculatedAge
      }

      if (name === 'pincode' && value.length === 6) {
        fetchCityFromPincode(value)
      }

      return updatedData
    })
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
    if (name === 'dateOfBirth' && errors.age) {
      setErrors(prev => ({
        ...prev,
        age: ''
      }))
    }
  }

  const handleCheckboxChange = (e, fieldName) => {
    const { value, checked } = e.target
    setFormData(prev => {
      const currentValues = prev[fieldName] || []
      const updatedValues = checked
        ? [...currentValues, value]
        : currentValues.filter(v => v !== value)

      return {
        ...prev,
        [fieldName]: updatedValues
      }
    })

    // Clear error for this field
    if (errors[fieldName]) {
      setErrors(prev => ({
        ...prev,
        [fieldName]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    // Common fields validation
    if (!validateRequired(formData.category)) {
      newErrors.category = 'Category selection is required'
    }

    if (selectedSubCategory === 'student-career-counselling') {
      // Specialized validation for Student Career Counselling
      if (!validateRequired(formData.studentName)) newErrors.studentName = 'Student Name is required'
      if (!validateRequired(formData.age)) newErrors.age = 'Age is required'
      if (!validateRequired(formData.currentClassYear)) newErrors.currentClassYear = 'Current Class / Year is required'
      if (!validateRequired(formData.schoolCollegeName)) newErrors.schoolCollegeName = 'School / College Name is required'
      if (!validateRequired(formData.city)) newErrors.city = 'City is required'
      if (!validateRequired(formData.currentStreamSubjects)) newErrors.currentStreamSubjects = 'Stream / Subjects is required'
      if (!validateRequired(formData.lastExamResult)) newErrors.lastExamResult = 'Last Exam Result is required'
      if (!validateRequired(formData.subjectEnjoyMost)) newErrors.subjectEnjoyMost = 'This field is required'
      if (!validateRequired(formData.subjectStruggleWith)) newErrors.subjectStruggleWith = 'This field is required'
      if (!validateRequired(formData.hasCareerGoal)) newErrors.hasCareerGoal = 'Please select an option'
      if (formData.hasCareerGoal === 'yes' && !validateRequired(formData.careerGoalMention)) {
        newErrors.careerGoalMention = 'Please mention your career goal'
      }
      if (formData.hasCareerGoal === 'no' && !validateRequired(formData.biggestConfusion)) {
        newErrors.biggestConfusion = 'Please select your biggest confusion'
      }
      if (!validateRequired(formData.counsellingExpectation)) newErrors.counsellingExpectation = 'This field is required'
      if (!validateRequired(formData.preferredMode)) newErrors.preferredMode = 'Preferred mode is required'
      if (!validateRequired(formData.preferredLanguage)) newErrors.preferredLanguage = 'Preferred language is required'
      if (formData.preferredLanguage === 'Others' && !validateRequired(formData.preferredLanguageOthers)) {
        newErrors.preferredLanguageOthers = 'Please specify the language'
      }
      if (formData.city === 'Others' && !validateRequired(formData.cityOthers)) {
        newErrors.cityOthers = 'Please specify the city'
      }
      if (formData.currentClassYear === 'Others' && !validateRequired(formData.currentClassYearOthers)) {
        newErrors.currentClassYearOthers = 'Please specify the class/year'
      }
      if (formData.subjectEnjoyMost === 'Others' && !validateRequired(formData.subjectEnjoyMostOthers)) {
        newErrors.subjectEnjoyMostOthers = 'Please specify the subject'
      }
      if (formData.subjectStruggleWith === 'Others' && !validateRequired(formData.subjectStruggleWithOthers)) {
        newErrors.subjectStruggleWithOthers = 'Please specify the subject'
      }
      if (!validateRequired(formData.pincode)) {
        newErrors.pincode = 'Pincode is required'
      } else if (!/^\d{6}$/.test(formData.pincode)) {
        newErrors.pincode = 'Enter valid 6-digit pincode'
      }
    } else if (selectedSubCategory === 'suitability-test') {
      // Specialized validation for Suitability Test
      if (!validateRequired(formData.studentName)) newErrors.studentName = 'Candidate Name is required'
      if (!validateRequired(formData.age)) newErrors.age = 'Age is required'
      if (!validateRequired(formData.educationLevel)) newErrors.educationLevel = 'Education Level is required'
      if (!validateRequired(formData.pincode)) {
        newErrors.pincode = 'Pincode is required'
      } else if (!/^\d{6}$/.test(formData.pincode)) {
        newErrors.pincode = 'Enter valid 6-digit pincode'
      }
      if (!validateRequired(formData.city)) newErrors.city = 'City is required'
      if (!validateRequired(formData.subjectsWellPerforming)) newErrors.subjectsWellPerforming = 'This field is required'
      if (!validateRequired(formData.activitiesEnjoyMost)) newErrors.activitiesEnjoyMost = 'Please select an option'
      if (!validateRequired(formData.preferWorkingWith)) newErrors.preferWorkingWith = 'Please select an option'
      if (!validateRequired(formData.logicSolving)) newErrors.logicSolving = 'Please select an option'
      if (!validateRequired(formData.creativeTasks)) newErrors.creativeTasks = 'Please select an option'
      if (!validateRequired(formData.testReason)) newErrors.testReason = 'Please select an option'
      if (!validateRequired(formData.assessmentConsent)) newErrors.assessmentConsent = 'Consent is required'
    } else if (selectedSubCategory === 'study-abroad-guidance') {
      // Specialized validation for Study Abroad Guidance
      if (!validateRequired(formData.studentName)) newErrors.studentName = 'Student Name is required'
      if (!validateRequired(formData.age)) newErrors.age = 'Age is required'
      if (!validateRequired(formData.currentQualification)) newErrors.currentQualification = 'Current Qualification is required'
      if (!validateRequired(formData.pincode)) {
        newErrors.pincode = 'Pincode is required'
      } else if (!/^\d{6}$/.test(formData.pincode)) {
        newErrors.pincode = 'Enter valid 6-digit pincode'
      }
      if (!validateRequired(formData.city)) newErrors.city = 'City is required'
      if (!validateRequired(formData.contactNumber)) {
        newErrors.contactNumber = 'Contact Number is required'
      } else if (!validatePhone(formData.contactNumber)) {
        newErrors.contactNumber = 'Please enter a valid phone number'
      }
      if (!validateRequired(formData.highestQualification)) newErrors.highestQualification = 'This field is required'
      if (!validateRequired(formData.academicScoreGpa)) newErrors.academicScoreGpa = 'This field is required'
      if (!validateRequired(formData.mediumOfInstruction)) newErrors.mediumOfInstruction = 'Please select an option'
      if (!validateRequired(formData.preferredCountry)) newErrors.preferredCountry = 'Preferred country is required'
      if (!validateRequired(formData.intendedStudyLevel)) newErrors.intendedStudyLevel = 'Please select an option'
      if (!validateRequired(formData.preferredField)) newErrors.preferredField = 'Preferred field is required'
      if (!validateRequired(formData.englishTestStatus)) newErrors.englishTestStatus = 'Please select an option'
      if (!validateRequired(formData.targetIntakeYear)) newErrors.targetIntakeYear = 'Required'
      if (!validateRequired(formData.budgetRange)) newErrors.budgetRange = 'Required'
    } else if (selectedSubCategory === '15-years-career-roadmap') {
      if (!validateRequired(formData.roadmapType)) {
        newErrors.roadmapType = 'Form type selection is required'
      } else if (formData.roadmapType === 'school') {
        if (!validateRequired(formData.studentName)) newErrors.studentName = 'Student Name is required'
        if (!validateRequired(formData.age)) newErrors.age = 'Age is required'
        if (!validateRequired(formData.currentClass)) newErrors.currentClass = 'Current Class is required'
        if (!validateRequired(formData.schoolName)) newErrors.schoolName = 'School Name is required'
        if (!validateRequired(formData.city)) newErrors.city = 'City is required'
        if (!validateRequired(formData.parentGuardianName)) newErrors.parentGuardianName = 'Parent Name is required'
        if (!validateRequired(formData.parentContactNumber)) newErrors.parentContactNumber = 'Parent Contact is required'
        if (!validateRequired(formData.currentBoardSyllabus)) newErrors.currentBoardSyllabus = 'Board/Syllabus is required'
        if (!validateRequired(formData.subjectsStudied)) newErrors.subjectsStudied = 'This field is required'
        if (!validateRequired(formData.lastExamResult)) newErrors.lastExamResult = 'Last Exam Result is required'
        if (!validateRequired(formData.favouriteSubject)) newErrors.favouriteSubject = 'This field is required'
        if (!validateRequired(formData.mostDifficultSubject)) newErrors.mostDifficultSubject = 'This field is required'
        if (formData.supportNeeded.length === 0) newErrors.supportNeeded = 'Select at least one option'
        if (!validateRequired(formData.careerIdea)) newErrors.careerIdea = 'Please select an option'
        if (formData.careerIdea === 'Yes' && !validateRequired(formData.careerGoalMention)) {
          newErrors.careerGoalMention = 'Please mention it briefly'
        }
        if (!validateRequired(formData.biggestConfusionRoadmap)) newErrors.biggestConfusionRoadmap = 'Please select an option'
        if (!validateRequired(formData.preferredMode)) newErrors.preferredMode = 'Preferred mode is required'
        if (!validateRequired(formData.preferredLanguage)) newErrors.preferredLanguage = 'Preferred language is required'
        if (formData.preferredLanguage === 'Others' && !validateRequired(formData.preferredLanguageOthers)) {
          newErrors.preferredLanguageOthers = 'Please specify the language'
        }
        if (formData.city === 'Others' && !validateRequired(formData.cityOthers)) {
          newErrors.cityOthers = 'Please specify the city'
        }
        if (formData.currentClass === 'Others' && !validateRequired(formData.currentClassOthers)) {
          newErrors.currentClassOthers = 'Please specify the class'
        }
        if (formData.currentBoardSyllabus === 'Others' && !validateRequired(formData.currentBoardSyllabusOthers)) {
          newErrors.currentBoardSyllabusOthers = 'Please specify the board'
        }
        if (formData.favouriteSubject === 'Others' && !validateRequired(formData.favouriteSubjectOthers)) {
          newErrors.favouriteSubjectOthers = 'Please specify the subject'
        }
        if (formData.mostDifficultSubject === 'Others' && !validateRequired(formData.mostDifficultSubjectOthers)) {
          newErrors.mostDifficultSubjectOthers = 'Please specify the subject'
        }
        if (!validateRequired(formData.pincode)) {
          newErrors.pincode = 'Pincode is required'
        } else if (!/^\d{6}$/.test(formData.pincode)) {
          newErrors.pincode = 'Enter valid 6-digit pincode'
        }
      } else if (formData.roadmapType === 'college') {
        if (!validateRequired(formData.studentName)) newErrors.studentName = 'Full Name is required'
        if (!validateRequired(formData.age)) newErrors.age = 'Age is required'
        if (!validateRequired(formData.degreeCourse)) newErrors.degreeCourse = 'Degree / Course is required'
        if (!validateRequired(formData.institutionName)) newErrors.institutionName = 'Institution Name is required'
        if (!validateRequired(formData.pincode)) {
          newErrors.pincode = 'Pincode is required'
        } else if (!/^\d{6}$/.test(formData.pincode)) {
          newErrors.pincode = 'Enter valid 6-digit pincode'
        }
        if (!validateRequired(formData.city)) newErrors.city = 'City is required'
        if (!validateRequired(formData.contactNumber)) newErrors.contactNumber = 'Contact Number is required'
        if (!validateRequired(formData.email)) newErrors.email = 'Email ID is required'
        if (!validateRequired(formData.currentYearSemester)) newErrors.currentYearSemester = 'Year / Semester is required'
        if (!validateRequired(formData.majorSpecialization)) newErrors.majorSpecialization = 'Major / Specialization is required'
        if (!validateRequired(formData.currentCgpaPercentage)) newErrors.currentCgpaPercentage = 'Current CGPA is required'
        if (!validateRequired(formData.keySkills)) newErrors.keySkills = 'Key skills are required'
        if (formData.supportNeeded.length === 0) newErrors.supportNeeded = 'Select at least one option'
        if (!validateRequired(formData.courseSatisfaction)) newErrors.courseSatisfaction = 'Please select an option'
        if (!validateRequired(formData.preferredFuturePath)) newErrors.preferredFuturePath = 'Please select an option'
        if (!validateRequired(formData.planningStudyAbroad)) newErrors.planningStudyAbroad = 'Please select an option'
        if (!validateRequired(formData.mentoringInterest)) newErrors.mentoringInterest = 'Please select an option'
      } else if (formData.roadmapType === 'professional') {
        if (!validateRequired(formData.studentName)) newErrors.studentName = 'Full Name is required'
        if (!validateRequired(formData.age)) newErrors.age = 'Age is required'
        if (!validateRequired(formData.currentJobRole)) newErrors.currentJobRole = 'Current Job Role is required'
        if (!validateRequired(formData.industrySector)) newErrors.industrySector = 'Industry / Sector is required'
        if (!validateRequired(formData.workExperience)) newErrors.workExperience = 'Work Experience is required'
        if (!validateRequired(formData.pincode)) {
          newErrors.pincode = 'Pincode is required'
        } else if (!/^\d{6}$/.test(formData.pincode)) {
          newErrors.pincode = 'Enter valid 6-digit pincode'
        }
        if (!validateRequired(formData.city)) newErrors.city = 'City is required'
        if (!validateRequired(formData.contactNumber)) newErrors.contactNumber = 'Contact Number is required'
        if (!validateRequired(formData.email)) newErrors.email = 'Email ID is required'
        if (!validateRequired(formData.currentYearSemester)) newErrors.currentYearSemester = 'Year / Semester is required'
        if (!validateRequired(formData.majorSpecialization)) newErrors.majorSpecialization = 'Major / Specialization is required'
        if (!validateRequired(formData.currentCgpaPercentage)) newErrors.currentCgpaPercentage = 'Current CGPA is required'
        if (!validateRequired(formData.keySkills)) newErrors.keySkills = 'Key skills are required'
        if (formData.supportNeeded.length === 0) newErrors.supportNeeded = 'Select at least one option'
        if (!validateRequired(formData.courseSatisfaction)) newErrors.courseSatisfaction = 'Please select an option'
        if (!validateRequired(formData.preferredFuturePath)) newErrors.preferredFuturePath = 'Please select an option'
        if (!validateRequired(formData.planningStudyAbroad)) newErrors.planningStudyAbroad = 'Please select an option'
        if (!validateRequired(formData.mentoringInterest)) newErrors.mentoringInterest = 'Please select an option'
      } else if (formData.roadmapType === 'professional') {
        if (!validateRequired(formData.studentName)) newErrors.studentName = 'Full Name is required'
        if (!validateRequired(formData.age)) newErrors.age = 'Age is required'
        if (!validateRequired(formData.currentJobRole)) newErrors.currentJobRole = 'Current Job Role is required'
        if (!validateRequired(formData.industrySector)) newErrors.industrySector = 'Industry / Sector is required'
        if (!validateRequired(formData.workExperience)) newErrors.workExperience = 'Work Experience is required'
        if (!validateRequired(formData.city)) newErrors.city = 'City is required'
        if (!validateRequired(formData.contactNumber)) newErrors.contactNumber = 'Contact Number is required'
        if (!validateRequired(formData.coreSkillsCurrentJob)) newErrors.coreSkillsCurrentJob = 'Core skills are required'
        if (!validateRequired(formData.jobSatisfactionLevel)) newErrors.jobSatisfactionLevel = 'Level is required'
        if (formData.supportNeeded.length === 0) newErrors.supportNeeded = 'Select at least one option'
        if (!validateRequired(formData.guidanceReason)) newErrors.guidanceReason = 'Reason is required'
        if (!validateRequired(formData.careerSwitchPlan)) newErrors.careerSwitchPlan = 'Please select an option'
        if (!validateRequired(formData.upskillWillingness)) newErrors.upskillWillingness = 'Please select an option'
        if (!validateRequired(formData.mentoringInterest)) newErrors.mentoringInterest = 'Please select an option'
      }
    } else {
      // Original validation for other sub-categories
      if (!validateRequired(formData.studentName)) {
        newErrors.studentName = 'Student Name is required'
      }
      if (!validateRequired(formData.standardYear)) {
        newErrors.standardYear = 'Standard / Year is required'
      }
      if (!validateRequired(formData.dateOfBirth)) {
        newErrors.dateOfBirth = 'Date of Birth is required'
      }
      if (!validateRequired(formData.age)) {
        newErrors.age = 'Age is required'
      } else if (isNaN(formData.age) || parseInt(formData.age) < 1 || parseInt(formData.age) > 100) {
        newErrors.age = 'Please enter a valid age'
      }
      if (!validateRequired(formData.gender)) {
        newErrors.gender = 'Gender is required'
      }
      if (!validateRequired(formData.location)) {
        newErrors.location = 'Location is required'
      }
      if (!validateRequired(formData.contactNumber)) {
        newErrors.contactNumber = 'Contact Number is required'
      } else if (!validatePhone(formData.contactNumber)) {
        newErrors.contactNumber = 'Please enter a valid phone number'
      }
      if (!validateRequired(formData.email)) {
        newErrors.email = 'Email is required'
      } else if (!validateEmail(formData.email)) {
        newErrors.email = 'Please enter a valid email address'
      }
      if (!validateRequired(formData.parentGuardianName)) {
        newErrors.parentGuardianName = 'Parent / Guardian Name is required'
      }
      if (!validateRequired(formData.studiesPreference)) {
        newErrors.studiesPreference = 'Studies Preference is required'
      }
      if (formData.studiesPreference === 'others' && !validateRequired(formData.studiesPreferenceOthers)) {
        newErrors.studiesPreferenceOthers = 'Please specify the studies preference'
      }
      if (!validateRequired(formData.abroadLocal)) {
        newErrors.abroadLocal = 'Abroad / Local is required'
      }
      if (formData.abroadLocal === 'abroad') {
        if (!validateRequired(formData.cityIfAbroad)) {
          newErrors.cityIfAbroad = 'City (If Abroad) is required'
        }
      }
      if (!validateRequired(formData.preferredModeOfStudy)) {
        newErrors.preferredModeOfStudy = 'Preferred Mode of Study is required'
      }
      if (!validateRequired(formData.careerSupportDuration)) {
        newErrors.careerSupportDuration = 'Career Support Duration is required'
      }
      if (!validateRequired(formData.mentorshipRequired)) {
        newErrors.mentorshipRequired = 'Mentorship Required is required'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Prepare submission data with "Others" text if applicable
      const submissionData = {
        ...formData,
        studiesPreference: formData.studiesPreference === 'others'
          ? `Others: ${formData.studiesPreferenceOthers}`
          : formData.studiesPreference,
        preferredLanguage: formData.preferredLanguage === 'Others'
          ? `Others: ${formData.preferredLanguageOthers}`
          : formData.preferredLanguage,
        city: formData.city,
        currentClassYear: formData.currentClassYear === 'Others' ? `Others: ${formData.currentClassYearOthers}` : formData.currentClassYear,
        currentClass: formData.currentClass === 'Others' ? `Others: ${formData.currentClassOthers}` : formData.currentClass,
        currentBoardSyllabus: formData.currentBoardSyllabus === 'Others' ? `Others: ${formData.currentBoardSyllabusOthers}` : formData.currentBoardSyllabus,
        favouriteSubject: formData.favouriteSubject === 'Others' ? `Others: ${formData.favouriteSubjectOthers}` : formData.favouriteSubject,
        mostDifficultSubject: formData.mostDifficultSubject === 'Others' ? `Others: ${formData.mostDifficultSubjectOthers}` : formData.mostDifficultSubject,
        subjectEnjoyMost: formData.subjectEnjoyMost === 'Others' ? `Others: ${formData.subjectEnjoyMostOthers}` : formData.subjectEnjoyMost,
        subjectStruggleWith: formData.subjectStruggleWith === 'Others' ? `Others: ${formData.subjectStruggleWithOthers}` : formData.subjectStruggleWith,
        pincode: formData.pincode
      }
      await submitCareerGuidanceApplication(submissionData)
      navigate('/success', {
        state: {
          formType: 'Career Guidance Application',
          title: 'Career Guidance Application Submitted Successfully!'
        }
      })
    } catch (error) {
      console.error('Error submitting form:', error)
      alert(`An error occurred: ${error.message || 'Please try again.'}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Sub-Categories View
  if (view === 'subcategories') {
    return (
      <div className="container-custom py-6 md:py-8 lg:py-12 relative">
        {/* Mobile Floating Back Button */}
        <button
          onClick={() => navigate('/')}
          className="lg:hidden fixed top-4 left-4 z-[60] flex items-center justify-center w-10 h-10 rounded-full bg-[#409891] text-white shadow-lg active:scale-95 transition-all duration-200"
          aria-label="Go back"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 md:mb-10 px-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 md:mb-3" style={{ color: '#1F2937' }}>
              Career Guidance
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-600">
              Select a sub-category to continue with your application
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 px-4 md:px-0">
            {careerGuidanceSubCategories.map((subCategory, index) => (
              <button
                key={subCategory.id}
                onClick={() => handleSubCategoryClick(subCategory.id)}
                className="category-card group relative rounded-xl md:rounded-2xl p-6 md:p-8 shadow-md border-2 border-gray-200 hover:border-[#409891] transition-all duration-300 hover:shadow-xl hover:scale-105 overflow-hidden"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                }}
              >
                <div
                  className="absolute inset-0 transition-all duration-300"
                  style={{
                    backgroundImage: `url(${subCategory.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    filter: 'blur(2px)'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60 group-hover:from-black/50 group-hover:via-black/30 group-hover:to-black/50 transition-all duration-300" />
                <div className="relative z-10 flex flex-col items-center text-center space-y-4">
                  <div className="category-icon">
                    {subCategory.icon}
                  </div>
                  <h3 className="text-sm sm:text-base md:text-lg font-semibold text-white drop-shadow-lg group-hover:text-[#48ADB7] transition-colors duration-300">
                    {subCategory.label}
                  </h3>
                </div>
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                  style={{
                    background: 'linear-gradient(135deg, #409891 0%, #48ADB7 100%)'
                  }}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Application Form View
  return (
    <div className="container-custom py-8">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={handleBackToSubCategories}
          className="mb-6 flex items-center text-[#409891] hover:text-[#48ADB7] transition-colors duration-200 font-medium"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Sub-Categories
        </button>

        <div className="card-zoho p-8">
          <div className="mb-8 pb-6 border-b" style={{ borderColor: 'rgba(64, 152, 145, 0.2)' }}>
            <h1 className="text-2xl font-semibold mb-2" style={{ color: '#1F2937' }}>
              Career Guidance Application Form
            </h1>
            <p className="text-sm text-gray-600 mb-2">
              Please fill in all required fields to submit your career guidance application.
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium" style={{ color: '#409891' }}>Selected Category:</span> {formData.category}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <FormInput
              label="Date"
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              error={errors.date}
              required
              disabled
            />

            {selectedSubCategory === 'student-career-counselling' ? (
              <>
                {/* Specialized fields for Student Career Counselling */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormInput
                    label="1. Student Name"
                    type="text"
                    name="studentName"
                    value={formData.studentName}
                    onChange={handleChange}
                    error={errors.studentName}
                    required
                    placeholder="Enter student name"
                  />
                  <FormInput
                    label="2. Age"
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    error={errors.age}
                    required
                    placeholder="Enter age"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormSelect
                    label="3. Current Class / Year"
                    name="currentClassYear"
                    value={formData.currentClassYear}
                    onChange={handleChange}
                    options={classOptions}
                    error={errors.currentClassYear}
                    required
                  />
                  {formData.currentClassYear === 'Others' && (
                    <FormInput
                      label="Please specify class/year"
                      type="text"
                      name="currentClassYearOthers"
                      value={formData.currentClassYearOthers}
                      onChange={handleChange}
                      error={errors.currentClassYearOthers}
                      required
                      placeholder="Enter class/year"
                    />
                  )}
                  <FormInput
                    label="4. School / College Name"
                    type="text"
                    name="schoolCollegeName"
                    value={formData.schoolCollegeName}
                    onChange={handleChange}
                    error={errors.schoolCollegeName}
                    required
                    placeholder="Enter institution name"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormInput
                    label="Pincode"
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    error={errors.pincode}
                    required
                    placeholder="6 digit pincode"
                    maxLength={6}
                  />
                  <FormInput
                    label="5. City / District"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    error={errors.city}
                    required
                    placeholder="Enter city"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormInput
                    label="6. Current Stream / Subjects"
                    type="text"
                    name="currentStreamSubjects"
                    value={formData.currentStreamSubjects}
                    onChange={handleChange}
                    error={errors.currentStreamSubjects}
                    required
                    placeholder="e.g. Biology-Maths / CS"
                  />
                  <FormInput
                    label="7. Last Exam Result (% / Grade)"
                    type="text"
                    name="lastExamResult"
                    value={formData.lastExamResult}
                    onChange={handleChange}
                    error={errors.lastExamResult}
                    required
                    placeholder="e.g. 85% / A Grade"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <FormSelect
                      label="8. Subject you enjoy the most"
                      name="subjectEnjoyMost"
                      value={formData.subjectEnjoyMost}
                      onChange={handleChange}
                      options={subjectOptions}
                      error={errors.subjectEnjoyMost}
                      required
                    />
                    {formData.subjectEnjoyMost === 'Others' && (
                      <FormInput label="Please specify subject" name="subjectEnjoyMostOthers" value={formData.subjectEnjoyMostOthers} onChange={handleChange} error={errors.subjectEnjoyMostOthers} required />
                    )}
                  </div>
                  <div className="space-y-4">
                    <FormSelect
                      label="9. Subject you struggle with"
                      name="subjectStruggleWith"
                      value={formData.subjectStruggleWith}
                      onChange={handleChange}
                      options={subjectOptions}
                      error={errors.subjectStruggleWith}
                      required
                    />
                    {formData.subjectStruggleWith === 'Others' && (
                      <FormInput label="Please specify subject" name="subjectStruggleWithOthers" value={formData.subjectStruggleWithOthers} onChange={handleChange} error={errors.subjectStruggleWithOthers} required />
                    )}
                  </div>
                </div>

                <div className="space-y-4 pt-2">
                  <FormSelect
                    label="10. Do you have a career goal now?"
                    name="hasCareerGoal"
                    value={formData.hasCareerGoal}
                    onChange={handleChange}
                    options={[
                      { value: 'yes', label: 'Yes' },
                      { value: 'no', label: 'No' },
                      { value: 'not-sure', label: 'Not sure' }
                    ]}
                    error={errors.hasCareerGoal}
                    required
                  />

                  {formData.hasCareerGoal === 'yes' && (
                    <FormTextarea
                      label="11. If yes, mention it"
                      name="careerGoalMention"
                      value={formData.careerGoalMention}
                      onChange={handleChange}
                      error={errors.careerGoalMention}
                      placeholder="Tell us about your career goal"
                      required
                    />
                  )}

                  {formData.hasCareerGoal === 'no' && (
                    <FormSelect
                      label="12. If no, what is your biggest confusion?"
                      name="biggestConfusion"
                      value={formData.biggestConfusion}
                      onChange={handleChange}
                      options={[
                        { value: 'Too many choices', label: 'Too many choices' },
                        { value: 'Family pressure', label: 'Family pressure' },
                        { value: 'Fear', label: 'Fear' },
                        { value: 'Lack of guidance', label: 'Lack of guidance' }
                      ]}
                      error={errors.biggestConfusion}
                      required
                    />
                  )}
                </div>

                <FormTextarea
                  label="13. What do you expect from this counselling session?"
                  name="counsellingExpectation"
                  value={formData.counsellingExpectation}
                  onChange={handleChange}
                  error={errors.counsellingExpectation}
                  required
                  rows={3}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormSelect
                    label="14. Preferred counselling mode"
                    name="preferredMode"
                    value={formData.preferredMode}
                    onChange={handleChange}
                    options={[
                      { value: 'Online', label: 'Online' },
                      { value: 'Offline', label: 'Offline' }
                    ]}
                    error={errors.preferredMode}
                    required
                  />
                  <FormSelect
                    label="15. Preferred language"
                    name="preferredLanguage"
                    value={formData.preferredLanguage}
                    onChange={handleChange}
                    options={languageOptions}
                    error={errors.preferredLanguage}
                    required
                  />
                  {formData.preferredLanguage === 'Others' && (
                    <FormInput
                      label="Please specify language"
                      type="text"
                      name="preferredLanguageOthers"
                      value={formData.preferredLanguageOthers}
                      onChange={handleChange}
                      error={errors.preferredLanguageOthers}
                      required
                      placeholder="Enter language"
                    />
                  )}
                </div>
              </>
            ) : selectedSubCategory === 'suitability-test' ? (
              <>
                {/* Specialized fields for Suitability Test */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormInput
                    label="1. Candidate Name"
                    type="text"
                    name="studentName"
                    value={formData.studentName}
                    onChange={handleChange}
                    error={errors.studentName}
                    required
                    placeholder="Enter candidate name"
                  />
                  <FormInput
                    label="2. Age"
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    error={errors.age}
                    required
                    placeholder="Enter age"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormSelect
                    label="3. Current Education Level"
                    name="educationLevel"
                    value={formData.educationLevel}
                    onChange={handleChange}
                    options={educationLevelOptions}
                    error={errors.educationLevel}
                    required
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormInput
                      label="Pincode"
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      error={errors.pincode}
                      required
                      placeholder="6 digit pincode"
                      maxLength={6}
                    />
                    <FormInput
                      label="4. City"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      error={errors.city}
                      required
                      placeholder="Enter city"
                    />
                  </div>
                </div>

                <FormTextarea
                  label="5. Subjects you perform well in"
                  name="subjectsWellPerforming"
                  value={formData.subjectsWellPerforming}
                  onChange={handleChange}
                  error={errors.subjectsWellPerforming}
                  required
                  placeholder="Mention subjects you are good at"
                  rows={2}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormSelect
                    label="6. Activities you enjoy most"
                    name="activitiesEnjoyMost"
                    value={formData.activitiesEnjoyMost}
                    onChange={handleChange}
                    options={[
                      { value: 'Reading', label: 'Reading' },
                      { value: 'Tech', label: 'Tech' },
                      { value: 'Art', label: 'Art' },
                      { value: 'Numbers', label: 'Numbers' },
                      { value: 'Helping people', label: 'Helping people' }
                    ]}
                    error={errors.activitiesEnjoyMost}
                    required
                  />
                  <FormSelect
                    label="7. You prefer working with:"
                    name="preferWorkingWith"
                    value={formData.preferWorkingWith}
                    onChange={handleChange}
                    options={[
                      { value: 'People', label: 'People' },
                      { value: 'Data', label: 'Data' },
                      { value: 'Machines', label: 'Machines' },
                      { value: 'Ideas', label: 'Ideas' }
                    ]}
                    error={errors.preferWorkingWith}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormSelect
                    label="8. You enjoy solving problems logically"
                    name="logicSolving"
                    value={formData.logicSolving}
                    onChange={handleChange}
                    options={[
                      { value: 'Yes', label: 'Yes' },
                      { value: 'No', label: 'No' }
                    ]}
                    error={errors.logicSolving}
                    required
                  />
                  <FormSelect
                    label="9. You enjoy creative tasks"
                    name="creativeTasks"
                    value={formData.creativeTasks}
                    onChange={handleChange}
                    options={[
                      { value: 'Yes', label: 'Yes' },
                      { value: 'No', label: 'No' }
                    ]}
                    error={errors.creativeTasks}
                    required
                  />
                </div>

                <FormSelect
                  label="10. Why are you taking this test?"
                  name="testReason"
                  value={formData.testReason}
                  onChange={handleChange}
                  options={[
                    { value: 'Career clarity', label: 'Career clarity' },
                    { value: 'Stream selection', label: 'Stream selection' },
                    { value: 'Career switch', label: 'Career switch' }
                  ]}
                  error={errors.testReason}
                  required
                />

                <FormSelect
                  label="11. Are you comfortable with aptitude & psychometric assessment?"
                  name="assessmentConsent"
                  value={formData.assessmentConsent}
                  onChange={handleChange}
                  options={[
                    { value: 'Yes', label: 'Yes' }
                  ]}
                  error={errors.assessmentConsent}
                  required
                />
              </>
            ) : selectedSubCategory === 'study-abroad-guidance' ? (
              <>
                {/* Specialized fields for Study Abroad Guidance */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormInput
                    label="1. Student Name"
                    type="text"
                    name="studentName"
                    value={formData.studentName}
                    onChange={handleChange}
                    error={errors.studentName}
                    required
                    placeholder="Enter student name"
                  />
                  <FormInput
                    label="2. Age"
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    error={errors.age}
                    required
                    placeholder="Enter age"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormInput
                    label="3. Current Qualification"
                    type="text"
                    name="currentQualification"
                    value={formData.currentQualification}
                    onChange={handleChange}
                    error={errors.currentQualification}
                    required
                    placeholder="e.g. Final year B.E / 12th Std"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormInput
                      label="Pincode"
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      error={errors.pincode}
                      required
                      placeholder="6 digit pincode"
                      maxLength={6}
                    />
                    <FormInput
                      label="4. City"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      error={errors.city}
                      required
                      placeholder="Enter city"
                    />
                  </div>
                </div>

                <FormInput
                  label="5. Contact Number"
                  type="tel"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  error={errors.contactNumber}
                  required
                  placeholder="Enter contact number"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t" style={{ borderColor: 'rgba(64, 152, 145, 0.1)' }}>
                  <FormInput
                    label="6. Highest qualification completed"
                    type="text"
                    name="highestQualification"
                    value={formData.highestQualification}
                    onChange={handleChange}
                    error={errors.highestQualification}
                    required
                    placeholder="e.g. 12th / Diploma / UG"
                  />
                  <FormInput
                    label="7. Academic score / GPA"
                    type="text"
                    name="academicScoreGpa"
                    value={formData.academicScoreGpa}
                    onChange={handleChange}
                    error={errors.academicScoreGpa}
                    required
                    placeholder="e.g. 8.5 CGPA / 90%"
                  />
                </div>

                <FormSelect
                  label="8. Medium of instruction"
                  name="mediumOfInstruction"
                  value={formData.mediumOfInstruction}
                  onChange={handleChange}
                  options={[
                    { value: 'English', label: 'English' },
                    { value: 'Others', label: 'Others' }
                  ]}
                  error={errors.mediumOfInstruction}
                  required
                />

                <div className="pt-4 border-t" style={{ borderColor: 'rgba(64, 152, 145, 0.1)' }}>
                  <FormInput
                    label="9. Preferred country / countries"
                    type="text"
                    name="preferredCountry"
                    value={formData.preferredCountry}
                    onChange={handleChange}
                    error={errors.preferredCountry}
                    required
                    placeholder="e.g. Germany, UK, USA"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormSelect
                    label="10. Intended level of study"
                    name="intendedStudyLevel"
                    value={formData.intendedStudyLevel}
                    onChange={handleChange}
                    options={[
                      { value: 'UG', label: 'UG' },
                      { value: 'PG', label: 'PG' },
                      { value: 'Diploma', label: 'Diploma' }
                    ]}
                    error={errors.intendedStudyLevel}
                    required
                  />
                  <FormInput
                    label="11. Preferred course / field"
                    type="text"
                    name="preferredField"
                    value={formData.preferredField}
                    onChange={handleChange}
                    error={errors.preferredField}
                    required
                    placeholder="e.g. MS in Data Science"
                  />
                </div>

                <div className="pt-4 border-t" style={{ borderColor: 'rgba(64, 152, 145, 0.1)' }}>
                  <FormSelect
                    label="12. English test status"
                    name="englishTestStatus"
                    value={formData.englishTestStatus}
                    onChange={handleChange}
                    options={[
                      { value: 'Taken', label: 'Taken' },
                      { value: 'Planning', label: 'Planning' },
                      { value: 'Not yet', label: 'Not yet' }
                    ]}
                    error={errors.englishTestStatus}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormInput
                    label="13. Target intake year"
                    type="text"
                    name="targetIntakeYear"
                    value={formData.targetIntakeYear}
                    onChange={handleChange}
                    error={errors.targetIntakeYear}
                    required
                    placeholder="e.g. 2025 / 2026"
                  />
                  <FormInput
                    label="14. Budget range (Approx.)"
                    type="text"
                    name="budgetRange"
                    value={formData.budgetRange}
                    onChange={handleChange}
                    error={errors.budgetRange}
                    required
                    placeholder="e.g. 20-30 Lakhs"
                  />
                </div>
              </>
            ) : selectedSubCategory === '15-years-career-roadmap' ? (
              <div className="space-y-8">
                {/* Type Selection Dropdown */}
                <div className="bg-[#f0f9f8] p-6 rounded-xl border-2 border-[#409891]/20">
                  <FormSelect
                    label="Please Select Your Current Status"
                    name="roadmapType"
                    value={formData.roadmapType}
                    onChange={handleChange}
                    options={[
                      { value: 'school', label: 'School Student Career Guidance Form' },
                      { value: 'college', label: 'College Student Career & Future Planning Form' },
                      { value: 'professional', label: 'Working Professional Career Strategy Form' }
                    ]}
                    error={errors.roadmapType}
                    required
                  />
                  <p className="mt-2 text-xs text-gray-500 italic">
                    Select the option that best describes your current stage to see the appropriate form.
                  </p>
                </div>

                {formData.roadmapType === 'school' && (
                  <div className="space-y-6 pt-4 animate-fadeIn">
                    <h2 className="text-xl font-bold text-[#409891] border-b pb-2">School Student Career Guidance Form</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormInput label="Student Name" name="studentName" value={formData.studentName} onChange={handleChange} error={errors.studentName} required />
                      <FormInput label="Age" type="number" name="age" value={formData.age} onChange={handleChange} error={errors.age} required />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <FormSelect label="Current Class" name="currentClass" value={formData.currentClass} onChange={handleChange} options={classOptions} error={errors.currentClass} required />
                        {formData.currentClass === 'Others' && <FormInput label="Please specify class" name="currentClassOthers" value={formData.currentClassOthers} onChange={handleChange} error={errors.currentClassOthers} required />}
                      </div>
                      <FormInput label="School Name" name="schoolName" value={formData.schoolName} onChange={handleChange} error={errors.schoolName} required />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <FormInput label="Pincode" name="pincode" value={formData.pincode} onChange={handleChange} error={errors.pincode} required maxLength={6} placeholder="6 digit pincode" />
                      </div>
                      <div className="space-y-4">
                        <FormInput label="City / District" name="city" value={formData.city} onChange={handleChange} error={errors.city} required placeholder="Enter city" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormInput label="Parent / Guardian Name" name="parentGuardianName" value={formData.parentGuardianName} onChange={handleChange} error={errors.parentGuardianName} required />
                      <FormInput label="Parent Contact Number" type="tel" name="parentContactNumber" value={formData.parentContactNumber} onChange={handleChange} error={errors.parentContactNumber} required />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <FormSelect label="Current Board / Syllabus" name="currentBoardSyllabus" value={formData.currentBoardSyllabus} onChange={handleChange} options={boardOptions} error={errors.currentBoardSyllabus} required />
                        {formData.currentBoardSyllabus === 'Others' && <FormInput label="Please specify board" name="currentBoardSyllabusOthers" value={formData.currentBoardSyllabusOthers} onChange={handleChange} error={errors.currentBoardSyllabusOthers} required />}
                      </div>
                      <FormInput label="Last Exam Result (% / Grade)" name="lastExamResult" value={formData.lastExamResult} onChange={handleChange} error={errors.lastExamResult} required />
                    </div>
                    <FormTextarea label="Subjects Currently Studied" name="subjectsStudied" value={formData.subjectsStudied} onChange={handleChange} error={errors.subjectsStudied} required rows={2} />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <FormSelect label="Favourite Subject" name="favouriteSubject" value={formData.favouriteSubject} onChange={handleChange} options={subjectOptions} error={errors.favouriteSubject} required />
                        {formData.favouriteSubject === 'Others' && <FormInput label="Please specify subject" name="favouriteSubjectOthers" value={formData.favouriteSubjectOthers} onChange={handleChange} error={errors.favouriteSubjectOthers} required />}
                      </div>
                      <div className="space-y-4">
                        <FormSelect label="Most Difficult Subject" name="mostDifficultSubject" value={formData.mostDifficultSubject} onChange={handleChange} options={subjectOptions} error={errors.mostDifficultSubject} required />
                        {formData.mostDifficultSubject === 'Others' && <FormInput label="Please specify subject" name="mostDifficultSubjectOthers" value={formData.mostDifficultSubjectOthers} onChange={handleChange} error={errors.mostDifficultSubjectOthers} required />}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="block text-sm font-medium text-gray-700">What support are you looking for? (Select all that apply) <span className="text-red-500">*</span></label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                        {['Student Career Counselling', 'Suitability Test', 'Study Abroad Guidance', '15-Years Career Roadmap'].map(opt => (
                          <label key={opt} className="flex items-center space-x-3 cursor-pointer group">
                            <input
                              type="checkbox"
                              value={opt}
                              checked={formData.supportNeeded.includes(opt)}
                              onChange={(e) => handleCheckboxChange(e, 'supportNeeded')}
                              className="w-4 h-4 text-[#409891] border-gray-300 rounded focus:ring-[#409891]"
                            />
                            <span className="text-sm text-gray-700 group-hover:text-[#409891] transition-colors">{opt}</span>
                          </label>
                        ))}
                      </div>
                      {errors.supportNeeded && <p className="text-xs text-red-500">{errors.supportNeeded}</p>}
                    </div>

                    <FormSelect
                      label="Do you already have a career idea?"
                      name="careerIdea"
                      value={formData.careerIdea}
                      onChange={handleChange}
                      options={[
                        { value: 'Yes', label: 'Yes' },
                        { value: 'No', label: 'No' },
                        { value: 'Not Sure', label: 'Not Sure' }
                      ]}
                      error={errors.careerIdea}
                      required
                    />

                    {formData.careerIdea === 'Yes' && (
                      <FormTextarea label="If yes, please mention it briefly" name="careerGoalMention" value={formData.careerGoalMention} onChange={handleChange} error={errors.careerGoalMention} required rows={2} />
                    )}

                    <FormSelect
                      label="Biggest confusion right now"
                      name="biggestConfusionRoadmap"
                      value={formData.biggestConfusionRoadmap}
                      onChange={handleChange}
                      options={[
                        { value: 'Stream selection', label: 'Stream selection' },
                        { value: 'Career options', label: 'Career options' },
                        { value: 'Parental expectations', label: 'Parental expectations' },
                        { value: 'Academic pressure', label: 'Academic pressure' }
                      ]}
                      error={errors.biggestConfusionRoadmap}
                      required
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormSelect
                        label="Preferred counselling mode"
                        name="preferredMode"
                        value={formData.preferredMode}
                        onChange={handleChange}
                        options={[
                          { value: 'Online', label: 'Online' },
                          { value: 'Offline', label: 'Offline' }
                        ]}
                        error={errors.preferredMode}
                        required
                      />
                      <FormSelect label="Preferred language" name="preferredLanguage" value={formData.preferredLanguage} onChange={handleChange} options={languageOptions} error={errors.preferredLanguage} required />
                      {formData.preferredLanguage === 'Others' && (
                        <FormInput
                          label="Please specify language"
                          type="text"
                          name="preferredLanguageOthers"
                          value={formData.preferredLanguageOthers}
                          onChange={handleChange}
                          error={errors.preferredLanguageOthers}
                          required
                          placeholder="Enter language"
                        />
                      )}
                    </div>

                    <FormTextarea label="Any concern the parent wants the counsellor to know?" name="parentConcern" value={formData.parentConcern} onChange={handleChange} rows={3} />
                  </div>
                )}

                {formData.roadmapType === 'college' && (
                  <div className="space-y-6 pt-4 animate-fadeIn">
                    <h2 className="text-xl font-bold text-[#409891] border-b pb-2">College Student Career & Future Planning Form</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormInput label="Full Name" name="studentName" value={formData.studentName} onChange={handleChange} error={errors.studentName} required />
                      <FormInput label="Age" type="number" name="age" value={formData.age} onChange={handleChange} error={errors.age} required />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormInput label="Degree / Course" name="degreeCourse" value={formData.degreeCourse} onChange={handleChange} error={errors.degreeCourse} required />
                      <FormInput label="Institution Name" name="institutionName" value={formData.institutionName} onChange={handleChange} error={errors.institutionName} required />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <FormInput label="Pincode" name="pincode" value={formData.pincode} onChange={handleChange} error={errors.pincode} required maxLength={6} placeholder="6 digit pincode" />
                      </div>
                      <div className="space-y-4">
                        <FormInput label="City / District" name="city" value={formData.city} onChange={handleChange} error={errors.city} required placeholder="Enter city" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormInput label="Contact Number" type="tel" name="contactNumber" value={formData.contactNumber} onChange={handleChange} error={errors.contactNumber} required />
                      <FormInput label="Email ID" type="email" name="email" value={formData.email} onChange={handleChange} error={errors.email} required />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormInput label="Current Year / Semester" name="currentYearSemester" value={formData.currentYearSemester} onChange={handleChange} error={errors.currentYearSemester} required />
                      <FormInput label="Major / Specialization" name="majorSpecialization" value={formData.majorSpecialization} onChange={handleChange} error={errors.majorSpecialization} required />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormInput label="Current CGPA / Percentage" name="currentCgpaPercentage" value={formData.currentCgpaPercentage} onChange={handleChange} error={errors.currentCgpaPercentage} required />
                      <div className="h-full" /> {/* Spacer */}
                    </div>
                    <FormTextarea label="Key skills developed so far" name="keySkills" value={formData.keySkills} onChange={handleChange} error={errors.keySkills} required rows={3} />

                    <div className="space-y-3">
                      <label className="block text-sm font-medium text-gray-700">What type of guidance do you need? (Select all that apply) <span className="text-red-500">*</span></label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                        {['Student Career Counselling', 'Suitability Test', 'Study Abroad Guidance', '15-Years Career Roadmap'].map(opt => (
                          <label key={opt} className="flex items-center space-x-3 cursor-pointer group">
                            <input
                              type="checkbox"
                              value={opt}
                              checked={formData.supportNeeded.includes(opt)}
                              onChange={(e) => handleCheckboxChange(e, 'supportNeeded')}
                              className="w-4 h-4 text-[#409891] border-gray-300 rounded focus:ring-[#409891]"
                            />
                            <span className="text-sm text-gray-700 group-hover:text-[#409891] transition-colors">{opt}</span>
                          </label>
                        ))}
                      </div>
                      {errors.supportNeeded && <p className="text-xs text-red-500">{errors.supportNeeded}</p>}
                    </div>

                    <FormTextarea label="Current career intention (if any)" name="careerIntention" value={formData.careerIntention} onChange={handleChange} rows={2} />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormSelect
                        label="Are you satisfied with your current course?"
                        name="courseSatisfaction"
                        value={formData.courseSatisfaction}
                        onChange={handleChange}
                        options={[
                          { value: 'Yes', label: 'Yes' },
                          { value: 'No', label: 'No' },
                          { value: 'Confused', label: 'Confused' }
                        ]}
                        error={errors.courseSatisfaction}
                        required
                      />
                      <FormSelect
                        label="Preferred future path"
                        name="preferredFuturePath"
                        value={formData.preferredFuturePath}
                        onChange={handleChange}
                        options={[
                          { value: 'Higher studies', label: 'Higher studies' },
                          { value: 'Job', label: 'Job' },
                          { value: 'Entrepreneurship', label: 'Entrepreneurship' },
                          { value: 'Career switch', label: 'Career switch' }
                        ]}
                        error={errors.preferredFuturePath}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormSelect
                        label="Are you planning to study abroad?"
                        name="planningStudyAbroad"
                        value={formData.planningStudyAbroad}
                        onChange={handleChange}
                        options={[
                          { value: 'Yes', label: 'Yes' },
                          { value: 'Maybe', label: 'Maybe' },
                          { value: 'No', label: 'No' }
                        ]}
                        error={errors.planningStudyAbroad}
                        required
                      />
                      {formData.planningStudyAbroad !== 'No' && (
                        <FormInput label="Target country (if applicable)" name="preferredCountry" value={formData.preferredCountry} onChange={handleChange} />
                      )}
                    </div>

                    <FormSelect
                      label="Are you open to long-term mentoring?"
                      name="mentoringInterest"
                      value={formData.mentoringInterest}
                      onChange={handleChange}
                      options={[
                        { value: 'Yes', label: 'Yes' },
                        { value: 'No', label: 'No' }
                      ]}
                      error={errors.mentoringInterest}
                      required
                    />
                  </div>
                )}

                {formData.roadmapType === 'professional' && (
                  <div className="space-y-6 pt-4 animate-fadeIn">
                    <h2 className="text-xl font-bold text-[#409891] border-b pb-2">Working Professional Career Strategy Form</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormInput label="Full Name" name="studentName" value={formData.studentName} onChange={handleChange} error={errors.studentName} required />
                      <FormInput label="Age" type="number" name="age" value={formData.age} onChange={handleChange} error={errors.age} required />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormInput label="Current Job Role" name="currentJobRole" value={formData.currentJobRole} onChange={handleChange} error={errors.currentJobRole} required />
                      <FormInput label="Industry / Sector" name="industrySector" value={formData.industrySector} onChange={handleChange} error={errors.industrySector} required />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormInput label="Total Work Experience" name="workExperience" value={formData.workExperience} onChange={handleChange} error={errors.workExperience} required placeholder="e.g. 5 Years" />
                      <div className="space-y-4">
                        <FormInput label="Pincode" name="pincode" value={formData.pincode} onChange={handleChange} error={errors.pincode} required maxLength={6} placeholder="6 digit pincode" />
                      </div>
                      <div className="space-y-4">
                        <FormInput label="City / District" name="city" value={formData.city} onChange={handleChange} error={errors.city} required placeholder="Enter city" />
                      </div>
                    </div>
                    <FormInput label="Contact Number" type="tel" name="contactNumber" value={formData.contactNumber} onChange={handleChange} error={errors.contactNumber} required />

                    <FormTextarea label="Core skills used in your current job" name="coreSkillsCurrentJob" value={formData.coreSkillsCurrentJob} onChange={handleChange} error={errors.coreSkillsCurrentJob} required rows={3} />
                    <FormTextarea label="Certifications / Training completed" name="certificationsTraining" value={formData.certificationsTraining} onChange={handleChange} rows={2} />

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Job satisfaction level (1–5) <span className="text-red-500">*</span></label>
                      <div className="flex items-center space-x-6 py-2">
                        {[1, 2, 3, 4, 5].map(level => (
                          <label key={level} className="flex flex-col items-center cursor-pointer group">
                            <input
                              type="radio"
                              name="jobSatisfactionLevel"
                              value={level}
                              checked={Number(formData.jobSatisfactionLevel) === level}
                              onChange={handleChange}
                              className="w-5 h-5 text-[#409891] focus:ring-[#409891]"
                            />
                            <span className="text-sm mt-1 group-hover:text-[#409891]">{level}</span>
                          </label>
                        ))}
                      </div>
                      {errors.jobSatisfactionLevel && <p className="text-xs text-red-500">{errors.jobSatisfactionLevel}</p>}
                    </div>

                    <div className="space-y-3">
                      <label className="block text-sm font-medium text-gray-700">What kind of support are you looking for? (Select all that apply) <span className="text-red-500">*</span></label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                        {['Career Counselling', 'Suitability Test (Career Switch)', 'Study Abroad (Higher Studies / Migration)', '15-Years Career Roadmap'].map(opt => (
                          <label key={opt} className="flex items-center space-x-3 cursor-pointer group">
                            <input
                              type="checkbox"
                              value={opt}
                              checked={formData.supportNeeded.includes(opt)}
                              onChange={(e) => handleCheckboxChange(e, 'supportNeeded')}
                              className="w-4 h-4 text-[#409891] border-gray-300 rounded focus:ring-[#409891]"
                            />
                            <span className="text-sm text-gray-700 group-hover:text-[#409891] transition-colors">{opt}</span>
                          </label>
                        ))}
                      </div>
                      {errors.supportNeeded && <p className="text-xs text-red-500">{errors.supportNeeded}</p>}
                    </div>

                    <FormSelect
                      label="Primary reason for seeking guidance"
                      name="guidanceReason"
                      value={formData.guidanceReason}
                      onChange={handleChange}
                      options={[
                        { value: 'Growth stagnation', label: 'Growth stagnation' },
                        { value: 'Career change', label: 'Career change' },
                        { value: 'Salary improvement', label: 'Salary improvement' },
                        { value: 'Work-life balance', label: 'Work-life balance' },
                        { value: 'Long-term planning', label: 'Long-term planning' }
                      ]}
                      error={errors.guidanceReason}
                      required
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormSelect
                        label="Are you planning a career switch within the next 2 years?"
                        name="careerSwitchPlan"
                        value={formData.careerSwitchPlan}
                        onChange={handleChange}
                        options={[
                          { value: 'Yes', label: 'Yes' },
                          { value: 'No', label: 'No' },
                          { value: 'Exploring', label: 'Exploring' }
                        ]}
                        error={errors.careerSwitchPlan}
                        required
                      />
                      <FormSelect
                        label="Willingness to upskill continuously"
                        name="upskillWillingness"
                        value={formData.upskillWillingness}
                        onChange={handleChange}
                        options={[
                          { value: 'Yes', label: 'Yes' },
                          { value: 'No', label: 'No' }
                        ]}
                        error={errors.upskillWillingness}
                        required
                      />
                    </div>

                    <FormSelect
                      label="Interest in long-term mentoring"
                      name="mentoringInterest"
                      value={formData.mentoringInterest}
                      onChange={handleChange}
                      options={[
                        { value: 'Yes', label: 'Yes' },
                        { value: 'No', label: 'No' }
                      ]}
                      error={errors.mentoringInterest}
                    />
                    <FormTextarea label="Any specific challenge the counsellor should know about?" name="specificChallenge" value={formData.specificChallenge} onChange={handleChange} rows={3} />
                  </div>
                )}
              </div>
            ) : (
              /* Original fields for other sub-categories */
              <>
                <FormInput
                  label="Student Name"
                  type="text"
                  name="studentName"
                  value={formData.studentName}
                  onChange={handleChange}
                  error={errors.studentName}
                  required
                  placeholder="Enter student name"
                />

                <FormSelect
                  label="Standard / Year"
                  name="standardYear"
                  value={formData.standardYear}
                  onChange={handleChange}
                  options={standardYearOptions}
                  error={errors.standardYear}
                  required
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormInput
                    label="Date of Birth"
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    error={errors.dateOfBirth}
                    required
                  />
                  <FormInput
                    label="Age"
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    error={errors.age}
                    required
                    placeholder="Auto-calculated from DOB"
                    min="1"
                    max="100"
                    readOnly
                  />
                </div>

                <FormSelect
                  label="Gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  options={genderOptions}
                  error={errors.gender}
                  required
                />

                <FormInput
                  label="Location"
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  error={errors.location}
                  required
                  placeholder="Enter location"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormInput
                    label="Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                    required
                    placeholder="example@email.com"
                  />
                  <FormInput
                    label="Contact Number"
                    type="tel"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    error={errors.contactNumber}
                    required
                    placeholder="Enter contact number"
                  />
                </div>

                <FormInput
                  label="Parent / Guardian Name"
                  type="text"
                  name="parentGuardianName"
                  value={formData.parentGuardianName}
                  onChange={handleChange}
                  error={errors.parentGuardianName}
                  required
                  placeholder="Enter parent or guardian name"
                />

                <FormSelect
                  label="Studies Preference"
                  name="studiesPreference"
                  value={formData.studiesPreference}
                  onChange={handleChange}
                  options={studiesPreferenceOptions}
                  error={errors.studiesPreference}
                  required
                />
                {formData.studiesPreference === 'others' && (
                  <FormInput
                    label="Please specify"
                    type="text"
                    name="studiesPreferenceOthers"
                    value={formData.studiesPreferenceOthers}
                    onChange={handleChange}
                    error={errors.studiesPreferenceOthers}
                    required
                    placeholder="Enter studies preference"
                  />
                )}

                <FormSelect
                  label="Abroad / Local"
                  name="abroadLocal"
                  value={formData.abroadLocal}
                  onChange={handleChange}
                  options={abroadLocalOptions}
                  error={errors.abroadLocal}
                  required
                />

                <FormInput
                  label="Preferred Country"
                  type="text"
                  name="preferredCountry"
                  value={formData.preferredCountry}
                  onChange={handleChange}
                  error={errors.preferredCountry}
                  placeholder="Enter preferred country (optional)"
                />

                {formData.abroadLocal === 'abroad' && (
                  <FormInput
                    label="City (If Abroad)"
                    type="text"
                    name="cityIfAbroad"
                    value={formData.cityIfAbroad}
                    onChange={handleChange}
                    error={errors.cityIfAbroad}
                    required={formData.abroadLocal === 'abroad'}
                    placeholder="Enter city name"
                  />
                )}

                <FormInput
                  label="Preferred University"
                  type="text"
                  name="preferredUniversity"
                  value={formData.preferredUniversity}
                  onChange={handleChange}
                  error={errors.preferredUniversity}
                  placeholder="Enter preferred university (optional)"
                />

                <FormInput
                  label="Career Interest"
                  type="text"
                  name="careerInterest"
                  value={formData.careerInterest}
                  onChange={handleChange}
                  error={errors.careerInterest}
                  placeholder="Enter career interest (optional)"
                />

                <FormTextarea
                  label="Skills / Strengths"
                  name="skillsStrengths"
                  value={formData.skillsStrengths}
                  onChange={handleChange}
                  error={errors.skillsStrengths}
                  placeholder="Describe your skills and strengths (optional)"
                  rows={3}
                />

                <FormInput
                  label="Academic Performance"
                  type="text"
                  name="academicPerformance"
                  value={formData.academicPerformance}
                  onChange={handleChange}
                  error={errors.academicPerformance}
                  placeholder="Enter academic performance details (optional)"
                />

                <FormTextarea
                  label="Hobbies / Extracurricular"
                  name="hobbiesExtracurricular"
                  value={formData.hobbiesExtracurricular}
                  onChange={handleChange}
                  error={errors.hobbiesExtracurricular}
                  placeholder="Describe hobbies and extracurricular activities (optional)"
                  rows={3}
                />

                <FormSelect
                  label="Preferred Mode of Study"
                  name="preferredModeOfStudy"
                  value={formData.preferredModeOfStudy}
                  onChange={handleChange}
                  options={preferredModeOfStudyOptions}
                  error={errors.preferredModeOfStudy}
                  required
                />

                <FormSelect
                  label="Career Support Duration"
                  name="careerSupportDuration"
                  value={formData.careerSupportDuration}
                  onChange={handleChange}
                  options={careerSupportDurationOptions}
                  error={errors.careerSupportDuration}
                  required
                />

                <FormSelect
                  label="Mentorship Required"
                  name="mentorshipRequired"
                  value={formData.mentorshipRequired}
                  onChange={handleChange}
                  options={mentorshipRequiredOptions}
                  error={errors.mentorshipRequired}
                  required
                />

                <FormTextarea
                  label="Remarks / Notes"
                  name="remarksNotes"
                  value={formData.remarksNotes}
                  onChange={handleChange}
                  error={errors.remarksNotes}
                  placeholder="Any additional remarks or notes (optional)"
                  rows={4}
                />
              </>
            )}

            <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t" style={{ borderColor: 'rgba(64, 152, 145, 0.2)' }}>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Submitting...</span>
                  </>
                ) : (
                  'Submit Application'
                )}
              </button>
              <button
                type="button"
                onClick={() => navigate('/')}
                className="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-1 transition-colors duration-150"
              >
                Cancel
              </button>
            </div>
          </form>
        </div >
      </div >
    </div >
  )
}

export default CareerGuidancePage