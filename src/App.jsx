import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import ScrollToTop from './components/ScrollToTop'
import ProtectedRoute from './components/ProtectedRoute'
import RouteGuard from './components/RouteGuard'
import LoginPage from './pages/LoginPage'
import LandingPage from './pages/LandingPage'
import VendorPage from './pages/VendorPage'
import PartnersPage from './pages/PartnersPage'
import JobSeekerPage from './pages/JobSeekerPage'
import StudentInternshipPage from './pages/StudentInternshipPage'
import TrainingSessionPage from './pages/TrainingSessionPage'
import CareerGuidancePage from './pages/CareerGuidancePage'
import SuccessPageWrapper from './pages/SuccessPage'
import ContactPage from './pages/ContactPage'
import GeneralEnquiryPage from './pages/GeneralEnquiryPage'
import ReportsPage from './pages/ReportsPage'

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Login page - no layout */}
        <Route 
          path="/login" 
          element={<LoginPage />} 
        />
        
        {/* All routes with layout - require authentication */}
        <Route path="/*" element={
          <RouteGuard>
            <Layout>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/vendor" element={<VendorPage />} />
                <Route path="/partners" element={<PartnersPage />} />
                <Route path="/jobseeker" element={<JobSeekerPage />} />
                <Route path="/student-internship" element={<StudentInternshipPage />} />
                <Route path="/training-session" element={<TrainingSessionPage />} />
                <Route path="/career-guidance" element={<CareerGuidancePage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/general-enquiry" element={<GeneralEnquiryPage />} />
                <Route 
                  path="/reports" 
                  element={
                    <ProtectedRoute>
                      <ReportsPage />
                    </ProtectedRoute>
                  } 
                />
                <Route path="/success" element={<SuccessPageWrapper />} />
              </Routes>
            </Layout>
          </RouteGuard>
        } />
        
        {/* Catch all - redirect to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  )
}

export default App
