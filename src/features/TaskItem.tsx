import React, { useState } from 'react';
import Modal from '../UI/Modal';
import { useTaskManagement } from '../hooks/useTaskManagement';
import FormTodo from './FormTodo';

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

interface TaskItemProps {
  task: Task;
  onTaskUpdated: (updatedTask: Task) => void; // Callback to notify parent of updates
  onTaskDeleted: (taskId: number) => void;   // Callback to notify parent of deletions
  onTaskStateChange: (taskId: number, isChecked: boolean) => void; // Callback to notify parent of state changes
}

function TaskItem({ task, onTaskUpdated, onTaskDeleted,onTaskStateChange }: TaskItemProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

  const { handleUpdateTask, handleDeleteTask, loading } = useTaskManagement();

  const openModal = (taskToEdit: Task) => {
    setTaskToEdit(taskToEdit);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTaskToEdit(null);
  };

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const taskId = parseInt(event.target.id);
    const isChecked = event.target.checked;

    try {
      await onTaskStateChange(taskId, isChecked); // Call the parent function to update the state
    } catch (err) {
      console.error('Error updating task state:', err);
    }
  };

  const handleDelete = async () => {
    try {
      await handleDeleteTask(task.id);
      onTaskDeleted(task.id); // Notify parent of the deletion
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  return (
    <tr>
      <th className="border border-gray-400">
        <input
          id={String(task.id)}
          type="checkbox"
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          checked={task.state}
          onChange={handleChange}
          disabled={loading} // Disable while loading
        />
      </th>
      <th className="border border-gray-400">{task.text}</th>
      <th className="border border-gray-400">{task.priority}</th>
      <th className="border border-gray-400">{task.dueDate ? task.dueDate.split('T')[0] : "-"}</th>
      <th className="border border-gray-400">
        <button
          onClick={handleDelete}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 m-2 rounded focus:outline-none focus:shadow-outline"
          type="button"
          disabled={loading} // Disable while loading
        >
          X
        </button>
        <button
          onClick={() => openModal(task)}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-3 m-2 rounded focus:outline-none focus:shadow-outline"
          type="button"
        >
          E
        </button>
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <FormTodo onTaskUpdated={onTaskUpdated} taskData={task} onClose={closeModal} />
        </Modal>
      </th>
    </tr>
  );
}

export default TaskItem;