import type React from "react"
import { useState, useEffect } from "react"
import styled from "styled-components"
import { User, Lock, Edit2, Save, Upload } from "lucide-react"
import { useGetMyProfileQuery, useEditMyProfileMutation } from "../redux/api/api"
import { toast } from "react-hot-toast"
import Loader from "./loader"

const ProfileContainer = styled.div`
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: ${(props) => props.theme.background};
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`

const Title = styled.h2`
  color: ${(props) => props.theme.primary};
  margin-bottom: 2rem;
  text-align: center;
`

const AvatarContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
  position: relative;
`

const Avatar = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid ${(props) => props.theme.primary};
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const FormGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`

const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${(props) => props.theme.text};
  width: 100px;
`

const Input = styled.input`
  flex-grow: 1;
  padding: 0.5rem;
  border: 1px solid ${(props) => props.theme.primary}33;
  border-radius: 4px;
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.text};

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.primary};
  }
`

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: ${(props) => props.theme.primary};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => props.theme.primary}dd;
  }
`

const UploadButton = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.primary};
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  cursor: pointer;
  position: absolute;
  bottom: 0;
  right: 0;
`

const MyProfile: React.FC = () => {
  const { data: userProfile, isLoading, isError } = useGetMyProfileQuery({})
  const [editMyProfile] = useEditMyProfileMutation()

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    avatar: "/placeholder.svg?height=150&width=150",
  })
  const [isEditing, setIsEditing] = useState(false)
  const [newPassword, setNewPassword] = useState("")
  const [confirmNewPassword, setConfirmNewPassword] = useState("")
  const [newAvatar, setNewAvatar] = useState<File | null>(null)

  useEffect(() => {
    if (userProfile) {
      setProfile({
        name: userProfile.user.name,
        email: userProfile.user.email,
        avatar: userProfile.user.avatar.url,
      })
    }
  }, [userProfile])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProfile((prev) => ({ ...prev, [name]: value }))
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value)
  }

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmNewPassword(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (newPassword && newPassword !== confirmNewPassword) {
      toast.error("Passwords do not match")
      return
    }

    const formData = new FormData()
    formData.append("name", profile.name)
    if (newPassword) {
      formData.append("password", newPassword)
    }
    if (newAvatar) {
      formData.append("avatar", newAvatar)
    }

    try {
      await editMyProfile(formData).unwrap()
      toast.success("Profile updated successfully")
      setIsEditing(false)
      setNewPassword("")
      setConfirmNewPassword("")
      setNewAvatar(null)
    } catch (error) {
      toast.error("Failed to update profile")
    }
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setNewAvatar(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfile((prev) => ({ ...prev, avatar: reader.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  if (isLoading) {
    return <Loader />
  }

  if (isError) {
    return <div>Error loading profile</div>
  }

  return (
    <ProfileContainer>
      <Title>My Profile</Title>
      <AvatarContainer>
        <Avatar src={profile.avatar} alt="User Avatar" />
        <UploadButton htmlFor="avatar-upload">
          <Upload size={20} />
        </UploadButton>
        <input
          id="avatar-upload"
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleAvatarChange}
          disabled={!isEditing}
        />
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
          <Label htmlFor="email">Email</Label>
          <Input type="email" id="email" name="email" value={profile.email} disabled />
        </FormGroup>
        {isEditing && (
          <>
            <FormGroup>
              <Label htmlFor="newPassword">
                <Lock size={18} />
                New Password
              </Label>
              <Input
                type="password"
                id="newPassword"
                name="newPassword"
                value={newPassword}
                onChange={handlePasswordChange}
                placeholder="Enter new password"
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="confirmNewPassword">
                <Lock size={18} />
                Confirm New Password
              </Label>
              <Input
                type="password"
                id="confirmNewPassword"
                name="confirmNewPassword"
                value={confirmNewPassword}
                onChange={handleConfirmPasswordChange}
                placeholder="Confirm new password"
              />
            </FormGroup>
          </>
        )}
        <Button type={isEditing ? "submit" : "button"} onClick={() => !isEditing && setIsEditing(true)}>
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
  )
}

export default MyProfile

