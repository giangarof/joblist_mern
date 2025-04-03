import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import SaveJob from '../components/SaveJob'
import ApplyToJob from '../components/ApplyToJob';

export default function JobDescription() {
    const {id} = useParams()
    const navigate = useNavigate();
    const profile = JSON.parse(localStorage.getItem('profile')) || '';

    const [userProfile, setUserProfile] = useState({
        saved:[],
        profileId:''
      }) 

    const [job, setJob] = useState({
        id: '',
        authorId:'',
        author:'',
        title:'',
        company:'',
        salary:'',
        location:'',
        description:'',
        applicants:[],
        // applicantsId:[],
        // applicantTitle:[]
        // applicants:[{
        // }],
    })

    const getJob = async() => {
        const response = await axios.get(`/api/post/${id}`)
        const data = response.data.post
        // console.log(data.applicants)
        
        setJob({
            id: data._id,
            authorId: data.author[0]._id,
            author: data.author[0].name,
            title:data.title,
            company:data.company,
            salary:data.salary,
            location:data.location,
            description:data.description,
            updatedAt: data.updatedAt.slice(0,10),
            applicants: data.applicants
            // applicant: data.applicants.map(x => x.name),
            // applicantId: data.applicants.map(x => x._id),
            // applicantTitle: data.applicants.map(x => x.title),
            // applicants: {

            // }
        })
    }
    console.log(job.author, job.authorId)

    const getProfile = async() => {
        const response = await axios.get(`/api/user/${profile.id}`)
        const data = response.data
        // console.log(data)
        try { 
          setUserProfile({
            saved: data.user.saved || [],
            profileId: data.user._id
          })
        
        } catch (error) {
          console.log(error)
        }
      }

    const deletePost = async() => {
        const response = await axios.delete(`/api/post/delete/${id}`)
        
        sessionStorage.setItem('notification', response.data.message)
        navigate(`/profile/${profile.id}`)
    }

    useEffect(() => {
        getProfile()
        getJob()
    },[])
  return (
    <>  
        <div className='container my-4'>
            <a href={`/profile/${job.authorId}`}>
                <button type="button" className="btn btn-info my-4">
                    Go Back
                </button>
            </a>

            <div className="card">
                <div className="card-header">
                    Job Details
                </div>
                <div className="card-body">
                    <h5 className="card-title">{job.title}</h5>
                    <p className="card-text">Salary: ${job.salary}</p>
                    <p className="card-text">Company: {job.company}</p>
                    <p className="card-text">Location: {job.location}</p>
                    <p className="card-text">About the role: {job.description}</p>
                    <div className='d-flex gap-3'>
                        {profile.id === job.authorId ? (
                            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                Options
                            </button>
                        ) : ''}
                        
                        <SaveJob userProfile={userProfile} x={id} fetch={getProfile} />
                        <ApplyToJob applicants={job.applicants} x={job.id} fetch={getJob} user={userProfile.profileId}/>
                    </div>
                    <p className="card-text my-4">Posted By: <a href={`/profile/${job.authorId}`}>{job.author}</a> </p>
                    <p className="card-text my-4">Updated: {job.updatedAt}</p>


                    {/* <!-- Modal --> */}
                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Options</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            {/* <div className="modal-body">
                                ...
                            </div> */}
                            <div className="modal-footer">
                            <button className="btn btn-danger" onClick={deletePost}><i className="bi bi-trash"></i></button>
                                <a href={`/update/${id}`} className="btn bg-info-subtle">Update</a>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {profile.id === job.authorId ? (
                            
                <div className='my-3'>

                    {/* Current Applicants */}
                    <button className="btn btn-primary mb-3" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                        Current Applicants
                    </button>
                    <div className="collapse" id="collapseExample">
                        {job.applicants.map((x) => (
                            <div className="card card-body" key={x._id}>
                                    <a href={`/profile/${x._id}`}>
                                        {x.name} - {x.title}
                                    </a>

                            </div>
                        ))}
                    </div>
                </div>
                ) : ''
            }
        </div>
    </>
  )
}
