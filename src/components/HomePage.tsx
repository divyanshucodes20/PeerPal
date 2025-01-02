import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const HomeContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Hero = styled.section`
  text-align: center;
  padding: 4rem 0;
  background: linear-gradient(135deg, #3498db, #8e44ad);
  color: white;
  border-radius: 10px;
  margin-bottom: 4rem;
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  margin-bottom: 2rem;
`;

const CTAButton = styled(Link)`
  display: inline-block;
  background-color: #2ecc71;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #27ae60;
  }
`;

const SectionContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 4rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Section = styled(motion.section)`
  background-color: #f8f9fa;
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #2c3e50;
`;

const SectionContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SectionImage = styled.img`
  width: 100%;
  max-width: 300px;
  height: auto;
  border-radius: 10px;
  margin-bottom: 1rem;
`;

const SectionText = styled.p`
  font-size: 1rem;
  color: #34495e;
  margin-bottom: 1rem;
  text-align: center;
`;

const SectionButton = styled(Link)`
  display: inline-block;
  background-color: #3498db;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2980b9;
  }
`;

const FeaturesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
`;

const FeatureCard = styled(motion.div)`
  background-color: white;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const FeatureIcon = styled.img`
  width: 64px;
  height: 64px;
  margin-bottom: 1rem;
`;

const FeatureTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: #2c3e50;
`;

const FeatureText = styled.p`
  font-size: 1rem;
  color: #34495e;
`;

const HomePage: React.FC = () => {
  return (
    <HomeContainer>
      <Hero>
        <HeroTitle>Welcome to PeerPal</HeroTitle>
        <HeroSubtitle>Connect, Learn, and Find Your Perfect Match</HeroSubtitle>
        <CTAButton to="/signup">Get Started</CTAButton>
      </Hero>

      <SectionContainer>
        <Section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <SectionTitle>Find Learning Partners</SectionTitle>
          <SectionContent>
            <SectionImage src="/placeholder.svg?height=300&width=300" alt="Students studying together" />
            <SectionText>
              Connect with peers who share your academic interests and goals. Create or join study groups, collaborate on projects, and excel together.
            </SectionText>
            <SectionButton to="/request/learner">Create Learning Request</SectionButton>
          </SectionContent>
        </Section>

        <Section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <SectionTitle>Find Your Ideal Roommate</SectionTitle>
          <SectionContent>
            <SectionImage src="/placeholder.svg?height=300&width=300" alt="Happy roommates" />
            <SectionText>
              Discover compatible roommates who match your lifestyle and preferences. Make your living situation comfortable and enjoyable.
            </SectionText>
            <SectionButton to="/request/roommate">Create Roommate Request</SectionButton>
          </SectionContent>
        </Section>
      </SectionContainer>

      <FeaturesContainer>
        <FeatureCard
          whileHover={{ y: -10 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <FeatureIcon src="/placeholder.svg?height=64&width=64" alt="Chat icon" />
          <FeatureTitle>Instant Messaging</FeatureTitle>
          <FeatureText>Communicate easily with your connections through our built-in chat system.</FeatureText>
        </FeatureCard>

        <FeatureCard
          whileHover={{ y: -10 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <FeatureIcon src="/placeholder.svg?height=64&width=64" alt="Profile icon" />
          <FeatureTitle>Detailed Profiles</FeatureTitle>
          <FeatureText>Create comprehensive profiles to find the best matches for your needs.</FeatureText>
        </FeatureCard>

        <FeatureCard
          whileHover={{ y: -10 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <FeatureIcon src="/placeholder.svg?height=64&width=64" alt="Search icon" />
          <FeatureTitle>Advanced Search</FeatureTitle>
          <FeatureText>Find exactly what you're looking for with our powerful search filters.</FeatureText>
        </FeatureCard>

        <FeatureCard
          whileHover={{ y: -10 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <FeatureIcon src="/placeholder.svg?height=64&width=64" alt="Security icon" />
          <FeatureTitle>Safe and Secure</FeatureTitle>
          <FeatureText>Your privacy and security are our top priorities. Connect with confidence.</FeatureText>
        </FeatureCard>
      </FeaturesContainer>
    </HomeContainer>
  );
};

export default HomePage;

