import { useState } from "react";

import useOrderHistory from "./hooks/useOrderHistory";

import OrdersTable from "./components/OrdersTable";
import OrderFilters from "./components/OrderFilters";
import StatusTabs from "./components/StatusTabs";
import OrderDetailsModal from "./components/OrderDetailsModal";
import Pagination from "./components/Pagination";

import Sidebar from "../../components/layout/Sidebar";
import Topbar from "../../components/layout/Topbar";
import MobileNavigation from "../../components/layout/MobileNavigation";

const OrderHistory = () => {
    const {
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
        resetFilters,
    } = useOrderHistory();

    const [selectedOrder, setSelectedOrder] = useState(null);

    return (
        <div className="flex h-screen w-full overflow-hidden bg-bg">
            {/* DESKTOP SIDEBAR */}

            {/* Desktop Sidebar */}
            <div className="hidden md:block shrink-0">
                <Sidebar />
            </div>

            <div className="flex h-full min-w-0 flex-1 flex-col">
                {/* TOPBAR */}

                <Topbar />

                {/* MAIN */}

                <main
                    className="
                        min-w-0
                        flex-1
                        overflow-y-auto
                        hide-scrollbar
                        px-3
                        pb-16
                        sm:px-4
                        md:pb-3
                    "
                >
                    {/* FILTERS */}

                    <div className="mt-3 min-w-0 sm:mt-4">
                        <OrderFilters
                            search={search}
                            status={status}
                            platform={platform}
                            category={category}
                            dateRange={dateRange}
                            setSearch={setSearch}
                            setStatus={setStatus}
                            setPlatform={setPlatform}
                            setCategory={setCategory}
                            setDateRange={setDateRange}
                            statuses={statuses}
                            platforms={platforms}
                            categories={categories}
                            dateRanges={dateRanges}
                            resetFilters={resetFilters}
                        />
                    </div>

                    {/* MAIN CONTENT */}

                    <div className="min-w-0 pt-3 sm:pt-4">
                        {/* STATUS TABS */}

                        <div className="min-w-0">
                            <StatusTabs
                                status={status}
                                setStatus={setStatus}
                                statuses={statuses}
                            />
                        </div>

                        {/* ORDERS TABLE */}

                        <div className="mt-2 min-w-0 sm:mt-3">
                            <OrdersTable
                                orders={paginatedOrders}
                                onView={(order) =>
                                    setSelectedOrder(order)
                                }
                            />
                        </div>

                        {/* PAGINATION */}

                        <div className="mt-3 min-w-0 sm:mt-4">
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                itemsPerPage={itemsPerPage}
                                totalItems={filteredOrders.length}
                                changePage={changePage}
                                changeItemsPerPage={
                                    changeItemsPerPage
                                }
                            />
                        </div>
                    </div>

                    {/* ORDER DETAILS MODAL */}

                    {selectedOrder && (
                        <OrderDetailsModal
                            order={selectedOrder}
                            onClose={() =>
                                setSelectedOrder(null)
                            }
                        />
                    )}
                </main>
            </div>

            {/* MOBILE NAVIGATION */}

            <MobileNavigation />
        </div>
    );
};

export default OrderHistory;