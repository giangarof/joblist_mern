import React from 'react'



export default function Navigation() {
  return (

    <nav className='navbar bg-primary'>
      <div className='container-fluid'>
        <a className='navbar-brand text-white' href="/">JobList</a>
        <div className='d-flex gap-1'>
          <a className='navbar-brand text-white' href="/login">Login</a>
          <a className='navbar-brand text-white' href="/signup">SignUp</a>
        </div>
      </div>
    </nav>
  )
}

