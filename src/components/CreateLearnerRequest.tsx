import type React from "react"
import { useState} from "react"
import { useNavigate } from "react-router-dom"
import { useNewLearnerRequestMutation} from "../redux/api/learner"
import toast from "react-hot-toast"
import styled from "styled-components"
import { useAllProjectsOfUserQuery } from "../redux/api/project"

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

const CreateLearnerRequest: React.FC = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    teamSize: 0,
    contactNumber: "",
    isProject: false,
  })
  const [createRequest, { isLoading }] = useNewLearnerRequestMutation()
  const { data: userProjects } = useAllProjectsOfUserQuery("")
  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleSubmit = async (isProject: boolean) => {
    try {
      const response = await createRequest({ 
        // @ts-ignore
        formData: { ...formData, isProject } }).unwrap()
      toast.success(response.message || "Learner request created successfully!")
      if (isProject) {
        navigate(`/learners/isProject/${response.learner._id}`)
      } else {
        navigate("/learners")
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to create learner request")
    }
  }

  const handleLinkToExisting = async(isProject:boolean) => {
    if (!userProjects || userProjects.projects.length === 0) {
      toast.error("You don't have any existing projects. Please create a new one instead.")
    } else {
      try {
        const response = await createRequest({ 
          // @ts-ignore
          formData: { ...formData, isProject } }).unwrap()
        toast.success(response.message || "Learner request created successfully!")
          navigate(`/learners/isProject/${response.learner._id}`)
      } catch (error: any) {
        toast.error(error?.data?.message || "Failed to create learner request")
      }
    }
  }

  return (
    <Container>
      <h2>Create Learner Request</h2>
      <Form>
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
          type="tel"
          name="contactNumber"
          value={formData.contactNumber}
          onChange={handleChange}
          placeholder="Contact Number (Optional)"
        />
        <label>
          <input type="checkbox" name="isProject" checked={formData.isProject} onChange={handleChange} />
          Create as Project
        </label>
        {formData.isProject ? (
          <>
            <Button type="button" onClick={() => handleSubmit(true)}>Create New Project</Button>
            <Button type="button" onClick={() => handleLinkToExisting(false)}>Link to Existing Project</Button>
          </>
        ) : (
          <Button type="button" onClick={() => handleSubmit(false)} disabled={isLoading}>
            {isLoading ? "Creating..." : "Create Learner Request"}
          </Button>
        )}
      </Form>
    </Container>
  )
}

export default CreateLearnerRequest
