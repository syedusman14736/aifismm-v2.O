
import React from "react";

import { Eye } from "lucide-react";
import { useCurrency } from "../../../context/CurrencyContext";


const OrdersTable = ({ orders, onView }) => {

    const {
        formatCurrency,
    } = useCurrency();


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

        <div className="mt-4 overflow-hidden border-t border-l border-r border-light-azure">

            <div className="overflow-x-auto hide-scrollbar">

                <table className="w-full min-w-[1000px] bg-light-blue text-left">

                    {/* Table Header */}

                    <thead className="border-b border-light-azure">

                        <tr className="text-[12px] text-dark-blue">

                            <td className="px-4 py-3 font-medium">
                                Order ID
                            </td>

                            <td className="px-4 py-3 font-medium">
                                Service
                            </td>

                            <td className="px-4 py-3 font-medium">
                                Platform
                            </td>

                            <td className="px-4 py-3 font-medium">
                                Category
                            </td>

                            <td className="px-4 py-3 font-medium">
                                Quantity
                            </td>

                            <td className="px-4 py-3 font-medium">
                                Charge
                            </td>

                            <td className="px-4 py-3 font-medium">
                                Status
                            </td>

                            <td className="px-4 py-3 font-medium">
                                Date
                            </td>

                            <td className="px-4 py-3 text-center font-medium">
                                Action
                            </td>

                        </tr>

                    </thead>


                    {/* Table Body */}

                    <tbody>

                        {orders.length > 0 ? (

                            orders.map((order) => (

                                <tr
                                    key={order.orderId}
                                    className="
                                        border-b
                                        border-light-azure
                                        hover:bg-light-blue
                                    "
                                >

                                    {/* Order ID */}

                                    <td className="px-4 py-4">

                                        <span className="text-xs font-semibold text-dark-gray">
                                            #{order.orderId}
                                        </span>

                                    </td>


                                    {/* Service */}

                                    <td className="max-w-[240px] px-4 py-4">

                                        <p className="truncate text-xs font-medium text-dark-gray">
                                            {order.service}
                                        </p>

                                        <a
                                            href={order.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="mt-1 block truncate text-[10px] text-gray hover:text-dark-blue cursor-pointer"
                                        >
                                            {order.link}
                                        </a>

                                    </td>


                                    {/* Platform */}

                                    <td className="px-4 py-4">

                                        <span className="text-xs text-dark-gray">
                                            {order.platform}
                                        </span>

                                    </td>


                                    {/* Category */}

                                    <td className="px-4 py-4">

                                        <span className="text-xs text-dark-gray">
                                            {order.category}
                                        </span>

                                    </td>


                                    {/* Quantity */}

                                    <td className="px-4 py-4">

                                        <span className="text-xs font-medium text-dark-gray">

                                            {Number(
                                                order.quantity || 0
                                            ).toLocaleString()}

                                        </span>

                                    </td>


                                    {/* Charge */}

                                    <td className="px-4 py-4">

                                        <span className="text-xs text-dark-gray">

                                            {formatCurrency(
                                                Number(
                                                    order.charge || 0
                                                )
                                            )}

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
                                                ${getStatusClasses(
                                                order.status
                                            )}
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
                                            type="button"
                                            onClick={() =>
                                                onView(order)
                                            }
                                            className="
                                                inline-flex
                                                items-center
                                                gap-1.5
                                                rounded-md
                                                border
                                                border-light-azure
                                                px-2.5
                                                py-1.5
                                                text-[11px]
                                                font-medium
                                                text-dark-gray
                                                transition
                                                hover:bg-[#f9fafb]
                                                hover:text-dark-gray
                                                cursor-pointer
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

                                    <p className="text-sm font-medium text-dark-gray">
                                        No orders found
                                    </p>

                                    <p className="mt-1 text-xs text-gray">
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
