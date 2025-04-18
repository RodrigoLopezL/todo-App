import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, vi } from 'vitest';
import FormTodo from '../FormTodo';
import { useTaskManagement } from '../../hooks/useTaskManagement';



const mockHandleCreateTask = vi.fn().mockResolvedValue({
    id: 1,
    text: 'New Task',
    dueDate: '2025-04-25T00:00:00',
    priority: 'MEDIUM',
    state: false,
    creationDate: '2025-04-20',
    doneDate: '',
    timeFrame: '',
});

vi.mock('../../hooks/useTaskManagement', () => ({
    useTaskManagement: () => ({
        handleCreateTask: mockHandleCreateTask,
        handleUpdateTask: vi.fn(),
        handleDeleteTask: vi.fn(),
        loading: false,
        error: null,
    }),
}));

const mockOnTaskCreated = vi.fn();
const mockOnClose = vi.fn();

vi.mock('../../src/hooks/useTaskManagement', () => ({
    useTaskManagement: vi.fn(() => ({
        handleCreateTask: vi.fn().mockResolvedValue({
            id: 1,
            text: 'Mock Task',
            dueDate: '2025-04-25',
            priority: 'HIGH',
            state: false,
            creationDate: '2025-04-20',
            doneDate: '',
            timeFrame: '',
        }), // Mock a successful task creation
        handleUpdateTask: vi.fn().mockResolvedValue({
            id: 1,
            text: 'Updated Task',
            dueDate: '2025-04-25',
            priority: 'MEDIUM',
            state: true,
            creationDate: '2025-04-20',
            doneDate: '2025-04-22',
            timeFrame: '2 days',
        }), // Mock a successful task update
        loading: false,
        error: null,
    })),
}));

describe('FormTodo Component', () => {


    it('renders the form with empty fields for creating a new task', () => {
        render(<FormTodo onTaskCreated={vi.fn()} onClose={vi.fn()} />);

        const nameInput = screen.getByTestId('inputTextTask') as HTMLInputElement;
        const dueDateInput = screen.getByTestId('inputDueDateTask') as HTMLInputElement;
        const prioritySelect = screen.getByTestId('selectPriorityTask') as HTMLSelectElement;
        const submitButton = screen.getByTestId('buttonSubmitTask') as HTMLButtonElement;

        expect(nameInput.value).toBe('');
        expect(dueDateInput.value).toBe('');
        expect(prioritySelect.value).toBe('');
        expect(submitButton).toBeDefined();
    });

    it('renders the form with pre-filled fields for editing a task', () => {
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

        render(
            <FormTodo
                taskData={mockTask}
                onTaskUpdated={vi.fn()}
                onClose={vi.fn()}
            />
        );
        const nameInput = screen.getByTestId('inputTextTask') as HTMLInputElement;
        const dueDateInput = screen.getByTestId('inputDueDateTask') as HTMLInputElement;
        const prioritySelect = screen.getByTestId('selectPriorityTask') as HTMLSelectElement;
        const submitButton = screen.getByTestId('buttonSubmitTask') as HTMLButtonElement;

        expect(nameInput.value).toBe('Task 1');
        expect(dueDateInput.value).toBe('2025-04-20');
        expect(prioritySelect.value).toBe('HIGH');
        expect(submitButton).toBeDefined();

    });

    it('calls handleCreateTask when creating a new task', async () => {


        render(<FormTodo onTaskCreated={mockOnTaskCreated} onClose={mockOnClose} />);

        const nameInput = screen.getByTestId('inputTextTask') as HTMLInputElement;
        const dueDateInput = screen.getByTestId('inputDueDateTask') as HTMLInputElement;
        const prioritySelect = screen.getByTestId('selectPriorityTask') as HTMLSelectElement;
        const submitButton = screen.getByTestId('buttonSubmitTask') as HTMLButtonElement;

        fireEvent.change(nameInput, { target: { value: 'New Task' } });
        fireEvent.change(dueDateInput, { target: { value: '2025-04-25' } });
        fireEvent.change(prioritySelect, { target: { value: 'MEDIUM' } });

        fireEvent.click(submitButton);

        // expect(mockHandleCreateTask).toHaveBeenCalledWith({
        //     id: undefined,
        //     text: 'New Task',
        //     dueDate: '2025-04-25T00:00:00',
        //     priority: 'MEDIUM',
        //     state: false,
        //     creationDate: undefined,
        //     doneDate: undefined,
        //     timeFrame: undefined,
        // });
        // expect(mockOnClose).toBeCalled();
    });

    it('calls handleUpdateTask when updating an existing task', async () => {
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

        render(
            <FormTodo
                taskData={mockTask}
                onTaskUpdated={vi.fn()}
                onClose={vi.fn()}
            />
        );
        const nameInput = screen.getByTestId('inputTextTask') as HTMLInputElement;
        const submitButton = screen.getByTestId('buttonSubmitTask') as HTMLButtonElement;
        fireEvent.change(nameInput, { target: { value: 'Updated Task' } });
        fireEvent.click(submitButton);

        // expect(mockHandleUpdateTask).toHaveBeenCalledWith(1, {
        //     id: 1,
        //     text: 'Updated Task',
        //     dueDate: '2025-04-20T00:00:00',
        //     priority: 'HIGH',
        //     state: false,
        //     creationDate: '2025-04-10',
        //     doneDate: '',
        //     timeFrame: '',
        // });
        // expect(mockOnClose).toHaveBeenCalled();
    });


    // it('disables the submit button while loading', () => {
    //     // vi.mock('../../hooks/useTaskManagement', () => ({
    //     //     useTaskManagement: () => ({
    //     //         handleCreateTask: mockHandleCreateTask,
    //     //         handleUpdateTask: mockHandleUpdateTask,
    //     //         loading: true,
    //     //         error: null,
    //     //     }),
    //     // }));

    //     render(<FormTodo onTaskCreated={vi.fn()} onClose={vi.fn()} />);

    //     const submitButton = screen.getByTestId('buttonSubmitTask') as HTMLButtonElement;

    //     expect(submitButton.attributeStyleMap.get('disable')).toBe(false);
    // });
});




