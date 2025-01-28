import type React from "react"
import { useState } from "react"
import { useParams, Link } from "react-router-dom"
import styled from "styled-components"
import { FaUsers, FaTrash } from "react-icons/fa"
import {
  useProjectDetailsQuery,
  useRemoveMemberFromProjectMutation,
  useGetUserOtherThanMembersQuery,
} from "../redux/api/project"
import { useGetMyProfileQuery } from "../redux/api/api"
import RemoveMemberDialog from "../components/dialog/RemoveMemberDialog"
import Loader from "../components/loader"

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

const Button = styled.button`
  background-color: ${(props) => props.theme.primary};
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 0.5rem;

  &:hover {
    background-color: ${(props) => props.theme.primaryDark};
  }
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

const ProjectDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const { data: project, isLoading, isError } = useProjectDetailsQuery(id || "")
  const { data: myProfile } = useGetMyProfileQuery({})
  const [removeMember] = useRemoveMemberFromProjectMutation()
  const { data: otherUsers } = useGetUserOtherThanMembersQuery(id || "")
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [memberToRemove, setMemberToRemove] = useState<string | null>(null)

  if (isLoading) return <Loader/>
  if (isError || !project) return <div>Error loading project details</div>

  const isCreator = myProfile?.user._id === project.project.creator._id

  const handleRemoveMember = async (memberId: string) => {
    setMemberToRemove(memberId)
    setIsDeleteDialogOpen(true)
  }

  const confirmRemoveMember = async () => {
    if (memberToRemove) {
      try {
        await removeMember({ id: project.project._id, member: memberToRemove }).unwrap()
        setIsDeleteDialogOpen(false)
        setMemberToRemove(null)
      } catch (error) {
        console.error("Failed to remove member:", error)
      }
    }
  }

  return (
    <Container>
      <Title>{project.project.name}</Title>
      <Section>
        <SectionTitle>Project Details</SectionTitle>
        <p>Type: {project.project.type}</p>
        <p>Team Size: {project.project.teamSize}</p>
        <p>Current Members: {project.project.members.length}</p>
      </Section>
      <Section>
        <SectionTitle>Members</SectionTitle>
        <MemberList>
          {project.project.members.map((member) => (
            <MemberItem key={member._id}>
              {member.name}
              {isCreator && member._id !== project.project.creator._id && (
                <RemoveButton onClick={() => handleRemoveMember(member._id)}>
                  <FaTrash />
                </RemoveButton>
              )}
            </MemberItem>
          ))}
        </MemberList>
      </Section>
      {isCreator && (
        <Section>
          <SectionTitle>Add Members</SectionTitle>
          <Link to={`/add-members/${project.project._id}`}>
            <Button>
              <FaUsers /> Add Members
            </Button>
          </Link>
        </Section>
      )}
      <Section>
        <SectionTitle>Group Chat</SectionTitle>
        <Link to={`/chat/${project.project.groupChat}`}>
          <Button>Open Group Chat</Button>
        </Link>
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

export default ProjectDetails

