import React from 'react';
import { FaHome, FaUniversity, FaHistory, FaExchangeAlt, FaLink, FaSignOutAlt } from 'react-icons/fa';
// import Novo from '../assets/images/Novo.png';
import { IoPersonCircle } from "react-icons/io5";

const Sidebar = () => {
    return (
        <div className="h-screen w-1/5 bg-white shadow-lg flex flex-col justify-between">
            {/* Top Section */}
            <div>
                {/* Logo Section */}
                <div className="flex items-center justify-center py-5 border-b border-gray-200">
                    {/* <img
                        src={Novo}
                        alt="Bank Logo"
                        className="h-10 w-10"
                    /> */}
                    <span className="text-2xl font-bold text-darkBulish">Nova Bank</span>
                </div>


                {/* Navigation Items */}
                <nav className="mt-3">
                    <ul className='px-5'>
                        <li className="group">
                            <a href="#home" className="flex items-center p-4 space-x-3 rounded-lg bg-darkBulish text-white hover:bg-blue-100 hover:text-blue-600 group">
                                <FaHome className="text-xl text-white group-hover:text-darkBulish" />
                                <span className="font-medium">Home</span>
                            </a>
                        </li>
                        <li className="group">
                            <a href="" className="flex items-center p-4 space-x-3 text-gray-700 hover:bg-blue-100 hover:text-blue-600 group">
                                <FaUniversity className="text-xl text-blue-500 group-hover:text-blue-600" />
                                <span className="font-medium">Create Account</span>
                            </a>
                        </li>
                        <li className="group">
                            <a href="#transaction-history" className="flex items-center p-4 space-x-3 text-gray-700 hover:bg-blue-100 hover:text-blue-600 group">
                                <FaHistory className="text-xl text-blue-500 group-hover:text-blue-600" />
                                <span className="font-medium">Transaction History</span>
                            </a>
                        </li>
                        <li className="group">
                            <a href="#payment-transfer" className="flex items-center p-4 space-x-3 text-gray-700 hover:bg-blue-100 hover:text-blue-600 group">
                                <FaExchangeAlt className="text-xl text-blue-500 group-hover:text-blue-600" />
                                <span className="font-medium">Payment Transfer</span>
                            </a>
                        </li>
                        <li className="group">
                            <a href="#connect-bank" className="flex items-center p-4 space-x-3 text-gray-700 hover:bg-blue-100 hover:text-blue-600 group">
                                <FaLink className="text-xl text-blue-500 group-hover:text-blue-600" />
                                <span className="font-medium">Connect Bank</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>

            {/* Bottom Login Section */}
            <div className="border-t border-gray-200 p-4 flex items-center justify-between">
                <div className="flex items-center">

                    <IoPersonCircle className="text-xl text-white-500 hover:text-blue-600 " />
                    <div className="ml-3">
                        <h4 className="font-medium text-gray-800">Chinthakindi varun</h4>
                        <p className="text-sm text-gray-500">varunch@gmail.com</p>
                    </div>
                </div>
                <FaSignOutAlt className="text-gray-400 hover:text-red-500 cursor-pointer" title="Logout" />
            </div>

        </div>
    );
};

export default Sidebar;


