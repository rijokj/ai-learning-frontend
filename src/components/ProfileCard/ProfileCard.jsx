import React, { useState } from 'react'
import EditProfileModal from './EditProfileModal'
import { FaPen, FaDoorOpen } from 'react-icons/fa'
import dp from '../../assets/images/profilepicture.jpg'
import './Profile.css'

const ProfileCard = ({
  name,
  email,
  bio,
  gender,
  profilePicture,
  onEdit,
  onLogout,
}) => {
  const [isEditing, setIsEditing] = useState(false)

  const handleEditClick = () => {
    setIsEditing(true) // Open the modal
  }

  const handleModalClose = () => {
    setIsEditing(false) // Close the modal
  }

  const handleModalSubmit = (updatedData) => {
    console.log('Updated Data:', updatedData)
    onEdit(updatedData) // Pass the updated data to the parent
    setIsEditing(false) // Close the modal
  }

  return (
    <div className="profile-card">
      <div className="profile-actions-top">
        <button onClick={handleEditClick} className="top-edit-btn">
          <FaPen />
        </button>
        <button onClick={onLogout} className="top-logout-btn">
          <FaDoorOpen />
        </button>
      </div>
      <img
        className="profile-image"
        src={dp}
        alt={`${name}'s profile`}
      />
      <h2 className="profile-name">{name}</h2>
      <p className="profile-email">{email}</p>
      <p className="profile-bio">{bio || 'No bio provided.'}</p>
      <div className="profile-gender">{gender && <span>{gender}</span>}</div>

      {isEditing && (
        <EditProfileModal
          user={{ name, email, bio, gender }}
          onClose={handleModalClose}
          onSubmit={handleModalSubmit}
        />
      )}
    </div>
  )
}

export default ProfileCard
