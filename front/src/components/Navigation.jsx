import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Toast } from 'bootstrap/dist/js/bootstrap.bundle.min';

export default function Navigation() {
  const navigate = useNavigate()
  const [data, setData] = useState('')
  const user = JSON.parse(localStorage.getItem('profile'))

  const logout = async() => {
    try {
      const response = await axios.post('/api/user/logout')
      sessionStorage.setItem('notification', response.data.message)
      localStorage.removeItem('profile')
      navigate('/login')
      
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {

  },[])
  
  return (
    <> 
      <nav className='navbar navbar-expand-sm bg-primary'>
        <div className='container-fluid'>
          <div className='container-fluid d-flex justify-content-between align-items-center'>
            <a className='navbar-brand text-white' href="/">JobList</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
          <div className="collapse navbar-collapse navbar-nav" id="navbarScroll">
            <div className='gap-2 text-center'>
              {user ? (
                <>
                  <a className='navbar-brand text-white' href={`/profile/${user.id}`}>{user.name}</a>
                  <a className='navbar-brand text-white' href="/create">Create Post</a>
                  <a className='navbar-brand text-white' onClick={logout}>Logout</a>
                </>
              ) : ( 
                  <>
                    <a className='navbar-brand text-white' href="/login">Login</a>
                    <a className='navbar-brand text-white' href="/signup">SignUp</a>
                  </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

