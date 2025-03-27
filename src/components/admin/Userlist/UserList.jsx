import React from 'react'
import './UserList.css'

const UserList = () => {
  const users = [
    {
      name: 'Ben John',
      email: 'bentenjohn3218676@gmail.com',
      mobile: '9656734478',
      status: 'Active',
    },
    {
      name: 'Rijo KJ',
      email: 'rijokj199@gmail.com',
      mobile: '9846100724',
      status: 'Active',
    },
  ]

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
              <td>
                <button className="action-btn">...</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserList
