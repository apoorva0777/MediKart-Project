import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaUser, FaEnvelope, FaPhone, FaLock } from 'react-icons/fa'
import './AuthForm.css'
import { AuthContext } from '../../context/AuthContext'

const RegisterPage = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { login } = useContext(AuthContext)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: username, email, phone, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.message || 'Registration failed')
      } else {
        login(data.token)
        navigate('/')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-image">
        <img src="src/assets/register-image.jpg" alt="Register" />
      </div>
      <div className="auth-form">
        <h2>Registration form</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">username</label>
          <div className="input-group">
            <FaUser className="input-icon" />
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <label htmlFor="email">email</label>
          <div className="input-group">
            <FaEnvelope className="input-icon" />
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <label htmlFor="phone">phone</label>
          <div className="input-group">
            <FaPhone className="input-icon" />
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <label htmlFor="password">password</label>
          <div className="input-group">
            <FaLock className="input-icon" />
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="btn-primary">Register Now</button>
        </form>

        <div className="signup-link">
          <p>Already have an account? <Link to="/login">Sign in</Link></p>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
