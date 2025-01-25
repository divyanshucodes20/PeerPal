import type React from "react"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate, useLocation } from "react-router-dom"
import { verifyOTP, resendOTP } from "../redux/thunks/user"

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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Verify your email</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            We've sent a verification code to {location.state.email}
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="otp" className="sr-only">
                Verification Code
              </label>
              <input
                id="otp"
                name="otp"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Enter verification code"
                value={otp}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Verify
            </button>
          </div>
        </form>
        <div className="text-center">
          <button onClick={handleResendOTP} className="font-medium text-indigo-600 hover:text-indigo-500">
            Resend verification code
          </button>
        </div>
      </div>
    </div>
  )
}

export default VerificationPage

