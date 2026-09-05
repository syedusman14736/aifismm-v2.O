import React from "react";
import {
    Clock3,
    CheckCircle2,
    XCircle,
    X,
} from "lucide-react";

const PaymentDetailsModal = ({ payment, onClose }) => {
    if (!payment) return null;

    const getStatusClasses = (status) => {
        switch (status) {
            case "completed":
                return "bg-green-50 text-green-700";

            case "rejected":
                return "bg-red-50 text-red-700";

            case "pending":
            default:
                return "bg-yellow-50 text-yellow-700";
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case "completed":
                return CheckCircle2;

            case "rejected":
                return XCircle;

            case "pending":
            default:
                return Clock3;
        }
    };

    const getStatusLabel = (status) => {
        switch (status) {
            case "completed":
                return "Completed";

            case "rejected":
                return "Rejected";

            case "pending":
            default:
                return "Pending";
        }
    };

    const StatusIcon = getStatusIcon(payment.status);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
            {/* Modal */}
            <div className="w-full max-w-lg overflow-hidden rounded-xl bg-white shadow-xl">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-[#e5e7eb] px-5 py-4">
                    <div>
                        <h2 className="text-[15px] font-semibold text-[#111827]">
                            Payment Details
                        </h2>

                        <p className="mt-1 text-[11px] text-[#9ca3af]">
                            {payment.id}
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="
                            cursor-pointer
                            flex
                            h-8
                            w-8
                            items-center
                            justify-center
                            rounded-md
                            text-[#6b7280]
                            transition
                            hover:bg-[#f3f4f6]
                            hover:text-[#111827]
                        "
                    >
                        <X size={16} />
                    </button>
                </div>

                {/* Content */}
                <div className="max-h-[70vh] overflow-y-auto px-5 pb-5">
                    {/* Status */}
                    <div className="mb-4">
                        {/* Pending Notice */}
                        {payment.status === "pending" && (
                            <div className="mt-4 rounded-md bg-[#fff3e8] px-4 py-3">
                                <div className="flex items-start gap-2.5">
                                    <Clock3
                                        size={15}
                                        className="mt-0.5 shrink-0 text-[#fa6c0a]"
                                    />

                                    <div>
                                        <p className="text-xs font-medium text-[#fa6c0a]">
                                            Payment under review
                                        </p>

                                        <p className="mt-1 text-[10px] leading-4 text-[#fa6c0a]">
                                            Your payment has been submitted
                                            successfully. Your account balance
                                            will be updated after the payment
                                            is verified.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Completed Notice */}
                        {payment.status === "completed" && (
                            <div className="mt-4 rounded-md border border-green-200 bg-green-50 px-4 py-3">
                                <div className="flex items-start gap-2.5">
                                    <CheckCircle2
                                        size={15}
                                        className="mt-0.5 shrink-0 text-green-600"
                                    />

                                    <div>
                                        <p className="text-xs font-medium text-green-700">
                                            Payment verified
                                        </p>

                                        <p className="mt-1 text-[10px] leading-4 text-green-600">
                                            This payment has been successfully
                                            verified and the balance has been
                                            added to your account.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Rejected Notice */}
                        {payment.status === "rejected" && (
                            <div className="mt-4 rounded-md border border-red-200 bg-red-50 px-4 py-3">
                                <div className="flex items-start gap-2.5">
                                    <XCircle
                                        size={15}
                                        className="mt-0.5 shrink-0 text-red-600"
                                    />

                                    <div>
                                        <p className="text-xs font-medium text-red-700">
                                            Payment rejected
                                        </p>

                                        <p className="mt-1 text-[10px] leading-4 text-red-600">
                                            This payment could not be verified.
                                            Please contact support if you believe
                                            this was a mistake.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="mb-3 flex items-center justify-between rounded-md border border-[#e5e7eb] bg-[#fafafa] px-4 py-3">
                        <div>
                            <p className="text-[10px] text-[#9ca3af]">
                                Payment Status
                            </p>

                            <p className="mt-1 text-xs font-medium text-[#374151]">
                                {getStatusLabel(payment.status)}
                            </p>
                        </div>


                    </div>



                    {/* Payment Information */}
                    <div className="mb-5">
                        <p className="mb-2 text-[11px] font-medium text-[#6b7280]">
                            Payment Information
                        </p>

                        <div className="grid grid-cols-2 overflow-hidden rounded-md border border-[#e5e7eb]">
                            <InfoItem
                                label="Payment ID"
                                value={payment.id}
                            />

                            <InfoItem
                                label="Method"
                                value={payment.method}
                            />

                            <InfoItem
                                label="Amount"
                                value={`PKR ${Number(
                                    payment.amount || 0
                                ).toLocaleString()}`}
                            />

                            <InfoItem
                                label="Transaction ID"
                                value={payment.transactionId}
                            />

                            <InfoItem
                                label="Date"
                                value={
                                    payment.date
                                        ? new Date(
                                            payment.date
                                        ).toLocaleDateString()
                                        : "-"
                                }
                            />

                            <InfoItem
                                label="Time"
                                value={
                                    payment.date
                                        ? new Date(
                                            payment.date
                                        ).toLocaleTimeString(
                                            "en-PK",
                                            {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            }
                                        )
                                        : "-"
                                }
                            />
                        </div>
                    </div>

                    {/* Submitted Amount */}
                    <div>
                        <p className="mb-2 text-[11px] font-medium text-[#6b7280]">
                            Payment Summary
                        </p>

                        <div className="flex items-center justify-between rounded-md border border-[#e5e7eb] px-4 py-3">
                            <div>
                                <p className="text-xs font-medium text-[#374151]">
                                    Submitted Amount
                                </p>

                                <p className="mt-1 text-[10px] text-[#9ca3af]">
                                    Amount submitted for verification
                                </p>
                            </div>

                            <p className="text-sm font-semibold text-[#111827]">
                                PKR{" "}
                                {Number(
                                    payment.amount || 0
                                ).toLocaleString()}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-end border-t border-[#e5e7eb] px-5 py-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="
                            cursor-pointer
                            rounded-md
                            bg-[#111827]
                            px-4
                            py-2
                            text-xs
                            font-medium
                            text-white
                            transition
                            hover:bg-[#1f2937]
                        "
                    >
                        Close
                    </button>
                </div>
            </div>
        </div >
    );
};

const InfoItem = ({ label, value }) => {
    return (
        <div className="min-w-0 border-b border-r border-[#e5e7eb] px-3 py-3">
            <p className="text-[10px] text-[#9ca3af]">
                {label}
            </p>

            <p
                title={value || "-"}
                className="mt-1 truncate text-xs font-medium text-[#374151]"
            >
                {value || "-"}
            </p>
        </div>
    );
};

export default PaymentDetailsModal; 