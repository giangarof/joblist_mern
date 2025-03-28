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



import Login from "./Screen/Login.jsx"
import Signup from "./Screen/Signup.jsx"

const router = createBrowserRouter(
  createRoutesFromElements(

    <Route path='/' element={<App/>}>

      {/* Registration */}
      <Route path='/login' element={<Login/>} />
      <Route path='/signup' element={<Signup/>} />

    </Route>
  )
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
