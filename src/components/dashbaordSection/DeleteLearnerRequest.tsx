import type React from "react"
import styled from "styled-components"
import { useDeleteLearnerRequestMutation} from "../../redux/api/learner";
import { toast } from "react-hot-toast"

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
  background-color:red;

  &:hover {
    background-color:red;
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
  itemId: string
  onClose: () => void
}

const DeleteLearnerRequestDialog: React.FC<DeleteConfirmationDialogProps> = ({ itemId, onClose }) => {
  const [deleteLearningRequest] = useDeleteLearnerRequestMutation()

  const handleDelete = async () => {
    try {
      const response=await deleteLearningRequest({ id: itemId }).unwrap();
      toast.success(response.message)
      onClose()
    } catch (error) {
      toast.error("Failed to delete")
    }
  }

  return (
    <DialogOverlay onClick={onClose}>
      <DialogContent onClick={(e) => e.stopPropagation()}>
        <h2>Confirm Deletion</h2>
        <p>Are you sure you want to delete this Learning Request?</p>
        <DeleteButton onClick={handleDelete}>Delete</DeleteButton>
        <CancelButton onClick={onClose}>Cancel</CancelButton>
      </DialogContent>
    </DialogOverlay>
  )
}

export default DeleteLearnerRequestDialog

