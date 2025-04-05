import React,{useEffect, useState} from 'react'
import { Toast, Carousel  } from 'bootstrap/dist/js/bootstrap.bundle.min';


import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import ToastMessage from './ToastMessage';

export default function CarouselComponent({posts, fetch}) {
    const [activeIndex, setActiveIndex] = useState(0);
  

    const handleNext = () => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % posts.length);
    };
    
    const handlePrev = () => {
        setActiveIndex((prevIndex) => (prevIndex - 1 + posts.length) % posts.length);
    };

    useEffect(() => {
        fetch()
        const myCarousel = new Carousel('#myCarousel', {
          interval: 3000, // auto-slide every 3 seconds
          ride: 'carousel',
          keyboard: true
        });

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
      <div id="carouselExampleDark" className='carousel-dark'>
          <div className=''>
              <div className="carousel-indicators ">
              {posts.map((_, index) => (
                <button
                key={index}
                type="button"
                data-bs-target="#carouselExampleDark"
                data-bs-slide-to={index}
                className={index === activeIndex ? 'active' : ''}
                aria-current={index === activeIndex ? 'true' : undefined}
                aria-label={`Slide ${index + 1}`}
                ></button>
              ))}
              </div>

              {posts.map((post,index) => (
                <div key={post._id} className={`my-5 carousel-item ${index === activeIndex ? 'active' : ''}`} data-bs-interval="10000">
                  <div className="grid align-items-center my-5 opacity-75" >
                    <div className='row justify-content-center align-iems-center'>
                      <div className='col-12 text-center bg-secondary-subtle'>
                        <a href={`/post/${post._id}`}><h5 className='fw-bold'>{post.title}</h5></a>

                        <p className='fw-bolder'>{post.description}</p>
                        <p className='fw-bolder'>@{post.company}</p>

                      </div>

                    </div>
                  </div>
                </div>
              ))}

              <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev" onClick={handlePrev}>
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next" onClick={handleNext}>
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>
          </div>
        {/* ))} */}
      </div>
    </div>
  )
}
