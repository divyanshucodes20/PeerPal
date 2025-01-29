import type React from "react"
import { useState } from "react"
import { useParams, Link } from "react-router-dom"
import styled from "styled-components"
import { FaUsers, FaTrash } from "react-icons/fa"
import {
  useProjectDetailsQuery,
  useRemoveMemberFromProjectMutation,
  useLazyGetFriendsOtherThanProjectMembersQuery,
  useAddMemberToProjectMutation,
  useLeaveProjectMutation,
} from "../redux/api/project"
import { useGetMyProfileQuery } from "../redux/api/api"
import { Friends } from "../types/api-types"
import Loader from "../components/loader"
import DeleteConfirmationDialog from "../components/dialog/DeleteConfirm"
import AddMembersDialog from "../components/dialog/AddMembers"

interface User {
  _id: string
  name: string
  avatar: string // Added avatar property
  // Add other properties as needed
}

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

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const ProjectDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const { data: project, isLoading, isError } = useProjectDetailsQuery(id || "")
  const { data: myProfile } = useGetMyProfileQuery({})
  const [removeMember] = useRemoveMemberFromProjectMutation()
  const [getFriendsOtherThanProjectMembers] = useLazyGetFriendsOtherThanProjectMembersQuery()
  const [addMemberToProject] = useAddMemberToProjectMutation()
  const [leaveProject] = useLeaveProjectMutation()
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isAddMembersDialogOpen, setIsAddMembersDialogOpen] = useState(false)
  const [isLeaveDialogOpen, setIsLeaveDialogOpen] = useState(false)
  const [memberToRemove, setMemberToRemove] = useState<string | null>(null)
  const [otherFriends, setOtherFriends] = useState<Friends[]>([])

  if (isLoading) return <Loader/>
  if (isError || !project) return <div>Error loading project details</div>

  const isCreator = myProfile?.user._id === project.project.creator._id
  const isMember = project.project.members.some((member) => member._id === myProfile?.user._id)

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

  const handleAddMembers = async () => {
    try {
      const response = await getFriendsOtherThanProjectMembers(project.project._id).unwrap()
      setOtherFriends(response.friends)
      setIsAddMembersDialogOpen(true)
    } catch (error) {
      console.error("Failed to get other friends:", error)
    }
  }

  const onAddMembers = async (selectedUsers: string[]) => {
    try {
      await addMemberToProject({ id: project.project._id, membersId: selectedUsers }).unwrap()
      setIsAddMembersDialogOpen(false) //added to close the dialog after adding members
    } catch (error) {
      console.error("Failed to add members:", error)
    }
  }

  const handleLeaveProject = () => {
    setIsLeaveDialogOpen(true)
  }

  const confirmLeaveProject = async () => {
    try {
      await leaveProject(project.project._id).unwrap()
      // Redirect to projects list or dashboard after leaving
    } catch (error) {
      console.error("Failed to leave project:", error)
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
              <UserInfo>
                  <img src={String(member.avatar)} alt={member.name} />
                <span>{member.name}</span>
              </UserInfo>
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
          <Button onClick={handleAddMembers}>
            <FaUsers /> Add Members
          </Button>
        </Section>
      )}
      {isMember && !isCreator && (
        <Section>
          <Button onClick={handleLeaveProject}>Leave Project</Button>
        </Section>
      )}
      <Section>
        <SectionTitle>Group Chat</SectionTitle>
        <Link to={`/chat/${project.project.groupChat}`}>
          <Button>Open Group Chat</Button>
        </Link>
      </Section>
      {isDeleteDialogOpen && (
        <DeleteConfirmationDialog
          itemType="member"
          onConfirm={confirmRemoveMember}
          onCancel={() => setIsDeleteDialogOpen(false)}
        />
      )}
      {isAddMembersDialogOpen && (
        <AddMembersDialog
          users={otherFriends}
          onClose={() => setIsAddMembersDialogOpen(false)}
          onAddMembers={onAddMembers}
        />
      )}
      {isLeaveDialogOpen && (
        <DeleteConfirmationDialog
          itemType="project"
          onConfirm={confirmLeaveProject}
          onCancel={() => setIsLeaveDialogOpen(false)}
        />
      )}
    </Container>
  )
}

export default ProjectDetails

