const PaymentStatus = ({ status }) => {
    const config = {
        pending: {
            label: "Pending",
            className:
                "border-amber-200 bg-amber-50 text-amber-700",
        },

        completed: {
            label: "Completed",
            className:
                "border-green-200 bg-green-50 text-green-700",
        },

        rejected: {
            label: "Rejected",
            className:
                "border-red-200 bg-red-50 text-red-600",
        },
    };

    const current =
        config[status] || {
            label: status || "Unknown",
            className:
                "border-gray-200 bg-gray-50 text-gray-600",
        };

    return (
        <span
            className={`
                inline-flex
                items-center
                rounded-full
                border
                px-2.5
                py-1
                text-[10px]
                font-semibold
                ${current.className}
            `}
        >
            {current.label}
        </span>
    );
};

export default PaymentStatus;