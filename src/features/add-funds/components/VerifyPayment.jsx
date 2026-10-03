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
        <section className="sticky top-0 self-start rounded-md border h-fit border-light-azure bg-light-blue p-5">
            {/* Header */}
            <div className="mb-5 flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">


                    <div>
                        <h2 className="text-[16px] font-medium text-dark-blue">
                            Verify Payment
                        </h2>

                        <p className="text-xs text-dark-gray">
                            Enter your payment transaction details
                        </p>
                    </div>
                </div>

                <div className="hidden items-center gap-1.5 rounded-full bg-light-blue border border-light-azure px-3 py-1.5 text-xs font-medium text-primary-blue sm:flex">
                    <CheckCircle2 size={14} />
                    Secure
                </div>
            </div>

            {/* Method */}
            {/* <div className="mb-4 flex items-center justify-between rounded-md border border-light-azure bg-[#fafafa] px-4 py-3">
                <div className="flex items-center gap-2.5">
                    <Wallet
                        size={17}
                        className="text-primary-blue"
                    />

                    <span className="text-xs md:text-sm text-dark-gray">
                        Payment Method
                    </span>
                </div>

                <span className="text-xs md:text-sm text-dark-gray">
                    {methodName}
                </span>
            </div> */}

            <div className="space-y-4">
                {/* Amount */}
                <div>
                    <label className="mb-1.5 block text-sm font-medium text-dark-blue">
                        Payment Amount
                    </label>

                    <div
                        className={`flex items-center rounded-md border bg-light-blue transition ${errors.amount
                            ? "border-primary-blue"
                            : "border-light-azure focus-within:border-primary-blue"
                            }`}
                    >
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center text-dark-gray">
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
                            className="w-full bg-transparent px-2 py-3 text-xs md:text-sm text-dark-blue outline-none placeholder:text-dark-gray placeholder:text-xs"
                        />

                        <span className="mr-4 text-xs font-medium text-dark-gray">
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
                    <label className="mb-1.5 block text-sm font-medium text-dark-blue">
                        Transaction ID
                    </label>

                    <div
                        className={`flex items-center rounded-md border bg-light-blue transition ${errors.transactionId
                            ? "border-primary-blue"
                            : "border-light-azure focus-within:border-primary-blue"
                            }`}
                    >
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center text-dark-gray">
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
                            className="w-full bg-transparent px-2 py-3 text-xs md:text-sm text-dark-blue outline-none placeholder:text-dark-gray placeholder:text-xs"
                        />
                    </div>

                    {errors.transactionId && (
                        <p className="mt-1.5 text-xs font-medium text-red-500">
                            {errors.transactionId}
                        </p>
                    )}

                    <p className="mt-1.5 text-[11px] text-dark-gray">
                        Enter the transaction ID shown in your
                        payment confirmation.
                    </p>
                </div>
            </div>

            {/* Notice */}
            {/* <div className="mt-4 flex items-start gap-3 rounded-md border border-light-azure bg-light-blue p-4">
                <div className="mt-0.5 shrink-0 text-primary-blue">
                    <AlertCircle size={17} />
                </div>

                <div>
                    <p className="text-[13px] font-medium text-dark-blue">
                        Before submitting
                    </p>

                    <p className="text-[12px] leading-5 text-dark-gray">
                        Make sure the amount and transaction ID
                        match your actual payment. Incorrect
                        information may delay verification.
                    </p>
                </div>
            </div> */}

            {/* Button */}
            <button
                type="button"
                onClick={onVerify}
                disabled={loading}
                className={`mt-5 flex w-full items-center justify-center gap-2 rounded-md px-5 py-3.5 text-[13px] md:text-sm font-medium transition ${loading
                    ? "cursor-not-allowed light-blue text-dark-gray"
                    : "bg-primary-blue text-light-blue shadow-sm hover:bg-primary-blue/90 cursor-pointer active:scale-[0.99]"
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
            <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-dark-gray">
                {/* <ShieldCheck size={13} /> */}

                <span>
                    Your payment will be reviewed before funds
                    are added.
                </span>
            </div>
        </section>
    );
};

export default VerifyPayment;