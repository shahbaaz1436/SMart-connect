// Student.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const StudentLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isNewUser, setIsNewUser] = useState(false);
  const [newUserData, setNewUserData] = useState({
    name: '',
    email: '',
    phone: '',
    joindate: '',
    course: '',
    newPassword: '',
    confirmPassword: ''
  });
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    fetch('http://localhost:4000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: username, password })
    })
      .then(async (res) => {
        if (!res.ok) {
          const msg = await res.text();
          throw new Error(msg);
        }
        return res.json();
      })
      .then(data => {
        if (data.message === 'Login successful!') {
          localStorage.setItem('studentEmail', data.user.email);
          localStorage.setItem('studentName', data.user.name || 'Student');
          localStorage.setItem('studentCourse', data.user.course || 'N/A');
          localStorage.setItem('studentJoinDate', data.user.joindate || 'N/A');
          localStorage.setItem('studentPhone', data.user.phone || 'N/A');
          navigate('/student-dashboard');
        } else {
          alert(data.message);
        }
      })
      .catch(err => {
        console.error('Login error:', err);
        alert(err.message || 'Login failed');
      });
  };

  const handleRegister = (e) => {
    e.preventDefault();

    const payload = {
      full_name: newUserData.name,
      phone: newUserData.phone,
      email: newUserData.email,
      joindate: newUserData.joindate,
      course: newUserData.course,
      password: newUserData.newPassword,
      confirm: newUserData.confirmPassword
    };

    fetch('http://localhost:4000/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(res => res.text())
      .then(message => {
        alert(message);
        if (message === 'Registration successful') {
          localStorage.setItem('studentEmail', newUserData.email);
          localStorage.setItem('studentName', newUserData.name);
          localStorage.setItem('studentCourse', newUserData.course);
          localStorage.setItem('studentJoinDate', newUserData.joindate);
          localStorage.setItem('studentPhone', newUserData.phone);
          setIsNewUser(false);
          navigate('/student-dashboard');
        }
      })
      .catch(err => {
        console.error('Registration error:', err);
        alert('Registration failed');
      });
  };

  const handleForgotPassword = () => {
    alert('Password reset link sent to your registered email');
  };

  return (
    <div className="login">
      <h2>{isNewUser ? 'New Student Registration' : 'Student Login'}</h2>
      {!isNewUser ? (
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="submit-btn">Login</button>
          <div className="login-options">
            <button type="button" onClick={() => setIsNewUser(true)}>New User? Register</button>
            <button type="button" onClick={handleForgotPassword}>Forgot Password?</button>
          </div>
        </form>
      ) : (
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label>Full Name:</label>
            <input
              type="text"
              value={newUserData.name}
              onChange={(e) => setNewUserData({ ...newUserData, name: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={newUserData.email}
              onChange={(e) => setNewUserData({ ...newUserData, email: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Phone:</label>
            <input
              type="tel"
              value={newUserData.phone}
              onChange={(e) => setNewUserData({ ...newUserData, phone: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Join date:</label>
            <input
              type="date"
              value={newUserData.joindate}
              onChange={(e) => setNewUserData({ ...newUserData, joindate: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Course:</label>
            <select
              value={newUserData.course}
              onChange={(e) => setNewUserData({ ...newUserData, course: e.target.value })}
              required
            >
              <option value="">Select a course</option>
              <option value="Carnatic Vocal">Carnatic Vocal</option>
              <option value="Veena">Veena</option>
              <option value="Violin">Violin</option>
              <option value="Guitar">Guitar</option>
            </select>
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={newUserData.newPassword}
              onChange={(e) => setNewUserData({ ...newUserData, newPassword: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Confirm Password:</label>
            <input
              type="password"
              value={newUserData.confirmPassword}
              onChange={(e) => setNewUserData({ ...newUserData, confirmPassword: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="submit-btn">Register</button>
          <button type="button" onClick={() => setIsNewUser(false)}>
            Already have an account? Login
          </button>
        </form>
      )}
    </div>
  );
};

export default StudentLogin;
