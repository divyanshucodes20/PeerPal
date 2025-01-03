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
  width: 300px;
  height: 250px;
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
        <CTAButton to="/learners">Get Started</CTAButton>
      </Hero>

      <SectionContainer>
        <Section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <SectionTitle>Find Learning Partners</SectionTitle>
          <SectionContent>
            <SectionImage
              src="https://res.cloudinary.com/dmwfyn2op/image/upload/v1735882967/DALL_E_2025-01-03_11.12.56_-_An_illustration_of_students_connecting_and_collaborating_sitting_around_a_digital_globe_symbolizing_global_academic_networking._They_are_shown_using_ptkpjj.webp"
              style={{ height: '250px', width: '300px' }}
              alt="Students studying together"
            />
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
            <SectionImage
              src="https://res.cloudinary.com/dmwfyn2op/image/upload/v1735883150/DALL_E_2025-01-03_11.16.03_-_An_illustration_of_two_or_three_young_people_happily_moving_into_a_shared_living_space._The_scene_shows_cozy_well-decorated_rooms_with_suitcases_pla_ko5gzg.webp"
              style={{ height: '250px', width: '300px' }}
              alt="Happy roommates"
            />
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
          <FeatureIcon
            src="https://res.cloudinary.com/dmwfyn2op/image/upload/v1735829231/Screenshot_2025-01-02_201548_pedyb9.png"
            style={{ height: '250px', width: '240px' }}
            alt="Chat icon"
          />
          <FeatureTitle>Instant Messaging</FeatureTitle>
          <FeatureText>Communicate easily with your connections through our built-in chat system.</FeatureText>
        </FeatureCard>

        <FeatureCard
          whileHover={{ y: -10 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <FeatureIcon
            src="https://res.cloudinary.com/dmwfyn2op/image/upload/v1735882870/DALL_E_2025-01-03_11.07.18_-_A_visually_appealing_and_modern_icon_for_a_user_profile_featuring_a_simplistic_and_clean_design._The_icon_includes_a_circular_outline_containing_a_hu_shtq1x.webp"
            style={{ height: '250px', width: '240px' }}
            alt="Profile icon"
          />
          <FeatureTitle>Detailed Profiles</FeatureTitle>
          <FeatureText>Create comprehensive profiles to find the best matches for your needs.</FeatureText>
        </FeatureCard>

        <FeatureCard
          whileHover={{ y: -10 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <FeatureIcon
            src="https://res.cloudinary.com/dmwfyn2op/image/upload/v1735882873/DALL_E_2025-01-03_11.07.13_-_An_elegant_and_modern_icon_representing_advanced_search_functionality._The_design_should_include_a_magnifying_glass_with_intricate_patterns_overlayin_i38rf4.webp"
            style={{ height: '250px', width: '240px' }}
            alt="Search icon"
          />
          <FeatureTitle>Advanced Search</FeatureTitle>
          <FeatureText>Find exactly what you're looking for with our powerful search filters.</FeatureText>
        </FeatureCard>

        <FeatureCard
          whileHover={{ y: -10 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <FeatureIcon
            src="https://res.cloudinary.com/dmwfyn2op/image/upload/v1735882871/DALL_E_2025-01-03_11.10.47_-_A_modern_minimalist_illustration_of_a_secure_digital_vault_with_a_shield_icon_and_a_padlock_symbolizing_safety_and_security._The_background_should_h_xxdins.webp"
            style={{ height: '250px', width: '240px' }}
            alt="Security icon"
          />
          <FeatureTitle>Safe and Secure</FeatureTitle>
          <FeatureText>Your privacy and security are our top priorities. Connect with confidence.</FeatureText>
        </FeatureCard>
      </FeaturesContainer>
    </HomeContainer>
  );
};

export default HomePage;
