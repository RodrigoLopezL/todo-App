
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
interface StateTask{
  id: number;
  stats : boolean;
}

interface TimeData {
  AvgTotalTime: number;
  avgTimeLowPriority: number;
  avgTimeMediumPriority: number;
  avgTimeHighPriority: number;
}

const urlbase = 'http://localhost:9090/todos';

export const fetchTasksApi = async (
  page: number,
  pageSize: number,
  filters: { text?: string; priority?: string; state?: string } = {},
  sortby: string,
) => {
  let url = `${urlbase}?page=${page}&size=${pageSize}`;

  if (filters.text) url += `&text=${filters.text}`;
  if (filters.priority) url += `&priority=${filters.priority}`;
  if (filters.state) url += `&state=${filters.state}`;

  url += `&sort=${sortby}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

export const createTask = async (task: Partial<Task>): Promise<Task> => {
  const response = await fetch(urlbase, {
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
  const response = await fetch(`${urlbase}/${taskId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });
  if (!response.ok) {
    throw new Error(`Failed to update task: ${response.statusText}`);
  }
  return response.json();
};

export const patchTaskState = async (taskId: number, action: 'done' | 'undone'): Promise<StateTask> => {
  const response = await fetch(`${urlbase}/${taskId}/${action}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    throw new Error(`Failed to update task state: ${response.statusText}`);
  }

  return response.json();
};

export const deleteTask = async (taskId: number): Promise<void> => {
  const response = await fetch(`${urlbase}/${taskId}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error(`Failed to delete task: ${response.statusText}`);
  }
};

export const fetchTimeData = async (): Promise<TimeData> => {

  const response = await fetch(`${urlbase}/time`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};