import React,{useEffect, useState} from 'react'
import { Toast, Carousel  } from 'bootstrap/dist/js/bootstrap.bundle.min';


// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import ToastMessage from './ToastMessage';
import axios from 'axios';

export default function CarouselComponent() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [posts, setPosts] = useState([])

    const fetch = async() => {
      const response = await axios.get(`/api/post/`)
      // console.log(response.data.posts)
      const data = response.data.posts

      const format = data.map(x => ({
        ...x
      }))
      setPosts(format.slice(-4))
    }
  

    const handleNext = () => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % posts.length);
    };
    
    const handlePrev = () => {
        setActiveIndex((prevIndex) => (prevIndex - 1 + posts.length) % posts.length);
    };

    

    useEffect(() => {
        fetch()
        const myCarousel = document.getElementById('myCarousel');
        if (myCarousel) {
          new Carousel(myCarousel, {
            interval: 3000,
            ride: 'carousel',
            keyboard: true,
          });
        }

    }, [])
  return (
    <div id="myCarousel" style={{
        backgroundImage: "url('/wallpaper.jpg')",  // Path to your image
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '50vh',  // Takes up full viewport height
        position: 'relative',  // To keep carousel in the image container
      }}>
        <ToastMessage/>
      <div id="carousel-dark" className='carousel-dark'>
          <div className=''>
              <div className="carousel-indicators ">
              {posts.map((_, index) => (
                <button
                key={index}
                type="button"
                data-bs-target="#myCarousel"
                data-bs-slide-to={index}
                className={index === activeIndex ? 'active' : ''}
                aria-current={index === activeIndex ? 'true' : undefined}
                aria-label={`Slide ${index + 1}`}
                ></button>
              ))}
              </div>

              {posts.map((post,index) => (
                <div key={post._id} className={`my-5 carousel-item ${index === activeIndex ? 'active' : ''}`} data-bs-interval="3000">
                  <div className="grid align-items-center my-5 opacity-75" >
                    <div className='row justify-content-center align-iems-center'>
                      <div className='col-12 text-center bg-secondary-subtle p-3 w-50'>
                        <a href={`/post/${post._id}`}><h5 className='fw-bold'>{post.title}</h5></a>
                        <p className='fw-bolder'>{post.description}</p>
                        <p className='fw-bolder'>@{post.company}</p>
                      </div>

                    </div>
                  </div>
                </div>
              ))}
              <button className="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev" onClick={handlePrev}>
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next" onClick={handleNext}>
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>

          </div>
        {/* ))} */}
      </div>
    </div>
  )
}
