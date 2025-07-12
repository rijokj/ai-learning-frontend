import React from 'react'
import { FaPen, FaDoorOpen } from 'react-icons/fa'
import dp from '../../assets/images/profilepicture.jpg'
import './Profile.css'

const ProfileCard = ({
  name,
  firstName,
  lastName,
  email,
  bio,
  gender,
  profilePicture,
  mobileNumber,
  onEdit, // Controlled by the parent
  onLogout, // Passed down for logout functionality
}) => {
  return (
    <div className="profile-card">
      <div className="profile-actions-top">
        {/* Trigger the parent to open modal */}
        <button onClick={onEdit} className="top-edit-btn">
          <FaPen />
        </button>
        <button onClick={onLogout} className="top-logout-btn">
          <FaDoorOpen />
        </button>
      </div>
      <img className="profile-image" src={dp} alt={`${name}'s profile`} />
      <h2 className="profile-name">{name}</h2>
      <p className="profile-email">{email}</p>
      <p className="profile-number">{mobileNumber}</p>
      <p className="profile-bio">{bio || 'No bio provided.'}</p>
      <div className="profile-gender">{gender && <span>{gender}</span>}</div>
    </div>
  )
}

export default ProfileCard
