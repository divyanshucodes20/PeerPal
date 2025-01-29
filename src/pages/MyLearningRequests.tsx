import type React from "react"
import { useState } from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"
import { useAllLearnerRequestsOfUserQuery, useAllUserJoinedLearnerRequestsQuery } from "../redux/api/learner"
import LearningRequestCard from "../components/dashbaordSection/LearnerRequestCard"
import SectionLayout from "../components/dashbaordSection/SectionLayout"

const LearningRequestsGrid = styled.div`
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

const LearningRequests: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"joined" | "created">("joined")
  const [searchTerm, setSearchTerm] = useState("")

  const { data: joinedRequests } = useAllUserJoinedLearnerRequestsQuery("")
  const { data: createdRequests } = useAllLearnerRequestsOfUserQuery("")

  const filteredRequests = (activeTab === "joined" ? joinedRequests?.learners : createdRequests?.learners) || []

  const searchedRequests = filteredRequests.filter((request) =>
    request.title.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <SectionLayout
      title="Learning Requests"
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
    >
      <LearningRequestsGrid>
        {searchedRequests.map((request) => (
          <div key={request._id}>
            <LearningRequestCard request={request} isCreator={activeTab === "created"} />
            {request.isProject && (
              <ButtonContainer>
                <Button as={Link} to={`/my/learning-request/${request._id}`}>
                  Details
                </Button>
              </ButtonContainer>
            )}
          </div>
        ))}
      </LearningRequestsGrid>
    </SectionLayout>
  )
}

export default LearningRequests

