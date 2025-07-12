import React, { useState } from 'react'
import { Container, Form, Button, Alert } from 'react-bootstrap'
import axios from 'axios'
import './AddLesson.css'

const AddLesson = ({ closeForm }) => {
  const [formData, setFormData] = useState({
    title: '',
    level: 'Beginner',
    passage: '',
    translation: '',
    activities: {
      mcq: [],
      cloze: [],
      truefalse: [],
    },
  })

  const [message, setMessage] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleActivityChange = (type, index, field, value) => {
    setFormData((prev) => {
      const updated = [...prev.activities[type]]

      // Ensure the activity object exists
      if (!updated[index]) {
        updated[index] = {}
      }

      // Handle special case for MCQ options
      if (field === 'options' && type === 'mcq') {
        updated[index][field] = value
          .split(',')
          .map((opt) => opt.trim())
          .filter((opt) => opt.length > 0)
      } else {
        updated[index][field] = value
      }

      return {
        ...prev,
        activities: { ...prev.activities, [type]: updated },
      }
    })
  }

  const handleAddActivity = (type) => {
    let newActivity
    switch (type) {
      case 'mcq':
        // Fixed: Initialize with a proper structure and at least one empty option
        newActivity = { question: '', options: [''], answer: '' }
        break
      case 'cloze':
        newActivity = { text: '', answer: '' }
        break
      case 'truefalse':
        newActivity = { statement: '', answer: true }
        break
      default:
        return
    }

    setFormData((prev) => ({
      ...prev,
      activities: {
        ...prev.activities,
        [type]: [...prev.activities[type], newActivity],
      },
    }))
  }

  const removeActivity = (type, index) => {
    setFormData((prev) => ({
      ...prev,
      activities: {
        ...prev.activities,
        [type]: prev.activities[type].filter((_, i) => i !== index),
      },
    }))
  }

  const validateActivities = () => {
    const { activities } = formData

    // Check MCQ activities
    for (let mcq of activities.mcq) {
      if (!mcq.question || !mcq.question.trim()) {
        return 'MCQ question is required'
      }
      if (!mcq.answer || !mcq.answer.trim()) {
        return 'MCQ answer is required'
      }
      if (!mcq.options || mcq.options.length === 0) {
        return 'MCQ must have at least one option'
      }
      // Check if all options have content
      const validOptions = mcq.options.filter((opt) => opt && opt.trim())
      if (validOptions.length === 0) {
        return 'MCQ must have at least one valid option'
      }
    }

    // Check Cloze activities
    for (let cloze of activities.cloze) {
      if (!cloze.text || !cloze.text.trim()) {
        return 'Cloze text is required'
      }
      if (!cloze.answer || !cloze.answer.trim()) {
        return 'Cloze answer is required'
      }
    }

    // Check True/False activities
    for (let tf of activities.truefalse) {
      if (!tf.statement || !tf.statement.trim()) {
        return 'True/False statement is required'
      }
      if (tf.answer === undefined || tf.answer === null) {
        return 'True/False answer is required'
      }
    }

    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')

    if (!formData.title.trim() || !formData.passage.trim()) {
      setMessage('Title and Passage are required!')
      return
    }

    // Validate activities only if they exist
    if (
      formData.activities.mcq.length > 0 ||
      formData.activities.cloze.length > 0 ||
      formData.activities.truefalse.length > 0
    ) {
      const activityError = validateActivities()
      if (activityError) {
        setMessage(activityError)
        return
      }
    }

    // Clean up data before sending - Fixed the cleaning logic
    const cleanedData = {
      ...formData,
      title: formData.title.trim(),
      passage: formData.passage.trim(),
      translation: formData.translation.trim(),
      activities: {
        mcq: formData.activities.mcq
          .filter(
            (mcq) =>
              mcq.question &&
              mcq.question.trim() &&
              mcq.answer &&
              mcq.answer.trim()
          )
          .map((mcq) => ({
            ...mcq,
            question: mcq.question.trim(),
            answer: mcq.answer.trim(),
            options: mcq.options
              ? mcq.options
                  .filter((opt) => opt && opt.trim())
                  .map((opt) => opt.trim())
              : [],
          }))
          .filter((mcq) => mcq.options.length > 0), // Ensure at least one option exists
        cloze: formData.activities.cloze
          .filter(
            (cloze) =>
              cloze.text &&
              cloze.text.trim() &&
              cloze.answer &&
              cloze.answer.trim()
          )
          .map((cloze) => ({
            ...cloze,
            text: cloze.text.trim(),
            answer: cloze.answer.trim(),
          })),
        truefalse: formData.activities.truefalse
          .filter(
            (tf) =>
              tf.statement && tf.statement.trim() && tf.answer !== undefined
          )
          .map((tf) => ({
            ...tf,
            statement: tf.statement.trim(),
          })),
      },
    }

    console.log('Sending data:', JSON.stringify(cleanedData, null, 2)) // Debug log

    try {
      const response = await axios.post(
        'http://localhost:3007/admin/addlesson',
        cleanedData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )

      console.log('Response:', response.data) // Debug log
      setMessage('✅ Lesson added successfully!')

      // Reset form
      setFormData({
        title: '',
        level: 'Beginner',
        passage: '',
        translation: '',
        activities: {
          mcq: [],
          cloze: [],
          truefalse: [],
        },
      })

      if (typeof closeForm === 'function') closeForm()
    } catch (error) {
      console.error('Error adding lesson:', error)
      console.error('Error response:', error.response?.data) // More detailed error log
      setMessage(
        error.response?.data?.message ||
          error.response?.data?.details ||
          '❌ Failed to add lesson.'
      )
    }
  }

  return (
    <Container className="lesson-form-container">
      <h2 className="lesson-label">📖 Add New Lesson</h2>
      {message && (
        <Alert
          variant={message.includes('successfully') ? 'success' : 'danger'}
        >
          {message}
        </Alert>
      )}
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label className="lesson-label">Title</Form.Label>
          <Form.Control
            className="lesson-input"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label className="lesson-label">Level</Form.Label>
          <Form.Control
            as="select"
            className="lesson-input"
            name="level"
            value={formData.level}
            onChange={handleChange}
            required
          >
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label className="lesson-label">Passage</Form.Label>
          <Form.Control
            as="textarea"
            className="lesson-input"
            name="passage"
            value={formData.passage}
            onChange={handleChange}
            required
            rows="3"
          />
        </Form.Group>

        <Form.Group>
          <Form.Label className="lesson-label">
            Translation (Optional)
          </Form.Label>
          <Form.Control
            className="lesson-input"
            type="text"
            name="translation"
            value={formData.translation}
            onChange={handleChange}
          />
        </Form.Group>

        <h4 className="lesson-label">Activities</h4>

        {Object.keys(formData.activities).map((type) => (
          <div key={type} className="lesson-activity-section">
            <h5 className="lesson-label">{type.toUpperCase()}</h5>
            {formData.activities[type].map((activity, index) => (
              <div key={index} className="activity-block">
                {type === 'mcq' && (
                  <>
                    <Form.Control
                      className="lesson-input"
                      type="text"
                      placeholder="Question"
                      value={activity.question || ''}
                      onChange={(e) =>
                        handleActivityChange(
                          type,
                          index,
                          'question',
                          e.target.value
                        )
                      }
                    />
                    <Form.Control
                      className="lesson-input"
                      type="text"
                      placeholder="Options (comma separated)"
                      value={
                        activity.options ? activity.options.join(', ') : ''
                      }
                      onChange={(e) =>
                        handleActivityChange(
                          type,
                          index,
                          'options',
                          e.target.value
                        )
                      }
                    />
                    <Form.Control
                      className="lesson-input"
                      type="text"
                      placeholder="Correct Answer"
                      value={activity.answer || ''}
                      onChange={(e) =>
                        handleActivityChange(
                          type,
                          index,
                          'answer',
                          e.target.value
                        )
                      }
                    />
                  </>
                )}

                {type === 'cloze' && (
                  <>
                    <Form.Control
                      className="lesson-input"
                      type="text"
                      placeholder="Text with blank (e.g. He ___ to school.)"
                      value={activity.text || ''}
                      onChange={(e) =>
                        handleActivityChange(
                          type,
                          index,
                          'text',
                          e.target.value
                        )
                      }
                    />
                    <Form.Control
                      className="lesson-input"
                      type="text"
                      placeholder="Correct Answer"
                      value={activity.answer || ''}
                      onChange={(e) =>
                        handleActivityChange(
                          type,
                          index,
                          'answer',
                          e.target.value
                        )
                      }
                    />
                  </>
                )}

                {type === 'truefalse' && (
                  <>
                    <Form.Control
                      className="lesson-input"
                      type="text"
                      placeholder="Statement"
                      value={activity.statement || ''}
                      onChange={(e) =>
                        handleActivityChange(
                          type,
                          index,
                          'statement',
                          e.target.value
                        )
                      }
                    />
                    <Form.Control
                      as="select"
                      className="lesson-input"
                      value={activity.answer ? 'true' : 'false'}
                      onChange={(e) =>
                        handleActivityChange(
                          type,
                          index,
                          'answer',
                          e.target.value === 'true'
                        )
                      }
                    >
                      <option value="true">True</option>
                      <option value="false">False</option>
                    </Form.Control>
                  </>
                )}

                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => removeActivity(type, index)}
                  className="mt-2"
                >
                  Remove
                </Button>
              </div>
            ))}
            <Button
              className="lesson-submit-btn"
              onClick={() => handleAddActivity(type)}
            >
              ➕ Add {type}
            </Button>
          </div>
        ))}

        <Button type="submit" className="lesson-submit-btn">
          ➕ Add Lesson
        </Button>
      </Form>
    </Container>
  )
}

export default AddLesson
