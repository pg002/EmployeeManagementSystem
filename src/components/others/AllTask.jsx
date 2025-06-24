import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthProvider';

const AllTask = () => {
  const [userData, setUserData] = useContext(AuthContext);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('employees')) || [];
    setEmployees(stored);
  }, [userData]);

  return (
    <div className='bg-[#1c1c1c] p-5 rounded mt-5'>
      <div className='bg-red-400 mb-2 py-2 px-4 flex justify-between rounded'>
        <h2 className='text-lg font-medium w-1/5'>Employee Name</h2>
        <h3 className='text-lg font-medium w-1/5'>New Task</h3>
        <h5 className='text-lg font-medium w-1/5'>Active Task</h5>
        <h5 className='text-lg font-medium w-1/5'>Completed</h5>
        <h5 className='text-lg font-medium w-1/5'>Failed</h5>
      </div>

      {employees.map((emp, idx) => (
        <div
          key={idx}
          className='border-2 border-emerald-500 mb-2 py-2 px-4 flex justify-between rounded text-white'
        >
          <h2 className='text-lg font-medium w-1/5'>{emp.firstName}</h2>
          <h3 className='text-lg font-medium w-1/5 text-blue-400'>{emp.taskCounts.newTask}</h3>
          <h5 className='text-lg font-medium w-1/5 text-yellow-400'>{emp.taskCounts.active}</h5>
          <h5 className='text-lg font-medium w-1/5'>{emp.taskCounts.completed}</h5>
          <h5 className='text-lg font-medium w-1/5 text-red-500'>{emp.taskCounts.failed}</h5>
        </div>
      ))}
    </div>
  );
};

export default AllTask;
