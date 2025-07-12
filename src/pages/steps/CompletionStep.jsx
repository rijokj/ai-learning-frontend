import React from 'react'
import { FaMedal } from 'react-icons/fa'

const CompletionStep = ({ title, content, scoreDetails, timeSpent }) => {
  return (
    <div className="lesson-completion">
      <div className="completion-icon">
        <FaMedal />
      </div>
      <h2>{title}</h2>
      <p className="completion-message">{content}</p>
      <div className="completion-stats">
        <div className="stat-item">
          <div className="stat-value">{scoreDetails.percentage}%</div>
          <div className="stat-label">Score</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">
            {scoreDetails.correctCount}/{scoreDetails.totalCount}
          </div>
          <div className="stat-label">Correct Answers</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">{timeSpent}</div>
          <div className="stat-label">Time Spent</div>
        </div>
      </div>
      <button className="next-lesson-btn">Continue to Next Lesson</button>
    </div>
  )
}

export default CompletionStep
