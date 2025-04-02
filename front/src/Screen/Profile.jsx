import React, { useEffect, useState } from 'react'
import ToastMessage from '../components/ToastMessage'
import axios from 'axios'
import SaveJob from '../components/SaveJob'

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
    saved:[]
  }) 
  const [posts, setPosts] = useState([]);
  
  const getProfile = async() => {
    const response = await axios.get(`/api/user/${user.id}`)
    const data = response.data
    console.log(data.user)
    try { 
      const formatted = data.user.posts.map(post => ({
        ...post,
        // created: post.createdAt.slice(0,10),
        updated: post.updatedAt.slice(0,10),

      }))     
      setPosts(formatted)
      setUserProfile({
        name: data.user.name || '',
        username: data.user.username || '',
        title: data.user.title || '',
        company: data.user.company || '',
        email: data.user.email || '',
        aboutMe: data.user.aboutMe || '',
        saved: data.user.saved || []
      
      })
    
    } catch (error) {
      console.log(error)
    }
  }

  const savePost = async(i) => {
    try {
      const response = await axios.post(`/api/user/savepost/${i}`)
      console.log(response.data.message)
      getProfile()
      
    } catch (error) {
      console.log(error.response?.data?.message)
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
    console.log(userProfile)

  return (
    <>
      <div className='container-md my-4'>
        <ToastMessage  message={message}/>

        <div className='container bg-secondary-subtle rounded py-4 my-4 w-100'>
          <p>{userProfile.name}</p>
          <p>Username: {userProfile.username}</p>
          <span>{userProfile.title} @{userProfile.company}</span>
        </div>

        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#aboutME">
          About me
        </button>
        <a href={`/profile/${user.id}/update`} className='m-3'>
          <button type="button" className="btn btn-info">  
            Update Profile
          </button>
        </a>
        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#Saved">
          Saved Jobs
        </button>

        {/* <!-- Modal about me --> */}
        <div className="modal fade" id="aboutME" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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

        {/* <!-- Modal Saved Jobs --> */}
        <div className="modal fade" id="Saved" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Saved Jobs</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                {userProfile.saved.map(x => (
                  <div key={x._id}>
                    <a href={`/post/${x._id}`}>{x.title} At {x.company}</a>
                  </div>
                ))}
                
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>

        <div className='my-4'>
          <p>Publications</p>
          {/* <div className="container"> */}

            <div className='row'>
              {posts.slice().reverse().map(x => (
                <div className='col-md-6 col-lg-4 col-sm-12 g-sm-3 g-3' key={x._id}>
                    <div className="card g-sm-3">
                      <div className="card-body">
                        <h5 className="card-title">{x.title}</h5>
                        <p className="card-text text-truncate">{x.description}</p>
                        <p>At {x.company}</p>
                        <p>Updated: {x.updated}</p>
                        <div className='d-flex gap-2'>
                          <a href={`/post/${x._id}`} className="btn btn-primary">See Job</a>
                          <SaveJob userProfile={userProfile} x={x._id} fetch={getProfile}/>
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
