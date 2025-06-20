import React, { useState, useContext } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import './Header.css'
import { AuthContext } from '../../context/AuthContext'
import { ThemeContext } from '../../context/ThemeContext'

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { user, logout } = useContext(AuthContext)
  const { theme, toggleTheme } = useContext(ThemeContext)
  const location = useLocation()
  const navigate = useNavigate()

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="header">
      <div className="container header-container">
        <div className="logo">
          <Link to="/" className="logo-link">
            <img src="/src/assets/logo.png" alt="MediKart Logo" className="logo-image" />
            <span className="logo-text">MediKart</span>
          </Link>
        </div>
        <div className="right-controls">
          {/* <button
            onClick={toggleTheme}
            style={{
              padding: '8px 16px',
              backgroundColor: 'var(--button-bg-color)',
              color: 'var(--button-text-color)',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
            aria-label="Toggle light/dark theme"
          >
            {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
          </button> */}
          <nav className={`nav ${mobileMenuOpen ? 'open' : ''}`}>
            {['/', '/about', '/contact', '/login', '/register'].includes(location.pathname) && (
              <>
                <NavLink to="/about" activeclassname="active">About</NavLink>
                <NavLink to="/contact" activeclassname="active">Contact</NavLink>
                {!user && <NavLink to="/login" activeclassname="active">Login</NavLink>}
              </>
            )}
            {['/products', '/cart'].includes(location.pathname) && user && (
              <>
                <NavLink to="/products" activeclassname="active">Shop</NavLink>
                <NavLink to="/cart" activeclassname="active" className="cart-link">
                  <FontAwesomeIcon icon={faCartShopping} className="cart-icon" />
                </NavLink>
                <button onClick={handleLogout} className="logout-button">Logout</button>
              </>
            )}
            {/* For other routes, you can customize as needed */}
            {!['/', '/about', '/contact', '/login', '/register', '/products', '/cart'].includes(location.pathname) && (
              <>
                <NavLink to="/products" activeclassname="active">Shop</NavLink>
                <NavLink to="/about" activeclassname="active">About</NavLink>
                <NavLink to="/contact" activeclassname="active">Contact</NavLink>
                {user ? (
                  <>
                    <NavLink to="/cart" activeclassname="active" className="cart-link">
                      <FontAwesomeIcon icon={faCartShopping} className="cart-icon" />
                    </NavLink>
                    <button onClick={handleLogout} className="logout-button">Logout</button>
                  </>
                ) : (
                  <NavLink to="/login" activeclassname="active">Login</NavLink>
                )}
              </>
            )}
          </nav>
        </div>
        <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
          {mobileMenuOpen ? 'Close' : 'Menu'}
        </button>
      </div>
    </header>
  )
}

export default Header
