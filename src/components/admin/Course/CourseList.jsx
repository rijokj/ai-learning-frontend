import React, { useState } from 'react'
import { Link } from 'react-router-dom' // Import Link
import './CourseList.css' // Import the new CSS file

// --- SVG Icons ---
const BookIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
)
const PlusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    viewBox="0 0 16 16"
  >
    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
  </svg>
)
const EditIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    viewBox="0 0 16 16"
  >
    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
  </svg>
)
const ToggleOnIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    viewBox="0 0 16 16"
  >
    <path d="M5 3a5 5 0 0 0 0 10h6a5 5 0 0 0 0-10H5zm6 9a4 4 0 1 1 0-8 4 4 0 0 1 0 8z" />
  </svg>
)
const ToggleOffIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    viewBox="0 0 16 16"
  >
    <path d="M11 4a4 4 0 0 1 0 8H8a4.992 4.992 0 0 0 2-4 4.992 4.992 0 0 0-2-4h3zm-6 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8zM0 8a5 5 0 0 0 5 5h6a5 5 0 0 0 0-10H5a5 5 0 0 0-5 5z" />
  </svg>
)

const CourseList = () => {
  const [courses, setCourses] = useState([
    {
      _id: '1',
      title: 'Mastering React',
      language: 'English',
      level: 'Intermediate',
      isPublished: true,
    },
    {
      _id: '2',
      title: 'Intro to Python',
      language: 'Spanish',
      level: 'Beginner',
      isPublished: false,
    },
    {
      _id: '3',
      title: 'CSS for Advanced UI',
      language: 'French',
      level: 'Advanced',
      isPublished: true,
    },
    {
      _id: '4',
      title: 'Full-Stack with Node.js',
      language: 'German',
      level: 'Intermediate',
      isPublished: false,
    },
    {
      _id: '5',
      title: 'Data Structures in Java',
      language: 'Italian',
      level: 'Advanced',
      isPublished: true,
    },
  ])

  const handleEdit = (id) => console.log('Edit course:', id)
  const handleToggle = (id) => console.log('Toggle course:', id)
  const handleAddCourse = () => console.log('Add new course')

  return (
    <div className="course-list-container">
      <div className="course-list-card">
        {/* Header Section */}
        <div className="course-header">
          <div className="header-content">
            <div className="title-section">
              <div className="title-icon">
                <BookIcon />
              </div>
              <div>
                <h1 className="main-title">Course Management</h1>
                <p className="subtitle">
                  Manage and organize courses effectively
                </p>
              </div>
            </div>
            {/* Replace with button containing Link component */}
            <button className="add-course-btn">
              <Link to="/admin/addcourse" className="add-course-link">
                <PlusIcon />
                <span>New Course</span>
              </Link>
            </button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">📖</div>
            <div>
              <div className="stat-number">{courses.length}</div>
              <div className="stat-label">Total Courses</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <div>
              <div className="stat-number">
                {courses.filter((c) => c.isPublished).length}
              </div>
              <div className="stat-label">Published</div>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="table-container">
          <div className="table-wrapper">
            <table className="courses-table">
              <thead>
                <tr>
                  <th className="th-title">TITLE</th>
                  <th className="th-language">LANGUAGE</th>
                  <th className="th-level">LEVEL</th>
                  <th className="th-status">STATUS</th>
                  <th className="th-actions">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course, index) => (
                  <tr
                    key={course._id}
                    className={index % 2 === 0 ? 'tr-even' : 'tr-odd'}
                  >
                    <td className="td-title">{course.title}</td>
                    <td className="td-language">{course.language || 'N/A'}</td>
                    <td className="td-level">{course.level || 'N/A'}</td>
                    <td className="td-status">
                      <span
                        className={`status-badge ${
                          course.isPublished
                            ? 'status-published'
                            : 'status-draft'
                        }`}
                      >
                        {course.isPublished ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="td-actions">
                      <div className="action-buttons">
                        <button
                          onClick={() => handleEdit(course._id)}
                          className="action-btn edit-btn"
                          title="Edit Course"
                        >
                          <EditIcon />
                        </button>
                        <button
                          onClick={() => handleToggle(course._id)}
                          className={`action-btn ${
                            course.isPublished
                              ? 'toggle-off-btn'
                              : 'toggle-on-btn'
                          }`}
                          title={
                            course.isPublished
                              ? 'Unpublish Course'
                              : 'Publish Course'
                          }
                        >
                          {course.isPublished ? (
                            <ToggleOffIcon />
                          ) : (
                            <ToggleOnIcon />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseList
