import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Search, Send, Plus, Settings, Users } from 'lucide-react';
import { DefaultTheme } from 'styled-components';

const StyledSearch = styled(Search)`
  color: ${props => props.theme.text};
`;

const ChatContainer = styled.div`
  display: flex;
  height: calc(100vh - 60px);
  background-color: ${props => props.theme.background};
`;

const Sidebar = styled.div`
  width: 30%;
  border-right: 1px solid ${props => props.theme.primary}33;
  display: flex;
  flex-direction: column;
`;

const SearchContainer = styled.div<{ theme: DefaultTheme }>`
  display: flex;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid ${props => props.theme.primary}33;
`;

const SearchInput = styled.input`
  border: none;
  background-color: ${props => props.theme.background};
  margin-left: 0.5rem;
  flex-grow: 1;
  color: ${props => props.theme.text};
  &:focus {
    outline: none;
  }
`;

const ContactList = styled.div`
  flex-grow: 1;
  overflow-y: auto;
`;

const ContactItem = styled.div<{ isActive: boolean }>`
  padding: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  background-color: ${props => props.isActive ? props.theme.primary + '33' : 'transparent'};
  &:hover {
    background-color: ${props => props.theme.primary}22;
  }
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 1rem;
`;

const ChatArea = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const ChatHeader = styled.div`
  padding: 1rem;
  border-bottom: 1px solid ${props => props.theme.primary}33;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MessageList = styled.div`
  flex-grow: 1;
  padding: 1rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

const MessageWrapper = styled.div<{ isSent: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: ${props => props.isSent ? 'flex-end' : 'flex-start'};
  margin-bottom: 1rem;
`;

const Message = styled.div<{ isSent: boolean }>`
  max-width: 60%;
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  background-color: ${props => props.isSent ? props.theme.primary : props.theme.primary + '33'};
  color: ${props => props.isSent ? 'white' : props.theme.text};
`;

const MessageInfo = styled.div`
  font-size: 0.8rem;
  color: ${props => props.theme.text}99;
  margin-top: 0.2rem;
`;

const InputArea = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  border-top: 1px solid ${props => props.theme.primary}33;
`;

const Input = styled.input`
  flex-grow: 1;
  border: none;
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.text};
  padding: 0.5rem;
  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  background-color: ${props => props.theme.primary};
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-left: 1rem;
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: ${props => props.theme.background};
  padding: 2rem;
  border-radius: 8px;
  width: 80%;
  max-width: 500px;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const ModalTitle = styled.h2`
  margin: 0;
  color: ${props => props.theme.text};
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${props => props.theme.text};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Label = styled.label`
  color: ${props => props.theme.text};
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

const GroupIcon = styled(Users)`
  color: ${props => props.theme.text};
  cursor: pointer;
  margin-left: 0.5rem;
`;

interface Contact {
  id: number;
  name: string;
  avatar: string;
  isGroup: boolean;
}

interface Message {
  id: number;
  senderId: number;
  senderName: string;
  text: string;
  timestamp: Date;
}

interface Group extends Contact {
  members: { id: number; name: string; isAdmin: boolean }[];
}

const dummyContacts: Contact[] = [
  { id: 1, name: "Alice", avatar: "https://via.placeholder.com/40", isGroup: false },
  { id: 2, name: "Bob", avatar: "https://via.placeholder.com/40", isGroup: false },
  { id: 3, name: "Project Team", avatar: "https://via.placeholder.com/40", isGroup: true },
  { id: 4, name: "Charlie", avatar: "https://via.placeholder.com/40", isGroup: false },
];

const dummyMessages: Message[] = [
  { id: 1, senderId: 1, senderName: "Alice", text: "Hey, how's it going?", timestamp: new Date() },
  { id: 2, senderId: 0, senderName: "You", text: "Not bad, just working on a project. You?", timestamp: new Date() },
  { id: 3, senderId: 1, senderName: "Alice", text: "Same here. Want to collaborate?", timestamp: new Date() },
];

const dummyGroups: Group[] = [
  {
    id: 3,
    name: "Project Team",
    avatar: "https://via.placeholder.com/40",
    isGroup: true,
    members: [
      { id: 0, name: "You", isAdmin: true },
      { id: 1, name: "Alice", isAdmin: false },
      { id: 2, name: "Bob", isAdmin: false },
    ],
  },
];

const ChatSection: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>(dummyContacts);
  const [messages, setMessages] = useState<Message[]>(dummyMessages);
  const [groups, setGroups] = useState<Group[]>(dummyGroups);
  const [activeContact, setActiveContact] = useState<Contact | null>(null);
  const [inputMessage, setInputMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = () => {
    if (inputMessage.trim() && activeContact) {
      const newMessage: Message = {
        id: messages.length + 1,
        senderId: 0,
        senderName: "You",
        text: inputMessage,
        timestamp: new Date(),
      };
      setMessages([...messages, newMessage]);
      setInputMessage('');
    }
  };

  const handleGroupSettings = () => {
    if (activeContact && activeContact.isGroup) {
      navigate(`/chat/groups/${activeContact.id}`);
    }
  };

  return (
    <ChatContainer>
      <Sidebar>
        <SearchContainer>
          <StyledSearch size={20} />
          <SearchInput
            type="text"
            placeholder="Search contacts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button onClick={() => navigate('/chat/groups/create')}>
            <Plus size={20} />
          </Button>
          <GroupIcon size={20} onClick={() => navigate('/chat/groups')} />
        </SearchContainer>
        <ContactList>
          {filteredContacts.map(contact => (
            <ContactItem
              key={contact.id}
              isActive={activeContact?.id === contact.id}
              onClick={() => setActiveContact(contact)}
            >
              <Avatar src={contact.avatar} alt={`${contact.name}'s avatar`} />
              {contact.name} {contact.isGroup && "(Group)"}
            </ContactItem>
          ))}
        </ContactList>
      </Sidebar>
      <ChatArea>
        {activeContact ? (
          <>
            <ChatHeader>
              {activeContact.name}
              {activeContact.isGroup && (
                <Button onClick={handleGroupSettings}>
                  <Settings size={20} />
                </Button>
              )}
            </ChatHeader>
            <MessageList>
              {messages.map(message => (
                <MessageWrapper key={message.id} isSent={message.senderId === 0}>
                  <Message isSent={message.senderId === 0}>
                    {message.text}
                  </Message>
                  <MessageInfo>
                    {message.senderName} • {message.timestamp.toLocaleTimeString()}
                  </MessageInfo>
                </MessageWrapper>
              ))}
            </MessageList>
            <InputArea>
              <Input
                type="text"
                placeholder="Type a message..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <Button onClick={handleSendMessage}>
                <Send size={20} />
              </Button>
            </InputArea>
          </>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            Select a contact to start chatting
          </div>
        )}
      </ChatArea>
    </ChatContainer>
  );
};

export default ChatSection;

