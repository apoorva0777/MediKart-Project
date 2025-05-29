import React from 'react'
import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <p>© {new Date().getFullYear()} Health Haven Meds Hub. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
