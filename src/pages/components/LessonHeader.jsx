import React from 'react'
import { FaCalendarAlt, FaUser, FaRegClock } from 'react-icons/fa'

const LessonHeader = ({
  title,
  level,
  timeSpent,
  currentDateTime,
  currentUser,
}) => {
  return (
    <header className="lesson-header-bar">
      <div className="header-left">
        <div className="lesson-title">{title}</div>
        <div className="lesson-level">
          <span className="level-badge">{level}</span>
        </div>
      </div>
      <div className="header-right">
        <div className="timer">
          <FaRegClock className="timer-icon" />
          <span>{timeSpent}</span>
        </div>
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
  )
}

export default LessonHeader
