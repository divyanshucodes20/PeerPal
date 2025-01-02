import React, { useState } from 'react';
import styled from 'styled-components';

const ChatContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const ConversationList = styled.div`
  margin-bottom: 2rem;
`;

const ConversationItem = styled.div`
  background-color: #f0f0f0;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #e0e0e0;
  }
`;

const ChatWindow = styled.div`
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
  height: 400px;
  display: flex;
  flex-direction: column;
`;

const MessageList = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding: 1rem;
`;

const Message = styled.div<{ isCurrentUser: boolean }>`
  background-color: ${(props) => (props.isCurrentUser ? '#3498db' : '#f0f0f0')};
  color: ${(props) => (props.isCurrentUser ? '#fff' : '#333')};
  border-radius: 8px;
  padding: 0.5rem 1rem;
  margin-bottom: 0.5rem;
  max-width: 70%;
  align-self: ${(props) => (props.isCurrentUser ? 'flex-end' : 'flex-start')};
`;

const InputArea = styled.form`
  display: flex;
  padding: 1rem;
  border-top: 1px solid #ccc;
`;

const Input = styled.input`
  flex-grow: 1;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const SendButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  margin-left: 0.5rem;
  cursor: pointer;

  &:hover {
    background-color: #2980b9;
  }
`;

interface Message {
  id: number;
  text: string;
  sender: string;
}

const ChatSection: React.FC = () => {
  const [conversations] = useState([
    { id: 1, name: 'User A' },
    { id: 2, name: 'User B' },
  ]);

  const [selectedConversation, setSelectedConversation] = useState<number | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hi! Are you still looking for a study partner?", sender: "User A" },
    { id: 2, text: "Yes, I am. What subject are you interested in?", sender: "User B" },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const newMsg: Message = {
        id: messages.length + 1,
        text: newMessage,
        sender: 'Current User',
      };
      setMessages([...messages, newMsg]);
      setNewMessage('');
    }
  };

  return (
    <ChatContainer>
      <ConversationList>
        {conversations.map((conv) => (
          <ConversationItem key={conv.id} onClick={() => setSelectedConversation(conv.id)}>
            {conv.name}
          </ConversationItem>
        ))}
      </ConversationList>
      {selectedConversation && (
        <ChatWindow>
          <MessageList>
            {messages.map((msg) => (
              <Message key={msg.id} isCurrentUser={msg.sender === 'Current User'}>
                {msg.text}
              </Message>
            ))}
          </MessageList>
          <InputArea onSubmit={handleSendMessage}>
            <Input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
            />
            <SendButton type="submit">Send</SendButton>
          </InputArea>
        </ChatWindow>
      )}
    </ChatContainer>
  );
};

export default ChatSection;

