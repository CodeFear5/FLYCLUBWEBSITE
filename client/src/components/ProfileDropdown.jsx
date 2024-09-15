import React, { useState } from 'react';
import './styles/ProfileDropdown.css';

function ProfileDropdown({ onClose }) {
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
  });

  const handleSaveClick = () => {
    
    console.log('Profile updated:', profileData);
    onClose(); 
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  return (
    <div className="profile-overlay">
      <div className="edit-profile-section">
        <h3>Edit Profile</h3>
        <div>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={profileData.name}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={profileData.email}
              onChange={handleChange}
            />
          </label>
        </div>
        <button onClick={handleSaveClick}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}

export default ProfileDropdown;
