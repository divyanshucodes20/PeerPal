import type React from "react"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Search, Plus, MapPin, Car, Calendar, DollarSign } from "lucide-react"
import {
  useSearchRideRequestsQuery,
  useJoinRideMutation,
  useLazyGetAllSourcesQuery,
  useLazyGetAllDestinationsQuery,
} from "../redux/api/ride"
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
  max-width: 800px;
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
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 0.5rem;
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

const Button = styled.button`
  background-color: ${(props) => props.theme.primary};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  margin-left: 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => props.theme.primary}dd;
  }
`

const RidesSection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSource, setSelectedSource] = useState("")
  const [selectedDestination, setSelectedDestination] = useState("")
  const [priceRange, setPriceRange] = useState("")
  const [selectedDate, setSelectedDate] = useState("")
  const [page, setPage] = useState(1)

  const [triggerGetSources, { data: sourcesData }] = useLazyGetAllSourcesQuery()
  const [triggerGetDestinations, { data: destinationsData }] = useLazyGetAllDestinationsQuery()

  const { data, error, isLoading } = useSearchRideRequestsQuery({
    search: searchTerm,
    page,
    source: selectedSource,
    destination: selectedDestination,
    prizePerPerson: priceRange ? Number.parseInt(priceRange) : 0,
    date: selectedDate,
    sort: "",
  })

  const [joinRide, { isLoading: isJoining }] = useJoinRideMutation()

  useEffect(() => {
    triggerGetSources()
    triggerGetDestinations()
  }, [triggerGetSources, triggerGetDestinations])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setPage(1)
  }

  const handleJoinRide = async (id: string) => {
    try {
      const response = await joinRide(id).unwrap()
      toast.success(response.message || "Successfully joined the ride!")
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to join the ride")
    }
  }

  useEffect(() => {
    if (error) {
      toast.error("Failed to fetch ride requests")
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
            placeholder="Search ride requests..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Select value={selectedSource} onChange={(e) => setSelectedSource(e.target.value)}>
            <option value="">All Sources</option>
            {sourcesData?.sources.map((source) => (
              <option key={source} value={source}>
                {source}
              </option>
            ))}
          </Select>
          <Select value={selectedDestination} onChange={(e) => setSelectedDestination(e.target.value)}>
            <option value="">All Destinations</option>
            {destinationsData?.destinations.map((destination) => (
              <option key={destination} value={destination}>
                {destination}
              </option>
            ))}
          </Select>
          <Select value={priceRange} onChange={(e) => setPriceRange(e.target.value)}>
            <option value="">Any Price</option>
            <option value="10">Up to $10</option>
            <option value="20">Up to $20</option>
            <option value="30">Up to $30</option>
            <option value="40">Up to $40</option>
            <option value="50">$50+</option>
          </Select>
          <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
          <Button type="submit">Search</Button>
        </SearchForm>
        <CreateButton to="/request/ride">
          <Plus size={20} style={{ marginRight: "0.5rem" }} />
          Create Ride Request
        </CreateButton>
      </Header>
      <Grid>
        {data?.rides.map((ride) => (
          <Card key={ride._id}>
            <CardTitle>
              <MapPin size={16} style={{ marginRight: "0.5rem", verticalAlign: "middle" }} />
              {ride.source} to {ride.destination}
            </CardTitle>
            <CardContent>
              <p>
                <Calendar size={16} style={{ marginRight: "0.5rem", verticalAlign: "middle" }} />
                {new Date(ride.date).toLocaleDateString()}
              </p>
              <p>
                <Car size={16} style={{ marginRight: "0.5rem", verticalAlign: "middle" }} />
                Seats: {ride.members.length + 1}/{ride.seats+1}
              </p>
              <p>
                <DollarSign size={16} style={{ marginRight: "0.5rem", verticalAlign: "middle" }} />
                Price per person: ${ride.prizePerPerson}
              </p>
              <Description>{ride.description}</Description>
            </CardContent>
            <div style={{ display: "flex", alignItems: "center", marginTop: "auto" }}>
              <Avatar src={ride.creator.avatar.url} alt={ride.creator.name} />
              <span>{ride.creator.name}</span>
            </div>
            <JoinButton
              onClick={() => handleJoinRide(ride._id)}
              disabled={isJoining || ride.members.length + 1 >= ride.seats}
            >
              {isJoining ? "Joining..." : ride.members.length + 1 >= ride.seats ? "Full" : "Join"}
            </JoinButton>
            <ViewDetailsButton to={`/rides/${ride._id}`}>View Details</ViewDetailsButton>
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

export default RidesSection

