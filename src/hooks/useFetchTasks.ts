import { useState, useCallback } from 'react';
import { fetchTasksApi } from '../services/apiService'; // Adjust the import path as necessary

interface Task {
    id: number;
    text: string;
    dueDate: string;
    priority: string;
    state: boolean;
    creationDate: string;
    doneDate: string;
    timeFrame: string;
}

interface ApiResponse {
    content: Task[];
    totalPages: number;
}

interface Filters {
    text?: string;
    priority?: string;
    state?: string;
}
interface UseFetchTasksResult {
    data: Task[] | null;
    error: Error | null;
    loading: boolean;
    totalPages: number;
    fetchTasks: (
        filters?: Filters,
        page?: number,
        sortby?: string
    ) => Promise<void>;
}

const useFetchTasks = (): UseFetchTasksResult => {
    const [data, setData] = useState<Task[] | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [totalPages, setTotalPages] = useState<number>(0);
    const pageSize = 10;

    const fetchTasks = useCallback(
        async (
            filters: Filters = {},
            page: number = 0,
            sortby: string = '',
        ) => {
            setLoading(true);
            setError(null);
            try {
                
                const tasks: ApiResponse = await fetchTasksApi(page, pageSize, filters, sortby);
                setData(tasks.content);
                setTotalPages(tasks.totalPages);
            } catch (err) {
                setError(err as Error);
                setData(null);
                setTotalPages(0);
                console.error("Error fetching tasks:", err);
            } finally {
                setLoading(false);
            }
        },
        [pageSize]
    );

    return { data, error, loading, totalPages, fetchTasks };
};

export default useFetchTasks;