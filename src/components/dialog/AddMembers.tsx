import type React from "react"
import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import styled from "styled-components"
import { useAddMemberToProjectMutation, useGetUserOtherThanMembersQuery } from "../../redux/api/project"
import { useAddMemberToLearnerRequestMutation } from "../../redux/api/learner"
import { Loader } from "lucide-react"

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`

const Title = styled.h1`
  color: ${(props) => props.theme.primary};
  margin-bottom: 1rem;
`

const UserList = styled.ul`
  list-style-type: none;
  padding: 0;
`

const UserItem = styled.li`
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

  &:hover {
    background-color: ${(props) => props.theme.primaryDark};
  }
`

const AddMembers: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data: otherUsers, isLoading, isError } = useGetUserOtherThanMembersQuery(id || "")
  const [addMemberToProject] = useAddMemberToProjectMutation()
  const [addMemberToLearnerRequest] = useAddMemberToLearnerRequestMutation()
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])

  if (isLoading) return <Loader/>
  if (isError || !otherUsers) return <div>Error loading users</div>

  const handleUserSelect = (userId: string) => {
    setSelectedUsers((prev) => (prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]))
  }

  const handleAddMembers = async () => {
    try {
      // Determine if it's a project or learning request based on the URL
      if (window.location.pathname.includes("project")) {
        await addMemberToProject({ id: id || "", membersId: selectedUsers }).unwrap()
      } else {
        await addMemberToLearnerRequest({ id: id || "", membersId: selectedUsers }).unwrap()
      }
      navigate(-1) // Go back to the previous page
    } catch (error) {
      console.error("Failed to add members:", error)
    }
  }

  return (
    <Container>
      <Title>Add Members</Title>
      <UserList>
        {otherUsers.users.map((user) => (
          <UserItem key={user._id}>
            <span>{user.name}</span>
            <Button onClick={() => handleUserSelect(user._id)}>
              {selectedUsers.includes(user._id) ? "Selected" : "Select"}
            </Button>
          </UserItem>
        ))}
      </UserList>
      <Button onClick={handleAddMembers} disabled={selectedUsers.length === 0}>
        Add Selected Members
      </Button>
    </Container>
  )
}

export default AddMembers

