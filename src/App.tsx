import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { TaskProvider } from './context/TaskContext';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './components/Dashboard/Dashboard';
import TaskList from './components/Tasks/TaskList';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import TaskStats from './components/Visualization/TaskStats';


const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
};

const AuthRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const token = localStorage.getItem('token');
  if (token) {
    return <Navigate to="/dashboard" />;
  }
  return <>{children}</>;
};

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1 bg-[#35591b]">
        <Sidebar />
        <main className="flex-1 bg-[#152a09]">
          {children}
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <TaskProvider>
          <Routes>

            
            <Route path="/login" element={
              <AuthRoute>
              <Login />
              </AuthRoute>
            } />
            <Route path="/register" element={
              <AuthRoute>
              <Register />
              </AuthRoute>
            } />

            <Route 
              path="/" 
              element={
                <ProtectedRoute>
                  <Navigate to="/dashboard" />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <Dashboard />
                  </MainLayout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/tasks" 
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <div className="p-6">
                      <h1 className="text-2xl font-bold mb-6 text-[#f3fce9]">Tasks</h1>
                      <TaskList />
                    </div>
                  </MainLayout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/statistics" 
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <div className="p-6">
                      <h1 className="text-2xl font-bold mb-6 text-[#f3fce9]">Task Statistics</h1>
                      <div className="bg-[#a9e373] p-6 rounded-lg shadow-md">
                        <TaskStats />
                      </div>
                    </div>
                  </MainLayout>
                </ProtectedRoute>
              } 
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </TaskProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;