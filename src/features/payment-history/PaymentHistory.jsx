import {
    AlertCircle,
    CreditCard,
    Eye,
    RefreshCw,
    Search,
} from "lucide-react";

import Sidebar from "../../components/layout/Sidebar";
import Topbar from "../../components/layout/Topbar";
import MobileNavigation from "../../components/layout/MobileNavigation";

import usePaymentHistory from "./hooks/usePaymentHistory";

import PaymentStatus from "./components/PaymentStatus";
import PaymentDetailsModal from "./components/PaymentDetailsModal";
import PaymentPagination from "./components/PaymentPagination";

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

const formatTime = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleTimeString(
        "en-US",
        {
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

const PaymentHistory = () => {
    const {
        payments,
        loading,
        error,

        search,
        status,

        page,
        itemsPerPage,
        pagination,

        selectedPayment,
        detailsLoading,
        detailsError,

        handleSearchChange,
        handleStatusChange,

        handlePageChange,
        handleItemsPerPageChange,

        handleViewPayment,
        handleClosePayment,

        handleRefresh,
    } = usePaymentHistory();

    return (
        <div className="flex h-screen w-full overflow-hidden bg-bg">
            {/* Desktop Sidebar */}
            <div className="hidden lg:block">
                <Sidebar />
            </div>

            <div className="flex min-w-0 flex-1 flex-col">
                <Topbar />

                <main
                    className="
                        min-h-0
                        flex-1
                        overflow-y-auto
                        pb-20
                        lg:pb-0
                    "
                >
                    <div className="mx-auto w-full max-w-[1600px] p-3 sm:p-4 lg:p-5">
                        {/* Header */}
                        <div
                            className="
                                mb-4
                                flex
                                flex-col
                                gap-3
                                sm:flex-row
                                sm:items-center
                                sm:justify-between
                            "
                        >
                            <div>
                                <h1
                                    className="
                                        text-base
                                        font-medium
                                        text-primary-blue
                                        text-lg
                                    "
                                >
                                    Payment History
                                </h1>

                                <p
                                    className="
                                        text-xs
                                        text-dark-gray
                                    "
                                >
                                    View and track your
                                    add funds requests.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={handleRefresh}
                                disabled={loading}
                                className="
                                    inline-flex
                                    h-8
                                    w-fit
                                    cursor-pointer
                                    items-center
                                    justify-center
                                    gap-1.5
                                    rounded-md
                                    border
                                    border-light-azure
                                    bg-light-blue
                                    px-3
                                    text-xs
                                    font-medium
                                    text-dark-gray
                                    transition-colors
                                    hover:bg-light-blue/70
                                    disabled:cursor-not-allowed
                                    disabled:opacity-50
                                "
                            >
                                <RefreshCw
                                    size={13}
                                    className={
                                        loading
                                            ? "animate-spin"
                                            : ""
                                    }
                                />

                                Refresh
                            </button>
                        </div>

                        {/* Main Card */}
                        <div
                            className="
                                overflow-hidden
                                rounded-md
                                border
                                border-light-azure
                                bg-light-blue
                            "
                        >
                            {/* Filters */}
                            <div
                                className="
                                    flex
                                    flex-col
                                    gap-3
                                    border-b
                                    border-light-azure
                                    p-3
                                    sm:p-4
                                    md:flex-row
                                    md:items-center
                                "
                            >
                                {/* Search */}
                                <div className="relative min-w-0 flex-1">
                                    <Search
                                        size={14}
                                        strokeWidth={1.8}
                                        className="
                                            pointer-events-none
                                            absolute
                                            left-3
                                            top-1/2
                                            -translate-y-1/2
                                            text-dark-gray
                                        "
                                    />

                                    <input
                                        type="text"
                                        value={search}
                                        onChange={(event) =>
                                            handleSearchChange(
                                                event.target
                                                    .value
                                            )
                                        }
                                        placeholder="Search transaction ID..."
                                        className="
                                            h-9
                                            w-full
                                            rounded-md
                                            border
                                            border-light-azure
                                            bg-light-blue
                                            pl-9
                                            pr-3
                                            text-xs
                                            text-dark-gray
                                            outline-none
                                            transition
                                            placeholder:text-dark-gray
                                            focus:border-primary-blue
                                            focus:bg-light-blue
                                            focus:ring-1
                                            focus:ring-primary-blue/20
                                        "
                                    />
                                </div>

                                {/* Status */}
                                <select
                                    value={status}
                                    onChange={(event) =>
                                        handleStatusChange(
                                            event.target
                                                .value
                                        )
                                    }
                                    className="
                                        h-9
                                        w-full
                                        cursor-pointer
                                        rounded-md
                                        border
                                        border-light-azure
                                        bg-light-blue
                                        px-3
                                        text-xs
                                        text-dark-gray
                                        outline-none
                                        transition
                                        focus:border-primary-blue
                                        focus:bg-light-blue
                                        focus:ring-1
                                        focus:ring-primary-blue/20
                                        md:w-40
                                    "
                                >
                                    <option value="all">
                                        All Status
                                    </option>

                                    <option value="pending">
                                        Pending
                                    </option>

                                    <option value="completed">
                                        Completed
                                    </option>

                                    <option value="rejected">
                                        Rejected
                                    </option>
                                </select>
                            </div>

                            {/* Error */}
                            {error && (
                                <div className="p-3 sm:p-4">
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
                                            className="
                                                mt-0.5
                                                shrink-0
                                                text-red-500
                                            "
                                        />

                                        <div>
                                            <p
                                                className="
                                                    text-xs
                                                    font-medium
                                                    text-red-600
                                                "
                                            >
                                                Unable to load
                                                payment history
                                            </p>

                                            <p
                                                className="
                                                    mt-0.5
                                                    text-[10px]
                                                    leading-5
                                                    text-red-500
                                                "
                                            >
                                                {error}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Loading */}
                            {loading && (
                                <div className="hidden overflow-x-auto md:block">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b border-light-azure bg-light-blue">
                                                {[
                                                    "Payment Method",
                                                    "Amount",
                                                    "Transaction ID",
                                                    "Status",
                                                    "Date",
                                                    "Action",
                                                ].map(
                                                    (
                                                        heading
                                                    ) => (
                                                        <th
                                                            key={
                                                                heading
                                                            }
                                                            className="
                                                                px-4
                                                                py-3
                                                                text-left
                                                                text-xs
                                                                font-medium
                                                                text-dark-gray
                                                            "
                                                        >
                                                            {
                                                                heading
                                                            }
                                                        </th>
                                                    )
                                                )}
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {Array.from({
                                                length: 6,
                                            }).map(
                                                (
                                                    _,
                                                    index
                                                ) => (
                                                    <tr
                                                        key={
                                                            index
                                                        }
                                                        className="border-b border-light-azure"
                                                    >
                                                        {Array.from(
                                                            {
                                                                length: 6,
                                                            }
                                                        ).map(
                                                            (
                                                                __,
                                                                cellIndex
                                                            ) => (
                                                                <td
                                                                    key={
                                                                        cellIndex
                                                                    }
                                                                    className="px-4 py-3"
                                                                >
                                                                    <div className="h-4 animate-pulse rounded-md bg-gray-100" />
                                                                </td>
                                                            )
                                                        )}
                                                    </tr>
                                                )
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            )}

                            {loading && (
                                <div className="space-y-3 p-3 md:hidden">
                                    {Array.from({
                                        length: 4,
                                    }).map(
                                        (
                                            _,
                                            index
                                        ) => (
                                            <div
                                                key={
                                                    index
                                                }
                                                className="
                                                    rounded-lg
                                                    border
                                                    border-light-azure
                                                    p-3
                                                "
                                            >
                                                <div className="h-4 animate-pulse rounded bg-gray-100" />
                                                <div className="mt-3 h-4 w-2/3 animate-pulse rounded bg-gray-100" />
                                                <div className="mt-3 h-4 w-1/2 animate-pulse rounded bg-gray-100" />
                                            </div>
                                        )
                                    )}
                                </div>
                            )}

                            {/* Empty State */}
                            {!loading &&
                                !error &&
                                payments.length ===
                                0 && (
                                    <div
                                        className="
                                            flex
                                            min-h-[300px]
                                            flex-col
                                            items-center
                                            justify-center
                                            px-5
                                            py-12
                                            text-center
                                        "
                                    >
                                        <div
                                            className="
                                                flex
                                                h-12
                                                w-12
                                                items-center
                                                justify-center
                                                rounded-full
                                                bg-primary-blue/10
                                                text-primary-blue
                                            "
                                        >
                                            <CreditCard
                                                size={21}
                                                strokeWidth={
                                                    1.7
                                                }
                                            />
                                        </div>

                                        <h3
                                            className="
                                                mt-3
                                                text-sm
                                                font-semibold
                                                text-dark-gray
                                            "
                                        >
                                            No payments found
                                        </h3>

                                        <p
                                            className="
                                                mt-1
                                                max-w-sm
                                                text-xs
                                                leading-5
                                                text-dark-gray
                                                sm:text-[11px]
                                            "
                                        >
                                            Your payment
                                            history will
                                            appear here after
                                            you submit an add
                                            funds request.
                                        </p>
                                    </div>
                                )}

                            {/* Desktop Table */}
                            {!loading &&
                                !error &&
                                payments.length >
                                0 && (
                                    <div className="hidden overflow-x-auto md:block">
                                        <table className="w-full min-w-[760px]">
                                            <thead>
                                                <tr className="border-b border-light-azure bg-light-blue">
                                                    <th
                                                        className="
                                                            px-4
                                                            py-3
                                                            text-left
                                                            text-xs
                                                            font-medium
                                                            text-dark-gray
                                                        "
                                                    >
                                                        Payment
                                                        Method
                                                    </th>

                                                    <th
                                                        className="
                                                            px-4
                                                            py-3
                                                            text-left
                                                            text-xs
                                                            font-medium
                                                            text-dark-gray
                                                        "
                                                    >
                                                        Amount
                                                    </th>

                                                    <th
                                                        className="
                                                            px-4
                                                            py-3
                                                            text-left
                                                            text-xs
                                                            font-medium
                                                            text-dark-gray
                                                        "
                                                    >
                                                        Transaction
                                                        ID
                                                    </th>

                                                    <th
                                                        className="
                                                            px-4
                                                            py-3
                                                            text-left
                                                            text-xs
                                                            font-medium
                                                            text-dark-gray
                                                        "
                                                    >
                                                        Status
                                                    </th>

                                                    <th
                                                        className="
                                                            px-4
                                                            py-3
                                                            text-left
                                                            text-xs
                                                            font-medium
                                                            text-dark-gray
                                                        "
                                                    >
                                                        Date
                                                    </th>

                                                    <th
                                                        className="
                                                            px-4
                                                            py-3
                                                            text-right
                                                            text-xs
                                                            font-medium
                                                            text-dark-gray
                                                        "
                                                    >
                                                        Action
                                                    </th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {payments.map(
                                                    (
                                                        payment
                                                    ) => (
                                                        <tr
                                                            key={
                                                                payment._id
                                                            }
                                                            className="
                                                                border-b
                                                                border-gray-100
                                                                transition-colors
                                                                hover:bg-light-blue/70
                                                            "
                                                        >
                                                            <td className="px-4 py-3">
                                                                <div className="flex items-center gap-2.5">
                                                                    <div
                                                                        className="
                                                                            flex
                                                                            h-8
                                                                            w-8
                                                                            shrink-0
                                                                            items-center
                                                                            justify-center
                                                                            rounded-md
                                                                            bg-primary-blue/5
                                                                            text-primary-blue
                                                                        "
                                                                    >
                                                                        <CreditCard
                                                                            size={
                                                                                15
                                                                            }
                                                                            strokeWidth={
                                                                                1.8
                                                                            }
                                                                        />
                                                                    </div>

                                                                    <div className="min-w-0">
                                                                        <p className="truncate text-xs font-medium text-dark-gray">
                                                                            {payment
                                                                                .paymentMethod
                                                                                ?.name ||
                                                                                payment.method ||
                                                                                "—"}
                                                                        </p>

                                                                        <p className="mt-0.5 text-[10px] capitalize text-gray-400">
                                                                            {payment.region ===
                                                                                "pakistan"
                                                                                ? "Pakistan"
                                                                                : "International"}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </td>

                                                            <td className="px-4 py-3">
                                                                <span className="text-xs font-semibold text-dark-gray">
                                                                    {formatAmount(
                                                                        payment.amount,
                                                                        payment.currency
                                                                    )}
                                                                </span>
                                                            </td>

                                                            <td className="px-4 py-3">
                                                                <span className="block max-w-[180px] truncate text-[11px] text-gray-500">
                                                                    #{payment.transactionId ||
                                                                        "—"}
                                                                </span>
                                                            </td>

                                                            <td className="px-4 py-3">
                                                                <PaymentStatus
                                                                    status={
                                                                        payment.status
                                                                    }
                                                                />
                                                            </td>

                                                            <td className="px-4 py-3">
                                                                <div>
                                                                    <p className="text-[11px] font-medium text-dark-gray">
                                                                        {formatDate(
                                                                            payment.createdAt
                                                                        )}
                                                                    </p>

                                                                    <p className="mt-0.5 text-[10px] text-gray-400">
                                                                        {formatTime(
                                                                            payment.createdAt
                                                                        )}
                                                                    </p>
                                                                </div>
                                                            </td>

                                                            <td className="px-4 py-3 text-right">
                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        handleViewPayment(
                                                                            payment._id
                                                                        )
                                                                    }
                                                                    className="
                                                                        inline-flex
                                                                        h-8
                                                                        w-8
                                                                        cursor-pointer
                                                                        items-center
                                                                        justify-center
                                                                        rounded-md
                                                                        border
                                                                        border-light-azure
                                                                        text-gray-500
                                                                        transition-colors
                                                                        hover:border-primary-blue/30
                                                                        hover:bg-primary-blue/5
                                                                        hover:text-primary-blue
                                                                    "
                                                                    title="View payment"
                                                                >
                                                                    <Eye
                                                                        size={
                                                                            14
                                                                        }
                                                                        strokeWidth={
                                                                            1.8
                                                                        }
                                                                    />
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    )
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                )}

                            {/* Mobile Cards */}
                            {!loading &&
                                !error &&
                                payments.length >
                                0 && (
                                    <div className="space-y-3 p-3 md:hidden">
                                        {payments.map(
                                            (
                                                payment
                                            ) => (
                                                <div
                                                    key={
                                                        payment._id
                                                    }
                                                    className="
                                                        rounded-lg
                                                        border
                                                        border-light-azure
                                                        bg-light-blue
                                                        p-3
                                                    "
                                                >
                                                    <div className="flex items-start justify-between gap-3">
                                                        <div className="flex min-w-0 items-center gap-2.5">
                                                            <div
                                                                className="
                                                                    flex
                                                                    h-9
                                                                    w-9
                                                                    shrink-0
                                                                    items-center
                                                                    justify-center
                                                                    rounded-md
                                                                    bg-primary-blue/10
                                                                    text-primary-blue
                                                                "
                                                            >
                                                                <CreditCard
                                                                    size={
                                                                        16
                                                                    }
                                                                    strokeWidth={
                                                                        1.8
                                                                    }
                                                                />
                                                            </div>

                                                            <div className="min-w-0">
                                                                <p className="truncate text-xs font-semibold text-dark-gray">
                                                                    {payment
                                                                        .paymentMethod
                                                                        ?.name ||
                                                                        payment.method ||
                                                                        "—"}
                                                                </p>

                                                                <p className="mt-0.5 text-[10px] text-gray-400">
                                                                    {payment.region ===
                                                                        "pakistan"
                                                                        ? "Pakistan"
                                                                        : "International"}
                                                                </p>
                                                            </div>
                                                        </div>

                                                        <PaymentStatus
                                                            status={
                                                                payment.status
                                                            }
                                                        />
                                                    </div>

                                                    <div className="mt-3 grid grid-cols-2 gap-3">
                                                        <div>
                                                            <p className="text-[10px] text-gray-400">
                                                                Amount
                                                            </p>

                                                            <p className="mt-1 text-xs font-semibold text-dark-gray">
                                                                {formatAmount(
                                                                    payment.amount,
                                                                    payment.currency
                                                                )}
                                                            </p>
                                                        </div>

                                                        <div>
                                                            <p className="text-[10px] text-gray-400">
                                                                Date
                                                            </p>

                                                            <p className="mt-1 text-xs font-medium text-dark-gray">
                                                                {formatDate(
                                                                    payment.createdAt
                                                                )}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className="mt-3">
                                                        <p className="text-[10px] text-gray-400">
                                                            Transaction
                                                            ID
                                                        </p>

                                                        <p className="mt-1 truncate text-[11px] text-dark-gray">
                                                            {payment.transactionId ||
                                                                "—"}
                                                        </p>
                                                    </div>

                                                    <div
                                                        className="
                                                            mt-3
                                                            flex
                                                            items-center
                                                            justify-between
                                                            border-t
                                                            border-gray-100
                                                            pt-3
                                                        "
                                                    >
                                                        <div>
                                                            <p className="text-[10px] text-gray-400">
                                                                Time
                                                            </p>

                                                            <p className="mt-0.5 text-[10px] text-gray-500">
                                                                {formatTime(
                                                                    payment.createdAt
                                                                )}
                                                            </p>
                                                        </div>

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleViewPayment(
                                                                    payment._id
                                                                )
                                                            }
                                                            className="
                                                                inline-flex
                                                                h-8
                                                                items-center
                                                                justify-center
                                                                gap-1.5
                                                                rounded-md
                                                                border
                                                                border-light-azure
                                                                px-3
                                                                text-[10px]
                                                                font-medium
                                                                text-dark-gray
                                                                transition-colors
                                                                hover:border-primary-blue/30
                                                                hover:bg-primary-blue/5
                                                                hover:text-primary-blue
                                                            "
                                                        >
                                                            <Eye
                                                                size={
                                                                    13
                                                                }
                                                            />

                                                            View
                                                        </button>
                                                    </div>
                                                </div>
                                            )
                                        )}
                                    </div>
                                )}

                            {/* Pagination */}
                            {!loading &&
                                !error &&
                                pagination &&
                                pagination.total >
                                0 && (
                                    <div className="px-3 sm:px-4">
                                        <PaymentPagination
                                            currentPage={
                                                page
                                            }
                                            totalPages={
                                                pagination.totalPages
                                            }
                                            itemsPerPage={
                                                itemsPerPage
                                            }
                                            totalItems={
                                                pagination.total
                                            }
                                            changePage={
                                                handlePageChange
                                            }
                                            changeItemsPerPage={
                                                handleItemsPerPageChange
                                            }
                                        />
                                    </div>
                                )}
                        </div>
                    </div>
                </main>

                <MobileNavigation />
            </div>

            {/* Payment Details Modal */}
            {(
                selectedPayment ||
                detailsLoading ||
                detailsError
            ) && (
                    <PaymentDetailsModal
                        payment={
                            selectedPayment
                        }
                        loading={
                            detailsLoading
                        }
                        error={
                            detailsError
                        }
                        onClose={
                            handleClosePayment
                        }
                    />
                )}
        </div>
    );
};

export default PaymentHistory;