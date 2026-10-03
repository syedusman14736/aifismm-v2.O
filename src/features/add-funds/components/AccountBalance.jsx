import {
    Wallet,
    ArrowDownToLine,
    CircleDollarSign,
} from "lucide-react";

const AccountBalance = ({
    balance = 0,
    currency = "PKR",
    minimumAmount = 100,
}) => {
    const formattedBalance = Number(balance).toLocaleString();

    return (
        <div className="min-w-0 overflow-hidden rounded-md border border-[#e5e7eb] bg-white">
            {/* Header */}
            <div className="flex min-w-0 items-center gap-3 border-b border-[#e5e7eb] px-4 py-4 sm:px-5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#fff3e8] text-[#fa6c0a]">
                    <Wallet size={18} />
                </div>

                <div className="min-w-0">
                    <h2 className="text-sm font-medium text-[#252525]">
                        Account Balance
                    </h2>

                    <p className="break-words text-xs leading-5 text-[#8a93a5]">
                        Your available account balance
                    </p>
                </div>
            </div>

            {/* Balance */}
            <div className="min-w-0 px-4 py-4 sm:px-5">
                <p className="text-xs text-[#8a93a5]">
                    Available Balance
                </p>

                <div className="mt-1 flex min-w-0 items-baseline gap-2">
                    <span className="shrink-0 text-2xl font-bold tracking-tight text-[#262626]">
                        {currency}
                    </span>

                    <span className="min-w-0 break-words text-2xl font-bold tracking-tight text-[#fa6c0a]">
                        {formattedBalance}
                    </span>
                </div>

                {/* Info */}
                <div className="mt-4 rounded-md bg-[#f8f9fb] px-3 py-3">
                    <div className="flex min-w-0 items-center gap-2">
                        <ArrowDownToLine
                            size={15}
                            className="shrink-0 text-[#7b8497]"
                        />

                        <p className="mt-0 break-words text-[11px] font-medium text-[#8a93a5]">
                            Min. Deposit
                        </p>
                    </div>

                    <p className="mt-1 break-words text-sm font-bold text-[#252525]">
                        {currency} {minimumAmount}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AccountBalance;