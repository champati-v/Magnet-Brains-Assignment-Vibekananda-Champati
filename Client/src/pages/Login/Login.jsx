import React, { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import {Link} from 'react-router-dom'
import PasswordInput from '../../components/Input/PasswordInput'
import { validateEmail } from '../../utils/helper'

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    console.log("Button Clicked");

    if(!validateEmail(email)){
      setError('Please enter a valid email address');
      return;
    }

    if(!password){
      setError('Please enter your password');
      return;
    }

    if(password.length < 6){
      setError('Password must be at least 6 characters long');
      return;
    }

    setError('');

    //login 
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

          <button type='submit' className='btn-primary'>Login</button>

          <p className='text-sm text-center mt-4'>Not Registered Yet? {" "}
            <Link to='/signup' className='text-blue-500'>Create an Account</Link>
          </p>
        </form>
      </div>
    </div>
    </>
  )
}

export default Login