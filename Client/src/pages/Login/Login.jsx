import { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import {Link, useNavigate} from 'react-router-dom'
import PasswordInput from '../../components/Input/PasswordInput'
import { validateEmail } from '../../utils/helper'
import axiosInstance from '../../utils/axiosInstance'
import axios from 'axios'
import { FaSpinner } from "react-icons/fa";

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();


    if(!validateEmail(email)){
      setError('*Please enter a valid email address');
      return;
    }

    if(!password){
      setError('*Please enter your password');
      return;
    }

    if(password.length < 6){
      setError('*Password must be at least 6 characters long');
      return;
    }

    setError('');

    //login 
    try{
      setIsLoading(true);
      const response = await axios.post("http://localhost:5000/login", {
        email: email,
        password: password
      });

      if(response.data && response.data.accessToken){
        localStorage.setItem('token', response.data.accessToken);
        navigate('/dashboard');
      }
    } catch (error) {
      if (error.response?.data?.message) {
          setError(`*${error.response.data.message}`);
        } else if (error.response?.data?.error) {
          setError(`*${error.response.data.error}`);
        } else {
          setError('*An unexpected error occurred.');
        }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
    <Navbar/>

    <div className='text-black flex items-center justify-center mt-28'>
      <div className='w-96 border rounded bg-white px-7 py-10'>
        <form onSubmit={handleLogin}>
          <h4 className='text-2xl mb-7'>Login</h4>
          <input 
            type="text" 
            placeholder='Email' 
            className='input-box' 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className='text-red-500 text-sm'>{error}</p>}

          <button type='submit' className='btn-primary flex items-center gap-2 justify-center'>Login {isLoading && <span className='loader'> <FaSpinner className='inline h-4 w-4 animate-spin' /> </span>}</button>

          <p className='text-sm text-center mt-4'>Not Registered Yet? {" "}
            <Link to='/signup' className='text-blue-500 hover:underline'>Create an Account</Link>
          </p>
        </form>
      </div>
    </div>
    </>
  )
}

export default Login