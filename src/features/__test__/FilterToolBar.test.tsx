import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, vi } from 'vitest';
import FilterToolBar from '../FilterToolBar';

describe('FilterToolBar Component', () => {
  it('renders all input fields and buttons', () => {
    render(<FilterToolBar onSearchFilter={vi.fn()} />);

    // Check if the text input is rendered
    expect(screen.getByTestId('inputTextTask')).toBeDefined();

    // Check if the priority dropdown is rendered
    expect(screen.getByTestId('selectPriorityTask')).toBeDefined();

    // Check if the state dropdown is rendered
    expect(screen.getByTestId('selectStateTask')).toBeDefined();

    // Check if the Search button is rendered
    expect(screen.getByText('Search')).toBeDefined();

    // Check if the Reset button is rendered
    expect(screen.getByText('Reset')).toBeDefined();
  });

  it('calls onSearchFilter with text filter when typing in the text input', () => {
    const mockOnSearchFilter = vi.fn();
    render(<FilterToolBar onSearchFilter={mockOnSearchFilter} />);

    const textInput = screen.getByPlaceholderText('text');
    fireEvent.change(textInput, { target: { value: 'Task 1' } });

    const searchButton = screen.getByText('Search');
    fireEvent.click(searchButton);

    expect(mockOnSearchFilter).toHaveBeenCalledWith({
      text: 'Task 1',
      priority: '',
      state: '',
    });
  });

  it('calls onSearchFilter with priority filter when selecting a priority', () => {
    const mockOnSearchFilter = vi.fn();
    render(<FilterToolBar onSearchFilter={mockOnSearchFilter} />);

    const prioritySelect = screen.getByTestId('selectPriorityTask');
    fireEvent.change(prioritySelect, { target: { value: 'HIGH' } });

    const searchButton = screen.getByText('Search');
    fireEvent.click(searchButton);

    expect(mockOnSearchFilter).toHaveBeenCalledWith({
      text: '',
      priority: 'HIGH',
      state: '',
    });
  });

  it('calls onSearchFilter with state filter when selecting a state', () => {
    const mockOnSearchFilter = vi.fn();
    render(<FilterToolBar onSearchFilter={mockOnSearchFilter} />);

    const stateSelect = screen.getByTestId('selectStateTask');
    fireEvent.change(stateSelect, { target: { value: 'true' } });

    const searchButton = screen.getByText('Search');
    fireEvent.click(searchButton);

    expect(mockOnSearchFilter).toHaveBeenCalledWith({
      text: '',
      priority: '',
      state: 'true',
    });
  });

  it('calls onSearchFilter with no filters when Reset button is clicked', () => {
    const mockOnSearchFilter = vi.fn();
    render(<FilterToolBar onSearchFilter={mockOnSearchFilter} />);

    const resetButton = screen.getByText('Reset');
    fireEvent.click(resetButton);

    expect(mockOnSearchFilter).toHaveBeenCalledWith();
  });

  it('clears other filters when typing in the text input', () => {
    const mockOnSearchFilter = vi.fn();
    render(<FilterToolBar onSearchFilter={mockOnSearchFilter} />);

    const prioritySelect = screen.getByTestId('selectPriorityTask');
    fireEvent.change(prioritySelect, { target: { value: 'HIGH' } });

    const textInput = screen.getByTestId('inputTextTask');
    fireEvent.change(textInput, { target: { value: 'Task 1' } });

    const searchButton = screen.getByText('Search');
    fireEvent.click(searchButton);

    expect(mockOnSearchFilter).toHaveBeenCalledWith({
      text: 'Task 1',
      priority: '',
      state: '',
    });
  });
});