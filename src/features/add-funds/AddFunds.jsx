import {
    AlertCircle,
    CheckCircle2,
} from "lucide-react";

import Sidebar from "../../components/layout/Sidebar";
import Topbar from "../../components/layout/Topbar";
import MobileNavigation from "../../components/layout/MobileNavigation";

import useAddFunds from "./hooks/useAddFunds";

import AccountBalance from "./components/AccountBalance";
import PaymentMethods from "./components/PaymentMethods";
import PaymentDetails from "./components/PaymentDetails";
import VerifyPayment from "./components/VerifyPayment";
import PaymentHistory from "./components/PaymentHistory";
import PaymentDetailsModal from "./components/PaymentDetailsModal";

const AddFunds = () => {
    const {
        selectedMethod,
        selectedPaymentMethod,
        handlePaymentMethodChange,

        paymentMethods,
        methodsLoading,
        methodsError,

        amount,
        setAmount,
        transactionId,
        setTransactionId,

        paymentHistory,
        loading,
        selectedPayment,

        errors,
        message,
        minimumAmount,

        handleVerifyPayment,
        handleViewPayment,
        handleClosePayment,
        handleContactSupport,
    } = useAddFunds();

    return (
        <div className="flex h-screen w-full overflow-hidden bg-bg">

            {/* Sidebar */}
            <div className="hidden md:block">

                <Sidebar />
            </div>

            {/* Main Area */}
            <div className="flex h-full min-w-0 flex-1 flex-col">

                {/* Topbar */}
                <Topbar />

                {/* Page Content */}
                <main
                    className="
                        hide-scrollbar
                        min-w-0
                        flex-1
                        overflow-y-auto
                        px-3
                        py-3
                        pb-16

                        sm:px-4
                        sm:py-4

                        md:pb-3
                    "
                >
                    <div className="mx-auto w-full max-w-[1600px] min-w-0">

                        {/* Success / Error Message */}


                        {/* Main Grid */}
                        <div
                            className="
                                grid
                                min-w-0
                                grid-cols-1
                                gap-3

                                xl:grid-cols-[1.65fr_1fr]
                            "
                        >

                            {/* Left Column */}
                            <div className="min-w-0 space-y-3">


                                {message.text && (
                                    <div
                                        className={`
flex
min-w-0
items-start
gap-2.5
rounded-md
border
px-3
py-3

sm:gap-3
sm:px-4

                                            ${message.type === "success"
                                                ? "border-green-200 bg-green-50 text-green-700"
                                                : "border-red-200 bg-red-50 text-red-600"
                                            }
`}
                                    >
                                        <div className="mt-0.5 shrink-0">
                                            {message.type === "success" ? (
                                                <CheckCircle2
                                                    size={17}
                                                    strokeWidth={1.8}
                                                />
                                            ) : (
                                                <AlertCircle
                                                    size={17}
                                                    strokeWidth={1.8}
                                                />
                                            )}
                                        </div>

                                        <p
                                            className="
                                                min-w-0
                                                break-words
                                                text-[11px]
                                                font-medium
                                                leading-5

                                                sm:text-xs
                                            "
                                        >
                                            {message.text}
                                        </p>
                                    </div>
                                )}


                                {/* Minimum Amount */}
                                {/* <div
                                    className="
                                        min-w-0
                                        rounded-md
                                        border
                                        border-light-azure
                                        bg-light-blue
                                        px-3
                                        py-3

                                        sm:px-4
                                    "
                                >
                                    <p
                                        className="
                                            break-words
                                            text-[11px]
                                            font-medium
                                            leading-5
                                            text-dark-gray

                                            sm:text-xs
                                        "
                                    >
                                        Minimum deposit amount:

                                        <span
                                            className="
                                                ml-1
                                                font-medium
                                                text-dark-blue
                                            "
                                        >
                                            PKR {minimumAmount}
                                        </span>
                                    </p>
                                </div> */}

                                {/* Payment Methods */}
                                <PaymentMethods
                                    selectedMethod={selectedMethod}
                                    onSelectMethod={
                                        handlePaymentMethodChange
                                    }
                                    paymentMethods={paymentMethods}
                                    loading={methodsLoading}
                                    error={methodsError}
                                />

                                <PaymentDetails
                                    selectedMethod={
                                        selectedPaymentMethod
                                    }
                                />



                                {/* Our Payment Details */}


                                {/* Verify Payment */}

                            </div>

                            <VerifyPayment
                                selectedMethod={selectedMethod}
                                amount={amount}
                                transactionId={transactionId}
                                onAmountChange={setAmount}
                                onTransactionIdChange={
                                    setTransactionId
                                }
                                onVerify={handleVerifyPayment}
                                loading={loading}
                                errors={errors}
                            />

                            {/* Right Column */}
                            <aside className="min-w-0 space-y-3">

                                {/* Account Balance */}
                                {/* <AccountBalance
                                    balance={0}
                                    currency="PKR"
                                    minimumAmount={minimumAmount}
                                /> */}

                                {/* Payment History */}
                                {/* <PaymentHistory
                                    payments={paymentHistory}
                                    onViewPayment={
                                        handleViewPayment
                                    }
                                /> */}

                                {/* Support */}
                                {/* 
                                <SupportCard
                                    onContactSupport={
                                        handleContactSupport
                                    }
                                /> 
                                */}


                            </aside>
                        </div>
                    </div>
                </main>
            </div>

            {/* Mobile Navigation */}
            <MobileNavigation />

            {/* Payment Details Modal */}
            <PaymentDetailsModal
                payment={selectedPayment}
                onClose={handleClosePayment}
            />
        </div>
    );
};

export default AddFunds;