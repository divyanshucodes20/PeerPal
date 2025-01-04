import React, { useState } from 'react';
import styled from 'styled-components';
import { Search, Plus, MapPin } from 'lucide-react';
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

const Location = styled.h3`
  margin: 0 0 0.5rem 0;
  color: ${props => props.theme.primary};
  display: flex;
  align-items: center;
`;

const Description = styled.p`
  margin: 0 0 1rem 0;
  color: ${props => props.theme.text};
  flex-grow: 1;
`;

const EmptySpace = styled.div`
  height: 1rem;
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

interface RoommateRequest {
  id: number;
  location: string;
  description: string;
  avatar: string;
}

const dummyData: RoommateRequest[] = [
  {
    id: 1,
    location: "University Hostel A",
    description: "Looking for a quiet and studious roommate for the upcoming semester.",
    avatar: "https://i.pravatar.cc/60?img=1",
  },
  {
    id: 2,
    location: "Downtown Apartment",
    description: "Seeking a roommate to share a 2-bedroom apartment in the city center.",
    avatar: "https://i.pravatar.cc/60?img=2",
  },
  {
    id: 3,
    location: "Off-campus House",
    description: "Group of 3 students looking for a 4th roommate in a shared house near campus.",
    avatar: "https://i.pravatar.cc/60?img=3",
  },
  {
    id: 4,
    location: "Graduate Student Housing",
    description: "PhD student seeking a roommate in the graduate student housing complex.",
    avatar: "https://i.pravatar.cc/60?img=4",
  },
];

const RoommatesSection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [requests, setRequests] = useState<RoommateRequest[]>(dummyData);

  const filteredRequests = requests.filter(request =>
    request.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
            placeholder="Search roommate requests..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchContainer>
        <CreateRequestButton to="/request/roommate">
          <Plus size={20} style={{ marginRight: '0.5rem' }} />
          Create Request
        </CreateRequestButton>
      </Header>
      <CardsContainer>
        {filteredRequests.map(request => (
          <Card key={request.id}>
            <Avatar src={request.avatar} alt="Avatar" />
            <Location>
              <MapPin size={16} style={{ marginRight: '0.5rem' }} />
              {request.location}
            </Location>
            <Description>{request.description}</Description>
            <EmptySpace />
            <JoinButton onClick={() => handleJoin(request.id)}>Join</JoinButton>
          </Card>
        ))}
      </CardsContainer>
    </SectionContainer>
  );
};

export default RoommatesSection;

