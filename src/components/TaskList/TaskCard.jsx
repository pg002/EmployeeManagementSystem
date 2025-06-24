import React from 'react';

const TaskCard = ({ data, index, onStatusChange, type }) => {
  const statusLabel = {
    completed: 'Completed Task',
    failed: 'Failed Task',
  }[type];

  return (
    <div className='flex-shrink-0 w-80 p-5 bg-white text-black rounded-lg shadow-md'>
      <div className='flex justify-between items-center'>
        <span className='text-xs font-semibold text-white bg-indigo-600 px-2 py-1 rounded'>{data.category}</span>
        <span className='text-xs text-gray-600'>{data.taskDate}</span>
      </div>
      <h2 className='mt-4 text-xl font-bold'>{data.taskTitle}</h2>
      <p className='text-sm text-gray-700 mt-2'>{data.taskDescription}</p>

      {type === 'accept' && (
        <div className='flex justify-between mt-5'>
          <button
            onClick={() => onStatusChange(index, 'completed')}
            className='bg-green-600 text-white py-1 px-3 text-xs rounded hover:bg-green-700'
          >
            Mark as Completed
          </button>
          <button
            onClick={() => onStatusChange(index, 'failed')}
            className='bg-red-500 text-white py-1 px-3 text-xs rounded hover:bg-red-600'
          >
            Mark as Failed
          </button>
        </div>
      )}

      {type === 'new' && (
        <div className='mt-5'>
          <button
            onClick={() => onStatusChange(index, 'active')}
            className='w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 text-sm'
          >
            Accept Task
          </button>
        </div>
      )}

      {(type === 'completed' || type === 'failed') && (
        <div className='mt-4'>
          <button className='w-full py-2 bg-gray-300 text-gray-800 rounded text-sm' disabled>
            {statusLabel}
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskCard;