import React, { useState } from 'react';
import styled from 'styled-components';

const LearnersContainer = styled.div`
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

interface LearnerQuery {
  id: number;
  title: string;
  description: string;
}

const LearnersSection: React.FC = () => {
  const [queries, setQueries] = useState<LearnerQuery[]>([
    { id: 1, title: "Looking for a study partner in AI", description: "I'm studying machine learning and looking for someone to collaborate with on projects." },
    { id: 2, title: "Need help with JavaScript concepts", description: "I'm struggling with advanced JavaScript topics like closures and promises. Looking for a study buddy." },
  ]);

  const [newQuery, setNewQuery] = useState<Omit<LearnerQuery, 'id'>>({
    title: '',
    description: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = queries.length + 1;
    setQueries([...queries, { ...newQuery, id }]);
    setNewQuery({ title: '', description: '' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewQuery({ ...newQuery, [name]: value });
  };

  return (
    <LearnersContainer>
      <SectionTitle>Available Learners Queries</SectionTitle>
      <QueryGrid>
        {queries.map((query) => (
          <QueryCard key={query.id}>
            <QueryTitle>{query.title}</QueryTitle>
            <QueryDescription>{query.description}</QueryDescription>
          </QueryCard>
        ))}
      </QueryGrid>

      <SectionTitle>Add Your Query</SectionTitle>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="title"
          placeholder="Title (e.g., Looking for help with React)"
          value={newQuery.title}
          onChange={handleInputChange}
          required
        />
        <TextArea
          name="description"
          placeholder="Description (e.g., Need help understanding hooks and state management)"
          value={newQuery.description}
          onChange={handleInputChange}
          required
        />
        <Button type="submit">Submit Query</Button>
      </Form>
    </LearnersContainer>
  );
};

export default LearnersSection;

