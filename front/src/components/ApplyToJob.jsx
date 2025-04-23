import React from 'react'
import axios from 'axios'

export default function ApplyToJob({ applicants, x, fetch, user, setErr }) {
    // x = job id
    // user = userId

    // console.log(applicants.applicants.some((i) => i._id === user))
    // console.log(user)

    // if userId is in the applicants array
    // const applied = applicants.some((i) => i || i_id === user)
    const applied = applicants.applicants.some((i) => i._id === user)
    // console.log(applicants[0]._id, user)


    const applyToJob = async(id) => {
        try {
            const response = await axios.post(`/api/post/apply/${id}`)
            // console.log(response.data?.message)
            setErr('')
            fetch()
            
        } catch (error) {
            // console.log(error.response?.data?.message)
            setErr(error.response?.data?.message)
            
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
