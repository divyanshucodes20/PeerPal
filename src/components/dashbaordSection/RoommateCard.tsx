import type React from "react"
import { useState } from "react"
import styled from "styled-components"
import type { Roommate, User } from "../../types/types"
import { FaEdit, FaTrash, FaMapMarkerAlt, FaDollarSign, FaPhone } from "react-icons/fa"
import EditRoommateDialog from "./EditRoommateDialog"
import DeleteConfirmationDialog from "./DeleteConfirmationDialog"

const Card = styled.div`
  background-color: ${(props) => props.theme.cardBackground};
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`

const Location = styled.h3`
  margin: 0 0 0.5rem 0;
  color: ${(props) => props.theme.primary};
  display: flex;
  align-items: center;
`

const Description = styled.p`
  margin: 0 0 0.5rem 0;
  color: ${(props) => props.theme.textSecondary};
  font-size: 0.9rem;
`

const Rent = styled.p`
  margin: 0 0 0.5rem 0;
  color: ${(props) => props.theme.textSecondary};
  display: flex;
  align-items: center;
  font-size: 0.9rem;
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

interface RoommateCardProps {
  request: Roommate
  isCreator: boolean
}

const RoommateCard: React.FC<RoommateCardProps> = ({ request, isCreator }) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  return (
    <Card>
      <Location>
        <FaMapMarkerAlt style={{ marginRight: "0.5rem" }} />
        {request.location}
      </Location>
      <Description>{request.description}</Description>
      <Rent>
        <FaDollarSign style={{ marginRight: "0.5rem" }} />
        {request.rent}/month
      </Rent>
      {request.contactNumber && (
        <InfoItem>
          <FaPhone style={{ marginRight: "0.5rem" }} />
          {request.contactNumber}
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
      {isEditDialogOpen && <EditRoommateDialog request={request} onClose={() => setIsEditDialogOpen(false)} />}
      {isDeleteDialogOpen && (
        <DeleteConfirmationDialog
          itemType="roommate request"
          itemId={request._id}
          onClose={() => setIsDeleteDialogOpen(false)}
        />
      )}
    </Card>
  )
}

export default RoommateCard

