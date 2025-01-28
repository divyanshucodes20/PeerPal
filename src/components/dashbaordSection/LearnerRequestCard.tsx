import type React from "react"
import { useState } from "react"
import styled from "styled-components"
import { FaEdit, FaTrash, FaUsers, FaPhone, FaProjectDiagram } from "react-icons/fa"
import EditLearningRequestDialog from "./EditLearningRequestDialog"
import { Learner, User } from "../../types/types"
import DeleteLearnerRequestDialog from "./DeleteLearnerRequest"

const Card = styled.div`
  background-color: ${(props) => props.theme.cardBackground};
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`

const RequestTitle = styled.h3`
  margin: 0 0 0.5rem 0;
  color: ${(props) => props.theme.primary};
`

const RequestDescription = styled.p`
  margin: 0 0 0.5rem 0;
  color: ${(props) => props.theme.textSecondary};
  font-size: 0.9rem;
`

const MemberCount = styled.p`
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

interface LearningRequestCardProps {
  request: Learner
  isCreator: boolean
}

const LearningRequestCard: React.FC<LearningRequestCardProps> = ({ request, isCreator }) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  return (
    <Card>
      <RequestTitle>{request.title}</RequestTitle>
      <RequestDescription>{request.description}</RequestDescription>
      <MemberCount>
        <FaUsers style={{ marginRight: "0.5rem" }} />
        {request.members.length + 1}/{request.teamSize}
      </MemberCount>
      {request.contactNumber && (
        <InfoItem>
          <FaPhone style={{ marginRight: "0.5rem" }} />
          {request.contactNumber}
        </InfoItem>
      )}
      <InfoItem>
        <FaProjectDiagram style={{ marginRight: "0.5rem" }} />
        {request.isProject ? "Project" : "Learning Request"}
      </InfoItem>
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
      {isEditDialogOpen && <EditLearningRequestDialog request={request} onClose={() => setIsEditDialogOpen(false)} />}
      {isDeleteDialogOpen && (
        <DeleteLearnerRequestDialog
          itemId={request._id}
          onClose={() => setIsDeleteDialogOpen(false)}
        />
      )}
    </Card>
  )
}

export default LearningRequestCard

