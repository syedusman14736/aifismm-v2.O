import {
    WalletCards,
    Smartphone,
    Building2,
} from "lucide-react";

const PAYMENT_METHODS = [
    {
        id: "easypaisa",
        name: "Easypaisa",
        description: "Pay using Easypaisa",
        icon: Smartphone,
    },
    {
        id: "jazzcash",
        name: "JazzCash",
        description: "Pay using JazzCash",
        icon: WalletCards,
    },
    {
        id: "bank",
        name: "Bank Transfer",
        description: "Direct bank transfer",
        icon: Building2,
    },
];

const PaymentMethods = ({
    selectedMethod,
    onSelectMethod,
}) => {
    return (
        <div className="rounded-md border border-[#e5e7eb] bg-white p-5">
            {/* Header */}
            <div className="mb-4">
                <h2 className="text-[16px] font-medium text-[#252525]">
                    Payment Method
                </h2>

                <p className="text-xs text-[#777b80]">
                    Select your preferred payment method
                </p>
            </div>

            {/* Methods */}
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                {PAYMENT_METHODS.map((method) => {
                    const selected =
                        selectedMethod === method.id;

                    const Icon = method.icon;

                    return (
                        <button
                            key={method.id}
                            type="button"
                            onClick={() =>
                                onSelectMethod(method.id)
                            }
                            className={`cursor-pointer flex flex-col min-w-0  gap-3 rounded-md border text-left transition-all ${selected
                                ? "border-[#fa6c0a] bg-[#fff8f2]"
                                : "border-[#dfe2e5] bg-white hover:border-[#fa6c0a]/40 hover:bg-[#fffaf6]"
                                }`}
                        >
                            {/* Radio */}
                            <div
                                className={`mx-3 mt-3 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${selected
                                    ? "border-[#fa6c0a]"
                                    : "border-[#c8ccd0]"
                                    }`}
                            >
                                {selected && (
                                    <div className="h-2 w-2 rounded-full bg-[#fa6c0a]" />
                                )}
                            </div>
                            <div className="flex gap-3 px-2.5 pb-4.5 items-center">
                                {/* Icon */}
                                <div
                                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${selected
                                        ? "bg-[#fff0e5] text-[#fa6c0a]"
                                        : "bg-[#f5f6f8] text-[#7b8497]"
                                        }`}
                                >
                                    <Icon size={19} />
                                </div>

                                {/* Content */}
                                <div className="min-w-0 flex-1">
                                    <p className="truncate text-sm font-medium text-[#172033]">
                                        {method.name}
                                    </p>

                                    <p className=" truncate text-[11px] text-[#8a93a5]">
                                        {method.description}
                                    </p>
                                </div>

                            </div>

                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default PaymentMethods;