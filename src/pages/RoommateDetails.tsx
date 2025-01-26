import React from "react"
import { useParams } from "react-router-dom"
import { useRoommateDetailsQuery, useJoinRoommateRequestMutation } from "../redux/api/roommate"
import styled from "styled-components"
import { MapPin, User, DollarSign, Calendar, Phone } from 'lucide-react'
import toast from "react-hot-toast"

const Container = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: ${(props) => props.theme.background};
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
`

const Avatar = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-right: 1rem;
`

const Title = styled.h2`
  color: ${(props) => props.theme.primary};
  margin: 0;
`

const InfoItem = styled.p`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  color: ${(props) => props.theme.text};
`

const Description = styled.p`
  color: ${(props) => props.theme.text};
  margin-bottom: 2rem;
`

const JoinButton = styled.button`
  background-color: ${(props) => props.theme.primary};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => props.theme.primary}dd;
  }

  &:disabled {
    background-color: ${(props) => props.theme.primary}66;
    cursor: not-allowed;
  }
`

const RoommateDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const { data: roommate, error, isLoading } = useRoommateDetailsQuery(id as string)
  const [joinRequest, { isLoading: isJoining }] = useJoinRoommateRequestMutation()

  React.useEffect(() => {
    if (error) {
      toast.error("Failed to fetch roommate details")
    }
  }, [error])

  if (isLoading) return <div>Loading...</div>
  if (!roommate) return <div>Roommate request not found</div>

  const handleJoin = async () => {
    try {
      await joinRequest(id as string).unwrap()
      toast.success("Successfully joined the roommate request!")
    } catch (error) {
      toast.error("Failed to join the roommate request")
    }
  }

  return (
    <Container>
      <Header>
        <Avatar src={roommate.roommate.creator.avatar.url} alt={roommate.roommate.creator.name} />
        <Title>{roommate.roommate.location}</Title>
      </Header>
      <InfoItem>
        <MapPin size={20} style={{ marginRight: "0.5rem" }} />
        {roommate.roommate.location}
      </InfoItem>
      {roommate.roommate.contactNumber && (
        <InfoItem>
          <Phone size={20} style={{ marginRight: '0.5rem' }} />
          Contact: {roommate.roommate.contactNumber}
        </InfoItem>
      )}
      <InfoItem>
        <DollarSign size={20} style={{ marginRight: '0.5rem' }} />
        Rent: ${roommate.roommate.rent}/month
      </InfoItem>
      <Description>{roommate.roommate.description}</Description>
      <JoinButton onClick={handleJoin} disabled={isJoining}>
        {isJoining ? "Joining..." : "Join Request"}
      </JoinButton>
    </Container>
  )
}

export default RoommateDetails