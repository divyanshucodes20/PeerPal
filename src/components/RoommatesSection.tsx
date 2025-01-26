import type React from "react"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Search, Plus, MapPin, DollarSign } from "lucide-react"
import {
  useSearchRoommateRequestsQuery,
  useJoinRoommateRequestMutation,
  useGetAllLocationsQuery,
} from "../redux/api/roommate"
import toast from "react-hot-toast"
import styled from "styled-components"
import Loader from "./loader"
import { Roommate } from "../types/types"

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

const Location = styled.p`
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.text};
  margin-bottom: 0.5rem;
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

const RoommatesSection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedLocation, setSelectedLocation] = useState("")
  const [rentRange, setRentRange] = useState("")
  const [page, setPage] = useState(1)
  const { data, error, isLoading } = useSearchRoommateRequestsQuery({
    search: searchTerm,
    page,
    location: selectedLocation,
    rent: rentRange ? Number.parseInt(rentRange) : 0,
    sort: "",
  })
  const [joinRoommateRequest, { isLoading: isJoining }] = useJoinRoommateRequestMutation()
  const { data: locations } = useGetAllLocationsQuery()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setPage(1)
  }

  const handleJoinRoommateRequest = async (id: string) => {
    try {
      const response = await joinRoommateRequest(id).unwrap()
      toast.success(response.message)
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to join the request")
    }
  }

  useEffect(() => {
    if (error) {
      toast.error("Failed to fetch roommate requests")
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
            placeholder="Search roommate requests..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Select value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)}>
            <option value="">All Locations</option>
            {locations?.locations.map((location:string) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </Select>
          <Select value={rentRange} onChange={(e) => setRentRange(e.target.value)}>
            <option value="">Any Rent</option>
            <option value="500">Up to $500</option>
            <option value="1000">Up to $1000</option>
            <option value="1500">Up to $1500</option>
            <option value="2000">Up to $2000</option>
            <option value="2500">$2000+</option>
          </Select>
        </SearchForm>
        <CreateButton to="/request/roommate">
          <Plus size={20} style={{ marginRight: "0.5rem" }} />
          Create Request
        </CreateButton>
      </Header>
      <Grid>
        {data?.roommates.map((request:Roommate) => (
          <Card key={request._id}>
            <Avatar src={request.creator.avatar.url} alt={request.creator.name} />
            <Location>
              <MapPin size={16} style={{ marginRight: "0.5rem" }} />
              {request.location}
            </Location>
            <Description>{request.description}</Description>
            <p>
              <DollarSign size={16} style={{ marginRight: "0.5rem", verticalAlign: "middle" }} />
              Rent: ${request.rent}/month
            </p>
            <JoinButton onClick={() => handleJoinRoommateRequest(request._id)} disabled={isJoining}>
              {isJoining ? "Joining..." : "Join"}
            </JoinButton>
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
            disabled={page === data?.totalPage!}
          >
            Next
          </PaginationButton>
        </Pagination>
      )}
    </Container>
  )
}

export default RoommatesSection

