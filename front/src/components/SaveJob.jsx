import React from 'react'
import axios from 'axios'

export default function SaveJob({userProfile, x, fetch}) {
    console.log(x)

    const savePost = async(i) => {
        try {
          const response = await axios.post(`/api/user/savepost/${i}`)
          console.log(response.data.message)
          fetch()
          
        } catch (error) {
          console.log(error.response?.data?.message)
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
