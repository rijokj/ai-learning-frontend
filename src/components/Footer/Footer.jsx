import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {
  FaInstagram,
  FaLinkedin,
  FaPinterest,
  FaTiktok,
  FaGlobe,
  FaApple,
  FaGooglePlay,
} from 'react-icons/fa'

import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer mt-5">
      <div className="container">
        <div className="row">
          {/* Column 1 - Company */}
          <div className="col-md-3 col-6">
            <h6 className="footer-title">Company</h6>
            <ul className="list-unstyled">
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">Careers</a>
              </li>
              <li>
                <a href="#">Press</a>
              </li>
              <li>
                <a href="#">Blog</a>
              </li>
              <li>
                <a href="#">Affiliate Program</a>
              </li>
              <li>
                <a href="#">Partnerships</a>
              </li>
            </ul>
          </div>

          {/* Column 2 - Community */}
          <div className="col-md-3 col-6">
            <h6 className="footer-title">Community</h6>
            <ul className="list-unstyled">
              <li>
                <a href="#">Team Plans</a>
              </li>
              <li>
                <a href="#">Gift Membership Cards</a>
              </li>
              <li>
                <a href="#">Corporate Gift Cards</a>
              </li>
            </ul>
          </div>

          {/* Column 4 - Mobile Apps */}
          <div className="col-md-3 col-6">
            <h6 className="footer-title">Mobile</h6>
            <a
              href="#"
              className="d-flex align-items-center mb-2 app-store-button"
            >
              <FaApple className="me-2" />
              <div>
                <small className="d-block">Download on the</small>
                <strong>App Store</strong>
              </div>
            </a>
            <a href="#" className="d-flex align-items-center app-store-button">
              <FaGooglePlay className="me-2" />
              <div>
                <small className="d-block">Get it on</small>
                <strong>Google Play</strong>
              </div>
            </a>
          </div>
        </div>

        <hr className="footer-line" />

        {/* Footer Bottom */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
          <p className="text-muted mb-2 mb-md-0">
            © YourWebsite, Inc. 2025 • <a href="#">Help</a> •{' '}
            <a href="#">Privacy</a> • <a href="#">Terms</a> • Your Privacy
            Choices • Notice to IND Residents
          </p>

          {/* Social Icons */}
          <div className="social-icons">
            <FaInstagram className="social-icon" />
            <FaLinkedin className="social-icon" />
            <FaPinterest className="social-icon" />
            <FaTiktok className="social-icon" />
          </div>

          {/* Language Selector */}
          <div className="language-selector">
            <FaGlobe className="globe-icon" />
            <select className="language-dropdown">
              <option>English</option>
              <option>Hindi</option>
              <option>French</option>
            </select>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
