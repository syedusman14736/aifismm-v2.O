import React, {
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    ExternalLink,
    X,
    RefreshCw,
    RotateCcw,
} from "lucide-react";

import { useCurrency } from "../../../context/CurrencyContext";

const API_URL =
    import.meta.env.VITE_API_URL ||
    "http://localhost:4040";

const API_BASE_URL = API_URL.endsWith("/api")
    ? API_URL
    : `${API_URL}/api`;

const OrderDetailsModal = ({
    order,
    onClose,
}) => {
    const {
        convertFromUSD,
        formatCurrency,
    } = useCurrency();

    const [actions, setActions] = useState([]);
    const [loadingActions, setLoadingActions] =
        useState(false);
    const [requestingType, setRequestingType] =
        useState(null);
    const [actionError, setActionError] =
        useState("");
    const [actionSuccess, setActionSuccess] =
        useState("");

    if (!order) return null;

    // ==========================================
    // STATUS CLASSES
    // ==========================================

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

    // ==========================================
    // FORMAT USD PRICE -> SELECTED CURRENCY
    // ==========================================

    const formatPrice = (value) => {
        const number = Number(value);

        if (!Number.isFinite(number)) {
            return "0";
        }

        const converted = convertFromUSD(number);

        if (!Number.isFinite(converted)) {
            return "0";
        }

        return converted
            .toFixed(8)
            .replace(/\.?0+$/, "");
    };

    // ==========================================
    // FORMAT RATE
    // ==========================================

    const formatRate = (value) => {
        const number = Number(value);

        if (!Number.isFinite(number)) {
            return "0";
        }

        const converted = convertFromUSD(number);

        if (!Number.isFinite(converted)) {
            return "0";
        }

        return converted
            .toFixed(8)
            .replace(/\.?0+$/, "");
    };

    // ==========================================
    // FORMAT NUMBER
    // ==========================================

    const formatNumber = (value) => {
        const number = Number(value);

        if (!Number.isFinite(number)) {
            return "-";
        }

        return number.toLocaleString();
    };

    // ==========================================
    // SERVICE
    // ==========================================

    const service =
        order.serviceData ||
        order.serviceDetails ||
        (
            typeof order.service === "object"
                ? order.service
                : {}
        ) ||
        {};

    // ==========================================
    // REFILL
    // ==========================================

    const refill =
        order.refill ||
        service.refill || {
            enabled: false,
            duration: null,
        };

    // ==========================================
    // REFUND
    // ==========================================

    const refund =
        order.refund ||
        service.refund || {
            enabled: false,
            duration: null,
        };

    // ==========================================
    // FINAL QUANTITY
    // ==========================================

    const finalQuantity =
        order.finalQuantity ??
        order.final_quantity ??
        order.finalQty ??
        order.final_qty ??
        null;

    // ==========================================
    // FETCH ACTION HISTORY
    // ==========================================

    const fetchActions = async () => {
        try {
            setLoadingActions(true);
            setActionError("");

            const token =
                localStorage.getItem(
                    "aifi_token"
                );

            if (!token) {
                return;
            }

            const response = await fetch(
                `${API_BASE_URL}/order-actions/${order.orderId ?? order.id
                }`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`,
                    },
                }
            );

            const data =
                await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    "Failed to fetch request history."
                );
            }

            setActions(
                data.actions || []
            );
        } catch (error) {
            console.error(
                "Order action fetch error:",
                error
            );

            setActionError(
                error.message ||
                "Failed to fetch request history."
            );
        } finally {
            setLoadingActions(false);
        }
    };

    // ==========================================
    // LOAD ACTIONS
    // ==========================================

    useEffect(() => {
        fetchActions();
    }, [order]);

    // ==========================================
    // LATEST ACTION BY TYPE
    // ==========================================

    const latestActions = useMemo(() => {
        const result = {
            refill: null,
            refund: null,
        };

        for (const action of actions) {
            if (!result[action.type]) {
                result[action.type] = action;
            }
        }

        return result;
    }, [actions]);

    // ==========================================
    // REQUEST STATE
    // ==========================================

    const getRequestState = (type) => {
        const action =
            latestActions[type];

        if (!action) {
            return {
                action: null,
                pending: false,
                cooldown: false,
                cooldownUntil: null,
            };
        }

        const pending =
            action.status === "pending" ||
            action.status === "processing";

        const cooldownUntil =
            action.cooldownUntil
                ? new Date(
                    action.cooldownUntil
                )
                : null;

        const cooldown =
            !pending &&
            cooldownUntil &&
            cooldownUntil > new Date();

        return {
            action,
            pending,
            cooldown,
            cooldownUntil,
        };
    };

    const refillState =
        getRequestState("refill");

    const refundState =
        getRequestState("refund");

    // ==========================================
    // REQUEST ACTION
    // ==========================================

    const requestAction = async (type) => {
        try {
            setRequestingType(type);
            setActionError("");
            setActionSuccess("");

            const token =
                localStorage.getItem(
                    "aifi_token"
                );

            if (!token) {
                throw new Error(
                    "Authentication required."
                );
            }

            const response = await fetch(
                `${API_BASE_URL}/order-actions/${order.orderId ?? order.id
                }`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/json",
                        Authorization:
                            `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        type,
                    }),
                }
            );

            const data =
                await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    `Failed to request ${type}.`
                );
            }

            setActionSuccess(
                type === "refill"
                    ? "Refill request submitted successfully."
                    : "Refund request submitted successfully."
            );

            await fetchActions();
        } catch (error) {
            console.error(
                `Request ${type} error:`,
                error
            );

            setActionError(
                error.message ||
                `Failed to request ${type}.`
            );
        } finally {
            setRequestingType(null);
        }
    };

    // ==========================================
    // ACTION LABEL
    // ==========================================

    const getActionLabel = (
        type,
        duration,
        state
    ) => {
        if (state.pending) {
            return type === "refill"
                ? "Refill Request Pending"
                : "Refund Request Pending";
        }

        if (state.cooldown) {
            return type === "refill"
                ? "Refill On Cooldown"
                : "Refund On Cooldown";
        }

        if (type === "refill") {
            return duration
                ? `${duration} Refill`
                : "Lifetime Refill";
        }

        return duration
            ? `${duration} Refund`
            : "Lifetime Refund";
    };

    // ==========================================
    // COOLDOWN FORMAT
    // ==========================================

    const formatCooldown = (
        cooldownUntil
    ) => {
        if (!cooldownUntil) {
            return "";
        }

        const remaining =
            new Date(
                cooldownUntil
            ).getTime() -
            Date.now();

        if (remaining <= 0) {
            return "";
        }

        const totalMinutes =
            Math.ceil(
                remaining /
                (1000 * 60)
            );

        const days = Math.floor(
            totalMinutes /
            (60 * 24)
        );

        const hours = Math.floor(
            (totalMinutes %
                (60 * 24)) /
            60
        );

        const minutes =
            totalMinutes % 60;

        if (days > 0) {
            return `${days}d ${hours}h remaining`;
        }

        if (hours > 0) {
            return `${hours}h ${minutes}m remaining`;
        }

        return `${minutes}m remaining`;
    };

    // ==========================================
    // RENDER ACTION BUTTON
    // ==========================================

    const renderActionButton = ({
        type,
        duration,
        state,
        icon,
    }) => {
        const isRequesting =
            requestingType === type;

        const disabled =
            state.pending ||
            state.cooldown ||
            requestingType !== null;

        return (
            <div className="mt-3">
                <button
                    type="button"
                    disabled={disabled}
                    onClick={() =>
                        requestAction(type)
                    }
                    className={`
                        flex
                        w-full
                        items-center
                        justify-center
                        gap-2
                        rounded-md
                        px-4
                        py-2.5
                        text-xs
                        font-medium
                        transition
                        ${disabled
                            ? "cursor-not-allowed bg-gray-100 text-gray-400"
                            : "cursor-pointer bg-dark-blue text-light-blue hover:bg-[#1f2937]"
                        }
                    `}
                >
                    {isRequesting ? (
                        <RefreshCw
                            size={13}
                            className="animate-spin"
                        />
                    ) : (
                        icon
                    )}

                    {isRequesting
                        ? "Submitting..."
                        : getActionLabel(
                            type,
                            duration,
                            state
                        )}
                </button>

                {state.pending && (
                    <p className="mt-1.5 text-[10px] text-yellow-700">
                        Your request is waiting
                        for admin approval.
                    </p>
                )}

                {state.cooldown && (
                    <p className="mt-1.5 text-[10px] text-dark-gray">
                        Available again in{" "}
                        {formatCooldown(
                            state.cooldownUntil
                        )}
                    </p>
                )}

                {state.action?.status ===
                    "rejected" &&
                    !state.cooldown && (
                        <p className="mt-1.5 text-[10px] text-dark-gray">
                            You can submit a new
                            request now.
                        </p>
                    )}
            </div>
        );
    };

    return (
        <div className="fixed inset-0 z-500 flex items-center justify-center bg-black/30 p-4">

            {/* Modal */}
            <div className="w-full max-w-lg overflow-hidden rounded-md bg-light-blue">

                {/* Header */}
                <div className="flex items-center justify-between border-b border-light-azure px-5 py-4">
                    <div>
                        <h2 className="text-[15px] font-semibold text-dark-blue">
                            Order Details
                        </h2>

                        <p className="text-[11px] text-dark-gray">
                            #
                            {
                                order.orderId ??
                                order.id
                            }
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
                            rounded-md
                            text-dark-gray
                            transition
                            hover:bg-[#f3f4f6]
                            hover:text-dark-blue
                            cursor-pointer
                        "
                    >
                        <X size={16} />
                    </button>
                </div>

                {/* Content */}
                <div className="max-h-[70vh] overflow-y-auto px-5 py-5">

                    {/* Status */}
                    <div className="mb-5 flex items-center justify-between rounded-lg border border-light-azure bg-[#fafafa] px-4 py-3">
                        <div>
                            <p className="text-[10px] text-dark-gray">
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
                                ${getStatusClasses(
                                order.status
                            )}
                            `}
                        >
                            {order.status}
                        </span>
                    </div>

                    {/* Service */}
                    <div className="mb-5">
                        <p className="mb-2 text-[11px] font-medium text-dark-gray">
                            Service
                        </p>

                        <div className="rounded-md border border-light-azure p-3">
                            <p className="text-xs font-medium text-dark-blue">
                                {typeof order.service ===
                                    "object"
                                    ? order.service
                                        ?.name
                                    : order.service}
                            </p>

                            <a
                                href={
                                    order.link
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                                className="
                                    mt-2
                                    flex
                                    items-center
                                    gap-1
                                    truncate
                                    text-[10px]
                                    text-dark-gray
                                    hover:text-dark-blue
                                "
                            >
                                {order.link}

                                <ExternalLink
                                    size={11}
                                />
                            </a>
                        </div>
                    </div>

                    {/* Order Information */}
                    <div className="mb-5">
                        <p className="mb-2 text-[11px] font-medium text-dark-gray">
                            Order Information
                        </p>

                        <div className="grid grid-cols-2 overflow-hidden rounded-lg border border-light-azure">

                            <InfoItem
                                label="Service ID"
                                value={
                                    order.serviceId
                                }
                            />

                            <InfoItem
                                label="Category"
                                value={
                                    order.category
                                }
                            />

                            <InfoItem
                                label="Quantity"
                                value={formatNumber(
                                    order.quantity
                                )}
                            />

                            <InfoItem
                                label="Remaining"
                                value={
                                    order.remains !==
                                        null &&
                                        order.remains !==
                                        undefined
                                        ? formatNumber(
                                            order.remains
                                        )
                                        : "-"
                                }
                            />

                            <InfoItem
                                label="Start Count"
                                value={
                                    order.startCount !==
                                        null &&
                                        order.startCount !==
                                        undefined
                                        ? formatNumber(
                                            order.startCount
                                        )
                                        : "-"
                                }
                            />

                            <InfoItem
                                label="Final Quantity"
                                value={
                                    finalQuantity !==
                                        null &&
                                        finalQuantity !==
                                        undefined &&
                                        order.startCount !==
                                        null &&
                                        order.startCount !==
                                        undefined
                                        ? formatNumber(
                                            finalQuantity
                                        )
                                        : "-"
                                }
                            />

                            <InfoItem
                                label="Charge"
                                value={formatCurrency(
                                    Number(
                                        order.charge
                                    ) || 0
                                )}
                            />

                            <InfoItem
                                label="Date"
                                value={
                                    order.createdAt
                                        ? new Date(
                                            order.createdAt
                                        ).toLocaleDateString()
                                        : "-"
                                }
                            />

                        </div>
                    </div>

                    {/* ==========================================
                        REFILL
                    ========================================== */}

                    {/* {refill.enabled && (
                        <div className="mb-5">
                            <p className="mb-2 text-[11px] font-medium text-dark-gray">
                                Refill
                            </p>

                            <div className="rounded-lg border border-light-azure px-4 py-3">

                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-xs font-medium text-[#374151]">
                                            Refill
                                            Protection
                                        </p>

                                        <p className="mt-1 text-[10px] text-dark-gray">
                                            {refill.duration
                                                ? `${refill.duration} refill`
                                                : "Lifetime refill"}
                                        </p>
                                    </div>

                                    <span
                                        className="
                                            rounded-full
                                            bg-green-50
                                            px-2.5
                                            py-1
                                            text-[10px]
                                            font-medium
                                            text-green-700
                                        "
                                    >
                                        Available
                                    </span>
                                </div>

                                {renderActionButton({
                                    type: "refill",
                                    duration:
                                        refill.duration,
                                    state:
                                        refillState,
                                    icon: (
                                        <RefreshCw
                                            size={13}
                                        />
                                    ),
                                })}
                            </div>
                        </div>
                    )} */}

                    {/* ==========================================
                        REFUND
                    ========================================== */}

                    {/* {refund.enabled && (
                        <div className="mb-2">
                            <p className="mb-2 text-[11px] font-medium text-dark-gray">
                                Refund
                            </p>

                            <div className="rounded-lg border border-light-azure px-4 py-3">

                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-xs font-medium text-[#374151]">
                                            Refund
                                            Protection
                                        </p>

                                        <p className="mt-1 text-[10px] text-dark-gray">
                                            {refund.duration
                                                ? `${refund.duration} refund`
                                                : "Lifetime refund"}
                                        </p>
                                    </div>

                                    <span
                                        className="
                                            rounded-full
                                            bg-green-50
                                            px-2.5
                                            py-1
                                            text-[10px]
                                            font-medium
                                            text-green-700
                                        "
                                    >
                                        Available
                                    </span>
                                </div>

                                <p className="mt-3 text-[10px] text-dark-gray">
                                    Refund amount:{" "}
                                    <span className="font-medium text-[#374151]">
                                        {formatCurrency(
                                            Number(
                                                order.charge
                                            ) || 0
                                        )}
                                    </span>
                                </p>

                                {renderActionButton({
                                    type: "refund",
                                    duration:
                                        refund.duration,
                                    state:
                                        refundState,
                                    icon: (
                                        <RotateCcw
                                            size={13}
                                        />
                                    ),
                                })}
                            </div>
                        </div>
                    )} */}

                    {/* SUCCESS */}
                    {/* {actionSuccess && (
                        <div className="mt-4 rounded-md border border-green-200 bg-green-50 px-3 py-2 text-[10px] text-green-700">
                            {actionSuccess}
                        </div>
                    )} */}

                    {/* ERROR */}
                    {/* {actionError && (
                        <div className="mt-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-[10px] text-red-700">
                            {actionError}
                        </div>
                    )} */}

                    {/* REQUEST HISTORY */}
                    {/* {actions.length > 0 && (
                        <div className="mt-5">
                            <p className="mb-2 text-[11px] font-medium text-dark-gray">
                                Request History
                            </p>

                            <div className="overflow-hidden rounded-lg border border-light-azure">

                                {actions.map(
                                    (
                                        action,
                                        index
                                    ) => (
                                        <div
                                            key={
                                                action._id
                                            }
                                            className={`
                                                px-4
                                                py-3
                                                ${index !==
                                                    actions.length -
                                                    1
                                                    ? "border-b border-light-azure"
                                                    : ""
                                                }
                                            `}
                                        >

                                            <div className="flex items-center justify-between">
                                                <p className="text-xs font-medium text-[#374151] capitalize">
                                                    {
                                                        action.type
                                                    }
                                                </p>

                                                <span
                                                    className={`
                                                        rounded-full
                                                        px-2.5
                                                        py-1
                                                        text-[10px]
                                                        font-medium
                                                        ${action.status ===
                                                            "completed"
                                                            ? "bg-green-50 text-green-700"
                                                            : action.status ===
                                                                "rejected"
                                                                ? "bg-red-50 text-red-700"
                                                                : action.status ===
                                                                    "pending"
                                                                    ? "bg-yellow-50 text-yellow-700"
                                                                    : "bg-blue-50 text-blue-700"
                                                        }
                                                    `}
                                                >
                                                    {
                                                        action.status
                                                    }
                                                </span>
                                            </div>

                                            <p className="mt-1 text-[10px] text-dark-gray">
                                                {action.requestedAt
                                                    ? new Date(
                                                        action.requestedAt
                                                    ).toLocaleString()
                                                    : "-"}
                                            </p>

                                            {action.status ===
                                                "rejected" &&
                                                action.rejectionReason && (
                                                    <p className="mt-1 text-[10px] text-red-600">
                                                        {
                                                            action.rejectionReason
                                                        }
                                                    </p>
                                                )}
                                        </div>
                                    )
                                )}

                            </div>
                        </div>
                    )} */}

                    {/* {loadingActions && (
                        <p className="mt-4 text-center text-[10px] text-dark-gray">
                            Loading request history...
                        </p>
                    )} */}

                </div>

                {/* Footer */}
                <div className="flex justify-end border-t border-light-azure px-5 py-3">
                    <button
                        onClick={onClose}
                        className="
                            rounded-md
                            bg-dark-blue
                            px-4
                            py-2
                            text-xs
                            font-medium
                            text-light-blue
                            transition
                            cursor-pointer
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

// ==========================================
// INFO ITEM
// ==========================================

const InfoItem = ({
    label,
    value,
}) => {
    return (
        <div className="border-b border-r border-light-azure px-3 py-3 last:border-b-0">
            <p className="text-[10px] text-dark-gray">
                {label}
            </p>

            <p className="mt-1 text-xs font-medium text-[#374151]">
                {value || "-"}
            </p>
        </div>
    );
};

export default OrderDetailsModal;