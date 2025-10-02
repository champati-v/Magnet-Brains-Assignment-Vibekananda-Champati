import Navbar from '../../components/Navbar/Navbar'
import TaskCard from '../../components/Cards/TaskCard'
import AddEditTask from './AddEditTask'
import { useState } from 'react';
import Modal from 'react-modal';


const Home = () => {

  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null
  });

  return (
    <>
      <Navbar/>

      <div className="container px-14 mx-auto py-10">
        <div className='grid grid-cols-4 gap-4 mt-8'>
          <TaskCard
            title="Task 1"
            date="2023-10-01"
            task="Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus nisi expedita inventore veniam? Officiis veritatis voluptas sit, voluptatem, dolor laudantium ducimus facere molestiae perspiciatis distinctio excepturi cupiditate. Nulla animi magni iure dolore omnis veritatis in aspernatur assumenda asperiores unde voluptate voluptatibus adipisci nesciunt, esse itaque illo non quos nihil a odio. Eum dolor, cumque natus sed rem in nobis odit perspiciatis vero minima pariatur et facere, dolores dolorum, eaque accusamus? Fuga id molestiae distinctio, exercitationem neque obcaecati inventore dolorem aspernatur facilis hic? Dolore officia doloribus ipsum, magnam error consequuntur inventore, totam numquam, eligendi at odio voluptatibus deserunt voluptatem commodi repudiandae!"
            priority="low"
          />
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
        className="w-[40%] max-h-3/4 rounded-md mx-auto p-5 bg-white/10 mt-20 overflow-y-auto"
      >
        <AddEditTask
          onClose = {() => setOpenAddEditModal({isShown: false, type: "add", data: null})}
        />
      </Modal>
    </>
  )
}

export default Home