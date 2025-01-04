import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";

// Styled Components
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
  grid-template-columns: repeat(3, 1fr); /* 3 items per row */
  gap: 2rem;
  margin-bottom: 4rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr; /* 1 item per row on smaller screens */
  }
`;

const Section = styled(motion.section)`
  background-color: #f8f9fa;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  min-height: 300px; /* Increased min-height */
  max-height: auto; /* Remove max-height to allow dynamic resizing */
  overflow: hidden; /* To hide overflowed content */

  @media (min-width: 1024px) {
    min-height: 270px; /* Adjusted for larger screens */
  }
`;




const SectionTitle = styled.h2`
  font-size: 1.5rem;
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
  max-width: 200px;
  height: auto;
  border-radius: 10px;
  margin-bottom: 1rem;
`;

const SectionText = styled.p`
  font-size: 1rem;
  color: #34495e;
  margin-bottom: 1rem;
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

// Main Component
const HomePage: React.FC = () => {
  return (
    <HomeContainer>
      {/* Hero Section */}
      <Hero>
        <HeroTitle>Welcome to PeerPal</HeroTitle>
        <HeroSubtitle>Connect, Learn, and Find Your Perfect Match</HeroSubtitle>
        <CTAButton to="/learners">Get Started</CTAButton>
      </Hero>

      {/* Request Sections */}
      <SectionContainer>
        <Section initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <SectionTitle>Create Learning Request</SectionTitle>
          <SectionContent>
            <SectionImage
              src="https://res.cloudinary.com/dmwfyn2op/image/upload/v1735882967/DALL_E_2025-01-03_11.12.56_-_An_illustration_of_students_connecting_and_collaborating_sitting_around_a_digital_globe_symbolizing_global_academic_networking._They_are_shown_using_ptkpjj.webp"
              alt="Learning request"
            />
            <SectionText>Connect with peers who share your academic interests and goals.</SectionText>
            <SectionButton to="/request/learner">Create Request</SectionButton>
          </SectionContent>
        </Section>

        <Section initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
          <SectionTitle>Create Roommate Request</SectionTitle>
          <SectionContent>
            <SectionImage
              src="https://res.cloudinary.com/dmwfyn2op/image/upload/v1735883150/DALL_E_2025-01-03_11.16.03_-_An_illustration_of_two_or_three_young_people_happily_moving_into_a_shared_living_space._The_scene_shows_cozy_well-decorated_rooms_with_suitcases_pla_ko5gzg.webp"
              alt="Roommate request"
            />
            <SectionText>Discover compatible roommates for shared living.</SectionText>
            <SectionButton to="/request/roommate">Create Request</SectionButton>
          </SectionContent>
        </Section>

        <Section initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
          <SectionTitle>Create Ride Request</SectionTitle>
          <SectionContent>
            <SectionImage
              src="https://res.cloudinary.com/dmwfyn2op/image/upload/v1735993846/DALL_E_2025-01-04_18.01.01_-_A_modern_mobile_app_interface_for_creating_a_ride_request._The_screen_displays_input_fields_for_pickup_and_drop-off_locations_a_date_and_time_picker_q4qwtn.webp"
              alt="Ride request"
            />
            <SectionText>Post your ride needs and find matching drivers.</SectionText>
            <SectionButton to="/request/ride">Create Request</SectionButton>
          </SectionContent>
        </Section>
      </SectionContainer>

      {/* Finding Sections */}
      <SectionContainer>
        <Section initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <SectionTitle>Find Learners</SectionTitle>
          <SectionContent>
            <SectionImage
              src="https://res.cloudinary.com/dmwfyn2op/image/upload/v1735829444/DALL_E_2025-01-02_20.20.51_-_A_visually_stunning_landing_page_design_image_for_a_modern_educational_platform_named_PeerPal._The_scene_features_a_group_of_diverse_students_collab_qwhn92.webp"
              alt="Find learners"
            />
            <SectionText>Join study groups and share knowledge with peers.</SectionText>
            <SectionButton to="/learners">Find Learners</SectionButton>
          </SectionContent>
        </Section>

        <Section initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
          <SectionTitle>Find Roommates</SectionTitle>
          <SectionContent>
            <SectionImage
              src="https://res.cloudinary.com/dmwfyn2op/image/upload/v1735996861/DALL_E_2025-01-04_18.49.57_-_A_vibrant_illustration_of_two_young_people_happily_moving_into_a_shared_living_space._The_scene_shows_cozy_well-decorated_rooms_with_furniture_plant_jikosr.webp"
              alt="Find roommates"
            />
            <SectionText>Discover like-minded roommates for a shared home.</SectionText>
            <SectionButton to="/roommates">Find Roommates</SectionButton>
          </SectionContent>
        </Section>

        <Section initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
          <SectionTitle>Find Rides</SectionTitle>
          <SectionContent>
            <SectionImage
              src="https://res.cloudinary.com/dmwfyn2op/image/upload/v1735992496/DALL_E_2025-01-04_17.34.00_-_A_vibrant_illustration_of_a_ride-sharing_concept._Two_cheerful_passengers_one_male_and_one_female_sitting_in_a_modern_eco-friendly_car_smiling_and_tjcoqc.webp"
              alt="Find rides"
            />
            <SectionText>Connect with peers for carpooling and ride-sharing.</SectionText>
            <SectionButton to="/rides">Find Rides</SectionButton>
          </SectionContent>
        </Section>
      </SectionContainer>
      <SectionContainer>
      <Section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <SectionTitle>Set Project Goals</SectionTitle>
          <SectionContent>
            <SectionImage
              src="https://res.cloudinary.com/dmwfyn2op/image/upload/v1735992496/DALL_E_2025-01-04_17.34.02_-_A_dynamic_and_inspiring_illustration_representing_the_concept_of_setting_and_achieving_project_goals._The_image_shows_a_team_collaborating_with_chart_ojvlfo.webp"
              alt="Goals icon"
            />
            <SectionText>
              Create and track goals for your academic projects and personal
              growth.
            </SectionText>
            <SectionButton to="/goals">Set Goals</SectionButton>
          </SectionContent>
        </Section>
        <Section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <SectionTitle>Instant Messaging</SectionTitle>
          <SectionContent>
            <SectionImage
              src="https://res.cloudinary.com/dmwfyn2op/image/upload/v1735996861/DALL_E_2025-01-04_18.51.09_-_An_image_showing_a_modern_sleek_chat_interface_for_a_peer-to-peer_messaging_system._The_interface_displays_multiple_chat_windows_with_messages_betwee_lndegj.webp"
              alt="Chat icon"
            />
            <SectionText>
              Communicate easily with your connections through our built-in chat
              system.
            </SectionText>
            <SectionButton to="/chat">Start Chatting</SectionButton>
          </SectionContent>
        </Section>
        <Section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <SectionTitle>Manage Your Profile</SectionTitle>
          <SectionContent>
            <SectionImage
              src="https://res.cloudinary.com/dmwfyn2op/image/upload/v1735882870/DALL_E_2025-01-03_11.07.18_-_A_visually_appealing_and_modern_icon_for_a_user_profile_featuring_a_simplistic_and_clean_design._The_icon_includes_a_circular_outline_containing_a_hu_shtq1x.webp"
              alt="User icon"
            />
            <SectionText>
            Create comprehensive profiles to find the best matches for your needs
            </SectionText>
            <SectionButton to="/profile">Edit Your Profile</SectionButton>
          </SectionContent>
        </Section>
      </SectionContainer>
    </HomeContainer>
  );
};

export default HomePage;
