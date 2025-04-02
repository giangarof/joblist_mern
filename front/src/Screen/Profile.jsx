import React, { useEffect, useState } from 'react'
import ToastMessage from '../components/ToastMessage'
import axios from 'axios'

export default function Profile() {
  const user = JSON.parse(localStorage.getItem('profile'))
  const [message, setMessage] = useState('')
  const [userProfile, setUserProfile] = useState({
    name: '',
    username: '',
    title: '',
    company: '',
    email: '',
    aboutMe: '',
  }) 
  const [posts, setPosts] = useState([]);
  
  const getProfile = async() => {
    const response = await axios.get(`/api/user/${user.id}`)
    const data = response.data
    try {
      
      console.log(data.user.posts)
      setPosts(data.user.posts)
      setUserProfile({
        name: data.user.name || '',
        username: data.user.username || '',
        title: data.user.title || '',
        company: data.user.company || '',
        email: data.user.email || '',
        aboutMe: data.user.aboutMe || ''
      })
    
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
      getProfile();

      const session = sessionStorage.getItem('notification')
      if(session){
        setMessage(session)
        setTimeout(() => {
          sessionStorage.removeItem('notification');
      
        }, 1000)
      }
    },[user.id])
  return (
    <>
      <div className='container-md my-4'>
        <ToastMessage  message={message}/>

        <div className='container bg-secondary-subtle rounded py-4 my-4 w-100'>
          <p>{userProfile.name}</p>
          <p>Username: {userProfile.username}</p>
          <span>{userProfile.title} @{userProfile.company}</span>
        </div>

        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
          About me
        </button>
        {/* <!-- Modal --> */}
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">About Me</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                {userProfile.aboutMe}
                <p>Currently I do work at {userProfile.company} as {userProfile.title}</p>
                
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>

        <a href={`/profile/${user.id}/update`} className='m-3'>
          <button type="button" className="btn btn-info">  
            Update Profile
          </button>
        </a>

        <div className='my-4'>
          <p>Publications</p>
          {/* <div className="container"> */}

            <div className='row'>
              {posts.map(x => (
                <div className='col-md-6 col-lg-4 col-sm-12 g-sm-3 ' key={x._id}>
                    <div className="card g-sm-3">
                      <div className="card-body">
                        <h5 className="card-title">{x.title}</h5>
                        <p className="card-text text-truncate">{x.description}</p>
                        <p>At {x.company}</p>
                        <div className='d-flex gap-2'>
                          <a href={`/post/${x._id}`} className="btn btn-primary">See Job</a>
                          <button className="btn btn-success">Save <i className="bi bi-bookmark"></i></button>
                        </div>
                      </div>
                    </div>
                </div>
              ))}
            </div>
          {/* </div> */}
        </div>
            

      </div>
    </>
  )
}
