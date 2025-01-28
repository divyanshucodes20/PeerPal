import type React from "react"
import { useState } from "react"
import styled from "styled-components"
import { FaEdit, FaTrash } from "react-icons/fa"
import EditProjectDialog from "./EditProjectDialog"
import DeleteConfirmationDialog from "./DeleteConfirmationDialog"
import { Project } from "../../types/types"

const Card = styled.div`
  background-color: ${(props) => props.theme.cardBackground};
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`

const ProjectName = styled.h3`
  margin: 0 0 0.5rem 0;
  color: ${(props) => props.theme.primary};
`

const ProjectType = styled.p`
  margin: 0 0 0.5rem 0;
  color: ${(props) => props.theme.textSecondary};
`

const MemberCount = styled.p`
  margin: 0 0 0.5rem 0;
  color: ${(props) => props.theme.textSecondary};
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

interface ProjectCardProps {
  project: Project
  isCreator: boolean
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, isCreator }) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  return (
    <Card>
      <ProjectName>{project.name}</ProjectName>
      <ProjectType>Type: {project.type}</ProjectType>
      <MemberCount>
        Members: {project.members.length}/{project.teamSize}
      </MemberCount>
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
      {isEditDialogOpen && <EditProjectDialog project={project} onClose={() => setIsEditDialogOpen(false)} />}
      {isDeleteDialogOpen && (
        <DeleteConfirmationDialog
          itemType="project"
          itemId={project._id}
          onClose={() => setIsDeleteDialogOpen(false)}
        />
      )}
    </Card>
  )
}

export default ProjectCard

