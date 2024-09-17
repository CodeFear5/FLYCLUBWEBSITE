import React, { useState, useEffect, useCallback } from "react";
import "./styles/Feedback.css";
import image1 from "./Images/image1.jpeg";
import image2 from "./Images/image2.jpeg";
import image3 from "./Images/image3.jpeg";
import image4 from "./Images/image4.jpeg";
import image5 from "./Images/image5.jpeg";

function App() {
  const students = [
    { id: 1, name: "kavya", message: "This is a great program!", image: image1 },
    { id: 2, name: "John", message: "I learned so much!", image: image2 },
    { id: 3, name: "Nisarga", message: "Highly recommend to everyone!", image: image3 },
    { id: 4, name: " Akash", message: "Fantastic mentors and resources.", image: image4 },
    { id: 5, name: "Dimple", message: "This has changed my career.", image: image5 },
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
