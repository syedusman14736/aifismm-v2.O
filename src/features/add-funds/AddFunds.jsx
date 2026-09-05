import {
    AlertCircle,
    CheckCircle2,
} from "lucide-react";

import Sidebar from "../../components/layout/Sidebar";
import Topbar from "../../components/layout/Topbar";

import useAddFunds from "./hooks/useAddFunds";

import AccountBalance from "./components/AccountBalance";
import PaymentMethods from "./components/PaymentMethods";
import PaymentDetails from "./components/PaymentDetails";
import VerifyPayment from "./components/VerifyPayment";
import PaymentHistory from "./components/PaymentHistory";
import SupportCard from "./components/SupportCard";
import PaymentDetailsModal from "./components/PaymentDetailsModal";

const AddFunds = () => {
    const {
        // Payment method
        selectedMethod,
        handlePaymentMethodChange,

        // Payment form
        amount,
        setAmount,
        transactionId,
        setTransactionId,

        // Payment history
        paymentHistory,

        // UI state
        loading,
        selectedPayment,

        // Validation
        errors,

        // Message
        message,

        // Config
        minimumAmount,

        // Actions
        handleVerifyPayment,
        handleViewPayment,
        handleClosePayment,
        handleContactSupport,
    } = useAddFunds();

    return (
        <div className="flex h-screen w-full overflow-hidden bg-white">

            {/* =========================
                Sidebar
            ========================= */}
            <Sidebar />

            {/* =========================
                Main Area
            ========================= */}
            <div className="flex h-full min-w-0 flex-1 flex-col">

                {/* Topbar */}
                <Topbar />

                {/* =========================
                    Page Content
                ========================= */}
                <main className="hide-scrollbar flex-1 overflow-y-auto px-4 py-4">
                    <div className="mx-auto w-full max-w-[1600px]">
                        {/* =========================
                            Main Grid
                        ========================= */}
                        <div className="grid grid-cols-1 gap-3 xl:grid-cols-[1.65fr_1fr]">

                            {/* =========================
                                Left Column
                            ========================= */}
                            <div className="space-y-3">
                                {/* =========================
                                    Minimum Amount
                                ========================= */}
                                <div className="rounded-md border border-[#e5e7eb] bg-white px-4 py-3">
                                    <p className="text-xs font-medium text-[#8a93a5]">
                                        Minimum deposit amount:

                                        <span className="ml-1 font-semibold text-[#252525]">
                                            PKR {minimumAmount}
                                        </span>
                                    </p>
                                </div>

                                {/* Payment Methods */}
                                <PaymentMethods
                                    selectedMethod={selectedMethod}
                                    onSelectMethod={
                                        handlePaymentMethodChange
                                    }
                                />

                                {/* =========================
                                    Success / Error Message
                                ========================= */}
                                {message.text && (
                                    <div
                                        className={`flex items-start gap-3 rounded-md border px-4 py-3 ${message.type === "success"
                                            ? "border-green-200 bg-green-50 text-green-700"
                                            : "border-red-200 bg-red-50 text-red-600"
                                            }`}
                                    >
                                        <div className="mt-0.5 shrink-0">
                                            {message.type === "success" ? (
                                                <CheckCircle2 size={18} />
                                            ) : (
                                                <AlertCircle size={18} />
                                            )}
                                        </div>

                                        <p className="text-xs font-medium leading-5">
                                            {message.text}
                                        </p>
                                    </div>
                                )}

                                {/* =========================
                                    Our Payment Details
                                ========================= */}
                                <PaymentDetails
                                    selectedMethod={selectedMethod}
                                />

                                {/* =========================
                                    Verify Payment
                                ========================= */}
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
                            </div>

                            {/* =========================
                                Right Column
                            ========================= */}
                            <aside className="space-y-3 ">

                                {/* Account Balance */}
                                <AccountBalance
                                    balance={0}
                                    currency="PKR"
                                    minimumAmount={minimumAmount}
                                />

                                {/* Payment History */}
                                <PaymentHistory
                                    payments={paymentHistory}
                                    onViewPayment={handleViewPayment}
                                />

                                {/* Support */}
                                {/* <SupportCard
                                    onContactSupport={
                                        handleContactSupport
                                    }
                                /> */}
                            </aside>
                        </div>
                    </div>
                </main>
            </div>

            {/* =========================
                Payment Details Modal
            ========================= */}
            <PaymentDetailsModal
                payment={selectedPayment}
                onClose={handleClosePayment}
            />
        </div>
    );
};

export default AddFunds;