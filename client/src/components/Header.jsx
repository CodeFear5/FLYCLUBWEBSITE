import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './styles/Header.css';
import flylogo from './Images/fly_logo.jpg';
import image5 from "./Images/image5.jpeg";
import ProfileDropdown from './ProfileDropdown';

function Header() {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const profileRef = useRef(null);

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="Header">
      <div className="logo-section">
        <img src={flylogo} alt="fly_club logo" className="logo" />
        <div className="motto">
          <h2>Find the Leader in You</h2>
          <p>Nurture success ⭐ improve communication</p>
        </div>
      </div>
      <nav className="links">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/sessions">Sessions</Link></li>
          <li><Link to="/history">Activities</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      </nav>
      <div className="Profile-section" ref={profileRef}>
        <img
          src={image5}
          alt="profile_photo"
          onClick={toggleProfileDropdown}
          style={{ cursor: 'pointer' }}
        />
        {showProfileDropdown && (
          <ProfileDropdown onClose={() => setShowProfileDropdown(false)} />
        )}
      </div>
    </div>
  );
}

export default Header;
