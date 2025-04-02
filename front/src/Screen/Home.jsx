import React, {useEffect, useState} from 'react'
import { Toast } from 'bootstrap/dist/js/bootstrap.bundle.min';
import ToastMessage from '../components/ToastMessage';

export default function Home() {
  
  return (
    <>
      <div className='container-md my-4'>
        <ToastMessage />

      </div>
    </>
  )
}
