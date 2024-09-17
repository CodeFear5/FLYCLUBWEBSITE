import React, { useState } from 'react';
import './styles/MeetingCard.css';
import axios from 'axios';

const MeetingCard = ({ meeting, onDelete }) => {
  const [message, setMessage] = useState('');

  return (
    <div className="meeting-card">
      {message && (
        <div className="message-box">
          <p style={{ color: 'red' }}>{message}</p>
        </div>
      )}
      <div className="card-header">
        <h3>TITLE: {meeting.agenda || "No Agenda"}</h3>
      </div>
      <div className="card-body">
        <p><strong>Session Date:</strong> {meeting.date || "No Date"}</p>
        <p><strong>Session Time:</strong> From {meeting.startTime || "No Start Time"} to {meeting.endTime || "No End Time"}</p>
        <p><strong>Meeting Link:</strong> <a href={meeting.meetLink} target="_blank" rel="noopener noreferrer">{meeting.meetLink || "No Link"}</a></p>
        <p><strong>Status:</strong> {meeting.status || "No Status"}</p>
        <p><strong>Description:</strong> {meeting.description || "No Description"}</p>
      </div>
    </div>
  );
};

export default MeetingCard;
