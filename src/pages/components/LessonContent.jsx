import React from 'react'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import StepHeader from './StepHeader'
import PassageStep from '../steps/PassageStep'
import MCQStep from '../steps/MCQStep'
import ClozeStep from '../steps/ClozeStep'
import TrueFalseStep from '../steps/TrueFalseStep'
import CompletionStep from '../steps/CompletionStep'

const LessonContent = ({
  currentStep,
  lessonData,
  userAnswers,
  handleAnswerSelect,
  handleInputChange, // Add this prop
  isAnswerCorrect,
  prevStep,
  nextStep,
  isCurrentStepAnswered,
  calculateScore,
  timeSpent,
  formatTime,
}) => {
  const step = lessonData.steps[currentStep]

  // Render current step based on type
  const renderCurrentStep = () => {
    switch (step.type) {
      case 'passage':
        return <PassageStep content={step.content} />

      case 'mcq':
        return (
          <MCQStep
            question={step.question}
            options={step.options}
            selectedAnswer={userAnswers[currentStep]}
            handleAnswerSelect={handleAnswerSelect}
            isAnswerCorrect={() => isAnswerCorrect(currentStep, null)}
            explanation={step.explanation}
          />
        )

      case 'cloze':
        return (
          <ClozeStep
            question={step.question}
            blanks={step.blanks}
            userAnswers={userAnswers[currentStep] || {}}
            handleAnswerSelect={handleAnswerSelect}
            handleInputChange={handleInputChange} // Pass this down
            isAnswerCorrect={(index) => isAnswerCorrect(currentStep, index)}
            explanation={step.explanation}
          />
        )

      case 'truefalse':
        return (
          <TrueFalseStep
            questions={step.questions} // Pass the array of questions
            userAnswers={userAnswers[currentStep] || {}}
            handleAnswerSelect={handleAnswerSelect}
            isAnswerCorrect={(index) => isAnswerCorrect(currentStep, index)}
            currentStep={currentStep}
          />
        )

      case 'completion':
        return (
          <CompletionStep
            title={step.title}
            content={step.content}
            scoreDetails={calculateScore()}
            timeSpent={formatTime(timeSpent)}
          />
        )

      default:
        return <p>Unknown step type</p>
    }
  }

  return (
    <div className="lesson-content">
      <StepHeader
        stepNumber={currentStep + 1}
        stepType={step.type}
        stepTitle={step.title}
      />

      {renderCurrentStep()}

      {step.type !== 'completion' && (
        <div className="step-navigation">
          <button
            className="nav-button prev"
            onClick={prevStep}
            disabled={currentStep === 0}
          >
            <FaArrowLeft /> Previous
          </button>
          <button
            className="nav-button next"
            onClick={nextStep}
            disabled={!isCurrentStepAnswered()}
          >
            Next <FaArrowRight />
          </button>
        </div>
      )}
    </div>
  )
}

export default LessonContent
