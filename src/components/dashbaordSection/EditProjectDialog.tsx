import type React from "react"
import { useState } from "react"
import styled from "styled-components"
import { toast } from "react-hot-toast"
import { useUpdateProjectMutation } from "../../redux/api/project"
import { Project } from "../../types/types"

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

const Select = styled.select`
  padding: 0.5rem;
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 4px;
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

interface EditProjectDialogProps {
  project: Project
  onClose: () => void
}

const EditProjectDialog: React.FC<EditProjectDialogProps> = ({ project, onClose }) => {
  const [formData, setFormData] = useState({
    name: project.name,
    type: project.type[0],
    teamSize: project.teamSize.toString(),
  })

  const [updateProject] = useUpdateProjectMutation()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await updateProject({
        id: project._id,
        formData: {
          // @ts-ignore
          name: formData.name,
          type: formData.type,
          teamSize: Number.parseInt(formData.teamSize),
        },
      }).unwrap()
      toast.success("Project updated successfully")
      onClose()
    } catch (error) {
      toast.error("Failed to update project")
    }
  }

  return (
    <DialogOverlay onClick={onClose}>
      <DialogContent onClick={(e) => e.stopPropagation()}>
        <h2>Edit Project</h2>
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Project Name"
            required
          />
          <Select name="type" value={formData.type} onChange={handleChange}>
            <option value="group">Group</option>
            <option value="personal">Personal</option>
          </Select>
          <Input
            type="number"
            name="teamSize"
            value={formData.teamSize}
            onChange={handleChange}
            placeholder="Team Size"
            required
          />
          <Button type="submit">Save Changes</Button>
        </Form>
      </DialogContent>
    </DialogOverlay>
  )
}

export default EditProjectDialog

