import Header from '@/components/header'
import React from 'react'
import { Outlet } from 'react-router-dom'

function AppLayout() {
  return (
    <div className='min-h-screen bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.24),transparent_35%),linear-gradient(180deg,#050816_0%,#070b18_45%,#03050b_100%)] text-white'>
      <main className='mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-6 sm:px-6'>
         <Header/>
         <Outlet/>
      </main>
    </div>
  )
}

export default AppLayout
