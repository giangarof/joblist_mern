import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

export default function UpdatePost() {
  const [err,setErr] = useState('')
  const [post, setPost] = useState({
    title:'',
    company:'',
    salary:'',
    location:'',
    description:'',
    requirements: ''
  })
  const {id} = useParams()
  const navigate = useNavigate()
  const profile = JSON.parse(localStorage.getItem('profile'))

  const getPost = async() => {
    const response = await axios.get(`/api/post/${id}`)
    const data = response.data.post
    setPost((prev) => ({
      ...prev,
      title:data.title ?? prev.title,
      company:data.company ?? prev.company,
      salary:data.salary ?? prev.salary,
      location:data.location ?? prev.location,
      description:data.description ?? prev.description,
      requirements:data.requirements ?? prev.requirements
    }))
  }

  const updatePost= async(e) => {
        e.preventDefault()
        const data = {...post}
        // console.log(data)
        try {
            const response = await axios.put(`/api/post/update/${id}`, data)
            // console.log(response.data.message)
            sessionStorage.setItem('notification', response.data.message)
            navigate(`/profile/${profile.id}`)
            
        } catch (error) {
            console.log(error.response?.data)
            setErr(error.response?.data)
        }
  }

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    getPost()
  }, [])
  return (
    <form className='container-md my-4' onSubmit={updatePost}>
    {err && <div className="alert alert-danger">{err}</div>}
   <div>
      <label htmlFor="title" className="form-label">Title</label>
      <input name='title' type='text' className="form-control" id="title" aria-describedby="title" value={post.title} onChange={handleChange}/>
    </div>
    <div>
      <label htmlFor="company" className="form-label">Company</label>
      <input name='company' type='text' className="form-control" id="company" aria-describedby="company" value={post.company} onChange={handleChange}/>
    </div>
    <div>
      <label htmlFor="salary" className="form-label">Salary</label>
      <input name='salary' type='number' className="form-control" id="salary" aria-describedby="salary" value={post.salary} onChange={handleChange}/>
    </div>
    <div>
      <label htmlFor="location" className="form-label">Location</label>
      <input name='location' type='text' className="form-control" id="location" aria-describedby="location" value={post.location} onChange={handleChange}/>
    </div>
    <div>
      <label htmlFor="description" className="form-label">Description</label>
      <input name='description' type='text' className="form-control" id="description" aria-describedby="description" value={post.description} onChange={handleChange}/>
    </div>
    <div>
      <label htmlFor="requirements" className="form-label">Requirements</label>
      <input name='requirements' type='text' className="form-control" id="requirements" aria-describedby="requirements" value={post.requirements} onChange={handleChange}/>
    </div>
    
    <button type='submit' className=' my-4 btn text-light bg-success bg-gradient'>Update</button>
  </form>
  )
}
