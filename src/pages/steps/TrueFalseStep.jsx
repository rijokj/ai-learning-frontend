import React from 'react'
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa'

const TrueFalseStep = ({
  questions, // Array of questions
  userAnswers, // Object with answers keyed by question index
  handleAnswerSelect,
  isAnswerCorrect,
  currentStep,
}) => {
  return (
    <div className="question-container">
      <div className="content-header">
        <div className="step-badge">✓ True or False</div>
        <h1 className="content-title">True or False Questions</h1>
        <p className="content-description">
          Determine if the following statements are true or false
        </p>
      </div>

      <div className="true-false-questions">
        {questions.map((questionObj, questionIndex) => (
          <div key={questionIndex} className="true-false-question">
            <div className="tf-question-header">
              <h3 className="question-number">QUESTION {questionIndex + 1}</h3>
            </div>

            <div className="tf-question-text">
              <p className="question-content">{questionObj.statement}</p>
            </div>

            <div className="true-false-container">
              <div
                className={`true-false-option ${
                  userAnswers[questionIndex] === true ? 'selected' : ''
                } ${
                  userAnswers[questionIndex] === true
                    ? userAnswers[questionIndex] === questionObj.correctAnswer
                      ? 'correct'
                      : 'incorrect'
                    : ''
                }`}
                onClick={() => handleAnswerSelect(true, questionIndex, null)}
              >
                <span className="tf-icon">✓</span>
                True
              </div>

              <div
                className={`true-false-option ${
                  userAnswers[questionIndex] === false ? 'selected' : ''
                } ${
                  userAnswers[questionIndex] === false
                    ? userAnswers[questionIndex] === questionObj.correctAnswer
                      ? 'correct'
                      : 'incorrect'
                    : ''
                }`}
                onClick={() => handleAnswerSelect(false, questionIndex, null)}
              >
                <span className="tf-icon">✗</span>
                False
              </div>
            </div>

            {userAnswers[questionIndex] !== undefined && (
              <div className="tf-explanation">
                <div className="feedback-icon">
                  {userAnswers[questionIndex] === questionObj.correctAnswer ? (
                    <FaCheckCircle style={{ color: '#22c55e' }} />
                  ) : (
                    <FaTimesCircle style={{ color: '#ef4444' }} />
                  )}
                </div>
                <div className="explanation-content">
                  <strong>
                    {userAnswers[questionIndex] === questionObj.correctAnswer
                      ? 'Correct!'
                      : 'Incorrect'}
                  </strong>
                  <p>{questionObj.explanation}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default TrueFalseStep
