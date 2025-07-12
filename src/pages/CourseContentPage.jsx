import React, { useState } from 'react'
import './CourseContentPage.css'
import {
  FaCalendarAlt,
  FaUser,
  FaPlay,
  FaCheck,
  FaBookmark,
  FaDownload,
  FaInfoCircle,
  FaChevronLeft,
  FaChevronRight,
  FaRegFileAlt,
  FaCode,
  FaRegLightbulb,
  FaRegQuestionCircle,
  FaComments,
  FaHeart,
} from 'react-icons/fa'
import { staticCourse, staticLessons } from './staticCourseData'

const CourseContentPage = () => {
  // Static data usage (replace with API calls for real app)
  const course = staticCourse
  const lessons = course.lessons
    .map((id) => staticLessons.find((l) => l._id === id))
    .filter(Boolean)

  // User info
  const currentDateTime = new Date()
    .toISOString()
    .slice(0, 19)
    .replace('T', ' ')
  const currentUser = 'rijokj'

  // Track the current lesson index
  const [currentLessonIdx, setCurrentLessonIdx] = useState(0)
  const currentLesson = lessons[currentLessonIdx]

  // Navigation
  const navigateLesson = (direction) => {
    if (direction === 'next' && currentLessonIdx < lessons.length - 1) {
      setCurrentLessonIdx(currentLessonIdx + 1)
    } else if (direction === 'prev' && currentLessonIdx > 0) {
      setCurrentLessonIdx(currentLessonIdx - 1)
    }
  }

  // Progress
  const calculateProgress = () => {
    const completed = lessons.filter((lesson) => lesson.completed).length
    return Math.round((completed / lessons.length) * 100)
  }

  // Sidebar toggle
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="page-wrapper">
      <div className="course-content-container">
        {/* Header Bar */}
        <header className="content-header-bar">
          <div className="header-left">
            <div className="course-title-small">{course.title}</div>
          </div>
          <div className="header-right">
            <div className="date-time">
              <FaCalendarAlt className="info-icon" />
              <span>{currentDateTime}</span>
            </div>
            <div className="user-login">
              <FaUser className="info-icon" />
              <span>{currentUser}</span>
            </div>
          </div>
        </header>

        <div className="content-main">
          {/* Sidebar */}
          <div className={`course-sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
            <div className="sidebar-header">
              <h2>Lessons</h2>
              <div className="progress-container">
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${calculateProgress()}%` }}
                  ></div>
                </div>
                <span className="progress-text">
                  {calculateProgress()}% complete
                </span>
              </div>
              <button
                className="sidebar-toggle"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                {sidebarOpen ? <FaChevronLeft /> : <FaChevronRight />}
              </button>
            </div>
            <ul className="sidebar-lessons">
              {lessons.map((lesson, idx) => (
                <li
                  key={lesson._id}
                  className={`sidebar-lesson ${
                    idx === currentLessonIdx ? 'active' : ''
                  }`}
                  onClick={() => setCurrentLessonIdx(idx)}
                >
                  <div className="lesson-check">
                    {lesson.completed ? (
                      <FaCheck />
                    ) : (
                      <div className="check-circle"></div>
                    )}
                  </div>
                  <div className="sidebar-lesson-info">
                    <div className="sidebar-lesson-title">{lesson.title}</div>
                    <div className="sidebar-lesson-meta">
                      {lesson.type === 'video' && (
                        <>
                          <FaPlay className="lesson-type-icon" />{' '}
                          {lesson.duration}
                        </>
                      )}
                      {lesson.type === 'quiz' && (
                        <>
                          <FaRegQuestionCircle className="lesson-type-icon" />{' '}
                          {lesson.questions} questions
                        </>
                      )}
                      {/* Add more types as needed */}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Main Content Area */}
          <div className="lesson-content-area">
            <div className="lesson-header">
              <span className="lesson-name">{currentLesson?.title}</span>
              {/* Actions, etc. */}
            </div>
            {/* Main lesson content */}
            <div className="lesson-notes">
              <h3>Lesson Notes</h3>
              <p>{currentLesson?.content}</p>
              {/* ... */}
            </div>
            {/* Navigation Buttons */}
            <div className="lesson-navigation">
              <button
                className="nav-button prev"
                onClick={() => navigateLesson('prev')}
                disabled={currentLessonIdx === 0}
              >
                <FaChevronLeft /> Previous Lesson
              </button>
              <button
                className="nav-button next"
                onClick={() => navigateLesson('next')}
                disabled={currentLessonIdx === lessons.length - 1}
              >
                Next Lesson <FaChevronRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseContentPage
