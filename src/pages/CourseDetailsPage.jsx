import React, { useState } from 'react'
import './CourseDetailsPage.css'
import {
  FaUsers,
  FaChartLine,
  FaClock,
  FaChalkboardTeacher,
  FaAngleDown,
  FaAngleRight,
  FaCalendarAlt,
  FaUser,
  FaPlay,
} from 'react-icons/fa'

const CourseDetailsPage = ({ course }) => {
  const [isContentExpanded, setIsContentExpanded] = useState(false)

  // Current date and user info
  const currentDateTime = '2025-06-19 07:44:16'
  const currentUser = 'rijokj'

  // Default course data
  const defaultCourse = {
    title: 'Advanced AI Language Model',
    description:
      'Learn how to build and interact with advanced AI language models. This course covers fundamental concepts, practical implementations, and real-world applications.',
    enrolledStudents: 1248,
    level: 'Intermediate',
    duration: '10 weeks',
    imageUrl: 'https://media.graphassets.com/wqXYs0TGRgyFViOk7AfX',
    instructor: 'Dr. Sarah Johnson',
    contents: [
      {
        title: 'Module 1: Introduction to AI Language Learning',
        lessons: [
          'Fundamentals of NLP',
          'History of Language Models',
          'Setting up your environment',
        ],
      },
      {
        title: 'Module 2: Core Concepts',
        lessons: [
          'Tokenization techniques',
          'Embeddings explained',
          'Transfer learning approaches',
        ],
      },
      {
        title: 'Module 3: Building Your First Model',
        lessons: [
          'Data preparation',
          'Training methodologies',
          'Evaluation metrics',
        ],
      },
      {
        title: 'Module 4: Advanced Applications',
        lessons: [
          'Conversational AI',
          'Text generation',
          'Translation systems',
        ],
      },
    ],
  }

  const courseData = course || defaultCourse

  const toggleContentExpand = () => {
    setIsContentExpanded(!isContentExpanded)
  }

  const handleEnrollClick = () => {
    console.log('Enrolling in course:', courseData.title)
    alert('Thank you for enrolling in this course!')
  }

  return (
    <div className="page-wrapper">
      <div className="course-details-container">
        {/* User Info Bar */}
        <div className="user-info-bar">
          <div className="date-time">
            <FaCalendarAlt className="info-icon" />
            <span>{currentDateTime}</span>
          </div>
          <div className="user-login">
            <FaUser className="info-icon" />
            <span>{currentUser}</span>
          </div>
        </div>

        {/* Course Header Section */}
        <div className="course-header">
          {/* Left Side - Course Info */}
          <div className="course-info">
            <h1 className="course-title">{courseData.title}</h1>
            <p className="course-description">{courseData.description}</p>

            {/* Course Highlights Grid */}
            <div className="course-highlights">
              <div className="highlight-item">
                <FaUsers className="highlight-icon" />
                <div className="highlight-content">
                  <div className="highlight-value">
                    {courseData.enrolledStudents.toLocaleString()}
                  </div>
                  <div className="highlight-label">Students</div>
                </div>
              </div>

              <div className="highlight-item">
                <FaChartLine className="highlight-icon" />
                <div className="highlight-content">
                  <div className="highlight-value">{courseData.level}</div>
                  <div className="highlight-label">Level</div>
                </div>
              </div>


             
            </div>

            <button className="enroll-button" onClick={handleEnrollClick}>
              Enroll Now
            </button>
          </div>

          {/* Right Side - Course Image */}
          <div className="course-image-container">
            <img
              src={courseData.imageUrl}
              alt={`${courseData.title} course image`}
              className="course-image"
            />
          </div>
        </div>

        {/* Course Content Section */}
        <div className="course-content-section">
          {/* Content Header - Clickable to expand/collapse */}
          <div className="content-header" onClick={toggleContentExpand}>
            <h2>Course Content</h2>
            <span className="expand-icon">
              {isContentExpanded ? <FaAngleDown /> : <FaAngleRight />}
            </span>
          </div>

          {/* Content Modules - Shows when expanded */}
          {isContentExpanded && (
            <div className="content-modules">
              {courseData.contents.map((module, index) => (
                <div key={index} className="content-module">
                  <h3 className="module-title">
                    <span className="module-number">{index + 1}</span>
                    {module.title}
                  </h3>
                  <ul className="module-lessons">
                    {module.lessons.map((lesson, lessonIndex) => (
                      <li key={lessonIndex} className="lesson-item">
                        <FaPlay className="lesson-icon" />
                        {lesson}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CourseDetailsPage
