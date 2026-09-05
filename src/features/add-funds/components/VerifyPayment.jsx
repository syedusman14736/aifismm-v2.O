import {
    AlertCircle,
    ArrowRight,
    CheckCircle2,
    Hash,
    Loader2,
    ShieldCheck,
    Wallet,
} from "lucide-react";

const VerifyPayment = ({
    selectedMethod,
    amount,
    transactionId,
    onAmountChange,
    onTransactionIdChange,
    onVerify,
    loading,
    errors = {},
}) => {
    const methodNames = {
        easypaisa: "Easypaisa",
        jazzcash: "JazzCash",
        bank: "Bank Transfer",
    };

    const methodName =
        methodNames[selectedMethod] || "Payment Method";

    return (
        <section className="rounded-md border border-[#e5e7eb] bg-white p-5">
            {/* Header */}
            <div className="mb-5 flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#eefbf4] text-green-500">
                        <ShieldCheck
                            size={20}
                            strokeWidth={2}
                        />
                    </div>

                    <div>
                        <h2 className="text-[16px] font-medium text-[#252525]">
                            Verify Payment
                        </h2>

                        <p className="text-xs text-[#8a93a5]">
                            Enter your payment transaction details
                        </p>
                    </div>
                </div>

                <div className="hidden items-center gap-1.5 rounded-full bg-[#eefbf4] px-3 py-1.5 text-xs font-medium text-[#16a34a] sm:flex">
                    <CheckCircle2 size={14} />
                    Secure
                </div>
            </div>

            {/* Method */}
            <div className="mb-4 flex items-center justify-between rounded-md border border-[#e5e7eb] bg-[#fafafa] px-4 py-3">
                <div className="flex items-center gap-2.5">
                    <Wallet
                        size={17}
                        className="text-[#ff7200]"
                    />

                    <span className="text-xs text-[#8a93a5]">
                        Payment Method
                    </span>
                </div>

                <span className="text-sm font-medium text-[#8a93a5]">
                    {methodName}
                </span>
            </div>

            <div className="space-y-4">
                {/* Amount */}
                <div>
                    <label className="mb-1.5 block text-sm font-medium text-[#252525]">
                        Payment Amount
                    </label>

                    <div
                        className={`flex items-center rounded-md border bg-white transition ${errors.amount
                            ? "border-red-400"
                            : "border-[#e5e7eb] focus-within:border-[#ff7200]"
                            }`}
                    >
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center text-[#8a93a5]">
                            <Wallet size={17} />
                        </div>

                        <input
                            type="text"
                            inputMode="decimal"
                            value={amount}
                            onChange={(e) =>
                                onAmountChange(
                                    e.target.value
                                )
                            }
                            placeholder="Enter amount you paid"
                            className="w-full bg-transparent px-2 py-3 text-sm text-[#172033] outline-none placeholder:text-[#a0a7b5] placeholder:text-[12px]"
                        />

                        <span className="mr-4 text-xs font-medium text-[#8a93a5]">
                            PKR
                        </span>
                    </div>

                    {errors.amount && (
                        <p className="mt-1.5 text-xs font-medium text-red-500">
                            {errors.amount}
                        </p>
                    )}
                </div>

                {/* Transaction ID */}
                <div>
                    <label className="mb-1.5 block text-sm font-medium text-[#252525]">
                        Transaction ID
                    </label>

                    <div
                        className={`flex items-center rounded-md border bg-white transition ${errors.transactionId
                            ? "border-red-400"
                            : "border-[#e5e7eb] focus-within:border-[#ff7200]"
                            }`}
                    >
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center text-[#8a93a5]">
                            <Hash size={18} />
                        </div>

                        <input
                            type="text"
                            value={transactionId}
                            onChange={(e) =>
                                onTransactionIdChange(
                                    e.target.value
                                )
                            }
                            placeholder="Enter transaction ID / TRX ID"
                            className="w-full bg-transparent px-2 py-3 text-sm text-[#172033] outline-none placeholder:text-[#a0a7b5] placeholder:text-[12px]"
                        />
                    </div>

                    {errors.transactionId && (
                        <p className="mt-1.5 text-xs font-medium text-red-500">
                            {errors.transactionId}
                        </p>
                    )}

                    <p className="mt-1.5 text-[11px] text-[#9aa1ae]">
                        Enter the transaction ID shown in your
                        payment confirmation.
                    </p>
                </div>
            </div>

            {/* Notice */}
            <div className="mt-4 flex items-start gap-3 rounded-md border border-[#f3e8d8] bg-[#fffaf4] p-4">
                <div className="mt-0.5 shrink-0 text-[#d97706]">
                    <AlertCircle size={17} />
                </div>

                <div>
                    <p className="text-xs font-medium text-[#7c4a03]">
                        Before submitting
                    </p>

                    <p className="text-[11px] leading-5 text-[#8a6a35]">
                        Make sure the amount and transaction ID
                        match your actual payment. Incorrect
                        information may delay verification.
                    </p>
                </div>
            </div>

            {/* Button */}
            <button
                type="button"
                onClick={onVerify}
                disabled={loading}
                className={`mt-5 flex w-full items-center justify-center gap-2 rounded-md px-5 py-3.5 text-sm font-medium transition ${loading
                    ? "cursor-not-allowed bg-[#f1f2f4] text-[#a0a7b5]"
                    : "bg-[#ff7200] text-white shadow-sm hover:bg-[#e96800] active:scale-[0.99]"
                    }`}
            >
                {loading ? (
                    <>
                        <Loader2
                            size={18}
                            className="animate-spin"
                        />

                        Verifying Payment...
                    </>
                ) : (
                    <>
                        Verify Payment
                        <ArrowRight size={18} />
                    </>
                )}
            </button>

            {/* Security */}
            <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-[#9aa1ae]">
                <ShieldCheck size={13} />

                <span>
                    Your payment will be reviewed before funds
                    are added.
                </span>
            </div>
        </section>
    );
};

export default VerifyPayment;