import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Edit2, Trash2 } from 'lucide-react';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const Title = styled.h1`
  color: ${props => props.theme.text};
  margin-bottom: 2rem;
`;

const RequestList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const RequestItem = styled.li`
  background-color: ${props => props.theme.background};
  border: 1px solid ${props => props.theme.primary}33;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const RequestInfo = styled.div`
  flex-grow: 1;
`;

const RequestTitle = styled.h3`
  color: ${props => props.theme.primary};
  margin: 0 0 0.5rem 0;
`;

const RequestDescription = styled.p`
  color: ${props => props.theme.text};
  margin: 0;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${props => props.theme.primary};
  margin-left: 1rem;
`;

const DialogOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DialogContent = styled.div`
  background-color: ${props => props.theme.background};
  padding: 2rem;
  border-radius: 8px;
  width: 100%;
  max-width: 500px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid ${props => props.theme.primary};
  border-radius: 4px;
`;

const TextArea = styled.textarea`
  padding: 0.5rem;
  border: 1px solid ${props => props.theme.primary};
  border-radius: 4px;
  resize: vertical;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: white;
`;

const CancelButton = styled(Button)`
  background-color: ${props => props.theme.text};
`;

const SaveButton = styled(Button)`
  background-color: ${props => props.theme.primary};
`;

interface LearningRequest {
  id: number;
  title: string;
  description: string;
}

const MyLearningRequests: React.FC = () => {
  const [requests, setRequests] = useState<LearningRequest[]>([]);
  const [editingRequest, setEditingRequest] = useState<LearningRequest | null>(null);

  useEffect(() => {
    // Fetch user's learning requests
    // This is where you'd typically make an API call
    setRequests([
      { id: 1, title: "Machine Learning Study Group", description: "Looking for peers to study machine learning concepts" },
      { id: 2, title: "Web Development Workshop", description: "Seeking participants for a collaborative web development workshop" },
    ]);
  }, []);

  const handleEdit = (request: LearningRequest) => {
    setEditingRequest(request);
  };

  const handleDelete = (id: number) => {
    // Implement delete functionality
    console.log('Deleting request:', id);
    setRequests(requests.filter(request => request.id !== id));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingRequest) {
      setRequests(requests.map(request => 
        request.id === editingRequest.id ? editingRequest : request
      ));
      setEditingRequest(null);
    }
  };

  return (
    <Container>
      <Title>My Learning Requests</Title>
      <RequestList>
        {requests.map(request => (
          <RequestItem key={request.id}>
            <RequestInfo>
              <RequestTitle>{request.title}</RequestTitle>
              <RequestDescription>{request.description}</RequestDescription>
            </RequestInfo>
            <div>
              <ActionButton onClick={() => handleEdit(request)}>
                <Edit2 size={20} />
              </ActionButton>
              <ActionButton onClick={() => handleDelete(request.id)}>
                <Trash2 size={20} />
              </ActionButton>
            </div>
          </RequestItem>
        ))}
      </RequestList>
      {editingRequest && (
        <DialogOverlay>
          <DialogContent>
            <Form onSubmit={handleSave}>
              <Input
                type="text"
                value={editingRequest.title}
                onChange={(e) => setEditingRequest({...editingRequest, title: e.target.value})}
                placeholder="Title"
                required
              />
              <TextArea
                value={editingRequest.description}
                onChange={(e) => setEditingRequest({...editingRequest, description: e.target.value})}
                placeholder="Description"
                required
                rows={4}
              />
              <ButtonGroup>
                <CancelButton type="button" onClick={() => setEditingRequest(null)}>Cancel</CancelButton>
                <SaveButton type="submit">Save</SaveButton>
              </ButtonGroup>
            </Form>
          </DialogContent>
        </DialogOverlay>
      )}
    </Container>
  );
};

export default MyLearningRequests;

