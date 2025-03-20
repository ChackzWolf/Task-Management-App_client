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
    <header className="bg-[#6bb82a] text-[#f3fce9] p-4">
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
                className="transition-all bg-[#e4f7d0] text-[#2e4c1b] px-4 py-2 rounded hover:bg-[#cbefa7]"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex gap-4">
              <Link to="/login" className="bg-white text-[#2e4c1b] px-4 py-2 rounded hover:bg-blue-900">Login</Link>
              <Link to="/register" className="bg-blue-900 text-[#f3fce9] px-4 py-2 rounded hover:bg-blue-900">Register</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;