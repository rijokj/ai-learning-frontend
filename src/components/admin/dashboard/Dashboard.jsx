import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  BarController,
  LineController,
} from 'chart.js'

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  BarController,
  LineController
)

// The main dashboard component, now the default export.
export default function Dashboard({
  // Default props with mock data
  totalStudentsRegistered = 1247,
  totalStudentsEnrolled = 892,
  totalStudentsCompleted = 634,
  studentRegistrationsPerMonth = [
    { _id: '2024-01', registrationCount: 45 },
    { _id: '2024-02', registrationCount: 62 },
    { _id: '2024-03', registrationCount: 38 },
    { _id: '2024-04', registrationCount: 71 },
    { _id: '2024-05', registrationCount: 55 },
    { _id: '2024-06', registrationCount: 89 },
  ],
  courseEnrollmentsPerMonth = [
    { _id: '2024-01', enrollmentCount: 32 },
    { _id: '2024-02', enrollmentCount: 48 },
    { _id: '2024-03', enrollmentCount: 29 },
    { _id: '2024-04', enrollmentCount: 56 },
    { _id: '2024-05', enrollmentCount: 43 },
    { _id: '2024-06', enrollmentCount: 67 },
  ],
  recentEnrollments = [
    {
      id: 1,
      studentName: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      courseName: 'React Advanced Development',
      courseCategory: 'Web Development',
      enrollmentDate: '2024-06-15T10:30:00Z',
      coursePrice: 299,
      paymentStatus: 'paid',
      avatar: 'SJ',
    },
    {
      id: 2,
      studentName: 'Michael Chen',
      email: 'michael.chen@email.com',
      courseName: 'Data Science with Python',
      courseCategory: 'Data Science',
      enrollmentDate: '2024-06-15T09:15:00Z',
      coursePrice: 399,
      paymentStatus: 'paid',
      avatar: 'MC',
    },
    {
      id: 3,
      studentName: 'Emily Rodriguez',
      email: 'emily.r@email.com',
      courseName: 'UI/UX Design Fundamentals',
      courseCategory: 'Design',
      enrollmentDate: '2024-06-14T16:45:00Z',
      coursePrice: 249,
      paymentStatus: 'pending',
      avatar: 'ER',
    },
  ],
}) {
  const [isLoading, setIsLoading] = React.useState(true)
  const registrationChartRef = React.useRef(null)
  const enrollmentChartRef = React.useRef(null)
  const registrationChartInstance = React.useRef(null)
  const enrollmentChartInstance = React.useRef(null)

  // Formats a date string like '2024-01' to 'Jan 2024'
  const formatMonthLabel = (monthId) => {
    const [year, month] = monthId.split('-')
    const date = new Date(year, month - 1)
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
  }

  // Effect to determine if the component is loading
  React.useEffect(() => {
    const hasRegData =
      studentRegistrationsPerMonth && studentRegistrationsPerMonth.length > 0
    const hasEnrollData =
      courseEnrollmentsPerMonth && courseEnrollmentsPerMonth.length > 0
    if (hasRegData && hasEnrollData) {
      // Use a timeout to prevent flicker and show loading state
      const timer = setTimeout(() => setIsLoading(false), 500)
      return () => clearTimeout(timer)
    }
  }, [studentRegistrationsPerMonth, courseEnrollmentsPerMonth])

  // Effect hook to create and manage charts only when not loading
  React.useEffect(() => {
    if (isLoading) {
      return // Don't do anything if still loading
    }

    // Destroy existing chart instances to prevent memory leaks
    if (registrationChartInstance.current) {
      registrationChartInstance.current.destroy()
    }
    if (enrollmentChartInstance.current) {
      enrollmentChartInstance.current.destroy()
    }

    const registrationLabels = studentRegistrationsPerMonth.map((data) =>
      formatMonthLabel(data._id)
    )
    const registrationValues = studentRegistrationsPerMonth.map(
      (data) => data.registrationCount
    )
    const enrollmentLabels = courseEnrollmentsPerMonth.map((data) =>
      formatMonthLabel(data._id)
    )
    const enrollmentValues = courseEnrollmentsPerMonth.map(
      (data) => data.enrollmentCount
    )

    const commonOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
          labels: {
            color: 'rgba(226, 232, 240, 0.8)',
            font: { size: 12, weight: '500' },
          },
        },
        tooltip: {
          backgroundColor: 'rgba(15, 23, 42, 0.9)',
          titleColor: '#f1f5f9',
          bodyColor: 'rgba(226, 232, 240, 0.9)',
          borderColor: 'rgba(148, 163, 184, 0.2)',
          borderWidth: 1,
          padding: 12,
          cornerRadius: 8,
        },
      },
      scales: {
        x: {
          ticks: { color: 'rgba(148, 163, 184, 0.7)', font: { weight: '500' } },
          grid: { display: false },
          border: { color: 'rgba(148, 163, 184, 0.2)' },
        },
        y: {
          beginAtZero: true,
          ticks: {
            color: 'rgba(148, 163, 184, 0.7)',
            callback: (value) => (Number.isInteger(value) ? value : ''),
          },
          grid: { color: 'rgba(148, 163, 184, 0.1)', drawBorder: false },
          border: { color: 'rgba(148, 163, 184, 0.2)' },
        },
      },
    }

    if (registrationChartRef.current) {
      const regCtx = registrationChartRef.current.getContext('2d')
      registrationChartInstance.current = new ChartJS(regCtx, {
        type: 'bar',
        data: {
          labels: registrationLabels,
          datasets: [
            {
              label: 'Student Registrations',
              data: registrationValues,
              backgroundColor: 'rgba(34, 197, 94, 0.5)',
              borderColor: 'rgba(34, 197, 94, 1)',
              borderWidth: 2,
              borderRadius: 6,
              borderSkipped: false,
            },
          ],
        },
        options: {
          ...commonOptions,
          plugins: {
            ...commonOptions.plugins,
            tooltip: {
              ...commonOptions.plugins.tooltip,
              callbacks: {
                label: (context) => ` Registrations: ${context.parsed.y}`,
              },
            },
          },
        },
      })
    }

    if (enrollmentChartRef.current) {
      const enrollCtx = enrollmentChartRef.current.getContext('2d')
      enrollmentChartInstance.current = new ChartJS(enrollCtx, {
        type: 'line',
        data: {
          labels: enrollmentLabels,
          datasets: [
            {
              label: 'Course Enrollments',
              data: enrollmentValues,
              fill: true,
              backgroundColor: 'rgba(99, 102, 241, 0.2)',
              borderColor: 'rgba(99, 102, 241, 1)',
              borderWidth: 3,
              tension: 0.4,
              pointBackgroundColor: 'rgba(99, 102, 241, 1)',
              pointBorderColor: '#1e293b',
              pointBorderWidth: 2,
              pointRadius: 5,
              pointHoverRadius: 8,
            },
          ],
        },
        options: {
          ...commonOptions,
          plugins: {
            ...commonOptions.plugins,
            tooltip: {
              ...commonOptions.plugins.tooltip,
              callbacks: {
                label: (context) => ` Enrollments: ${context.parsed.y}`,
              },
            },
          },
        },
      })
    }

    return () => {
      if (registrationChartInstance.current)
        registrationChartInstance.current.destroy()
      if (enrollmentChartInstance.current)
        enrollmentChartInstance.current.destroy()
    }
  }, [isLoading, studentRegistrationsPerMonth, courseEnrollmentsPerMonth]) // Rerun when loading is done

  const calculateRate = (numerator, denominator) => {
    if (denominator === 0) return 0
    return ((numerator / denominator) * 100).toFixed(1)
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  const getStatusClass = (status) => {
    const statusMap = { paid: 'status-paid', pending: 'status-pending' }
    return statusMap[status] || 'status-other'
  }

  const getCategoryColor = (category) => {
    const colors = {
      'Web Development': 'rgba(59, 130, 246, 0.8)',
      'Data Science': 'rgba(34, 197, 94, 0.8)',
      Design: 'rgba(236, 72, 153, 0.8)',
      'AI/ML': 'rgba(249, 115, 22, 0.8)',
      Programming: 'rgba(139, 92, 246, 0.8)',
    }
    return colors[category] || '#6c757d'
  }

  const totalRegistrations = studentRegistrationsPerMonth.reduce(
    (sum, data) => sum + data.registrationCount,
    0
  )
  const totalEnrollments = courseEnrollmentsPerMonth.reduce(
    (sum, data) => sum + data.enrollmentCount,
    0
  )

  return (
    <>
      <style>{`
        /* --- Base & Layout --- */
        .dashboard-container {
          background-color: #111827; /* Dark background */
          padding: 2rem;
          font-family: 'Inter', sans-serif;
        }
        .analytics-card {
          max-width: 1400px;
          margin: 0 auto;
          background: rgba(30, 41, 59, 0.6);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(148, 163, 184, 0.2);
          border-radius: 24px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
          overflow: hidden;
        }
        .main-content {
          padding: 2rem;
        }
        .layout-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }

        .charts-section, .enrollments-section {
          grid-column: span 1;
        }
        
        .charts-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 2rem;
        }

        @media (min-width: 768px) {
            .charts-grid {
                grid-template-columns: repeat(2, 1fr);
            }
        }

        /* --- Header --- */
        .analytics-header {
          padding: 2rem;
          background: rgba(17, 24, 39, 0.5);
        }
        .header-title {
          font-size: 1.75rem;
          font-weight: 700;
          color: #f1f5f9;
          margin: 0;
        }
        .header-subtitle {
          font-size: 1rem;
          color: rgba(226, 232, 240, 0.7);
          margin: 0.25rem 0 0 0;
        }

        /* --- Stats Section --- */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1.5rem;
          padding: 2rem;
          border-bottom: 1px solid rgba(148, 163, 184, 0.2);
        }
        .stat-card {
          background: rgba(17, 24, 39, 0.6);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(148, 163, 184, 0.1);
          border-radius: 16px;
          padding: 1.5rem;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }
        .stat-card:hover {
          transform: translateY(-4px);
          background: rgba(30, 41, 59, 0.7);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
        }
        .stat-icon {
          font-size: 2.5rem;
          color: #93c5fd;
        }
        .stat-info {
          display: flex;
          flex-direction: column;
        }
        .stat-number {
          font-size: 2rem;
          font-weight: 700;
          color: #f1f5f9;
        }
        .stat-label {
          font-size: 0.875rem;
          color: rgba(226, 232, 240, 0.7);
        }

        /* --- Chart Card --- */
        .chart-card {
          background: rgba(15, 23, 42, 0.4);
          border: 1px solid rgba(148, 163, 184, 0.2);
          border-radius: 16px;
          padding: 1.5rem;
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        .chart-title {
          color: #f1f5f9;
          font-size: 1.125rem;
          font-weight: 600;
          margin-bottom: 0.25rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .chart-subtitle {
          color: rgba(226, 232, 240, 0.6);
          font-size: 0.875rem;
          margin-bottom: 1.5rem;
        }
        .chart-container {
          position: relative;
          flex-grow: 1;
          min-height: 300px;
        }
        .total-badge {
          background: rgba(99, 102, 241, 0.3);
          color: #e0e7ff;
          padding: 0.25rem 0.75rem;
          border-radius: 1rem;
          font-size: 0.75rem;
          font-weight: 600;
        }
        .registration-badge {
          background: rgba(34, 197, 94, 0.3);
          color: #dcfce7;
        }

        /* --- Recent Enrollments List --- */
        .recent-enrollments-list {
          max-height: 520px;
          overflow-y: auto;
          padding-right: 0.5rem;
        }
        .enrollment-item {
          display: flex;
          gap: 1rem;
          padding: 1rem;
          border-bottom: 1px solid rgba(148, 163, 184, 0.1);
          transition: background-color 0.2s ease;
        }
        .enrollment-item:last-child {
          border-bottom: none;
        }
        .enrollment-item:hover {
          background-color: rgba(99, 102, 241, 0.1);
          border-radius: 8px;
        }
        .student-avatar {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: linear-gradient(135deg, #4f46e5, #7c3aed);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          flex-shrink: 0;
        }
        .enrollment-details {
          flex-grow: 1;
        }
        .student-name {
          color: #f1f5f9;
          font-weight: 600;
          margin-bottom: 0.1rem;
        }
        .student-email {
          color: rgba(226, 232, 240, 0.6);
          font-size: 0.875rem;
        }
        .course-info {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-top: 0.75rem;
        }
        .course-name {
          color: rgba(226, 232, 240, 0.9);
          font-weight: 500;
          font-size: 0.9rem;
        }
        .course-category {
          display: inline-block;
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 500;
          color: white;
          margin-bottom: 0.25rem;
        }
        .enrollment-meta {
          text-align: right;
        }
        .enrollment-date {
          font-size: 0.75rem;
          color: rgba(226, 232, 240, 0.5);
          margin-bottom: 0.25rem;
        }
        .status-badge {
          display: inline-block;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          color: #fff;
          text-transform: capitalize;
        }
        .status-paid {
          background: rgba(34, 197, 94, 0.3);
          color: #a7f3d0;
          border: 1px solid rgba(34, 197, 94, 0.4);
        }
        .status-pending {
          background: rgba(245, 158, 11, 0.3);
          color: #fef08a;
          border: 1px solid rgba(245, 158, 11, 0.4);
        }
        .no-enrollments {
            text-align: center;
            margin-top: 2rem;
        }

        /* --- Custom Scrollbar --- */
        .recent-enrollments-list::-webkit-scrollbar {
          width: 6px;
        }
        .recent-enrollments-list::-webkit-scrollbar-track {
          background: transparent;
        }
        .recent-enrollments-list::-webkit-scrollbar-thumb {
          background: #4f46e5;
          border-radius: 10px;
        }
        .recent-enrollments-list::-webkit-scrollbar-thumb:hover {
          background: #6366f1;
        }

        /* --- Loading State --- */
        .loading-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background-color: #111827;
        }
        .spinner {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          border: 5px solid rgba(148, 163, 184, 0.2);
          border-top-color: #6366f1;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>

      {isLoading ? (
        <div className="loading-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="dashboard-container">
          <div className="analytics-card">
            <header className="analytics-header">
              <h2 className="header-title">Student Analytics Dashboard</h2>
              <p className="header-subtitle">
                Overview of student engagement and course performance
              </p>
            </header>

            <section className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">👥</div>
                <div className="stat-info">
                  <span className="stat-number">
                    {totalStudentsRegistered.toLocaleString()}
                  </span>
                  <span className="stat-label">Registered</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">🎓</div>
                <div className="stat-info">
                  <span className="stat-number">
                    {totalStudentsEnrolled.toLocaleString()}
                  </span>
                  <span className="stat-label">
                    Enrolled (
                    {calculateRate(
                      totalStudentsEnrolled,
                      totalStudentsRegistered
                    )}
                    %)
                  </span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">🏆</div>
                <div className="stat-info">
                  <span className="stat-number">
                    {totalStudentsCompleted.toLocaleString()}
                  </span>
                  <span className="stat-label">
                    Completed (
                    {calculateRate(
                      totalStudentsCompleted,
                      totalStudentsEnrolled
                    )}
                    %)
                  </span>
                </div>
              </div>
            </section>

            <main className="main-content">
              <div className="layout-grid">
                <div className="charts-section">
                  <div className="charts-grid">
                    <div className="chart-card">
                      <h3 className="chart-title">
                        Monthly Registrations{' '}
                        <span className="total-badge registration-badge">
                          {totalRegistrations}
                        </span>
                      </h3>
                      <p className="chart-subtitle">
                        New student sign-ups per month
                      </p>
                      <div className="chart-container">
                        <canvas ref={registrationChartRef}></canvas>
                      </div>
                    </div>
                    <div className="chart-card">
                      <h3 className="chart-title">
                        Monthly Enrollments{' '}
                        <span className="total-badge">{totalEnrollments}</span>
                      </h3>
                      <p className="chart-subtitle">
                        Course enrollments per month
                      </p>
                      <div className="chart-container">
                        <canvas ref={enrollmentChartRef}></canvas>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="enrollments-section">
                  <div className="chart-card">
                    <h3 className="chart-title">Recent Enrollments</h3>
                    <p className="chart-subtitle">
                      Latest student course sign-ups
                    </p>
                    <div className="recent-enrollments-list">
                      {recentEnrollments.map((enrollment) => (
                        <div key={enrollment.id} className="enrollment-item">
                          <div className="student-avatar">
                            {enrollment.avatar}
                          </div>
                          <div className="enrollment-details">
                            <div className="student-name">
                              {enrollment.studentName}
                            </div>
                            <div className="student-email">
                              {enrollment.email}
                            </div>
                            <div className="course-info">
                              <div>
                                <div
                                  className="course-category"
                                  style={{
                                    backgroundColor: getCategoryColor(
                                      enrollment.courseCategory
                                    ),
                                  }}
                                >
                                  {enrollment.courseCategory}
                                </div>
                                <div className="course-name">
                                  {enrollment.courseName}
                                </div>
                              </div>
                              <div className="enrollment-meta">
                                <div className="enrollment-date">
                                  {formatDate(enrollment.enrollmentDate)}
                                </div>
                                <div
                                  className={`${getStatusClass(
                                    enrollment.paymentStatus
                                  )} status-badge`}
                                >
                                  {enrollment.paymentStatus}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                      {recentEnrollments.length === 0 && (
                        <p className="chart-subtitle no-enrollments">
                          No recent enrollments
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      )}
    </>
  )
}
