import React, { useEffect, useState } from 'react'
import Transaction from './Transaction'
import { Link, useParams } from 'react-router-dom'
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import axios from 'axios';

const TransactionHistory = () => {
    // State for transactions data
    const params = useParams()
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 10;

    // Filter state
    const [filter, setFilter] = useState('all');

    const getTransactionHistory = async () => {
        const response = await axios.get(`http://localhost:9999/transaction/transactionDetails/${params.customerId}`)
        console.log(response.data)
        setTransactions(response.data)
    }
    useEffect(() => {
        getTransactionHistory()
    }, [])
    // Handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Handle filter change
    const handleFilterChange = (event) => {
        setFilter(event.target.value);
        setCurrentPage(1); // Reset to the first page when filter changes
    };
    // Filter transactions based on the selected filter
    const filteredTransactions = transactions.filter(transaction => {
        const now = new Date();
        const transactionDate = new Date(transaction.date); // Ensure this is a Date object
        switch (filter) {
            case 'day':
                return transactionDate.toDateString() === now.toDateString();
            case 'week':
                const oneWeekAgo = new Date();
                oneWeekAgo.setDate(now.getDate() - 7);
                return transactionDate >= oneWeekAgo && transactionDate <= now;
            case 'month':
                return transactionDate.getMonth() === now.getMonth() && transactionDate.getFullYear() === now.getFullYear();
            case 'year':
                return transactionDate.getFullYear() === now.getFullYear();
            default:
                return true;
        }
    });

    // Calculate total pages
    const totalPages = Math.ceil(filteredTransactions.length / recordsPerPage);

    // Calculate the current records to display
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = filteredTransactions.slice(indexOfFirstRecord, indexOfLastRecord);
    // Generate PDF
    const generatePDF = () => {
        const doc = new jsPDF();
        doc.text('Transaction History', 20, 20);

        const tableColumn = ['Transaction ID', 'Amount', 'Status', 'Date', 'Account'];
        const tableRows = [];

        filteredTransactions.forEach(transaction => {
            const transactionData = [
                transaction.transactionId,
                transaction.amount < 0 ? `-$${Math.abs(transaction.amount)}` : `+$${transaction.amount}`,
                transaction.status,
                new Date(transaction.date).toDateString(),
                transaction.account,
            ];
            tableRows.push(transactionData);
        });

        doc.autoTable(tableColumn, tableRows, { startY: 30 });
        doc.save('transaction_history.pdf');
    };

    return (
        <div className='p-10'>
            <div className="flex justify-between items-center">
                <p className="text-lg font-semibold text-darkBulish">Transactions History</p>

                {/* Filter dropdown */}
                <select
                    value={filter}
                    onChange={handleFilterChange}
                    className="bg-white p-2 rounded-md shadow"
                >
                    <option value="all">All</option>
                    <option value="day">Today</option>
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                    <option value="year">This Year</option>
                </select>

                {/* {/* Download PDF Button */}
                <button
                    onClick={generatePDF}
                    className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-md shadow"
                >
                    Download PDF
                </button>
            </div>
            <Transaction transactionData={transactions} />
            <div className='mt-5 float-end'>
                <Link to="/dashboard" className='bg-darkBulish text-white px-4 py-2 rounded-lg shadow-lg'>Back</Link>
            </div>
        </div>
    )
}

export default TransactionHistory