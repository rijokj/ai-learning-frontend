import React, { useState, useEffect } from 'react'
import './CourseLessons.css'
import LessonHeader from './components/LessonHeader'
import LessonProgress from './components/LessonProgress'
import LessonSidebar from './components/LessonSidebar'
import LessonContent from './components/LessonContent'
import { useLessonData } from './hooks/useLessonData'

// Static data for fallback/demo purposes
// const STATIC_LESSON_DATA = {
//   title: 'Introduction to React Hooks',
//   level: 'Intermediate',
//   steps: [
//     {
//       type: 'passage',
//       title: 'Welcome to React Hooks',
//       content:
//         'React Hooks are functions that let you use state and other React features without writing a class. They were introduced in React 16.8 and have revolutionized how we write React components.',
//       description:
//         'Learn the fundamentals of React Hooks and why they are important.',
//     },
//     {
//       type: 'mcq',
//       title: 'React Hooks Quiz',
//       question: 'Which hook is used to add state to functional components?',
//       options: ['useEffect', 'useState', 'useContext', 'useReducer'],
//       correctAnswer: 1,
//       explanation:
//         'useState is the hook that allows you to add state to functional components.',
//     },
//     {
//       type: 'truefalse',
//       title: 'True or False Questions',
//       questions: [
//         {
//           question: 'Hooks can only be used in class components.',
//           correctAnswer: false,
//           explanation:
//             'Hooks can only be used in functional components, not class components.',
//         },
//         {
//           question: 'useEffect can replace componentDidMount lifecycle method.',
//           correctAnswer: true,
//           explanation:
//             'useEffect with an empty dependency array behaves like componentDidMount.',
//         },
//       ],
//     },
//     {
//       type: 'cloze',
//       title: 'Fill in the Blanks',
//       text: 'The _____ hook lets you perform side effects in functional components. It serves the same purpose as _____ and _____ in React classes.',
//       blanks: [
//         {
//           index: 0,
//           correctAnswer: 'useEffect',
//           options: ['useState', 'useEffect', 'useContext'],
//         },
//         {
//           index: 1,
//           correctAnswer: 'componentDidMount',
//           options: ['componentDidMount', 'componentWillMount', 'render'],
//         },
//         {
//           index: 2,
//           correctAnswer: 'componentDidUpdate',
//           options: ['componentDidUpdate', 'componentWillUpdate', 'setState'],
//         },
//       ],
//     },
//     {
//       type: 'completion',
//       title: 'Lesson Complete!',
//       content:
//         'Congratulations! You have completed the Introduction to React Hooks lesson.',
//       description:
//         'You now understand the basics of React Hooks and their usage.',
//     },
//   ],
// }

