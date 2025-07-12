import React, { useState } from 'react'
import { Container, Form, Button, Alert } from 'react-bootstrap'
import axios from 'axios'
import './AddLang.css'

const AddLanguage = ({ closeForm }) => {
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    description: '',
    flag: null, // File instead of URL
  })

  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value, files } = e.target
    if (name === 'flag') {
      setFormData((prev) => ({ ...prev, flag: files[0] }))
    } else {
      let newValue = name === 'code' ? value.toLowerCase() : value
      setFormData((prev) => ({ ...prev, [name]: newValue }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    const { name, code, description, flag } = formData
    if (!name.trim() || !code.trim()) {
      setMessage('Name and Code are required!')
      setIsLoading(false)
      return
    }

    try {
      const data = new FormData()
      data.append('name', name.trim())
      data.append('code', code.trim())
      data.append('description', description.trim())
      if (flag) data.append('flag', flag)

        await axios.post('http://localhost:3007/admin/addlanguage', data, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        })

      setMessage('✅ Language added successfully!')
      setFormData({ name: '', code: '', description: '', flag: null })

      setTimeout(() => {
        if (typeof closeForm === 'function') closeForm()
      }, 1500)
    } catch (error) {
      console.error('Error adding language:', error)
      setMessage(error.response?.data?.message || '❌ Failed to add language.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Container className="language-form-container">
      <h2 className="language-title">🌍 Add New Language</h2>

      {message && (
        <Alert
          className={`language-alert ${
            message.includes('successfully') ? 'success' : 'danger'
          }`}
        >
          {message}
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="language-form-group">
          <Form.Label className="language-label">Language Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="language-input"
            placeholder="e.g., English, Hindi, French"
          />
        </Form.Group>

        <Form.Group className="language-form-group">
          <Form.Label className="language-label">Language Code</Form.Label>
          <Form.Control
            type="text"
            name="code"
            value={formData.code}
            onChange={handleChange}
            required
            className="language-input"
            placeholder="e.g., en, hi, fr"
          />
        </Form.Group>

        <Form.Group className="language-form-group">
          <Form.Label className="language-label">Description</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className="language-input textarea"
            placeholder="Brief description of the language..."
          />
        </Form.Group>

        <Form.Group className="language-form-group">
          <Form.Label className="language-label">Flag Image File</Form.Label>
          <Form.Control
            type="file"
            name="flag"
            accept="image/*"
            onChange={handleChange}
            className="language-input"
          />
        </Form.Group>

        <Button
          type="submit"
          disabled={isLoading}
          className={`language-submit-btn ${isLoading ? 'loading' : ''}`}
        >
          {isLoading ? 'Adding Language...' : '➕ Add Language'}
        </Button>
      </Form>
    </Container>
  )
}

export default AddLanguage
