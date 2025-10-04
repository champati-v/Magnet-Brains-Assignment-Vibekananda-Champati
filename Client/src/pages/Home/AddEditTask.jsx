import { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import axios from 'axios';
import toast from 'react-hot-toast';
import moment from 'moment';

const AddEditTask = ({onClose, getAllTasks, onSuccess, taskData}) => {

    const [title, setTitle] = useState(taskData ? taskData.title : "")
    const [description, setDescription] = useState(taskData ? taskData.description : "")
    const [priority, setPriority] = useState(taskData ? taskData.priority : "low")
    const [dueDate, setDueDate] = useState(taskData ? moment(taskData.dueDate).format('YYYY-MM-DD') : Date.now())
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")


    const addTask = async() => {
        try {
            setIsLoading(true);
            const response = await axios.post("http://localhost:5000/add-task", {
                title,
                description,
                priority,
                dueDate
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.status === 200) {
                // Task added successfull
                getAllTasks();
                onClose();
                onSuccess();
            }
        } catch (error) {
            if(error.response &&
               error.response.data &&
               error.response.data.message){
                setError(error.response.data.message);
                toast.error(error.response.data.message);
            }
        } finally {
            setIsLoading(false);
        }
    }

  return (
    <div className='relative'>
        <button className='w-8 h-8 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-700 cursor-pointer' onClick={onClose}>
            <IoMdClose className='text-xl text-slate-400' />
        </button>

        <div className="flex flex-col gap-2">
            <label className='input-label'>Task Title</label>
            <input 
                type="text" 
                className='text-2xl text-slate-400 outline-none' 
                placeholder='Go to Gym..'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
        </div>

        <div className="flex flex-col gap-2 mt-4">
            <label className='input-label'>Task Description</label>
            <textarea
                className='text-sm bg-zinc-700 p-2 rounded-sm text-slate-400 outline-none resize-none'
                placeholder='Describe your task...'
                rows={10}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
        </div>

        <div className='mt-3 flex items-center justify-between'>
            <div>
                <label className='input-label'>Set Priority</label>
                <div className='flex items-center gap-3 mt-2'>
                    <p className={`badge cursor-pointer border border-green-600 ${priority === "low"? "bg-green-600 text-white" : ""}`} onClick={() => setPriority("low")} >low</p>
                    <p className={`badge cursor-pointer border border-yellow-600 ${priority === "medium"? "bg-yellow-600 text-white" : ""}`} onClick={() => setPriority("medium")} >medium</p>
                    <p className={`badge cursor-pointer border border-red-500 ${priority === "high"? "bg-red-500 text-white" : ""}`} onClick={() => setPriority("high")} >high</p>
                </div>
            </div>

            <div className='flex items-center gap-2'>
                <label className='input-label'>Deadline</label>
                <input
                    type="date"
                    className="bg-zinc-700 p-2 rounded-sm text-slate-400 outline-none"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                />
            </div>
        </div>

        <button className='btn-primary mt-4 p-3' onClick={addTask}>{isLoading ? <span>Adding...</span> : "Add Task"}</button>
    </div>
  )
}

export default AddEditTask