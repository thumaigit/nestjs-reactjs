import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { User, Blog, Comment, Header, Footer } from './components';
import { Login } from './pages/Login';
import { login } from './apis/user';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });
  const [error, setError] = useState('');

  const handleLogin = async (username, password, e) => {
    e.preventDefault();
    try {
      const response = await login(username, password);
      if (response.token) {
        setIsLoggedIn(true);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('token', response.token);
        setError('');
        window.location.href = '/';
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      setError('An error occurred during login');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={isLoggedIn ? <Header handleLogout={handleLogout} /> : <Navigate to="/login" />}
          />
          {isLoggedIn && (
            <>
              <Route path="/my-profile" element={<User />} />
              <Route path="/blog" element={<Blog />} />
            </>
          )}
          <Route
            path="/login"
            element={<Login handleSubmit={handleLogin} error={error} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
