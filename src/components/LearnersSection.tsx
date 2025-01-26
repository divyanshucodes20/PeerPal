import React, { useState } from "react"
import { Link } from "react-router-dom"
import { Search, Plus, Users } from "lucide-react"
import { useSearchLearnerRequestsQuery, useJoinLearnerRequestMutation } from "../redux/api/learner"
import toast from "react-hot-toast"
import styled from "styled-components"
import Loader from "./loader"

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`

const SearchForm = styled.form`
  display: flex;
  align-items: center;
  background-color: ${(props) => props.theme.background};
  border: 1px solid ${(props) => props.theme.primary};
  border-radius: 20px;
  padding: 0.5rem 1rem;
  flex-grow: 1;
  max-width: 600px;
`

const SearchInput = styled.input`
  border: none;
  background-color: transparent;
  margin-left: 0.5rem;
  flex-grow: 1;
  color: ${(props) => props.theme.text};
  &:focus {
    outline: none;
  }
`

const Select = styled.select`
  border: none;
  background-color: transparent;
  margin-left: 0.5rem;
  color: ${(props) => props.theme.text};
  &:focus {
    outline: none;
  }
`

const CreateButton = styled(Link)`
  display: flex;
  align-items: center;
  background-color: ${(props) => props.theme.primary};
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => props.theme.primary}dd;
  }
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
`

const Card = styled.div`
  background-color: ${(props) => props.theme.background};
  border: 1px solid ${(props) => props.theme.primary}33;
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
`

const Avatar = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-bottom: 1rem;
`

const CardTitle = styled.h3`
  margin: 0 0 0.5rem 0;
  color: ${(props) => props.theme.primary};
`

const CardContent = styled.div`
  flex-grow: 1;
`

const Description = styled.p`
  color: ${(props) => props.theme.text};
  margin-bottom: 1rem;
`

const JoinButton = styled.button`
  background-color: ${(props) => props.theme.primary};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  margin-top: 1rem;
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

const ViewDetailsButton = styled(Link)`
  background-color: ${(props) => props.theme.primary};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  margin-top: 0.5rem;
  text-decoration: none;
  text-align: center;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => props.theme.secondary}dd;
  }
`

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`

const PaginationButton = styled.button`
  background-color: ${(props) => props.theme.primary};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  margin: 0 0.5rem;
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

const LearnersSection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [isProject, setIsProject] = useState<boolean | undefined>(undefined)
  const [page, setPage] = useState(1)
  const { data, error, isLoading } = useSearchLearnerRequestsQuery({
    search: searchTerm,
    page,
    isProject: isProject ?? false,
    sort: "",
  })
  const [joinLearnerRequest, { isLoading: isJoining }] = useJoinLearnerRequestMutation()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setPage(1)
  }

  const handleJoinLearnerRequest = async (id: string) => {
    try {
      const response = await joinLearnerRequest(id).unwrap()
      toast.success(response.message || "Successfully joined the learner request!")
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to join the learner request")
    }
  }

  React.useEffect(() => {
    if (error) {
      toast.error("Failed to fetch learner requests")
    }
  }, [error])

  if (isLoading) return <Loader />
  if (error) return <div>Error: {error.toString()}</div>

  return (
    <Container>
      <Header>
        <SearchForm onSubmit={handleSearch}>
          <Search size={20} />
          <SearchInput
            type="text"
            placeholder="Search learner requests..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Select
            value={isProject === undefined ? "" : isProject.toString()}
            onChange={(e) => setIsProject(e.target.value === "" ? undefined : e.target.value === "true")}
          >
            <option value="">All Requests</option>
            <option value="true">Projects Only</option>
            <option value="false">Non-Projects Only</option>
          </Select>
          <button type="submit">Search</button>
        </SearchForm>
        <CreateButton to="/request/learner">
          <Plus size={20} style={{ marginRight: "0.5rem" }} />
          Create Request
        </CreateButton>
      </Header>
      <Grid>
        {data?.learners.map((learner) => (
          <Card key={learner._id}>
            <Avatar src={learner.creator.avatar.url} alt={learner.creator.name} />
            <CardTitle>{learner.title}</CardTitle>
            <CardContent>
              <Description>{learner.description}</Description>
              <p>
                <Users size={16} style={{ marginRight: "0.5rem", verticalAlign: "middle" }} />
                Team Size: {learner.members.length + 1}/{learner.teamSize+1}
              </p>
              {learner.isProject && <p>Project Request</p>}
            </CardContent>
            <JoinButton
              onClick={() => handleJoinLearnerRequest(learner._id)}
              disabled={isJoining || learner.members.length + 1 >= learner.teamSize+1}
            >
              {isJoining ? "Joining..." : learner.members.length + 1 >= learner.teamSize+1 ? "Full" : "Join"}
            </JoinButton>
            <ViewDetailsButton to={`/learners/${learner._id}`}>View Details</ViewDetailsButton>
          </Card>
        ))}
      </Grid>
      {data?.totalPage! > 1 && (
        <Pagination>
          <PaginationButton onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1}>
            Previous
          </PaginationButton>
          <PaginationButton
            onClick={() => setPage((prev) => Math.min(prev + 1, data?.totalPage!))}
            disabled={page === data?.totalPage}
          >
            Next
          </PaginationButton>
        </Pagination>
      )}
    </Container>
  )
}

export default LearnersSection

