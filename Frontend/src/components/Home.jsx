import React, { useEffect, useState } from 'react';
import { GrMoney } from "react-icons/gr";
import { FaSackDollar } from "react-icons/fa6";
import axios from 'axios';
import { FaRupeeSign } from 'react-icons/fa';

// Card component
const Card = ({ children, className }) => {
    return (
        <div className={`p-4 rounded-lg shadow-lg ${className}`}>
            {children}
        </div>
    );
};

const Home = ({ customerData }) => {
    console.log(customerData.customerFirstName);

    // State for data
    // const [userName, setUserName] = useState(customerData.customerFirstName);
    const [totalAccounts, setTotalAccounts] = useState(0);
    const [totalBalance, setTotalBalance] = useState(0);
    const [options, setOptions] = useState([{ title: "Fixed Desposit", icon: <FaSackDollar /> }, { title: "Recurring Desposit", icon: <GrMoney /> }, { title: "Current Account", icon: <FaSackDollar /> }]);

    const getTotalBalance = () => {
        let balance = 0;
        if (customerData.account > 0) {
            customerData.forEach(account => {
                if (account.accountType == 'savings') {
                    balance += account.accountBalance;
                }
            });
        }
        setTotalBalance(balance);
        console.log(balance);

    }
    // Loading and error state
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Replace with your API endpoint
                // const response = await axios.get('http://localhost:8080/api/dashboard-data');

                // Assuming the response has the necessary data
                // setUserName(response.data.userName);
                setTotalAccounts(response.data.totalAccounts);
                setTotalBalance(response.data.totalBalance);
                setOptions(response.data.options);

                setLoading(false);
            } catch (err) {
                setError('Failed to fetch data');
                setLoading(false);
            }
        };

        fetchData();

        getTotalBalance();
    }, []);

    return (
        <div className="w-full justify-center p-8 bg-gray-50 min-h-screen">
            <div className="p-10 w-full">
                <h1 className="text-2xl font-semibold">
                    Welcome, <span className="text-blue-600">{customerData.customerFirstName}</span>
                </h1>
                <p className="text-gray-500 mt-2">Access & manage your account and transactions efficiently.</p>

                <Card className="mt-8 bg-white rounded-lg shadow-lg w-full">
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-lg font-medium">Bank Accounts <span className='text-darkBulish font-bold text-xl'>{customerData.account && customerData.account.length}</span></h2>
                            <p className="text-gray-500 mt-3">Total Savings Balance</p>
                            <p className="text-2xl font-semibold mt-2 text-darkBulish flex items-center gap-2"><FaRupeeSign size={20} /><span>{totalBalance.toFixed(2)}</span></p>
                        </div>
                        <Card className="text-blue-600 hover:text-blue-800 text-sm">
                            + Add bank
                        </Card>
                    </div>
                </Card>
            </div>

            <div className="px-10 w-full">
                <h2 className="text-2xl font-semibold mb-6">My Accounts</h2>
                <div className="grid grid-cols-3 gap-10">
                    {options.map((option, index) => (
                        <Card
                            className="bg-gradient-to-r from-[#5f9cff] to-[#154884] p-5 rounded-lg shadow-xl h-32 flex justify-center items-center text-white cursor-pointer transition transform hover:scale-105"
                            key={index}
                        >
                            <div className="font-bold flex gap-3 items-center">
                                <h3 className='text-4xl'>{option.icon}</h3>
                                <h3 className='text-2xl'>{option.title}</h3>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
