import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import Home from './Screen/Home.jsx'

// Registration
import Login from "./Screen/Login.jsx"
import Signup from "./Screen/Signup.jsx"

// CRUD - User
import Profile from './Screen/Profile.jsx'
import Update from './Screen/Update.jsx'

// CRUD - Post
import Create from './Screen/Create.jsx'
import JobDescription from './Screen/JobDescription.jsx'
import UpdatePost from './Screen/UpdatePost.jsx'
import JobAdmin from './Screen/JobAdmin.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(

    <Route path='/' element={<App/>}>

      {/* Home */}
      <Route path='/' element={<Home/>} />

      {/* Registration */}
      <Route path='/login' element={<Login/>} />
      <Route path='/signup' element={<Signup/>} />

      {/* CRUD */}
      <Route path='/create' element={<Create/>} />
      <Route path='/post/:id' element={<JobDescription/>} />
      <Route path='/update/:id' element={<UpdatePost/>} />
      <Route path='/joblist' element={<JobAdmin/>}/>


      {/* User */}
      <Route path='/profile/:id' element={<Profile/>} />
      <Route path='/profile/:id/update' element={<Update/>} />

    </Route>
  )
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
