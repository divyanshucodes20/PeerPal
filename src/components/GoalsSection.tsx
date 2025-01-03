import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const GoalsContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const GoalForm = styled.form`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid ${props => props.theme.primary};
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: ${props => props.theme.primary};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const GoalList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const GoalItem = styled.li`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const Checkbox = styled.input`
  margin-right: 0.5rem;
`;

interface Goal {
  id: number;
  description: string;
  completed: boolean;
}

const GoalsSection: React.FC = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [newGoal, setNewGoal] = useState('');
  const [isAdmin, setIsAdmin] = useState(true); // Set this based on user role

  useEffect(() => {
    // Fetch goals from API or local storage
    // For now, we'll use dummy data
    setGoals([
      { id: 1, description: 'Complete project proposal', completed: false },
      { id: 2, description: 'Review team member contributions', completed: true },
      { id: 3, description: 'Schedule team meeting', completed: false },
    ]);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newGoal.trim()) {
      const newGoalItem: Goal = {
        id: Date.now(),
        description: newGoal.trim(),
        completed: false,
      };
      setGoals([...goals, newGoalItem]);
      setNewGoal('');
    }
  };

  const toggleGoalCompletion = (id: number) => {
    setGoals(goals.map(goal => 
      goal.id === id ? { ...goal, completed: !goal.completed } : goal
    ));
  };

  const completedGoals = goals.filter(goal => goal.completed).length;
  const totalGoals = goals.length;

  const chartData = {
    labels: ['Completed', 'Remaining'],
    datasets: [
      {
        label: 'Goals',
        data: [completedGoals, totalGoals - completedGoals],
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Goal Completion Chart',
      },
    },
  };

  return (
    <GoalsContainer>
      <h1>Project Goals</h1>
      {isAdmin && (
        <GoalForm onSubmit={handleSubmit}>
          <Input
            type="text"
            value={newGoal}
            onChange={(e) => setNewGoal(e.target.value)}
            placeholder="Enter a new goal"
          />
          <Button type="submit">Add Goal</Button>
        </GoalForm>
      )}
      <GoalList>
        {goals.map(goal => (
          <GoalItem key={goal.id}>
            <Checkbox
              type="checkbox"
              checked={goal.completed}
              onChange={() => toggleGoalCompletion(goal.id)}
              disabled={!isAdmin}
            />
            {goal.description}
          </GoalItem>
        ))}
      </GoalList>
      <div style={{ maxWidth: '500px', margin: '2rem auto' }}>
        <Bar data={chartData} options={chartOptions} />
      </div>
    </GoalsContainer>
  );
};

export default GoalsSection;

