import type React from "react"
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useLinkToExistingProjectMutation} from "../redux/api/learner"
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

const Select = styled.select`
  padding: 0.5rem;
  border: 1px solid ${(props) => props.theme.primary};
  border-radius: 4px;
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

const LinkToExistingProject: React.FC = () => {
  const { id:learnerId } = useParams<{ id: string }>()
  const [selectedProject, setSelectedProject] = useState("")
  const [linkToProject, { isLoading }] = useLinkToExistingProjectMutation()
  const { data: userProjects, error: projectsError } = useAllProjectsOfUserQuery("")
  const navigate = useNavigate()

  useEffect(() => {
    if (projectsError) {
      toast.error("Failed to fetch your projects")
    }
  }, [projectsError])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedProject) {
      toast.error("Please select a project")
      return
    }
    try {
      const response = await linkToProject({ id: learnerId as string, projectId: selectedProject }).unwrap()
      toast.success(response.message || "Successfully linked to existing project!")
      navigate("/learners")
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to link to existing project")
    }
  }

  if (!userProjects || userProjects.projects.length === 0) {
    return (
      <Container>
        <h2>Link to Existing Project</h2>
        <p>You don't have any existing projects. Please create a new project instead.</p>
        <Button onClick={() => navigate("/learners")}>Back to Learners</Button>
      </Container>
    )
  }

  return (
    <Container>
      <h2>Link to Existing Project</h2>
      <Form onSubmit={handleSubmit}>
        <Select value={selectedProject} onChange={(e) => setSelectedProject(e.target.value)} required>
          <option value="">Select a project</option>
          {userProjects.projects.map((project) => (
            <option key={project._id} value={project._id}>
              {project.name}
            </option>
          ))}
        </Select>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Linking..." : "Link to Project"}
        </Button>
      </Form>
    </Container>
  )
}

export default LinkToExistingProject

