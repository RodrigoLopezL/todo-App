
interface Task {
  id: number;
  text: string;
  dueDate: string;
  priority: string;
  state: boolean;
  creationDate: string;
  doneDate: string;
  timeFrame: string;
}

export const fetchTasksApi = async (
  page: number,
  pageSize: number,
  filters: { text?: string; priority?: string; state?: string } = {},
  // sortPriority: string | null = null,
  sortOrderPriority: 'asc' | 'desc' = 'asc',
  // sortDueDate: string | null = null,
  sortOrderDueDate: 'asc' | 'desc' = 'asc',
) => {
  let url = `http://localhost:8080/todos?page=${page}&size=${pageSize}`;

  if (filters.text) url += `&text=${filters.text}`;
  if (filters.priority) url += `&priority=${filters.priority}`;
  if (filters.state) url += `&state=${filters.state}`;
  
  url += `&sort=priority,${sortOrderPriority},dueDate,${sortOrderDueDate}`;

  const response = await fetch(url);
  if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

export const createTask = async (task: Partial<Task>): Promise<Task> => {
  const response = await fetch('http://localhost:8080/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
  });
  if (!response.ok) {
      throw new Error(`Failed to create task: ${response.statusText}`);
  }
  return response.json();
};

export const updateTask = async (taskId: number, updates: Partial<Task>): Promise<Task> => {
  const response = await fetch(`http://localhost:8080/todos/${taskId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
  });
  if (!response.ok) {
      throw new Error(`Failed to update task: ${response.statusText}`);
  }
  return response.json();
};

export const patchTaskState = async (taskId: number, action: 'done' | 'undone'): Promise<Task> => {
  const response = await fetch(`http://localhost:8080/todos/${taskId}/${action}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    throw new Error(`Failed to update task state: ${response.statusText}`);
  }

  return response.json();
};

export const deleteTask = async (taskId: number): Promise<void> => {
  const response = await fetch(`http://localhost:8080/todos/${taskId}`, {
      method: 'DELETE',
  });
  if (!response.ok) {
      throw new Error(`Failed to delete task: ${response.statusText}`);
  }
};

export const fetchTimeData = async (): Promise<TimeData> => {

  const response = await fetch('http://localhost:8080/todos/time');
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};