import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const BillPayment = () => {
    const navigator = useNavigate();
    const { bill } = useParams();
    const [accounts, setAccounts] = useState([]);
    const [sourceBank, setSourceBank] = useState("");
    const [billType, setBillType] = useState(bill);
    const [amount, setAmount] = useState("");
    const [transferNote, setTransferNote] = useState("");
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    // Fields specific to bill types
    const [uscNo, setUscNo] = useState(""); // For Current Bill
    const [customerId, setCustomerId] = useState(""); // For Gas Bill
    const [accountNumber, setAccountNumber] = useState(""); // For Broadband Bill

    const validateField = (name, value) => {
        let validationErrors = { ...errors };
        switch (name) {
            case "sourceBank":
                if (!value) {
                    validationErrors.sourceBank = "Please select a source bank.";
                } else {
                    delete validationErrors.sourceBank;
                }
                break;
            case "billType":
                if (!value) {
                    validationErrors.billType = "Please select a bill type.";
                } else {
                    delete validationErrors.billType;
                }
                break;
            case "amount":
                if (!value) {
                    validationErrors.amount = "Please enter an amount.";
                } else if (Number(value) < 1) {
                    validationErrors.amount = "Minimum amount should be 1.";
                } else {
                    delete validationErrors.amount;
                }
                break;
            case "uscNo":
                if (billType === "current") {
                    if (!value) {
                        validationErrors.uscNo = "Please enter USC No.";
                    } else if (!/^\d{9}$/.test(value)) {
                        validationErrors.uscNo = "USC No should contain 9 digits."
                    } else {
                        delete validationErrors.uscNo;
                    }
                }
                break;
            case "customerId":
                if (billType === "gas") {
                    if (!value) {
                        validationErrors.customerId = "Please enter Customer ID.";
                    } else if (!/^\d{17}$/.test(value)) {
                        validationErrors.customerId = "Customer ID should contain 17 digits.";
                    } else {
                        delete validationErrors.customerId;
                    }
                }
                break;
            case "accountNumber":
                if (billType === "broadband" && !value) {
                    validationErrors.accountNumber = "Please enter Account Number.";
                } else {
                    delete validationErrors.accountNumber;
                }
                break;
            default:
                break;
        }
        setErrors(validationErrors);
    };

    const validate = () => {
        let validationErrors = {};
        if (!sourceBank) {
            validationErrors.sourceBank = "Please select a source bank.";
        }
        if (!billType) {
            validationErrors.billType = "Please select a bill type.";
        }
        if (!amount) {
            validationErrors.amount = "Please enter an amount.";
        } else if (amount <= 0) {
            validationErrors.amount = "Amount must be greater than zero.";
        }

        // Validate based on the selected bill type
        if (billType === "current" && !uscNo) {
            validationErrors.uscNo = "Please enter USC No.";
        }
        if (billType === "gas" && !customerId) {
            validationErrors.customerId = "Please enter Customer ID.";
        }
        if (billType === "broadband" && !accountNumber) {
            validationErrors.accountNumber = "Please enter Account Number.";
        }

        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0;
    };

    const handleBlur = (e) => {
        setTouched((prevTouched) => ({ ...prevTouched, [e.target.name]: true }));
        validateField(e.target.name, e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            const data = {
                sender: {
                    accountId: sourceBank,
                    transactionType: "debit",
                    transactionAmount: amount,
                    billType: billType,
                    transferNote: transferNote,
                    uscNo: billType === "current" ? uscNo : null,
                    customerId: billType === "gas" ? customerId : null,
                    accountNumber: billType === "broadband" ? accountNumber : null,
                },
            };
            try {
                const response = await axios.post(
                    "http://localhost:9999/transaction/payBill",
                    data,
                    { withCredentials: true }
                );
                if (response.status === 200 && response.data === "SUCCESS") {
                    toast.success("Bill paid successfully..!");
                    navigator("/dashboard");
                }
            } catch (error) {
                toast.error("Something went wrong while paying the bill.");
            }
        } else {
            console.log("Form has errors.");
        }
    };

    const getAllAccounts = async () => {
        try {
            const response = await axios.get(
                "http://localhost:9999/account/getAccounts",
                { withCredentials: true }
            );
            setAccounts(response.data);
        } catch (error) {
            console.log("Error fetching accounts:", error);
        }
    };

    useEffect(() => {
        getAllAccounts();
    }, []);

    return (
        <div className="bg-gray-100 w-full h-full">
            <div className="p-6 bg-white rounded-lg max-w-full h-screen">
                <h2 className="text-3xl font-semibold mb-2">Bill Payment</h2>
                <p className="text-gray-600 mb-6">Pay your bills quickly and easily.</p>

                <form onSubmit={handleSubmit}>
                    <div className="space-y-6">
                        {/* Source Bank Field */}
                        <div className="flex items-start max-w-[85%] border-b border-gray-200 pb-6">
                            <label className="w-1/3 text-gray-700">
                                Select Source Bank
                                <p className="text-sm text-gray-500">Select the bank account you want to pay from</p>
                            </label>
                            <div className="w-2/3">
                                <select
                                    name="sourceBank"
                                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 ${errors.sourceBank ? "border-red-500" : ""
                                        }`}
                                    value={sourceBank}
                                    onChange={(e) => setSourceBank(e.target.value)}
                                    onBlur={handleBlur}
                                >
                                    <option value="">Select Account</option>
                                    {accounts
                                        .filter(
                                            (account) =>
                                                account.accountType === "savings" ||
                                                account.accountType === "current"
                                        )
                                        .map((account) => (
                                            <option key={account.accountId} value={account.accountId}>
                                                {account.accountType} account - {account.accountId}: Balance - ₹{account.accountBalance}
                                            </option>
                                        ))}
                                </select>
                                {errors.sourceBank && (
                                    <p className="text-red-500 text-sm text-left">{errors.sourceBank}</p>
                                )}
                            </div>
                        </div>

                        {/* Bill Type Field */}
                        <div className="flex items-start max-w-[85%] border-b border-gray-200 pb-6">
                            <label className="w-1/3 text-gray-700">Select Bill Type</label>
                            <div className="w-2/3">
                                <select
                                    name="billType"
                                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 ${errors.billType ? "border-red-500" : ""
                                        }`}
                                    value={billType}
                                    onChange={(e) => setBillType(e.target.value)}
                                    onBlur={handleBlur}
                                >
                                    <option value="">Select Bill Type</option>
                                    <option value="current">Current Bill</option>
                                    <option value="gas">Gas Bill</option>
                                    <option value="broadband">Broadband Bill</option>
                                </select>
                                {errors.billType && (
                                    <p className="text-red-500 text-sm text-left">{errors.billType}</p>
                                )}
                            </div>
                        </div>

                        {/* Bill-Specific Fields */}
                        {billType === "current" && (
                            <div className="flex items-start max-w-[85%] border-b border-gray-200 pb-6">
                                <label className="w-1/3 text-gray-700">USC No</label>
                                <div className="w-2/3">
                                    <input
                                        type="text"
                                        name="uscNo"
                                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 ${errors.uscNo ? "border-red-500" : ""
                                            }`}
                                        value={uscNo}
                                        onChange={(e) => setUscNo(e.target.value)}
                                        onBlur={handleBlur}
                                    />
                                    {errors.uscNo && (
                                        <p className="text-red-500 text-sm text-left">{errors.uscNo}</p>
                                    )}
                                </div>
                            </div>
                        )}

                        {billType === "gas" && (
                            <div className="flex items-start max-w-[85%] border-b border-gray-200 pb-6">
                                <label className="w-1/3 text-gray-700">Customer ID</label>
                                <div className="w-2/3">
                                    <input
                                        type="text"
                                        name="customerId"
                                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 ${errors.customerId ? "border-red-500" : ""
                                            }`}
                                        value={customerId}
                                        onChange={(e) => setCustomerId(e.target.value)}
                                        onBlur={handleBlur}
                                    />
                                    {errors.customerId && (
                                        <p className="text-red-500 text-sm text-left">{errors.customerId}</p>
                                    )}
                                </div>
                            </div>
                        )}

                        {billType === "broadband" && (
                            <div className="flex items-start max-w-[85%] border-b border-gray-200 pb-6">
                                <label className="w-1/3 text-gray-700">Account Number</label>
                                <div className="w-2/3">
                                    <input
                                        type="text"
                                        name="accountNumber"
                                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 ${errors.accountNumber ? "border-red-500" : ""
                                            }`}
                                        value={accountNumber}
                                        onChange={(e) => setAccountNumber(e.target.value)}
                                        onBlur={handleBlur}
                                    />
                                    {errors.accountNumber && (
                                        <p className="text-red-500 text-sm text-left">{errors.accountNumber}</p>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Bill Amount */}
                        <div className="flex items-start max-w-[85%] border-b border-gray-200 pb-6">
                            <label className="w-1/3 text-gray-700">
                                Bill Amount
                                <p className="text-sm text-gray-500">Enter the amount to pay</p>
                            </label>
                            <div className="w-2/3">
                                <input
                                    type="number"
                                    name="amount"
                                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 ${errors.amount ? "border-red-500" : ""
                                        }`}
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    onBlur={handleBlur}
                                />
                                {errors.amount && (
                                    <p className="text-red-500 text-sm text-left">{errors.amount}</p>
                                )}
                            </div>
                        </div>

                        {/* Transfer Note */}
                        <div className="flex items-start max-w-[85%] border-b border-gray-200 pb-6">
                            <label className="w-1/3 text-gray-700">
                                Transfer Note
                                <p className="text-sm text-gray-500">Optional: Add any note</p>
                            </label>
                            <div className="w-2/3">
                                <input
                                    name="transferNote"
                                    value={transferNote}
                                    onChange={(e) => setTransferNote(e.target.value)}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="text-center flex gap-5 justify-center">
                        <button
                            type="submit"
                            className="mt-6 px-5 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                        >
                            Pay Bill
                        </button>
                        <Link
                            to="/"
                            className="mt-6 px-5 bg-slate-200 text-black py-2 rounded-lg hover:bg-blue-600"
                        >
                            Close
                        </Link>

                    </div>
                </form>
            </div>
        </div>
    );
};

export default BillPayment;