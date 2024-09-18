import React, { useState, useEffect } from 'react';
import './styles/Sessions.css'; 
import axios from 'axios';
import MeetingCard from './MeetingCard';

const Dashboard = () => {
  const [showForm, setShowForm] = useState(false); 
  const [formData, setFormData] = useState({
    date: '',
    startTime: '',
    duration: '',
    agenda: '',
    meetLink: '',
    description: '',
    endTime: '',
  });

  const [Umeet, setUmeet] = useState(0);
  const [Tmeet, setTmeet] = useState(0);
  const [meetings, setMeetings] = useState([]); 

  const token = localStorage.getItem('token');

  const calculateEndTime = (startTime, duration) => {
    const [hours, minutes] = startTime.split(':').map(Number);
    const newTime = new Date();
    newTime.setHours(hours);
    newTime.setMinutes(minutes + Number(duration));
    return newTime.toTimeString().slice(0, 5); 
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const updatedData = { ...prevData, [name]: value };

      if (name === 'startTime' || name === 'duration') {
        const endTime = calculateEndTime(updatedData.startTime, updatedData.duration);
        updatedData.endTime = endTime;
      }

      return updatedData;
    });
  };

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const response = await axios.get("https://flyclubwebsite-backend.vercel.app/get/meeting-shedule", {
          
        });
        console.log("Fetched Meetings: ", response.data);
        setMeetings(response.data);
      } catch (error) {
        console.error("Error fetching meetings:", error);
      }
    };

    fetchMeetings();
  }, [token]);

  const toggleForm = () => setShowForm(!showForm);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://flyclubwebsite-backend.vercel.app/api/meeting-shedule', formData, {
        
      });
      console.log(response.data);

      setFormData({
        date: '',
        startTime: '',
        duration: '',
        agenda: '',
        meetLink: '',
        description: '',
        endTime: '',
      });

      if (response.data.message === 'Meeting scheduled successfully') {
        setUmeet((prevUmeet) => prevUmeet + 1); 
        setTmeet((prevTmeet) => prevTmeet + 1); 
      }

      setShowForm(false);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
  };

  return (
    <div>
      <div className={`dashboard-container ${showForm ? 'blurred-background' : ''}`}>
        <div className="section-meetings">
          <div className="meeting-box">
            <div className="section schedule-meeting">
              <h2>Schedule A Meeting</h2>
              <div className="icon-container">
                <i className="fas fa-calendar-alt"></i>
              </div>
              <button className="btn" onClick={toggleForm}>Schedule A Meeting</button>
            </div>

            <div className="section upcoming-meetings">
              <h2>Upcoming Meetings</h2>
              <div className="icon-container">
                <i className="fas fa-calendar-alt"></i>
              </div>
              <p className="circle">{1}</p>
            </div>
          </div>
        </div>

        <div className="section total-sessions-created">
          <div className="icon-container">
            <i className="fas fa-trophy"></i>
          </div>
          <p><strong>{1}</strong> Total Sessions Created</p>
        </div>

        <div className="section total-sessions-completed">
          <div className="icon-container">
            <i className="fas fa-bullseye"></i>
          </div>
          <p><strong>{1}</strong> Total Sessions Completed/Cancelled</p>
        </div>

        <div className="sessions-container">
          {meetings.length > 0 ? (
            meetings.map((meeting) => (
              <MeetingCard key={meeting._id} meeting={meeting}  />
            ))
          ) : (
            <p>No meetings scheduled.</p>
          )}
        </div>

        <button className="floating-btn" onClick={toggleForm}>
          <i className="fas fa-plus"></i>
        </button>
      </div>

      {showForm && (
        <div className="modal-overlay">
          <form className="meeting-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <h2>Create a Session</h2>
              <label>Select Date:</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Select Start Time:</label>
              <input
                type="time"
                name="startTime"
                value={formData.startTime}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Duration (in minutes):</label>
              <input
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>End Time:</label>
              <input
                type="time"
                name="endTime"
                value={formData.endTime}
                readOnly
              />
            </div>

            <div className="form-group">
              <label>Session Agenda:</label>
              <input
                type="text"
                name="agenda"
                value={formData.agenda}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Meeting Link:</label>
              <input
                type="url"
                name="meetLink"
                value={formData.meetLink}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Description:</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-actions">
              <button className="btn cancel" onClick={handleCancel}>Cancel</button>
              <button className="btn submit" type="submit">Schedule</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
