import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

export default function Update() {
    const navigate = useNavigate();
    const profile = JSON.parse(localStorage.getItem('profile'))
    const [err, setErr] = useState();
    const [user, setUser] = useState({
        name: '',
        username:'',
        title:'',
        aboutMe:'',
        company:'',
        email:'',
        password:'',
        passwordConfirmation:''
    })


    const getUser = async() => {
        const response = await axios.get(`/api/user/${profile.id}`)
        const data = response.data?.user || {}
        console.log(data)
        setUser((prevUser) => ({
            ...prevUser,
            name: data.name ?? prevUser.name,
            username:data.username ?? prevUser.username,
            title:data.title ?? prevUser.title,
            aboutMe:data.aboutMe ?? prevUser.aboutMe,
            company:data.company ?? prevUser.company,
            email:data.email ?? prevUser.email,
            password: '',
            passwordConfirmation: ''
        }))
    }

    const updateUser = async(e) => {
        e.preventDefault()
        const data = {...user}
        try {
            const response = await axios.put(`/api/user/update/${profile.id}`, data)
            console.log(response)
            sessionStorage.setItem('notification', response.data.message)
            navigate(`/profile/${profile.id}`)
            
        } catch (error) {
            console.log(error.response?.data)
            setErr(error.response?.data)
        }
    }
    

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
      };

    useEffect(() => {
        getUser()
    }, [])
  return (
    <form className='container-md my-4' onSubmit={updateUser}>
        {err && <div className="alert alert-danger">{err}</div>}
       <div>
          <label htmlFor="name" className="form-label">Full name</label>
          <input name='name' type='text' className="form-control" id="name" aria-describedby="name" value={user.name} onChange={handleChange}/>
        </div>
        <div>
          <label htmlFor="username" className="form-label">Username</label>
          <input name='username' type='text' className="form-control" id="username" aria-describedby="username" value={user.username} onChange={handleChange}/>
        </div>
        <div>
          <label htmlFor="itle" className="form-label">Title</label>
          <input name='title' type='text' className="form-control" id="title" aria-describedby="title" value={user.title} onChange={handleChange}/>
        </div>
        <div>
          <label htmlFor="aboutMe" className="form-label">About Me</label>
          <input name='aboutMe' type='text' className="form-control" id="aboutMe" aria-describedby="aboutMe" value={user.aboutMe} onChange={handleChange}/>
        </div>
        <div>
          <label htmlFor="company" className="form-label">Company</label>
          <input name='company' type='text' className="form-control" id="company" aria-describedby="company" value={user.company} onChange={handleChange}/>
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
        <button type='submit' className=' my-4 btn text-light bg-success bg-gradient'>Save</button>
      </form>
  )
}
