import { render, screen } from '@testing-library/react';
import { describe, it, vi } from 'vitest';
import Home from './Home';
import useFetchTasks from '../hooks/useFetchTasks';
import usePagination from '../hooks/usePagination';
import useSorting from '../hooks/useSorting';

vi.mock('../hooks/useFetchTasks');
vi.mock('../hooks/usePagination');
vi.mock('../hooks/useSorting');

const mockedUseFetchTasks = vi.mocked(useFetchTasks);
const mockedUsePagination = vi.mocked(usePagination);
const mockedUseSorting = vi.mocked(useSorting);

describe('Home Component', () => {
    it('renders the title', () => {
        mockedUseFetchTasks.mockReturnValue({
            data: null,
            error: null,
            loading: false,
            totalPages: 0,
            fetchTasks: vi.fn(),
        });

        mockedUsePagination.mockReturnValue({
            currentPage: 0,
            handlePageChange: vi.fn(),
        });

        mockedUseSorting.mockReturnValue({
            sortby: '',
            handleSortChange: vi.fn(),
        });

        render(<Home />);
        expect(screen.getByText('Welcome to the Todo App')).toBeDefined();
    });

    it('displays an error message when there is an error', () => {
        mockedUseFetchTasks.mockReturnValue({
            data: null,
            error: { name: 'FetchError', message: 'Failed to fetch tasks' },
            loading: false,
            totalPages: 0,
            fetchTasks: vi.fn(),
        });

        render(<Home />);
        expect(screen.getByText('Error loading tasks: Failed to fetch tasks')).toBeDefined();
    });

    it('renders loading state when tasks are being fetched', () => {
        mockedUseFetchTasks.mockReturnValue({
            data: null,
            error: null,
            loading: true,
            totalPages: 0,
            fetchTasks: vi.fn(),
        });

        render(<Home />);
        expect(screen.queryByText('Welcome to the Todo App')).toBeDefined();
    });

    it('renders TaskTable, PaginationControls, and FilterToolBar components', () => {
        mockedUseFetchTasks.mockReturnValue({
            data: [],
            error: null,
            loading: false,
            totalPages: 1,
            fetchTasks: vi.fn(),
        });

        mockedUsePagination.mockReturnValue({
            currentPage: 0,
            handlePageChange: vi.fn(),
        });

        mockedUseSorting.mockReturnValue({
            sortby: '',
            handleSortChange: vi.fn(),
        });

        render(<Home />);
        expect(screen.getByText('+ New To do')).toBeDefined();
        expect(screen.getByText('Previous')).toBeDefined();
        expect(screen.getByText('Next')).toBeDefined();
    });

    it('handles page change and triggers fetchTasks', () => {
        const fetchTasksMock = vi.fn();
        const handlePageChangeMock = vi.fn();
    
        mockedUseFetchTasks.mockReturnValue({
            data: [],
            error: null,
            loading: false,
            totalPages: 2,
            fetchTasks: fetchTasksMock,
        });
    
        mockedUsePagination.mockReturnValue({
            currentPage: 0,
            handlePageChange: handlePageChangeMock,
        });
    
        render(<Home />);
        const nextButton = screen.getByText('Next');
        nextButton.click();
    
        expect(handlePageChangeMock).toHaveBeenCalled();
    });

    it('handles sort change and triggers fetchTasks', () => {
        const fetchTasksMock = vi.fn();
        const handleSortChangeMock = vi.fn();
    
        mockedUseFetchTasks.mockReturnValue({
            data: [],
            error: null,
            loading: false,
            totalPages: 1,
            fetchTasks: fetchTasksMock,
        });
    
        mockedUseSorting.mockReturnValue({
            sortby: 'Priority',
            handleSortChange: handleSortChangeMock,
        });
    
        render(<Home />);
        const priorityHeader = screen.getByTestId('header-priority'); // Assuming you have a test ID for the header
        priorityHeader.click();
    
        expect(fetchTasksMock).toHaveBeenCalled();
    });
});