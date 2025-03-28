import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Outlet, useLocation } from "react-router-dom";

import './App.css'

import "bootstrap/dist/css/bootstrap.min.css";


import Navigation from './components/Navigation.jsx'

function App() {

  return (
    <>
      <Navigation />
      <Outlet/>
    </>
  )
}

export default App
