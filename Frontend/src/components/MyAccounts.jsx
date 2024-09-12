import React from 'react'
import Transaction from './Transaction'
import { Link } from 'react-router-dom'

const MyAccounts = () => {
    return (
        <div className='p-10'>
            <div className="flex-1">
                <h1 className='text-darkBulish font-semibold text-2xl'>All Accounts</h1>
                <div className="mt-5">
                    <div>
                        <table className="min-w-full mt-4 bg-white rounded-lg shadow">
                            <thead>
                                <tr className='bg-slate-100'>
                                    <th className="py-3 px-4 text-left font-medium">Account No.</th>
                                    <th className="py-3 px-4 text-left font-medium">Account Type</th>
                                    <th className="py-3 px-4 text-left font-medium">Amount</th>
                                    <th className="py-3 px-4 text-left font-medium">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* {currentRecords.map(transaction => (
                                    <tr key={transaction.id} >
                                        <td className="py-3 px-4 flex gap-4 items-center"><div className='w-10 h-10 rounded-full bg-lightBlusih text-darkBulish font-medium shadow-lg flex justify-center items-center'>{(transaction.transaction[0])}</div><span>{transaction.transaction}</span></td>
                                        <td className="py-3 px-4">{transaction.transactionId}</td>
                                        <td className={`py-3 px-4 ${transaction.amount < 0 ? 'text-red-500' : 'text-green-500'}`}>
                                            {transaction.amount < 0 ? `- Rs.${Math.abs(transaction.amount)}` : ` + Rs.${transaction.amount}`}
                                        </td>
                                        <td className={`${transaction.status == 'Completed' ? "bg-green-50 text-green-600" : "bg-red-50 text-red-500"} text-sm font-medium flex items-center justify-center gap-2 rounded-full`}><div className={`w-[7px] h-[7px] ${transaction.status == 'Completed' ? "bg-green-400" : "bg-red-400"} rounded-full`}></div><div>{transaction.status}</div></td>
                                        <td className="py-3 px-4">{new Date(transaction.date).toDateString()}</td>
                                        <td className="py-3 px-4"><span className="text-blue-500">{transaction.account}</span></td>
                                    </tr>
                                ))} */}
                            </tbody>
                        </table>
                    </div>


                    {/* Pagination controls */}
                    {/* <div className="mt-4 flex justify-center">
                    {Array.from({ length: totalPages }, (v, i) => (
                        <button
                            key={i + 1}
                            onClick={() => handlePageChange(i + 1)}
                            className={`mx - 1 px - 3 py - 1 rounded - md ${ currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-white text-blue-600 border'
                                }`}
                        >
                        {i + 1}
                    </button>
                    ))}
            </div> */}
                </div>
            </div>
            <div className='mt-5 float-end'>
                <Link to="/dashboard" className='bg-darkBulish text-white px-4 py-2 rounded-lg shadow-lg'>Back</Link>
            </div>
        </div>
    )
}

export default MyAccounts