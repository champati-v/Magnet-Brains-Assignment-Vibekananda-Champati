import ProfileInfo from "../Cards/ProfileInfo"
import { useNavigate } from "react-router-dom"

const Navbar = () => {

  const navigate = useNavigate()

  const onLogout = () => {
    navigate('/login')
  }

  return (
    <div className='flex items-center justify-between px-6 py-2'>
        <h1 className='text-2xl font-semibold'>Task Manager</h1>

        <ProfileInfo onLogout={onLogout} />
    </div>
  )
}

export default Navbar