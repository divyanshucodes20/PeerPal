import type React from "react"
import { useState } from "react"
import styled from "styled-components"
import { toast } from "react-hot-toast"
import { Learner } from "../../types/types"
import { useUpdateLearnerRequestMutation } from "../../redux/api/learner"

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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 4px;
`

const TextArea = styled.textarea`
  padding: 0.5rem;
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 4px;
  resize: vertical;
`

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: ${(props) => props.theme.primary};
  color: ${(props) => props.theme.textLight};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => props.theme.primaryDark};
  }
`

interface EditLearningRequestDialogProps {
  request: Learner
  onClose: () => void
}

const EditLearningRequestDialog: React.FC<EditLearningRequestDialogProps> = ({ request, onClose }) => {
  const [formData, setFormData] = useState({
    title: request.title,
    description: request.description,
    teamSize: request.teamSize.toString(),
    contactNumber: request.contactNumber,
    isProject: request.isProject,
  })

  const [updateLearnerRequest] = useUpdateLearnerRequestMutation()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await updateLearnerRequest({
        id: request._id,
        formData: {
          // @ts-ignore
          title: formData.title,
          description: formData.description,
          teamSize: Number.parseInt(formData.teamSize),
          contactNumber: formData.contactNumber,
          isProject: formData.isProject
        },
      }).unwrap()
      toast.success("Learning request updated successfully")
      onClose()
    } catch (error) {
      toast.error("Failed to update learning request")
    }
  }

  return (
    <DialogOverlay onClick={onClose}>
      <DialogContent onClick={(e) => e.stopPropagation()}>
        <h2>Edit Learning Request</h2>
        <Form onSubmit={handleSubmit}>
          <Input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" required />
          <TextArea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            required
            rows={4}
          />
          <Input
            type="number"
            name="teamSize"
            value={formData.teamSize}
            onChange={handleChange}
            placeholder="Team Size"
            required
          />
          <Input
            type="text"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            placeholder="Contact Number"
            required
          />
          <label>
            <input
              type="checkbox"
              name="isProject"
              checked={formData.isProject}
              onChange={(e) => setFormData((prev) => ({ ...prev, isProject: e.target.checked }))}
            />
            Make Project?
          </label>
          <Button type="submit">Save Changes</Button>
        </Form>
      </DialogContent>
    </DialogOverlay>
  )
}

export default EditLearningRequestDialog

