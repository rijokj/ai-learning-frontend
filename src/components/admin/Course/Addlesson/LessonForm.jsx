import React from 'react'
import { Form } from 'react-bootstrap'

const LessonForm = ({ formData, handleChange }) => {
  return (
    <Form>
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Level</Form.Label>
        <Form.Control
          as="select"
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
        <Form.Label>Passage</Form.Label>
        <Form.Control
          as="textarea"
          name="passage"
          rows={3}
          value={formData.passage}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Translation (Optional)</Form.Label>
        <Form.Control
          name="translation"
          value={formData.translation}
          onChange={handleChange}
        />
      </Form.Group>
    </Form>
  )
}

export default LessonForm
