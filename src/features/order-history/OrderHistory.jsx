import { Plus } from "lucide-react";
import { useState } from "react";

import useOrderHistory from "./hooks/useOrderHistory";

import OrdersTable from "./components/OrdersTable";
import OrderFilters from "./components/OrderFilters";
import StatusTabs from "./components/StatusTabs";
import OrderDetailsModal from "./components/OrderDetailsModal";
import Pagination from "./components/Pagination";
import OrderSummary from "./components/OrderSummary";
import Sidebar from "../../components/layout/Sidebar";
import Topbar from "../../components/layout/Topbar";

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
        <div className="flex h-screen w-full overflow-hidden">
            <Sidebar />
            <div className="h-full flex min-w-0 flex-1 flex-col justify-between">
                <Topbar />

                <main className="h-full overflow-y-auto hide-scrollbar px-4">

                    {/* Filters */}
                    <div className="mt-4">
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

                    {/* Main Content */}
                    <div>

                        {/* Left Content */}
                        <div className="min-w-0 pt-4">

                            {/* Status Tabs */}
                            <StatusTabs
                                status={status}
                                setStatus={setStatus}
                                statuses={statuses}
                            />

                            {/* Orders Table */}
                            <OrdersTable
                                orders={paginatedOrders}
                                onView={(order) => setSelectedOrder(order)}
                            />

                            {/* Pagination */}
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                itemsPerPage={itemsPerPage}
                                totalItems={filteredOrders.length}
                                changePage={changePage}
                                changeItemsPerPage={changeItemsPerPage}
                            />

                        </div>

                        {/* Right Sidebar */}
                        {/* <OrderSummary orders={orders} /> */}

                    </div>

                    {/* Order Details Modal */}
                    {selectedOrder && (
                        <OrderDetailsModal
                            order={selectedOrder}
                            onClose={() => setSelectedOrder(null)}
                        />
                    )}

                </main>
            </div>
        </div>

    );
};

export default OrderHistory;