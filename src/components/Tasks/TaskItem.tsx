// src/components/Tasks/TaskItem.tsx
import React, { useState } from 'react';
import { Task, TaskStatus, TaskPriority } from '../../models/Task';
import { useTask } from '../../context/TaskContext';
import { formatDateForDisplay, isPastDue } from '../../utils/dateUtils';
import TaskForm from './TaskForm';

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const { updateTask, removeTask } = useTask();

  const getPriorityColor = (priority: TaskPriority) => {
    switch (priority) {
      case TaskPriority.HIGH:
        return 'bg-red-100 text-red-800';
      case TaskPriority.MEDIUM:
        return 'bg-yellow-100 text-yellow-800';
      case TaskPriority.LOW:
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-blue-900 text-gray-800';
    }
  };

  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.COMPLETED:
        return 'bg-green-100 text-green-800';
      case TaskStatus.IN_PROGRESS:
        return 'bg-blue-100 text-blue-800';
      case TaskStatus.TODO: 
        return 'bg-blue-500 text-gray-800';
      default:
        return 'bg-blue-500 text-gray-800';
    }
  };

  const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    try {
      await updateTask(task._id!, { status: e.target.value as TaskStatus });
    } catch (error) {
      console.error('Failed to update task status', error);
    }
  };

  const handleDeleteClick = () => {
    setIsConfirmingDelete(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await removeTask(task._id!);
      setIsConfirmingDelete(false);
    } catch (error) {
      console.error('Failed to delete task', error);
    }
  };

  const handleCancelDelete = () => {
    setIsConfirmingDelete(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCloseForm = () => {
    setIsEditing(false);
  };

  if (isEditing) {
    return <TaskForm task={task} onClose={handleCloseForm} />;
  }

  return (
    <div className="border rounded-lg p-4 bg-[#3e701b] shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-[#e4f7d0]">
            {task.title}
            {isPastDue(task.dueDate) && task.status !== TaskStatus.COMPLETED && (
              <span className="ml-2 text-sm font-medium px-2 py-1 rounded bg-red-100 text-red-800">
                Overdue
              </span>
            )}
          </h3>
          <p className="text-[#f3fce9] mt-1">{task.description}</p>
          
          <div className="flex flex-wrap gap-2 mt-3">
            <span className={`text-xs font-medium px-2 py-1 rounded ${getPriorityColor(task.priority)}`}>
              {task.priority}
            </span>
            <span className={`text-xs font-medium px-2 py-1 rounded ${getStatusColor(task.status)}`}>
              {task.status.replace('_', ' ')}
            </span>
            {task.dueDate && (
              <span className="text-xs font-medium px-2 py-1 rounded bg-purple-100 text-purple-800">
                Due: {formatDateForDisplay(task.dueDate)}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          {!isConfirmingDelete ? (
            <>
              <select
                value={task.status}
                onChange={handleStatusChange}
                className="border border-gray-300 rounded px-2 py-1 text-sm text-[#f3fce9]"
              >
                <option value={TaskStatus.TODO}>To Do</option>
                <option value={TaskStatus.IN_PROGRESS}>In Progress</option>
                <option value={TaskStatus.COMPLETED}>Completed</option>
              </select>
              <button
                onClick={handleEditClick}
                className="bg-[#6bb82a] text-white px-3 py-1 rounded text-sm hover:bg-green-500"
              >
                Edit
              </button>
              <button
                onClick={handleDeleteClick}
                className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
              >
                Delete
              </button>
            </>
          ) : (
            <>
              <div className="text-sm text-gray-600">Delete this task?</div>
              <button
                onClick={handleConfirmDelete}
                className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
              >
                Yes
              </button>
              <button
                onClick={handleCancelDelete}
                className="bg-gray-500 text-white px-3 py-1 rounded text-sm hover:bg-gray-600"
              >
                No
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskItem;