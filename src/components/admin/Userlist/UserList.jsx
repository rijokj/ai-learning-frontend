import React, { useState, useEffect, useRef } from 'react'
import './UserList.css'

const UserList = () => {
  const [dropdownOpen, setDropdownOpen] = useState(null)
  const dropdownRefs = useRef([]) // Array of refs for each dropdown

  const users = [
    { name: 'Ben John', email: 'bentenjohn3218676@gmail.com', mobile: '9656734478', status: 'Active' },
    { name: 'Rijo KJ', email: 'rijokj199@gmail.com', mobile: '9846100724', status: 'Active' },
  ]

  const toggleDropdown = (index) => {
    setDropdownOpen(dropdownOpen === index ? null : index)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownOpen !== null && dropdownRefs.current[dropdownOpen] && !dropdownRefs.current[dropdownOpen].contains(event.target)) {
        setDropdownOpen(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [dropdownOpen])

  return (
    <div className="users-list">
      <h2>Users List</h2>
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
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.mobile}</td>
              <td>{user.status}</td>
              <td className="actions-column" ref={(el) => (dropdownRefs.current[index] = el)}>
                <button className="action-btn" onClick={() => toggleDropdown(index)}>...</button>
                {dropdownOpen === index && (
                  <div className="dropdown-menu">
                    <button className="dropdown-item">Edit</button>
                    <button className="dropdown-item">Block</button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserList
