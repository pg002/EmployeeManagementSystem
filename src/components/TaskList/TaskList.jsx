import React from 'react';
import TaskCard from './TaskCard';

const TaskList = ({ data, onStatusChange }) => {
  return (
    <div id='tasklist' className='h-[55%] overflow-x-auto flex items-center justify-start gap-5 flex-nowrap w-full py-5 mt-10'>
      {data.tasks.map((elem, idx) => {
        if (elem.active) return <TaskCard key={idx} data={elem} index={idx} onStatusChange={onStatusChange} type='accept' />;
        if (elem.newTask) return <TaskCard key={idx} data={elem} index={idx} onStatusChange={onStatusChange} type='new' />;
        if (elem.completed) return <TaskCard key={idx} data={elem} index={idx} type='completed' />;
        if (elem.failed) return <TaskCard key={idx} data={elem} index={idx} type='failed' />;
        return null;
      })}
    </div>
  );
};

export default TaskList;
