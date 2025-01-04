import React, { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import Loader from './components/loader';
import ProtectedRoute from './components/protected-route';
import Footer from './components/Footer';

const Navigation = lazy(() => import('./components/Navigation'));
const HomePage = lazy(() => import('./components/HomePage'));
const LoginPage = lazy(() => import('./components/LoginPage'));
const SignupPage = lazy(() => import('./components/SignupPage'));
const LearnersSection = lazy(() => import('./components/LearnersSection'));
const RoommatesSection = lazy(() => import('./components/RoommatesSection'));
const RidesSection = lazy(() => import('./components/RidesSection'));
const ChatSection = lazy(() => import('./components/ChatSection'));
const GroupList = lazy(() => import('./components/GroupList'));
const GroupSettings = lazy(() => import('./components/GroupSettings'));
const AboutPage = lazy(() => import('./components/AboutUs'));
const ContactPage = lazy(() => import('./components/ContactUs'));
const LandingPage = lazy(() => import('./components/LandingPage'));
const MyProfile = lazy(() => import('./components/MyProfile'));
const NotFoundPage = lazy(() => import('./components/NotFound'));
const ThankYouPage = lazy(() => import('./components/thankyou'));
const GoalsSection = lazy(() => import('./components/GoalsSection'));
const CreateRideRequest = lazy(() => import('./components/CreateRideRequest'));

const lightTheme = {
  background: '#f7fafc',
  text: '#2d3748',
  primary: '#3182ce',
};

const darkTheme = {
  background: '#1a202c',
  text: '#e2e8f0',
  primary: '#63b3ed',
};

const AppContainer = styled.div`
  font-family: 'Arial', sans-serif;
  color: ${(props) => props.theme.text};
  background-color: ${(props) => props.theme.background};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  transition: background-color 0.3s ease, color 0.3s ease;
`;

const ContentContainer = styled.div`
  padding-top: 60px;
  flex: 1;
`;

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    // Check user authentication status here
    // For now, we'll just set it to true after a delay to simulate a check
    setTimeout(() => {
      setIsUserLoggedIn(true);
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <Router>
        <AppContainer>
          <Suspense fallback={<Loader />}>
            <Navigation
              isDarkMode={isDarkMode}
              toggleTheme={toggleTheme}
              isUserLoggedIn={isUserLoggedIn}
            />
            <ContentContainer>
              <Routes>
                {isUserLoggedIn ? (
                  <Route path="/" element={<HomePage />} />
                ) : (
                  <Route path="/" element={<LandingPage />} />
                )}
                
                {/* Public Routes */}
                <Route path="/about" element={<AboutPage isDarkMode={isDarkMode} toggleTheme={toggleTheme} />} />
                <Route path="/contact" element={<ContactPage />} />

                {/* Protected Routes */}
                <Route
                  path="/learners"
                  element={
                    <ProtectedRoute isAuthenticated={isUserLoggedIn}>
                      <LearnersSection />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/roommates"
                  element={
                    <ProtectedRoute isAuthenticated={isUserLoggedIn}>
                      <RoommatesSection />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/rides"
                  element={
                    <ProtectedRoute isAuthenticated={isUserLoggedIn}>
                      <RidesSection />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/chat"
                  element={
                    <ProtectedRoute isAuthenticated={isUserLoggedIn}>
                      <ChatSection />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/chat/:id"
                  element={
                    <ProtectedRoute isAuthenticated={isUserLoggedIn}>
                      <ChatSection />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute isAuthenticated={isUserLoggedIn}>
                      <MyProfile />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/chat/groups"
                  element={
                    <ProtectedRoute isAuthenticated={isUserLoggedIn}>
                      <GroupList />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/chat/groups/:id"
                  element={
                    <ProtectedRoute isAuthenticated={isUserLoggedIn}>
                      <GroupSettings />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/goals"
                  element={
                    <ProtectedRoute isAuthenticated={isUserLoggedIn}>
                      <GoalsSection />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/goals/:projectId"
                  element={
                    <ProtectedRoute isAuthenticated={isUserLoggedIn}>
                      <GoalsSection />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/request/ride"
                  element={
                    <ProtectedRoute isAuthenticated={isUserLoggedIn}>
                      <CreateRideRequest />
                    </ProtectedRoute>
                  }
                />

                {/* Not Logged In Routes */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />

                {/* Thank You Page */}
                <Route path="/thankyou" element={<ThankYouPage />} />

                {/* 404 Page */}
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </ContentContainer>
            <Footer isDarkMode={isDarkMode} />
          </Suspense>
        </AppContainer>
      </Router>
    </ThemeProvider>
  );
}

export default App;

