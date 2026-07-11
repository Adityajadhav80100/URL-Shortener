import Header from '@/components/header'
import React from 'react'
import { Outlet } from 'react-router-dom'

function AppLayout() {
  return (
    <div className='bg-[#030712] min-h-screen'>
      <main className='min-h-screen container mx-auto  text-white '>
         <Header/>
      <Outlet/>
      </main>
    <div>

    </div> 
    </div>
  )
}

export default AppLayout
