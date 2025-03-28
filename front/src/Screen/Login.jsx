import React, { useState, useEffect } from 'react'
import axios from 'axios';

import { Toast } from 'bootstrap/dist/js/bootstrap.bundle.min';

export default function Login() {
  const session = sessionStorage.getItem('notification')
  const [message, setMessage] = useState('');
  const [err, setErr] = useState();
  const [user, setUser] = useState({
      email: '',
      password: '',
    });

  const loginUser = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('/api/user/login', user);
      // sessionStorage.setItem('notification', response.data.message)
      console.log(response.data.message);
      // navigate('/login');
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
    if(session){
      setMessage(session)
      sessionStorage.removeItem('notification')
    }

    setTimeout(() => {

      const toastEl = document.getElementById('liveToast');
      if (toastEl) {
        const toast = new Toast(toastEl, { delay: 3000, autohide: true });
        toast.show();
      }
    },100)
  }, []);
  
  return (
    <>
    <div className='container-md my-4'>
      {message && (
        <div className='d-flex justify-content-center align-items-center w-100 text-light ' aria-live="polite" aria-atomic="true">

          <div className='toast rounded bg-success' id='liveToast'>

            <div className='toast-header'>
              <strong>Notification</strong>
            </div>
            <div className='toast-body'>
              {message}, Please log in.
            </div>

          </div>
        </div>

      )}


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
