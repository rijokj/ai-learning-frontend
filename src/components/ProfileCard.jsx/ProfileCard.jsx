import React from 'react'
import './Profile.css'
import dp from '../../assets/images/profilepicture.jpg'
import { FaSignOutAlt, FaPen } from 'react-icons/fa' // Importing logout and edit icons

const ProfileCard = ({ name, email, bio, gender, onEdit, onLogout }) => {
  // Function to determine the gender icon
  const getGenderIcon = (gender) => {
    if (gender === 'Male') return <span className="gender-icon">♂</span> // Male symbol
    if (gender === 'Female') return <span className="gender-icon">♀</span> // Female symbol
    return null
  }

  return (
    <div className="profile-card">
      {/* Top-Left Corner Action Icons */}
      <div className="profile-actions-top">
        <button onClick={onEdit} className="top-edit-btn">
          <FaPen />
        </button>
        <button onClick={onLogout} className="top-logout-btn">
          <FaSignOutAlt />
        </button>
      </div>

      {/* Profile Content */}
      <img className="profile-image" src={dp} alt={`${name}'s profile`} />
      <h2 className="profile-name">rijo</h2>
      <p className="profile-email">rijokjkj</p>
      <p className="profile-bio">kndlksndlksndlksndlksndlksandlksandlkcdcdcdcdcdcdcdcdcdcsand sandlskandlksan dadnsald nsalknd</p>
      <div className="profile-gender">
        {gender && (
          <span>
            {getGenderIcon(gender)} {gender}
          </span>
        )}
      </div>
    </div>
  )
}

export default ProfileCard
