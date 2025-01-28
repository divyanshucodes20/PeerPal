import type React from "react"
import { useState } from "react"
import styled from "styled-components"
import { toast } from "react-hot-toast"
import { Roommate } from "../../types/types"
import { useUpdateRoommateMutation } from "../../redux/api/roommate"

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

interface EditRoommateDialogProps {
  request: Roommate
  onClose: () => void
}

const EditRoommateDialog: React.FC<EditRoommateDialogProps> = ({ request, onClose }) => {
  const [formData, setFormData] = useState({
    location: request.location,
    description: request.description,
    rent: request.rent.toString(),
    contactNumber:request.contactNumber
  })

  const [updateRoommate] = useUpdateRoommateMutation()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await updateRoommate({
        id: request._id,
        formData: {
          // @ts-ignore
          location: formData.location,
          description: formData.description,
          rent: Number.parseInt(formData.rent),
          contactNumber:formData.contactNumber
        },
      }).unwrap()
      toast.success("Roommate request updated successfully")
      onClose()
    } catch (error) {
      toast.error("Failed to update roommate request")
    }
  }

  return (
    <DialogOverlay onClick={onClose}>
      <DialogContent onClick={(e) => e.stopPropagation()}>
        <h2>Edit Roommate Request</h2>
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Location"
            required
          />
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
            name="rent"
            value={formData.rent}
            onChange={handleChange}
            placeholder="Rent per month"
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
          <Button type="submit">Save Changes</Button>
        </Form>
      </DialogContent>
    </DialogOverlay>
  )
}

export default EditRoommateDialog

