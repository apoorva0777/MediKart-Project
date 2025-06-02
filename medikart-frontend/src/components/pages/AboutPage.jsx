import React from 'react'
import './AboutPage.css'
import medImage from '../../assets/med.jpg'

const AboutPage = () => {
  return (
    <div className="about-page">
      <div className="about-left">
        <h1>About Us</h1>
        <p>
          Welcome to MediKart, your trusted partner in health and wellness. 
          We are dedicated to providing high-quality medicines and healthcare products 
          to support your well-being.
        </p>
        <h2>Our Mission</h2>
        <p>
          To deliver accessible, affordable, and reliable healthcare solutions with 
          a commitment to excellence and customer satisfaction.
        </p>
        <h2>Our Vision</h2>
        <p>
          To be the leading healthcare provider recognized for innovation, integrity, 
          and compassionate service.
        </p>
        <h2>Our Core Values</h2>
        <ul>
          <li>Integrity and Transparency</li>
          <li>Customer-Centric Approach</li>
          <li>Innovation and Quality</li>
          <li>Community and Sustainability</li>
        </ul>
      </div>
      <div className="about-right">
        <img src={medImage} alt="Health Haven Meds Hub" />
      </div>
    </div>
  )
}

export default AboutPage
