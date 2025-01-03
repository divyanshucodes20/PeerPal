import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import Navigation from './components/Navigation'; // Ensure this path is correct
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import LearnersSection from './components/LearnersSection';
import RoommatesSection from './components/RoommatesSection';
import ChatSection from './components/ChatSection';
import GroupList from './components/GroupList';
import GroupSettings from './components/GroupSettings';
import AboutPage from './components/AboutUs';
import ContactPage from './components/ContactUs';
import LandingPage from './components/LandingPage';
import MyProfile from './components/MyProfile';
import ProtectedRoute from './components/protected-route';
import NotFoundPage from './components/NotFound';
import ThankYouPage from './components/thankyou';
import Loader from './components/loader';

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
  transition: background-color 0.3s ease, color 0.3s ease;
`;

const ContentContainer = styled.div`
  padding-top: 60px;
`;

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const isUserLoggedIn = false; // Assuming you manage login status elsewhere

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    // Simulate loading delay
    setTimeout(() => {
      setIsLoading(false); // Set loading to false after 3 seconds
    }, 3000);
  }, []);

  if (isLoading) {
    return <Loader />; // Show loader while the app is loading
  }

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <Router>
        <AppContainer>
          <Navigation
            isDarkMode={isDarkMode}
            toggleTheme={toggleTheme}
            isUserLoggedIn={isUserLoggedIn}
          />
          <ContentContainer>
            <Routes>
              {/* Landing page route */}
              <Route path="/" element={<LandingPage />} />
              
              {/* Public Routes */}
              <Route path="/about" element={<AboutPage />} />
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
                path="/chat"
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

              {/* Not Logged In Routes */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />

              {/* Thank You Page */}
              <Route path="/thankyou" element={<ThankYouPage />} />

              {/* 404 Page */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </ContentContainer>
        </AppContainer>
      </Router>
    </ThemeProvider>
  );
}

export default App;
