import { useMemo, useState } from "react";
import ORDERS from "../data/orders";

const useOrderHistory = () => {
    const [orders, setOrders] = useState(ORDERS);

    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("All");
    const [platform, setPlatform] = useState("All");
    const [category, setCategory] = useState("All");
    const [dateRange, setDateRange] = useState("All");

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    const addOrder = (newOrder) => {
        setOrders((prevOrders) => [newOrder, ...prevOrders]);
        setCurrentPage(1);
    };

    const filteredOrders = useMemo(() => {
        const now = new Date();

        return orders.filter((order) => {
            const searchValue = search.toLowerCase().trim();

            const matchesSearch =
                !searchValue ||
                order.id.toLowerCase().includes(searchValue) ||
                order.link.toLowerCase().includes(searchValue);

            const matchesStatus =
                status === "All" || order.status === status;

            const matchesPlatform =
                platform === "All" || order.platform === platform;

            const matchesCategory =
                category === "All" || order.category === category;

            const orderDate = new Date(order.createdAt);

            let matchesDate = true;

            if (dateRange === "Today") {
                matchesDate =
                    orderDate.toDateString() === now.toDateString();
            }

            if (dateRange === "7 Days") {
                const sevenDaysAgo = new Date();
                sevenDaysAgo.setDate(now.getDate() - 7);

                matchesDate = orderDate >= sevenDaysAgo;
            }

            if (dateRange === "30 Days") {
                const thirtyDaysAgo = new Date();
                thirtyDaysAgo.setDate(now.getDate() - 30);

                matchesDate = orderDate >= thirtyDaysAgo;
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

    const totalPages = Math.max(
        1,
        Math.ceil(filteredOrders.length / itemsPerPage)
    );

    const paginatedOrders = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        return filteredOrders.slice(startIndex, endIndex);
    }, [filteredOrders, currentPage, itemsPerPage]);

    const changeItemsPerPage = (value) => {
        setItemsPerPage(Number(value));
        setCurrentPage(1);
    };

    const changePage = (page) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
    };

    const resetFilters = () => {
        setSearch("");
        setStatus("All");
        setPlatform("All");
        setCategory("All");
        setDateRange("All");
        setCurrentPage(1);
    };

    const platforms = useMemo(() => {
        return ["All", ...new Set(orders.map((order) => order.platform))];
    }, [orders]);

    const categories = useMemo(() => {
        return ["All", ...new Set(orders.map((order) => order.category))];
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

    return {
        orders,
        filteredOrders,
        paginatedOrders,

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

        statuses,
        platforms,
        categories,
        dateRanges,

        currentPage,
        totalPages,
        itemsPerPage,

        changePage,
        changeItemsPerPage,
        addOrder,
        resetFilters,
    };
};

export default useOrderHistory;