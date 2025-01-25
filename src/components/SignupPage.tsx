import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { userSignup } from "../redux/thunks/user"
import styled from "styled-components"

const FormWrapper = styled.div`
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.text};
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`

const SignupCard = styled.div`
  width: 100%;
  max-width: 400px;
  background: ${(props) => props.theme.cardBackground};
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 3rem;
`

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 8px;
  font-size: 1rem;
  background: ${(props) => props.theme.inputBackground};
  color: ${(props) => props.theme.text};
`

const Button = styled.button`
  width: 100%;
  padding: 1rem;
  background-color: ${(props) => props.theme.primary};
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${(props) => props.theme.primaryHover};
  }
`

const SignUp: React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    avatar: null as File | null,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "avatar") {
      setFormData({ ...formData, avatar: e.target.files ? e.target.files[0] : null })
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const formDataToSend = new FormData()
    formDataToSend.append("name", formData.name)
    formDataToSend.append("email", formData.email)
    formDataToSend.append("password", formData.password)
    if (formData.avatar) {
      formDataToSend.append("avatar", formData.avatar)
    }
    //@ts-ignore
    const resultAction = await dispatch(userSignup(formDataToSend))
    if (userSignup.fulfilled.match(resultAction)) {
      navigate("/verify", { state: { email: formData.email } })
    }
  }

  return (
    <FormWrapper>
      <SignupCard>
        <h2 className="text-3xl font-bold text-center mb-6">Create an Account</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block mb-1">Name</label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-1">Email address</label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-1">Password</label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="avatar" className="block text-sm font-medium text-gray-700">Avatar</label>
            <input
              type="file"
              id="avatar"
              name="avatar"
              onChange={handleChange}
              className="mt-2 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <Button type="submit">Sign Up</Button>
        </form>
      </SignupCard>
    </FormWrapper>
  )
}

export default SignUp
