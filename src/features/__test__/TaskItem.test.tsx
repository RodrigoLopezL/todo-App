import { render, screen, fireEvent } from '@testing-library/react';
import TaskItem from '../TaskItem';
import { vi } from 'vitest';

const mockTask = {
    id: 1,
    text: 'Task 1',
    dueDate: '2025-04-20',
    priority: 'HIGH',
    state: false,
    creationDate: '2025-04-10',
    doneDate: '',
    timeFrame: '',
};

describe('TaskItem Component', () => {
    it('renders the task item with correct data', () => {
        render(
            <TaskItem
                task={mockTask}
                onTaskUpdated={vi.fn()}
                onTaskDeleted={vi.fn()}
                onTaskStateChange={vi.fn()}
            />
        );

        expect(screen.getByText('Task 1')).toBeDefined();
        expect(screen.getByText('HIGH')).toBeDefined();
        expect(screen.getByText('2025-04-20')).toBeDefined();
    });

    it('calls onTaskStateChange when checkbox is toggled', async () => {
        const mockOnTaskStateChange = vi.fn();
        render(
            <TaskItem
                task={mockTask}
                onTaskUpdated={vi.fn()}
                onTaskDeleted={vi.fn()}
                onTaskStateChange={mockOnTaskStateChange}
            />
        );

        const checkbox = screen.getByRole('checkbox');
        fireEvent.click(checkbox);

        expect(mockOnTaskStateChange).toHaveBeenCalledWith(mockTask.id, true);
    });

    // it('calls onTaskUpdated when edit button is clicked', async () => {
    //     const mockOnTaskUpdated = vi.fn();
    //     render(
    //         <TaskItem
    //             task={mockTask}
    //             onTaskUpdated={mockOnTaskUpdated}
    //             onTaskDeleted={vi.fn()}
    //             onTaskStateChange={vi.fn()}
    //         />
    //     );

    //     const editButton = screen.getByText('E');
    //     fireEvent.click(editButton);

    //     expect(mockOnTaskUpdated).toHaveBeenCalledWith(mockTask.id, mockTask.text, mockTask.dueDate, mockTask.priority);
    // });

    // it('calls onTaskDeleted when delete button is clicked', async () => {
    //     const mockOnTaskDeleted = vi.fn();
    //     render(
    //         <TaskItem
    //             task={mockTask}
    //             onTaskUpdated={vi.fn()}
    //             onTaskDeleted={mockOnTaskDeleted}
    //             onTaskStateChange={vi.fn()}
    //         />
    //     );

    //     const deleteButton = screen.getByText('X');
    //     fireEvent.click(deleteButton);

    //     expect(mockOnTaskDeleted).toHaveBeenCalledWith(mockTask.id);
    // });

    it('opens and closes the modal when edit button is clicked', () => {
        render(
            <TaskItem
                task={mockTask}
                onTaskUpdated={vi.fn()}
                onTaskDeleted={vi.fn()}
                onTaskStateChange={vi.fn()}
            />
        );

        const editButton = screen.getByText('E') as HTMLButtonElement;
        fireEvent.click(editButton);

        expect(screen.getByText(/Update/)).toBeDefined();

        const closeButton = screen.getByText(/Update/) as HTMLButtonElement;
        fireEvent.click(closeButton);

        expect(screen.queryByText(/Update/)).toBeNull();
    });

    it('applies the correct background color based on due date', () => {
        const taskWithDueDate = { ...mockTask, dueDate: '2025-04-15' }; // Within 7 days
        render(
            <TaskItem
                task={taskWithDueDate}
                onTaskUpdated={vi.fn()}
                onTaskDeleted={vi.fn()}
                onTaskStateChange={vi.fn()}
            />
        );

        const row = screen.getByRole('row') as HTMLTableRowElement;
        expect(row.classList.contains('bg-red-200')).toBe(true);

    });
});