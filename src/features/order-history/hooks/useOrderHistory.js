
import { useCallback, useEffect, useMemo, useState } from "react";

const API_URL =
    import.meta.env.VITE_API_URL;

const API_BASE_URL = API_URL.endsWith("/api")
    ? API_URL
    : `${API_URL}/api`;


// ==========================================
// STATUS MAPPING
// ==========================================

const mapOrderStatus = (status) => {
    const statusMap = {
        pending: "Pending",
        processing: "In Progress",
        completed: "Completed",
        partial: "Partial",
        canceled: "Canceled",
        refunded: "Refunded",
        failed: "Canceled",
    };

    return statusMap[status] || "Pending";
};


// ==========================================
// HOOK
// ==========================================

const useOrderHistory = () => {

    const [orders, setOrders] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // ==========================================
    // FILTERS
    // ==========================================

    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("All");
    const [platform, setPlatform] = useState("All");
    const [category, setCategory] = useState("All");
    const [dateRange, setDateRange] = useState("All");

    // ==========================================
    // PAGINATION
    // ==========================================

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);


    // ==========================================
    // FETCH ORDERS
    // ==========================================

    const fetchOrders = useCallback(async () => {
        try {
            setLoading(true);
            setError("");

            const token =
                localStorage.getItem("aifi_token");

            if (!token) {
                throw new Error(
                    "Authentication token not found."
                );
            }

            const response = await fetch(
                `${API_BASE_URL}/orders`,
                {
                    method: "GET",

                    headers: {
                        Authorization:
                            `Bearer ${token}`,

                        "Content-Type":
                            "application/json",
                    },
                }
            );

            const data =
                await response.json();

            if (!response.ok || !data.success) {
                throw new Error(
                    data.message ||
                    "Failed to fetch orders."
                );
            }

            const backendOrders =
                Array.isArray(data.orders)
                    ? data.orders
                    : [];


            // ==========================================
            // MAP BACKEND ORDERS
            // ==========================================

            const mappedOrders =
                backendOrders.map((order) => {

                    const service =
                        order.service &&
                            typeof order.service === "object"
                            ? order.service
                            : {};

                    return {

                        ...order,


                        // ==================================
                        // ORDER ID
                        // ==================================

                        id:
                            order.orderId,


                        // ==================================
                        // SERVICE
                        // ==================================

                        service:
                            order.serviceName ||
                            service.name ||
                            "—",


                        // ==================================
                        // PLATFORM
                        // ==================================

                        platform:
                            order.platform ||
                            service.platform ||
                            "Other",


                        // ==================================
                        // CATEGORY
                        // ==================================

                        category:
                            order.category ||
                            service.category ||
                            "Other",


                        // ==================================
                        // STATUS
                        // ==================================

                        status:
                            mapOrderStatus(
                                order.status
                            ),


                        // ==================================
                        // BASIC DATA
                        // ==================================

                        serviceId:
                            Number(
                                order.serviceId
                            ) || 0,

                        link:
                            order.link || "",

                        quantity:
                            Number(
                                order.quantity
                            ) || 0,

                        finalQuantity: order.startCount + order.quantity,


                        // ==================================
                        // IMPORTANT:
                        // THESE ARE ALWAYS BASE PKR VALUES
                        // ==================================

                        rate:
                            Number(
                                order.rate
                            ) || 0,

                        charge:
                            Number(
                                order.charge
                            ) || 0,


                        // ==================================
                        // PROVIDER CURRENCY
                        //
                        // This is NOT the user's display
                        // currency.
                        // ==================================

                        providerCurrency:
                            order.currency ||
                            "PKR",


                        // ==================================
                        // PROVIDER STATUS DATA
                        // ==================================

                        startCount:
                            order.startCount !== null &&
                                order.startCount !== undefined
                                ? Number(
                                    order.startCount
                                )
                                : null,

                        remains:
                            order.remains !== null &&
                                order.remains !== undefined
                                ? Number(
                                    order.remains
                                )
                                : null,


                        // ==================================
                        // REFILL
                        // ==================================

                        refill:
                            order.refill ||
                            service.refill || {
                                enabled: false,
                                duration: null,
                            },


                        // ==================================
                        // REFUND
                        // ==================================

                        refund:
                            order.refund ||
                            service.refund || {
                                enabled: false,
                                duration: null,
                            },


                        // ==================================
                        // OTHER SERVICE CAPABILITIES
                        // ==================================

                        dripfeed:
                            order.dripfeed ??
                            service.dripfeed ??
                            false,

                        cancel:
                            order.cancel ??
                            service.cancel ??
                            false,


                        // ==================================
                        // DATES
                        // ==================================

                        createdAt:
                            order.createdAt || null,

                        submittedAt:
                            order.submittedAt || null,

                        completedAt:
                            order.completedAt || null,
                    };
                });


            setOrders(mappedOrders);

        } catch (error) {

            console.error(
                "Fetch Orders Error:",
                error
            );

            setError(
                error.message ||
                "Unable to fetch orders."
            );

            setOrders([]);

        } finally {

            setLoading(false);
        }

    }, []);


    // ==========================================
    // INITIAL FETCH
    // ==========================================

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);


    // ==========================================
    // FILTERED ORDERS
    // ==========================================

    const filteredOrders = useMemo(() => {

        const now = new Date();

        return orders.filter((order) => {

            const searchValue =
                search
                    .toLowerCase()
                    .trim();


            // ==================================
            // SEARCH
            // ==================================

            const orderId =
                String(order.id || "")
                    .toLowerCase();

            const link =
                String(order.link || "")
                    .toLowerCase();

            const service =
                String(order.service || "")
                    .toLowerCase();


            const matchesSearch =
                !searchValue ||
                orderId.includes(searchValue) ||
                link.includes(searchValue) ||
                service.includes(searchValue);


            // ==================================
            // STATUS
            // ==================================

            const matchesStatus =
                status === "All" ||
                order.status === status;


            // ==================================
            // PLATFORM
            // ==================================

            const matchesPlatform =
                platform === "All" ||
                order.platform === platform;


            // ==================================
            // CATEGORY
            // ==================================

            const matchesCategory =
                category === "All" ||
                order.category === category;


            // ==================================
            // DATE
            // ==================================

            let matchesDate = true;

            if (order.createdAt) {

                const orderDate =
                    new Date(
                        order.createdAt
                    );


                if (dateRange === "Today") {

                    matchesDate =
                        orderDate.toDateString() ===
                        now.toDateString();
                }


                if (dateRange === "7 Days") {

                    const sevenDaysAgo =
                        new Date(now);

                    sevenDaysAgo.setDate(
                        now.getDate() - 7
                    );

                    matchesDate =
                        orderDate >=
                        sevenDaysAgo;
                }


                if (dateRange === "30 Days") {

                    const thirtyDaysAgo =
                        new Date(now);

                    thirtyDaysAgo.setDate(
                        now.getDate() - 30
                    );

                    matchesDate =
                        orderDate >=
                        thirtyDaysAgo;
                }
            }


            return (
                matchesSearch &&
                matchesStatus &&
                matchesPlatform &&
                matchesCategory &&
                matchesDate
            );
        });

    }, [
        orders,
        search,
        status,
        platform,
        category,
        dateRange,
    ]);


    // ==========================================
    // TOTAL PAGES
    // ==========================================

    const totalPages = Math.max(
        1,
        Math.ceil(
            filteredOrders.length /
            itemsPerPage
        )
    );


    // ==========================================
    // PAGINATED ORDERS
    // ==========================================

    const paginatedOrders = useMemo(() => {

        const startIndex =
            (currentPage - 1) *
            itemsPerPage;

        const endIndex =
            startIndex +
            itemsPerPage;

        return filteredOrders.slice(
            startIndex,
            endIndex
        );

    }, [
        filteredOrders,
        currentPage,
        itemsPerPage,
    ]);


    // ==========================================
    // ITEMS PER PAGE
    // ==========================================

    const changeItemsPerPage = (value) => {

        setItemsPerPage(
            Number(value)
        );

        setCurrentPage(1);
    };


    // ==========================================
    // PAGE
    // ==========================================

    const changePage = (page) => {

        if (
            page < 1 ||
            page > totalPages
        ) {
            return;
        }

        setCurrentPage(page);
    };


    // ==========================================
    // RESET FILTERS
    // ==========================================

    const resetFilters = () => {

        setSearch("");
        setStatus("All");
        setPlatform("All");
        setCategory("All");
        setDateRange("All");

        setCurrentPage(1);
    };


    // ==========================================
    // ADD ORDER
    // ==========================================

    const addOrder = (newOrder) => {

        if (!newOrder) {
            return;
        }

        const mappedOrder = {
            ...newOrder,

            id:
                newOrder.orderId ??
                newOrder.id,

            service:
                newOrder.serviceName ||
                newOrder.service?.name ||
                newOrder.service ||
                "—",

            platform:
                newOrder.platform ||
                newOrder.service?.platform ||
                "Other",

            category:
                newOrder.category ||
                newOrder.service?.category ||
                "Other",

            status:
                mapOrderStatus(
                    newOrder.status
                ),

            quantity:
                Number(
                    newOrder.quantity || 0
                ),

            rate:
                Number(
                    newOrder.rate || 0
                ),

            charge:
                Number(
                    newOrder.charge || 0
                ),

            providerCurrency:
                newOrder.currency ||
                "PKR",
        };

        setOrders((prevOrders) => [
            mappedOrder,
            ...prevOrders,
        ]);

        setCurrentPage(1);
    };


    // ==========================================
    // FILTER OPTIONS
    // ==========================================

    const platforms = useMemo(() => {

        return [
            "All",
            ...new Set(
                orders
                    .map(
                        (order) =>
                            order.platform
                    )
                    .filter(Boolean)
            ),
        ];

    }, [orders]);


    const categories = useMemo(() => {

        return [
            "All",
            ...new Set(
                orders
                    .map(
                        (order) =>
                            order.category
                    )
                    .filter(Boolean)
            ),
        ];

    }, [orders]);


    const statuses = [
        "All",
        "Pending",
        "In Progress",
        "Completed",
        "Partial",
        "Canceled",
        "Refunded",
    ];


    const dateRanges = [
        "All",
        "Today",
        "7 Days",
        "30 Days",
    ];


    // ==========================================
    // RETURN
    // ==========================================

    return {

        // Orders
        orders,
        filteredOrders,
        paginatedOrders,

        // API state
        loading,
        error,
        fetchOrders,

        // Filters
        search,
        status,
        platform,
        category,
        dateRange,

        setSearch,
        setStatus,
        setPlatform,
        setCategory,
        setDateRange,

        // Filter options
        statuses,
        platforms,
        categories,
        dateRanges,

        // Pagination
        currentPage,
        totalPages,
        itemsPerPage,

        changePage,
        changeItemsPerPage,

        // Other
        addOrder,
        resetFilters,
    };
};

export default useOrderHistory;