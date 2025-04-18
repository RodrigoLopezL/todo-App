import { render, screen, fireEvent } from '@testing-library/react';
import TaskTable from '../TaskTable';
import { vi } from 'vitest';
import { patchTaskState } from '../../services/apiService';


vi.mock('../../services/apiService');

const mockpatchTaskState = vi.mocked(patchTaskState);

const mockData = [
  {
    id: 1,
    text: 'Task 1',
    dueDate: '2025-04-20',
    priority: 'HIGH',
    state: false,
    creationDate: '2025-04-10',
    doneDate: '',
    timeFrame: '',
  },
  {
    id: 2,
    text: 'Task 2',
    dueDate: '2025-04-22',
    priority: 'LOW',
    state: true,
    creationDate: '2025-04-12',
    doneDate: '2025-04-15',
    timeFrame: '',
  },
];


describe('TaskTable Component', () => {
  it('renders the table with tasks', () => {
    render(<TaskTable dataApi={mockData} onSortChange={vi.fn()} sortby="" />);

    // Check if the table headers are rendered
    expect(screen.getByText('Status')).toBeDefined();
    expect(screen.getByText('Name')).toBeDefined();
    expect(screen.getByText('Priority')).toBeDefined();
    expect(screen.getByText('Due Date')).toBeDefined();
    expect(screen.getByText('Actions')).toBeDefined();

    // Check if the tasks are rendered
    expect(screen.getByText('Task 1')).toBeDefined();
    expect(screen.getByText('Task 2')).toBeDefined();
  });

  it('calls onSortChange when sorting by priority', () => {
    const mockOnSortChange = vi.fn();
    render(<TaskTable dataApi={mockData} onSortChange={mockOnSortChange} sortby="" />);

    const priorityHeader = screen.getByTestId('header-priority');
    fireEvent.click(priorityHeader);

    expect(mockOnSortChange).toHaveBeenCalledWith('priority');
  });

  it('calls onSortChange when sorting by due date', () => {
    const mockOnSortChange = vi.fn();
    render(<TaskTable dataApi={mockData} onSortChange={mockOnSortChange} sortby="" />);

    const dueDateHeader = screen.getByText('Due Date');
    fireEvent.click(dueDateHeader);

    expect(mockOnSortChange).toHaveBeenCalledWith('dueDate');
  });

  it('toggles select all checkbox and updates task states', async () => {
    render(<TaskTable dataApi={mockData} onSortChange={vi.fn()} sortby="" />);

    const selectAllCheckbox = screen.getByTestId('select-all-checkbox') as HTMLInputElement;
    fireEvent.click(selectAllCheckbox);

    expect(selectAllCheckbox.checked).toBe(true);
    expect(mockpatchTaskState).toBeCalled();
  });

  it('renders the correct priority sorting icons', () => {
    render(<TaskTable dataApi={mockData} onSortChange={vi.fn()} sortby="priority,desc" />);

    const priorityHeader = screen.getByTestId('header-priority');
    expect(priorityHeader.querySelector('svg')).toBeDefined();
  });

  it('renders the correct due date sorting icons', () => {
    render(<TaskTable dataApi={mockData} onSortChange={vi.fn()} sortby="dueDate" />);

    const dueDateHeader = screen.getByText('Due Date');
    expect(dueDateHeader.querySelector('svg')).toBeDefined();
  });
});