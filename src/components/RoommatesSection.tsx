import React, { useState } from 'react';
import styled from 'styled-components';

const RoommatesContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const QueryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

const QueryCard = styled.div`
  background-color: #f0f0f0;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const QueryTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
`;

const QueryDescription = styled.p`
  font-size: 1rem;
  color: #666;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 500px;
  margin-top: 2rem;
`;

const Input = styled.input`
  margin-bottom: 1rem;
  padding: 0.5rem;
  font-size: 1rem;
`;

const TextArea = styled.textarea`
  margin-bottom: 1rem;
  padding: 0.5rem;
  font-size: 1rem;
  min-height: 100px;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #2980b9;
  }
`;

interface RoommateQuery {
  id: number;
  location: string;
  description: string;
}

const RoommatesSection: React.FC = () => {
  const [queries, setQueries] = useState<RoommateQuery[]>([
    { id: 1, location: "Looking for a roommate in NYC", description: "Seeking a responsible roommate for a 2-bedroom apartment in Manhattan." },
    { id: 2, location: "Need a roommate in San Francisco", description: "Looking for a tech-savvy roommate to share a modern apartment in SoMa." },
  ]);

  const [newQuery, setNewQuery] = useState<Omit<RoommateQuery, 'id'>>({
    location: '',
    description: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = queries.length + 1;
    setQueries([...queries, { ...newQuery, id }]);
    setNewQuery({ location: '', description: '' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewQuery({ ...newQuery, [name]: value });
  };

  return (
    <RoommatesContainer>
      <SectionTitle>Available Roommate Queries</SectionTitle>
      <QueryGrid>
        {queries.map((query) => (
          <QueryCard key={query.id}>
            <QueryTitle>{query.location}</QueryTitle>
            <QueryDescription>{query.description}</QueryDescription>
          </QueryCard>
        ))}
      </QueryGrid>

      <SectionTitle>Add Your Query</SectionTitle>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="location"
          placeholder="Location (e.g., Looking for a roommate in New York)"
          value={newQuery.location}
          onChange={handleInputChange}
          required
        />
        <TextArea
          name="description"
          placeholder="Description (e.g., Looking for a clean, responsible roommate)"
          value={newQuery.description}
          onChange={handleInputChange}
          required
        />
        <Button type="submit">Submit Query</Button>
      </Form>
    </RoommatesContainer>
  );
};

export default RoommatesSection;

