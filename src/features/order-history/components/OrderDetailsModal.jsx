import React from "react";
import { ExternalLink, X } from "lucide-react";

const OrderDetailsModal = ({ order, onClose }) => {
    if (!order) return null;

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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">

            {/* Modal */}
            <div className="w-full max-w-lg overflow-hidden rounded-xl bg-white shadow-xl">

                {/* Header */}
                <div className="flex items-center justify-between border-b border-[#e5e7eb] px-5 py-4">

                    <div>
                        <h2 className="text-[15px] font-semibold text-[#111827]">
                            Order Details
                        </h2>

                        <p className="mt-1 text-[11px] text-[#9ca3af]">
                            #{order.id}
                        </p>
                    </div>

                    <button
                        onClick={onClose}
                        className="
                            flex
                            h-8
                            w-8
                            items-center
                            justify-center
                            rounded-lg
                            text-[#6b7280]
                            transition
                            hover:bg-[#f3f4f6]
                            hover:text-[#111827]
                        "
                    >
                        <X size={16} />
                    </button>

                </div>


                {/* Content */}
                <div className="max-h-[70vh] overflow-y-auto px-5 py-5">

                    {/* Status */}
                    <div className="mb-5 flex items-center justify-between rounded-lg border border-[#e5e7eb] bg-[#fafafa] px-4 py-3">

                        <div>
                            <p className="text-[10px] text-[#9ca3af]">
                                Order Status
                            </p>

                            <p className="mt-1 text-xs font-medium text-[#374151]">
                                {order.status}
                            </p>
                        </div>

                        <span
                            className={`
                                rounded-full
                                px-3
                                py-1
                                text-[10px]
                                font-medium
                                ${getStatusClasses(order.status)}
                            `}
                        >
                            {order.status}
                        </span>

                    </div>


                    {/* Service */}
                    <div className="mb-5">

                        <p className="mb-2 text-[11px] font-medium text-[#6b7280]">
                            Service
                        </p>

                        <div className="rounded-lg border border-[#e5e7eb] p-3">

                            <p className="text-xs font-medium text-[#111827]">
                                {order.service}
                            </p>

                            <a
                                href={order.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="
                                    mt-2
                                    flex
                                    items-center
                                    gap-1
                                    truncate
                                    text-[10px]
                                    text-[#6b7280]
                                    hover:text-[#111827]
                                "
                            >
                                {order.link}
                                <ExternalLink size={11} />
                            </a>

                        </div>

                    </div>


                    {/* Order Information */}
                    <div className="mb-5">

                        <p className="mb-2 text-[11px] font-medium text-[#6b7280]">
                            Order Information
                        </p>

                        <div className="grid grid-cols-2 overflow-hidden rounded-lg border border-[#e5e7eb]">

                            <InfoItem
                                label="Platform"
                                value={order.platform}
                            />

                            <InfoItem
                                label="Category"
                                value={order.category}
                            />

                            <InfoItem
                                label="Service Type"
                                value={order.serviceType}
                            />

                            <InfoItem
                                label="Quantity"
                                value={order.quantity?.toLocaleString()}
                            />

                            <InfoItem
                                label="Start Count"
                                value={order.startCount?.toLocaleString()}
                            />

                            <InfoItem
                                label="Remaining"
                                value={order.remains?.toLocaleString()}
                            />

                            <InfoItem
                                label="Charge"
                                value={`${order.currency} ${order.charge}`}
                            />

                            <InfoItem
                                label="Date"
                                value={new Date(
                                    order.createdAt
                                ).toLocaleDateString()}
                            />

                        </div>

                    </div>


                    {/* Refill */}
                    <div>

                        <p className="mb-2 text-[11px] font-medium text-[#6b7280]">
                            Refill
                        </p>

                        <div className="flex items-center justify-between rounded-lg border border-[#e5e7eb] px-4 py-3">

                            <div>
                                <p className="text-xs font-medium text-[#374151]">
                                    Refill Protection
                                </p>

                                <p className="mt-1 text-[10px] text-[#9ca3af]">
                                    {order.refill?.enabled
                                        ? `${order.refill.duration} refill`
                                        : "No refill available"}
                                </p>
                            </div>

                            <span
                                className={`
                                    rounded-full
                                    px-2.5
                                    py-1
                                    text-[10px]
                                    font-medium
                                    ${order.refill?.enabled
                                        ? "bg-green-50 text-green-700"
                                        : "bg-gray-50 text-gray-600"
                                    }
                                `}
                            >
                                {order.refill?.enabled
                                    ? "Available"
                                    : "Not Available"}
                            </span>

                        </div>

                    </div>

                </div>


                {/* Footer */}
                <div className="flex justify-end border-t border-[#e5e7eb] px-5 py-3">

                    <button
                        onClick={onClose}
                        className="
                            rounded-lg
                            bg-[#111827]
                            px-4
                            py-2
                            text-xs
                            font-medium
                            text-white
                            transition
                            hover:bg-[#1f2937]
                        "
                    >
                        Close
                    </button>

                </div>

            </div>

        </div>
    );
};


const InfoItem = ({ label, value }) => {
    return (
        <div className="border-b border-r border-[#e5e7eb] px-3 py-3 last:border-b-0">

            <p className="text-[10px] text-[#9ca3af]">
                {label}
            </p>

            <p className="mt-1 text-xs font-medium text-[#374151]">
                {value || "-"}
            </p>

        </div>
    );
};

export default OrderDetailsModal;