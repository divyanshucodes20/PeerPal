import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useNewRideMutation } from "../redux/api/ride"
import toast from "react-hot-toast"
import styled from "styled-components"

const Container = styled.div`
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: ${(props) => props.theme.background};
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid ${(props) => props.theme.primary};
  border-radius: 4px;
`

const TextArea = styled.textarea`
  padding: 0.5rem;
  border: 1px solid ${(props) => props.theme.primary};
  border-radius: 4px;
  resize: vertical;
`

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: ${(props) => props.theme.primary};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => props.theme.primary}dd;
  }

  &:disabled {
    background-color: ${(props) => props.theme.primary}66;
    cursor: not-allowed;
  }
`

const CreateRideRequest: React.FC = () => {
  const [formData, setFormData] = useState({
    source: "",
    destination: "",
    date: "",
    description: "",
    prizePerPerson: 0,
    contactNumber: "",
    seats: 0
  })
  const [createRide, { isLoading }] = useNewRideMutation()
  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await createRide({
        formData: {
          ...formData,
          //@ts-ignore
          seats: formData.seats,
          prizePerPerson: formData.prizePerPerson,
        },
      }).unwrap()
      toast.success(response.message || "Ride request created successfully!")
      navigate("/rides")
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to create ride request")
    }
  }

  return (
    <Container>
      <h2>Create Ride Request</h2>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="source"
          value={formData.source}
          onChange={handleChange}
          placeholder="Enter Source (e.g.,Manipal University Jaipur)"
          required
        />
        <Input
          type="text"
          name="destination"
          value={formData.destination}
          onChange={handleChange}
          placeholder="Enter Destination (e.g.,Railway Station Jaipur)"
          required
        />
        <Input type="date" name="date" value={formData.date} onChange={handleChange} required />
        <Input
          type="number"
          name="seats"
          value={formData.seats}
          onChange={handleChange}
          placeholder="Number of seats available excluding you"
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
          name="prizePerPerson"
          value={formData.prizePerPerson}
          onChange={handleChange}
          placeholder="Price per person in Rupees"
          required
        />
        <Input
          type="tel"
          name="contactNumber"
          value={formData.contactNumber}
          onChange={handleChange}
          placeholder="Contact Number (Optional)"
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Creating..." : "Create Ride Request"}
        </Button>
      </Form>
    </Container>
  )
}

export default CreateRideRequest
