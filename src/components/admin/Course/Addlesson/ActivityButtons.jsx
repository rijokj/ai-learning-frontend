import React from 'react'
import { Button } from 'react-bootstrap'

const ActivityButtons = ({ onAddMcq, onAddCloze, onAddTrueFalse }) => {
  return (
    <div className="activity-buttons mb-3">
      <Button className="action-btn" onClick={onAddMcq}>
        <i className="bi bi-list-check"></i> Add MCQ
      </Button>{' '}
      <Button className="action-btn" onClick={onAddCloze}>
        <i className="bi bi-file-text"></i> Add Cloze
      </Button>{' '}
      <Button className="action-btn" onClick={onAddTrueFalse}>
        <i className="bi bi-question-circle"></i> Add True/False
      </Button>
    </div>
  )
}

export default ActivityButtons
