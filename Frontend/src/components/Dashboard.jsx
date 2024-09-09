import React from 'react'
import Sidebar from './Sidebar'
import Home from './Home'

const Dashboard = () => {
    return (
        <div className='flex'>
            <Sidebar />
            <Home />
        </div>
    )
}

export default Dashboard