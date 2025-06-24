// import React, {useState,useContext} from 'react'
// import { AuthContext } from '../../context/AuthProvider'

// const CreateTask=()=>{
//     const [userData,setUserData]=useContext(AuthContext)

//     const [taskTitle,setTaskTitle]=useState('')
//     const [taskDescription,setTaskDescription]=useState('')
//     const [taskDate,setTaskDate]=useState('')
//     const [assignTo,setAssignTo]=useState('')
//     const [category,setCategory]=useState('')

//     const [newTask,setNewTask]=useState({})

//     const submitHandler=(e)=>{
//       e.preventDefault()

//       setNewTask({taskTitle,taskDescription,taskDate,category,active:false,newTask:true,failed:false,completed:false})
//       const data=userData

//       data?.forEach(function(elem){
//         if(assignTo==elem.firstName){
//           elem.tasks.push(newTask)
//           console.log(elem);
//         }
//       })
//       setUserData(data)
//       setTaskTitle('')
//       setTaskDescription('')
//       setTaskDate('')
//       setAssignTo('')
//       setCategory('')
//     }
//     return(
//         <div className='p-5 bg-[#1c1c1c] mt-5 rounded'>
//                 <form  onSubmit={(e)=>{
//                      submitHandler(e)
//                 } }className='flex flex-wrap w-full items-start justify-between'>
//                     <div className='w-1/2'>
//                       <div>
//                          <h3 className='text-sm text-gray-300 mb-0.5'>Task Title</h3>
//                           <input value={taskTitle} 
//                           onChange={(e)=>{
//                             setTaskTitle(e.target.value)
//                           }}
//                           className="-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4" type="text" placeholder='Make a UI design' />
//                        </div>
//                       <div>
//                        <h3 className='text-sm text-gray-300 mb-0.5' > Date </h3>
//                        <input  value={taskDate} onChange={(e)=>{
//                         setTaskDate(e.target.value)
//                        }}
//                        className="-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4" type="date" />
//                       </div>
//                       <div>
//                        <h3 className='text-sm text-gray-300 mb-0.5'> Assign to </h3>
//                        <input value={assignTo} onChange={(e)=>{
//                         setAssignTo(e.target.value)
//                        }}
//                        className="-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4" type="text" placeholder='employee name' />
//                       </div>
//                       <div>
//                        <h3 className='text-sm text-gray-300 mb-0.5' > Category </h3>
//                        <input value={category} onChange={(e)=>{
//                          setCategory(e.target.value)
//                        }}
//                        className="-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4 " type="text" placeholder='design, dev, etc' />   
//                       </div>
//                     </div>
                    
//                     <div className='w-2/5 flex flex-col items-start'>
//                       <h3 className='text-sm text-gray-300 mb-0.5'>Description</h3>
//                       <textarea value={taskDescription} onChange={(e)=>{
//                         setTaskDescription(e.target.value)  
//                       }}
//                       className='w-full h-44 text-sm py-2 px-4 rounded outline-none bg-transparent border-[1px] border-gray-400' name="" id="" cols="30" rows="10"></textarea>
//                       <button className='bg-emerald-500 py-3 hover:bg-emerald-600 px-5 rounded text-sm mt-4 w-full'>Create Task</button>
//                     </div>
                    
                    
//                 </form>
//             </div>
//     )
// }

// export default CreateTask

import React, { useState, useContext } from 'react';
import {AuthContext} from '../../context/AuthProvider'

const CreateTask = () => {
  const [userData, setUserData] = useContext(AuthContext); // userData.employees expected
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [assignTo, setAssignTo] = useState('');
  const [category, setCategory] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();

    const newTask = {
      taskTitle,
      taskDescription,
      taskDate,
      category,
      active: true,
      newTask: true,
      failed: false,
      completed: false,
    };

    const updatedEmployees = userData.employees.map(emp => {
      if (emp.firstName.toLowerCase() === assignTo.trim().toLowerCase()) {
        emp.tasks.push(newTask);

        // Update task counts
        emp.taskCounts.active += 1;
        emp.taskCounts.newTask += 1;

        return emp;
      }
      return emp;
    });

    // Save to context and localStorage
    const updatedData = { ...userData, employees: updatedEmployees };
    setUserData(updatedData);
    localStorage.setItem('employees', JSON.stringify(updatedEmployees));

    // Reset form
    setTaskTitle('');
    setTaskDescription('');
    setTaskDate('');
    setAssignTo('');
    setCategory('');
  };

  return (
    <div className='p-5 bg-[#1c1c1c] mt-5 rounded'>
      <form onSubmit={submitHandler} className='flex flex-wrap w-full items-start justify-between'>
        <div className='w-1/2'>
          <div>
            <h3 className='text-sm text-gray-300 mb-0.5'>Task Title</h3>
            <input
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              className="-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4"
              type="text"
              placeholder='Make a UI design'
            />
          </div>

          <div>
            <h3 className='text-sm text-gray-300 mb-0.5'>Date</h3>
            <input
              value={taskDate}
              onChange={(e) => setTaskDate(e.target.value)}
              className="-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4"
              type="date"
            />
          </div>

          <div>
            <h3 className='text-sm text-gray-300 mb-0.5'>Assign to</h3>
            <input
              value={assignTo}
              onChange={(e) => setAssignTo(e.target.value)}
              className="-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4"
              type="text"
              placeholder='employee name'
            />
          </div>

          <div>
            <h3 className='text-sm text-gray-300 mb-0.5'>Category</h3>
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4"
              type="text"
              placeholder='design, dev, etc'
            />
          </div>
        </div>

        <div className='w-2/5 flex flex-col items-start'>
          <h3 className='text-sm text-gray-300 mb-0.5'>Description</h3>
          <textarea
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            className='w-full h-44 text-sm py-2 px-4 rounded outline-none bg-transparent border-[1px] border-gray-400'
            cols="30"
            rows="10"
          />
          <button className='bg-emerald-500 py-3 hover:bg-emerald-600 px-5 rounded text-sm mt-4 w-full'>
            Create Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;

