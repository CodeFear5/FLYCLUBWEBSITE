import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './styles/Header.css';
import flylogo from './Images/fly_logo.jpg';
import profile from './Images/profile.jpeg';
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
          <li><Link to="/secure">Home</Link></li>
          <li><Link to="/sessions">Sessions</Link></li>
          <li><Link to="/feedback">Feedback</Link></li>
          <li><Link to="/">Login</Link></li>
        </ul>
      </nav>
      <div className="Profile-section" ref={profileRef}>
        <img
          src={profile}
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
