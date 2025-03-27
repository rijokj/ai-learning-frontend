import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './Signup.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import logo from '../assets/images/Learni.png'

const API_URL = 'http://localhost:3007'

const testimonials = [
  'This platform helped me fix my grammar mistakes in just 2 weeks! 🔥 - Sophia, Student',
  'AI-powered feedback made my learning experience much smoother! - Daniel, Learner',
  'The best way to practice speaking English confidently! - Maria, ESL Student',
]

const Signup = () => {
  const [isLogin, setIsLogin] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [runningText, setRunningText] = useState(testimonials[0])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
      setRunningText(
        testimonials[(currentTestimonial + 1) % testimonials.length]
      )
    }, 15000)
    return () => clearInterval(interval)
  }, [currentTestimonial])

  // Handle Signup/Login
  const onSubmit = async (data) => {
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const url = isLogin ? `${API_URL}/login` : `${API_URL}/signup`
      const response = await axios.post(url, data)

      setSuccess(
        response.data.message ||
          (isLogin ? 'Login Successful!' : 'Signup Successful!')
      )

      if (isLogin && response.data.token) {
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('userId', response.data.userId)
        navigate('/') // Redirect user after login
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="signup-page">
      {/* Navbar */}
      <nav className="custom-navbar">
        <img className="navbar-brand logo" src={logo} alt="LearniFi" />
      </nav>

      <div className="signup-container">
        <div className="hero-section">
          <h1 className="hero-title">
            Join the AI-Powered Language Revolution!
          </h1>
          <p className="hero-subtitle">
            Improve your speaking skills with real-time AI feedback.
          </p>
          <div className="testimonial-box">
            <p className="testimonial">{testimonials[currentTestimonial]}</p>
          </div>
        </div>

        <div className="signup-box">
          <h2 className="signup-title">{isLogin ? 'Log In' : 'Sign Up'}</h2>
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}

          <form onSubmit={handleSubmit(onSubmit)} className="signup-form">
            {!isLogin && (
              <>
                <input
                  type="text"
                  placeholder="First Name"
                  {...register('firstName', {
                    required: 'First Name is required',
                  })}
                  className={`signup-input ${
                    errors.firstName ? 'error-input' : ''
                  }`}
                />
                {errors.firstName && (
                  <p className="error-message">{errors.firstName.message}</p>
                )}

                <input
                  type="text"
                  placeholder="Last Name"
                  {...register('lastName', {
                    required: 'Last Name is required',
                  })}
                  className={`signup-input ${
                    errors.lastName ? 'error-input' : ''
                  }`}
                />
                {errors.lastName && (
                  <p className="error-message">{errors.lastName.message}</p>
                )}

                <input
                  type="text"
                  placeholder="Mobile Number"
                  {...register('mobileNumber', {
                    required: 'Mobile Number is required',
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: 'Invalid mobile number. Must be 10 digits.',
                    },
                  })}
                  className={`signup-input ${
                    errors.mobileNumber ? 'error-input' : ''
                  }`}
                />
                {errors.mobileNumber && (
                  <p className="error-message">{errors.mobileNumber.message}</p>
                )}
              </>
            )}

            <input
              type="email"
              placeholder="Email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Invalid email address',
                },
              })}
              className={`signup-input ${errors.email ? 'error-input' : ''}`}
            />
            {errors.email && (
              <p className="error-message">{errors.email.message}</p>
            )}

            <input
              type="password"
              placeholder="Password"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
              className={`signup-input ${errors.password ? 'error-input' : ''}`}
            />
            {errors.password && (
              <p className="error-message">{errors.password.message}</p>
            )}

            {!isLogin && (
              <input
                type="password"
                placeholder="Confirm Password"
                {...register('confirmPassword', {
                  required: 'Please confirm your password',
                  validate: (value) =>
                    value === watch('password') || 'Passwords do not match',
                })}
                className={`signup-input ${
                  errors.confirmPassword ? 'error-input' : ''
                }`}
              />
            )}
            {errors.confirmPassword && (
              <p className="error-message">{errors.confirmPassword.message}</p>
            )}

            <button type="submit" className="signup-button" disabled={loading}>
              {loading ? 'Processing...' : isLogin ? 'Log In' : 'Sign Up'}
            </button>
          </form>

          <p className="login-link">
            {isLogin ? "Don't have an account?" : 'Already a member?'}{' '}
            <span onClick={() => setIsLogin(!isLogin)} className="toggle-link">
              {isLogin ? 'Sign Up' : 'Log in'}
            </span>
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

export default Signup
