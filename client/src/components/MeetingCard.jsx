import React, { useState } from 'react';
import './styles/MeetingCard.css';
import axios from 'axios';

const MeetingCard = ({ meeting, onDelete }) => {
  const [message, setMessage] = useState('');
  
  // Handle meeting deletion
  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:3000/delete-meeting/${meeting._id}`);
      if (response.data.message === 'Meeting deleted successfully') {
        onDelete(meeting._id); // Call onDelete function passed from parent
        setMessage('Meeting deleted successfully');
        alert("meeting deleted");
        // Hide the message after 5 seconds
        setTimeout(() => {
          setMessage('');
        }, 5000);
      }
    } catch (error) {
      console.error('Error deleting meeting:', error);
    }
  };

  return (
    <div className="meeting-card">
      {message && (
        <div className="message-box">
          <p style={{ color: 'red' }}>{message}</p>
        </div>
      )}
      <div className="card-header">
        <h3>{meeting.agenda || "No Agenda"}</h3>
      </div>
      <div className="card-body">
        <p><strong>Session Date:</strong> {meeting.date || "No Date"}</p>
        <p><strong>Session Time:</strong> From {meeting.startTime || "No Start Time"} to {meeting.endTime || "No End Time"}</p>
        <p><strong>Meeting Link:</strong> <a href={meeting.meetLink}>{meeting.meetLink || "No Link"}</a></p>
        <p><strong>Status:</strong> {meeting.status || "No Status"}</p>
        <p><strong>Description:</strong> {meeting.description}</p>
        {/* Cancel button */}
        <button onClick={handleDelete} className="cancel-button">
          Cancel Meeting
        </button>
      </div>
    </div>
  );
};

export default MeetingCard;
