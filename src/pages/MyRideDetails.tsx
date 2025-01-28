import type React from "react"
import { useState } from "react"
import { useParams } from "react-router-dom"
import styled from "styled-components"
import { FaTrash } from "react-icons/fa"
import { useRideDetailsQuery, useRemoveMemberFromRideMutation } from "../redux/api/ride"
import { useGetMyProfileQuery } from "../redux/api/api"
import Loader from "../components/loader"
import RemoveMemberDialog from "../components/dialog/RemoveMemberDialog"

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`

const Title = styled.h1`
  color: ${(props) => props.theme.primary};
  margin-bottom: 1rem;
`

const Section = styled.section`
  margin-bottom: 2rem;
`

const SectionTitle = styled.h2`
  color: ${(props) => props.theme.secondary};
  margin-bottom: 1rem;
`

const MemberList = styled.ul`
  list-style-type: none;
  padding: 0;
`

const MemberItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem;
  border-bottom: 1px solid ${(props) => props.theme.border};
`

const RemoveButton = styled.button`
  background-color: ${(props) => props.theme.danger};
  color: white;
  border: none;
  padding: 0.5rem;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${(props) => props.theme.dangerDark};
  }
`

const RideDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const { data: ride, isLoading, isError } = useRideDetailsQuery(id || "")
  const { data: myProfile } = useGetMyProfileQuery({})
  const [removeMember] = useRemoveMemberFromRideMutation()
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [memberToRemove, setMemberToRemove] = useState<string | null>(null)

  if (isLoading) return <Loader />
  if (isError || !ride) return <div>Error loading ride details</div>

  const isCreator = myProfile?.user._id === ride.ride.creator._id

  const handleRemoveMember = async (memberId: string) => {
    setMemberToRemove(memberId)
    setIsDeleteDialogOpen(true)
  }

  const confirmRemoveMember = async () => {
    if (memberToRemove) {
      try {
        await removeMember({ id: ride.ride._id, member: memberToRemove }).unwrap()
        setIsDeleteDialogOpen(false)
        setMemberToRemove(null)
      } catch (error) {
        console.error("Failed to remove member:", error)
      }
    }
  }

  return (
    <Container>
      <Title>Ride Details</Title>
      <Section>
        <SectionTitle>Route</SectionTitle>
        <p>From: {ride.ride.source}</p>
        <p>To: {ride.ride.destination}</p>
      </Section>
      <Section>
        <SectionTitle>Ride Information</SectionTitle>
        <p>Date: {new Date(ride.ride.date).toLocaleDateString()}</p>
        <p>Price per Person: ${ride.ride.prizePerPerson}</p>
        <p>Seats: {ride.ride.seats}</p>
        <p>Description: {ride.ride.description}</p>
        {ride.ride.contactNumber && <p>Contact: {ride.ride.contactNumber}</p>}
      </Section>
      <Section>
        <SectionTitle>Members</SectionTitle>
        <MemberList>
          {ride.ride.members.map((member) => (
            <MemberItem key={member._id}>
              {member.name}
              {isCreator && member._id !== ride.ride.creator._id && (
                <RemoveButton onClick={() => handleRemoveMember(member._id)}>
                  <FaTrash />
                </RemoveButton>
              )}
            </MemberItem>
          ))}
        </MemberList>
      </Section>
      {isDeleteDialogOpen && (
        <RemoveMemberDialog
          itemType="member"
          onConfirm={confirmRemoveMember}
          onCancel={() => setIsDeleteDialogOpen(false)}
        />
      )}
    </Container>
  )
}

export default RideDetails

