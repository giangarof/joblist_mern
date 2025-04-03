import React, { useEffect, useState } from 'react'
import ToastMessage from '../components/ToastMessage'
import axios from 'axios'
import SaveJob from '../components/SaveJob'
import ApplyToJob from '../components/ApplyToJob'

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
    saved:[],
    applied:[],
    applicants:[]
  }) 
  const [posts, setPosts] = useState([]);
  
  const getProfile = async() => {
    const response = await axios.get(`/api/user/${user.id}`)
    const data = response.data
    console.log(data.user.posts)
    try { 
      const formatted = data.user.posts.map(post => ({
        ...post,
        // created: post.createdAt.slice(0,10),
        updated: post.updatedAt.slice(0,10),
        applicants: post.applicants

      }))     
      setPosts(formatted)
      setUserProfile({
        name: data.user.name || '',
        username: data.user.username || '',
        title: data.user.title || '',
        company: data.user.company || '',
        email: data.user.email || '',
        aboutMe: data.user.aboutMe || '',
        saved: data.user.saved || [],
        applied: data.user.applied || [],
        applicants: data.user.posts.applicants || []
      
      })
    
    } catch (error) {
      console.log(error)
    }
  }
  // console.log(posts.map(post => post.applicants.length)) 

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
    // console.log(userProfile)

  return (
    <>
      <div className='container-md my-4'>
        <ToastMessage  message={message}/>

        <div className='container bg-secondary-subtle rounded py-4 my-4 w-100'>
          <p>{userProfile.name}</p>
          <p>Username: {userProfile.username}</p>
          <span>{userProfile.title} @{userProfile.company}</span>
        </div>

        <div className='d-flex flex-row justify-center gap-1'>
          <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#aboutME">
            About me
          </button>
          <a href={`/profile/${user.id}/update`}>
            <button type="button" className="btn btn-info">  
              Update Profile
            </button>
          </a>
          <button type="button" className="btn btn-primary " data-bs-toggle="modal" data-bs-target="#Saved">
            Saved Jobs
          </button>

          <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#application">
            My applications
          </button>

          <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#applicants">
            Job Applicants
          </button>
        </div>

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

        {/* <!-- Modal Applications --> */}
        <div className="modal fade" id="application" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Current applications</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                {userProfile.applied.map(x => (
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

         {/* <!-- Modal Applications --> */}
         <div className="modal fade" id="applicants" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Current applications</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body d-flex">
                <p>You have {posts.map(post => post.applicants.length)} applicant at:</p>
                {userProfile.applied.map(x => (
                  <div key={x._id}>
                    <a href={`/post/${x._id}`} className='mx-1'>{x.title} At {x.company}</a>
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
                        <h5 className="card-title text-truncate">{x.title}</h5>
                        <p className="card-text text-truncate">{x.description}</p>
                        <p>At {x.company}</p>
                        <p>Updated: {x.updated}</p>
                        <div className='d-flex gap-2'>
                          <button type="button" className="btn btn-info" data-bs-toggle="modal" data-bs-target={`#options-${x._id}`}>
                            Options
                          </button>
                          <a href={`/post/${x._id}`} className="btn btn-primary">See Job</a>
                          
                          {/* <!-- Modal options --> */}
                          <div className="modal fade" id={`options-${x._id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog">
                              <div className="modal-content">
                                <div className="modal-header">
                                  <h1 className="modal-title fs-5" id="exampleModalLabel">Current applications</h1>
                                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body d-flex gap-1">
                                  <SaveJob userProfile={userProfile} x={x._id} fetch={getProfile}/>
                                  <ApplyToJob userProfile={userProfile} x={x._id} fetch={getProfile}/>
                                  
                                  
                                </div>
                                <div className="modal-footer">
                                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                </div>
                              </div>
                            </div>
                          </div>
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
