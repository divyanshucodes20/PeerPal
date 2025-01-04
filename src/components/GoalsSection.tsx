import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const GoalsContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const GroupList = styled.ul`
  list-style-type: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
`;

const GroupItem = styled.li`
  background-color: ${props => props.theme.background};
  border: 1px solid ${props => props.theme.primary}33;
  border-radius: 8px;
  padding: 1rem;
  cursor: pointer;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
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
  flex-grow: 1;
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

interface Group {
  id: number;
  name: string;
  goals: Goal[];
}

const dummyGroups: Group[] = [
  {
    id: 1,
    name: "Web Development Team",
    goals: [
      { id: 1, description: "Complete project proposal", completed: false },
      { id: 2, description: "Set up development environment", completed: true },
    ]
  },
  {
    id: 2,
    name: "Machine Learning Study Group",
    goals: [
      { id: 3, description: "Finish online course", completed: false },
      { id: 4, description: "Implement first ML model", completed: false },
    ]
  },
  {
    id: 3,
    name: "Mobile App Team",
    goals: [
      { id: 5, description: "Design user interface", completed: true },
      { id: 6, description: "Implement core features", completed: false },
    ]
  }
];

const GoalsSection: React.FC = () => {
  const [groups, setGroups] = useState<Group[]>(dummyGroups);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [newGoal, setNewGoal] = useState('');
  const [isAdmin, setIsAdmin] = useState(true); // Set this based on user role
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (projectId) {
      const group = groups.find(g => g.id === parseInt(projectId));
      setSelectedGroup(group || null);
    } else {
      setSelectedGroup(null);
    }
  }, [projectId, groups]);

  const handleGroupClick = (group: Group) => {
    navigate(`/goals/${group.id}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newGoal.trim() && selectedGroup) {
      const newGoalItem: Goal = {
        id: Date.now(),
        description: newGoal.trim(),
        completed: false,
      };
      setGroups(groups.map(group => 
        group.id === selectedGroup.id 
          ? { ...group, goals: [...group.goals, newGoalItem] }
          : group
      ));
      setNewGoal('');
    }
  };

  const toggleGoalCompletion = (goalId: number) => {
    if (selectedGroup) {
      setGroups(groups.map(group => 
        group.id === selectedGroup.id
          ? {
              ...group,
              goals: group.goals.map(goal => 
                goal.id === goalId ? { ...goal, completed: !goal.completed } : goal
              )
            }
          : group
      ));
    }
  };

  const deleteGoal = (goalId: number) => {
    if (selectedGroup) {
      setGroups(groups.map(group => 
        group.id === selectedGroup.id
          ? {
              ...group,
              goals: group.goals.filter(goal => goal.id !== goalId)
            }
          : group
      ));
    }
  };

  const renderChart = () => {
    if (!selectedGroup) return null;

    const completedGoals = selectedGroup.goals.filter(goal => goal.completed).length;
    const totalGoals = selectedGroup.goals.length;

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
      <div style={{ maxWidth: '500px', margin: '2rem auto' }}>
        <Bar data={chartData} options={chartOptions} />
      </div>
    );
  };

  return (
    <GoalsContainer>
      <h1>My Groups</h1>
      {!selectedGroup && (
        <GroupList>
          {groups.map(group => (
            <GroupItem key={group.id} onClick={() => handleGroupClick(group)}>
              <h3>{group.name}</h3>
              <p>{group.goals.length} goals</p>
            </GroupItem>
          ))}
        </GroupList>
      )}
      {selectedGroup && (
        <>
          <h2>{selectedGroup.name} Goals</h2>
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
            {selectedGroup.goals.map(goal => (
              <GoalItem key={goal.id}>
                <Checkbox
                  type="checkbox"
                  checked={goal.completed}
                  onChange={() => toggleGoalCompletion(goal.id)}
                  disabled={isAdmin}
                />
                {goal.description}
                {isAdmin && (
                  <Button onClick={() => deleteGoal(goal.id)}>Delete</Button>
                )}
              </GoalItem>
            ))}
          </GoalList>
          {renderChart()}
          <Button onClick={() => navigate('/goals')}>Back to Groups</Button>
        </>
      )}
    </GoalsContainer>
  );
};

export default GoalsSection;

