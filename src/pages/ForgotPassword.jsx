import React, { useState } from 'react'
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap'
import axios from 'axios'

const ForgotPassword = () => {
  const api = 'http://localhost:3007'
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    email: '',
    otp: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setError('')
    setMessage('')
  }

  const handleNextStep = async () => {
    try {
      setError('')
      setMessage('')

      if (step === 1) {
        if (!formData.email.includes('@')) {
          setError('Please enter a valid email.')
          return
        }
        // Fixed API URL by using the api constant and removing /api prefix
        const res = await axios.post(`${api}/sendotp`, {
          email: formData.email,
        })
        setMessage(res.data.message || 'OTP sent to your email!')
        setStep(2)
      } else if (step === 2) {
        if (formData.otp.length !== 6) {
          setError('Invalid OTP. Enter a 6-digit code.')
          return
        }
        // Fixed API URL
        const res = await axios.post(`${api}/verifyotp`, {
          email: formData.email,
          otp: formData.otp,
        })
        setMessage(res.data.message || 'OTP Verified!')
        setStep(3)
      } else if (step === 3) {
        if (formData.newPassword !== formData.confirmPassword) {
          setError('Passwords do not match.')
          return
        }
        // Fixed API URL
        const res = await axios.post(`${api}/reset-password`, {
          email: formData.email,
          newPassword: formData.newPassword,
          confirmPassword: formData.confirmPassword,
        })
        setMessage(res.data.message || 'Password Updated!')
        setStep(4)
      }
    } catch (err) {
      // Improved error handling to check for both error and message properties
      setError(
        err.response?.data?.error ||
          err.response?.data?.message ||
          'Something went wrong.'
      )
    }
  }

  const handleResendOTP = async () => {
    try {
      setError('')
      // Fixed API URL
      const res = await axios.post(`${api}/sendotp`, { email: formData.email })
      setMessage(res.data.message || 'OTP resent to your email!')
    } catch (err) {
      // Improved error handling
      setError(
        err.response?.data?.error ||
          err.response?.data?.message ||
          'Failed to resend OTP.'
      )
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(to bottom, #dff6ff, #ffffff)',
        padding: '40px',
      }}
    >
      <Container>
        <Row className="justify-content-center">
          <Col lg={6} md={8}>
            <div
              style={{
                background: 'rgba(173, 216, 230, 0.2)',
                backdropFilter: 'blur(10px)',
                padding: '2rem',
                borderRadius: '20px',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
              }}
            >
              <h2
                style={{
                  textAlign: 'center',
                  fontSize: '1.8rem',
                  marginBottom: '1rem',
                  color: '#333',
                }}
              >
                {step === 1
                  ? 'Reset Your Password'
                  : step === 2
                  ? 'Verify OTP'
                  : step === 3
                  ? 'Set New Password'
                  : 'Done!'}
              </h2>
              <p
                style={{
                  fontSize: '1.2rem',
                  textAlign: 'center',
                  marginBottom: '20px',
                  color: '#444',
                }}
              >
                {step === 1
                  ? 'Enter your registered email to receive an OTP.'
                  : step === 2
                  ? 'Enter the OTP sent to your email.'
                  : step === 3
                  ? 'Enter and confirm your new password.'
                  : 'Your password has been reset successfully!'}
              </p>

              {message && <Alert variant="success">{message}</Alert>}
              {error && <Alert variant="danger">{error}</Alert>}

              {step < 4 && (
                <Form style={{ textAlign: 'left' }}>
                  {step === 1 && (
                    <Form.Group
                      controlId="formEmail"
                      style={{ marginBottom: '1rem' }}
                    >
                      <Form.Label
                        style={{ fontWeight: '500', fontSize: '1.1rem' }}
                      >
                        Email Address
                      </Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        style={{
                          borderRadius: '10px',
                          padding: '12px',
                          border: 'none',
                          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                        }}
                      />
                    </Form.Group>
                  )}

                  {step === 2 && (
                    <Form.Group
                      controlId="formOTP"
                      style={{ marginBottom: '1rem' }}
                    >
                      <Form.Label
                        style={{ fontWeight: '500', fontSize: '1.1rem' }}
                      >
                        Enter OTP
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="otp"
                        value={formData.otp}
                        onChange={handleChange}
                        required
                        style={{
                          borderRadius: '10px',
                          padding: '12px',
                          border: 'none',
                          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                        }}
                      />
                      <p
                        style={{
                          cursor: 'pointer',
                          color: '#007bff',
                          textDecoration: 'underline',
                          marginTop: '10px',
                        }}
                        onClick={handleResendOTP}
                      >
                        Resend OTP?
                      </p>
                    </Form.Group>
                  )}

                  {step === 3 && (
                    <>
                      <Form.Group
                        controlId="formNewPassword"
                        style={{ marginBottom: '1rem' }}
                      >
                        <Form.Label
                          style={{ fontWeight: '500', fontSize: '1.1rem' }}
                        >
                          New Password
                        </Form.Label>
                        <Form.Control
                          type="password"
                          name="newPassword"
                          value={formData.newPassword}
                          onChange={handleChange}
                          required
                          style={{
                            borderRadius: '10px',
                            padding: '12px',
                            border: 'none',
                            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                          }}
                        />
                      </Form.Group>
                      <Form.Group
                        controlId="formConfirmPassword"
                        style={{ marginBottom: '1.5rem' }}
                      >
                        <Form.Label
                          style={{ fontWeight: '500', fontSize: '1.1rem' }}
                        >
                          Confirm Password
                        </Form.Label>
                        <Form.Control
                          type="password"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          required
                          style={{
                            borderRadius: '10px',
                            padding: '12px',
                            border: 'none',
                            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                          }}
                        />
                      </Form.Group>
                    </>
                  )}

                  <Button
                    type="button"
                    variant="primary"
                    style={{
                      width: '100%',
                      padding: '12px',
                      background: '#007bff',
                      color: 'white',
                      borderRadius: '8px',
                      fontSize: '1.1rem',
                      fontWeight: 'bold',
                      boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)',
                      border: 'none',
                      transition: '0.3s',
                    }}
                    onMouseOver={(e) => {
                      e.target.style.backgroundColor = '#0056b3'
                    }}
                    onMouseOut={(e) => {
                      e.target.style.backgroundColor = '#007bff'
                    }}
                    onClick={handleNextStep}
                  >
                    {step === 1
                      ? 'Send OTP'
                      : step === 2
                      ? 'Verify OTP'
                      : 'Submit'}
                  </Button>
                </Form>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default ForgotPassword
