import { useState, useEffect } from 'react';
import FormTodo from './FormTodo';
import TaskItem from './TaskItem';
import Modal from '../UI/Modal';
import useModal from '../hooks/useModal';
import { patchTaskState } from '../services/apiService'; // Import the patch function
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

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

interface TaskTableProps {
    dataApi: Task[] | null;
    onSortChange: (sortby: string) => void;
    sortby: string;
}

function TaskTable({ dataApi, onSortChange, sortby }: TaskTableProps) {
    const [data, setData] = useState<Task[] | null>(dataApi);
    const { isModalOpen, openModal, closeModal } = useModal();
    const [selectAll, setSelectAll] = useState(false); // State for the header checkbox

    useEffect(() => {
        setData(dataApi);
    }, [dataApi]);

    const handleTaskCreated = (newTask: Task) => {
        setData((prevData) => (prevData ? [...prevData, newTask] : [newTask]));
    };

    const handleTaskUpdated = (updatedTask: Task) => {
        setData((prevData) =>
            prevData ? prevData.map((task) => (task.id === updatedTask.id ? updatedTask : task)) : null
        );
    };

    const handleTaskDeleted = (taskId: number) => {
        setData((prevData) => (prevData ? prevData.filter((task) => task.id !== taskId) : null));
    };

    // New function to handle task state updates
    const handleTaskStateChange = async (taskId: number, isChecked: boolean) => {
        const action = isChecked ? 'done' : 'undone'; // Determine the action based on the checkbox state
        try {
            await patchTaskState(taskId, action);
            setData((prevData) =>
                prevData ? prevData.map((task) => (task.id === taskId ? { ...task, state: isChecked } : task)) : null
            );
        } catch (error) {
            console.error('Error updating task state:', error);
        }
    };

    const handleSortChange = (column: string) => {

        if (column === 'priority') {
            if (sortby === '') {
                sortby = 'priority'; // First state: ascending
            } else if (sortby.includes('priority,desc')) {
                sortby = sortby.replace('priority,desc', ''); // Second state: descending
            } else if (sortby.includes('priority')) {
                sortby = sortby.replace('priority', 'priority,desc'); // Second state: descending
            } else {
                sortby += ',priority'; // Third state: ascending again
            }
        }

        if (column === 'dueDate') {
            if (sortby === '') {
                sortby = 'dueDate'; // First state: ascending
            } else if (sortby.includes('dueDate,desc')) {
                sortby = sortby.replace('dueDate,desc', ''); // Second state: descending
            } else if (sortby.includes('dueDate')) {
                sortby = sortby.replace('dueDate', 'dueDate,desc'); // Second state: descending
            } else {
                sortby += ',dueDate'; // Third state: ascending again
            }
        }

        onSortChange(sortby); // Call the parent function with the new sortby value
    }

    const handleSelectAllChange = async (isChecked: boolean) => {
        setSelectAll(isChecked);
        if (data) {
            try {
                const updatedTasks = await Promise.all(
                    data.map((task) =>
                        patchTaskState(task.id, isChecked ? 'done' : 'undone').then(() => ({
                            ...task,
                            state: isChecked,
                        }))
                    )
                );
                
                setData(updatedTasks);
            } catch (error) {
                console.error('Error updating all task states:', error);
            }
        }
    };

    return (
        <div className="m-4">
            <div className="flex justify-between mb-4">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={() => openModal()}
                >
                    + New To do
                </button>
            </div>
            {isModalOpen && (
                <Modal isOpen={isModalOpen} onClose={closeModal}>
                    <FormTodo onTaskCreated={handleTaskCreated} onClose={closeModal} />
                </Modal>
            )}
            <table className="w-full border-collapse border border-gray-400">
                <thead>
                    <tr>
                        <th className="border border-gray-400">
                            <input
                                data-testid='select-all-checkbox'
                                type="checkbox"
                                className="w-fit h-fit mr-2 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                checked={selectAll}
                                onChange={(e) => handleSelectAllChange(e.target.checked)}
                            />
                            Status
                        </th>
                        <th className="border border-gray-400">Name</th>
                        <th
                            data-testid='header-priority'
                            className="border border-gray-400 cursor-pointer"
                            onClick={() => handleSortChange('priority')}
                        >
                            <div className='text-center border border-black'>
                                <span>Priority</span>
                                <span>
                                    {
                                        sortby.includes('priority,desc') ?
                                            (
                                                <FaArrowUp className='inline-block' />
                                            ) :
                                            sortby.includes('priority') ?
                                                (
                                                    <FaArrowDown className='inline-block' />
                                                ) :
                                                <></>
                                    }
                                </span>
                            </div>


                        </th>
                        <th
                            className="text-center border border-black"
                            onClick={() => handleSortChange('dueDate')}
                        >
                            <div className='text-center border border-black'>
                                <span>Due Date</span>
                                <span>
                                    {
                                        sortby.includes('dueDate,desc') ?
                                            (
                                                <FaArrowUp className='inline-block' />
                                            ) :
                                            sortby.includes('dueDate') ?
                                                (
                                                    <FaArrowDown className='inline-block' />
                                                ) :
                                                <></>
                                    }
                                </span>
                            </div>

                        </th>
                        <th className="border border-gray-400">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data &&
                        data.map((task) => (
                            <TaskItem
                                key={task.id}
                                task={task}
                                onTaskUpdated={handleTaskUpdated} // Pass the callback for updates
                                onTaskDeleted={handleTaskDeleted} // Pass the callback for deletions
                                onTaskStateChange={handleTaskStateChange} // Pass the callback for state changes
                            />
                        ))}
                </tbody>
            </table>
        </div>
    );
}

export default TaskTable;