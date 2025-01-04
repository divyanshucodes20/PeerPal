import React, { useState } from 'react';
import styled from 'styled-components';
import { Search, Plus, MapPin, Car } from 'lucide-react';
import { Link } from 'react-router-dom';

const SectionContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;
const StyledSearch = styled(Search)`
  color: ${props => props.theme.text};
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const SearchContainer = styled.div`
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
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

const RideInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const Location = styled.div`
  display: flex;
  align-items: center;
  color: ${props => props.theme.text};
`;

const Price = styled.div`
  font-weight: bold;
  color: ${props => props.theme.primary};
`;

const RiderInfo = styled.div`
  display: flex;
  align-items: center;
  margin-top: auto;
`;

const Avatar = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 0.5rem;
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

interface RideRequest {
  id: number;
  pickup: string;
  destination: string;
  driver: {
    name: string;
    avatar: string;
  };
  price: number;
  availableSeats: number;
  carName: string;
}

const dummyData: RideRequest[] = [
  {
    id: 1,
    pickup: "University Campus",
    destination: "Downtown",
    driver: {
      name: "John Doe",
      avatar: "/placeholder.svg?height=30&width=30",
    },
    price: 15,
    availableSeats: 3,
    carName: "Toyota Camry",
  },
  {
    id: 2,
    pickup: "Airport",
    destination: "City Center",
    driver: {
      name: "Jane Smith",
      avatar: "/placeholder.svg?height=30&width=30",
    },
    price: 25,
    availableSeats: 2,
    carName: "Honda Civic",
  },
  {
    id: 3,
    pickup: "Shopping Mall",
    destination: "Residential Area",
    driver: {
      name: "Mike Johnson",
      avatar: "/placeholder.svg?height=30&width=30",
    },
    price: 10,
    availableSeats: 4,
    carName: "Ford Focus",
  },
];

const RidesSection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [rides, setRides] = useState<RideRequest[]>(dummyData);

  const filteredRides = rides.filter(ride =>
    ride.pickup.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ride.destination.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleJoin = (id: number) => {
    // Implement join logic here
    console.log(`Joined ride with id: ${id}`);
  };

  return (
    <SectionContainer>
      <Header>
      <SearchContainer>
          <StyledSearch size={20} />
          <SearchInput
            type="text"
            placeholder="Search ride requests..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchContainer>
        <CreateRequestButton to="/request/ride">
          <Plus size={20} style={{ marginRight: '0.5rem' }} />
          Create Ride Request
        </CreateRequestButton>
      </Header>
      <CardsContainer>
        {filteredRides.map(ride => (
          <Card key={ride.id}>
            <RideInfo>
              <Location>
                <MapPin size={16} style={{ marginRight: '0.5rem' }} />
                {ride.pickup} to {ride.destination}
              </Location>
              <Price>${ride.price}</Price>
            </RideInfo>
            <RiderInfo>
              <Avatar src={ride.driver.avatar} alt={`${ride.driver.name}'s avatar`} />
              <span>{ride.driver.name}</span>
            </RiderInfo>
            <div>
              <Car size={16} style={{ marginRight: '0.5rem' }} />
              {ride.carName} ({ride.availableSeats} seats)
            </div>
            <JoinButton onClick={() => handleJoin(ride.id)}>Join Ride</JoinButton>
          </Card>
        ))}
      </CardsContainer>
    </SectionContainer>
  );
};

export default RidesSection;

