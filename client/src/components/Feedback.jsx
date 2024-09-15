import React, { useState, useEffect, useCallback } from "react";
import "./styles/Feedback.css";
import sampleImage from "./Images/profile.jpeg";

function App() {
  const students = [
    { id: 1, name: "Student 1", message: "This is a great program!", image: sampleImage },
    { id: 2, name: "Student 2", message: "I learned so much!", image: sampleImage },
    { id: 3, name: "Student 3", message: "Highly recommend to everyone!", image: sampleImage },
    { id: 4, name: "Student 4", message: "Fantastic mentors and resources.", image: sampleImage },
    { id: 5, name: "Student 5", message: "This has changed my career.", image: sampleImage },
  ];

  const [startIndex, setStartIndex] = useState(0);

  const scrollLeft = useCallback(() => {
    setStartIndex((prevIndex) => (prevIndex === 0 ? Math.max(students.length - 3, 0) : prevIndex - 3));
  }, [students.length]);

  const scrollRight = useCallback(() => {
    setStartIndex((prevIndex) => (prevIndex + 3 >= students.length ? 0 : prevIndex + 3));
  }, [students.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      scrollRight();
    }, 10000);

    return () => clearInterval(interval); 
  }, [scrollRight]); 

  return (
    <div className="student-cards-section">
      <div className="feedback-heading">
        <h2>FLY CLUB STUDENTS FEEDBACK</h2>
      </div>
      <button className="scroll-button left" onClick={scrollLeft}>
        &#8249; 
      </button>

      <div className="student-cards-container">
        {students.slice(startIndex, startIndex + 3).map((student) => (
          <div
            key={student.id}
            className="student-card"
          >
            <div className="student-image">
              <img src={student.image} alt={student.name} />
            </div>
            <div className="student-message">
              <h3>{student.name}</h3>
              <p>{student.message}</p>
            </div>
          </div>
        ))}
      </div>

      <button className="scroll-button right" onClick={scrollRight}>
        &#8250; 
      </button>
    </div>
  );
}

export default App;
