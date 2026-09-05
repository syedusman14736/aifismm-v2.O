import React, { useMemo } from "react";
import {
    ClipboardList,
    CheckCircle2,
    Clock3,
    LoaderCircle,
    Wallet,
    HelpCircle,
    Lightbulb,
} from "lucide-react";

const OrderSummary = ({ orders }) => {
    const stats = useMemo(() => {
        const totalSpent = orders.reduce(
            (total, order) => total + Number(order.charge || 0),
            0
        );

        return {
            total: orders.length,

            completed: orders.filter(
                (order) => order.status === "Completed"
            ).length,

            inProgress: orders.filter(
                (order) => order.status === "In Progress"
            ).length,

            pending: orders.filter(
                (order) => order.status === "Pending"
            ).length,

            totalSpent,
        };
    }, [orders]);

    const statItems = [
        {
            label: "Total Orders",
            value: stats.total,
            icon: ClipboardList,
        },
        {
            label: "Completed",
            value: stats.completed,
            icon: CheckCircle2,
        },
        {
            label: "In Progress",
            value: stats.inProgress,
            icon: LoaderCircle,
        },
        {
            label: "Pending",
            value: stats.pending,
            icon: Clock3,
        },
    ];

    return (
        <aside className="space-y-3 sticky top-0 self-start pb-4  pt-5">

            {/* Quick Tips */}
            <div className="rounded-md border border-[#e5e7eb] bg-white p-4">

                <div className="flex items-center gap-2">
                    <Lightbulb
                        size={15}
                        className="text-[#6b7280]"
                    />

                    <h3 className="text-xs font-medium text-[#2532525]">
                        Quick Tips
                    </h3>
                </div>

                <div className="mt-3 space-y-2">
                    <div className="flex gap-2">
                        <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-[#9ca3af]" />

                        <p className="text-[11px] leading-4 text-[#6b7280]">
                            Use the search bar to quickly find an order.
                        </p>
                    </div>

                    <div className="flex gap-2">
                        <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-[#9ca3af]" />

                        <p className="text-[11px] leading-4 text-[#6b7280]">
                            Click View to see complete order details.
                        </p>
                    </div>

                    <div className="flex gap-2">
                        <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-[#9ca3af]" />

                        <p className="text-[11px] leading-4 text-[#6b7280]">
                            Orders with refill support can be monitored
                            after completion.
                        </p>
                    </div>
                </div>

            </div>

            {/* Order Summary */}
            <div className="rounded-md border border-[#e5e7eb] bg-white p-4">

                <div className="mb-4">
                    <h3 className="text-[16px] font-medium text-[#fa6c0a]">
                        Order Summary
                    </h3>

                    <p className="text-xs text-[#777b80]">
                        Overview of your orders
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-2">
                    {statItems.map((item) => {
                        const Icon = item.icon;

                        return (
                            <div
                                key={item.label}
                                className="rounded-md border border-[#f0f0f0] bg-[#fafafa] p-3"
                            >
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] text-[#9ca3af]">
                                        {item.label}
                                    </span>

                                    <Icon
                                        size={13}
                                        className="text-[#9ca3af]"
                                    />
                                </div>

                                <p className="mt-2 text-lg font-semibold text-[#111827]">
                                    {item.value}
                                </p>
                            </div>
                        );
                    })}
                </div>

                {/* Total Spent */}
                <div className="mt-2 flex items-center justify-between rounded-md border border-[#f0f0f0] bg-white p-3">
                    <div className="flex items-center gap-2">
                        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-white border border-[#e5e7eb]">
                            <Wallet
                                size={14}
                                className="text-[#6b7280]"
                            />
                        </div>

                        <div>
                            <p className="text-[10px] text-[#6b7280]">
                                Total Spent
                            </p>

                            <p className="text-[18px] font-medium text-[#fa6c0a]">
                                PKR {stats.totalSpent.toLocaleString()}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Help */}
            {/* <div className="rounded-md border border-[#e5e7eb] bg-white p-4">
                <div className="flex items-start gap-3">

                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-white border border-[#e5e7eb]">
                        <HelpCircle
                            size={15}
                            className="text-[#fa6c0a]"
                        />
                    </div>

                    <div>
                        <h3 className="text-xs font-semibold text-[#fa6c0a]">
                            Need Help?
                        </h3>

                        <p className="mt-1 text-[11px] leading-4 text-[#9ca3af]">
                            If your order is taking longer than expected,
                            check its status or contact support.
                        </p>

                        <button
                            type="button"
                            className="mt-3 text-[11px] font-medium text-[#fa6c0a] hover:underline"
                        >
                            Contact Support →
                        </button>
                    </div>

                </div>
            </div> */}



        </aside>
    );
};

export default OrderSummary;