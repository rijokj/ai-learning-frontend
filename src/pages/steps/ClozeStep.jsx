import React from 'react'
import { FaRegLightbulb } from 'react-icons/fa'
import './clozestep.css'

const ClozeStep = ({
  question,
  blanks,
  userAnswers,
  handleAnswerSelect,
  isAnswerCorrect,
  explanation,
}) => {
  return (
    <div className="lesson-question cloze">
      <h3 className="cloze-title">Fill in the blanks</h3>
      <p className="cloze-question">
        {question.split('_______').map((part, index, array) => {
          // If this is the last part, don't add an input field
          if (index === array.length - 1) {
            return (
              <span key={index} className="cloze-text">
                {part}
              </span>
            )
          }

          return (
            <React.Fragment key={index}>
              <span className="cloze-text">{part}</span>
              <input
                type="text"
                value={userAnswers[index] || ''}
                onChange={(e) =>
                  handleAnswerSelect(e.target.value, index, null)
                }
                className={`cloze-input ${
                  userAnswers[index]
                    ? isAnswerCorrect(index)
                      ? 'correct-answer'
                      : 'incorrect-answer'
                    : ''
                }`}
                placeholder={`Answer ${index + 1}`}
              />
            </React.Fragment>
          )
        })}
      </p>

      {/* Show hints with available options */}
      {blanks && blanks.length > 0 && (
        <div className="cloze-hints">
          <h4 className="hints-title">💡 Hints:</h4>
          <div className="hints-grid">
            {blanks.map((blank, index) => (
              <div key={index} className="hint-item">
                <strong>Answer {index + 1}:</strong> Choose from:{' '}
                {blank.options?.join(', ')}
              </div>
            ))}
          </div>
        </div>
      )}

      {userAnswers && Object.keys(userAnswers).length === blanks.length && (
        <div className="feedback">
          <div className="feedback-icon">
            <FaRegLightbulb />
          </div>
          <div className="feedback-text">
            <p>{explanation}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default ClozeStep
