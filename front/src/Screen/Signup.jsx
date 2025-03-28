import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';

import axios from 'axios';

export default function Signup() {
  const navigate = useNavigate();
  const [err, setErr] = useState();
  const [user, setUser] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  });

  const createUser = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('/api/user/signup', user);
      sessionStorage.setItem('notification', response.data.message)
      console.log(response.data.message);
      navigate('/login');
    } catch (error) {
      console.log(error.response?.data.message)
      const err = error.response?.data?.message;
      setErr(err)
    }
  }

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };


  return (
    <form className='container-md my-4' onSubmit={createUser}>
        {err && <div className="alert alert-danger">{err}</div>}
       <div>
          <label htmlFor="name" className="form-label">Full name</label>
          <input name='name' type='text' className="form-control" id="name" aria-describedby="name" value={user.name} onChange={handleChange}/>
        </div>
        <div>
          <label htmlFor="username" className="form-label">Userame</label>
          <input name='username' type='text' className="form-control" id="username" aria-describedby="username" value={user.username} onChange={handleChange}/>
        </div>
        <div>
          <label htmlFor="email" className="form-label">Email address</label>
          <input name='email' type="email" className="form-control" id="email" aria-describedby="email" value={user.email} onChange={handleChange}/>
        </div>
        <div>
          <label htmlFor="password" className="form-label">Password</label>
          <input name='password' type="password" className="form-control" id="password" aria-describedby="password" value={user.password} onChange={handleChange}/>
        </div>
        <div>
          <label htmlFor="passwordConfirmation" className="form-label">Password Confirmation</label>
          <input name='passwordConfirmation' type="password" className="form-control" id="passwordConfirmation" aria-describedby="passwordConfirmation" value={user.passwordConfirmation} onChange={handleChange}/>
        </div>
        <button type='submit' className=' my-4 btn text-light bg-success bg-gradient'>Sign up</button>
      </form>
  )
}
