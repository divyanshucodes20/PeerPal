import type React from "react"
import { useState } from "react"
import styled from "styled-components"
import { Friends } from "../../types/api-types"

const DialogOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`

const DialogContent = styled.div`
  background-color: ${(props) => props.theme.background};
  padding: 2rem;
  border-radius: 8px;
  width: 100%;
  max-width: 500px;
`

const Title = styled.h2`
  color: ${(props) => props.theme.primary};
  margin-bottom: 1rem;
`

const UserList = styled.ul`
  list-style-type: none;
  padding: 0;
  max-height: 300px;
  overflow-y: auto;
`

const UserItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem;
  border-bottom: 1px solid ${(props) => props.theme.border};
`

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const Button = styled.button`
  background-color: ${(props) => props.theme.primary};
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 1rem;

  &:hover {
    background-color: ${(props) => props.theme.primaryDark};
  }
`

interface AddMembersDialogProps {
  users:Friends[]
  onClose: () => void
  onAddMembers: (selectedUsers: string[]) => void
}

const AddMembersDialog: React.FC<AddMembersDialogProps> = ({ users, onClose, onAddMembers }) => {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])

  const handleUserSelect = (userId: string) => {
    setSelectedUsers((prev) => (prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]))
  }

  const handleAddMembers = () => {
    onAddMembers(selectedUsers)
    onClose()
  }

  return (
    <DialogOverlay onClick={onClose}>
      <DialogContent onClick={(e) => e.stopPropagation()}>
        <Title>Add Members</Title>
        <UserList>
          {users.map((user) => (
            <UserItem key={user._id}>
              <UserInfo>
                <img src={user.avatar} alt={user.name} />
                <span>{user.name}</span>
              </UserInfo>
              <Button onClick={() => handleUserSelect(user._id)}>
                {selectedUsers.includes(user._id) ? "Selected" : "Select"}
              </Button>
            </UserItem>
          ))}
        </UserList>
        <Button onClick={handleAddMembers} disabled={selectedUsers.length === 0}>
          Add Selected Members
        </Button>
      </DialogContent>
    </DialogOverlay>
  )
}

export default AddMembersDialog

