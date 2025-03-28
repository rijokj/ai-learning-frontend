const CourseCertificate = ({ certificates = [], courses = [] }) => {
  return (
    <div className="certificates-courses">
      {/* Certificates Section */}
      <div className="certificates-section">
        <h3>Certificates</h3>
        {certificates.length > 0 ? (
          <ul>
            {certificates.map((certificate, index) => (
              <li key={index} className="certificate-item">
                <p>
                  <strong>{certificate.title}</strong> <br />
                  {certificate.issuer}
                </p>
                <a
                  href={certificate.certificateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="download-btn"
                >
                  Download
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-data-message">No certificates available.</p> // Show this if no certificates
        )}
      </div>

      {/* Courses Section */}
      <div className="courses-section">
        <h3>Courses</h3>
        {courses.length > 0 ? (
          <ul>
            {courses.map((course, index) => (
              <li key={index} className="course-item">
                <p>
                  <strong>{course.title}</strong> <br />
                  Provider: {course.provider}
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
        ) : (
          <p className="no-data-message">No courses available.</p> // Show this if no courses
        )}
      </div>
    </div>
  )
}

export default CourseCertificate
