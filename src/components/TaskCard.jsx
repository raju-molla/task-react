import React, { useState } from 'react';
import Button from './Button';

function TaskCard({ task,onDelete,onEdit,onCompleteTask }) {
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
    const updatedIsComplete = !isComplete;
    setIsComplete(updatedIsComplete);
  
    onCompleteTask();
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
