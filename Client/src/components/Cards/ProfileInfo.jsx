import React from 'react'
import { FaUser } from "react-icons/fa";

const ProfileInfo = ({onLogout}) => {
  return (
    <div className='flex items-center gap-4'>
        <div className='w-8 h-8 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100'>
            <FaUser className='w-4 h-4'/>
        </div>

        <div>
            <p className='text-sm font-medium'>Vibekananda</p>
            <button className='text-sm text-slate-300 underline cursor-pointer' onClick={onLogout}>
                Logout
            </button>
        </div>
    </div>
  )
}

export default ProfileInfo