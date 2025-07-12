import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './UserList.css'

const UserList = () => {
  const [users, setUsers] = useState([])
  const [showDropdown, setShowDropdown] = useState({})

  // Fetch users on mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await axios.get(
          'http://localhost:3007/admin/userlist',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        setUsers(response.data)
      } catch (error) {
        console.error('Error fetching users:', error)
      }
    }

    fetchUsers()
  }, [])

  // Toggle dropdown for specific user
  const handleToggle = (userId) => {
    console.log('Toggling dropdown for user:', userId)
    setShowDropdown((prev) => {
      const newState = { ...prev }
      newState[userId] = !newState[userId]
      console.log('New dropdown state:', newState)
      return newState
    })
  }

  return (
    <div className="users-list">
      <div className="users-list-card">
        <div className="users-header">
          <div className="header-content">
            <div className="title-section">
              <div className="title-icon">👥</div>
              <div>
                <h2>Users List</h2>
                <p className="subtitle">Manage all registered users</p>
              </div>
            </div>
          </div>
        </div>

        <div className="table-container">
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Mobile</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>{`${user.firstName} ${user.lastName}`}</td>
                    <td>{user.email}</td>
                    <td>{user.mobileNumber || 'N/A'}</td>
                    <td>
                      <span
                        className={`status-badge ${
                          user.isActive ? 'status-active' : 'status-blocked'
                        }`}
                      >
                        {user.isActive ? 'Active' : 'Blocked'}
                      </span>
                    </td>
                    <td className="actions-column">
                      <div className="dropdown-container">
                        <button
                          type="button"
                          className="action-btn"
                          onClick={() => handleToggle(user._id)}
                        >
                          ⋯
                        </button>

                        {showDropdown[user._id] && (
                          <div className="dropdown-menu">
                            <button type="button" className="dropdown-item">
                              Edit
                            </button>
                            <button type="button" className="dropdown-item">
                              {user.isActive ? 'Block' : 'Unblock'}
                            </button>
                          </div>
                        )}
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

export default UserList
