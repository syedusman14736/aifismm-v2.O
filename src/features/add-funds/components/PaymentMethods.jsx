import {
    WalletCards,
    Smartphone,
    Building2,
    CreditCard,
} from "lucide-react";

const getMethodIcon = (
    type
) => {
    if (
        type ===
        "mobile_wallet"
    ) {
        return Smartphone;
    }

    if (
        type ===
        "bank"
    ) {
        return Building2;
    }

    return CreditCard;
};

const PaymentMethods = ({
    selectedMethod,
    onSelectMethod,
    paymentMethods = [],
    loading = false,
    error = "",
}) => {
    return (
        <div className="rounded-md border border-[#e5e7eb] bg-light-blue p-5">
            {/* Header */}
            <div className="mb-4">
                <h2 className="text-[16px] font-medium text-[#252525]">
                    Payment Method
                </h2>

                <p className="text-xs text-[#777b80]">
                    Select your preferred payment method
                </p>
            </div>

            {/* Loading */}
            {loading && (
                <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                    <div className="h-[112px] animate-pulse rounded-md border border-light-azure bg-light-blue" />
                    <div className="h-[112px] animate-pulse rounded-md border border-light-azure bg-light-blue" />
                    <div className="h-[112px] animate-pulse rounded-md border border-light-azure bg-light-blue" />
                </div>
            )}

            {/* Error */}
            {!loading && error && (
                <div className="rounded-md border border-red-200 bg-red-50 px-3 py-3 text-xs text-red-600">
                    {error}
                </div>
            )}

            {/* No Methods */}
            {!loading &&
                !error &&
                paymentMethods.length ===
                0 && (
                    <div className="rounded-md border border-light-azure bg-light-blue px-3 py-4 text-xs text-dark-gray">
                        No payment methods are currently available.
                    </div>
                )}

            {/* Methods */}
            {!loading &&
                !error &&
                paymentMethods.length >
                0 && (
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                        {paymentMethods.map(
                            (method) => {
                                const selected =
                                    selectedMethod ===
                                    method.key;

                                const Icon =
                                    getMethodIcon(
                                        method.type
                                    );

                                return (
                                    <button
                                        key={
                                            method._id ||
                                            method.key
                                        }
                                        type="button"
                                        onClick={() =>
                                            onSelectMethod(
                                                method.key
                                            )
                                        }
                                        className={`cursor-pointer flex flex-col min-w-0  gap-3 rounded-md border text-left transition-all ${selected
                                            ? "border-primary-blue"
                                            : "border-light-azure bg-light-blue hover:border-primary-blue/40 hover:bg-primary-blue/1"
                                            }`}
                                    >
                                        {/* Radio */}
                                        <div
                                            className={`mx-3 mt-3 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${selected
                                                ? "border-primary-blue"
                                                : "border-light-azure"
                                                }`}
                                        >
                                            {selected && (
                                                <div className="h-2 w-2 rounded-full bg-primary-blue" />
                                            )}
                                        </div>

                                        <div className="flex gap-3 px-2.5 pb-4.5 items-center">
                                            {/* Icon */}
                                            <div
                                                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-md ${selected
                                                    ? "bg-light-blue text-primary-blue"
                                                    : "bg-light-blue text-dark-gray"
                                                    }`}
                                            >
                                                <Icon size={19} />
                                            </div>

                                            {/* Content */}
                                            <div className="min-w-0 flex-1">
                                                <p className="truncate text-sm font-medium text-dark-blue">
                                                    {
                                                        method.name
                                                    }
                                                </p>

                                                <p className=" truncate text-[11px] text-dark-gray">
                                                    {method.type ===
                                                        "bank"
                                                        ? "Direct bank transfer"
                                                        : method.type ===
                                                            "mobile_wallet"
                                                            ? `Pay using ${method.name}`
                                                            : `Pay using ${method.name}`}
                                                </p>
                                            </div>
                                        </div>
                                    </button>
                                );
                            }
                        )}
                    </div>
                )}
        </div>
    );
};

export default PaymentMethods;