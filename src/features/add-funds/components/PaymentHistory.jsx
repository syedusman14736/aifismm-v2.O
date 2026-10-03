import {
    History,
    Eye,
    Clock3,
    CheckCircle2,
    XCircle,
    ReceiptText,
} from "lucide-react";

const PaymentHistory = ({ payments = [], onViewPayment }) => {
    const formatDate = (date) => {
        if (!date) return "-";

        return new Date(date).toLocaleString("en-PK", {
            dateStyle: "medium",
            timeStyle: "short",
        });
    };

    const getStatusConfig = (status) => {
        switch (status) {
            case "completed":
                return {
                    label: "Completed",
                    icon: CheckCircle2,
                    className: "bg-green-50 text-green-600",
                };

            case "rejected":
                return {
                    label: "Rejected",
                    icon: XCircle,
                    className: "bg-red-50 text-red-600",
                };

            default:
                return {
                    label: "Pending",
                    icon: Clock3,
                    className: "bg-orange-50 text-orange-600",
                };
        }
    };

    return (
        <div className="sticky top-0 self-start flex w-full min-w-0 flex-col overflow-hidden rounded-md border border-light-azure bg-light-blue">
            {/* =========================
                Header
            ========================= */}
            <div className="flex min-w-0 items-center justify-between border-b border-light-azure px-5 py-4">
                <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary-blue/5 text-primary-blue">
                        <History size={18} />
                    </div>

                    <div className="min-w-0">
                        <h2 className="truncate text-sm font-medium text-dark-blue">
                            Payment History
                        </h2>

                        <p className="truncate text-xs text-dark-gray">
                            Your recent deposits
                        </p>
                    </div>
                </div>

                {payments.length > 0 && (
                    <span className="ml-3 shrink-0 rounded-full bg-[#f5f6f8] px-2.5 py-1 text-[11px] font-medium text-dark-gray">
                        {payments.length}{" "}
                        {payments.length === 1
                            ? "Payment"
                            : "Payments"}
                    </span>
                )}
            </div>

            {/* =========================
                Empty State
            ========================= */}
            {payments.length === 0 ? (
                <div className="flex min-h-[220px] flex-col items-center justify-center px-5 py-8 text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f5f6f8] text-[#9aa2b1]">
                        <ReceiptText size={22} />
                    </div>

                    <h3 className="mt-3 text-sm font-medium text-dark-blue">
                        No payments yet
                    </h3>

                    <p className="mt-1 max-w-[250px] text-xs leading-5 text-dark-gray">
                        Your payment history will appear here after
                        you submit your first deposit.
                    </p>
                </div>
            ) : (
                <>
                    {/* =========================
                        Desktop Table
                    ========================= */}
                    <div className="hidden w-full min-w-0 overflow-x-auto md:block">
                        <table className="w-full table-fixed">
                            <thead>
                                <tr className="border-b border-light-azure bg-[#fafafa]">
                                    <th className="w-[24%] px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-dark-gray">
                                        Payment
                                    </th>

                                    <th className="w-[25%] px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-dark-gray">
                                        Method
                                    </th>

                                    <th className="w-[17%] px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-dark-gray">
                                        Amount
                                    </th>

                                    <th className="w-[19%] px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-dark-gray">
                                        Status
                                    </th>

                                    <th className="w-[15%] px-4 py-3 text-right text-[11px] font-semibold uppercase tracking-wide text-dark-gray">
                                        Action
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {payments.map((payment) => {
                                    const status =
                                        getStatusConfig(
                                            payment.status
                                        );

                                    const StatusIcon =
                                        status.icon;

                                    return (
                                        <tr
                                            key={payment.id}
                                            className="border-b border-[#f0f1f3] last:border-b-0 hover:bg-[#fafafa]"
                                        >
                                            {/* Payment */}
                                            <td className="min-w-0 px-4 py-4">
                                                <div className="min-w-0">
                                                    <p className="truncate text-xs font-semibold text-[#172033]">
                                                        {payment.id}
                                                    </p>

                                                    <p className="mt-1 truncate text-[11px] text-dark-gray">
                                                        {formatDate(
                                                            payment.date
                                                        )}
                                                    </p>
                                                </div>
                                            </td>

                                            {/* Method */}
                                            <td className="min-w-0 px-4 py-4">
                                                <div className="min-w-0">
                                                    <p className="truncate text-xs font-medium text-[#172033]">
                                                        {
                                                            payment.method
                                                        }
                                                    </p>

                                                    <p className="mt-1 truncate text-[11px] text-dark-gray">
                                                        TRX:{" "}
                                                        {payment.transactionId ||
                                                            "-"}
                                                    </p>
                                                </div>
                                            </td>

                                            {/* Amount */}
                                            <td className="min-w-0 px-4 py-4">
                                                <p className="truncate text-sm font-bold text-[#172033]">
                                                    PKR{" "}
                                                    {Number(
                                                        payment.amount
                                                    ).toLocaleString()}
                                                </p>
                                            </td>

                                            {/* Status */}
                                            <td className="min-w-0 px-4 py-4">
                                                <span
                                                    className={`inline-flex max-w-full items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${status.className}`}
                                                >
                                                    <StatusIcon
                                                        size={13}
                                                        className="shrink-0"
                                                    />

                                                    <span className="truncate">
                                                        {
                                                            status.label
                                                        }
                                                    </span>
                                                </span>
                                            </td>

                                            {/* Action */}
                                            <td className="px-4 py-4 text-right">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        onViewPayment?.(
                                                            payment
                                                        )
                                                    }
                                                    className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg border border-light-azure px-3 py-1.5 text-xs font-semibold text-dark-gray transition hover:border-[#ff7200] hover:bg-[#fff7f0] hover:text-[#ff7200]"
                                                >
                                                    <Eye
                                                        size={14}
                                                    />
                                                    View
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* =========================
                        Mobile List
                    ========================= */}
                    <div className="w-full min-w-0 divide-y divide-[#f0f1f3] md:hidden">
                        {payments.map((payment) => {
                            const status =
                                getStatusConfig(
                                    payment.status
                                );

                            const StatusIcon =
                                status.icon;

                            return (
                                <div
                                    key={payment.id}
                                    className="min-w-0 px-4 py-4"
                                >
                                    {/* Top */}
                                    <div className="flex min-w-0 items-start justify-between gap-3">
                                        <div className="min-w-0">
                                            <p className="truncate text-xs font-bold text-[#172033]">
                                                {payment.id}
                                            </p>

                                            <p className="mt-1 truncate text-[11px] text-dark-gray">
                                                {payment.method}
                                            </p>
                                        </div>

                                        <span
                                            className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-1 text-[10px] font-semibold ${status.className}`}
                                        >
                                            <StatusIcon
                                                size={12}
                                            />

                                            {status.label}
                                        </span>
                                    </div>

                                    {/* Amount + View */}
                                    <div className="mt-4 flex items-center justify-between gap-3">
                                        <div className="min-w-0">
                                            <p className="text-[11px] text-dark-gray">
                                                Amount
                                            </p>

                                            <p className="mt-0.5 truncate text-sm font-bold text-[#172033]">
                                                PKR{" "}
                                                {Number(
                                                    payment.amount
                                                ).toLocaleString()}
                                            </p>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                onViewPayment?.(
                                                    payment
                                                )
                                            }
                                            className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-light-azure px-3 py-1.5 text-xs font-semibold text-dark-gray transition hover:border-[#ff7200] hover:bg-[#fff7f0] hover:text-[#ff7200]"
                                        >
                                            <Eye
                                                size={14}
                                            />
                                            View
                                        </button>
                                    </div>

                                    {/* Transaction ID */}
                                    <div className="mt-3 min-w-0 overflow-hidden rounded-lg bg-[#f8f9fb] px-3 py-2">
                                        <p className="text-[10px] font-medium uppercase tracking-wide text-[#9aa2b1]">
                                            Transaction ID
                                        </p>

                                        <p
                                            title={
                                                payment.transactionId ||
                                                "-"
                                            }
                                            className="mt-0.5 truncate text-[11px] font-semibold text-[#172033]"
                                        >
                                            {payment.transactionId ||
                                                "-"}
                                        </p>
                                    </div>

                                    {/* Date */}
                                    <p className="mt-2 truncate text-[10px] text-[#9aa2b1]">
                                        {formatDate(payment.date)}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </>
            )}
        </div>
    );
};

export default PaymentHistory;