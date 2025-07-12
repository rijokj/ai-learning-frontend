import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './LessonList.css'

const LessonList = () => {
  const [lessons, setLessons] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch lessons from API
  useEffect(() => {
    const fetchLessons = async () => {
      try {
        setLoading(true)
        // Replace with your actual API endpoint
        const response = await fetch('http://localhost:3007/admin/lessonlist')

        if (!response.ok) {
          throw new Error(`Failed to fetch lessons: ${response.status}`)
        }

        const data = await response.json()
        setLessons(data)
        setError(null)
      } catch (err) {
        console.error('Error fetching lessons:', err)
        setError('Failed to load lessons. Please try again later.')

        // Optional: Fallback to sample data in development mode
        if (process.env.NODE_ENV === 'development') {
          setLessons([
            {
              id: 1,
              title: 'React Fundamentals',
              level: 'Beginner',
              activityType: 'MCQ, True/False',
              status: 'Listed',
              duration: '45 min',
              students: 156,
            },
            {
              id: 2,
              title: 'Advanced CSS Animations',
              level: 'Intermediate',
              activityType: 'Cloze, Reorder',
              status: 'Unlisted',
              duration: '60 min',
              students: 89,
            },
            // Keeping two for fallback to save space
          ])
        }
      } finally {
        setLoading(false)
      }
    }

    fetchLessons()
  }, [])

  const handleEdit = (id) => {
    console.log('Edit lesson:', id)
    // Navigate to edit page or open modal
    // You could use useNavigate here: navigate(`/admin/editlesson/${id}`)
  }

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === 'Listed' ? 'Unlisted' : 'Listed'

      // API call to update status
      const response = await fetch(`/api/lessons/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      })

      if (!response.ok) {
        throw new Error(`Failed to update lesson status: ${response.status}`)
      }

      // Update local state to reflect change
      setLessons((prevLessons) =>
        prevLessons.map((lesson) =>
          lesson.id === id ? { ...lesson, status: newStatus } : lesson
        )
      )
    } catch (err) {
      console.error('Error updating lesson status:', err)
      // You could add a toast notification here
    }
  }

  // Loading component
  const LoadingSpinner = () => (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Loading lessons...</p>
    </div>
  )

  // Stats calculation functions
  const getTotalLessons = () => lessons.length

  const getPublishedCount = () =>
    lessons.filter((l) => l.status === 'Listed').length

  const getTotalStudents = () => lessons.reduce((sum, l) => sum + l.students, 0)

  // Empty state component
  const EmptyState = () => (
    <div className="empty-state">
      <div className="empty-icon">📚</div>
      <h3>No Lessons Found</h3>
      <p>Get started by creating your first lesson</p>
      <Link to="/admin/addlesson" className="empty-state-btn">
        Create Lesson
      </Link>
    </div>
  )

  // Error state component
  const ErrorState = ({ message }) => (
    <div className="error-state">
      <div className="error-icon">❌</div>
      <h3>Something went wrong</h3>
      <p>{message}</p>
      <button onClick={() => window.location.reload()} className="retry-btn">
        Retry
      </button>
    </div>
  )

  return (
    <div className="lesson-list-container">
      <div className="lesson-list-card">
        {/* Header Section */}
        <div className="lesson-list-header">
          <div className="header-content">
            <div className="title-section">
              <div className="title-icon">📚</div>
              <div>
                <h1 className="main-title">Lesson Management</h1>
                <p className="subtitle">
                  Manage and organize your course content
                </p>
              </div>
            </div>
            <button className="add-lesson-btn">
              <Link to="/admin/addlesson" className="add-lesson-link">
                <span className="btn-icon">+</span>
                <span className="btn-text">New Lesson</span>
              </Link>
            </button>
          </div>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorState message={error} />
        ) : (
          <>
            {/* Stats Section - Only shown if lessons exist */}
            {lessons.length > 0 && (
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon">📖</div>
                  <div className="stat-content">
                    <div className="stat-number">{getTotalLessons()}</div>
                    <div className="stat-label">Total Lessons</div>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">✅</div>
                  <div className="stat-content">
                    <div className="stat-number">{getPublishedCount()}</div>
                    <div className="stat-label">Published</div>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">👥</div>
                  <div className="stat-content">
                    <div className="stat-number">{getTotalStudents()}</div>
                    <div className="stat-label">Total Students</div>
                  </div>
                </div>
              </div>
            )}

            {/* Table Section */}
            {lessons.length > 0 ? (
              <div className="table-container">
                <div className="table-wrapper">
                  <table className="lessons-table">
                    <thead>
                      <tr>
                        <th>Lesson Details</th>
                        <th>Level</th>
                        <th>Activity Type</th>
                        <th>Duration</th>
                        <th>Students</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {lessons.map((lesson) => (
                        <tr key={lesson.id} className="table-row">
                          <td className="lesson-details-cell">
                            <div className="lesson-info">
                              <div className="lesson-title">{lesson.title}</div>
                              <div className="lesson-id">
                                ID: {lesson.id.toString().padStart(3, '0')}
                              </div>
                            </div>
                          </td>
                          <td>
                            <span
                              className={`level-badge level-${lesson.level.toLowerCase()}`}
                            >
                              {lesson.level}
                            </span>
                          </td>
                          <td className="activity-type">
                            {lesson.activityType}
                          </td>
                          <td className="duration">{lesson.duration}</td>
                          <td className="students-count">{lesson.students}</td>
                          <td>
                            <span
                              className={`status-badge status-${lesson.status.toLowerCase()}`}
                            >
                              {lesson.status}
                            </span>
                          </td>
                          <td className="actions-cell">
                            <div className="action-buttons">
                              <button
                                className="action-btn edit-btn"
                                onClick={() => handleEdit(lesson.id)}
                                title="Edit Lesson"
                              >
                                <span className="btn-icon">✏️</span>
                              </button>
                              <button
                                className={`action-btn toggle-btn ${
                                  lesson.status === 'Listed' ? 'unlist' : 'list'
                                }`}
                                onClick={() =>
                                  handleToggleStatus(lesson.id, lesson.status)
                                }
                                title={
                                  lesson.status === 'Listed'
                                    ? 'Unlist Lesson'
                                    : 'List Lesson'
                                }
                              >
                                <span className="btn-icon">
                                  {lesson.status === 'Listed' ? '🚫' : '✅'}
                                </span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <EmptyState />
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default LessonList
