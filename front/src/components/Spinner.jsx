import React from 'react'

export default function Spinner() {
  return (
    <div className="grid row justify-content-center my-4">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
        <span className="grid row justify-content-center">Loading... </span>
    </div>
  )
}
