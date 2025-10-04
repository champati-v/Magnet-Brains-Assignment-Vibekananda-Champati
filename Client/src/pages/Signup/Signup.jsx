import { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import PasswordInput from '../../components/Input/PasswordInput'
import {Link, useNavigate} from 'react-router-dom'
import { validateEmail } from '../../utils/helper'
import axios from 'axios'

const Signup = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if(!name || !email || !password){
      setError("*All fields are required");
      return;
    }

    if(!validateEmail(email)){
      setError("*Please enter a valid email address");
      return;
    }

    if(password.length < 6){
      setError("*Password must be at least 6 characters long");
      return;
    }

    setError("");

    //signup
    try{
      console.log("Signing up...", name, email, password);
      const response = await axios.post("http://localhost:5000/signup", {
        fullName: name,
        email: email,
        password: password,
      });


      if(response.data && response.data.error){
        setError(`*${response.data.message}`);
        return
      }

      if(response.data && response.data.accessToken){
        localStorage.setItem('token', response.data.accessToken);
        navigate('/dashboard');
      }
    } catch (error) {

      console.log("Error during signup:", error);

      if (error.response && error.response.data && error.response.data.message) {
          setError(`*${error.response.data.message}`);
      } else {
          setError('*An unexpected error occurred.');
      }
    }
  }

  return (
    <>
    <Navbar/>

    <div className='text-black flex items-center justify-center mt-28'>
      <div className='w-96 border rounded bg-white px-7 py-10'>
        <form onSubmit={handleSignup}>
          <h4 className='text-2xl mb-7'>Signup</h4>

          <input
            type="text"
            placeholder='Name'
            className='input-box'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

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

          <button type='submit' className='btn-primary'>Create Account</button>

          <p className='text-sm text-center mt-4'>Already have an account? {" "}
            <Link to='/login' className='text-blue-500 hover:underline'>Login</Link>
          </p>

          </form>
      </div>
    </div>
    </>
          
  )
}

export default Signup