import axios from 'axios';


const DeleteConfirmation = ({onClose, getAllTasks, taskData, onDeleteSuccess}) => {

    const handleDelete = async () => {
            try {
            console.log("Deleting task with ID:", taskData);
            const response = await axios.delete(`http://localhost:5000/delete-task/${taskData}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.status === 200) {
                getAllTasks();
                onClose();
                onDeleteSuccess();
            }
        } catch (error) {
            console.log("*An unexpected error occurred while deleting task", error);
        }
    }

  return (
        <div className="">
            <div className="p-6 rounded shadow-lg">
                <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
                <p className="mb-6">Are you sure you want to delete this Task?</p>
                <div className="flex justify-end space-x-4">
                    <button className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400" onClick={onClose} >Cancel</button>
                    <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700" onClick={handleDelete}>Delete</button>
                </div>
            </div>
        </div>
  )
}

export default DeleteConfirmation