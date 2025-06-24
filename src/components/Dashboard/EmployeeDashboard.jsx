import React, { useState } from 'react';
import Header from '../others/header';
import TaskListNumbers from '../others/TaskListNumbers';
import TaskList from '../TaskList/TaskList';

const EmployeeDashboard = (props) => {
  const [data, setData] = useState(props.data);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleStatusChange = (index, status) => {
    const updatedData = { ...data };
    const task = updatedData.tasks[index];

    task.active = false;
    task.newTask = false;
    task.completed = false;
    task.failed = false;

    if (status === 'active') task.active = true;
    else if (status === 'completed') task.completed = true;
    else if (status === 'failed') task.failed = true;

    const taskCounts = { active: 0, newTask: 0, completed: 0, failed: 0 };
    updatedData.tasks.forEach((t) => {
      if (t.active) taskCounts.active++;
      if (t.newTask) taskCounts.newTask++;
      if (t.completed) taskCounts.completed++;
      if (t.failed) taskCounts.failed++;
    });

    updatedData.taskCounts = taskCounts;
    setData(updatedData);

    const employees = JSON.parse(localStorage.getItem('employees')) || [];
    const updatedEmployees = employees.map((emp) =>
      emp.email === updatedData.email ? updatedData : emp
    );
    localStorage.setItem('employees', JSON.stringify(updatedEmployees));
  };

  const filterTasks = () => {
    if (!selectedCategory) return data.tasks;
    return data.tasks.filter((t) => t[selectedCategory]);
  };

  const categoryLabelMap = {
    active: 'Active Tasks',
    newTask: 'New Tasks',
    completed: 'Completed Tasks',
    failed: 'Failed Tasks',
  };

  return (
    <div className='p-10 bg-[#1C1C1C] min-h-screen'>
      <Header changeUser={props.changeUser} data={data} />

      {/* Task Filter Boxes */}
      <div className='flex mt-10 justify-between gap-5 screen cursor-pointer'>
        {['active', 'newTask', 'completed', 'failed'].map((cat) => (
          <div
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`h-40 rounded-xl w-[45%] py-6 px-9 ${
              cat === 'active'
                ? 'bg-red-400'
                : cat === 'newTask'
                ? 'bg-blue-400'
                : cat === 'completed'
                ? 'bg-green-400'
                : 'bg-yellow-400'
            }`}
          >
            <h2 className='text-3xl font-semibold'>{data.taskCounts[cat]}</h2>
            <h3 className='text-xl font-medium'>
              {categoryLabelMap[cat].replace('Tasks', 'Task')}
            </h3>
          </div>
        ))}
      </div>

      {/* Selected Filter Heading */}
      {selectedCategory && (
        <div className='text-white mt-10 mb-2 text-xl font-semibold'>
          Showing {filterTasks().length} {categoryLabelMap[selectedCategory]}
        </div>
      )}

      {/* Task List */}
      <TaskList data={{ ...data, tasks: filterTasks() }} onStatusChange={handleStatusChange} />
    </div>
  );
};

export default EmployeeDashboard;