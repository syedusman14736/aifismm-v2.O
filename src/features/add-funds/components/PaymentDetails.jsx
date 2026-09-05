import {
    Banknote,
    Building2,
    Copy,
    CreditCard,
    Smartphone,
    User,
} from "lucide-react";
import { useState } from "react";

const PAYMENT_ACCOUNTS = {
    easypaisa: {
        method: "Easypaisa",
        accountName: "AiFi Solutions Hub",
        mobileNumber: "03001234567",
    },

    jazzcash: {
        method: "JazzCash",
        accountName: "AiFi Solutions Hub",
        mobileNumber: "03001234567",
    },

    bank: {
        method: "Bank Transfer",
        bankName: "Meezan Bank",
        accountName: "AiFi Solutions Hub",
        accountNumber: "01234567890123",
        iban: "PK00MEZN0000001234567890",
    },
};

const DetailRow = ({
    icon: Icon,
    label,
    value,
    copyable = false,
}) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        if (!value) return;

        try {
            await navigator.clipboard.writeText(value);

            setCopied(true);

            setTimeout(() => {
                setCopied(false);
            }, 1500);
        } catch (error) {
            console.error("Copy failed:", error);
        }
    };

    return (
        <div className="flex items-center justify-between gap-4 border-b border-[#dfe2e5] px-4 py-3.5 last:border-0">
            <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[#fff4eb] text-[#fa6c0a]">
                    <Icon size={16} strokeWidth={1.8} />
                </div>

                <span className="text-sm font-medium text-[#777b80]">
                    {label}
                </span>
            </div>

            <div className="flex min-w-0 items-center gap-2">
                <span className="max-w-[230px] break-all text-right text-sm font-medium text-[#252525]">
                    {value || "-"}
                </span>

                {copyable && value && (
                    <button
                        type="button"
                        onClick={handleCopy}
                        className="cursor-pointer flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-[#8a93a5] transition hover:bg-[#fff4eb] hover:text-[#fa6c0a]"
                        title="Copy"
                    >
                        {copied ? (
                            <span className="text-[10px] font-medium text-green-600">
                                ✓
                            </span>
                        ) : (
                            <Copy size={13} />
                        )}
                    </button>
                )}
            </div>
        </div>
    );
};

const PaymentDetails = ({ selectedMethod }) => {
    const account =
        PAYMENT_ACCOUNTS[selectedMethod] ||
        PAYMENT_ACCOUNTS.easypaisa;

    const isBank = selectedMethod === "bank";

    return (
        <section className="rounded-md border border-[#e5e7eb] bg-white p-5">
            {/* Header */}
            <div className="mb-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#fff4eb] text-[#fa6c0a]">
                        {isBank ? (
                            <Building2 size={20} />
                        ) : (
                            <Smartphone size={20} />
                        )}
                    </div>

                    <div>
                        <h2 className="text-[16px] font-medium text-[#252525]">
                            Payment Details
                        </h2>

                        <p className="text-xs text-[#777b80]">
                            Send your payment to the account below
                        </p>
                    </div>
                </div>

                <span className="rounded-full bg-[#fff4eb] px-3 py-1.5 text-[10px] font-medium text-[#fa6c0a]">
                    {account.method}
                </span>
            </div>

            {/* Important Notice */}
            <div className="mb-4 rounded-md border border-[#ffe3cf] bg-[#fffaf6] px-4 py-3">
                <p className="text-xs leading-5 text-[#8a5a32]">
                    Please transfer the amount to the account
                    below. After completing the payment, enter
                    your exact amount and transaction ID in the
                    verification section.
                </p>
            </div>

            {/* Account Details */}
            <div className="overflow-hidden rounded-md border border-[#e5e7eb]">
                {isBank ? (
                    <>
                        <DetailRow
                            icon={Building2}
                            label="Bank Name"
                            value={account.bankName}
                        />

                        <DetailRow
                            icon={User}
                            label="Account Title"
                            value={account.accountName}
                        />

                        <DetailRow
                            icon={CreditCard}
                            label="Account Number"
                            value={account.accountNumber}
                            copyable
                        />

                        <DetailRow
                            icon={Banknote}
                            label="IBAN"
                            value={account.iban}
                            copyable
                        />
                    </>
                ) : (
                    <>
                        <DetailRow
                            icon={User}
                            label="Account Name"
                            value={account.accountName}
                        />

                        <DetailRow
                            icon={Smartphone}
                            label="Mobile Number"
                            value={account.mobileNumber}
                            copyable
                        />
                    </>
                )}
            </div>

            {/* Payment Instruction */}
            <div className="mt-4 flex items-center gap-2 text-xs text-[#777b80]">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#eefbf4] text-[10px] font-medium text-[#16a34a]">
                    ✓
                </span>

                <span>
                    Make sure the payment is sent to the details
                    shown above.
                </span>
            </div>
        </section>
    );
};

export default PaymentDetails;