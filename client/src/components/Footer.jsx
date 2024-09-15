import React from 'react';
import './styles/Footer.css'; // Ensure you create this file for custom styles

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <p>&copy; {currentYear} Nagesh  ||  All rights reserved.</p>
    </footer>
  );
};

export default Footer;
