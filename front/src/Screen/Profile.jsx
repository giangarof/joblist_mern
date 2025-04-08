import React, { useEffect, useState } from 'react'
import ToastMessage from '../components/ToastMessage'
import axios from 'axios'
import SaveJob from '../components/SaveJob'
import ApplyToJob from '../components/ApplyToJob'
import Spinner from '../components/Spinner'
import { useParams } from 'react-router-dom'

export default function Profile() {
  const {id} = useParams()
  const user = JSON.parse(localStorage.getItem('profile')) ?? ''
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const [userProfile, setUserProfile] = useState({
    id:'',
    name: '',
    username: '',
    title: '',
    company: '',
    email: '',
    aboutMe: '',
    saved:[],
    applied:[],
    // applicants:[]
  }) 
  const [posts, setPosts] = useState([]);

  const url = async() => {
    const response = await axios.get(`/api/user/${id}`)
    const data = response.data.user;
    // console.log(data._id)
    try {
      setIsLoading(true)
      const formatted = data.posts.map(post => ({
        ...post,
        // created: post.createdAt.slice(0,10),
        updated: post.updatedAt.slice(0,10),
        // applicants: data.user.posts || []
  
      }))     
      setPosts(formatted)
      setUserProfile({
        id: data._id || '',
        name: data.name || '',
        username: data.username || '',
        title: data.title || '',
        company: data.company || '',
        email: data.email || '',
        aboutMe: data.aboutMe || '',
        saved: data.saved || [],
        applied: data.applied || [],
        // applicants: data.user.posts.map(x => x.applicants) || []
      
      })
      // sessionStorage.setItem('notification', response.data.message)
      // console.log(response.data.message)
    } catch (error) {
      console.log(error)
    }finally{
      setIsLoading(false)
    }
  }

  useEffect(() => {
      url()

      const session = sessionStorage.getItem('notification')
      if(session){
        setMessage(session)
        setTimeout(() => {
          sessionStorage.removeItem('notification');
      
        }, 1000)
      }
    },[])  

  return (
    <>
      {isLoading ? (<>
        <Spinner />
      </>) : (<>
      <div className='container-md my-1'>
        <ToastMessage  message={message}/>


        <div className='container bg-secondary-subtle rounded'>
          <div className='my-3 py-2'>
            <p>{userProfile.name}</p>
            <p>Username: {userProfile.username}</p>
            {userProfile.title && userProfile.company ? (

              <span>{userProfile.title} @ {userProfile.company}</span> 
            ) : (
              <>
                <span>No work added</span>
              </>
            )}
          </div>

          <div className='d-flex gap-2 py-2'>
            <div>
              <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#aboutME">
                About me
              </button> 
            </div>
            {id === user.id ? (
              <div className="btn-group">
                <button type="button" className="btn btn-info">Settings</button>
                <button type="button" className="btn btn-info dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                  <span className="visually-hidden">Toggle Dropdown</span>
                </button>
                <ul className="dropdown-menu">
                  <li><button className="dropdown-item" data-bs-toggle="modal" data-bs-target="#Saved">Saved Jobs</button></li>
                  <li><button className="dropdown-item" data-bs-toggle="modal" data-bs-target="#application">My applications</button></li>
                  <li><button className="dropdown-item" data-bs-toggle="modal" data-bs-target="#applicants">Job Applicants</button></li>
                  <li><hr className="dropdown-divider"/></li>
                  <a href={`/profile/${userProfile.id}/update`} className='dropdown-item'>
                      Update Profile
                  </a>
                </ul>
              </div>
              
                
            ) : ''}
          </div>
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
                {userProfile.aboutMe && userProfile.title && userProfile.company? (
                  <>
                  <span>{userProfile.aboutMe}</span> 
                  <p>Currently I do work at {userProfile.company} as {userProfile.title}</p>
                  </>
                ) : (
                <>
                  <span>No description added...</span>
                </>
                )}
                
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
              <div className="modal-body">
                {posts.map((x) => (
                  <div key={x._id}>
                    You have {x.applicants.length} At: 
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
                                  <h1 className="modal-title fs-5" id="exampleModalLabel">Available options</h1>
                                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body d-flex gap-1">
                                  <SaveJob userProfile={userProfile} x={x._id} fetch={url}/>
                                  <ApplyToJob applicants={x} x={x._id} user={userProfile.id} fetch={url}/>

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
      </>)}
    </>
  )
}
