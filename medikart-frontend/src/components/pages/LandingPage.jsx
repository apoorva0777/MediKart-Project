import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import './LandingPage.css'
import { AuthContext } from '../../context/AuthContext'

const slides = [
  {
    id: 1,
    title: 'Healthcare Made Simple & Safe',
    description:
      'Your trusted partner for medicines and healthcare needs.',
    imageUrl: '/src/assets/med.jpg',
  },
  {
    id: 2,
    title: 'INNOVATIVE SOLUTIONS FOR YOUR NEEDS',
    description:
      'Praesent commodo cursus magna, vel scelerisque nisl consectetur et.',
    imageUrl: '/src/assets/expert2.jpg',
  },
  {
    id: 3,
    title: 'DEDICATED TO YOUR SUCCESS',
    description:
      'Donec ullamcorper nulla non metus auctor fringilla.',
    imageUrl: '/src/assets/expert3.jpg',
  },
]

const LandingPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const handleShopNow = () => {
    if (user) {
      navigate('/products')
    } else {
      navigate('/login')
    }
  }

  return (
    <div className="landing-page">
      <nav className="landing-nav">
        <ul>
          <li>MediKart</li>
        </ul>
      </nav>
      <div className="landing-content">
        <div className="text-section">
          <h1>{slides[currentSlide].title}</h1>
          <p>{slides[currentSlide].description}</p>
          <button className="btn-learn-more" onClick={handleShopNow}>
            SHOP NOW
          </button>
        </div>
        <div className="image-section">
          <button className="arrow left-arrow" onClick={prevSlide}></button>
          <img src={slides[currentSlide].imageUrl} alt={slides[currentSlide].title} />
          <button className="arrow right-arrow" onClick={nextSlide}></button>
        </div>
      </div>
      <div className="slide-indicators">
        {slides.map((slide, index) => (
          <span
            key={slide.id}
            className={index === currentSlide ? 'active' : ''}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  )
}

export default LandingPage
