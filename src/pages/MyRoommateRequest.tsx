import type React from "react"
import { useState } from "react"
import styled from "styled-components"
import RoommateCard from "../components/dashbaordSection/RoommateCard"
import { useAllRoommateRequestsOfUserQuery } from "../redux/api/roommate"
import SectionLayoutOfRoommate from "../components/dashbaordSection/SectionLayoutOfRoommate"

const RoommatesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
`

const Roommates: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: createdRequests } = useAllRoommateRequestsOfUserQuery("");
  const roommates = createdRequests?.roommates || [];

  const searchedRequests = roommates.filter((request) =>
    request.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <SectionLayoutOfRoommate
      title="My Roommate Requests"
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
    >
      <RoommatesGrid>
        {searchedRequests.length > 0 ? (
          searchedRequests.map((request) => (
            <RoommateCard key={request._id} request={request} isCreator={true} />
          ))
        ) : (
          <p>No roommate requests found.</p>
        )}
      </RoommatesGrid>
    </SectionLayoutOfRoommate>
  );
};

export default Roommates;


