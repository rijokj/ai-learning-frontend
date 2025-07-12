import React, { useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'

const ClozeModal = ({ show, onHide, onSave }) => {
  const [clozeData, setClozeData] = useState({
    sentence: '',
    correctWords: [],
  })

  const handleSubmit = () => {
    if (
      !clozeData.sentence.includes('____') ||
      clozeData.correctWords.length === 0
    ) {
      alert("Use '____' for blanks and provide correct words.")
      return
    }

    // Transform data to match backend schema
    const transformedData = {
      text: clozeData.sentence, // Changed from 'sentence' to 'text'
      answer: clozeData.correctWords.join(', '), // Convert array to string
    }

    onSave(transformedData)
    onHide()
    setClozeData({ sentence: '', correctWords: [] })
  }

  const handleClose = () => {
    onHide()
    setClozeData({ sentence: '', correctWords: [] })
  }

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>
          <i className="bi bi-file-text me-2"></i>
          Add Cloze Exercise
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3">
          <Form.Label>Sentence (use "____" for blanks)</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={clozeData.sentence}
            onChange={(e) =>
              setClozeData({ ...clozeData, sentence: e.target.value })
            }
            placeholder="Example: The cat is ____ on the mat. It looks very ____."
          />
          <small className="text-muted mt-1 d-block">
            Use four underscores "____" to create blanks in your sentence.
          </small>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Correct Words (comma-separated)</Form.Label>
          <Form.Control
            type="text"
            value={clozeData.correctWords.join(', ')}
            onChange={(e) =>
              setClozeData({
                ...clozeData,
                correctWords: e.target.value.split(',').map((w) => w.trim()),
              })
            }
            placeholder="Example: sitting, comfortable"
          />
          <small className="text-muted mt-1 d-block">
            Enter the correct words separated by commas. Order should match the
            blanks in your sentence.
          </small>
        </Form.Group>

        {clozeData.sentence.includes('____') &&
          clozeData.correctWords.length > 0 && (
            <div
              className="preview-section mt-3 p-3"
              style={{
                background: 'rgba(99, 102, 241, 0.1)',
                borderRadius: '8px',
              }}
            >
              <strong>Preview:</strong>
              <p className="mt-2 mb-0">{clozeData.sentence}</p>
              <p className="mt-1 mb-0">
                <strong>Answers:</strong> {clozeData.correctWords.join(', ')}
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
          Save Cloze
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ClozeModal
