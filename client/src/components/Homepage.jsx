import React from "react";
import "./styles/Homepage.css"; 
import sampleImage from './Images/homepage_student_discuss.jpeg'; 



function App() {
  return (
    <div className="content-wrapper">
      <div className="welcome-section">
        <h1>Welcome To <br /><strong>FLY  Club Program</strong></h1>
        <p>We hope you will make the most of this opportunity.<br />
           Wishing you all the best on your FLY journey.</p>
        <hr />
        <p>Feel free to email us if you have any questions at <br />
           <a href="mailto:nageshbc55@gmail.com">fluclub@gmail.com</a></p>
      </div>
      <div className="image-section">
        <img src={sampleImage} alt="Mentoring Program" />
      </div>
      
    </div>
  );
}

export default App;
