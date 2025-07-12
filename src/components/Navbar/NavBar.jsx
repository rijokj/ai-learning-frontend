import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Navbar, Nav, Form, Button, Container, Dropdown } from 'react-bootstrap'
import { FaSearch, FaUserCircle } from 'react-icons/fa'
import { FiMenu } from 'react-icons/fi'
import logo from '../../assets/images/Learni.png'

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userId, setUserId] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    const storedUserId = localStorage.getItem('userId')
    setIsLoggedIn(!!token)
    setUserId(storedUserId)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    setIsLoggedIn(false)
    navigate('/login')
  }

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Courses', path: '/courses' },
    { name: 'My Learning', path: '/my-learning' },
    { name: 'Resource', path: '/resource' },
  ]

  return (
    <Navbar expand="lg" bg="white" className="shadow-sm">
      <Container fluid>
        {/* Logo */}
        <Navbar.Brand
          as={Link}
          to="/"
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <img
            src={logo}
            alt="Logo"
            style={{ height: '40px', width: '200px', objectFit: 'cover' }}
          />
        </Navbar.Brand>

        {/* Search Bar */}
        <Form className="d-flex ms-auto me-3">
          <Form.Control type="search" placeholder="Search" className="me-2" />
          <Button variant="outline-primary">
            <FaSearch />
          </Button>
        </Form>

        <Navbar.Toggle aria-controls="navbarNav">
          <FiMenu size={28} />
        </Navbar.Toggle>

        <Navbar.Collapse id="navbarNav">
          <Nav className="mx-auto text-center">
            {navLinks.map((link, index) => (
              <Nav.Link
                as={Link}
                to={link.path}
                key={index}
                className="fw-medium"
              >
                {link.name}
              </Nav.Link>
            ))}
          </Nav>

          {/* Authentication Buttons */}
          {!isLoggedIn ? (
            <div className="d-flex">
              <Button
                as={Link}
                to="/login"
                variant="outline-primary"
                className="me-2"
              >
                Login
              </Button>
              <Button as={Link} to="/signup" variant="primary">
                Signup
              </Button>
            </div>
          ) : (
            <Dropdown>
              <Dropdown.Toggle
                variant="secondary"
                className="border-0 bg-transparent"
              >
                <FaUserCircle size={24} style={{ color: '#343a40' }} />
              </Dropdown.Toggle>
              <Dropdown.Menu align="end">
                <Dropdown.Item as={Link} to={`/profile/${userId}`}>
                  My Profile
                </Dropdown.Item>
                <Dropdown.Item className="text-danger" onClick={handleLogout}>
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar
