import { useEffect, useRef, useState } from 'react';
import useFetchTasks from './hooks/useFetchTasks';
import usePagination from './hooks/usePagination';
import useSorting from './hooks/useSorting';
import TaskTable from './features/TaskTable';
import PaginationControls from './UI/PaginationControls';
import FilterToolBar from './features/FilterToolBar';
import TimeBar from './features/TimeBar';

function Home() {
    const { data, error, loading, totalPages, fetchTasks } = useFetchTasks();
    const { currentPage, handlePageChange } = usePagination();
    const { sortby, handleSortChange } = useSorting();
    const [shouldFetch, setShouldFetch] = useState(true);

    // Function to handle filters from FilterToolBar
    const handleSearchFilter = (filters?: { text?: string; priority?: string; state?: string }) => {
        fetchTasks(filters || {}, currentPage, sortby);
    };

    useEffect(() => {
        if (shouldFetch) {
            fetchTasks({}, currentPage, sortby);
            setShouldFetch(false);
        }
    }, [currentPage, sortby, fetchTasks, shouldFetch]);

    if (loading) return <p>Loading tasks to page</p>;
    if (error) return <p>Error loading tasks: {error.message}</p>;

    return (
        <div className="w-full h-fit">
            <h1 className="text-2xl font-bold mb-4 m-3">Welcome to the Todo App</h1>

            <FilterToolBar onSearchFilter={handleSearchFilter} />

            <TaskTable
                dataApi={data}
                onSortChange={handleSortChange}
                sortby={sortby}
            />

            <PaginationControls
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />

            <TimeBar />
        </div>
    );
}

export default Home;