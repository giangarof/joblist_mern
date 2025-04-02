import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ToastMessage from '../components/ToastMessage.jsx';

export default function Login() {
  const navigate = useNavigate();
  const [message, setMessage] = useState()  
  const [err, setErr] = useState();
  const [user, setUser] = useState({
      email: '',
      password: '',
    });

  const loginUser = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('/api/user/login', user);
      const profile = {
        id: response.data.profile._id,
        name: response.data.profile.name,
        username: response.data.profile.username
      }
      localStorage.setItem('profile', JSON.stringify(profile))
      sessionStorage.setItem('notification', response.data.message)
      setMessage(response.data.message)
      navigate('/');
    } catch (error) {
      console.log(error.response?.data.message)
      const err = error.response?.data?.message;
      setErr(err)
    }
  }
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  
  useEffect(() => {
    const session = sessionStorage.getItem('notification')
    if(session){
      setMessage(session)
      setTimeout(() => {
        sessionStorage.removeItem('notification');
        // console.log('hello')
    
      }, 1000)
    }
  },[])

  return (
    <>
    <div className='container-md my-4'>

      <ToastMessage message={message}/>


      <form className='my-8' onSubmit={loginUser}>
        {err && <div className="alert alert-danger">{err}</div>}
        <div>
          <label htmlFor="email" className="form-label">Email address</label>
          <input name='email' type="email" className="form-control" id="exampleInputEmail1" aria-describedby="email" value={user.email} onChange={handleChange}/>
        </div>
        <div>
          <label htmlFor="password" className="form-label">Password</label>
          <input name='password' type="password" className="form-control" id="password" aria-describedby="password" value={user.password} onChange={handleChange}/>
        </div>
        <button type='submit' className='my-4 btn text-light bg-success bg-gradient'>Login</button>
      </form>
    </div>
    </>
      
  )
}
