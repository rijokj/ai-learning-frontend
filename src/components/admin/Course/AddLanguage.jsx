import React, { useState } from 'react'
import axios from 'axios'

const AddLanguage = () => {
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    description: '',
  })

  const [flagFile, setFlagFile] = useState(null)
  const [message, setMessage] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleFileChange = (e) => {
    setFlagFile(e.target.files[0])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const token = localStorage.getItem('token')
      const submissionData = new FormData()
      submissionData.append('name', formData.name)
      submissionData.append('code', formData.code)
      submissionData.append('description', formData.description)
      if (flagFile) {
        submissionData.append('flag', flagFile)
      }

      const response = await axios.post(
        'http://localhost:3007/admin/addlanguage',
        submissionData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      )

      setMessage('Language added successfully!')
      setFormData({ name: '', code: '', description: '' })
      setFlagFile(null)
    } catch (error) {
      console.error('Error adding language:', error)
      setMessage('Failed to add language.')
    }
  }

  return (
    <div style={{ maxWidth: '500px', margin: 'auto' }}>
      <h2>Add New Language</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div style={{ marginBottom: '10px' }}>
          <label>Name:</label>
          <input  
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Code:</label>
          <input
            type="text"
            name="code"
            value={formData.code}
            onChange={handleChange}
            required
            placeholder="e.g., en, hi"
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="3"
            style={{ width: '100%', padding: '8px' }}
          ></textarea>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Flag Image:</label>
          <input
            type="file"
            name="flag"
            onChange={handleFileChange}
            accept="image/*"
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <button type="submit" style={{ padding: '10px 20px' }}>
          Add Language
        </button>
      </form>
    </div>
  )
}

export default AddLanguage
