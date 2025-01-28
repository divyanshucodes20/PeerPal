import type React from "react"
import { useState } from "react"
import styled from "styled-components"
import type { Ride } from "../../types/types"
import { toast } from "react-hot-toast"
import { useUpdateRideMutation } from "../../redux/api/ride"

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

interface EditRideDialogProps {
  ride: Ride
  onClose: () => void
}

const EditRideDialog: React.FC<EditRideDialogProps> = ({ ride, onClose }) => {
  const [formData, setFormData] = useState({
    source: ride.source,
    destination: ride.destination,
    date: new Date(ride.date).toISOString().split("T")[0],
    seats: ride.seats.toString(),
    description: ride.description,
    prizePerPerson: ride.prizePerPerson.toString(),
    contactNumber: ride.contactNumber?.toString() || "",
  })

  const [updateRide] = useUpdateRideMutation()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await updateRide({
        id: ride._id,
        formData: {
          ...formData,
          //@ts-ignore
          seats: Number.parseInt(formData.seats),
          prizePerPerson: Number.parseInt(formData.prizePerPerson),
          contactNumber: formData.contactNumber ? Number.parseInt(formData.contactNumber) : undefined,
        },
      }).unwrap()
      toast.success("Ride updated successfully")
      onClose()
    } catch (error) {
      toast.error("Failed to update ride")
    }
  }

  return (
    <DialogOverlay onClick={onClose}>
      <DialogContent onClick={(e) => e.stopPropagation()}>
        <h2>Edit Ride</h2>
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="source"
            value={formData.source}
            onChange={handleChange}
            placeholder="Source"
            required
          />
          <Input
            type="text"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            placeholder="Destination"
            required
          />
          <Input type="date" name="date" value={formData.date} onChange={handleChange} required />
          <Input
            type="number"
            name="pricePerPerson"
            value={formData.prizePerPerson}
            onChange={handleChange}
            placeholder="Price per Person"
            required
          />
          <Input
            type="number"
            name="seats"
            value={formData.seats}
            onChange={handleChange}
            placeholder="Number of Seats"
            required
          />
          <Input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            required
          />
          <Input
            type="number"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            placeholder="Contact Number (optional)"
          />
          <Button type="submit">Save Changes</Button>
        </Form>
      </DialogContent>
    </DialogOverlay>
  )
}

export default EditRideDialog

