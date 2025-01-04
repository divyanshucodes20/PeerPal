import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ArrowLeft, Check } from 'lucide-react';

const CreateGroupContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin-right: 1rem;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  color: ${props => props.theme.text};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid ${props => props.theme.primary}33;
  border-radius: 4px;
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.text};
`;

const ContactList = styled.div`
  margin-bottom: 1rem;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem;
  cursor: pointer;
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 1rem;
`;

const Checkbox = styled.input`
  margin-right: 1rem;
`;

const SubmitButton = styled.button`
  background-color: ${props => props.theme.primary};
  color: white;
  border: none;
  padding: 0.5rem;
  border-radius: 4px;
  cursor: pointer;
`;

const CreateGroup: React.FC = () => {
  const [groupName, setGroupName] = useState('');
  const [contacts, setContacts] = useState<{ id: number; name: string; avatar: string }[]>([]);
  const [selectedContacts, setSelectedContacts] = useState<number[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch contacts
    // This is where you'd typically make an API call
    setContacts([
      { id: 1, name: "Alice", avatar: "https://via.placeholder.com/40" },
      { id: 2, name: "Bob", avatar: "https://via.placeholder.com/40" },
      { id: 3, name: "Charlie", avatar: "https://via.placeholder.com/40" },
    ]);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Create group logic here
    console.log('Creating group:', groupName, 'with members:', selectedContacts);
    navigate('/chat');
  };

  const toggleContact = (contactId: number) => {
    setSelectedContacts(prev =>
      prev.includes(contactId)
        ? prev.filter(id => id !== contactId)
        : [...prev, contactId]
    );
  };

  return (
    <CreateGroupContainer>
      <Header>
        <BackButton onClick={() => navigate('/chat')}>
          <ArrowLeft size={24} />
        </BackButton>
        <Title>Create New Group</Title>
      </Header>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Group Name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          required
        />
        <ContactList>
          {contacts.map(contact => (
            <ContactItem key={contact.id} onClick={() => toggleContact(contact.id)}>
              <Checkbox
                type="checkbox"
                checked={selectedContacts.includes(contact.id)}
                onChange={() => {}}
              />
              <Avatar src={contact.avatar} alt={`${contact.name}'s avatar`} />
              {contact.name}
            </ContactItem>
          ))}
        </ContactList>
        <SubmitButton type="submit">
          <Check size={24} />
          Create Group
        </SubmitButton>
      </Form>
    </CreateGroupContainer>
  );
};

export default CreateGroup;

