import React, { useEffect } from 'react'
import Sidebar from './Sidebar'
import Home from './Home'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Dashboard = () => {
    const navigate = useNavigate();
    // useEffect(() => {

    // }, [])
    const getDashboardData = async () => {
        const response = await axios.get("http://localhost:9999/dashboard/", { withCredentials: true });
        console.log(response);
    }
    getDashboardData();
    return (
        <div className='flex'>
            <Sidebar />
            <Home />
        </div>
    )
}

export default Dashboard