const CourseLessons = ({ courseId = 'demo-course' }) => {
  // Try to fetch lesson data using custom hook, but provide fallback
  let lessonData, isLoading, error

  try {
    const hookResult = useLessonData(courseId)
    lessonData = hookResult?.lessonData
    isLoading = hookResult?.isLoading || false
    error = hookResult?.error
  } catch (err) {
    console.warn('useLessonData hook failed, using static data:', err)
    lessonData = null
    isLoading = false
    error = null
  }

  // Use static data as fallback if no dynamic data is available
  const finalLessonData = lessonData 

  // State for tracking progress
  const [currentStep, setCurrentStep] = useState(0)
  const [userAnswers, setUserAnswers] = useState({})
  const [isCompleted, setIsCompleted] = useState(false)
  const [score, setScore] = useState(0)
  const [timeSpent, setTimeSpent] = useState(0)
  const [timerActive, setTimerActive] = useState(true)

  // Get current date/time and user info - Updated to use current login
  const currentDateTime = new Date()
    .toISOString()
    .slice(0, 19)
    .replace('T', ' ')
  const currentUser = 'rijokj' // Using the current login from the context

  // Timer effect
  useEffect(() => {
    let interval
    if (timerActive && !isCompleted && finalLessonData) {
      interval = setInterval(() => {
        setTimeSpent((prevTime) => prevTime + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [timerActive, isCompleted, finalLessonData])

  // Format time from seconds to mm:ss
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`
  }

  // Handle user answers for different question types
  const handleAnswerSelect = (answer, questionIndex, optionIndex) => {
    if (!finalLessonData) return

    const newAnswers = { ...userAnswers }
    const stepType = finalLessonData.steps[currentStep].type

    // For MCQs - improved to handle proper option selection
    if (stepType === 'mcq') {
      newAnswers[currentStep] = optionIndex
    }
    // For True/False
    else if (stepType === 'truefalse') {
      if (!newAnswers[currentStep]) newAnswers[currentStep] = {}
      newAnswers[currentStep][questionIndex] = answer
    }
    // For Cloze questions - this will be handled by handleInputChange now
    else if (stepType === 'cloze') {
      if (!newAnswers[currentStep]) newAnswers[currentStep] = {}
      newAnswers[currentStep][questionIndex] = answer
    }

    setUserAnswers(newAnswers)
  }

  // Handle input change for cloze questions - UPDATED for input fields
  const handleInputChange = (questionIndex, value) => {
    if (!finalLessonData) return 

    const newAnswers = { ...userAnswers }
    if (!newAnswers[currentStep]) newAnswers[currentStep] = {}
    newAnswers[currentStep][questionIndex] = value

    setUserAnswers(newAnswers)
  }

  // Calculate score based on user answers
  const calculateScore = () => {
    if (!finalLessonData)
      return { correctCount: 0, totalCount: 0, percentage: 0 }

    let totalCorrect = 0
    let totalQuestions = 0

    finalLessonData.steps.forEach((step, stepIndex) => {
      if (step.type === 'mcq') {
        totalQuestions++
        if (userAnswers[stepIndex] === step.correctAnswer) {
          totalCorrect++
        }
      } else if (step.type === 'truefalse') {
        step.questions?.forEach((q, qIndex) => {
          totalQuestions++
          if (
            userAnswers[stepIndex] &&
            userAnswers[stepIndex][qIndex] === q.correctAnswer
          ) {
            totalCorrect++
          }
        })
      } else if (step.type === 'cloze') {
        step.blanks?.forEach((blank, blankIndex) => {
          totalQuestions++
          if (
            userAnswers[stepIndex] &&
            userAnswers[stepIndex][blankIndex]?.toLowerCase().trim() ===
              blank.correctAnswer.toLowerCase().trim()
          ) {
            totalCorrect++
          }
        })
      }
    })

    return {
      correctCount: totalCorrect,
      totalCount: totalQuestions,
      percentage:
        totalQuestions > 0
          ? Math.round((totalCorrect / totalQuestions) * 100)
          : 0,
    }
  }

  // Navigate to next step
  const nextStep = () => {
    if (!finalLessonData) return

    if (currentStep < finalLessonData.steps.length - 1) {
      setCurrentStep(currentStep + 1)
      window.scrollTo(0, 0)
    } else {
      // Complete the lesson
      setIsCompleted(true)
      setTimerActive(false)
      const scoreResult = calculateScore()
      setScore(scoreResult.percentage)
    }
  }

  // Navigate to previous step
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      window.scrollTo(0, 0)
    }
  }

  // Check if current step is answered (for enabling Next button)
  const isCurrentStepAnswered = () => {
    if (
      !finalLessonData ||
      !finalLessonData.steps ||
      currentStep >= finalLessonData.steps.length
    ) {
      return false
    }

    const step = finalLessonData.steps[currentStep]

    if (step.type === 'passage' || step.type === 'completion') {
      return true
    }

    if (step.type === 'mcq') {
      return userAnswers[currentStep] !== undefined
    }

    if (step.type === 'truefalse') {
      const tfAnswers = userAnswers[currentStep] || {}
      return (
        step.questions?.every((_, index) => tfAnswers[index] !== undefined) ||
        false
      )
    }

    if (step.type === 'cloze') {
      const clozeAnswers = userAnswers[currentStep] || {}
      return (
        step.blanks?.every(
          (_, index) => clozeAnswers[index] && clozeAnswers[index].trim() !== ''
        ) || false
      )
    }

    return false
  }

  // Check if answer is correct for a question
  const isAnswerCorrect = (stepIndex, questionIndex) => {
    if (
      !finalLessonData ||
      !finalLessonData.steps ||
      stepIndex >= finalLessonData.steps.length
    ) {
      return false
    }

    const step = finalLessonData.steps[stepIndex]

    if (step.type === 'mcq') {
      return userAnswers[stepIndex] === step.correctAnswer
    }

    if (step.type === 'truefalse') {
      return (
        userAnswers[stepIndex] &&
        step.questions &&
        step.questions[questionIndex] &&
        userAnswers[stepIndex][questionIndex] ===
          step.questions[questionIndex].correctAnswer
      )
    }

    if (step.type === 'cloze') {
      return (
        userAnswers[stepIndex] &&
        step.blanks &&
        step.blanks[questionIndex] &&
        userAnswers[stepIndex][questionIndex]?.toLowerCase().trim() ===
          step.blanks[questionIndex].correctAnswer.toLowerCase().trim()
      )
    }

    return false
  }

  // Loading state (only show if we're actually loading and don't have static data)
  if (isLoading && !finalLessonData) {
    return (
      <div className="page-wrapper">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading course content...</p>
        </div>
      </div>
    )
  }

  // Error state (only show if there's an error and no fallback data)
  if (error && !finalLessonData) {
    return (
      <div className="page-wrapper">
        <div className="error-container">
          <h2>Error Loading Course</h2>
          <p>{error.message}</p>
          <button
            className="retry-button"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="page-wrapper">
      <div className="course-lesson-container">
        {/* Show a banner if using static data */}
        {!lessonData && (
          <div className="demo-banner">
            <small>📚 Demo Mode: Using static data for preview</small>
          </div>
        )}

        <LessonHeader
          title={finalLessonData.title}
          level={finalLessonData.level}
          timeSpent={formatTime(timeSpent)}
          currentDateTime={currentDateTime}
          currentUser={currentUser}
        />

        <LessonProgress
          currentStep={currentStep}
          totalSteps={finalLessonData.steps.length - 1}
        />

        <div className="lesson-main">
          <LessonSidebar
            lessonData={finalLessonData}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
          />

          <LessonContent  currentStep={currentStep}
            lessonData={finalLessonData}
            userAnswers={userAnswers}
            handleAnswerSelect={handleAnswerSelect}
            handleInputChange={handleInputChange}
            isAnswerCorrect={isAnswerCorrect}
            prevStep={prevStep}
            nextStep={nextStep}
            isCurrentStepAnswered={isCurrentStepAnswered}
            calculateScore={calculateScore}
            timeSpent={timeSpent}
            formatTime={formatTime}
            isCompleted={isCompleted}
            score={score}
          />
        </div>
      </div>
    </div>
  )
}

export default CourseLessons
