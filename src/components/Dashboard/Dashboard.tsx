// components/Dashboard/Dashboard.tsx
// components/Dashboard/Dashboard.tsx
import React from 'react';
import { useTask } from '../../context/TaskContext';
import TaskStats from '../Visualization/TaskStats';
import TaskList from '../Tasks/TaskList';
import { TaskStatus } from '../../models/Task';

const Dashboard: React.FC = () => {
  const { tasks,  isLoading } = useTask();

//   useEffect(() => {
//     fetchTasks();
//   }, []);

  // Calculate task statistics
  const completedTasks = tasks.filter(task => task.status === TaskStatus.COMPLETED).length;
  const pendingTasks = tasks.length - completedTasks;

  if (isLoading && tasks.length === 0) {
    return <div className="flex justify-center items-center h-64">Loading dashboard...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Task Summary</h2>
          <div className="flex justify-around">
            <div className="text-center">
              <p className="text-gray-600">Total Tasks</p>
              <p className="text-3xl font-bold">{tasks.length}</p>
            </div>
            <div className="text-center">
              <p className="text-gray-600">Completed</p>
              <p className="text-3xl font-bold text-green-600">{completedTasks}</p>
            </div>
            <div className="text-center">
              <p className="text-gray-600">Pending</p>
              <p className="text-3xl font-bold text-yellow-600">{pendingTasks}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Task Statistics</h2>
          <TaskStats />
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Recent Tasks</h2>
        </div>
        <TaskList   />
      </div>
    </div>
  );
};

export default Dashboard;