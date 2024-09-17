import React from 'react';
import './styles/Members.css';
import image1 from "./Images/image1.jpeg";
import image2 from "./Images/image2.jpeg";
import image3 from "./Images/image3.jpeg";
import image4 from "./Images/image4.jpeg";
import image5 from "./Images/image5.jpeg";
const members = [
  { id: 1, name: "July", position: "President", image: image1 },
  { id: 2, name: "aryan", position: "Vice President", image: image2 },
  { id: 3, name: "shravanthi", position: "Secretary", image: image3 },
  { id: 4, name: "John", position: "Treasurer", image: image4 },
  { id: 5, name: "susan", position: "Member", image: image5},
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
