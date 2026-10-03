import {
    useEffect,
    useState,
} from "react";

const API_URL =
    import.meta.env.VITE_API_URL ||
    "http://localhost:5000/api";

const MINIMUM_AMOUNTS = {
    PKR: 10,
    USD: 1,
};

const getAuthToken = () => {
    return (
        localStorage.getItem("aifi_token")
    );
};

const useAddFunds = () => {
    // =========================
    // Payment Methods
    // =========================
    const [paymentMethods, setPaymentMethods] =
        useState([]);

    const [methodsLoading, setMethodsLoading] =
        useState(true);

    const [methodsError, setMethodsError] =
        useState("");

    // =========================
    // Payment Form State
    // =========================
    const [selectedMethod, setSelectedMethod] =
        useState("");

    const [amount, setAmount] =
        useState("");

    const [transactionId, setTransactionId] =
        useState("");

    // =========================
    // Payment History
    // =========================
    const [paymentHistory, setPaymentHistory] =
        useState([]);

    // =========================
    // UI State
    // =========================
    const [loading, setLoading] =
        useState(false);

    const [selectedPayment, setSelectedPayment] =
        useState(null);

    // =========================
    // Validation / Message
    // =========================
    const [errors, setErrors] =
        useState({});

    const [message, setMessage] =
        useState({
            type: "",
            text: "",
        });

    // =========================
    // Fetch Payment Methods
    // =========================
    useEffect(() => {
        const fetchPaymentMethods = async () => {
            setMethodsLoading(true);
            setMethodsError("");

            try {
                const token =
                    getAuthToken();

                const response =
                    await fetch(
                        `${API_URL}/payment-methods`,
                        {
                            method: "GET",

                            headers: {
                                ...(token && {
                                    Authorization:
                                        `Bearer ${token}`,
                                }),
                            },
                        }
                    );

                const data =
                    await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message ||
                        "Unable to load payment methods."
                    );
                }

                const methods =
                    Array.isArray(
                        data.paymentMethods
                    )
                        ? data.paymentMethods
                        : Array.isArray(
                            data.methods
                        )
                            ? data.methods
                            : [];

                setPaymentMethods(
                    methods
                );

                // Select first available method
                if (methods.length > 0) {
                    setSelectedMethod(
                        (current) => {
                            const stillExists =
                                methods.some(
                                    (method) =>
                                        method.key ===
                                        current
                                );

                            return stillExists
                                ? current
                                : methods[0].key;
                        }
                    );
                } else {
                    setSelectedMethod("");
                }
            } catch (error) {
                console.error(
                    "Fetch Payment Methods Error:",
                    error
                );

                setMethodsError(
                    error.message ||
                    "Unable to load payment methods."
                );

                setPaymentMethods([]);
                setSelectedMethod("");
            } finally {
                setMethodsLoading(false);
            }
        };

        fetchPaymentMethods();
    }, []);

    // =========================
    // Selected Payment Method
    // =========================
    const selectedPaymentMethod =
        paymentMethods.find(
            (method) =>
                method.key ===
                selectedMethod
        ) || null;

    // =========================
    // Minimum Amount
    // =========================
    const minimumAmount =
        selectedPaymentMethod
            ? MINIMUM_AMOUNTS[
            selectedPaymentMethod.currency
            ] || 1
            : 1;

    // =========================
    // Change Payment Method
    // =========================
    const handlePaymentMethodChange = (
        method
    ) => {
        setSelectedMethod(method);

        setAmount("");

        setTransactionId("");

        setErrors({});

        setMessage({
            type: "",
            text: "",
        });
    };

    // =========================
    // Amount Change
    // =========================
    const handleAmountChange = (
        value
    ) => {
        if (
            !/^\d*\.?\d*$/.test(
                value
            )
        ) {
            return;
        }

        setAmount(value);

        setErrors((prev) => ({
            ...prev,
            amount: "",
        }));

        setMessage({
            type: "",
            text: "",
        });
    };

    // =========================
    // Transaction ID Change
    // =========================
    const handleTransactionIdChange = (
        value
    ) => {
        setTransactionId(value);

        setErrors((prev) => ({
            ...prev,
            transactionId: "",
        }));

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

        const numericAmount =
            Number(amount);

        const currency =
            selectedPaymentMethod?.currency ||
            "PKR";

        if (
            !selectedPaymentMethod
        ) {
            newErrors.method =
                "Please select a payment method.";
        }

        if (
            !amount ||
            amount.trim() === ""
        ) {
            newErrors.amount =
                "Please enter the payment amount.";
        } else if (
            Number.isNaN(
                numericAmount
            )
        ) {
            newErrors.amount =
                "Please enter a valid amount.";
        } else if (
            numericAmount <= 0
        ) {
            newErrors.amount =
                "Amount must be greater than 0.";
        } else if (
            numericAmount <
            minimumAmount
        ) {
            newErrors.amount =
                `Minimum amount is ${currency} ${minimumAmount}.`;
        }

        if (
            !transactionId ||
            !transactionId.trim()
        ) {
            newErrors.transactionId =
                "Transaction ID is required.";
        } else if (
            transactionId.trim().length <
            3
        ) {
            newErrors.transactionId =
                "Please enter a valid transaction ID.";
        }

        setErrors(
            newErrors
        );

        return (
            Object.keys(
                newErrors
            ).length === 0
        );
    };

    // =========================
    // Submit Payment
    // =========================
    const handleVerifyPayment =
        async () => {
            setMessage({
                type: "",
                text: "",
            });

            const isValid =
                validatePayment();

            if (!isValid) {
                setMessage({
                    type: "error",
                    text:
                        "Please fix the highlighted fields.",
                });

                return;
            }

            setLoading(true);

            try {
                const token =
                    getAuthToken();

                const response =
                    await fetch(
                        `${API_URL}/payments`,
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json",

                                ...(token && {
                                    Authorization:
                                        `Bearer ${token}`,
                                }),
                            },

                            body:
                                JSON.stringify({
                                    method:
                                        selectedPaymentMethod.key,

                                    amount:
                                        Number(
                                            amount
                                        ),

                                    transactionId:
                                        transactionId.trim(),
                                }),
                        }
                    );

                const data =
                    await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message ||
                        "Unable to submit payment."
                    );
                }

                // =========================
                // Add Returned Payment
                // =========================
                if (
                    data.payment
                ) {
                    setPaymentHistory(
                        (prev) => [
                            data.payment,
                            ...prev,
                        ]
                    );
                }

                // =========================
                // Success
                // =========================
                setMessage({
                    type: "success",
                    text:
                        data.message ||
                        "Payment request submitted successfully. It is pending review.",
                });

                resetForm();
            } catch (error) {
                console.error(
                    "Payment verification error:",
                    error
                );

                setMessage({
                    type: "error",
                    text:
                        error.message ||
                        "Something went wrong. Please try again.",
                });
            } finally {
                setLoading(false);
            }
        };

    // =========================
    // View Payment Details
    // =========================
    const handleViewPayment = (
        payment
    ) => {
        setSelectedPayment(
            payment
        );
    };

    // =========================
    // Close Payment Details
    // =========================
    const handleClosePayment = () => {
        setSelectedPayment(
            null
        );
    };

    // =========================
    // Contact Support
    // =========================
    const handleContactSupport = () => {
        console.log(
            "Contact support"
        );
    };

    // =========================
    // Return
    // =========================
    return {
        // Payment methods
        paymentMethods,
        selectedPaymentMethod,
        selectedMethod,
        handlePaymentMethodChange,
        methodsLoading,
        methodsError,

        // Payment form
        amount,
        setAmount:
            handleAmountChange,

        transactionId,
        setTransactionId:
            handleTransactionIdChange,

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
        minimumAmount,

        // Actions
        handleVerifyPayment,
        handleViewPayment,
        handleClosePayment,
        handleContactSupport,
    };
};

export default useAddFunds;