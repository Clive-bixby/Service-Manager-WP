import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
  const location = useLocation()

  const isActive = (path) => {
    return location.pathname === path ? 'nav-link active' : 'nav-link'
  }

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          Service Manager
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className={isActive('/')}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/services" className={isActive('/services')}>
              Services
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/blog" className={isActive('/blog')}>
              Blog
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/contact" className={isActive('/contact')}>
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar