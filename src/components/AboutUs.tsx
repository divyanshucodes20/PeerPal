import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface AboutPageProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

interface StyledProps {
  isDarkMode: boolean;
}

const AboutContainer = styled.div<StyledProps>`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background-color: ${(props) => (props.isDarkMode ? '#2d3748' : '#ffffff')};
  color: ${(props) => (props.isDarkMode ? '#e2e8f0' : '#2d3748')};
`;

const HeroSection = styled.section`
  text-align: center;
  padding: 4rem 0;
  background: linear-gradient(135deg, #3182ce, #2b6cb0);
  color: white;
  border-radius: 8px;
  margin-bottom: 4rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  margin-bottom: 2rem;
`;

const CTAButton = styled(Link)`
  display: inline-block;
  background-color: #48bb78;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #38a169;
  }
`;

const Section = styled.section`
  margin-bottom: 4rem;
`;

const SectionHeading = styled.h2<StyledProps>`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: ${(props) => (props.isDarkMode ? '#e2e8f0' : '#2d3748')};
`;

const FeatureList = styled.ul`
  list-style-type: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const FeatureItem = styled(motion.li)<StyledProps>`
  background-color: ${(props) => (props.isDarkMode ? '#4a5568' : '#f7fafc')};
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ValueList = styled.ul`
  list-style-type: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
`;

const ValueItem = styled(motion.li)<StyledProps>`
  background-color: ${(props) => (props.isDarkMode ? '#4a5568' : '#f7fafc')}; // Matching the background color
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
`;


const CallToAction = styled.section<StyledProps>`
  text-align: center;
  background-color: ${(props) => (props.isDarkMode ? '#2d3748' : '#f0fff4')};
  padding: 3rem;
  border-radius: 8px;
`;

const CTAButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
`;

const SecondaryButton = styled(Link)`
  display: inline-block;
  background-color: #4299e1;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #3182ce;
  }
`;

const AboutPage: React.FC<AboutPageProps> = ({ isDarkMode, toggleTheme }) => {
  return (
    <AboutContainer isDarkMode={isDarkMode}>
      <HeroSection>
        <Title>Connecting Peers, Transforming Futures</Title>
        <Subtitle>PeerPal empowers students to collaborate, learn, and grow together in an inclusive and dynamic environment.</Subtitle>
        <CTAButton to="/signup">Join the Community</CTAButton>
      </HeroSection>

      <Section>
        <SectionHeading isDarkMode={isDarkMode}>Our Mission</SectionHeading>
        <p>At PeerPal, we believe in the power of connection. Our mission is to bring students together to achieve academic excellence, foster lifelong friendships, and prepare for the challenges of tomorrow.</p>
      </Section>

      <Section>
        <SectionHeading isDarkMode={isDarkMode}>What PeerPal Offers</SectionHeading>
        <FeatureList>
          <FeatureItem whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} isDarkMode={isDarkMode}>
            <h3>Find Learning Partners</h3>
            <p>Collaborate with peers on projects and form study groups.</p>
          </FeatureItem>
          <FeatureItem whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} isDarkMode={isDarkMode}>
            <h3>Find Roommates</h3>
            <p>Discover compatible roommates for a hassle-free living experience.</p>
          </FeatureItem>
          <FeatureItem whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} isDarkMode={isDarkMode}>
            <h3>Chat with Peers</h3>
            <p>Stay connected with your network through seamless communication tools.</p>
          </FeatureItem>
          <FeatureItem whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} isDarkMode={isDarkMode}>
            <h3>Explore Groups</h3>
            <p>Join or create groups based on shared interests and goals.</p>
          </FeatureItem>
        </FeatureList>
      </Section>

      <Section>
        <SectionHeading isDarkMode={isDarkMode}>Our Values</SectionHeading>
        <ValueList>
          <ValueItem whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} isDarkMode={isDarkMode}>
            <h3>Collaboration</h3>
            <p>Empowering teamwork and collective success.</p>
          </ValueItem>
          <ValueItem whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} isDarkMode={isDarkMode}>
            <h3>Inclusivity</h3>
            <p>Creating an environment where everyone belongs.</p>
          </ValueItem>
          <ValueItem whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} isDarkMode={isDarkMode}>
            <h3>Growth</h3>
            <p>Encouraging continuous learning and personal development.</p>
          </ValueItem>
          <ValueItem whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} isDarkMode={isDarkMode}>
            <h3>Innovation</h3>
            <p>Leveraging cutting-edge technology for better connections.</p>
          </ValueItem>
        </ValueList>
      </Section>

      <Section>
        <SectionHeading isDarkMode={isDarkMode}>Our Journey</SectionHeading>
        <p>PeerPal was built to address the need for meaningful connections in the academic and personal lives of students. From connecting study partners to enabling seamless roommate searches, PeerPal continues to evolve to meet the needs of our community.</p>
      </Section>

      <CallToAction isDarkMode={isDarkMode}>
        <SectionHeading isDarkMode={isDarkMode}>Ready to Connect?</SectionHeading>
        <p>Be a part of a community that inspires and supports you. Join PeerPal today!</p>
        <CTAButtonGroup>
          <CTAButton to="/signup">Sign Up</CTAButton>
          <SecondaryButton to="/contact">Contact Us</SecondaryButton>
        </CTAButtonGroup>
      </CallToAction>
    </AboutContainer>
  );
};

export default AboutPage;