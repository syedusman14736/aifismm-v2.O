import {
    User,
    Bell,
    Slash,
    Coins,
    ChevronDown,
    Check,
} from "lucide-react";

import { useState } from "react";

import { useCurrency } from "../../context/CurrencyContext";
import { Link } from "react-router-dom";

function Topbar() {
    const CurrencySelector = () => {
        const {
            currency,
            currencies,
            changeCurrency,
            changing,
        } = useCurrency();

        const [open, setOpen] = useState(false);

        const handleCurrencyChange = async (
            code
        ) => {
            if (
                changing ||
                code === currency?.code
            ) {
                setOpen(false);
                return;
            }

            const result =
                await changeCurrency(code);

            if (result.success) {
                setOpen(false);
            }
        };

        return (
            <div className="relative">
                {/* Currency Button */}
                <button
                    type="button"
                    onClick={() =>
                        setOpen((prev) => !prev)
                    }
                    disabled={changing}
                    className="flex items-center gap-1.5 text-dark-gray p-1.5 rounded-md cursor-pointer"
                >
                    <Coins
                        size={19}
                        strokeWidth={1.8}
                    />

                    <span className="text-[13px] font-medium">
                        {currency?.code || "PKR"}
                    </span>

                    <ChevronDown
                        size={14}
                        strokeWidth={1.8}
                        className={
                            open
                                ? "rotate-180 transition-transform"
                                : "transition-transform"
                        }
                    />
                </button>

                {/* Dropdown */}
                {open && (
                    <>
                        {/* Outside click layer */}
                        <button
                            type="button"
                            aria-label="Close currency menu"
                            onClick={() =>
                                setOpen(false)
                            }
                            className="fixed inset-0 z-40 cursor-default"
                        />

                        <div className="absolute right-0 top-full z-50 mt-2 w-52 rounded-xl border border-light-azure bg-white p-1.5 shadow-lg">
                            <div className="px-2.5 py-2">
                                <p className="text-[11px] font-medium uppercase tracking-wide text-dark-gray">
                                    Currency
                                </p>
                            </div>

                            {currencies.map(
                                (item) => {
                                    const selected =
                                        item.code ===
                                        currency?.code;

                                    return (
                                        <button
                                            key={
                                                item.code
                                            }
                                            type="button"
                                            disabled={
                                                changing
                                            }
                                            onClick={() =>
                                                handleCurrencyChange(
                                                    item.code
                                                )
                                            }
                                            className={`flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-left transition-colors ${selected
                                                ? "bg-light-blue text-primary-blue"
                                                : "text-dark-gray hover:bg-light-blue"
                                                }`}
                                        >
                                            <div className="flex items-center gap-2.5">
                                                <span className="text-[12px] font-semibold">
                                                    {
                                                        item.code
                                                    }
                                                </span>

                                                <span className="text-[12px]">
                                                    {
                                                        item.symbol
                                                    }
                                                </span>

                                                <span className="text-[12px]">
                                                    {
                                                        item.name
                                                    }
                                                </span>
                                            </div>

                                            {selected && (
                                                <Check
                                                    size={
                                                        15
                                                    }
                                                    strokeWidth={
                                                        2
                                                    }
                                                />
                                            )}
                                        </button>
                                    );
                                }
                            )}
                        </div>
                    </>
                )}
            </div>
        );
    };

    return (
        <header className="bg-light-blue px-3 sm:px-4 py-2 sm:py-3 border-b border-light-azure flex justify-between items-center shrink-0">

            {/* Breadcrumb */}
            <div className="flex gap-1 items-center justify-center min-w-0">

                <h1 className="text-dark-blue font-medium text-[14px] md:text-[16px] whitespace-nowrap">
                    AiFi SMM
                </h1>

                {/* <span className="text-dark-gray shrink-0">
                    /
                </span>

                <h1 className="text-primary-blue font-medium text-[14px] md:text-[16px] whitespace-nowrap">
                    Dashboard
                </h1> */}

            </div>

            {/* Actions */}
            <div className="flex shrink-0">

                <ul className="flex items-center justify-center gap-2">

                    {/* Currency */}
                    <li>
                        <CurrencySelector />
                    </li>

                    {/* Notification */}
                    {/* 
                    <li className="text-[#57595a] p-1.5 rounded-md cursor-pointer">
                        <Bell
                            size={19}
                            strokeWidth={1.8}
                        />
                    </li>
                    */}

                    {/* User */}
                    <Link to="/dashboard/profile" className="text-light-blue bg-dark-blue p-1.5 rounded-full cursor-pointer">
                        <User
                            size={19}
                            strokeWidth={1.8}
                        />
                    </Link>

                </ul>

            </div>

        </header>
    );
}

export default Topbar;