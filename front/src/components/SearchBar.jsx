import React, {useState, useEffect} from 'react'
import axios from 'axios'

export default function SearchBar({fetch}) {
    // console.log(posts)
    const [keyword, setKeyword] = useState('')
    const [suggestions, setSuggestion] = useState([])

    const findByKeyword = async(e)=> {
        if (keyword !== '') {
          try {
            const { data } = await axios.get(`/api/post?keyword=${keyword}`);
            // console.log(data);  
            setSuggestion(data.posts);
          } catch (error) {
            console.error('Error fetching suggestions:', error);
          }
        } else {
          setSuggestion([]);
        }
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        fetch(keyword)
    }
    
    useEffect(() => {
        
        const debounceFetch = setTimeout(() => {findByKeyword()}, 300); // Debounce fetch
        return () => clearTimeout(debounceFetch);
    }, [keyword])
  return (
    <>
        <form className="d-flex" role="search" onSubmit={handleSubmit}>
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={(e) => setKeyword(e.target.value)}/>
            <button className="btn btn-outline-success" type="submit">Search</button>
        </form>
          
          {suggestions.length >= 1 ? (<>
            <div className='list-group'>
              <p className='list-group-item list-group-item-action active'>Top Results for</p>
              {suggestions.slice(0,3).map(x => (
                <div key={x._id}>
                    <a href={`/post/${x._id}`} className="list-group-item list-group-item-action">{x.title} @{x.company}</a>
                </div>
                ))}
            </div>
          </>) : (<></>)}
    </>
  )
}
