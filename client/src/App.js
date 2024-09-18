import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Homepage from './components/Homepage.jsx';
import Footer from './components/Footer.jsx';
import Feedback from './components/Feedback.jsx';
import Members from './components/Members.jsx';
import Sessions from './components/Sessions.jsx';
import MeetingCard from './components/MeetingCard.jsx';
import Register from './components/Authentication/RegisterPage.jsx';
import LoginPage from './components/Authentication/LoginPage.jsx';
import PrivateRoute from './components/Authentication/PrivateRoute.jsx';
import ProtectedPage from './components/Authentication/ProtectedPage.jsx';
import History from './components/history.jsx';
const AppContent = () => {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/secure" element={
          <>
            <Homepage />
            <Members />
            <Feedback />
            <Footer />
          </>
        } />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/members" element={<Members />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/sessions" element={<Sessions />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/meetcard" element={<MeetingCard />} />
        <Route path="/history" element={< History/>} />
        <Route path="/log" element={<PrivateRoute><ProtectedPage /></PrivateRoute>} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
