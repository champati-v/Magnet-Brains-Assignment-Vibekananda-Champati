import React from 'react'
import { useState } from 'react';
import { IoMdClose } from 'react-icons/io';

const AddEditTask = ({onClose}) => {

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [priority, setPriority] = useState("low")
    const [deadline, setDeadline] = useState("")


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
                    <p className='badge border border-green-600'>low</p>
                    <p className='badge border border-yellow-500'>medium</p>
                    <p className='badge border border-red-500'>high</p>
                </div>
            </div>

            <div className='flex items-center gap-2'>
                <label className='input-label'>Deadline</label>
                <input
                    type="date"
                    className="bg-zinc-700 p-2 rounded-sm text-slate-400 outline-none"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                />
            </div>
        </div>

        <button className='btn-primary mt-4 p-3' onClick={() => {}}>Add Task</button>
    </div>
  )
}

export default AddEditTask