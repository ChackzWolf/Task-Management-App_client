// components/Layout/Sidebar.tsx
import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <aside className="bg-gray-100 w-64 p-4 h-screen">
      <nav>
        <ul className="space-y-2">
          <li>
            <NavLink 
              to="/dashboard" 
              className={({ isActive }) => 
                `block p-2 rounded ${isActive ? 'bg-blue-600 text-white' : 'hover:bg-gray-200'}`
              }
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/tasks" 
              className={({ isActive }) => 
                `block p-2 rounded ${isActive ? 'bg-blue-600 text-white' : 'hover:bg-gray-200'}`
              }
            >
              Tasks
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/statistics" 
              className={({ isActive }) => 
                `block p-2 rounded ${isActive ? 'bg-blue-600 text-white' : 'hover:bg-gray-200'}`
              }
            >
              Statistics
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;