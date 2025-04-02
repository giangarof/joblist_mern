import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

export default function JobDescription() {
    const navigate = useNavigate();
    const profile = JSON.parse(localStorage.getItem('profile')) || '';
    // console.log(profile.id)
    const [job, setJob] = useState({
        authorId:'',
        author:'',
        title:'',
        company:'',
        salary:'',
        location:'',
        description:''
    })
    const {id} = useParams()

    const getJob = async() => {
        const response = await axios.get(`/api/post/${id}`)
        const data = response.data.post
        setJob({
            authorId: data.author[0]._id,
            author: data.author[0].name,
            title:data.title,
            company:data.company,
            salary:data.salary,
            location:data.location,
            description:data.description
        })
    }

    const deletePost = async() => {
        const response = await axios.delete(`/api/post/delete/${id}`)
        
        sessionStorage.setItem('notification', response.data.message)
        navigate(`/profile/${profile.id}`)
    }

    useEffect(() => {
        getJob()
    },[])
  return (
    <>  
        <div className='container my-4'>

            <div className="card">
                <div className="card-header">
                    Job Details
                </div>
                <div className="card-body">
                    <h5 className="card-title">{job.title}</h5>
                    <p className="card-text">Salary: ${job.salary}</p>
                    <p className="card-text">Company: {job.company}</p>
                    <p className="card-text">Location: {job.location}</p>
                    <p className="card-text">{job.description}</p>
                    <div className='d-flex gap-3'>
                        {profile.id === job.authorId ? (
                            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                Options
                            </button>
                        ) : ''}
                        
                        <button className="btn btn-success">Save <i className="bi bi-bookmark"></i></button>
                        <a href="#" className="btn btn-primary">Apply</a>
                    </div>
                    <p className="card-text">Posted By: {job.author}</p>

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
        </div>
    </>
  )
}
