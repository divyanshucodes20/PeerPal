import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate, useLocation } from "react-router-dom"
import { verifyOTP, resendOTP } from "../redux/thunks/user"
import styled from "styled-components"

// Styled components for the page
const FormWrapper = styled.div`
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.text};
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`

const VerificationCard = styled.div`
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

const ResendButton = styled.button`
  background: none;
  border: none;
  color: ${(props) => props.theme.primary};
  font-size: 1rem;
  cursor: pointer;
  text-decoration: underline;
  padding: 0;
  margin-top: 1rem;

  &:hover {
    color: ${(props) => props.theme.primaryHover};
  }
`

const VerificationPage: React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const [otp, setOtp] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    //@ts-ignore
    const resultAction = await dispatch(verifyOTP({ email: location.state.email, otp }))
    if (verifyOTP.fulfilled.match(resultAction)) {
      navigate("/")
    }
  }

  const handleResendOTP = async () => {
    //@ts-ignore
    await dispatch(resendOTP(location.state.email))
  }

  return (
    <FormWrapper>
      <VerificationCard>
        <h2 className="text-3xl font-extrabold text-center mb-6">Verify your email</h2>
        <p className="text-center text-sm mb-6">
          We've sent a verification code to {location.state.email}
        </p>
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <label htmlFor="otp" className="sr-only">
                Verification Code
              </label>
              <Input
                id="otp"
                name="otp"
                type="text"
                required
                placeholder="Enter verification code"
                value={otp}
                onChange={handleChange}
              />
            </div>
            <Button type="submit">Verify</Button>
          </div>
        </form>
        <div className="text-center">
          <ResendButton onClick={handleResendOTP}>Resend verification code</ResendButton>
        </div>
      </VerificationCard>
    </FormWrapper>
  )
}

export default VerificationPage
