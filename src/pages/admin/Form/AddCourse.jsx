import React, { useState, useEffect } from 'react'
import { Container, Form, Button, Alert, Row, Col, Card } from 'react-bootstrap'
import axios from 'axios'
import './AddCourse.css'
import { useSelector, useDispatch } from 'react-redux'
import { fetchCourseData } from '../../../features/courseData/courseDataSlice'
import { FiCamera, FiPlus, FiBookOpen } from 'react-icons/fi'

const AddCourse = ({ closeForm }) => {
  const dispatch = useDispatch()
  const { languages, lessons } = useSelector((state) => state.courseData)

  const [formData, setFormData] = useState({
    title: '',
    language: '',
    level: 'Beginner',
    description: '',
    imageFile: null,
    lessons: [],
  })

  const [message, setMessage] = useState('')
  const [selectedLessons, setSelectedLessons] = useState([])
  const [filteredLessons, setFilteredLessons] = useState([])
  const [previewImage, setPreviewImage] = useState(null)

  useEffect(() => {
    dispatch(fetchCourseData())
  }, [dispatch])

  useEffect(() => {
    if (languages.length > 0 && !formData.language) {
      setFormData((prev) => ({ ...prev, language: languages[0]._id }))
    }
  }, [languages])

  useEffect(() => {
    if (lessons.length > 0) {
      const filtered = lessons.filter(
        (lesson) => lesson.level === formData.level
      )
      setFilteredLessons(filtered)
      setSelectedLessons([])
      setFormData((prev) => ({ ...prev, lessons: [] }))
    }
  }, [formData.level, lessons])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (!file.type.match('image.*')) {
        setMessage('Please select an image file (JPEG, PNG, GIF, etc.)')
        return
      }
      if (file.size > 5 * 1024 * 1024) {
        setMessage('Image size should be less than 5MB')
        return
      }
      setFormData((prev) => ({ ...prev, imageFile: file }))
      const reader = new FileReader()
      reader.onload = (e) => setPreviewImage(e.target.result)
      reader.readAsDataURL(file)
    }
  }

  const handleLessonCheckbox = (lessonId) => {
    const isSelected = selectedLessons.includes(lessonId)
    const updated = isSelected
      ? selectedLessons.filter((id) => id !== lessonId)
      : [...selectedLessons, lessonId]

    setSelectedLessons(updated)
    setFormData((prev) => ({ ...prev, lessons: updated }))
  }

  const resetForm = () => {
    setFormData({
      title: '',
      language: '',
      level: 'Beginner',
      description: '',
      imageFile: null,
      lessons: [],
    })
    setSelectedLessons([])
    setPreviewImage(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.title || !formData.language || !formData.level) {
      setMessage('Title, Language, and Level are required!')
      return
    }

    try {
      const formDataToSend = new FormData()
      formDataToSend.append('title', formData.title)
      formDataToSend.append('language', formData.language)
      formDataToSend.append('level', formData.level)
      formDataToSend.append('description', formData.description)
      formDataToSend.append('lessons', JSON.stringify(formData.lessons))
      if (formData.imageFile)
        formDataToSend.append('courseImage', formData.imageFile)

      await axios.post(
        'http://localhost:3007/admin/addcourse',
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )

      setMessage('Course added successfully!')
      resetForm()
      if (typeof closeForm === 'function') closeForm()
    } catch (error) {
      console.error('Error adding course:', error)
      setMessage(error.response?.data?.message || 'Failed to add course.')
    }
  }

  return (
    <Container className="course-form-container">
      <h2
        className="course-label"
        style={{
          fontSize: '2rem',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <FiBookOpen /> Add New Course
      </h2>
      {message && (
        <Alert
          variant={message.includes('successfully') ? 'success' : 'danger'}
        >
          {message}
        </Alert>
      )}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label className="course-label">Title</Form.Label>
          <Form.Control
            className="course-input"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Enter course title"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="course-label">Language</Form.Label>
          <Form.Select
            className="course-select"
            name="language"
            value={formData.language}
            onChange={handleChange}
            required
          >
            {languages.length === 0 ? (
              <option value="">No languages available</option>
            ) : (
              languages.map((language) => (
                <option key={language._id} value={language._id}>
                  {language.name}
                </option>
              ))
            )}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="course-label">Level</Form.Label>
          <Form.Select
            className="course-select"
            name="level"
            value={formData.level}
            onChange={handleChange}
            required
          >
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="course-label">Description</Form.Label>
          <Form.Control
            as="textarea"
            className="course-input"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            placeholder="Enter course description"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="course-label">Course Image</Form.Label>
          <div className="image-upload-container">
            <div className="image-upload-area">
              <input
                type="file"
                id="course-image"
                accept="image/*"
                onChange={handleImageChange}
                className="file-input"
              />
              <label htmlFor="course-image" className="file-label">
                <div
                  className="upload-icon"
                  style={{ color: '#0ff', fontSize: '2rem' }}
                >
                  <FiCamera />
                </div>
                <div className="upload-text">
                  {previewImage ? 'Change Image' : 'Choose Image'}
                </div>
              </label>
              {previewImage && (
                <div className="image-preview">
                  <img src={previewImage} alt="Preview" />
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => {
                      setPreviewImage(null)
                      setFormData((prev) => ({ ...prev, imageFile: null }))
                    }}
                    className="remove-image-btn"
                  >
                    ✕
                  </Button>
                </div>
              )}
            </div>
            <small className="file-format-text" style={{ color: 'white' }}>
              Supported formats: JPEG, PNG, GIF (Max: 5MB)
            </small>
          </div>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="course-label">
            Select Lessons ({formData.level} Level)
          </Form.Label>
          {filteredLessons.length === 0 ? (
            <div className="no-lessons-message">
              No lessons available for this level
            </div>
          ) : (
            <div className="lessons-checkbox-container">
              <Row>
                {filteredLessons.map((lesson) => (
                  <Col key={lesson._id} md={6} lg={4} className="mb-2">
                    <Card className="lesson-checkbox-card">
                      <Card.Body>
                        <Form.Check
                          type="checkbox"
                          id={`lesson-${lesson._id}`}
                          label={lesson.title}
                          checked={selectedLessons.includes(lesson._id)}
                          onChange={() => handleLessonCheckbox(lesson._id)}
                          className="lesson-checkbox"
                        />
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          )}
        </Form.Group>

        <Button type="submit" className="course-submit-btn">
          <span className="btn-icon">
            <FiPlus style={{ marginRight: '5px' }} />
          </span>
          Add Course
        </Button>
      </Form>
    </Container>
  )
}

export default AddCourse
