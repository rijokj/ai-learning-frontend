import React, { useState } from 'react'
import { Container, Alert, Button } from 'react-bootstrap'
import LessonForm from './LessonForm'
import ActivityButtons from './ActivityButtons'
import ActivityList from './ActivityList'
import MCQModal from './MCQModal'
import ClozeModal from './ClozeModal'
import TrueFalseModal from './TrueFalseModal'
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
      trueFalse: [], // Keep as trueFalse for frontend consistency
    },
  })

  const [message, setMessage] = useState('')
  const [showMcqModal, setShowMcqModal] = useState(false)
  const [showClozeModal, setShowClozeModal] = useState(false)
  const [showTfModal, setShowTfModal] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const addMcq = (mcqData) => {
    setFormData((prev) => ({
      ...prev,
      activities: {
        ...prev.activities,
        mcq: [...prev.activities.mcq, mcqData],
      },
    }))
  }

  const addCloze = (clozeData) => {
    setFormData((prev) => ({
      ...prev,
      activities: {
        ...prev.activities,
        cloze: [...prev.activities.cloze, clozeData],
      },
    }))
  }

  const addTrueFalse = (tfData) => {
    setFormData((prev) => ({
      ...prev,
      activities: {
        ...prev.activities,
        trueFalse: [...prev.activities.trueFalse, tfData],
      },
    }))
  }

  const handleRemoveMcq = (index) => {
    setFormData((prev) => ({
      ...prev,
      activities: {
        ...prev.activities,
        mcq: prev.activities.mcq.filter((_, i) => i !== index),
      },
    }))
  }

  const handleRemoveCloze = (index) => {
    setFormData((prev) => ({
      ...prev,
      activities: {
        ...prev.activities,
        cloze: prev.activities.cloze.filter((_, i) => i !== index),
      },
    }))
  }

  const handleRemoveTf = (index) => {
    setFormData((prev) => ({
      ...prev,
      activities: {
        ...prev.activities,
        trueFalse: prev.activities.trueFalse.filter((_, i) => i !== index),
      },
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.title || !formData.passage) {
      setMessage('Please fill in title and passage fields.')
      return
    }

    try {
      // Transform data to match backend expectations
      const backendData = {
        ...formData,
        activities: {
          mcq: formData.activities.mcq,
          cloze: formData.activities.cloze,
          truefalse: formData.activities.trueFalse, // Convert trueFalse to truefalse
        },
      }

      console.log(
        'Sending data to backend:',
        JSON.stringify(backendData, null, 2)
      )

      const response = await fetch('http://localhost:3007/admin/addlesson', {
        method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        body: JSON.stringify(backendData),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || 'Failed to create lesson')
      }

      setMessage('Lesson created successfully!')

      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          title: '',
          level: 'Beginner',
          passage: '',
          translation: '',
          activities: {
            mcq: [],
            cloze: [],
            trueFalse: [],
          },
        })
        setMessage('')
      }, 2000)
    } catch (error) {
      console.error('Error creating lesson:', error)
      setMessage(`Error creating lesson: ${error.message}`)
    }
  }

  return (
    <Container className="lesson-form-container">
      <h2 className="lesson-label">
        <i className="bi bi-book"></i> Add New Lesson
      </h2>

      {message && (
        <Alert
          variant={message.includes('successfully') ? 'success' : 'danger'}
        >
          {message}
        </Alert>
      )}

      <LessonForm formData={formData} handleChange={handleChange} />

      <ActivityButtons
        onAddMcq={() => setShowMcqModal(true)}
        onAddCloze={() => setShowClozeModal(true)}
        onAddTrueFalse={() => setShowTfModal(true)}
      />

      <ActivityList
        activities={formData.activities}
        onRemoveMcq={handleRemoveMcq}
        onRemoveCloze={handleRemoveCloze}
        onRemoveTf={handleRemoveTf}
      />

      <div className="submit-section mt-4">
        <Button className="submit-btn" onClick={handleSubmit} size="lg">
          <i className="bi bi-check-circle"></i> Create Lesson
        </Button>
        {closeForm && (
          <Button
            className="cancel-btn ms-3"
            onClick={closeForm}
            variant="secondary"
            size="lg"
          >
            <i className="bi bi-x-circle"></i> Cancel
          </Button>
        )}
      </div>

      <MCQModal
        show={showMcqModal}
        onHide={() => setShowMcqModal(false)}
        onSave={addMcq}
      />

      <ClozeModal
        show={showClozeModal}
        onHide={() => setShowClozeModal(false)}
        onSave={addCloze}
      />

      <TrueFalseModal
        show={showTfModal}
        onHide={() => setShowTfModal(false)}
        onSave={addTrueFalse}
      />
    </Container>
  )
}

export default AddLesson
