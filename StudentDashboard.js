// StudentDashboard.js
import React, { useState, useEffect } from 'react';

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [attendancePercentage, setAttendancePercentage] = useState('N/A');

  const studentEmail = localStorage.getItem('studentEmail');
  const rawJoinDate = localStorage.getItem('studentJoinDate');
  const course = localStorage.getItem('studentCourse');

  useEffect(() => {
    if (studentEmail) {
      fetch(`http://localhost:4000/student-attendance?email=${studentEmail}`)
        .then(res => res.json())
        .then(data => {
          if (data.percentage !== undefined && data.percentage !== null) {
            setAttendancePercentage(`${data.percentage}%`);
          }
        });
    }
  }, [studentEmail]);

  const calculateNextPaymentDate = (joinDate) => {
    if (!joinDate || joinDate === 'N/A') return 'N/A';
    try {
      const date = new Date(joinDate);
      date.setMonth(date.getMonth() + 1);
      return date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    } catch {
      return 'N/A';
    }
  };

  const formatJoinDate = (dateString) => {
    if (!dateString || dateString === 'N/A') return 'N/A';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    } catch {
      return 'N/A';
    }
  };

  const studentInfo = {
    name: localStorage.getItem('studentName') || 'N/A',
    email: studentEmail || 'N/A',
    course: course || 'N/A',
    joinDate: formatJoinDate(rawJoinDate),
    nextPaymentDue: calculateNextPaymentDate(rawJoinDate)
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  const mediaItems = [
    { type: 'video', title: 'Piano Lesson 1', url: 'https://example.com/video1.mp4' },
    { type: 'audio', title: 'Scales Practice', url: 'https://example.com/audio1.mp3' },
    { type: 'video', title: 'Performance Tips', url: 'https://example.com/video2.mp4' },
    { type: 'audio', title: 'Rhythm Exercises', url: 'https://example.com/audio2.mp3' }
  ];

  return (
    <div className="dashboard">
      <h2>Student Dashboard</h2>
      <button onClick={handleLogout} style={{ float: 'right', marginBottom: '10px' }}>Logout</button>

      <div className="tab-buttons">
        <button className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => setActiveTab('profile')}>
          Profile
        </button>
        <button className={`tab-btn ${activeTab === 'media' ? 'active' : ''}`} onClick={() => setActiveTab('media')}>
          Media Library
        </button>
        <button className={`tab-btn ${activeTab === 'payment' ? 'active' : ''}`} onClick={() => setActiveTab('payment')}>
          Fee Payment
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'profile' && (
          <div className="profile">
            <h3>Personal Information</h3>
            <div className="info-grid">
              <div><strong>Name:</strong> {studentInfo.name}</div>
              <div><strong>Email:</strong> {studentInfo.email}</div>
              <div><strong>Course:</strong> {studentInfo.course}</div>
              <div><strong>Join Date:</strong> {studentInfo.joinDate}</div>
              <div><strong>Next Payment Due:</strong> {studentInfo.nextPaymentDue}</div>
            </div>
            <h3>Attendance</h3>
            <p>Current Attendance: {attendancePercentage}</p>
          </div>
        )}

        {activeTab === 'media' && (
          <div className="media-library">
            <h3>Available Media</h3>
            <div className="media-grid">
              {mediaItems.map((item, index) => (
                <div key={index} className="media-item">
                  <h4>{item.title}</h4>
                  {item.type === 'video' ? (
                    <video controls width="100%">
                      <source src={item.url} type="video/mp4" />
                    </video>
                  ) : (
                    <audio controls>
                      <source src={item.url} type="audio/mp3" />
                    </audio>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'payment' && (
          <div className="payment">
            <h3>Fee Payment</h3>
            <p><strong>Next Payment Due:</strong> {studentInfo.nextPaymentDue}</p>
            <div className="payment-methods">
              <div className="method">
                <h4>UPI Payment</h4>
                <p>Scan the QR code below or use UPI ID:</p>
                <img src="/path-to-qr-code.jpg" alt="UPI QR Code" width="200" />
                <p>UPI ID: musicacademy@upi</p>
              </div>
              <div className="method">
                <h4>Bank Transfer</h4>
                <p>Account Name: Music Academy</p>
                <p>Account Number: 1234567890</p>
                <p>IFSC: ABCD0123456</p>
                <p>Bank: State Bank of India</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
