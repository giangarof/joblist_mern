import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

export default function Create() {
    const user = JSON.parse(localStorage.getItem('profile'))
    const navigate = useNavigate();
    const [err, setErr] = useState('');
    const [post, setPost] = useState({
        title:'',
        description:'',
        company:'',
        salary:'',
        location:''
    })

    const createPost = async(e) => {
        try {
            e.preventDefault();
            const response = await axios.post('/api/post/create', post)
            // console.log(response.data)
            sessionStorage.setItem('notification', response.data.message)
            navigate(`/profile/${user.id}`)
            
        } catch (error) {
            // console.log(error.response?.data?.message)
            setErr(error.response?.data?.message)
        }
    };

    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
      };
  return (
    
    <form className='container-md my-4' onSubmit={createPost}>
        {err && <div className="alert alert-danger">{err}</div>}
       <div>
          <label htmlFor="title" className="form-label">Title</label>
          <input name='title' type='text' className="form-control" id="title" aria-describedby="title" value={post.title} onChange={handleChange}/>
        </div>
        <div>
          <label htmlFor="description" className="form-label">Description</label>
          <input name='description' type='text' className="form-control" id="description" aria-describedby="description" value={post.description} onChange={handleChange}/>
        </div>
        <div>
          <label htmlFor="company" className="form-label">Company</label>
          <input name='company' type="text" className="form-control" id="company" aria-describedby="company" value={post.company} onChange={handleChange}/>
        </div>
        <div>
          <label htmlFor="salary" className="form-label">Salary</label>
          <input name='salary' type="number" className="form-control" id="salary" aria-describedby="salary" value={post.salary} onChange={handleChange}/>
        </div>
        <div>
          <label htmlFor="location" className="form-label">Location</label>
          <input name="location" className="form-control" id="location" aria-describedby="location" value={post.location} onChange={handleChange}/>
        </div>
        <button type='submit' className=' my-4 btn text-light bg-success bg-gradient'>Create Job</button>
      </form>
  )
}
