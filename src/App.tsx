import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import LearnersSection from './components/LearnersSection';
import RoommatesSection from './components/RoommatesSection';
import ChatSection from './components/ChatSection';
import Navigation from './components/Navigation';
import LandingPage from './components/LandingPage';
import AboutPage from './components/AboutUs';
import ContactUs from './components/ContactUs';

const AppContainer = styled.div`
  font-family: 'Arial', sans-serif;
  color: #333;
`;

const ContentContainer = styled.div`
  padding-top: 60px; // Adjust based on your navigation bar height
`;

function App() {
  return (
    <Router>
      <AppContainer>
        <Navigation />
        <ContentContainer>
          <Routes>
            <Route path='/l' element={<LandingPage/>}/>
            <Route path='about' element={<AboutPage/>}/>
            <Route path='contact' element={<ContactUs/>}/>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/learners" element={<LearnersSection />} />
            <Route path="/roommates" element={<RoommatesSection />} />
            <Route path="/chat" element={<ChatSection />} />
          </Routes>
        </ContentContainer>
      </AppContainer>
    </Router>
  );
}

export default App;

