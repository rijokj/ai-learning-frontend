import React from 'react'

const StepHeader = ({ stepNumber, stepType, stepTitle }) => {
  const getStepTypeLabel = () => {
    switch (stepType) {
      case 'passage':
        return ' Reading'
      case 'mcq':
        return ' Multiple Choice'
      case 'cloze':
        return ' Fill in the Blanks'
      case 'truefalse':
        return ' True or False'
      case 'completion':
        return ' Complete'
      default:
        return ''
    }
  }

  return (
    <div className="step-header">
      <h2>
        Step {stepNumber}:{getStepTypeLabel()}
      </h2>
      <h3>{stepTitle}</h3>
    </div>
  )
}

export default StepHeader
