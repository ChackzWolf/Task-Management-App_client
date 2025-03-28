// src/components/Auth/Login.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState<string>('');
  
  const { login, error, clearError, isLoading } = useAuth();
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    clearError();
    
    // Basic validation
    if (!email || !password) {
      setFormError('Please fill in all fields');
      return;
    }
    
    try {
      await login({ email, password });
      navigate('/dashboard');
    } catch (err) {
      // Authentication errors are handled by the AuthContext ketooooooooo
    
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#e4f7d0]">
      <div className="bg-[#cbefa7] p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#152a09]">Log In</h2>
        
        {(error || formError) && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {formError || error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-[#152a09] font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-[#92d655] rounded-md focus:outline-none focus:ring-2 focus:ring-[#92d655]"
              required
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="password" className="block text-[#152a09] font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-[#92d655] rounded-md focus:outline-none focus:ring-2 focus:ring-[#92d655]"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#6bb82a] text-[#f3fce9] py-2 rounded-md hover:bg-[#50931d] transition duration-300 disabled:bg-[#92d655]"
          >
            {isLoading ? 'Logging in...' : 'Log In'}
          </button>
        </form>
        
        <div className="mt-4 text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-500 hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;