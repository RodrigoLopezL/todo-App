import { useState } from 'react';

const usePagination = (initialPage: number = 0) => {
    const [currentPage, setCurrentPage] = useState<number>(initialPage);

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    return { currentPage, handlePageChange };
};

export default usePagination;