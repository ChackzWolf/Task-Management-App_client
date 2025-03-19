import React, { useEffect, useState } from 'react';
import { useTask } from '../../context/TaskContext';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from 'chart.js';
import { TaskPriority, TaskStatus } from '../../models/Task';

// Register Chart.js components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title
);

const TaskStats: React.FC = () => {
  const { tasks } = useTask();
  const [chartData, setChartData] = useState({
    labels: ['Completed', 'Pending'],
    datasets: [
      {
        data: [0, 0],
        backgroundColor: ['#4ade80', '#facc15'],
        borderColor: ['#16a34a', '#ca8a04'],
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    if (tasks && tasks.length > 0) {
      const completedTasks = tasks.filter(task => task.status === TaskStatus.COMPLETED).length;
      const pendingTasks = tasks.length - completedTasks;

      setChartData({
        labels: ['Completed', 'Pending'],
        datasets: [
          {
            data: [completedTasks, pendingTasks],
            backgroundColor: ['#4ade80', '#facc15'],
            borderColor: ['#16a34a', '#ca8a04'],
            borderWidth: 1,
          },
        ],
      });
    }
  }, [tasks]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      title: {
        display: false,
      },
    },
  };

  // If there are no tasks, display a message
  if (!tasks || tasks.length === 0) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-500">
        No task data available to display statistics
      </div>
    );
  }

  // Calculate priority statistics
  const highPriority = tasks.filter(task => task.priority === TaskPriority.HIGH).length;
  const mediumPriority = tasks.filter(task => task.priority === TaskPriority.MEDIUM).length;
  const lowPriority = tasks.filter(task => task.priority === TaskPriority.LOW).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h3 className="text-lg font-semibold mb-2 text-center">Task Status</h3>
        <div className="h-64">
          <Pie data={chartData} options={options} />
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4 text-center">Task Priority</h3>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-red-600 font-medium">High Priority</span>
            <span className="bg-red-100 text-red-600 px-2 py-1 rounded">{highPriority}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-yellow-600 font-medium">Medium Priority</span>
            <span className="bg-yellow-100 text-yellow-600 px-2 py-1 rounded">{mediumPriority}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-green-600 font-medium">Low Priority</span>
            <span className="bg-green-100 text-green-600 px-2 py-1 rounded">{lowPriority}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskStats;