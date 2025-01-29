import type React from "react"
import styled from "styled-components"

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
  max-width: 400px;
  text-align: center;
`

const Button = styled.button`
  padding: 0.5rem 1rem;
  margin: 0 0.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
`

const DeleteButton = styled(Button)`
  background-color: ${(props) => props.theme.danger};
  color: ${(props) => props.theme.textLight};

  &:hover {
    background-color: ${(props) => props.theme.dangerDark};
  }
`

const CancelButton = styled(Button)`
  background-color: ${(props) => props.theme.secondary};
  color: ${(props) => props.theme.textLight};

  &:hover {
    background-color: ${(props) => props.theme.secondaryDark};
  }
`

interface DeleteConfirmationDialogProps {
  itemType: string
  onConfirm: () => void
  onCancel: () => void
}

const DeleteConfirmationDialog: React.FC<DeleteConfirmationDialogProps> = ({ itemType, onConfirm, onCancel }) => {
  return (
    <DialogOverlay onClick={onCancel}>
      <DialogContent onClick={(e) => e.stopPropagation()}>
        <h2>Confirm Removal</h2>
        <p>Are you sure you want to remove this {itemType}?</p>
        <DeleteButton onClick={onConfirm}>Remove</DeleteButton>
        <CancelButton onClick={onCancel}>Cancel</CancelButton>
      </DialogContent>
    </DialogOverlay>
  )
}

export default DeleteConfirmationDialog

