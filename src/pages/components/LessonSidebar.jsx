import React from 'react'
import {
  FaBookReader,
  FaRegLightbulb,
  FaRegClock,
  FaMedal,
} from 'react-icons/fa'

const LessonSidebar = ({ lessonData, currentStep, setCurrentStep }) => {
  return (
    <div className="lesson-sidebar">
      <div className="lesson-info">
        <h3>Lesson Info</h3>
        <div className="info-item">
          <FaBookReader className="info-icon" />
          <span>
            {lessonData.steps.filter((s) => s.type === 'passage').length}{' '}
            Passages
          </span>
        </div>
        <div className="info-item">
          <FaRegLightbulb className="info-icon" />
          <span>
            {
              lessonData.steps.filter((s) =>
                ['mcq', 'truefalse', 'cloze'].includes(s.type)
              ).length
            }{' '}
            Questions
          </span>
        </div>
        <div className="info-item">
          <FaRegClock className="info-icon" />
          <span>Est. {lessonData.estimatedTime}</span>
        </div>
        <div className="info-item">
          <FaMedal className="info-icon" />
          <span>{lessonData.points} Points</span>
        </div>
      </div>

      <div className="lesson-steps">
        <h3>Steps</h3>
        <ul className="steps-list">
          {lessonData.steps.map((step, index) => (
            <li
              key={index}
              className={`step-item ${currentStep === index ? 'active' : ''} ${
                index < currentStep ? 'completed' : ''
              }`}
              onClick={() => index <= currentStep && setCurrentStep(index)}
            >
              <div className="step-number">{index + 1}</div>
              <div className="step-info">
                <div className="step-type">
                  {step.type === 'passage' && 'Reading'}
                  {step.type === 'mcq' && 'Multiple Choice'}
                  {step.type === 'cloze' && 'Fill in the Blanks'}
                  {step.type === 'truefalse' && 'True or False'}
                  {step.type === 'completion' && 'Complete'}
                </div>
                <div className="step-title">{step.title}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default LessonSidebar
