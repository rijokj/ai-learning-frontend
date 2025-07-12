import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom' // Import useParams for dynamic routing
import axios from 'axios'
import CourseCertificate from '../components/CertificateSection/CourseCertificate'
import ProfileCard from '../components/ProfileCard/ProfileCard'
import EditProfileModal from '../components/ProfileCard/EditProfileModal' // Import modal component
import './profile.css'

const Profile = ({ isSidebarOpen }) => {
  // Add isSidebarOpen as a prop
  const { id } = useParams() // Fetch the dynamic 'id' from the URL
  const navigate = useNavigate() // For logout redirection
  const [profileData, setProfileData] = useState(null) // State for profile data
  const [loading, setLoading] = useState(true) // Loading state
  const [error, setError] = useState(null) // Error state
  const [isEditing, setIsEditing] = useState(false) // State to manage modal visibility

  // Fetch user profile data
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3007/profile/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`, // Pass token for authentication
            },
          }
        )
        console.log('Fetched profile data:', response.data) // Debug log to verify data
        setProfileData(response.data)
      } catch (err) {
        console.error('Error fetching profile data:', err)
        setError('Failed to load profile data. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    fetchProfileData()
  }, [id])

  // Handle profile update
  const handleEditProfile = async (updatedData) => {
    try {
      const response = await axios.put(
        `http://localhost:3007/profile/${id}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      console.log('Profile updated successfully:', response.data)
      setProfileData(response.data) // Update local state with the new profile data
    } catch (error) {
      console.error('Error updating profile:', error)
    } finally {
      setIsEditing(false) // Close the modal
    }
  }

  const handleLogout = () => {
    localStorage.clear()
    navigate('/login') // Redirect to login page
    console.log('Logged out')
  }

  // Handle loading state
  if (loading) {
    return <p>Loading profile...</p>
  }

  // Handle error state
  if (error) {
    return <p>{error}</p>
  }

  return (
    <div
      className={`profile-page ${
        isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'
      }`}
    >
      <div className="profile-left">
        <ProfileCard
          name={`${profileData.firstName || 'First Name'} ${
            profileData.lastName || 'Last Name'
          }`}
          firstName={profileData.firstName}
          lastName={profileData.lastName}
          email={profileData.email || 'Email not available'}
          bio={profileData.bio || 'No bio provided'}
          gender={profileData.gender || 'Not specified'}
          profilePicture={profileData.profilePicture || '/default-image.jpg'} // Provide a default profile picture
          mobileNumber={profileData.mobileNumber}
          onEdit={() => setIsEditing(true)} // Open modal for editing
          onLogout={handleLogout} // Logout functionality
        />
      </div>
      <div className="profile-right">
        <CourseCertificate
          certificates={profileData.certificates || []} // Default to empty array
          courses={profileData.enrolledCourses || []} // Default to empty array
        />
      </div>

      {/* Render modal only if editing */}
      {isEditing && (
        <EditProfileModal
          user={profileData} // Pass current profile data to modal
          onClose={() => setIsEditing(false)} // Close the modal
          onSubmit={handleEditProfile} // Handle form submission
        />
      )}
    </div>
  )
}

export default Profile
