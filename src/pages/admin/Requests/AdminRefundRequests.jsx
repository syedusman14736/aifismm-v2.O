import {
    Search,
    RefreshCw,
    Eye,
    X,
    ChevronLeft,
    ChevronRight,
    AlertCircle,
    Clock3,
    CheckCircle2,
    XCircle,
    CircleDollarSign,
} from "lucide-react";

import { useEffect, useState } from "react";

const API_URL =
    import.meta.env.VITE_API_URL ||
    "http://localhost:4040";

function AdminRefundRequests() {
    const [requests, setRequests] = useState([]);

    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] =
        useState(false);

    const [processing, setProcessing] =
        useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] =
        useState("");

    const [page, setPage] = useState(1);
    const [limit] = useState(20);

    const [totalPages, setTotalPages] =
        useState(1);

    const [totalRequests, setTotalRequests] =
        useState(0);

    const [selectedRequest, setSelectedRequest] =
        useState(null);

    const [showDetails, setShowDetails] =
        useState(false);

    const [adminNote, setAdminNote] =
        useState("");


    const getToken = () =>
        localStorage.getItem("aifi_token");


    const getHeaders = () => {
        const token = getToken();

        return {
            "Content-Type": "application/json",
            ...(token
                ? {
                    Authorization:
                        `Bearer ${token}`,
                }
                : {}),
        };
    };


    // ==========================================
    // FETCH REFUND REQUESTS
    // ==========================================

    const fetchRequests = async (
        showRefresh = false
    ) => {
        try {
            if (showRefresh) {
                setRefreshing(true);
            } else {
                setLoading(true);
            }

            setError("");

            const params =
                new URLSearchParams();

            params.set(
                "page",
                String(page)
            );

            params.set(
                "limit",
                String(limit)
            );

            if (statusFilter) {
                params.set(
                    "status",
                    statusFilter
                );
            }

            if (search.trim()) {
                params.set(
                    "search",
                    search.trim()
                );
            }

            const response =
                await fetch(
                    `${API_URL}/admin/refund-requests?${params.toString()}`,
                    {
                        method: "GET",
                        headers:
                            getHeaders(),
                    }
                );

            const data =
                await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    "Unable to fetch refund requests."
                );
            }

            setRequests(
                Array.isArray(
                    data.requests
                )
                    ? data.requests
                    : []
            );

            setTotalRequests(
                Number(
                    data.pagination
                        ?.total || 0
                )
            );

            setTotalPages(
                Math.max(
                    Number(
                        data.pagination
                            ?.totalPages ||
                        1
                    ),
                    1
                )
            );
        } catch (error) {
            console.error(
                "Fetch Admin Refund Requests Error:",
                error
            );

            setError(
                error.message ||
                "Unable to fetch refund requests."
            );
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };


    // ==========================================
    // INITIAL / FILTER FETCH
    // ==========================================

    useEffect(() => {
        fetchRequests();
    }, [
        page,
        statusFilter,
    ]);


    // ==========================================
    // SEARCH DEBOUNCE
    // ==========================================

    useEffect(() => {
        const timeout =
            setTimeout(() => {
                if (page !== 1) {
                    setPage(1);
                    return;
                }

                fetchRequests();
            }, 450);

        return () =>
            clearTimeout(timeout);
    }, [search]);


    // ==========================================
    // RESET FILTERS
    // ==========================================

    const resetFilters = () => {
        setSearch("");
        setStatusFilter("");
        setPage(1);
        setError("");
        setSuccess("");
    };


    // ==========================================
    // DETAILS
    // ==========================================

    const openDetails = (request) => {
        setSelectedRequest(request);
        setAdminNote(
            request.adminNote || ""
        );
        setError("");
        setSuccess("");
        setShowDetails(true);
    };


    const closeDetails = () => {
        if (processing) {
            return;
        }

        setSelectedRequest(null);
        setAdminNote("");
        setShowDetails(false);
    };


    // ==========================================
    // STATUS
    // ==========================================

    const getStatusConfig = (status) => {
        switch (status) {
            case "pending":
                return {
                    label: "Pending",
                    className:
                        "bg-amber-50 text-amber-600 border-amber-200",
                    icon: Clock3,
                };

            case "approved":
                return {
                    label: "Approved",
                    className:
                        "bg-blue-50 text-blue-600 border-blue-200",
                    icon: CheckCircle2,
                };

            case "rejected":
                return {
                    label: "Rejected",
                    className:
                        "bg-red-50 text-red-600 border-red-200",
                    icon: XCircle,
                };

            case "completed":
                return {
                    label: "Completed",
                    className:
                        "bg-emerald-50 text-emerald-600 border-emerald-200",
                    icon: CheckCircle2,
                };

            case "failed":
                return {
                    label: "Failed",
                    className:
                        "bg-red-50 text-red-600 border-red-200",
                    icon: XCircle,
                };

            default:
                return {
                    label:
                        status || "Unknown",
                    className:
                        "bg-gray-50 text-gray-600 border-gray-200",
                    icon: AlertCircle,
                };
        }
    };


    // ==========================================
    // DATE FORMAT
    // ==========================================

    const formatDate = (date) => {
        if (!date) {
            return "—";
        }

        return new Date(
            date
        ).toLocaleString(
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


    // ==========================================
    // AMOUNT
    // ==========================================

    const formatAmount = (amount) => {
        const value =
            Number(amount) || 0;

        return `PKR ${value.toFixed(2)}`;
    };


    // ==========================================
    // UPDATE REFUND REQUEST
    // ==========================================

    const updateRefundRequest = async (
        status
    ) => {
        if (!selectedRequest) {
            return;
        }

        const note =
            adminNote.trim();

        if (!note) {
            setError(
                "Admin note is required."
            );

            return;
        }

        const actionLabel =
            status === "approved"
                ? "approve"
                : "reject";

        const confirmed =
            window.confirm(
                `Are you sure you want to ${actionLabel} this refund request?`
            );

        if (!confirmed) {
            return;
        }

        try {
            setProcessing(true);
            setError("");
            setSuccess("");

            const response =
                await fetch(
                    `${API_URL}/admin/refund-requests/${selectedRequest._id || selectedRequest.id}`,
                    {
                        method: "PATCH",
                        headers:
                            getHeaders(),
                        body: JSON.stringify({
                            status,
                            adminNote:
                                note,
                        }),
                    }
                );

            const data =
                await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    `Unable to ${actionLabel} refund request.`
                );
            }

            setSuccess(
                status === "approved"
                    ? "Refund request approved successfully."
                    : "Refund request rejected successfully."
            );

            setSelectedRequest(
                (previous) =>
                    previous
                        ? {
                            ...previous,
                            status,
                            adminNote:
                                note,
                            processedAt:
                                new Date().toISOString(),
                        }
                        : previous
            );

            setAdminNote(note);

            await fetchRequests();

        } catch (error) {
            console.error(
                "Update Admin Refund Request Error:",
                error
            );

            setError(
                error.message ||
                "Unable to update refund request."
            );
        } finally {
            setProcessing(false);
        }
    };


    return (
        <section className="w-full space-y-4">

            {/* ======================================
                HEADER
            ====================================== */}

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                <div>
                    <div className="flex items-center gap-2">

                        <CircleDollarSign
                            size={22}
                            className="text-dark-blue"
                            strokeWidth={1.9}
                        />

                        <h1 className="text-lg font-semibold text-dark-blue">
                            Refund Requests
                        </h1>

                    </div>

                    <p className="text-sm text-dark-gray mt-1">
                        Review and manage customer
                        refund requests.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={() =>
                        fetchRequests(true)
                    }
                    disabled={refreshing}
                    className="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-md border border-light-azure bg-white text-dark-gray hover:text-dark-blue transition-colors disabled:opacity-50"
                >
                    <RefreshCw
                        size={16}
                        className={
                            refreshing
                                ? "animate-spin"
                                : ""
                        }
                    />

                    Refresh
                </button>

            </div>


            {/* ======================================
                ALERTS
            ====================================== */}

            {error && (
                <div className="flex items-start gap-2 p-3 rounded-md border border-red-200 bg-red-50 text-red-600 text-sm">

                    <AlertCircle
                        size={18}
                        className="shrink-0 mt-0.5"
                    />

                    <span>{error}</span>

                </div>
            )}

            {success && (
                <div className="flex items-start gap-2 p-3 rounded-md border border-emerald-200 bg-emerald-50 text-emerald-600 text-sm">

                    <CheckCircle2
                        size={18}
                        className="shrink-0 mt-0.5"
                    />

                    <span>{success}</span>

                </div>
            )}


            {/* ======================================
                FILTERS
            ====================================== */}

            <div className="bg-white border border-light-azure rounded-lg p-4">

                <div className="grid grid-cols-1 md:grid-cols-[1fr_180px_auto] gap-3">

                    {/* Search */}

                    <div className="relative">

                        <Search
                            size={17}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-gray"
                        />

                        <input
                            type="text"
                            value={search}
                            onChange={(event) =>
                                setSearch(
                                    event.target.value
                                )
                            }
                            placeholder="Search order, user or service..."
                            className="w-full h-10 pl-9 pr-3 rounded-md border border-light-azure bg-white text-sm text-dark-blue outline-none focus:border-dark-blue"
                        />

                    </div>


                    {/* Status */}

                    <select
                        value={statusFilter}
                        onChange={(event) => {
                            setStatusFilter(
                                event.target.value
                            );

                            setPage(1);
                        }}
                        className="h-10 px-3 rounded-md border border-light-azure bg-white text-sm text-dark-blue outline-none focus:border-dark-blue"
                    >

                        <option value="">
                            All Statuses
                        </option>

                        <option value="pending">
                            Pending
                        </option>

                        <option value="approved">
                            Approved
                        </option>

                        <option value="rejected">
                            Rejected
                        </option>

                        <option value="completed">
                            Completed
                        </option>

                        <option value="failed">
                            Failed
                        </option>

                    </select>


                    {/* Reset */}

                    <button
                        type="button"
                        onClick={resetFilters}
                        className="h-10 px-4 rounded-md border border-light-azure bg-white text-sm text-dark-gray hover:text-dark-blue transition-colors"
                    >
                        Reset
                    </button>

                </div>

            </div>


            {/* ======================================
                SUMMARY
            ====================================== */}

            <div className="flex items-center justify-between text-sm">

                <p className="text-dark-gray">
                    {totalRequests}{" "}
                    {totalRequests === 1
                        ? "request"
                        : "requests"}
                </p>

            </div>


            {/* ======================================
                DESKTOP TABLE
            ====================================== */}

            <div className="hidden lg:block bg-white border border-light-azure rounded-lg overflow-hidden">

                <div className="overflow-x-auto">

                    <table className="w-full text-sm">

                        <thead>

                            <tr className="border-b border-light-azure bg-light-blue">

                                <th className="text-left px-4 py-3 font-medium text-dark-gray">
                                    Order
                                </th>

                                <th className="text-left px-4 py-3 font-medium text-dark-gray">
                                    User
                                </th>

                                <th className="text-left px-4 py-3 font-medium text-dark-gray">
                                    Service
                                </th>

                                <th className="text-left px-4 py-3 font-medium text-dark-gray">
                                    Amount
                                </th>

                                <th className="text-left px-4 py-3 font-medium text-dark-gray">
                                    Status
                                </th>

                                <th className="text-left px-4 py-3 font-medium text-dark-gray">
                                    Date
                                </th>

                                <th className="text-right px-4 py-3 font-medium text-dark-gray">
                                    Action
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {loading ? (

                                <tr>

                                    <td
                                        colSpan="7"
                                        className="px-4 py-10 text-center text-dark-gray"
                                    >
                                        Loading refund
                                        requests...
                                    </td>

                                </tr>

                            ) : requests.length === 0 ? (

                                <tr>

                                    <td
                                        colSpan="7"
                                        className="px-4 py-10 text-center text-dark-gray"
                                    >
                                        No refund requests
                                        found.
                                    </td>

                                </tr>

                            ) : (

                                requests.map(
                                    (request) => {

                                        const status =
                                            getStatusConfig(
                                                request.status
                                            );

                                        const StatusIcon =
                                            status.icon;

                                        return (

                                            <tr
                                                key={
                                                    request._id ||
                                                    request.id
                                                }
                                                className="border-b border-light-azure last:border-b-0 hover:bg-gray-50 transition-colors"
                                            >

                                                <td className="px-4 py-3">

                                                    <span className="font-medium text-dark-blue">
                                                        #
                                                        {
                                                            request.orderId
                                                        }
                                                    </span>

                                                </td>


                                                <td className="px-4 py-3">

                                                    <div>

                                                        <p className="font-medium text-dark-blue">
                                                            {request
                                                                .user
                                                                ?.username ||
                                                                request
                                                                    .user
                                                                    ?.name ||
                                                                "—"}
                                                        </p>

                                                        {request
                                                            .user
                                                            ?.email && (
                                                                <p className="text-xs text-dark-gray mt-0.5">
                                                                    {
                                                                        request
                                                                            .user
                                                                            .email
                                                                    }
                                                                </p>
                                                            )}

                                                    </div>

                                                </td>


                                                <td className="px-4 py-3">

                                                    <p
                                                        className="max-w-[220px] truncate text-dark-blue"
                                                        title={
                                                            request
                                                                .order
                                                                ?.serviceName
                                                        }
                                                    >
                                                        {request
                                                            .order
                                                            ?.serviceName ||
                                                            "—"}
                                                    </p>

                                                </td>


                                                <td className="px-4 py-3 font-medium text-dark-blue">

                                                    {formatAmount(
                                                        request.amount
                                                    )}

                                                </td>


                                                <td className="px-4 py-3">

                                                    <span
                                                        className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full border text-xs font-medium ${status.className}`}
                                                    >

                                                        <StatusIcon
                                                            size={
                                                                13
                                                            }
                                                        />

                                                        {
                                                            status.label
                                                        }

                                                    </span>

                                                </td>


                                                <td className="px-4 py-3 text-dark-gray whitespace-nowrap">

                                                    {formatDate(
                                                        request.createdAt
                                                    )}

                                                </td>


                                                <td className="px-4 py-3 text-right">

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            openDetails(
                                                                request
                                                            )
                                                        }
                                                        title="View details"
                                                        className="inline-flex items-center justify-center p-2 rounded-md text-dark-gray hover:text-dark-blue hover:bg-light-blue transition-colors"
                                                    >

                                                        <Eye
                                                            size={
                                                                17
                                                            }
                                                        />

                                                    </button>

                                                </td>

                                            </tr>

                                        );
                                    }
                                )

                            )}

                        </tbody>

                    </table>

                </div>

            </div>


            {/* ======================================
                MOBILE CARDS
            ====================================== */}

            <div className="lg:hidden space-y-3">

                {loading ? (

                    <div className="bg-white border border-light-azure rounded-lg p-8 text-center text-sm text-dark-gray">
                        Loading refund requests...
                    </div>

                ) : requests.length === 0 ? (

                    <div className="bg-white border border-light-azure rounded-lg p-8 text-center text-sm text-dark-gray">
                        No refund requests found.
                    </div>

                ) : (

                    requests.map(
                        (request) => {

                            const status =
                                getStatusConfig(
                                    request.status
                                );

                            const StatusIcon =
                                status.icon;

                            return (

                                <div
                                    key={
                                        request._id ||
                                        request.id
                                    }
                                    className="bg-white border border-light-azure rounded-lg p-4"
                                >

                                    <div className="flex items-start justify-between gap-3">

                                        <div>

                                            <p className="font-semibold text-dark-blue">
                                                Order #
                                                {
                                                    request.orderId
                                                }
                                            </p>

                                            <p className="text-sm text-dark-gray mt-1">
                                                {request
                                                    .user
                                                    ?.username ||
                                                    request
                                                        .user
                                                        ?.name ||
                                                    "Unknown user"}
                                            </p>

                                        </div>


                                        <span
                                            className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full border text-xs font-medium ${status.className}`}
                                        >

                                            <StatusIcon
                                                size={13}
                                            />

                                            {
                                                status.label
                                            }

                                        </span>

                                    </div>


                                    <div className="mt-4 space-y-2 text-sm">

                                        <div className="flex justify-between gap-4">

                                            <span className="text-dark-gray">
                                                Service
                                            </span>

                                            <span className="text-dark-blue text-right">
                                                {request
                                                    .order
                                                    ?.serviceName ||
                                                    "—"}
                                            </span>

                                        </div>


                                        <div className="flex justify-between gap-4">

                                            <span className="text-dark-gray">
                                                Amount
                                            </span>

                                            <span className="font-medium text-dark-blue">
                                                {formatAmount(
                                                    request.amount
                                                )}
                                            </span>

                                        </div>


                                        <div className="flex justify-between gap-4">

                                            <span className="text-dark-gray">
                                                Date
                                            </span>

                                            <span className="text-dark-blue text-right">
                                                {formatDate(
                                                    request.createdAt
                                                )}
                                            </span>

                                        </div>

                                    </div>


                                    <button
                                        type="button"
                                        onClick={() =>
                                            openDetails(
                                                request
                                            )
                                        }
                                        className="w-full mt-4 h-9 inline-flex items-center justify-center gap-2 rounded-md border border-light-azure text-sm text-dark-gray hover:text-dark-blue hover:bg-light-blue transition-colors"
                                    >

                                        <Eye
                                            size={16}
                                        />

                                        View Details

                                    </button>

                                </div>

                            );
                        }
                    )

                )}

            </div>


            {/* ======================================
                PAGINATION
            ====================================== */}

            {!loading &&
                requests.length > 0 && (

                    <div className="flex items-center justify-between gap-3">

                        <p className="text-sm text-dark-gray">
                            Page {page} of{" "}
                            {totalPages}
                        </p>


                        <div className="flex items-center gap-2">

                            <button
                                type="button"
                                disabled={
                                    page <= 1
                                }
                                onClick={() =>
                                    setPage(
                                        (previous) =>
                                            Math.max(
                                                previous - 1,
                                                1
                                            )
                                    )
                                }
                                className="p-2 rounded-md border border-light-azure bg-white text-dark-gray hover:text-dark-blue disabled:opacity-40 disabled:cursor-not-allowed"
                            >

                                <ChevronLeft
                                    size={17}
                                />

                            </button>


                            <button
                                type="button"
                                disabled={
                                    page >=
                                    totalPages
                                }
                                onClick={() =>
                                    setPage(
                                        (previous) =>
                                            Math.min(
                                                previous + 1,
                                                totalPages
                                            )
                                    )
                                }
                                className="p-2 rounded-md border border-light-azure bg-white text-dark-gray hover:text-dark-blue disabled:opacity-40 disabled:cursor-not-allowed"
                            >

                                <ChevronRight
                                    size={17}
                                />

                            </button>

                        </div>

                    </div>

                )}


            {/* ======================================
                DETAILS MODAL
            ====================================== */}

            {showDetails &&
                selectedRequest && (

                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

                        <div
                            className="absolute inset-0 bg-black/30"
                            onClick={
                                closeDetails
                            }
                        />


                        <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-xl shadow-xl">

                            {/* Modal Header */}

                            <div className="sticky top-0 z-10 flex items-center justify-between gap-3 px-5 py-4 border-b border-light-azure bg-white">

                                <div>

                                    <h2 className="text-base font-semibold text-dark-blue">
                                        Refund Request #
                                        {
                                            selectedRequest.orderId
                                        }
                                    </h2>

                                    <p className="text-xs text-dark-gray mt-1">
                                        Submitted{" "}
                                        {formatDate(
                                            selectedRequest.createdAt
                                        )}
                                    </p>

                                </div>


                                <button
                                    type="button"
                                    onClick={
                                        closeDetails
                                    }
                                    disabled={
                                        processing
                                    }
                                    className="p-2 rounded-md text-dark-gray hover:text-dark-blue hover:bg-light-blue transition-colors disabled:opacity-40"
                                >

                                    <X
                                        size={18}
                                    />

                                </button>

                            </div>


                            {/* Modal Body */}

                            <div className="p-5 space-y-5">

                                {/* Status + Amount */}

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                                    <div className="rounded-lg border border-light-azure p-4">

                                        <p className="text-xs text-dark-gray">
                                            Status
                                        </p>

                                        {(() => {

                                            const status =
                                                getStatusConfig(
                                                    selectedRequest.status
                                                );

                                            const StatusIcon =
                                                status.icon;

                                            return (

                                                <span
                                                    className={`inline-flex items-center gap-1.5 mt-2 px-2 py-1 rounded-full border text-xs font-medium ${status.className}`}
                                                >

                                                    <StatusIcon
                                                        size={
                                                            13
                                                        }
                                                    />

                                                    {
                                                        status.label
                                                    }

                                                </span>

                                            );

                                        })()}

                                    </div>


                                    <div className="rounded-lg border border-light-azure p-4">

                                        <p className="text-xs text-dark-gray">
                                            Refund Amount
                                        </p>

                                        <p className="text-lg font-semibold text-dark-blue mt-1">
                                            {formatAmount(
                                                selectedRequest.amount
                                            )}
                                        </p>

                                    </div>

                                </div>


                                {/* Customer */}

                                <div>

                                    <h3 className="text-sm font-semibold text-dark-blue mb-3">
                                        Customer
                                    </h3>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                                        <div>

                                            <p className="text-xs text-dark-gray">
                                                Name
                                            </p>

                                            <p className="text-sm text-dark-blue mt-1">
                                                {selectedRequest
                                                    .user
                                                    ?.name ||
                                                    "—"}
                                            </p>

                                        </div>


                                        <div>

                                            <p className="text-xs text-dark-gray">
                                                Username
                                            </p>

                                            <p className="text-sm text-dark-blue mt-1">
                                                {selectedRequest
                                                    .user
                                                    ?.username ||
                                                    "—"}
                                            </p>

                                        </div>


                                        <div>

                                            <p className="text-xs text-dark-gray">
                                                Email
                                            </p>

                                            <p className="text-sm text-dark-blue mt-1 break-all">
                                                {selectedRequest
                                                    .user
                                                    ?.email ||
                                                    "—"}
                                            </p>

                                        </div>


                                        <div>

                                            <p className="text-xs text-dark-gray">
                                                WhatsApp
                                            </p>

                                            <p className="text-sm text-dark-blue mt-1">
                                                {selectedRequest
                                                    .user
                                                    ?.whatsapp ||
                                                    "—"}
                                            </p>

                                        </div>

                                    </div>

                                </div>


                                {/* Order */}

                                <div>

                                    <h3 className="text-sm font-semibold text-dark-blue mb-3">
                                        Order Details
                                    </h3>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                                        <div>
                                            <p className="text-xs text-dark-gray">
                                                Order ID
                                            </p>

                                            <p className="text-sm font-medium text-dark-blue mt-1">
                                                #
                                                {
                                                    selectedRequest
                                                        .order
                                                        ?.orderId ||
                                                    selectedRequest.orderId
                                                }
                                            </p>
                                        </div>


                                        <div>
                                            <p className="text-xs text-dark-gray">
                                                Service
                                            </p>

                                            <p className="text-sm text-dark-blue mt-1">
                                                {selectedRequest
                                                    .order
                                                    ?.serviceName ||
                                                    "—"}
                                            </p>
                                        </div>


                                        <div>
                                            <p className="text-xs text-dark-gray">
                                                Start Count
                                            </p>

                                            <p className="text-sm text-dark-blue mt-1">
                                                {selectedRequest
                                                    .order
                                                    ?.startCount ??
                                                    "—"}
                                            </p>
                                        </div>


                                        <div>
                                            <p className="text-xs text-dark-gray">
                                                Order Quantity
                                            </p>

                                            <p className="text-sm text-dark-blue mt-1">
                                                {selectedRequest
                                                    .order
                                                    ?.quantity ??
                                                    "—"}
                                            </p>
                                        </div>


                                        <div>
                                            <p className="text-xs text-dark-gray">
                                                Final Quantity
                                            </p>

                                            <p className="text-sm text-dark-blue mt-1">
                                                {selectedRequest
                                                    .order
                                                    ?.finalQuantity ??
                                                    "—"}
                                            </p>
                                        </div>


                                        <div>
                                            <p className="text-xs text-dark-gray">
                                                Remains
                                            </p>

                                            <p className="text-sm text-dark-blue mt-1">
                                                {selectedRequest
                                                    .order
                                                    ?.remains ??
                                                    "—"}
                                            </p>
                                        </div>


                                        <div>
                                            <p className="text-xs text-dark-gray">
                                                Order Price
                                            </p>

                                            <p className="text-sm font-semibold text-dark-blue mt-1">
                                                {formatAmount(
                                                    selectedRequest
                                                        .order
                                                        ?.charge
                                                )}
                                            </p>
                                        </div>


                                        <div>
                                            <p className="text-xs text-dark-gray">
                                                Order Status
                                            </p>

                                            <p className="text-sm text-dark-blue mt-1 capitalize">
                                                {selectedRequest
                                                    .order
                                                    ?.status ||
                                                    "—"}
                                            </p>
                                        </div>


                                        <div>
                                            <p className="text-xs text-dark-gray">
                                                Provider Order ID
                                            </p>

                                            <p className="text-sm text-dark-blue mt-1">
                                                {selectedRequest
                                                    .order
                                                    ?.providerOrderId ||
                                                    "—"}
                                            </p>
                                        </div>

                                    </div>


                                    <div className="mt-3">

                                        <p className="text-xs text-dark-gray">
                                            Link
                                        </p>

                                        <p className="text-sm text-dark-blue mt-1 break-all">
                                            {selectedRequest
                                                .order
                                                ?.link ||
                                                "—"}
                                        </p>

                                    </div>

                                </div>


                                {/* Customer Reason */}

                                <div>

                                    <h3 className="text-sm font-semibold text-dark-blue mb-2">
                                        Customer Reason
                                    </h3>

                                    <div className="rounded-lg border border-light-azure bg-gray-50 p-3">

                                        <p className="text-sm text-dark-gray whitespace-pre-wrap">
                                            {selectedRequest.reason ||
                                                "No reason provided."}
                                        </p>

                                    </div>

                                </div>


                                {/* Admin Note */}

                                <div>

                                    <h3 className="text-sm font-semibold text-dark-blue mb-2">
                                        Admin Note
                                    </h3>

                                    {selectedRequest.status ===
                                        "pending" ? (

                                        <textarea
                                            value={
                                                adminNote
                                            }
                                            onChange={(
                                                event
                                            ) =>
                                                setAdminNote(
                                                    event
                                                        .target
                                                        .value
                                                )
                                            }
                                            rows={4}
                                            maxLength={
                                                1000
                                            }
                                            placeholder="Write an admin note..."
                                            disabled={
                                                processing
                                            }
                                            className="w-full rounded-lg border border-light-azure bg-white px-3 py-2 text-sm text-dark-blue outline-none resize-none focus:border-dark-blue disabled:bg-gray-50 disabled:cursor-not-allowed"
                                        />

                                    ) : (

                                        <div className="rounded-lg border border-light-azure bg-gray-50 p-3">

                                            <p className="text-sm text-dark-gray whitespace-pre-wrap">
                                                {selectedRequest
                                                    .adminNote ||
                                                    "No admin note."}
                                            </p>

                                        </div>

                                    )}

                                </div>


                                {/* Processed */}

                                {selectedRequest.processedAt && (

                                    <div>

                                        <p className="text-xs text-dark-gray">
                                            Processed At
                                        </p>

                                        <p className="text-sm text-dark-blue mt-1">
                                            {formatDate(
                                                selectedRequest.processedAt
                                            )}
                                        </p>

                                    </div>

                                )}

                            </div>


                            {/* Modal Footer */}

                            <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3 px-5 py-4 border-t border-light-azure">

                                {selectedRequest.status ===
                                    "pending" ? (

                                    <>

                                        <div className="text-xs text-dark-gray">
                                            Admin note is required
                                            before processing.
                                        </div>

                                        <div className="flex items-center gap-2">

                                            <button
                                                type="button"
                                                disabled={
                                                    processing
                                                }
                                                onClick={() =>
                                                    updateRefundRequest(
                                                        "rejected"
                                                    )
                                                }
                                                className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md border border-red-200 bg-red-50 text-red-600 text-sm font-medium hover:bg-red-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                            >

                                                <XCircle
                                                    size={
                                                        16
                                                    }
                                                />

                                                {processing
                                                    ? "Processing..."
                                                    : "Reject Refund"}

                                            </button>


                                            <button
                                                type="button"
                                                disabled={
                                                    processing
                                                }
                                                onClick={() =>
                                                    updateRefundRequest(
                                                        "approved"
                                                    )
                                                }
                                                className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-dark-blue text-white text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                                            >

                                                <CheckCircle2
                                                    size={
                                                        16
                                                    }
                                                />

                                                {processing
                                                    ? "Processing..."
                                                    : "Approve Refund"}

                                            </button>

                                        </div>

                                    </>

                                ) : (

                                    <div className="flex justify-end w-full">

                                        <button
                                            type="button"
                                            onClick={
                                                closeDetails
                                            }
                                            className="px-4 py-2 rounded-md bg-dark-blue text-white text-sm hover:opacity-90 transition-opacity"
                                        >
                                            Close
                                        </button>

                                    </div>

                                )}

                            </div>

                        </div>

                    </div>

                )}

        </section>
    );
}

export default AdminRefundRequests;