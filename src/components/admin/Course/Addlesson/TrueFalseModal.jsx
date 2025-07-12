import React, { useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'

const TrueFalseModal = ({ show, onHide, onSave }) => {
  const [tfData, setTfData] = useState({
    statement: '',
    answer: 'True',
  })

  const handleSubmit = () => {
    if (!tfData.statement.trim()) {
      alert('Please enter a valid statement.')
      return
    }

    // Transform data to match backend schema
    const transformedData = {
      statement: tfData.statement,
      answer: tfData.answer === 'True', // Convert string to boolean
    }

    onSave(transformedData)
    onHide()
    setTfData({ statement: '', answer: 'True' })
  }

  const handleClose = () => {
    onHide()
    setTfData({ statement: '', answer: 'True' })
  }

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>
          <i className="bi bi-question-circle me-2"></i>
          Add True/False Question
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3">
          <Form.Label>Statement</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={tfData.statement}
            onChange={(e) =>
              setTfData({ ...tfData, statement: e.target.value })
            }
            placeholder="Example: The sun rises in the east."
            required
          />
          <small className="text-muted mt-1 d-block">
            Write a clear statement that can be answered with true or false.
          </small>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Correct Answer</Form.Label>
          <div className="d-flex gap-3">
            <Form.Check
              type="radio"
              id="true-option"
              name="answer"
              label="True"
              checked={tfData.answer === 'True'}
              onChange={(e) => setTfData({ ...tfData, answer: 'True' })}
              className="custom-radio"
            />
            <Form.Check
              type="radio"
              id="false-option"
              name="answer"
              label="False"
              checked={tfData.answer === 'False'}
              onChange={(e) => setTfData({ ...tfData, answer: 'False' })}
              className="custom-radio"
            />
          </div>
        </Form.Group>

        {tfData.statement.trim() && (
          <div
            className="preview-section mt-3 p-3"
            style={{
              background: 'rgba(99, 102, 241, 0.1)',
              borderRadius: '8px',
            }}
          >
            <strong>Preview:</strong>
            <p className="mt-2 mb-1">{tfData.statement}</p>
            <p className="mt-1 mb-0">
              <strong>Correct Answer:</strong> {tfData.answer}
            </p>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          <i className="bi bi-x-circle me-1"></i>
          Cancel
        </Button>
        <Button variant="success" onClick={handleSubmit}>
          <i className="bi bi-check-circle me-1"></i>
          Save True/False
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default TrueFalseModal
