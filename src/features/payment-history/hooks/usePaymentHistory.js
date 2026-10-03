import {
    useCallback,
    useEffect,
    useState,
} from "react";

const API_URL =
    import.meta.env.VITE_API_URL ||
    "http://localhost:5000/api";

const getAuthToken = () => {
    return localStorage.getItem("aifi_token") || "";
};

const usePaymentHistory = () => {
    const [payments, setPayments] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("all");

    const [page, setPage] = useState(1);

    // IMPORTANT:
    // Keep this as a number, not a string.
    const [itemsPerPage, setItemsPerPage] =
        useState(10);

    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0,
    });

    const [selectedPayment, setSelectedPayment] =
        useState(null);

    const [detailsLoading, setDetailsLoading] =
        useState(false);

    const [detailsError, setDetailsError] =
        useState("");

    const fetchPayments = useCallback(async () => {
        try {
            setLoading(true);
            setError("");

            const token = getAuthToken();

            const params = new URLSearchParams();

            params.set("page", String(page));
            params.set(
                "limit",
                String(itemsPerPage)
            );

            if (status !== "all") {
                params.set("status", status);
            }

            if (search.trim()) {
                params.set(
                    "search",
                    search.trim()
                );
            }

            const response = await fetch(
                `${API_URL}/payments/my?${params.toString()}`,
                {
                    method: "GET",
                    headers: {
                        ...(token
                            ? {
                                Authorization: `Bearer ${token}`,
                            }
                            : {}),
                    },
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    "Unable to fetch payment history."
                );
            }

            setPayments(
                Array.isArray(data.payments)
                    ? data.payments
                    : []
            );

            const serverPagination =
                data.pagination || {};

            setPagination({
                page:
                    Number(
                        serverPagination.page
                    ) || page,

                limit:
                    Number(
                        serverPagination.limit
                    ) || itemsPerPage,

                total:
                    Number(
                        serverPagination.total
                    ) || 0,

                totalPages:
                    Number(
                        serverPagination.totalPages
                    ) || 0,
            });
        } catch (fetchError) {
            console.error(
                "Fetch Payment History Error:",
                fetchError
            );

            setError(
                fetchError.message ||
                "Unable to fetch payment history."
            );

            setPayments([]);

            setPagination({
                page,
                limit: itemsPerPage,
                total: 0,
                totalPages: 0,
            });
        } finally {
            setLoading(false);
        }
    }, [
        page,
        itemsPerPage,
        search,
        status,
    ]);

    useEffect(() => {
        fetchPayments();
    }, [fetchPayments]);

    /*
    |--------------------------------------------------------------------------
    | Search
    |--------------------------------------------------------------------------
    */

    const handleSearchChange = (value) => {
        setSearch(value);
        setPage(1);
    };

    /*
    |--------------------------------------------------------------------------
    | Status
    |--------------------------------------------------------------------------
    */

    const handleStatusChange = (value) => {
        setStatus(value);
        setPage(1);
    };

    /*
    |--------------------------------------------------------------------------
    | Page
    |--------------------------------------------------------------------------
    */

    const handlePageChange = (newPage) => {
        const nextPage = Number(newPage);

        if (!Number.isFinite(nextPage)) {
            return;
        }

        if (nextPage < 1) {
            return;
        }

        if (
            pagination.totalPages > 0 &&
            nextPage > pagination.totalPages
        ) {
            return;
        }

        setPage(nextPage);
    };

    /*
    |--------------------------------------------------------------------------
    | Items Per Page
    |--------------------------------------------------------------------------
    */

    const handleItemsPerPageChange = (
        newLimit
    ) => {
        const limit = Number(newLimit);

        if (
            ![5, 10, 20, 50].includes(limit)
        ) {
            return;
        }

        // Change page size
        setItemsPerPage(limit);

        // Always go back to page 1
        setPage(1);
    };

    /*
    |--------------------------------------------------------------------------
    | View Payment
    |--------------------------------------------------------------------------
    */

    const handleViewPayment = async (
        paymentId
    ) => {
        try {
            setDetailsLoading(true);
            setDetailsError("");

            const token = getAuthToken();

            const response = await fetch(
                `${API_URL}/payments/${paymentId}`,
                {
                    method: "GET",
                    headers: {
                        ...(token
                            ? {
                                Authorization: `Bearer ${token}`,
                            }
                            : {}),
                    },
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    "Unable to fetch payment details."
                );
            }

            setSelectedPayment(
                data.payment || null
            );
        } catch (detailsFetchError) {
            console.error(
                "Fetch Payment Details Error:",
                detailsFetchError
            );

            setDetailsError(
                detailsFetchError.message ||
                "Unable to fetch payment details."
            );
        } finally {
            setDetailsLoading(false);
        }
    };

    /*
    |--------------------------------------------------------------------------
    | Close Details
    |--------------------------------------------------------------------------
    */

    const handleClosePayment = () => {
        setSelectedPayment(null);
        setDetailsError("");
    };

    /*
    |--------------------------------------------------------------------------
    | Refresh
    |--------------------------------------------------------------------------
    */

    const handleRefresh = () => {
        fetchPayments();
    };

    return {
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
    };
};

export default usePaymentHistory;