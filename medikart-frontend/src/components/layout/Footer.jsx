import React from 'react'
import { FaLinkedin, FaInstagram, FaEnvelope } from 'react-icons/fa'
import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <p>© {new Date().getFullYear()} MediKart. All rights reserved.<br />
        Developed by Apoorva Shukla</p>
        <div className="social-iconss">
          <a href="https://www.linkedin.com/in/apoorvashukla0702/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <FaLinkedin />
          </a>
          <a href="https://www.instagram.com/apoorva.shukla_/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <FaInstagram />
          </a>
          <a href="mailto:apoorvashukla744@gmail.com" aria-label="Email">
            <FaEnvelope />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
