import {
    ClipboardList,
    Grid2x2,
    Grid2X2Check,
    Layers3,
    Layers3Icon,
    Link2Icon,
    LinkIcon,
    ShoppingCart,
} from "lucide-react";

import SummaryRow from "../ui/SummaryRow";

function Summary({
    category,
    platform,
    selectedService,
    link,
    quantity,
    totalPrice,
    isPlacingOrder,
    onPlaceOrder,
}) {
    const categoryLabel =
        category === "cheap"
            ? "Cheap Service"
            : category === "refill"
                ? "Refill Service"
                : category === "refund"
                    ? "Refund Service"
                    : "—";

    const platformLabel = platform
        ? platform.charAt(0).toUpperCase() + platform.slice(1)
        : "—";

    const isValid =
        selectedService &&
        link.trim() &&
        quantity &&
        Number(quantity) >= selectedService.min &&
        Number(quantity) <= selectedService.max;

    return (
        <aside className="top-0 h-full border-l border-r border-[#dfe2e5] bg-white">

            {/* HEADER */}

            <div className="border-b border-[#e5e7eb] px-4 py-5">

                <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-md border border-[#b8b8ff] bg-[#f5f5ff] text-[#6366f1]">
                        <ClipboardList size={19} />
                    </div>

                    <div>

                        <h2 className="text-[16px] font-medium text-[#252525]">
                            Order Summary
                        </h2>

                        <p className="text-xs text-[#777b80]">
                            Review your order before placing
                        </p>

                    </div>

                </div>

            </div>


            {/* SUMMARY */}

            <div className="px-4 py-2">

                <SummaryRow
                    icon={<Grid2x2 size={15} />}
                    label="Category"
                    value={categoryLabel}
                />


                <SummaryRow
                    icon={<LinkIcon size={15} />}
                    label="Platform"
                    value={platformLabel}
                />


                <SummaryRow
                    icon={<Layers3 size={15} />}
                    label="Service"
                    value={
                        selectedService
                            ? selectedService.name
                            : "—"
                    }
                />


                <SummaryRow
                    icon={<Link2Icon size={15} />}
                    label="Link"
                    value={
                        link
                            ? link
                            : "—"
                    }
                />


                <SummaryRow
                    icon={<Grid2X2Check size={15} />}
                    label="Quantity"
                    value={
                        quantity
                            ? Number(quantity).toLocaleString()
                            : "—"
                    }
                />


                <SummaryRow
                    icon={<Layers3Icon size={15} />}
                    label="Charge per 1000"
                    value={
                        selectedService
                            ? `PKR ${selectedService.rate}`
                            : "—"
                    }
                    last
                />


                {/* TOTAL */}

                <div className="my-4 border-t border-dashed border-[#d6d9dc] pt-4">

                    <div className="flex items-center justify-between">

                        <span className="text-[16px] font-semibold text-[#252525]">
                            Total Charge
                        </span>

                        <span className="text-[18px] font-semibold text-[#fa6c0a]">
                            PKR {totalPrice.toFixed(2)}
                        </span>

                    </div>

                </div>


                {/* PLACE ORDER */}

                <button
                    disabled={!isValid || isPlacingOrder}
                    onClick={onPlaceOrder}
                    className="flex h-11 w-full items-center justify-center gap-2 rounded-md bg-[#fa6c0a] text-sm font-semibold text-white transition hover:bg-[#e96100] disabled:cursor-not-allowed disabled:opacity-40"
                >
                    {isPlacingOrder ? (
                        <>
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                            Placing Order...
                        </>
                    ) : (
                        <>
                            <ShoppingCart size={17} />
                            Place Order
                        </>
                    )}
                </button>


                <p className="mt-3 text-center text-[11px] leading-4 text-[#85898d]">

                    By placing this order you agree to our{" "}

                    <span className="text-[#3867e8]">
                        Terms & Conditions
                    </span>

                </p>

            </div>

        </aside>
    );
}

export default Summary;