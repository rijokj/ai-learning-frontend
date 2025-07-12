import React from 'react'

const LessonProgress = ({ currentStep, totalSteps }) => {
  const progressPercentage = (currentStep / totalSteps) * 100

  return (
    <div className="lesson-progress">
      <div
        className="progress-fill"
        style={{ width: `${progressPercentage}%` }}
      ></div>
    </div>
  )
}

export default LessonProgress
