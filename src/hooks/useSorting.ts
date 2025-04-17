import { useState } from 'react';

const useSorting = () => {
    const [sortby, setSortby] = useState<string>('');
    const handleSortChange = (sortby: string) => {
        setSortby(sortby);
        console.log(`Sorting by sort=${sortby}`);
    };

    return { sortby, handleSortChange };
};

export default useSorting;