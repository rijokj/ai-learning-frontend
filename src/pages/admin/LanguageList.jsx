import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './LanguageList.css'

// SVG Icons as React components
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

// Loading spinner component
const LoadingSpinner = () => (
  <div className="loading-spinner">
    <div className="spinner"></div>
    <p>Loading languages...</p>
  </div>
)

// Main LanguageList Component
const LanguageList = () => {
  const [languages, setLanguages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  // Fetch languages from API
  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        setLoading(true)
        // Replace with your actual API endpoint
        const response = await fetch('http://localhost:3007/admin/languagelist')

        if (!response.ok) {
          throw new Error(`Failed to fetch languages: ${response.status}`)
        }

        const data = await response.json()
        setLanguages(data)
        setError(null)
      } catch (err) {
        console.error('Error fetching languages:', err)
        setError('Failed to load languages. Please try again later.')

        // Fallback to sample data if in development mode
        if (process.env.NODE_ENV === 'development') {
          setLanguages([
            {
              id: 1,
              name: 'English',
              code: 'EN',
              flag: 'https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg',
            },
            {
              id: 2,
              name: 'Spanish',
              code: 'ES',
              flag: 'https://upload.wikimedia.org/wikipedia/en/9/9a/Flag_of_Spain.svg',
            },
            // More fallback languages...
          ])
        }
      } finally {
        setLoading(false)
      }
    }

    fetchLanguages()
  }, [])

  // Handle edit language
  const handleEditLanguage = (languageId) => {
    navigate(`/admin/editlanguage/${languageId}`)
  }

  // Fallback for broken flag images - fixed to use language.code
  const placeholderImage = (code) =>
    `https://placehold.co/40x24/1e293b/94a3b8?text=${code}`

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div className="language-list-container">
      <div className="language-list-card">
        <div className="language-list-header">
          <div className="header-content">
            <div className="title-section">
              <div className="title-icon">
                <EditIcon />
              </div>
              <div>
                <h1 className="main-title">Language Directory</h1>
                <p className="subtitle">
                  Manage and organize supported languages
                </p>
              </div>
            </div>
            <button className="add-language-btn">
              <Link to="/admin/addlanguage" className="add-language-link">
                <PlusIcon />
                <span>Add Language</span>
              </Link>
            </button>
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="table-container">
          <div className="table-wrapper">
            {languages.length > 0 ? (
              <table className="languages-table">
                <thead>
                  <tr>
                    <th>Language</th>
                    <th>Code</th>
                    <th>Flag</th>
                    <th className="actions-cell">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {languages.map((language) => (
                    <tr key={language.id || language.code}>
                      <td className="language-name">{language.name}</td>
                      <td>
                        <span className="language-code-badge">
                          {language.code}
                        </span>
                      </td>
                      <td>
                        <img
                          src={language.flag}
                          alt={`${language.name} Flag`}
                          className="flag-image"
                          onError={(e) => {
                            e.target.onerror = null
                            e.target.src = placeholderImage(language.code)
                          }}
                        />
                      </td>
                      <td className="actions-cell">
                        <button
                          className="action-btn"
                          onClick={() =>
                            handleEditLanguage(language.id || language.code)
                          }
                        >
                          <EditIcon />
                          <span>Edit</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="no-languages">
                <p>No languages available. Add your first language!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LanguageList
