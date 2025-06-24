// Admindashboard.js
import React, { useEffect, useState } from 'react';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [students, setStudents] = useState([]);
  const [date, setDate] = useState('');
  const [attendanceStats, setAttendanceStats] = useState({});

  useEffect(() => {
    fetch('http://localhost:4000/students')
      .then(res => res.json())
      .then(data => setStudents(data));

    fetchAttendanceStats();
  }, []);

  const fetchAttendanceStats = () => {
    fetch('http://localhost:4000/attendance-stats')
      .then(res => res.json())
      .then(data => setAttendanceStats(data));
  };

  const markAttendance = (email, status) => {
    if (!date) return alert("Please select a date");

    fetch('http://localhost:4000/mark-attendance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ student_email: email, date, status })
    })
      .then(res => res.text())
      .then(msg => {
        alert(msg);
        fetchAttendanceStats(); // refresh stats after marking
      })
      .catch(() => alert("Failed to mark attendance"));
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  return (
    <div className="dashboard">
      <h2>Admin Dashboard</h2>
      <button onClick={handleLogout} style={{ float: 'right', marginBottom: '10px' }}>Logout</button>

      <div className="date-input">
        <label>Select Date: </label>
        <input type="date" value={date} onChange={e => setDate(e.target.value)} />
      </div>

      <table className="students-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Course</th>
            <th>Attendance %</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, idx) => (
            <tr key={idx}>
              <td>{student.full_name}</td>
              <td>{student.Email}</td>
              <td>{student.phone}</td>
              <td>{student.course}</td>
              <td>{attendanceStats[student.Email]?.percentage ?? 'N/A'}%</td>
              <td>
                <button onClick={() => markAttendance(student.Email, 'Present')}>Present</button>
                <button onClick={() => markAttendance(student.Email, 'Absent')}>Absent</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
