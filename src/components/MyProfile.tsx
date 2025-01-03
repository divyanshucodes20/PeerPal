import React, { useState } from 'react';
import styled from 'styled-components';
import { User, Mail, Lock, Edit2, Save } from 'lucide-react';

const ProfileContainer = styled.div`
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: ${props => props.theme.background};
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  color: ${props => props.theme.primary};
  margin-bottom: 2rem;
  text-align: center;
`;

const AvatarContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
`;

const Avatar = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid ${props => props.theme.primary};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${props => props.theme.text};
  width: 100px;
`;

const Input = styled.input`
  flex-grow: 1;
  padding: 0.5rem;
  border: 1px solid ${props => props.theme.primary}33;
  border-radius: 4px;
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.text};

  &:focus {
    outline: none;
    border-color: ${props => props.theme.primary};
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: ${props => props.theme.primary};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${props => props.theme.primary}dd;
  }
`;

interface UserProfile {
  name: string;
  email: string;
  avatar: string;
}

const MyProfile: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile>({
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: '/placeholder.svg?height=150&width=150',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [newPassword, setNewPassword] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the updated profile to your backend
    console.log('Updated profile:', profile);
    if (newPassword) {
      console.log('New password:', newPassword);
    }
    setIsEditing(false);
    setNewPassword('');
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(prev => ({ ...prev, avatar: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <ProfileContainer>
      <Title>My Profile</Title>
      <AvatarContainer>
        <label htmlFor="avatar-upload">
          <Avatar src={profile.avatar} alt="User Avatar" />
          <input
            id="avatar-upload"
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleAvatarChange}
            disabled={!isEditing}
          />
        </label>
      </AvatarContainer>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="name">
            <User size={18} />
            Name
          </Label>
          <Input
            type="text"
            id="name"
            name="name"
            value={profile.name}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="email">
            <Mail size={18} />
            Email
          </Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={profile.email}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </FormGroup>
        {isEditing && (
          <FormGroup>
            <Label htmlFor="password">
              <Lock size={18} />
              Password
            </Label>
            <Input
              type="password"
              id="password"
              name="password"
              value={newPassword}
              onChange={handlePasswordChange}
              placeholder="Enter new password"
            />
          </FormGroup>
        )}
        <Button type={isEditing ? 'submit' : 'button'} onClick={() => !isEditing && setIsEditing(true)}>
          {isEditing ? (
            <>
              <Save size={18} />
              Save Changes
            </>
          ) : (
            <>
              <Edit2 size={18} />
              Edit Profile
            </>
          )}
        </Button>
      </Form>
    </ProfileContainer>
  );
};

export default MyProfile;

