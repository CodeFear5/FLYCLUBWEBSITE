import React from 'react';
import './styles/Members.css';
import img from './Images/profile.jpeg'
const members = [
  { id: 1, name: "Alice Johnson", position: "President", image: img },
  { id: 2, name: "Bob Smith", position: "Vice President", image: img },
  { id: 3, name: "Carol Davis", position: "Secretary", image: img },
  { id: 4, name: "David Brown", position: "Treasurer", image: img },
  { id: 5, name: "Eve Wilson", position: "Member", image: img },
];

function ClubMembers() {
  return (
    <div className="members-heading">
      <h2>FLY CLUB MEMBERS</h2>
    <div className="members-section">
      {members.map(member => (
        <div key={member.id} className="member-card">
          <div className="member-image">
            <img src={member.image} alt={member.name} />
          </div>
          <div className="member-info">
            <h3>{member.name}</h3>
            <p>{member.position}</p>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
}

export default ClubMembers;
