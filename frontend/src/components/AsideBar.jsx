import React from 'react'
import { Link } from 'react-router-dom'

const AsideBar = () => {
  return (
    <div className='w-24'>
      <h1>Finance App</h1>
      <div>
        <Link to={"/requests"}>
        <h1>Loan Request</h1>
        </Link>
        <Link to={"/requests"}>
        <h1>Request List</h1>
        </Link>
      </div>
    </div>
  )
}

export default AsideBar
