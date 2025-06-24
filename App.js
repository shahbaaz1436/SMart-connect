import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import About from './About';
import Music from './Music';
import Gallery from './Gallery';
import StudentLogin from './Student';
import StudentDashboard from './StudentDashboard';

import './App.css';
import AdminLogin from './Adminlogin';
import AdminDashboard from './Admindashboard';

function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/music" element={<Music/>} />
        <Route path="/gallery" element={<Gallery/>} />
        <Route path="/student-login" element={<StudentLogin/>} />
        <Route path="/student-dashboard" element={<StudentDashboard/>} />
        <Route path="/Admin-login" element={<AdminLogin/>} />
        <Route path="/Admin-dashboard" element={<AdminDashboard/>} />
        {/* <Route path="/admin-login" element={<AdminLogin/>} /> */}
        {/* <Route path="/admin-dashboard" element={<AdminDashboard/>} /> */}
      </Routes>
    </Router>
  );
}

export default App;