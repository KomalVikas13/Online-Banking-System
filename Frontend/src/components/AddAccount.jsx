import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddAccount = () => {
    const navigator = useNavigate()
    const [accountType, setAccountType] = useState("");
    const [showInterestRates, setShowInterestRates] = useState(false);
    const [showTenureField, setShowTenureField] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

    const formatDateToYYYYMMDD = (date) => {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    // State to handle input values
    const [formValues, setFormValues] = useState({
        customerId: "",
        amount: "",
        tenure: "",
    });

    // State to handle error messages
    const [errors, setErrors] = useState({
        customerId: "",
        accountType: "",
        amount: "",
        tenure: "",
    });

    const handleAccountTypeChange = (event) => {
        const selectedType = event.target.value;
        setAccountType(selectedType);

        // Show Interest Rates link and tenure field based on account type
        if (selectedType === "Fixed Deposit" || selectedType === "Recurring Deposit") {
            setShowInterestRates(true);
            setShowTenureField(true);
        } else {
            setShowInterestRates(false);
            setShowTenureField(false);
        }
    };

    const handleBlur = (field, value) => {
        let errorMessage = "";

        // Check for empty fields
        if (!value) {
            errorMessage = `${field} is required.`;
        } else if (field === "customerId" && !/^\d{7,}$/.test(value)) {
            errorMessage = "Customer Id must contain at least 7 digits.";
        } else if (field === "amount") {
            const amount = parseFloat(value);
            // Validate minimum amount based on account type
            if (accountType === "Fixed Deposit" && amount < 500) {
                errorMessage = "Minimum amount for Fixed Deposit is 500.";
            } else if (accountType === "Recurring Deposit" && amount < 500) {
                errorMessage = "Minimum amount for Recurring Deposit is 500.";
            } else if ((accountType === "Current Account" || accountType === "Savings Account") && amount < 2000) {
                errorMessage = "Minimum amount for Savings or Current Account is 2000.";
            }
        }else if(field === "tenure" && value < 12){
            errorMessage = "Tenure must be greater than or equal 12 months."
        }

        setErrors((prevErrors) => ({
            ...prevErrors,
            [field]: errorMessage,
        }));
    };

    const handleChange = (field, value) => {
        setFormValues((prevValues) => ({
            ...prevValues,
            [field]: value,
        }));
    };

    const validateFields = () => {
        const newErrors = {
            customerId: "",
            accountType: "",
            amount: "",
            tenure: "",
        };

        // Validate Customer ID
        if (!formValues.customerId) {
            newErrors.customerId = "Customer Id is required.";
        } else if (!/^\d{7,}$/.test(formValues.customerId)) {
            newErrors.customerId = "Customer Id must contain at least 7 digits.";
        }

        // Validate Account Type
        if (!accountType) newErrors.accountType = "Account Type is required.";

        // Validate Amount
        const amount = parseFloat(formValues.amount);
        if (!formValues.amount) {
            newErrors.amount = "Amount is required.";
        } else if (isNaN(amount)) {
            newErrors.amount = "Amount must be a number.";
        } else if (accountType === "Fixed Deposit" && amount < 500) {
            newErrors.amount = "Minimum amount for Fixed Deposit is 500.";
        } else if (accountType === "Recurring Deposit" && amount < 500) {
            newErrors.amount = "Minimum amount for Recurring Deposit is 500.";
        } else if ((accountType === "Current Account" || accountType === "Savings Account") && amount < 2000) {
            newErrors.amount = "Minimum amount for Savings or Current Account is 2000.";
        }

        // Validate Tenure
        if (showTenureField) {
            const tenure = parseInt(formValues.tenure, 10);
            if (!formValues.tenure) {
                newErrors.tenure = "Tenure is required.";
            } else if (isNaN(tenure)) {
                newErrors.tenure = "Tenure must be a number.";
            } else if (tenure < 12) {
                newErrors.tenure = "Tenure must be greater than or equal 12 months.";
            }
        }

        setErrors(newErrors);

        // Return true if no errors
        return !Object.values(newErrors).some((msg) => msg !== "");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formattedDate = formatDateToYYYYMMDD(new Date());
    
        const calculation = () => {
            let interest = 0;
            let amountToBeCredited = 0;
            
            if (formValues.tenure >= 12 && formValues.tenure < 24) {
                interest = 7;
                amountToBeCredited = (formValues.amount * interest * (formValues.tenure/12)) / 100;
            } else if (formValues.tenure >= 24 && formValues.tenure < 36) {
                interest = 7.9;
                amountToBeCredited = (formValues.amount * interest * (formValues.tenure/12)) / 100;
            } else if (formValues.tenure >= 36 && formValues.tenure <= 60) {
                interest = 8.08;
                amountToBeCredited = (formValues.amount * interest * (formValues.tenure/12)) / 100;
            }
    
            return { interest, amountToBeCredited };
        };
    
        const { interest, amountToBeCredited } = calculation();
    
        // Validate all fields before submitting
        if (!validateFields()) {
            console.error("Validation failed");
            return; 
        }
    
        console.log("Validated");
        const data = {
            accountType: accountType,
            customerId: formValues.customerId,
            accountBalance: formValues.amount,
            accountCreationDate: formattedDate,
            tenure: formValues.tenure,
            interest: interest,
            amountToBeCredited: amountToBeCredited
        }
        console.log(data)
        try {
            const response = await axios.post("http://localhost:9999/account/createAccount", data, { withCredentials: true })
            console.log(response)
            if(response.status === 200 && response.data === "CREATED"){
                toast.success("Account created")
                navigator("/dashboard")
            }
        } catch (error) {
            if(error.response.status === 404 && error.response.data === "NOT_FOUND"){
                toast.error("Customer not found..Please verify Customer Id")
            }
            else{
                toast.error("Something went wrong..please try again")
            }
        }
        console.log();
    };
    

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen); // Toggle modal visibility
    };

    return (
        <div className="bg-gray-100 flex justify-center items-center min-h-screen">
            <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">Add Account</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            type="number"
                            placeholder="Customer Id"
                            className="w-full p-2 border border-gray-300 rounded"
                            onChange={(e) => handleChange("customerId", e.target.value)}
                            onBlur={(e) => handleBlur("customerId", e.target.value)}
                        />
                        {errors.customerId && (
                            <p className="text-xs text-red-500">{errors.customerId}</p>
                        )}
                    </div>

                    <div className="flex items-center space-x-2">
                        <select
                            value={accountType}
                            onChange={handleAccountTypeChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            onBlur={(e) => handleBlur("accountType", e.target.value)}
                        >
                            <option value="" disabled>
                                Select Account Type
                            </option>
                            <option value="Fixed Deposit">Fixed Deposit</option>
                            <option value="Recurring Deposit">Recurring Deposit</option>
                            <option value="Current Account">Current Account</option>
                            <option value="Savings Account">Savings Account</option>
                        </select>
                        {showInterestRates && (
                            <button
                                type="button"
                                onClick={toggleModal}
                                className="text-indigo-600 hover:underline"
                            >
                                Interest Rates
                            </button>
                        )}
                    </div>
                    {errors.accountType && (
                        <p className="text-xs text-red-500">{errors.accountType}</p>
                    )}

                    <div>
                        <input
                            type="number"
                            placeholder="Amount"
                            className="w-full p-2 border border-gray-300 rounded"
                            onChange={(e) => handleChange("amount", e.target.value)}
                            onBlur={(e) => handleBlur("amount", e.target.value)}
                        />
                        {errors.amount && (
                            <p className="text-xs text-red-500">{errors.amount}</p>
                        )}
                    </div>

                    {showTenureField && (
                        <div>
                            <input
                                type="number"
                                placeholder="Tenure (In months)"
                                className="w-full p-2 border border-gray-300 rounded"
                                onChange={(e) => handleChange("tenure", e.target.value)}
                                onBlur={(e) => handleBlur("tenure", e.target.value)}
                            />
                            {errors.tenure && (
                                <p className="text-xs text-red-500">{errors.tenure}</p>
                            )}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md font-medium hover:bg-indigo-700 transition duration-300"
                    >
                        Create Account
                    </button>
                </form>
            </div>

            {/* Modal Component */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded shadow-lg">
                        <h3 className="text-lg font-semibold mb-4">Interest Rates</h3>
                        <p>1 year  ≤ Tenure {"<"} 2 years: 7%</p>
                        <p>2 years ≤ Tenure {"<"} 3 years: 7.9%</p>
                        <p>3 years ≤ Tenure {"<"} 5 years: 8.08%</p>
                        <button
                            onClick={toggleModal}
                            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddAccount;
