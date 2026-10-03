import {
    Banknote,
    Building2,
    Copy,
    CreditCard,
    Smartphone,
    User,
} from "lucide-react";

import { useState } from "react";

const DetailRow = ({
    icon: Icon,
    label,
    value,
    copyable = false,
}) => {
    const [copied, setCopied] =
        useState(false);

    const handleCopy = async () => {
        if (!value) return;

        try {
            await navigator.clipboard.writeText(
                String(value)
            );

            setCopied(true);

            setTimeout(() => {
                setCopied(false);
            }, 1500);
        } catch (error) {
            console.error(
                "Copy failed:",
                error
            );
        }
    };

    return (
        <div className="flex items-center justify-between gap-1 border-b border-light-azure px-3.5 py-3.5 last:border-0">
            <div className="flex min-w-0 items-center">
                {/* <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-light-blue text-primary-blue">
                    <Icon size={16} strokeWidth={1.8} />
                </div> */}

                <span className="text-xs md:text-sm text-dark-blue">
                    {label}
                </span>
            </div>

            <div className="flex min-w-0 items-center gap-0.5">
                <span className="max-w-[230px] break-all text-right text-xs md:text-sm text-dark-blue">
                    {value || "-"}
                </span>

                {copyable &&
                    value && (
                        <button
                            type="button"
                            onClick={
                                handleCopy
                            }
                            className="cursor-pointer flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-dark-gray transition hover:bg-primary-blue/1 hover:text-primary-blue"
                            title="Copy"
                        >
                            {copied ? (
                                <span className="text-[14px] font-medium text-green-600">
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

const PaymentDetails = ({
    selectedMethod,
}) => {
    const [copiedInstruction, setCopiedInstruction] =
        useState(false);

    const account =
        selectedMethod ||
        null;

    const isBank =
        account?.type ===
        "bank";

    const handleCopyInstructions =
        async () => {
            if (
                !account?.instructions
            ) {
                return;
            }

            try {
                await navigator.clipboard.writeText(
                    account.instructions
                );

                setCopiedInstruction(
                    true
                );

                setTimeout(() => {
                    setCopiedInstruction(
                        false
                    );
                }, 1500);
            } catch (error) {
                console.error(
                    "Copy failed:",
                    error
                );
            }
        };

    if (!account) {
        return (
            <section className="rounded-md border border-light-azure bg-light-blue p-5">
                <div className="mb-4 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <div>
                            <h2 className="text-[16px] font-medium text-dark-blue">
                                Payment Details
                            </h2>

                            <p className="text-xs text-dark-gray">
                                Select a payment method to view payment details
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="rounded-md border border-light-azure bg-light-blue p-5">
            {/* Header */}
            <div className="mb-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                    <div>
                        <h2 className="text-[16px] font-medium text-dark-blue">
                            Payment Details
                        </h2>

                        <p className="text-xs text-dark-gray">
                            Send your payment to the account below
                        </p>
                    </div>
                </div>

                <span className="rounded-full bg-light-blue px-3 py-1.5 text-[10px] border border-light-azure font-medium text-primary-blue">
                    {account.name}
                </span>
            </div>

            {/* Important Notice */}
            <div className="mb-4 rounded-md border border-light-azure bg-light-blue px-4 py-3">
                <p className="text-xs leading-5 text-gray">
                    Please transfer the amount to the account
                    below. After completing the payment, enter
                    your exact amount and transaction ID in the
                    verification section.
                </p>
            </div>

            {/* Account Details */}
            <div className="overflow-hidden rounded-md border border-light-azure">
                {isBank ? (
                    <>
                        <DetailRow
                            icon={Building2}
                            label="Bank Name"
                            value={
                                account.bankName
                            }
                        />

                        <DetailRow
                            icon={User}
                            label="Account Title"
                            value={
                                account.accountTitle
                            }
                        />

                        <DetailRow
                            icon={CreditCard}
                            label="Account Number"
                            value={
                                account.accountNumber
                            }
                            copyable
                        />

                        <DetailRow
                            icon={Banknote}
                            label="IBAN"
                            value={
                                account.iban
                            }
                            copyable
                        />
                    </>
                ) : (
                    <>
                        <DetailRow
                            icon={User}
                            label="Account Name"
                            value={
                                account.accountTitle
                            }
                        />

                        <DetailRow
                            icon={Smartphone}
                            label="Mobile Number"
                            value={
                                account.accountNumber
                            }
                            copyable
                        />
                    </>
                )}
            </div>

            {/* Payment Instruction */}
            {account.instructions && (
                <div className="mt-4 flex items-start gap-1 text-[11px] text-dark-gray">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-light-blue text-[12px] font-medium text-[#16a34a]">
                        ✓
                    </span>

                    <span className="flex-1">
                        {account.instructions}
                    </span>

                    <button
                        type="button"
                        onClick={
                            handleCopyInstructions
                        }
                        className="cursor-pointer shrink-0 text-primary-blue"
                        title="Copy instructions"
                    >
                        {copiedInstruction
                            ? "Copied"
                            : "Copy"}
                    </button>
                </div>
            )}
        </section>
    );
};

export default PaymentDetails;