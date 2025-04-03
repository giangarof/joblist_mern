import React from 'react'
import axios from 'axios'

export default function ApplyToJob({ applicants, x, fetch, user }) {
    // x = job id
    // user = userId


    // if userId is in the applicants array
    const applied = applicants.some((i) => i || i_id === user)

    const applyToJob = async(id) => {
        try {
            const response = await axios.post(`/api/post/apply/${id}`)
            console.log(response.data?.message)
            fetch()
            
        } catch (error) {
            console.log(error.response?.data?.message)
            
        }
      }
  return (
    <>
        {applied ? (
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
