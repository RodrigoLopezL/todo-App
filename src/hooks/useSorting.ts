import { useState } from 'react';

const useSorting = () => {
    const [sortDirectionPriority, setSortDirectionPriority] = useState<'asc' | 'desc'>('asc');
    const [sortDirectionDueDate, setSortDirectionDueDate] = useState<'asc' | 'desc'>('asc');

    const handleSortChange = (column: 'priority' | 'dueDate') => {
        if (column === 'priority') {
            setSortDirectionPriority((prev) => (prev === 'asc' ? 'desc' : 'asc'));
        } else if (column === 'dueDate') {
            setSortDirectionDueDate((prev) => (prev === 'asc' ? 'desc' : 'asc'));
        }
        console.log(`Sorting by ${column} in ${column === 'priority' ? sortDirectionPriority : sortDirectionDueDate} order`);
    };

    return { sortDirectionPriority, sortDirectionDueDate, handleSortChange };
};

export default useSorting;