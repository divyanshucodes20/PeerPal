import type React from "react"
import { useState } from "react"
import styled from "styled-components"
import type { Ride, User } from "../../types/types"
import { FaEdit, FaTrash, FaMapMarkerAlt, FaCar, FaCalendar, FaDollarSign, FaInfoCircle, FaPhone } from "react-icons/fa"
import EditRideDialog from "./EditRideDialog"
import DeleteRideRequestDialog from "./DeleteRideRequest"

const Card = styled.div`
  background-color: ${(props) => props.theme.cardBackground};
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`

const Route = styled.h3`
  margin: 0 0 0.5rem 0;
  color: ${(props) => props.theme.primary};
  display: flex;
  align-items: center;
`

const InfoItem = styled.p`
  margin: 0 0 0.5rem 0;
  color: ${(props) => props.theme.textSecondary};
  display: flex;
  align-items: center;
  font-size: 0.9rem;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: auto;
`

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin-left: 0.5rem;
  color: ${(props) => props.theme.primary};
  transition: color 0.3s ease;

  &:hover {
    color: ${(props) => props.theme.primaryDark};
  }
`

interface RideCardProps {
  ride: Ride
  isCreator: boolean
}

const RideCard: React.FC<RideCardProps> = ({ ride, isCreator }) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  return (
    <Card>
      <Route>
        <FaMapMarkerAlt style={{ marginRight: "0.5rem" }} />
        {ride.source} to {ride.destination}
      </Route>
      <InfoItem>
        <FaCar style={{ marginRight: "0.5rem" }} />
        Seats: {ride.seats}
      </InfoItem>
      <InfoItem>
        <FaCalendar style={{ marginRight: "0.5rem" }} />
        {new Date(ride.date).toLocaleDateString()}
      </InfoItem>
      <InfoItem>
        <FaDollarSign style={{ marginRight: "0.5rem" }} />
        {ride.prizePerPerson}/person
      </InfoItem>
      <InfoItem>
        <FaInfoCircle style={{ marginRight: "0.5rem" }} />
        {ride.description}
      </InfoItem>
      {ride.contactNumber && (
        <InfoItem>
          <FaPhone style={{ marginRight: "0.5rem" }} />
          {ride.contactNumber}
        </InfoItem>
      )}
      {isCreator && (
        <ButtonContainer>
          <IconButton onClick={() => setIsEditDialogOpen(true)}>
            <FaEdit />
          </IconButton>
          <IconButton onClick={() => setIsDeleteDialogOpen(true)}>
            <FaTrash />
          </IconButton>
        </ButtonContainer>
      )}
      {isEditDialogOpen && <EditRideDialog ride={ride} onClose={() => setIsEditDialogOpen(false)} />}
      {isDeleteDialogOpen && (
        <DeleteRideRequestDialog itemId={ride._id} onClose={() => setIsDeleteDialogOpen(false)} />
      )}
    </Card>
  )
}

export default RideCard

