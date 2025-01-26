import React from 'react'
import MainContent from '../components/MainContent'
import AsideBar from '../components/AsideBar'

const Dashboard = () => {
  return (
    <div className='bg-gray-100 min-h-screen flex'>
      <AsideBar/>
      <MainContent/>
    </div>
  )
}

export default Dashboard
