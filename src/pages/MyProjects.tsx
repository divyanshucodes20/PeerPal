import type React from "react"
import { useState } from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"
import { useAllProjectsOfUserQuery, useAllUserJoinedProjectsQuery } from "../redux/api/project"
import ProjectCard from "../components/dashbaordSection/ProjectCard"
import SectionLayout from "../components/dashbaordSection/SectionLayout"

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
`

const ButtonContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
`

const Button = styled(Link)`
  padding: 0.25rem 0.5rem;
  background-color: ${(props) => props.theme.primary};
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-size: 0.8rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => props.theme.primaryDark};
  }
`

const Projects: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"joined" | "created">("joined")
  const [searchTerm, setSearchTerm] = useState("")

  const { data: joinedProjects } = useAllUserJoinedProjectsQuery("")
  const { data: createdProjects } = useAllProjectsOfUserQuery("")

  const filteredProjects = (activeTab === "joined" ? joinedProjects?.projects : createdProjects?.projects) || []

  const searchedProjects = filteredProjects.filter((project) =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <SectionLayout
      title="My Projects"
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
    >
      <ProjectsGrid>
        {searchedProjects.map((project) => (
          <div key={project._id}>
            <ProjectCard project={project} isCreator={activeTab === "created"} />
            <ButtonContainer>
              <Button to={`/my/project/${project._id}`}>Details</Button>
              <Button to={`/chat/${project.groupChat}`}>Group Chat</Button>
            </ButtonContainer>
          </div>
        ))}
      </ProjectsGrid>
    </SectionLayout>
  )
}

export default Projects

