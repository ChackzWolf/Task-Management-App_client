// components/Layout/Sidebar.tsx
import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <aside className="bg-[#35591b] w-64 p-4 h-screen">
      <nav>
        <ul className="space-y-2">
          <li>
            <NavLink 
              to="/dashboard" 
              className={({ isActive }) => 
                `block p-2 rounded ${isActive ? 'bg-[#6bb82a] text-[#e4f7d0]' : 'hover:bg-[#e4f7d0] text-[#e4f7d0] hover:text-[#2e4c1b]'}`
              }
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/tasks" 
              className={({ isActive }) => 
                `block p-2 rounded ${isActive ? 'bg-[#6bb82a] text-[#e4f7d0]' : 'hover:bg-[#e4f7d0] text-[#e4f7d0] hover:text-[#2e4c1b]'}`
              }
            >
              Tasks
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/statistics" 
              className={({ isActive }) => 
                `block p-2 rounded ${isActive ? 'bg-[#6bb82a] text-[#e4f7d0]' : 'hover:bg-[#e4f7d0] text-[#e4f7d0] hover:text-[#2e4c1b]'}`
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