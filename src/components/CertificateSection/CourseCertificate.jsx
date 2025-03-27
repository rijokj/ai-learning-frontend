import React from 'react'
import './CourseCertificate.css' // CSS for styling

const CourseCertificate = ({ certificates, courses }) => {
  return (
    <div className="certificates-courses">
      {/* Certificates Section */}
      <div className="certificates-section">
        <h3>Certificates</h3>
        <ul>
          {certificates.map((certificate, index) => (
            <li key={index} className="certificate-item">
              <p>
                <strong>{certificate.title}</strong> <br />
                {certificate.issuer}
              </p>
              <a
                href={certificate.link}
                target="_blank"
                rel="noopener noreferrer"
                className="download-btn"
              >
                Download
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Courses Section */}
      <div className="courses-section">
        <h3>Courses</h3>
        <ul>
          {courses.map((course, index) => (
            <li key={index} className="course-item">
              <p>
                <strong>{course.title}</strong> <br />
                {course.provider}
              </p>
              <button
                className="view-btn"
                onClick={() => alert(`Viewing details for ${course.title}`)}
              >
                View Details
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default CourseCertificate
