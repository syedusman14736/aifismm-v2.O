import {
    AlertCircle,
    CheckCircle2,
    Clipboard,
    CreditCard,
    X,
} from "lucide-react";

import PaymentStatus from "./PaymentStatus";

const formatDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleDateString(
        "en-US",
        {
            day: "2-digit",
            month: "short",
            year: "numeric",
        }
    );
};

const formatDateTime = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleString(
        "en-US",
        {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        }
    );
};

const formatAmount = (
    amount,
    currency
) => {
    if (
        amount === undefined ||
        amount === null
    ) {
        return "—";
    }

    return `${currency || ""} ${Number(
        amount
    ).toLocaleString()}`;
};

const PaymentDetailsModal = ({
    payment,
    loading,
    error,
    onClose,
}) => {
    const handleCopy = async (value) => {
        if (!value) return;

        try {
            await navigator.clipboard.writeText(
                value
            );
        } catch (copyError) {
            console.error(
                "Copy failed:",
                copyError
            );
        }
    };

    return (
        <div
            className="
                fixed
                inset-0
                z-[100]
                flex
                items-center
                justify-center
                bg-black/40
                p-3
                sm:p-5
            "
            onClick={onClose}
        >
            <div
                className="
                    w-full
                    max-w-lg
                    overflow-hidden
                    rounded-md
                    border
                    border-light-azure
                    bg-white
                "
                onClick={(event) =>
                    event.stopPropagation()
                }
            >
                <div
                    className="
                        flex
                        items-center
                        justify-between
                        border-b
                        border-light-azure
                        px-4
                        py-3.5
                        sm:px-5
                    "
                >
                    <div className="flex items-center gap-2.5">
                        <div
                            className="
                                flex
                                h-8
                                w-8
                                items-center
                                justify-center
                                rounded-lg
                                bg-primary-blue/5
                                text-primary-blue
                            "
                        >
                            <CreditCard
                                size={16}
                                strokeWidth={1.8}
                            />
                        </div>

                        <div>
                            <h3
                                className="
                                    text-sm
                                    font-medium
                                    text-primary-blue
                                "
                            >
                                Payment Details
                            </h3>

                            <p
                                className="
                                    text-[10px]
                                    text-dark-gray
                                "
                            >
                                Payment transaction
                                information
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="
                            flex
                            h-8
                            w-8
                            cursor-pointer
                            items-center
                            justify-center
                            rounded-md
                            text-dark-gray
                            transition-colors
                            hover:bg-gray/10
                            hover:text-dark-gray
                        "
                    >
                        <X
                            size={17}
                            strokeWidth={1.8}
                        />
                    </button>
                </div>

                <div
                    className="
                        max-h-[75vh]
                        overflow-y-auto
                        p-4
                        sm:p-5
                    "
                >
                    {loading && (
                        <div className="space-y-4">
                            <div className="h-20 animate-pulse rounded-lg bg-gray-100" />

                            <div className="grid grid-cols-2 gap-3">
                                <div className="h-14 animate-pulse rounded-lg bg-gray-100" />
                                <div className="h-14 animate-pulse rounded-lg bg-gray-100" />
                            </div>

                            <div className="h-14 animate-pulse rounded-lg bg-gray-100" />
                            <div className="h-14 animate-pulse rounded-lg bg-gray-100" />
                        </div>
                    )}

                    {!loading && error && (
                        <div
                            className="
                                flex
                                items-start
                                gap-2.5
                                rounded-lg
                                border
                                border-red-200
                                bg-red-50
                                p-3
                            "
                        >
                            <AlertCircle
                                size={16}
                                className="mt-0.5 shrink-0 text-red-500"
                            />

                            <p
                                className="
                                    text-xs
                                    leading-5
                                    text-red-600
                                "
                            >
                                {error}
                            </p>
                        </div>
                    )}

                    {!loading &&
                        !error &&
                        payment && (
                            <div className="space-y-4">
                                <div
                                    className="
                                        flex
                                        items-center
                                        justify-between
                                        rounded-lg
                                        border
                                        border-light-azure
                                        bg-light-blue
                                        p-3.5
                                    "
                                >
                                    <div>
                                        <p className="text-[10px] text-dark-gray">
                                            Amount
                                        </p>

                                        <p
                                            className="
                                                mt-1    
                                                text-base
                                                font-medium
                                                text-dark-gray
                                            "
                                        >
                                            {formatAmount(
                                                payment.amount,
                                                payment.currency
                                            )}
                                        </p>
                                    </div>

                                    <PaymentStatus
                                        status={
                                            payment.status
                                        }
                                    />
                                </div>

                                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                    <div
                                        className="
                                            rounded-lg
                                            border
                                            border-light-azure
                                            p-3
                                        "
                                    >
                                        <p className="text-[10px] text-dark-gray">
                                            Payment Method
                                        </p>

                                        <p className="mt-1 text-xs font-medium text-dark-gray">
                                            {payment.paymentMethod?.name ||
                                                payment.method ||
                                                "—"}
                                        </p>
                                    </div>

                                    <div
                                        className="
                                            rounded-lg
                                            border
                                            border-light-azure
                                            p-3
                                        "
                                    >
                                        <p className="text-[10px] text-dark-gray">
                                            Region
                                        </p>

                                        <p className="mt-1 text-xs font-medium capitalize text-dark-gray">
                                            {payment.region ===
                                                "pakistan"
                                                ? "Pakistan"
                                                : "International"}
                                        </p>
                                    </div>

                                    <div
                                        className="
                                            rounded-lg
                                            border
                                            border-light-azure
                                            p-3
                                        "
                                    >
                                        <p className="text-[10px] text-dark-gray">
                                            Currency
                                        </p>

                                        <p className="mt-1 text-xs font-medium text-dark-gray">
                                            {payment.currency ||
                                                "—"}
                                        </p>
                                    </div>

                                    <div
                                        className="
                                            rounded-lg
                                            border
                                            border-light-azure
                                            p-3
                                        "
                                    >
                                        <p className="text-[10px] text-dark-gray">
                                            Submitted
                                        </p>

                                        <p className="mt-1 text-xs font-medium text-dark-gray">
                                            {formatDateTime(
                                                payment.createdAt
                                            )}
                                        </p>
                                    </div>
                                </div>

                                <div
                                    className="
                                        rounded-lg
                                        border
                                        border-light-azure
                                        p-3
                                    "
                                >
                                    <div className="flex items-center justify-between gap-3">
                                        <div className="min-w-0">
                                            <p className="text-[10px] text-dark-gray">
                                                Transaction ID
                                            </p>

                                            <p
                                                className="
                                                    mt-1
                                                    truncate
                                                    text-xs
                                                    font-medium
                                                    text-dark-gray
                                                "
                                            >
                                                #{payment.transactionId ||
                                                    "—"}
                                            </p>
                                        </div>

                                        {payment.transactionId && (
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleCopy(
                                                        payment.transactionId
                                                    )
                                                }
                                                className="
                                                    flex
                                                    h-8
                                                    w-8
                                                    shrink-0
                                                    cursor-pointer
                                                    items-center
                                                    justify-center
                                                    rounded-md
                                                    border
                                                    border-light-azure
                                                    text-gray-500
                                                    transition-colors
                                                    hover:bg-gray-50
                                                    hover:text-primary-blue
                                                "
                                            >
                                                <Clipboard
                                                    size={14}
                                                />
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {payment.status ===
                                    "completed" && (
                                        <div
                                            className="
                                            rounded-lg
                                            border
                                            border-green-300
                                            bg-green-50
                                            p-3.5
                                        "
                                        >
                                            <div className="mb-3 flex items-center gap-2">
                                                <CheckCircle2
                                                    size={16}
                                                    className="text-green-600"
                                                />

                                                <p className="text-xs font-medium text-green-700">
                                                    Payment
                                                    Completed
                                                </p>
                                            </div>

                                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                                <div>
                                                    <p className="text-[10px] text-green-600/70">
                                                        Credited
                                                        Amount
                                                    </p>

                                                    <p className="mt-1 text-xs font-medium text-green-700">
                                                        {formatAmount(
                                                            payment.creditedAmount,
                                                            payment.creditedCurrency
                                                        )}
                                                    </p>
                                                </div>

                                                <div>
                                                    <p className="text-[10px] text-green-600/70">
                                                        Exchange
                                                        Rate
                                                    </p>

                                                    <p className="mt-1 text-xs font-medium text-green-700">
                                                        {payment.exchangeRate ??
                                                            "—"}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                {payment.status ===
                                    "rejected" && (
                                        <div
                                            className="
                                            rounded-lg
                                            border
                                            border-red-200
                                            bg-red-50
                                            p-3.5
                                        "
                                        >
                                            <p className="text-[10px] font-medium text-red-500">
                                                Rejection
                                                Reason
                                            </p>

                                            <p
                                                className="
                                                mt-1
                                                text-xs
                                                leading-5
                                                text-red-600
                                            "
                                            >
                                                {payment.rejectionReason ||
                                                    "No rejection reason was provided."}
                                            </p>
                                        </div>
                                    )}

                                {payment.reviewedAt && (
                                    <div
                                        className="
                                            rounded-lg
                                            border
                                            border-light-azure
                                            p-3
                                        "
                                    >
                                        <p className="text-[10px] text-dark-gray">
                                            Reviewed At
                                        </p>

                                        <p className="mt-1 text-xs font-medium text-dark-gray">
                                            {formatDateTime(
                                                payment.reviewedAt
                                            )}
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}
                </div>

                <div
                    className="
                        flex
                        justify-end
                        border-t
                        border-light-azure
                        px-4
                        py-3
                        sm:px-5
                    "
                >
                    <button
                        type="button"
                        onClick={onClose}
                        className="
                            h-8
                            cursor-pointer
                            rounded-md
                            bg-primary-blue
                            px-4
                            text-[11px]
                            font-medium
                            text-white
                            transition-colors
                            hover:bg-primary-blue/90
                        "
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentDetailsModal;