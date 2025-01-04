import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Search, Send, Plus, Settings, Users, ArrowLeft } from 'lucide-react';

interface ChatAreaProps {
  isOpen: boolean;
}

interface ContactItemProps {
  isActive: boolean;
}

interface MessageWrapperProps {
  isSent: boolean;
}

const ChatContainer = styled.div`
  display: flex;
  height: calc(100vh - 60px);
  background-color: ${props => props.theme.background};

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Sidebar = styled.div<ChatAreaProps>`
  width: 30%;
  border-right: 1px solid ${props => props.theme.primary}33;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    background-color: ${props => props.theme.background};
    display: ${props => props.isOpen ? 'flex' : 'none'};
  }
`;

const ChatArea = styled.div<ChatAreaProps>`
  flex-grow: 1;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    width: 100%;
    height: 100%;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid ${props => props.theme.primary}33;

  @media (max-width: 768px) {
    position: sticky;
    top: 0;
    background-color: ${props => props.theme.background};
    z-index: 11;
  }
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

const ContactItem = styled.div<ContactItemProps>`
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

const ChatHeader = styled.div`
  padding: 1rem;
  border-bottom: 1px solid ${props => props.theme.primary}33;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    position: sticky;
    top: 0;
    background-color: ${props => props.theme.background};
    z-index: 11;
  }
`;

const MessageList = styled.div`
  flex-grow: 1;
  padding: 1rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

const MessageWrapper = styled.div<MessageWrapperProps>`
  display: flex;
  flex-direction: column;
  align-items: ${props => props.isSent ? 'flex-end' : 'flex-start'};
  margin-bottom: 1rem;
`;

const Message = styled.div<MessageWrapperProps>`
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

const ManageGroupsButton = styled(Button)`
  background-color: #3182ce;
  @media (max-width: 768px) {
    margin-left: 0;
    margin-bottom: 1rem;
  }
`;

const BackButton = styled(Button)`
  @media (min-width: 769px) {
    display: none;
  }
`;

const NoChat = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
`;

const ChatSection: React.FC = () => {
  interface Contact {
    id: number;
    name: string;
    avatar: string;
    isGroup?: boolean;
  }
  
  const [contacts, setContacts] = useState<Contact[]>([]);
  interface Message {
    id: number;
    senderId: number;
    text: string;
    timestamp: Date;
  }

  const [messages, setMessages] = useState<Message[]>([]);
  const [activeContact, setActiveContact] = useState<Contact | null>(null);
  const [inputMessage, setInputMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch contacts and messages
    // This is where you'd typically make API calls
    setContacts([
      { id: 1, name: "Alice", avatar: "https://via.placeholder.com/40" },
      { id: 2, name: "Bob", avatar: "https://via.placeholder.com/40" },
      { id: 3, name: "Project Team", avatar: "https://via.placeholder.com/40", isGroup: true },
    ]);
  }, []);

  useEffect(() => {
    if (id) {
      const contact = contacts.find(c => c.id === parseInt(id));
      setActiveContact(contact || null);
      // Fetch messages for this contact
      // This is where you'd typically make an API call
    }
  }, [id, contacts]);

  const handleSendMessage = () => {
    if (inputMessage.trim() && activeContact) {
      // Send message logic here
      setInputMessage('');
    }
  };

  interface HandleContactClickProps {
    contactId: number;
  }

  const handleContactClick = ({ contactId }: HandleContactClickProps) => {
    navigate(`/chat/${contactId}`);
    setActiveContact(contacts.find(c => c.id === contactId) || null);
    setIsSidebarOpen(false);
  };

  return (
    <ChatContainer>
      <Sidebar isOpen={isSidebarOpen}>
        <SearchContainer>
          <Search size={20} />
          <SearchInput
            type="text"
            placeholder="Search contacts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button onClick={() => navigate('/chat/groups/create')}>
            <Plus size={20} />
          </Button>
          <ManageGroupsButton onClick={() => navigate('/chat/groups')}>
            <Users size={20} />
          </ManageGroupsButton>
        </SearchContainer>
        <ContactList>
          {contacts.filter(contact => contact.name.toLowerCase().includes(searchTerm.toLowerCase())).map(contact => (
            <ContactItem
              key={contact.id}
              isActive={activeContact?.id === contact.id}
              onClick={() => handleContactClick({ contactId: contact.id })}
            >
              <Avatar src={contact.avatar} alt={`${contact.name}'s avatar`} />
              {contact.name} {contact.isGroup && "(Group)"}
            </ContactItem>
          ))}
        </ContactList>
      </Sidebar>
      <ChatArea isOpen={!isSidebarOpen}>
        {activeContact ? (
          <>
            <ChatHeader>
              <BackButton onClick={() => setIsSidebarOpen(true)}>
                <ArrowLeft size={20} />
              </BackButton>
              {activeContact.name}
              {activeContact.isGroup && (
                <Button onClick={() => navigate(`/chat/groups/${activeContact.id}`)}>
                  <Settings size={20} />
                </Button>
              )}
            </ChatHeader>
            <MessageList>
              {messages.map(message => (
                <MessageWrapper key={message.id} isSent={message.senderId === 0}>
                  <Message isSent={message.senderId === 0}>{message.text}</Message>
                  <MessageInfo>{message.timestamp.toLocaleString()}</MessageInfo>
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
          <NoChat>
            <p>Select a member or group to chat</p>
          </NoChat>
        )}
      </ChatArea>
    </ChatContainer>
  );
};

export default ChatSection;