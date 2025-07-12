import React from 'react'
import { Button } from 'react-bootstrap'

const ActivityList = ({
  activities,
  onRemoveMcq,
  onRemoveCloze,
  onRemoveTf,
}) => {
  return (
    <div className="activity-list mt-3">
      {activities.mcq.map((mcq, i) => (
        <div key={i} className="activity-item">
          <strong>MCQ{i + 1}:</strong> {mcq.question}
          <Button className="remove-btn" onClick={() => onRemoveMcq(i)}>
            <i className="bi bi-trash"></i> Remove
          </Button>
        </div>
      ))}

      {activities.cloze.map((cloze, i) => (
        <div key={i} className="activity-item">
          <strong>Cloze{i + 1}:</strong> {cloze.text || cloze.sentence}
          <Button className="remove-btn" onClick={() => onRemoveCloze(i)}>
            <i className="bi bi-trash"></i> Remove
          </Button>
        </div>
      ))}

      {activities.trueFalse.map((tf, i) => (
        <div key={i} className="activity-item">
          <strong>TrueFalse{i + 1}:</strong> {tf.statement}
          <Button className="remove-btn" onClick={() => onRemoveTf(i)}>
            <i className="bi bi-trash"></i> Remove
          </Button>
        </div>
      ))}
    </div>
  )
}

export default ActivityList
