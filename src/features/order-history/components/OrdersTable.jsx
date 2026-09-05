import React from "react";
import { Eye } from "lucide-react";

const OrdersTable = ({ orders, onView }) => {
    const getStatusClasses = (status) => {
        switch (status) {
            case "Completed":
                return "bg-green-50 text-green-700";

            case "In Progress":
                return "bg-blue-50 text-blue-700";

            case "Pending":
                return "bg-yellow-50 text-yellow-700";

            case "Partial":
                return "bg-orange-50 text-orange-700";

            case "Canceled":
            case "Refunded":
                return "bg-red-50 text-red-700";

            default:
                return "bg-gray-50 text-gray-700";
        }
    };

    return (
        <div className="mt-4 overflow-hidden  border-t border-l border-r border-[#e5e7eb]">

            <div className="overflow-x-auto hide-scrollbar">

                <table className="w-full min-w-[1000px] text-left ">

                    {/* Table Header */}
                    <thead className="border-b border-[#e5e7eb] bg-[#f9fafb]">

                        <tr className="text-[12px] text-[#6b7280]">

                            <th className="px-4 py-3">
                                Order ID
                            </th>

                            <th className="px-4 py-3">
                                Service
                            </th>

                            <th className="px-4 py-3">
                                Platform
                            </th>

                            <th className="px-4 py-3">
                                Category
                            </th>

                            <th className="px-4 py-3">
                                Quantity
                            </th>

                            <th className="px-4 py-3">
                                Charge
                            </th>

                            <th className="px-4 py-3">
                                Status
                            </th>

                            <th className="px-4 py-3">
                                Date
                            </th>

                            <th className="px-4 py-3 text-right">
                                Action
                            </th>

                        </tr>

                    </thead>


                    {/* Table Body */}
                    <tbody>

                        {orders.length > 0 ? (

                            orders.map((order) => (

                                <tr
                                    key={order.id}
                                    className="
                                        border-b
                                        border-[#f0f0f0]
                                        last:border-b-0
                                        hover:bg-[#fafafa]
                                    "
                                >

                                    {/* Order ID */}
                                    <td className="px-4 py-4">

                                        <span className="text-xs font-semibold text-[#111827]">
                                            #{order.id}
                                        </span>

                                    </td>


                                    {/* Service */}
                                    <td className="max-w-[240px] px-4 py-4">

                                        <p className="truncate text-xs font-medium text-[#374151]">
                                            {order.service}
                                        </p>

                                        <p className="mt-1 truncate text-[10px] text-[#9ca3af]">
                                            {order.link}
                                        </p>

                                    </td>


                                    {/* Platform */}
                                    <td className="px-4 py-4">

                                        <span className="text-xs text-[#4b5563]">
                                            {order.platform}
                                        </span>

                                    </td>


                                    {/* Category */}
                                    <td className="px-4 py-4">

                                        <span className="text-xs text-[#4b5563]">
                                            {order.category}
                                        </span>

                                    </td>


                                    {/* Quantity */}
                                    <td className="px-4 py-4">

                                        <span className="text-xs font-medium text-[#374151]">
                                            {order.quantity.toLocaleString()}
                                        </span>

                                    </td>


                                    {/* Charge */}
                                    <td className="px-4 py-4">

                                        <span className="text-xs text-[#111827]">
                                            {order.currency} {order.charge}
                                        </span>

                                    </td>


                                    {/* Status */}
                                    <td className="px-4 py-4">

                                        <span
                                            className={`
                                                inline-flex
                                                rounded-full
                                                px-2.5
                                                py-1
                                                text-[10px]
                                                font-medium
                                                ${getStatusClasses(order.status)}
                                            `}
                                        >
                                            {order.status}
                                        </span>

                                    </td>


                                    {/* Date */}
                                    <td className="px-4 py-4">

                                        <span className="whitespace-nowrap text-xs text-[#6b7280]">
                                            {new Date(
                                                order.createdAt
                                            ).toLocaleDateString()}
                                        </span>

                                    </td>


                                    {/* Action */}
                                    <td className="px-4 py-4 text-right">

                                        <button
                                            onClick={() => onView(order)}
                                            className="
                                                inline-flex
                                                items-center
                                                gap-1.5
                                                rounded-md
                                                border
                                                border-[#e5e7eb]
                                                px-2.5
                                                py-1.5
                                                text-[11px]
                                                font-medium
                                                text-[#374151]
                                                transition
                                                hover:bg-[#f9fafb]
                                                hover:text-[#111827]
                                            "
                                        >
                                            <Eye size={13} />
                                            View
                                        </button>

                                    </td>

                                </tr>

                            ))

                        ) : (

                            <tr>

                                <td
                                    colSpan="9"
                                    className="px-4 py-14 text-center"
                                >

                                    <p className="text-sm font-medium text-[#374151]">
                                        No orders found
                                    </p>

                                    <p className="mt-1 text-xs text-[#9ca3af]">
                                        Try changing your filters or search.
                                    </p>

                                </td>

                            </tr>

                        )}

                    </tbody>

                </table>

            </div>

        </div>
    );
};

export default OrdersTable;