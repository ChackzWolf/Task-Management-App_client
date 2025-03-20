import React, { useState, useEffect } from 'react';
import { TaskStatus, TaskPriority } from '../../models/Task';
import { useTask } from '../../context/TaskContext';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';

const TaskList: React.FC = () => {
  const { tasks, isLoading, error, refreshTasks } = useTask();

  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState<{
    status: TaskStatus | 'ALL';
    priority: TaskPriority | 'ALL';
    search: string;
  }>({
    status: 'ALL',
    priority: 'ALL',
    search: '',
  });




  useEffect(() => {
    refreshTasks();
  }, []);



  const handleAddClick = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilter((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const filteredTasks = tasks.filter((task) => {
    // Filter by status
    if (filter.status !== 'ALL' && task.status !== filter.status) {
      return false;
    }

    // Filter by priority
    if (filter.priority !== 'ALL' && task.priority !== filter.priority) {
      return false;
    }

    // Filter by search term
    if (
      filter.search &&
      !task.title.toLowerCase().includes(filter.search.toLowerCase()) &&
      !task.description.toLowerCase().includes(filter.search.toLowerCase())
    ) {
      return false;
    }

    return true;
  });

  return (
    <div className="bg-[#a9e373] rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#2e4c1b]">My Tasks</h2>
        <button
          onClick={handleAddClick}
          className="bg-[#6bb82a] text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Add New Task
        </button>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-4">
        <div className="flex-1 min-w-[150px]">
          <label className="block text-sm font-medium text-[#35591b]  mb-1">Status</label>
          <select
            name="status"
            value={filter.status}
            onChange={handleFilterChange}
            className="w-full p-2 border border-[#92d655] rounded "
          >
            <option value="ALL">All Statuses</option>
            <option value={TaskStatus.TODO}>To Do</option>
            <option value={TaskStatus.IN_PROGRESS}>In Progress</option>
            <option value={TaskStatus.COMPLETED}>Completed</option>
          </select>
        </div>

        <div className="flex-1 min-w-[150px]">
          <label className="block text-sm font-medium text-[#35591b] mb-1">Priority</label>
          <select
            name="priority"
            value={filter.priority}
            onChange={handleFilterChange}
            className="w-full p-2 border border-[#92d655] rounded"
          >
            <option value="ALL">All Priorities</option>
            <option value={TaskPriority.LOW}>Low</option>
            <option value={TaskPriority.MEDIUM}>Medium</option>
            <option value={TaskPriority.HIGH}>High</option>
          </select>
        </div>

        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-[#35591b] mb-1">Search</label>
          <input
            type="text"
            name="search"
            value={filter.search}
            onChange={handleFilterChange}
            placeholder="Search tasks..."
            className="w-full p-2 border border-[#92d655] text-[#35591b] rounded"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-950"></div>
        </div>
      ) : error ? (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
          {error}
        </div>
      ) : filteredTasks.length === 0 ? (
        <div className="text-center py-8 text-green-500">
          {tasks.length === 0
            ? "You don't have any tasks yet. Click 'Add New Task' to get started."
            : "No tasks match your filters."}
        </div>
      ) : (
        <div className="space-y-4 ">
          {filteredTasks.map((task) => (
            <TaskItem key={task._id} task={task} />
          ))}
        </div>
      )}

      {showForm && <TaskForm onClose={handleCloseForm} />}
    </div>
  );
};

export default TaskList;