import React from 'react'
import axios from 'axios'

export default function ApplyToJob({userProfile, x, fetch}) {
    // console.log(x)
    const applyToJob = async(id) => {
        try {
            const response = await axios.post(`/api/post/apply/${id}`)
            console.log(response.data?.message)
            fetch()
            
        } catch (error) {
            console.log(error)
            
        }
      }
  return (
    <>
        {userProfile.applied.some((i) => i._id === x) ? (
            <>
                <button className="btn btn-danger" onClick={() => applyToJob(x)}>Cancel application</button>
            </>
        ) : (
            <>
                <button className="btn btn-success" onClick={() => applyToJob(x)}>Apply</button>
            </>)}
    </>
  )
}
