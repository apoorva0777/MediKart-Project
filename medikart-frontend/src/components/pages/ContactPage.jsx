import React, { useState } from "react";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import "./ContactPage.css";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "General Inquiry",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent! Thank you for contacting us.");
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      subject: "General Inquiry",
      message: "",
    });
  };

  return (
    <div className="contact-page">
      <div className="contact-left">
        <h2>Contact Information</h2>
        <p>
          Feel free to contact us anytime!<br></br>
          We’re here to help you with all your healthcare needs.
        </p>
        <div className="contact-info-item">
          <FaPhone className="icon" />
          <span>+1012 3456 789</span>
        </div>
        <div className="contact-info-item">
          <FaEnvelope className="icon" />
          <span>medikart@gmail.com</span>
        </div>
        <div className="contact-info-item">
          <FaMapMarkerAlt className="icon" />
          <span>
            Mall Road, Civil Lines,
            <br />
            Kanpur, Uttar Pradesh 208001, India
          </span>
        </div>
        <div className="social-icons">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
          >
            <FaTwitter />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Linkedin"
          >
            <FaLinkedin />
          </a>
        </div>
      </div>
      <div className="contact-right">
        <form onSubmit={handleSubmit}>
          <div className="name-group">
            <div className="input-groupp">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Apoorva"
                required
              />
            </div>
            <div className="input-groupp">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Shukla"
                required
              />
            </div>
          </div>
          <div className="contact-group">
            <div className="input-groupp">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder=""
                required
              />
            </div>
            <div className="input-groupp">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 012 3456 789"
              />
            </div>
          </div>
          <div className="input-groupp">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Write your message.."
              required
            />
          </div>
          <br/>
          <button type="submit" className="btn-submit">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
