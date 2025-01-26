import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useNewRoommateRequestMutation } from "../redux/api/roommate"
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

const CreateRoommateRequest: React.FC = () => {
  const [formData, setFormData] = useState({
    location: "",
    description: "",
    rent: "",
    availableFrom: "",
    contactNumber: "",
  })

  const [createRequest, { isLoading }] = useNewRoommateRequestMutation()
  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
  
    // Create FormData instance
    const requestData = new FormData()
  
    // Append form data to the FormData instance
    requestData.append("location", formData.location)
    requestData.append("description", formData.description)
    requestData.append("rent", formData.rent)
    requestData.append("availableFrom", formData.availableFrom)
    if (formData.contactNumber) {
      requestData.append("contactNumber", formData.contactNumber)
    }
  
    try {
      const response = await createRequest({ formData: requestData }).unwrap() // Pass FormData here
      if (response.message) {
        toast.success(response.message)
      }
      navigate("/roommates")
    } catch (error: any) {
      if (error.data?.message) {
        toast.error(error.data.message)
      } else {
        toast.error("Something went wrong")
      }
    }
  }
  
  

  return (
    <Container>
      <h2>Create Roommate Request</h2>
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
          type="tel"
          name="contactNumber"
          value={formData.contactNumber}
          onChange={handleChange}
          placeholder="Contact Number (Optional)"
        />
        <Input
          type="date"
          name="availableFrom"
          value={formData.availableFrom}
          onChange={handleChange}
          placeholder="Available From"
          required
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Creating..." : "Create Request"}
        </Button>
      </Form>
    </Container>
  )
}

export default CreateRoommateRequest
