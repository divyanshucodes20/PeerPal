import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const GroupListContainer = styled.div`
  padding: 1rem;
`;

const GroupItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem;
  cursor: pointer;
  &:hover {
    background-color: ${props => props.theme.primary}22;
  }
`;

const GroupAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 1rem;
`;

interface Group {
  id: number;
  name: string;
  avatar: string;
}

interface GroupListProps {
  groups: Group[];
}

const GroupList: React.FC<GroupListProps> = ({ groups }) => {
  const navigate = useNavigate();

  return (
    <GroupListContainer>
      <h2>Your Groups</h2>
      {groups.map(group => (
        <GroupItem key={group.id} onClick={() => navigate(`/chat/groups/${group.id}`)}>
          <GroupAvatar src={group.avatar} alt={`${group.name} avatar`} />
          <span>{group.name}</span>
        </GroupItem>
      ))}
    </GroupListContainer>
  );
};

// Dummy Data for Groups
const dummyGroups: Group[] = [
  {
    id: 1,
    name: "Project Team",
    avatar: "https://via.placeholder.com/40?text=P1",
  },
  {
    id: 2,
    name: "Study Group",
    avatar: "https://via.placeholder.com/40?text=P2",
  },
  {
    id: 3,
    name: "Chess Club",
    avatar: "https://via.placeholder.com/40?text=P3",
  },
  {
    id: 4,
    name: "Basketball Team",
    avatar: "https://via.placeholder.com/40?text=P4",
  },
];

const App = () => {
  return <GroupList groups={dummyGroups} />;
};

export default App;
