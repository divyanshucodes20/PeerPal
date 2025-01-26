import React from "react"
import { useParams } from "react-router-dom"
import { useLearnerDetailsQuery, useJoinLearnerRequestMutation } from "../redux/api/learner"
import toast from "react-hot-toast"
import styled from "styled-components"
import { Users } from "lucide-react"
import { User } from "../types/types"
import Loader from "../components/loader"

const Container = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: ${(props) => props.theme.background};
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
`

const Avatar = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-right: 1rem;
`

const Title = styled.h2`
  color: ${(props) => props.theme.primary};
  margin: 0;
`

const InfoItem = styled.p`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  color: ${(props) => props.theme.text};
`

const Description = styled.p`
  color: ${(props) => props.theme.text};
  margin-bottom: 2rem;
`

const MembersSection = styled.div`
  margin-top: 2rem;
`

const MembersList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`

const MemberItem = styled.div`
  display: flex;
  align-items: center;
  background-color: ${(props) => props.theme.background};
  border: 1px solid ${(props) => props.theme.primary}33;
  border-radius: 8px;
  padding: 0.5rem;
`

const MemberAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 0.5rem;
`

const JoinButton = styled.button`
  background-color: ${(props) => props.theme.primary};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  font-size: 1rem;
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

const LearnerDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const { data: learner, error, isLoading } = useLearnerDetailsQuery(id as string)
  const [joinLearnerRequest, { isLoading: isJoining }] = useJoinLearnerRequestMutation()

  React.useEffect(() => {
    if (error) {
      toast.error("Failed to fetch learner details")
    }
  }, [error])

  if (isLoading) return <Loader/>
  if (!learner) return <div>Learner request not found</div>

  const handleJoin = async () => {
    try {
      const response = await joinLearnerRequest(id as string).unwrap()
      toast.success(response.message || "Successfully joined the learner request!")
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to join the learner request")
    }
  }
   const learnerDetails = learner.learner;
  return (
    <Container>
      <Header>
        <Avatar src={learnerDetails.creator.avatar.url} alt={learnerDetails.creator.name} />
        <Title>{learnerDetails.title}</Title>
      </Header>
      <InfoItem>
        <Users size={20} style={{ marginRight: "0.5rem" }} />
        Team Size: {learnerDetails.members.length + 1}/{learnerDetails.teamSize+1}
      </InfoItem>
      {learnerDetails.contactNumber && <InfoItem>Phone: {learnerDetails.contactNumber}</InfoItem>}
      <Description>{learnerDetails.description}</Description>
      {learnerDetails.isProject && <InfoItem>This is a project request</InfoItem>}
      <MembersSection>
        <h3>
          Members ({learnerDetails.members.length + 1}/{learnerDetails.teamSize+1})
        </h3>
        <MembersList>
          <MemberItem key={learnerDetails.creator._id}>
            <MemberAvatar src={learnerDetails.creator.avatar.url} alt={learnerDetails.creator.name} />
            <span>{learnerDetails.creator.name} (Creator)</span>
          </MemberItem>
          {learnerDetails.members.map((member:User) => (
            <MemberItem key={member._id}>
              <MemberAvatar src={member.avatar.url} alt={member.name} />
              <span>{member.name}</span>
            </MemberItem>
          ))}
        </MembersList>
      </MembersSection>
      <JoinButton onClick={handleJoin} disabled={isJoining || learnerDetails.members.length + 1 >= learnerDetails.teamSize+1}>
        {isJoining ? "Joining..." : learnerDetails.members.length + 1 >= learnerDetails.teamSize+1 ? "Team Full" : "Join Team"}
      </JoinButton>
    </Container>
  )
}

export default LearnerDetails

