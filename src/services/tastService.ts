// src/services/taskService.ts
import { Task, TaskStats } from '../models/Task';
import { get, post, put, del } from './api';

export const getTasks = async (): Promise<Task[]> => {
  try {
    const response = await get('/tasks');
    return response;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Failed to fetch tasks');
  }
};

export const getTaskById = async (id: string): Promise<Task> => {
  try {
    const response = await get(`/tasks/${id}`);
    return response;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Failed to fetch task');
  }
};

export const createTask = async (task: Omit<Task, '_id'>): Promise<Task> => {
  try {
    const response = await post('/tasks', task);
    return response;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Failed to create task');
  }
};

export const updateTask = async (id: string, task: Partial<Task>): Promise<Task> => {
  try {
    const response = await put(`/tasks/${id}`, task);
    return response;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Failed to update task');
  }
};

export const deleteTask = async (id: string): Promise<void> => {
  try {
    await del(`/tasks/${id}`);
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Failed to delete task');
  }
};

export const getTaskStats = async (): Promise<TaskStats> => {
  try {
    const response = await get('/tasks/stats');
    return response;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Failed to fetch task statistics');
  }
};