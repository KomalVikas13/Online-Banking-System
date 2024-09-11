import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import Home from './Home'
import axios from 'axios'

const Dashboard = () => {
    const [customerData, setCustomerData] = useState({});
    const getDashboardData = async () => {
        const response = await axios.get("http://localhost:9999/dashboard/", { withCredentials: true });
        console.log(response);
        setCustomerData(response.data);
    }
    useEffect(() => {
        getDashboardData();
    }, []);

    return (
        <div className='flex'>
            <Sidebar customerFirstName={customerData.customerFirstName} customerLastName={customerData.customerLastName} customerEmail={customerData.customerEmail} />
            <Home customerData={customerData} />
        </div>
    )
}

export default Dashboard