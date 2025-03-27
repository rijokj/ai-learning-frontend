import React from 'react'
import CourseCertificate from '../components/CertificateSection/CourseCertificate'
import ProfileCard from '../components/ProfileCard.jsx/ProfileCard'
import "./profile.css"

const Profile = () => {
    const certificates = [
      {
        title: 'Web Development Mastery',
        issuer: 'Coursera',
        link: '/certificates/web-dev.pdf',
      },
      {
        title: 'Advanced React',
        issuer: 'Udemy',
        link: '/certificates/react.pdf',
      },
    ]

    const courses = [
      { title: 'Next.js Essentials', provider: 'Frontend Masters' },
      { title: 'UI/UX Design Basics', provider: 'EdX' },
    ]
  return (
    <div className="profile-page">
      <div className="profile-left">
        <ProfileCard />
      </div>
      <div className="profile-right">
        <CourseCertificate certificates={certificates} courses={courses} />
      </div>
    </div>
  )
}

export default Profile