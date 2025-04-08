import React, { useState } from 'react'
import axios from 'axios'

export default function SaveJob({userProfile, x, fetch, setErr}) {
    //x = job id 
    // console.log(x)
    // const [err,setErr] = useState('')

    const savePost = async(i) => {
        try {
          const response = await axios.post(`/api/user/savepost/${i}`)
          console.log(response.data.message)
          setErr('')
          fetch()
          
        } catch (error) {
          // console.log(error.response.data.message)
          // sessionStorage.setItem('notification', error.response?.data?.message)
          setErr(error.response?.data?.message || `can't save job`)
        }
      }
  return (
    <>
        {userProfile.saved.some((i) => i._id === x) ? (
            <>
                <button className="btn btn-warning" onClick={() => savePost(x)}>unSave<i className="bi bi-bookmark"></i></button>
            </>
        ) : (
            <>
                <button className="btn btn-success" onClick={() => savePost(x)}>Save<i className="bi bi-bookmark"></i></button>
            </>)}
    </>
  )
}
