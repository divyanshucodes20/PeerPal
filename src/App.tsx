import type React from "react"
import { useState, lazy, Suspense } from "react"
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"
import styled, { ThemeProvider } from "styled-components"
import { useSelector } from "react-redux"
import Loader from "./components/loader"
import ProtectedRoute from "./components/protected-route"
import Footer from "./components/Footer"
import { Toaster } from "react-hot-toast"

const Navigation = lazy(() => import("./components/Navigation"))
const LoginPage = lazy(() => import("./components/LoginPage"))
const SignupPage = lazy(() => import("./components/SignupPage"))
const LearnersSection = lazy(() => import("./components/LearnersSection"))
const RoommatesSection = lazy(() => import("./components/RoommatesSection"))
const RidesSection = lazy(() => import("./components/RidesSection"))
const ChatSection = lazy(() => import("./components/ChatSection"))
const GroupList = lazy(() => import("./components/GroupList"))
const GroupSettings = lazy(() => import("./components/GroupSettings"))
const CreateGroup = lazy(() => import("./components/CreateGroup"))
const AboutPage = lazy(() => import("./components/AboutUs"))
const ContactPage = lazy(() => import("./components/ContactUs"))
const LandingPage = lazy(() => import("./components/LandingPage"))
const MyProfile = lazy(() => import("./components/MyProfile"))
const NotFoundPage = lazy(() => import("./components/NotFound"))
const ThankYouPage = lazy(() => import("./components/thankyou"))
const GoalsSection = lazy(() => import("./components/GoalsSection"))
const CreateLearnerRequest = lazy(() => import("./components/CreateLearnerRequest"))
const CreateRoommateRequest = lazy(() => import("./components/CreateRoommateRequest"))
const CreateRideRequest = lazy(() => import("./components/CreateRideRequest"))
const MyRoommateRequests = lazy(() => import("./components/MyRoommateRequests"))
const MyRideRequests = lazy(() => import("./components/MyRideRequests"))
const VerificationPage = lazy(() => import("./pages/VerificationPage"))
const RoommateDetailsPage=lazy(()=>import("./pages/RoommateDetails"))
const RideDetailsPage=lazy(()=>import("./components/RideDetailsPage"))
const LearnerDetailsPage=lazy(()=>import("./pages/LearnerDetails"))
const LinkToExisitingProject=lazy(()=>import("./pages/LinkToExistingProject"))
const Dashboard = lazy(() => import("./pages/DashBoard"))
const ProjectDetails = lazy(() => import("./pages/MyProjectDetails"))
const RideDetails = lazy(() => import("./pages/MyRideDetails"))
const LearningRequestDetails = lazy(() => import("./pages/MyLearnerDetails"))

const lightTheme = {
  background: "#f7fafc",
  text: "#2d3748",
  primary: "#3182ce",
}

const darkTheme = {
  background: "#1a202c",
  text: "#e2e8f0",
  primary: "#63b3ed",
}

const AppContainer = styled.div`
  font-family: "Arial", sans-serif;
  color: ${(props) => props.theme.text};
  background-color: ${(props) => props.theme.background};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  transition: background-color 0.3s ease, color 0.3s ease;
`

const ContentContainer = styled.div`
  padding-top: 60px;
  flex: 1;
`

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false)

  const { isAuthenticated, isVerified } = useSelector((state: any) => state.auth)

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <Router>
        <AppContainer>
          <Suspense fallback={<Loader />}>
            <Navigation isDarkMode={isDarkMode} toggleTheme={toggleTheme} isUserLoggedIn={isAuthenticated} />
            <ContentContainer>
              <Routes>
                <Route
                  path="/"
                  element={
                    isAuthenticated ? isVerified ? <Dashboard/> : <Navigate to="/verify" replace /> : <LandingPage />
                  }
                />

                {/* Public Routes */}
                <Route path="/about" element={<AboutPage isDarkMode={isDarkMode} toggleTheme={toggleTheme} />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/thankyou" element={<ThankYouPage />} />

                {/* Verification Route */}
                <Route
                  path="/verify"
                  element={isAuthenticated && !isVerified ? <VerificationPage /> : <Navigate to="/" replace />}
                />

                {/* Protected Routes */}
                <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} isVerified={isVerified} />}>
                  <Route path="/learners" element={<LearnersSection />} />
                  <Route path="/learners/:id" element={<LearnerDetailsPage />} />
                  <Route path="/learners/isProject/:id" element={<LinkToExisitingProject />} />
                  <Route path="/roommates" element={<RoommatesSection />} />
                  <Route path="/roommates/:id" element={<RoommateDetailsPage />} />
                  <Route path="/my/project/:id" element={<ProjectDetails />} />
        <Route path="/my/ride/:id" element={<RideDetails />} />
        <Route path="/my/learning-request/:id" element={<LearningRequestDetails />} />
                  <Route path="/rides" element={<RidesSection />} />
                  <Route path="/rides/:id" element={<RideDetailsPage />} />
                  <Route path="/chat" element={<ChatSection />} />
                  <Route path="/chat/:id" element={<ChatSection />} />
                  <Route path="/profile" element={<MyProfile />} />
                  <Route path="/chat/groups" element={<GroupList />} />
                  <Route path="/chat/groups/:id" element={<GroupSettings />} />
                  <Route path="/goals" element={<GoalsSection />} />
                  <Route path="/goals/:projectId" element={<GoalsSection />} />
                  <Route path="/request/learner" element={<CreateLearnerRequest />} />
                  <Route path="/request/roommate" element={<CreateRoommateRequest />} />
                  <Route path="/request/ride" element={<CreateRideRequest />} />
                  <Route path="/chat/create-group" element={<CreateGroup />} />
                  <Route path="/my-roommate-requests" element={<MyRoommateRequests />} />
                  <Route path="/my-ride-requests" element={<MyRideRequests />} />
                </Route>

                {/* 404 Page */}
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </ContentContainer>
            <Footer isDarkMode={isDarkMode} />
          </Suspense>
          <Toaster position="bottom-center"/>
        </AppContainer>
      </Router>
    </ThemeProvider>
  )
}

export default App

