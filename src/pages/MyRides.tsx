import type React from "react"
import { useState } from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"
import
{
  useAllRidesOfUserQuery, useAllUserJoinedRidesQuery
}
from "../redux/api/ride"
import SectionLayout from "../components/dashbaordSection/SectionLayout"
import RideCard from "../components/dashbaordSection/rideCard"

const RidesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
`

const ButtonContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
`

const Button = styled(Link)`
  padding: 0.25rem 0.5rem;
  background-color: ${(props) => props.theme.primary};
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-size: 0.8rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => props.theme.primaryDark};
  }
`

const Rides: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"joined" | "created">("joined")
  const [searchTerm, setSearchTerm] = useState("")

  const { data: joinedRides } = useAllUserJoinedRidesQuery("")
  const { data: createdRides } = useAllRidesOfUserQuery("")

  const filteredRides = (activeTab === "joined" ? joinedRides?.rides : createdRides?.rides) || []

  const searchedRides = filteredRides.filter(
    (ride) =>
      ride.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ride.destination.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <SectionLayout
      title="My Rides"
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
    >
      <RidesGrid>
        {searchedRides.map((ride) => (
          <div key={ride._id}>
            <RideCard ride={ride} isCreator={activeTab === "created"} />
            <ButtonContainer>
              <Button to={`/my/ride/${ride._id}`}>Details</Button>
            </ButtonContainer>
          </div>
        ))}
      </RidesGrid>
    </SectionLayout>
  )
}

export default Rides

