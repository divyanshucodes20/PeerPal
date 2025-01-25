import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { userLogin } from "../redux/thunks/user"
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

const LoginCard = styled.div`
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

const Login: React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    //@ts-ignore
    const resultAction = await dispatch(userLogin(formData))
    if (userLogin.fulfilled.match(resultAction)) {
      if (!resultAction.payload.user.isVerified) {
        navigate("/verify", { state: { email: formData.email } })
      } else {
        navigate("/")
      }
    }
  }

  return (
    <FormWrapper>
      <LoginCard>
        <h2 className="text-3xl font-bold text-center mb-6">Sign in</h2>
        <form onSubmit={handleSubmit}>
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
          <Button type="submit">Sign In</Button>
        </form>
      </LoginCard>
    </FormWrapper>
  )
}

export default Login
