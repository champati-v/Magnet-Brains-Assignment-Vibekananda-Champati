import { priorityColor } from "../../utils/helper"
import { IoMdTime } from "react-icons/io";
import { LuPencilLine } from "react-icons/lu";
import { ImBin } from "react-icons/im";

const TaskCard = ({title, date, task, priority, onEdit, onDelete}) => {
  return (
    <div className=''>
        <div className='border border-slate-200 rounded-md p-4 h-42 w-80 relative'>
            <div className='flex items-center justify-between mb-2'>
                <h1 className='text-lg font-medium'>{title}</h1>
                <p className={`text-sm text-slate-300 rounded-full px-2 ${priorityColor(priority)}`}>{priority}</p>
            </div>
            <p className='text-sm text-slate-500'>{task?.slice(0, 60)}</p>

            <div className="flex items-center justify-between absolute bottom-4 left-4 right-4">    
                <div className="flex items-center">
                    <IoMdTime className='text-slate-500 inline mr-1' />
                    <p className='text-sm text-slate-500'>{date}</p>
                </div>
                <div className="flex items-center gap-2">
                    <LuPencilLine className='text-slate-500 hover:text-blue-500 cursor-pointer inline mr-1' onClick={() => onEdit()} />
                    <ImBin className='text-slate-500 hover:text-red-500 cursor-pointer inline' onClick={() => onDelete()} />
                </div>
            </div>    
        </div>
    </div>
  )
}

export default TaskCard