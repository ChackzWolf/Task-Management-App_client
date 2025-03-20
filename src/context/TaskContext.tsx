// src/context/TaskContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Task, TaskStats } from '../models/Task';
import { getTasks, createTask, updateTask, deleteTask, getTaskStats } from '../services/tastService';
import { useAuth } from './AuthContext';
import io from 'socket.io-client';

interface TaskContextType {
    tasks: Task[];
    stats: TaskStats | null;
    isLoading: boolean;
    error: string | null;
    addTask: (task: Omit<Task, '_id' | 'createdAt' | 'userId'>) => Promise<void>;
    updateTask: (id: string, task: Partial<Task>) => Promise<void>;
    removeTask: (id: string) => Promise<void>;
    refreshTasks: () => Promise<void>;
    refreshStats: () => Promise<void>;
    clearError: () => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTask = () => {
    const context = useContext(TaskContext);
    if (context === undefined) {
        throw new Error('useTask must be used within a TaskProvider');
    }
    return context;
};

interface TaskProviderProps {
    children: ReactNode;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [stats, setStats] = useState<TaskStats | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const { user, isAuthenticated } = useAuth();
    const [socket, setSocket] = useState<any>(null);

    // Initialize socket connection
    useEffect(() => {
        if (isAuthenticated && user) {
            const newSocket = io(API_URL, {
                auth: {
                    token: localStorage.getItem('token')
                }
            });

            setSocket(newSocket);

            return () => {
                newSocket.disconnect();
            };
        }
    }, [isAuthenticated, user]);

    // Set up socket event listeners
    useEffect(() => {
        console.log('trig', socket)

        if (!socket) return;
        console.log('Socket initialized', socket);

        if (socket) {
            socket.on('taskCreated', (newTask: Task) => {
                console.log(newTask, 'newTask from socket');

                setTasks(prevTasks => [...prevTasks, newTask]);
                refreshStats();
            });

            socket.on('taskUpdated', (updatedTask: Task) => {
                console.log(updatedTask, 'updatedTask from socket');

                setTasks(prevTasks =>
                    prevTasks.map(task =>
                        task._id === updatedTask._id ? updatedTask : task
                    )
                );
                refreshStats();
            });

            socket.on("taskDeleted", (deletedTaskId:string) => {
                console.log(deletedTaskId, "deleted task _id from socket");
            
                setTasks((prevTasks) => {
                    if (!prevTasks.find((task) => task._id === deletedTaskId)) {
                        return prevTasks; // No change needed
                    }
                    return prevTasks.filter((task) => task._id !== deletedTaskId);
                });
            
                refreshStats();
            });

            return () => {
                socket.off('taskCreated');
                socket.off('taskUpdated');
                socket.off('taskDeleted');
            };
        }
    }, [socket]);

    // Load initial tasks when authenticated
    useEffect(() => {

        console.log('trig2')

        if (isAuthenticated) {
            refreshTasks();
            refreshStats();
        } else {
            setTasks([]);
            setStats(null);
        }
    }, [isAuthenticated]);

    const refreshTasks = async () => {
        if (!isAuthenticated) return;

        // setIsLoading(true);
        setError(null);
        try {
            const fetchedTasks = await getTasks();
            setTasks(fetchedTasks);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch tasks');
        } finally {
            setIsLoading(false);
        }
    };

    const refreshStats = async () => {
        if (!isAuthenticated) return;

        try {
            // const fetchedStats = await getTaskStats();
            // setStats(fetchedStats);
        } catch (err) {
            console.error('Failed to fetch task stats', err);
        }
    };

    const addTask = async (taskData: Omit<Task, '_id' | 'createdAt' | 'userId'>) => {
        setIsLoading(true);
        setError(null);
        try {
            if (!user?._id) throw new Error('User not authenticated');

            const newTask: Omit<Task, '_id'> = {
                ...taskData,
                createdAt: new Date(),
                userId: user._id
            };

            await createTask(newTask);
            // Note: We don't update the tasks array here as it will be updated via socket
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to add task');
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const editTask = async (id: string, taskData: Partial<Task>) => {
        setIsLoading(true);
        setError(null);
        try {
            await updateTask(id, taskData);
            // Note: We don't update the tasks array here as it will be updated via socket
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to update task');
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const removeTask = async (id: string) => {
        setIsLoading(true);
        setError(null);
        try {
            await deleteTask(id);
            // Note: We don't update the tasks array here as it will be updated via socket
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to delete task');
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const clearError = () => {
        setError(null);
    };

    const value = {
        tasks,
        stats,
        isLoading,
        error,
        addTask,
        updateTask: editTask,
        removeTask,
        refreshTasks,
        refreshStats,
        clearError
    };

    return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};