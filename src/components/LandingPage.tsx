import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const LandingContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.text};
  transition: background-color 0.3s ease, color 0.3s ease;
`;

const Header = styled.header`
  background-color: ${(props) => props.theme.background};
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.img`
  height: 40px;
`;

const NavLink = styled(Link)`
  color: ${(props) => props.theme.text};
  text-decoration: none;
  margin-left: 1rem;
  font-weight: 500;
  transition: color 0.3s ease;

  &:hover {
    color: ${(props) => props.theme.primary};
  }
`;

const HeroSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4rem 2rem;
  background: ${(props) =>
    props.theme.mode === 'dark'
      ? 'linear-gradient(135deg, #2b6cb0, #2a4365)'
      : 'linear-gradient(135deg, #3182ce, #2b6cb0)'};
  color: ${(props) => props.theme.text};

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const HeroContent = styled.div`
  max-width: 500px;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
  font-weight: 700;
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  margin-bottom: 2rem;
  opacity: 0.9;
`;

const CTAButton = styled(Link)`
  display: inline-block;
  background-color: ${(props) => props.theme.primary};
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

const HeroImage = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const FeaturesSection = styled.section`
  padding: 4rem 2rem;
  background-color: ${(props) => props.theme.background};
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const FeatureCard = styled(motion.div)`
  background-color: ${(props) => props.theme.background};
  border-radius: 10px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, color 0.3s ease;
`;

const FeatureIcon = styled.img`
  width: 64px;
  height: 64px;
  margin-bottom: 1rem;
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: ${(props) => props.theme.text};
`;

const FeatureDescription = styled.p`
  color: ${(props) => props.theme.text};
`;

const LandingPage: React.FC = () => {
  return (
    <LandingContainer>
      <HeroSection>
        <HeroContent>
          <Title>Welcome to PeerPal</Title>
          <Subtitle>Connect, Learn, and Grow with Peers</Subtitle>
          <CTAButton to="/signup">Get Started</CTAButton>
        </HeroContent>
        <HeroImage
          src="https://res.cloudinary.com/dmwfyn2op/image/upload/v1735829444/DALL_E_2025-01-02_20.20.51_-_A_visually_stunning_landing_page_design_image_for_a_modern_educational_platform_named_PeerPal._The_scene_features_a_group_of_diverse_students_collab_qwhn92.webp"
          alt="Students collaborating"
          style={{ width: '500px', height: '300px' }}
        />
      </HeroSection>
      <FeaturesSection>
        <FeatureGrid>
          <FeatureCard
            whileHover={{ y: -10 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <FeatureIcon
              src="https://res.cloudinary.com/dmwfyn2op/image/upload/v1735829231/Screenshot_2025-01-02_201439_yjkfw5.png"
              style={{ height: '250px', width: '240px' }}
              alt="Learning icon"
            />
            <FeatureTitle>Find Learning Partners</FeatureTitle>
            <FeatureDescription>
              Connect with peers for collaborative projects and study groups
            </FeatureDescription>
          </FeatureCard>
          <FeatureCard
            whileHover={{ y: -10 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <FeatureIcon
              src="https://res.cloudinary.com/dmwfyn2op/image/upload/v1735829231/Screenshot_2025-01-02_201520_qscryd.png"
              style={{ height: '250px', width: '240px' }}
              alt="Roommate icon"
            />
            <FeatureTitle>Find Roommates</FeatureTitle>
            <FeatureDescription>
              Discover compatible roommates for your living situation
            </FeatureDescription>
          </FeatureCard>
          <FeatureCard
            whileHover={{ y: -10 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <FeatureIcon
              src="https://res.cloudinary.com/dmwfyn2op/image/upload/v1735829231/Screenshot_2025-01-02_201548_pedyb9.png"
              style={{ height: '250px', width: '240px' }}
              alt="Chat icon"
            />
            <FeatureTitle>Chat with Peers</FeatureTitle>
            <FeatureDescription>
              Communicate easily with your connections and groups
            </FeatureDescription>
          </FeatureCard>
          <FeatureCard
            whileHover={{ y: -10 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <FeatureIcon
              src="https://res.cloudinary.com/dmwfyn2op/image/upload/v1735992496/DALL_E_2025-01-04_17.36.18_-_A_sleek_and_modern_icon_design_representing_Project_Goals_featuring_a_circular_target_symbol_with_a_glowing_light_bulb_at_the_center_symbolizing_f_fpn6al.webp"
              style={{ height: '250px', width: '240px' }}
              alt="Goals icon"
            />
            <FeatureTitle>Set Project Goals</FeatureTitle>
            <FeatureDescription>
              Create and track goals for your academic projects
            </FeatureDescription>
          </FeatureCard>
          <FeatureCard
            whileHover={{ y: -10 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <FeatureIcon
              src="https://res.cloudinary.com/dmwfyn2op/image/upload/v1735992496/DALL_E_2025-01-04_17.34.00_-_A_vibrant_illustration_of_a_ride-sharing_concept._Two_cheerful_passengers_one_male_and_one_female_sitting_in_a_modern_eco-friendly_car_smiling_and_tjcoqc.webp"
              style={{ height: '250px', width: '240px' }}
              alt="Ride icon"
            />
            <FeatureTitle>Find Rides</FeatureTitle>
            <FeatureDescription>
              Connect with peers for carpooling and ride-sharing
            </FeatureDescription>
          </FeatureCard>
          <FeatureCard
            whileHover={{ y: -10 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <FeatureIcon
              src="https://res.cloudinary.com/dmwfyn2op/image/upload/v1735882870/DALL_E_2025-01-03_11.07.18_-_A_visually_appealing_and_modern_icon_for_a_user_profile_featuring_a_simplistic_and_clean_design._The_icon_includes_a_circular_outline_containing_a_hu_shtq1x.webp"
              style={{ height: '250px', width: '240px' }}
              alt="User Profile icon"
            />
            <FeatureTitle>Manage Your Profile</FeatureTitle>
            <FeatureDescription>
            Create comprehensive profiles to find the best matches for your needs
            </FeatureDescription>
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
          <FeatureDescription>Find exactly what you're looking for with our powerful search filters.</FeatureDescription>
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
          <FeatureDescription>Your privacy and security are our top priorities. Connect with confidence.</FeatureDescription>
        </FeatureCard>
        </FeatureGrid>
      </FeaturesSection>
    </LandingContainer>
  );
};

export default LandingPage;

