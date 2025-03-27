import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './Signup.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import logo from '../assets/images/Learni.png'

const API_URL = 'http://localhost:3007/login'

const testimonials = [
  'This platform helped me fix my grammar mistakes in just 2 weeks! 🔥 - Sophia, Student',
  'AI-powered feedback made my learning experience much smoother! - Daniel, Learner',
  'The best way to practice speaking English confidently! - Maria, ESL Student',
]

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [errorMessage, setErrorMessage] = useState('')
  const [runningText, setRunningText] = useState(testimonials[0])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setErrorMessage('')

    try {
      const response = await axios.post(API_URL, formData)
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('userId', response.data.userId)
      navigate('/') // Redirect after successful login
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Invalid credentials!')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
      setRunningText(
        testimonials[(currentTestimonial + 1) % testimonials.length]
      )
    }, 15000)
    return () => clearInterval(interval)
  }, [currentTestimonial])

  return (
    <div className="signup-page">
      {/* Navbar */}
      <nav className="custom-navbar">
        <img className="navbar-brand logo" src={logo} alt="LearniFi" />
      </nav>

      <div className="signup-container">
        <div className="hero-section">
          <h1 className="hero-title">Welcome Back!</h1>
          <p className="hero-subtitle">
            Login to continue your learning journey.
          </p>
          <div className="testimonial-box">
            <p className="testimonial">{testimonials[currentTestimonial]}</p>
          </div>
        </div>
        <div className="signup-box">
          <h2 className="signup-title">Login</h2>
          <form onSubmit={handleSubmit} className="signup-form">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="signup-input"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="signup-input"
            />
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <button type="submit" className="signup-button" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          <p className="login-link">
            Don't have an account? <a href="/signup">Sign Up</a>
          </p>
        </div>
      </div>

      {/* Running Banner for Small Screens */}
      <div className="running-banner">
        <p className="running-text">{runningText}</p>
      </div>
    </div>
  )
}

export default Login
