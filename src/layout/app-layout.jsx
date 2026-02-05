import React from 'react'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'sonner'
import ScrollToTop from '../components/ScrollToTop'

const AppLayout = () => {
    
  return (
    <div>
        <ScrollToTop />
        <main className='min-h-screen max-w-8xl  mx-auto'>

            <Toaster position="bottom-right" />

         <Outlet/>

        </main>

    </div>
  )
}

export default AppLayout