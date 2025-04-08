
import React, { useEffect, useState } from 'react'
import { Toast } from 'bootstrap/dist/js/bootstrap.bundle.min';

export default function ToastMessage({message}) {
  const [notification, setNotification] = useState('');
  const session = sessionStorage.getItem('notification') ?? '';
  // console.log(message)
    
  useEffect(() => {
    const displayMessage = session || message
    
    if(displayMessage){
      setNotification(displayMessage)
      setTimeout(() => {
        
        const toastEl = document.getElementById('liveToast');
        if (toastEl) {
          const toast = new Toast(toastEl, { delay: 3000, autohide: true });
          toast.show();
        }
        
        sessionStorage.removeItem('notification');
      },100)
    }
  }, [message])
  return (
    <>
        {notification ? (
        <div className='d-flex justify-content-center align-items-center w-100 text-light position-relative' aria-live="polite" aria-atomic="true">

          <div className='toast rounded bg-success' id='liveToast'>

            <div className='toast-header'>
              <strong>Notification</strong>
            </div>
            <div className='toast-body'>
              {notification}
            </div>

          </div>
        </div>

      ) : ''}
    </>
  )
}
