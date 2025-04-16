import React, { useState, useEffect } from 'react';
import { useTaskManagement } from '../hooks/useTaskManagement';

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

interface FormTodoProps {
  onTaskUpdated?: (updatedTask: Task) => void;
  onTaskCreated?: (newTask: Task) => void;
  taskData?: Task | null;
  onClose: () => void;
}

function FormTodo({ onTaskUpdated, onTaskCreated, taskData, onClose }: FormTodoProps) {
  const [text, setText] = useState<string>('');
  const [dueDate, setDueDate] = useState<string>('');
  const [priority, setPriority] = useState<string>('');
  const [errorForm, setErrorForm] = useState<string>('');
  const { handleCreateTask, handleUpdateTask, loading, error } = useTaskManagement();

  useEffect(() => {
    if (taskData) {
      setText(taskData.text || '');
      setDueDate(taskData.dueDate ? taskData.dueDate.split('T')[0] : ''); // Extract date part
      setPriority(taskData.priority || '');
    } else {
      setText('');
      setDueDate('');
      setPriority('');
    }
  }, [taskData]);

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleDueDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDueDate(event.target.value);
  };

  const handleSelectPriorityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPriority(event.target.value);
  };

  const handleSubmit = async () => {
    const task: Partial<Task> = {
      id: taskData ? taskData.id : undefined,
      text: text,
      dueDate: dueDate ? `${dueDate}T00:00:00`: undefined,
      priority: priority,
      state: taskData ? taskData.state : false,
      creationDate: taskData ? taskData.creationDate : undefined,
      doneDate: taskData ? taskData.doneDate : undefined,
      timeFrame: taskData ? taskData.timeFrame : undefined,
    };

    try {
      if (taskData && taskData.id !== undefined) {
        // Update existing task
        const updatedTask = await handleUpdateTask(taskData.id, task);
        if (onTaskUpdated) {
          onTaskUpdated(updatedTask);
        }
      } else {
        // Create new task
        const newTask = await handleCreateTask(task);
        if (onTaskCreated) {
          onTaskCreated(newTask);
        }
      }
      onClose();
    } catch (err) {
      if(!priority || !text){
        setErrorForm('Please set a priority and a name for the task');
      }
      console.error('Error creating/updating task:', err);
    }
  };

  return (
    <div className="flex flex-col items-stretch">
      <h2 className="text-xl font-bold mb-4">{taskData ? 'Edit Todo' : 'Create new Todo'}</h2>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="texto">
          Name:
        </label>
        <input
          onChange={handleTextChange}
          value={text}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="texto"
          type="text"
          placeholder="Enter task name"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fechaFin">
          Due Date:
        </label>
        <input
          onChange={handleDueDateChange}
          value={dueDate}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="fechaFin"
          type="date"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="htmlSelectPriority">
          Priority:
        </label>
        <select
          onChange={handleSelectPriorityChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="htmlSelectPriority"
          value={priority}
        >
          <option value="">Select a priority</option>
          <option value="LOW">LOW</option>
          <option value="MEDIUM">MEDIUM</option>
          <option value="HIGH">HIGH</option>
        </select>
      </div>

      {error && <p className="text-red-500 text-sm">{errorForm}</p>}

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="button"
        onClick={handleSubmit}
        disabled={loading} // Disable button while loading
      >
        {loading ? 'Processing...' : taskData ? 'Update' : '+ New to do'}
      </button>
    </div>
  );
}

export default FormTodo;