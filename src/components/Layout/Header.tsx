// components/Layout/Header.tsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          <Link to="/">Task Manager</Link>
        </h1>
        <nav>
          {user ? (
            <div className="flex items-center gap-4">
              <span>Welcome, {user.username}</span>
              <button 
                onClick={handleLogout}
                className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex gap-4">
              <Link to="/login" className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100">Login</Link>
              <Link to="/register" className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-700">Register</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;