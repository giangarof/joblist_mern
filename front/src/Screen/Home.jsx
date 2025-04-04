import React, {useEffect, useState} from 'react'
// import { Toast, Carousel } from 'bootstrap/dist/js/bootstrap.bundle.min';

import ToastMessage from '../components/ToastMessage';
import axios from 'axios'

import CarouselComponent from '../components/CarouselComponent';
import SearchBar from '../components/SearchBar';

export default function Home() {
  const [posts, setPosts] = useState([])

  const findAll = async(keyword) => {
    const response = await axios.get(`/api/post/`, {
      params: keyword ? {keyword} : {}
    })
    const data = response.data.posts

    const format = data.map(x => ({
      ...x
    }))
    setPosts(format)
  }
  
  return (
    <>
      <div >
        <ToastMessage />

        <CarouselComponent posts={posts.slice(0,3)} fetch={findAll}/>

        <div className='container text-center my-4'>
          <h3>Start looking your next role</h3>
          <SearchBar fetch={findAll} />
        </div>

        <div className="container">
          <div className='row'>
            {posts.map(post => (
              <div className='col-md-6 col-lg-4 col-sm-12 g-sm-3 g-3' key={post._id}>
                <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{post.title}</h5>
                  <p className='text-truncate'>{post.description}</p>
                  <p className="card-text">@{post.company}</p>
                  <div className='d-flex flex-column gap-2'>
                    <div>
                      <a href={`/post/${post._id}`} className="btn btn-primary card-link">Details</a>
                    </div>
                    <p className='card-subtitle'>Posted: {post.updatedAt.slice(0,10)}</p>
                  </div>
                </div>
              </div>
              </div>
            ))}
          </div>
        </div>
      
      </div>
    </>
  )
}
