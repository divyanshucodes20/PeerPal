import type React from "react"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useRideDetailsQuery, useJoinRideMutation } from "../redux/api/ride"
import toast from "react-hot-toast"
import styled from "styled-components"
import { MapPin, Calendar, Car, DollarSign, Phone } from "lucide-react"
import Loader from "./loader"

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

const MembersSection = styled.div`
  margin-top: 2rem;
`

const MembersList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`

const MemberItem = styled.div`
  display: flex;
  align-items: center;
  background-color: ${(props) => props.theme.background};
  border: 1px solid ${(props) => props.theme.primary}33;
  border-radius: 8px;
  padding: 0.5rem;
`

const MemberAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 0.5rem;
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

const RideDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const { data: ride, error, isLoading } = useRideDetailsQuery(id as string)
  const [joinRide, { isLoading: isJoining }] = useJoinRideMutation()

  useEffect(() => {
    if (error) {
      toast.error("Failed to fetch ride details")
    }
  }, [error])

  if (isLoading) return <Loader/>
  if (!ride) return <div>Ride request not found</div>

  const handleJoin = async () => {
    try {
      const response = await joinRide(id as string).unwrap()
      toast.success(response.message || "Successfully joined the ride request!")
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to join the ride request")
    }
  }

  return (
    <Container>
      <Header>
        <Avatar src={ride.ride.creator.avatar.url} alt={ride.ride.creator.name} />
        <Title>
          {ride.ride.source} to {ride.ride.destination}
        </Title>
      </Header>
      <InfoItem>
        <MapPin size={20} style={{ marginRight: "0.5rem" }} />
        From {ride.ride.source} to {ride.ride.destination}
      </InfoItem>
      <InfoItem>
        <Calendar size={20} style={{ marginRight: "0.5rem" }} />
        Date: {new Date(ride.ride.date).toLocaleDateString()}
      </InfoItem>
      <InfoItem>
        <Car size={20} style={{ marginRight: "0.5rem" }} />
        Seats: {ride.ride.members.length + 1}/{ride.ride.seats+1}
      </InfoItem>
      <InfoItem>
        <DollarSign size={20} style={{ marginRight: "0.5rem" }} />
        Price per person: ₹{ride.ride.prizePerPerson}
      </InfoItem>
      {ride.ride.contactNumber && (
        <InfoItem>
          <Phone size={20} style={{ marginRight: "0.5rem" }} />
          Contact: {ride.ride.contactNumber}
        </InfoItem>
      )}
      <Description>{ride.ride.description}</Description>
      <MembersSection>
        <h3>
          Members ({ride.ride.members.length + 1}/{ride.ride.seats+1})
        </h3>
        <MembersList>
          <MemberItem key={ride.ride.creator._id}>
            <MemberAvatar src={ride.ride.creator.avatar.url} alt={ride.ride.creator.name} />
            <span>{ride.ride.creator.name} (Creator)</span>
          </MemberItem>
          {ride.ride.members.map((member) => (
            <MemberItem key={member._id}>
              <MemberAvatar src={member.avatar.url} alt={member.name} />
              <span>{member.name}</span>
            </MemberItem>
          ))}
        </MembersList>
      </MembersSection>
      <JoinButton onClick={handleJoin} disabled={isJoining || ride.ride.members.length + 1 >= ride.ride.seats}>
        {isJoining ? "Joining..." : ride.ride.members.length + 1 >= ride.ride.seats ? "Ride Full" : "Join Ride"}
      </JoinButton>
    </Container>
  )
}

export default RideDetailsPage

