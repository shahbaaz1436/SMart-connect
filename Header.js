import React from 'react';
import { Link } from 'react-router-dom';

import logo from './logo.jpg';

const HorizontalHeader = () => {
  return (
    <header className="horizontal-header">
      <div
        className="background"
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          padding: '1rem',
          backgroundColor: 'lightblue', // fixed spelling
          borderBottom: '1px solid #ddd',
        }}
      >
        <img src={logo} width="100px" alt="Music Academy Logo" />

        <div><Link to="/">Home</Link></div>
        <div><Link to="/about">About</Link></div>
        <div><Link to="/music">Music</Link></div>
        <div><Link to="/gallery">Gallery</Link></div>
        <div><Link to="/student-login">Student Login</Link></div>
        <div><Link to="/Admin-login">Admin Login</Link></div>
        {/* <div><Link to="/admin-login">Admin Login</Link></div> */}
      </div>
    </header>
  );
};

export default HorizontalHeader;
