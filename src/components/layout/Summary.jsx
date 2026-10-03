import {
    ClipboardList,
    Grid2x2,
    Grid2X2Check,
    Layers3,
    Layers3Icon,
    Link2Icon,
    ShoppingCart,
} from "lucide-react";

import SummaryRow from "../ui/SummaryRow";

import { useCurrency } from "../../context/CurrencyContext";

function Summary({
    category,
    selectedService,
    link,
    quantity,
    totalPrice,
    isPlacingOrder,
    onPlaceOrder,
}) {
    const {
        formatCurrency,
    } = useCurrency();

    // ==========================================
    // CATEGORY LABEL
    // ==========================================

    const categoryLabel =
        category?.category?.name || "—";

    // ==========================================
    // CUSTOM COMMENTS
    // ==========================================

    const isCustomComments =
        selectedService?.customComments === true;

    // ==========================================
    // PRICE FORMAT
    // ==========================================

    const formatPrice = (value) => {
        const number = Number(value);

        if (!Number.isFinite(number)) {
            return "0";
        }

        return number
            .toFixed(6)
            .replace(/\.?0+$/, "");
    };

    // ==========================================
    // COMMENTS COUNT
    // ==========================================

    const commentsCount =
        isCustomComments
            ? Number(quantity) || 0
            : 0;

    // ==========================================
    // ORDER VALIDATION
    // ==========================================

    const numericQuantity =
        Number(quantity);

    const minQuantity =
        Number(selectedService?.min) || 0;

    const maxQuantity =
        Number(selectedService?.max) || 0;

    const hasValidQuantity =
        Number.isFinite(numericQuantity) &&
        numericQuantity >= minQuantity &&
        numericQuantity <= maxQuantity;

    const isValid =
        Boolean(selectedService) &&
        Boolean(link?.trim()) &&
        hasValidQuantity;

    // ==========================================
    // CURRENCY DISPLAY
    // ==========================================

    const formattedRate =
        selectedService
            ? formatCurrency(
                Number(
                    selectedService.rate
                )
            )
            : "—";

    const formattedTotal =
        formatCurrency(
            Number(totalPrice || 0)
        );

    // ==========================================
    // QUANTITY / COMMENTS DISPLAY
    // ==========================================

    const quantityLabel =
        isCustomComments
            ? "Comments"
            : "Quantity";

    const quantityValue =
        quantity
            ? Number(quantity).toLocaleString()
            : "—";

    return (
        <aside
            className="
                rounded-md
                min-w-0
                overflow-hidden
                border
                border-light-azure
                bg-light-blue
                lg:sticky
                lg:top-0
                lg:max-h-[calc(100vh-16px)]
                lg:overflow-y-auto
                hide-scrollbar
            "
        >
            {/* =========================================
                HEADER
            ========================================== */}

            <div
                className="
                    border-b
                    border-light-azure
                    px-3
                    py-4
                    sm:px-4
                    sm:py-5
                "
            >
                <div
                    className="
                        flex
                        min-w-0
                        items-center
                        gap-2.5
                        sm:gap-3
                    "
                >
                    <div
                        className="
                            flex
                            h-9
                            w-9
                            shrink-0
                            items-center
                            justify-center
                            rounded-md
                            border
                            border-light-azure
                            bg-light-blue
                            text-dark-blue
                            sm:h-10
                            sm:w-10
                        "
                    >
                        <ClipboardList
                            size={19}
                            className="
                                sm:h-[19px]
                                sm:w-[19px]
                            "
                        />
                    </div>

                    <div className="min-w-0">
                        <h2
                            className="
                                truncate
                                text-[15px]
                                font-medium
                                text-dark-blue
                                sm:text-[16px]
                            "
                        >
                            Order Summary
                        </h2>

                        <p
                            className="
                                truncate
                                text-[10px]
                                text-dark-gray
                                sm:text-xs
                            "
                        >
                            Review your order before
                            placing
                        </p>
                    </div>
                </div>
            </div>

            {/* =========================================
                SUMMARY
            ========================================== */}

            <div
                className="
                    min-w-0
                    px-3
                    py-2
                    sm:px-4
                "
            >
                {/* CATEGORY */}

                <SummaryRow
                    icon={
                        <Grid2x2 size={19} />
                    }
                    label="Category"
                    value={categoryLabel}
                />

                {/* SERVICE */}

                <SummaryRow
                    icon={
                        <Layers3 size={19} />
                    }
                    label="Service"
                    value={
                        selectedService
                            ? selectedService.name
                            : "—"
                    }
                />

                {/* LINK */}

                <SummaryRow
                    icon={
                        <Link2Icon size={19} />
                    }
                    label="Link"
                    value={
                        link
                            ? link
                            : "—"
                    }
                />

                {/* QUANTITY / COMMENTS */}

                <SummaryRow
                    icon={
                        <Grid2X2Check
                            size={19}
                        />
                    }
                    label={quantityLabel}
                    value={quantityValue}
                />

                {/* RATE */}

                <SummaryRow
                    icon={
                        <Layers3Icon
                            size={19}
                        />
                    }
                    label="Charge per 1000"
                    value={formattedRate}
                    last
                />

                {/* =====================================
                    TOTAL
                ====================================== */}

                <div
                    className="
                        my-3
                        border-t
                        border-dashed
                        border-light-azure
                        pt-3
                        sm:my-4
                        sm:pt-4
                    "
                >
                    <div
                        className="
                            flex
                            items-center
                            justify-between
                            gap-3
                        "
                    >
                        <span
                            className="
                                shrink-0
                                text-sm
                                font-semibold
                                text-dark-blue
                                sm:text-[16px]
                            "
                        >
                            Total Charge
                        </span>

                        <span
                            className="
                                min-w-0
                                text-right
                                text-base
                                font-semibold
                                text-primary-blue
                                sm:text-[18px]
                            "
                        >
                            {formattedTotal}
                        </span>
                    </div>
                </div>

                {/* =====================================
                    PLACE ORDER
                ====================================== */}

                <button
                    type="button"
                    disabled={
                        !isValid ||
                        isPlacingOrder
                    }
                    onClick={
                        onPlaceOrder
                    }
                    className="
                        flex
                        h-10
                        w-full
                        cursor-pointer
                        items-center
                        justify-center
                        gap-2
                        rounded-md
                        bg-primary-blue
                        text-xs
                        font-semibold
                        text-white
                        outline-none
                        transition-colors
                        hover:bg-primary-blue/90
                        focus:outline-none
                        disabled:cursor-not-allowed
                        disabled:opacity-40
                        sm:h-11
                        sm:text-sm
                    "
                >
                    {isPlacingOrder ? (
                        <>
                            <span
                                className="
                                    h-4
                                    w-4
                                    animate-spin
                                    rounded-full
                                    border-2
                                    border-light-azure
                                    border-t-transparent
                                "
                            />

                            <span>
                                Placing Order...
                            </span>
                        </>
                    ) : (
                        <>
                            <ShoppingCart
                                size={19}
                                className="
                                    sm:h-[17px]
                                    sm:w-[17px]
                                "
                            />

                            <span>
                                Place Order
                            </span>
                        </>
                    )}
                </button>

                {/* =====================================
                    TERMS
                ====================================== */}

                <p
                    className="
                        mt-2.5
                        pb-4
                        px-1
                        text-center
                        text-[10px]
                        leading-4
                        text-dark-gray
                        sm:mt-3
                        sm:text-[11px]
                    "
                >
                    By placing this order you agree
                    to our{" "}

                    <span
                        className="
                            cursor-pointer
                            text-primary-blue
                        "
                    >
                        Terms & Conditions
                    </span>
                </p>
            </div>
        </aside>
    );
}

export default Summary;