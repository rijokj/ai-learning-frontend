import React from 'react'
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa'

const MCQStep = ({
  question,
  options,
  selectedAnswer,
  handleAnswerSelect,
  isAnswerCorrect,
  explanation,
}) => {
  return (
    <div className="lesson-question mcq">
      <h3>{question}</h3>
      <div className="options-list">
        {options.map((option, index) => (  
          <div
            key={index}
            className={`option ${selectedAnswer === index ? 'selected' : ''}`}
            onClick={() => handleAnswerSelect(option, null, index)}
          >
            <div className="option-marker">
              {String.fromCharCode(65 + index)}
            </div>
            <div className="option-text">{option}</div>
          </div>
        ))}
      </div>
      {selectedAnswer !== undefined && (
        <div
          className={`feedback ${isAnswerCorrect() ? 'correct' : 'incorrect'}`}
        >
          <div className="feedback-icon">
            {isAnswerCorrect() ? <FaCheckCircle /> : <FaTimesCircle />}
          </div>
          <div className="feedback-text">
            <strong>{isAnswerCorrect() ? 'Correct!' : 'Incorrect!'}</strong>
            <p>{explanation}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default MCQStep
