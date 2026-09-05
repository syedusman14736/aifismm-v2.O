import { useState } from "react";

const MINIMUM_AMOUNT = 100;

const useAddFunds = () => {
    // =========================
    // Payment Form State
    // =========================
    const [selectedMethod, setSelectedMethod] = useState("easypaisa");
    const [amount, setAmount] = useState("");
    const [transactionId, setTransactionId] = useState("");

    // =========================
    // Payment History
    // =========================
    const [paymentHistory, setPaymentHistory] = useState([]);

    // =========================
    // UI State
    // =========================
    const [loading, setLoading] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState(null);

    // =========================
    // Validation / Message State
    // =========================
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState({
        type: "",
        text: "",
    });

    // =========================
    // Payment Method Names
    // =========================
    const methodName = {
        easypaisa: "Easypaisa",
        jazzcash: "JazzCash",
        bank: "Bank Transfer",
    };

    // =========================
    // Change Payment Method
    // =========================
    const handlePaymentMethodChange = (method) => {
        setSelectedMethod(method);

        // Clear previous errors/messages
        setErrors({});
        setMessage({
            type: "",
            text: "",
        });
    };

    // =========================
    // Amount Change
    // =========================
    const handleAmountChange = (value) => {
        // Allow only numbers and one decimal point
        if (!/^\d*\.?\d*$/.test(value)) {
            return;
        }

        setAmount(value);

        // Clear amount error
        setErrors((prev) => ({
            ...prev,
            amount: "",
        }));

        // Clear message
        setMessage({
            type: "",
            text: "",
        });
    };

    // =========================
    // Transaction ID Change
    // =========================
    const handleTransactionIdChange = (value) => {
        setTransactionId(value);

        // Clear transaction ID error
        setErrors((prev) => ({
            ...prev,
            transactionId: "",
        }));

        // Clear message
        setMessage({
            type: "",
            text: "",
        });
    };

    // =========================
    // Reset Form
    // =========================
    const resetForm = () => {
        setAmount("");
        setTransactionId("");

        setErrors({});
    };

    // =========================
    // Validate Payment
    // =========================
    const validatePayment = () => {
        const newErrors = {};

        const numericAmount = Number(amount);

        // Amount validation
        if (!amount || amount.trim() === "") {
            newErrors.amount = "Please enter the payment amount.";
        } else if (Number.isNaN(numericAmount)) {
            newErrors.amount = "Please enter a valid amount.";
        } else if (numericAmount <= 0) {
            newErrors.amount = "Amount must be greater than 0.";
        } else if (numericAmount < MINIMUM_AMOUNT) {
            newErrors.amount = `Minimum amount is PKR ${MINIMUM_AMOUNT}.`;
        }

        // Transaction ID validation
        if (!transactionId || !transactionId.trim()) {
            newErrors.transactionId = "Transaction ID is required.";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    // =========================
    // Verify / Submit Payment
    // =========================
    const handleVerifyPayment = async () => {
        // Clear previous message
        setMessage({
            type: "",
            text: "",
        });

        // Validate form
        const isValid = validatePayment();

        if (!isValid) {
            setMessage({
                type: "error",
                text: "Please fix the highlighted fields.",
            });

            return;
        }

        setLoading(true);

        try {
            /*
             * TEMPORARY FRONTEND RESPONSE
             *
             * Later this section will be replaced with:
             *
             * await fetch(`${API_URL}/payments`, {
             *     method: "POST",
             *     headers: {
             *         "Content-Type": "application/json",
             *     },
             *     body: JSON.stringify({
             *         method: selectedMethod,
             *         amount: Number(amount),
             *         transactionId: transactionId.trim(),
             *     }),
             * });
             */

            await new Promise((resolve) => {
                setTimeout(resolve, 1000);
            });

            // =========================
            // Create Payment Object
            // =========================
            const newPayment = {
                id: `#PAY-${Date.now()}`,

                method: methodName[selectedMethod],

                amount: Number(amount),

                transactionId: transactionId.trim(),

                // Payment will be reviewed by admin
                status: "pending",

                date: new Date().toISOString(),
            };

            // =========================
            // Add Payment To History
            // =========================
            setPaymentHistory((prev) => [
                newPayment,
                ...prev,
            ]);

            // =========================
            // Success Message
            // =========================
            setMessage({
                type: "success",
                text: "Payment verification submitted successfully. Your payment is now under review.",
            });

            // =========================
            // Reset Form
            // =========================
            resetForm();
        } catch (error) {
            console.error(
                "Payment verification error:",
                error
            );

            setMessage({
                type: "error",
                text: "Something went wrong. Please try again.",
            });
        } finally {
            setLoading(false);
        }
    };

    // =========================
    // View Payment Details
    // =========================
    const handleViewPayment = (payment) => {
        setSelectedPayment(payment);
    };

    // =========================
    // Close Payment Details
    // =========================
    const handleClosePayment = () => {
        setSelectedPayment(null);
    };

    // =========================
    // Contact Support
    // =========================
    const handleContactSupport = () => {
        console.log("Contact support");
    };

    // =========================
    // Return
    // =========================
    return {
        // Payment method
        selectedMethod,
        handlePaymentMethodChange,

        // Payment form
        amount,
        setAmount: handleAmountChange,

        transactionId,
        setTransactionId: handleTransactionIdChange,

        // Payment history
        paymentHistory,

        // UI
        loading,
        selectedPayment,

        // Validation
        errors,

        // Messages
        message,

        // Config
        minimumAmount: MINIMUM_AMOUNT,

        // Actions
        handleVerifyPayment,
        handleViewPayment,
        handleClosePayment,
        handleContactSupport,
    };
};

export default useAddFunds;