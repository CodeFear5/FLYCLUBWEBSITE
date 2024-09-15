
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/Clubhistory.css';
const MeetingTable = () => {
  const [meetings, setMeetings] = useState([]);

  // Fetch meetings when the component loads
  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const response = await axios.get('https://flyclubwebsite-uarj.vercel.app/get/meeting-shedule');
        setMeetings(response.data);
      } catch (error) {
        console.error("Error fetching meetings:", error);
      }
    };
    fetchMeetings();
  }, []);

  return (
    <div>
      <h2>Meeting Schedule</h2>
      <table border="1" width="100%">
        <thead>
          <tr>
            <th>Date</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Duration</th>
            <th>Agenda</th>
            <th>Meeting Link</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {meetings.length > 0 ? (
            meetings.map((meeting, index) => (
              <tr key={index}>
                <td>{meeting.date}</td>
                <td>{meeting.startTime}</td>
                <td>{meeting.endTime}</td>
                <td>{meeting.duration}</td>
                <td>{meeting.agenda}</td>
                <td><a href={meeting.meetLink} target="_blank" rel="noopener noreferrer">Join</a></td>
                <td>{meeting.description}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No meetings scheduled</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MeetingTable;
