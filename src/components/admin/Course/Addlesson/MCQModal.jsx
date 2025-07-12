import React, { useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'

const MCQModal = ({ show, onHide, onSave }) => {
  const [mcqData, setMcqData] = useState({
    question: '',
    choices: ['', '', '', ''],
    answer: '',
  })

  const handleChoiceChange = (index, value) => {
    setMcqData((prev) => {
      const updated = [...prev.choices]
      updated[index] = value
      return { ...prev, choices: updated }
    })
  }

  const handleSubmit = () => {
    if (!mcqData.question || mcqData.choices.some((c) => c.trim() === '')) {
      alert('Please fill in all MCQ fields.')
      return
    }

    // Transform data to match backend schema
    const transformedData = {
      question: mcqData.question,
      options: mcqData.choices, // Changed from 'choices' to 'options'
      answer: mcqData.answer,
    }

    onSave(transformedData)
    onHide()
    setMcqData({ question: '', choices: ['', '', '', ''], answer: '' })
  }

  const handleClose = () => {
    onHide()
    setMcqData({ question: '', choices: ['', '', '', ''], answer: '' })
  }

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>
          <i className="bi bi-list-check me-2"></i>
          Add Multiple Choice Question
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3">
          <Form.Label>Question</Form.Label>
          <Form.Control
            type="text"
            value={mcqData.question}
            onChange={(e) =>
              setMcqData({ ...mcqData, question: e.target.value })
            }
            placeholder="Enter your question here..."
          />
        </Form.Group>

        <div className="row">
          {['A', 'B', 'C', 'D'].map((label, index) => (
            <div key={index} className="col-md-6 mb-3">
              <Form.Group>
                <Form.Label>Option {label}</Form.Label>
                <Form.Control
                  type="text"
                  value={mcqData.choices[index]}
                  onChange={(e) => handleChoiceChange(index, e.target.value)}
                  placeholder={`Enter option ${label}...`}
                />
              </Form.Group>
            </div>
          ))}
        </div>

        <Form.Group className="mb-3">
          <Form.Label>Correct Answer</Form.Label>
          <Form.Control
            as="select"
            value={mcqData.answer}
            onChange={(e) => setMcqData({ ...mcqData, answer: e.target.value })}
          >
            <option value="">Select correct answer</option>
            {mcqData.choices.map((choice, index) => (
              <option key={index} value={choice} disabled={!choice.trim()}>
                {choice.trim()
                  ? `Option ${['A', 'B', 'C', 'D'][index]}: ${choice}`
                  : `Option ${['A', 'B', 'C', 'D'][index]} (empty)`}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          <i className="bi bi-x-circle me-1"></i>
          Cancel
        </Button>
        <Button variant="success" onClick={handleSubmit}>
          <i className="bi bi-check-circle me-1"></i>
          Save MCQ
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default MCQModal
