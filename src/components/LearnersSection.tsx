import React, { useState } from 'react';
import styled from 'styled-components';
import { Search, Plus, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DefaultTheme } from 'styled-components';

const StyledSearch = styled(Search)`
  color: ${props => props.theme.text};
`;
const SectionContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const SearchContainer = styled.div<{ theme: DefaultTheme }>`
  display: flex;
  align-items: center;
  background-color: ${props => props.theme.background};
  border: 1px solid ${props => props.theme.primary};
  border-radius: 20px;
  padding: 0.5rem 1rem;
  flex-grow: 1;
  max-width: 400px;
`;

const SearchInput = styled.input`
  border: none;
  background-color: transparent;
  margin-left: 0.5rem;
  flex-grow: 1;
  color: ${props => props.theme.text};
  &:focus {
    outline: none;
  }
`;

const CreateRequestButton = styled(Link)`
  display: flex;
  align-items: center;
  background-color: ${props => props.theme.primary};
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${props => props.theme.primary}dd;
  }
`;

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
`;

const Card = styled.div`
  background-color: ${props => props.theme.background};
  border: 1px solid ${props => props.theme.primary}33;
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

const Avatar = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-bottom: 1rem;
`;

const ProjectName = styled.h3`
  margin: 0 0 0.5rem 0;
  color: ${props => props.theme.primary};
`;

const Description = styled.p`
  margin: 0 0 1rem 0;
  color: ${props => props.theme.text};
  flex-grow: 1;
`;

const TeamSize = styled.div`
  display: flex;
  align-items: center;
  color: ${props => props.theme.text};
  font-size: 0.9rem;
`;

const JoinButton = styled.button`
  background-color: ${props => props.theme.primary};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${props => props.theme.primary}dd;
  }
`;

interface LearnerRequest {
  id: number;
  projectName: string;
  description: string;
  teamSize: {
    current: number;
    max: number;
  };
  avatar: string;
}

const dummyData: LearnerRequest[] = [
  {
    id: 1,
    projectName: "Machine Learning Study Group",
    description: "Looking for peers to study machine learning concepts and work on projects together.",
    teamSize: { current: 2, max: 5 },
    avatar: "https://i.pravatar.cc/60?img=1",
  },
  {
    id: 2,
    projectName: "Web Development Workshop",
    description: "Seeking participants for a collaborative web development workshop focusing on React and Node.js.",
    teamSize: { current: 3, max: 6 },
    avatar: "https://i.pravatar.cc/60?img=2",
  },
  {
    id: 3,
    projectName: "Data Science Project",
    description: "Need team members for a data science project analyzing social media trends.",
    teamSize: { current: 1, max: 4 },
    avatar: "https://i.pravatar.cc/60?img=3",
  },
  {
    id: 4,
    projectName: "Mobile App Development",
    description: "Looking for iOS and Android developers to create a cross-platform fitness app.",
    teamSize: { current: 2, max: 5 },
    avatar: "https://i.pravatar.cc/60?img=4",
  },
];

const LearnersSection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [requests, setRequests] = useState<LearnerRequest[]>(dummyData);

  const filteredRequests = requests.filter(request =>
    request.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleJoin = (id: number) => {
    console.log(`Joined request with id: ${id}`);
  };

  return (
    <SectionContainer>
      <Header>
        <SearchContainer>
          <StyledSearch size={20} />
          <SearchInput
            type="text"
            placeholder="Search learner requests..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchContainer>
        <CreateRequestButton to="/request/learner">
          <Plus size={20} style={{ marginRight: '0.5rem' }} />
          Create Request
        </CreateRequestButton>
      </Header>
      <CardsContainer>
        {filteredRequests.map(request => (
          <Card key={request.id}>
            <Avatar src={request.avatar} alt="Avatar" />
            <ProjectName>{request.projectName}</ProjectName>
            <Description>{request.description}</Description>
            <TeamSize>
              <Users size={16} style={{ marginRight: '0.5rem' }} />
              {request.teamSize.current}/{request.teamSize.max} members
            </TeamSize>
            <JoinButton onClick={() => handleJoin(request.id)}>Join</JoinButton>
          </Card>
        ))}
      </CardsContainer>
    </SectionContainer>
  );
};

export default LearnersSection;
