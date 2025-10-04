import Navbar from '../../components/Navbar/Navbar'
import TaskCard from '../../components/Cards/TaskCard'
import AddEditTask from './AddEditTask'
import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import toast from 'react-hot-toast';
import DeleteConfirmation from '../../components/ConfirmationModal/deleteConfirmation';

const Home = () => {

  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null
  });

  const [openDeleteModal, setOpenDeleteModal] = useState({
    isShown: false,
    type: "delete",
    data: null
  });

  const [userInfo, setUserInfo] = useState(null);
  const [tasks, setTasks] = useState([]);

  const navigate = useNavigate();

  //edit task
  const handleEdit = (taskDetails) => {
    setOpenAddEditModal({isShown: true, type: "edit", data: taskDetails})
  }

  //delete task
  const handleDelete = (taskId) => {
   setOpenDeleteModal({isShown: true, type: "delete", data: taskId})
  }

  //User info
  const getUserInfo = async () => {
    try{
      const response = await axios.get("http://localhost:5000/get-user", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      if(response.data && response.data.user){
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if(error.response.status === 401 || error.response.status === 403){ {
        localStorage.clear();
        navigate('/login');
        }
      }
    }
  }

  //get-tasks
  const getAllTasks = async () => {
    try{
      const response = await axios.get("http://localhost:5000/get-all-tasks", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      if(response.data && response.data.tasks){
        setTasks(response.data.tasks);
      }
    } catch (error) {
      console.log("*An unexpected error occurred while fetching tasks", error);
    }
  }

  const onSuccess = () => {
    toast.success("Task added successfully!");
  }

  const onDeleteSuccess = () => {
    toast.success("Task deleted successfully!");
  }

  useEffect(() => {
    getUserInfo();
    getAllTasks();
    return () => {};
  }, []);

  return (
    <>
      <Navbar userInfo={userInfo} />

      <div className="container px-14 mx-auto py-10">
        <div className='grid grid-cols-4 gap-4 mt-8'>
          {tasks && tasks.length > 0 ? (
            tasks.map((task) => (
              <TaskCard
                key={task._id}
                title={task.title}
                date={moment(task.dueDate).format('MMMM Do YYYY')}
                task={task.description}
                priority={task.priority}
                onDelete={() => handleDelete(task._id)}
                onEdit={() => handleEdit(task)}
              />
            ))
          ) : (
            <p>No tasks available</p>
          )}
        </div>
      </div>

      <button className='w-12 h-12 rounded-md flex items-center justify-center text-4xl bg-blue-500 hover:bg-blue-600 transition-colors duration-200 cursor-pointer absolute bottom-10 left-10'
      onClick={() => {
        setOpenAddEditModal({isShown: true, type: "add", data: null})
      }}
      >
         + 
      </button>

      <Modal
        isOpen = {openAddEditModal.isShown}
        onRequestClose = {() => {}}
        style = {{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }
        }}
        contentLabel="Add/Edit Task Modal"
        className="w-[40%] max-h-3/4 rounded-md mx-auto p-5 bg-zinc-800 mt-20 overflow-y-auto"
      >
        <AddEditTask
          onClose = {() => setOpenAddEditModal({isShown: false, type: "add", data: null})}
          getAllTasks = {getAllTasks}
          onSuccess = {onSuccess}
          taskData = {openAddEditModal.data}
        />
      </Modal>

      <Modal
        isOpen = {openDeleteModal.isShown}
        onRequestClose = {() => {}}
        style = {{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }
        }}
        contentLabel="Delete Modal"
        className="w-[40%] max-h-3/4 rounded-md mx-auto p-5 bg-zinc-800 mt-32 overflow-y-auto"
      >
        <DeleteConfirmation
          onClose = {() => setOpenDeleteModal({isShown: false, type: "delete", data: null})}
          getAllTasks = {getAllTasks}
          taskData = {openDeleteModal.data}
          onDeleteSuccess = {onDeleteSuccess}
        />
      </Modal>
    </>
  )
}

export default Home