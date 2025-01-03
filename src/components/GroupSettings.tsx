import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const SettingsContainer = styled.div`
  padding: 1rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid ${props => props.theme.primary}33;
  border-radius: 4px;
`;

const Button = styled.button`
  background-color: ${props => props.theme.primary};
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
`;

const MemberList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const MemberItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid ${props => props.theme.primary}33;
`;

interface Member {
  id: number;
  name: string;
  isAdmin: boolean;
}

interface Group {
  id: number;
  name: string;
  avatar: string;
  members: Member[];
}

const GroupSettings: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [group, setGroup] = useState<Group | null>(null);
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    // Fetch group data here
    // For now, we'll use dummy data
    const dummyGroup: Group = {
      id: Number(id),
      name: 'Project Team',
      avatar: 'https://via.placeholder.com/40',
      members: [
        { id: 0, name: 'You', isAdmin: true },
        { id: 1, name: 'Alice', isAdmin: false },
        { id: 2, name: 'Bob', isAdmin: false },
      ],
    };
    setGroup(dummyGroup);
    setName(dummyGroup.name);
    setAvatar(dummyGroup.avatar);
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Update group settings here
    console.log('Updated group settings:', { name, avatar });
    navigate('/chat');
  };

  const handleToggleAdmin = (memberId: number) => {
    if (group) {
      const updatedMembers = group.members.map(member =>
        member.id === memberId ? { ...member, isAdmin: !member.isAdmin } : member
      );
      setGroup({ ...group, members: updatedMembers });
    }
  };

  const handleRemoveMember = (memberId: number) => {
    if (group) {
      const updatedMembers = group.members.filter(member => member.id !== memberId);
      setGroup({ ...group, members: updatedMembers });
    }
  };

  if (!group) {
    return <div>Loading...</div>;
  }

  return (
    <SettingsContainer>
      <h2>Group Settings</h2>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Group Name"
        />
        <Input
          type="text"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
          placeholder="Avatar URL"
        />
        <Button type="submit">Save Changes</Button>
      </Form>
      <h3>Members</h3>
      <MemberList>
        {group.members.map(member => (
          <MemberItem key={member.id}>
            {member.name} {member.isAdmin && '(Admin)'}
            <div>
              <Button onClick={() => handleToggleAdmin(member.id)}>
                {member.isAdmin ? 'Remove Admin' : 'Make Admin'}
              </Button>
              {member.id !== 0 && (
                <Button onClick={() => handleRemoveMember(member.id)}>Remove</Button>
              )}
            </div>
          </MemberItem>
        ))}
      </MemberList>
    </SettingsContainer>
  );
};

export default GroupSettings;

