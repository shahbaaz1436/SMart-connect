// Adminlogin.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    fetch('http://localhost:4000/admin-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password })
    })
      .then(res => {
        if (!res.ok) throw new Error('Incorrect Password');
        return res.text();
      })
      .then(() => {
        localStorage.setItem('adminLoggedIn', 'true'); // optional
        navigate('/admin-dashboard');
      })
      .catch(err => alert(err.message));
  };

  const handleForgot = () => {
    fetch('http://localhost:4000/admin-forgot-password', { method: 'POST' })
      .then(res => res.text())
      .then(msg => alert(msg))
      .catch(() => alert("Error in forgot password process"));
  };

  return (
    <div className="login">
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
        <button type="button" onClick={handleForgot}>Forgot Password?</button>
      </form>
    </div>
  );
};

export default AdminLogin;
