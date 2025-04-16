import { render, screen, fireEvent } from '@testing-library/react';
import TaskTable from '../TaskTable';
import { vi } from 'vitest';

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
    render(<TaskTable dataApi={mockData} onSortChange={vi.fn()} />);

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
});