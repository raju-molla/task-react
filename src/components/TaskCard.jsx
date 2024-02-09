import React, { useState } from 'react';
import ModalForAddTask from './AddTask';
import Button from './Button';

function TaskCard({ task,onDelete,onEdit }) {
  let backgroundColor;
  switch (task.priority) {
    case 'high':
      backgroundColor = 'bg-red-300';
      break;
    case 'medium':
      backgroundColor = 'bg-yellow-300';
      break;
    case 'low':
      backgroundColor = 'bg-green-300';
      break;
    default:
      backgroundColor = 'bg-gray-300';
  }

  const [isComplete, setIsComplete] = useState(task.isComplete);
  const [isEdit, setIsEdit] = useState(false)


  const completionStatus = isComplete ? 'Complete' : 'Incomplete';

  const handleChecked = () => {
    setIsComplete(!isComplete);
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    const updatedTasks = storedTasks.map(storedTask => {
      if (storedTask.id === task.id) {
        return { ...storedTask, isComplete: !isComplete };
      }
      return storedTask;
    });
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };
  const handleDelete = (task) => {
    onDelete();
  };
  const handleEdit = () => {
    onEdit(true);
    
  }
  return (
    
    <div className={`p-5 relative ${backgroundColor}`}>
        
      <p>Title: {task.title}</p>
      <p>Description: {task.description}</p>
      <p>Priority: {task.priority}</p>
      <div className='flex flex-row gap-8 items-center'>
        <p>Status: {completionStatus}</p>
        <input 
            type='checkbox'
            checked={isComplete}
            onChange={handleChecked}
        />
      </div>
      {/* Absolute positioning for the button container */}
      <div className='absolute bottom-0 right-0 mb-2 mr-2'>
        <Button
            title="Delete"
            color="danger"
            size="small"
            onClick={()=>handleDelete(task)}
        />
      </div>
      <div className='absolute top-0 right-0 mt-2 mr-2'>
        <Button
            title="Edit"
            color="secondary"
            size="small"
            onClick={handleEdit}
        />
      </div>
      
    </div>
  );
}

export default TaskCard;
