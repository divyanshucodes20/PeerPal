import type React from "react"
import { useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import { FaUsers, FaTrash, FaLink } from "react-icons/fa"
import {
  useLearnerDetailsQuery,
  useRemoveMemberFromLearnerRequestMutation,
  useLinkToExistingProjectMutation,
  useLazyGetFriendsOtherThanLearnerMembersQuery,
  useAddMemberToLearnerRequestMutation,
  useLeaveProjectMutation,
} from "../redux/api/learner"
import { useGetMyProfileQuery } from "../redux/api/api"
import AddMembersDialog from "../components/dialog/AddMembers"
import DeleteConfirmationDialog from "../components/dialog/DeleteConfirm"
import Loader from "../components/loader"
import { Friends } from "../types/api-types"

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

const LearningRequestDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data: learningRequest, isLoading, isError } = useLearnerDetailsQuery(id || "")
  const { data: myProfile } = useGetMyProfileQuery({})
  const [removeMember] = useRemoveMemberFromLearnerRequestMutation()
  const [linkToProject] = useLinkToExistingProjectMutation()
  const [getFriendsOtherThanLearnerMembers] = useLazyGetFriendsOtherThanLearnerMembersQuery()
  const [addMemberToLearnerRequest] = useAddMemberToLearnerRequestMutation()
  const [leaveProject] = useLeaveProjectMutation()
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isAddMembersDialogOpen, setIsAddMembersDialogOpen] = useState(false)
  const [isLeaveDialogOpen, setIsLeaveDialogOpen] = useState(false)
  const [memberToRemove, setMemberToRemove] = useState<string | null>(null)
  const [otherFriends, setOtherFriends] = useState<Friends[]>([])

  if (isLoading) return <Loader/>
  if (isError || !learningRequest) return <div>Error loading learning request details</div>

  const isCreator = myProfile?.user._id === learningRequest.learner.creator._id
  const isMember = learningRequest.learner.members.some((member) => member._id === myProfile?.user._id)

  const handleRemoveMember = async (memberId: string) => {
    setMemberToRemove(memberId)
    setIsDeleteDialogOpen(true)
  }

  const confirmRemoveMember = async () => {
    if (memberToRemove) {
      try {
        await removeMember({ id: learningRequest.learner._id, member: memberToRemove }).unwrap()
        setIsDeleteDialogOpen(false)
        setMemberToRemove(null)
      } catch (error) {
        console.error("Failed to remove member:", error)
      }
    }
  }

  const handleAddMembers = async () => {
    try {
      const response = await getFriendsOtherThanLearnerMembers(learningRequest.learner._id).unwrap()
      setOtherFriends(response.friends)
      setIsAddMembersDialogOpen(true)
    } catch (error) {
      console.error("Failed to get other friends:", error)
    }
  }

  const onAddMembers = async (selectedUsers: string[]) => {
    try {
      await addMemberToLearnerRequest({ id: learningRequest.learner._id, membersId: selectedUsers }).unwrap()
    } catch (error) {
      console.error("Failed to add members:", error)
    }
  }

  const handleLinkToProject = async () => {
    try {
      await linkToProject({ id: learningRequest.learner._id, projectId: "" }).unwrap()
      navigate(`/learners/isProject/${learningRequest.learner._id}`)
    } catch (error) {
      console.error("Failed to link to project:", error)
    }
  }

  const handleLeaveProject = () => {
    setIsLeaveDialogOpen(true)
  }

  const confirmLeaveProject = async () => {
    try {
      await leaveProject(learningRequest.learner._id).unwrap()
      // Redirect to learning requests list or dashboard after leaving
    } catch (error) {
      console.error("Failed to leave project:", error)
    }
  }

  return (
    <Container>
      <Title>{learningRequest.learner.title}</Title>
      <Section>
        <SectionTitle>Learning Request Details</SectionTitle>
        <p>Description: {learningRequest.learner.description}</p>
        <p>Team Size: {learningRequest.learner.teamSize}</p>

        <p>Current Members: {learningRequest.learner.members.length}</p>
        {learningRequest.learner.contactNumber && <p>Contact: {learningRequest.learner.contactNumber}</p>}
      </Section>
      <Section>
        <SectionTitle>Members</SectionTitle>
        <MemberList>
          {learningRequest.learner.members.map((member) => (
            <MemberItem key={member._id}>
              {member.name}
              {isCreator && member._id !== learningRequest.learner.creator._id && (
                <RemoveButton onClick={() => handleRemoveMember(member._id)}>
                  <FaTrash />
                </RemoveButton>
              )}
            </MemberItem>
          ))}
        </MemberList>
      </Section>
      {isCreator && !learningRequest.learner.isProject && (
        <Section>
          <SectionTitle>Add Members</SectionTitle>
          <Button onClick={handleAddMembers}>
            <FaUsers /> Add Members
          </Button>
        </Section>
      )}
      {isCreator && !learningRequest.learner.isProject && (
        <Section>
          <SectionTitle>Link to Existing Project</SectionTitle>
          <Button onClick={handleLinkToProject}>
            <FaLink /> Link to Project
          </Button>
        </Section>
      )}
      {isMember && !isCreator && (
        <Section>
          <Button onClick={handleLeaveProject}>Leave Learning Request</Button>
        </Section>
      )}
      {learningRequest.learner.isProject && (
        <Section>
          <SectionTitle>Group Chat</SectionTitle>
          <Link to={`/chat/${learningRequest.groupChat}`}>
            <Button>Open Group Chat</Button>
          </Link>
        </Section>
      )}
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
          itemType="learning request"
          onConfirm={confirmLeaveProject}
          onCancel={() => setIsLeaveDialogOpen(false)}
        />
      )}
    </Container>
  )
}

export default LearningRequestDetails

