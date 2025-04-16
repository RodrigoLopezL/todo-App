import { useState } from 'react';
import { createTask, updateTask, deleteTask } from '../services/apiService';

export const useTaskManagement = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleCreateTask = async (task: Partial<Task>) => {
        setLoading(true);
        setError(null);
        try {
            const newTask = await createTask(task);
            return newTask;
        } catch (err) {
            setError((err as Error).message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateTask = async (taskId: number, updates: Partial<Task>) => {
        setLoading(true);
        setError(null);
        try {
            const updatedTask = await updateTask(taskId, updates);
            return updatedTask;
        } catch (err) {
            setError((err as Error).message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteTask = async (taskId: number) => {
        setLoading(true);
        setError(null);
        try {
            await deleteTask(taskId);
        } catch (err) {
            setError((err as Error).message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { handleCreateTask, handleUpdateTask, handleDeleteTask, loading, error };
};