import {
    ShoppingCart,
    CheckCircle2,
} from "lucide-react";

import { useEffect, useRef, useState } from "react";

import Sidebar from "../../components/layout/Sidebar";
import Topbar from "../../components/layout/Topbar";
import MobileNavigation from "../../components/layout/MobileNavigation";
import Summary from "../../components/layout/Summary";

import Categories from "./components/steps/Categories";
import Services from "./components/steps/Services";
import Details from "./components/steps/Details";

import useNewOrder from "./hooks/useNewOrder";

function NewOrder() {
    const {
        category,
        serviceId,
        link,
        quantity,
        comments,
        isCustomComments,

        availableCategories,
        availableServices,
        selectedService,
        totalPrice,

        isLoadingServices,
        isPlacingOrder,

        selectCategory,
        selectService,
        setLink,
        setQuantity,
        setComments,

        resetOrder,
        placeOrder,
    } = useNewOrder();

    const [
        showSuccess,
        setShowSuccess,
    ] = useState(false);

    const [
        orderResult,
        setOrderResult,
    ] = useState(null);

    const [
        error,
        setError,
    ] = useState("");

    const errorRef = useRef(null);

    // ==========================================
    // SCROLL TO ERROR
    // ==========================================

    useEffect(() => {
        if (error && errorRef.current) {
            errorRef.current.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
        }
    }, [error]);

    // ==========================================
    // PLACE ORDER
    // ==========================================

    const handlePlaceOrder = async () => {
        setError("");

        const result =
            await placeOrder();

        if (!result?.success) {
            setError(
                result?.message ||
                "Unable to place order."
            );

            return;
        }

        setOrderResult(
            result.order
        );

        resetOrder();

        setShowSuccess(true);
    };

    // ==========================================
    // CLOSE SUCCESS MODAL
    // ==========================================

    const handleCloseSuccess = () => {
        setShowSuccess(false);
        setOrderResult(null);
        setError("");
    };

    return (
        <>
            {/* =====================================================
                PAGE
            ====================================================== */}

            <div
                className="
                    flex
                    h-svh
                    w-full
                    overflow-hidden
                    bg-bg
                "
            >
                {/* =================================================
                    DESKTOP SIDEBAR
                ================================================== */}

                <div
                    className="
                        hidden
                        shrink-0
                        md:block
                    "
                >
                    <Sidebar />
                </div>

                {/* =================================================
                    MAIN APP AREA
                ================================================== */}

                <div
                    className="
                        flex
                        h-full
                        min-h-0
                        min-w-0
                        flex-1
                        flex-col
                    "
                >
                    {/* =================================================
                        TOPBAR
                    ================================================== */}

                    <Topbar />

                    {/* =================================================
                        MAIN SCROLL AREA
                    ================================================== */}

                    <main
                        className="
                            min-h-0
                            min-w-0
                            flex-1
                            overflow-y-auto
                            hide-scrollbar
                            px-3
                            pb-16
                            sm:px-4
                            md:pb-3
                        "
                    >
                        {/* =================================================
                            ORDER LAYOUT
                        ================================================== */}

                        <div
                            className="
                                grid
                                min-w-0
                                grid-cols-1
                                gap-3
                                lg:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)]
                            "
                        >
                            {/* =================================================
                                LEFT SIDE
                            ================================================== */}

                            <section
                                className="
                                    min-w-0
                                "
                            >
                                {/* =================================================
                                    HEADER
                                ================================================== */}

                                <div
                                    className="
                                        border-light-azure
                                        pt-4
                                        pb-1
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
                                        {/* ICON */}

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
                                            <ShoppingCart
                                                size={19}
                                            />
                                        </div>

                                        {/* HEADING */}

                                        <div
                                            className="
                                                min-w-0
                                            "
                                        >
                                            <h2
                                                className="
                                                    truncate
                                                    text-[16px]
                                                    font-medium
                                                    text-[#252525]
                                                "
                                            >
                                                Create New Order
                                            </h2>

                                            <p
                                                className="
                                                    truncate
                                                    text-[10px]
                                                    text-dark-gray
                                                    sm:text-xs
                                                "
                                            >
                                                Choose your service and place your order
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* =================================================
                                    ERROR
                                ================================================== */}

                                {error && (
                                    <div
                                        ref={errorRef}
                                        className="
                                            mt-3
                                            rounded-md
                                            border
                                            border-red-200
                                            bg-red-50
                                            px-3
                                            py-2.5
                                            text-xs
                                            text-red-600
                                        "
                                    >
                                        {error}
                                    </div>
                                )}

                                {/* =================================================
                                    ORDER FORM
                                ================================================== */}

                                <div
                                    className="
                                        mt-4
                                        min-w-0
                                    "
                                >
                                    {/* =================================================
                                        CATEGORY
                                    ================================================== */}

                                    <div
                                        className="
                                            mt-4
                                            mb-2
                                            min-w-0
                                        "
                                    >
                                        <Categories
                                            availableCategories={
                                                availableCategories
                                            }
                                            selectedCategory={
                                                category
                                            }
                                            onSelectCategory={
                                                selectCategory
                                            }
                                            isLoading={
                                                isLoadingServices
                                            }
                                        />
                                    </div>

                                    {/* =================================================
                                        SERVICE
                                    ================================================== */}

                                    <div
                                        className="
                                            min-w-0
                                        "
                                    >
                                        <Services
                                            availableServices={
                                                availableServices
                                            }
                                            selectedServiceId={
                                                serviceId
                                            }
                                            selectedService={
                                                selectedService
                                            }
                                            onSelectService={
                                                selectService
                                            }
                                        />
                                    </div>

                                    {/* =================================================
                                        DETAILS
                                    ================================================== */}

                                    <div
                                        className="
                                            mt-2
                                            min-w-0
                                        "
                                    >
                                        <Details
                                            link={link}
                                            quantity={
                                                quantity
                                            }
                                            comments={
                                                comments
                                            }
                                            onLinkChange={
                                                setLink
                                            }
                                            onQuantityChange={
                                                setQuantity
                                            }
                                            onCommentsChange={
                                                setComments
                                            }
                                            selectedService={
                                                selectedService
                                            }
                                            isCustomComments={
                                                isCustomComments
                                            }
                                        />
                                    </div>
                                </div>
                            </section>

                            {/* =================================================
                                RIGHT SIDE / SUMMARY
                            ================================================== */}

                            <aside
                                className="
                                    min-w-0
                                    lg:sticky
                                    lg:top-0
                                    lg:self-start
                                    mt-4
                                "
                            >
                                <Summary
                                    category={
                                        category
                                    }
                                    selectedService={
                                        selectedService
                                    }
                                    link={link}
                                    quantity={
                                        quantity
                                    }
                                    totalPrice={
                                        totalPrice
                                    }
                                    isPlacingOrder={
                                        isPlacingOrder
                                    }
                                    onPlaceOrder={
                                        handlePlaceOrder
                                    }
                                />
                            </aside>
                        </div>
                    </main>
                </div>

                {/* =================================================
                    MOBILE NAVIGATION
                ================================================== */}

                <MobileNavigation />
            </div>

            {/* =====================================================
                SUCCESS MODAL
            ====================================================== */}

            {showSuccess && (
                <div
                    className="
                        fixed
                        inset-0
                        z-50
                        flex
                        items-center
                        justify-center
                        bg-black/40
                        px-3
                        py-4
                        sm:px-4
                    "
                >
                    <div
                        className="
                            max-h-[90vh]
                            w-full
                            max-w-md
                            overflow-y-auto
                            rounded-lg
                            bg-white
                            p-4
                            shadow-xl
                            sm:p-6
                        "
                    >
                        {/* ==========================================
                            SUCCESS ICON
                        =========================================== */}

                        <div
                            className="
                                mx-auto
                                flex
                                h-11
                                w-11
                                items-center
                                justify-center
                                rounded-full
                                bg-[#f0fff5]
                                text-[#21a366]
                                sm:h-12
                                sm:w-12
                            "
                        >
                            <CheckCircle2
                                className="
                                    h-6
                                    w-6
                                    sm:h-7
                                    sm:w-7
                                "
                                strokeWidth={1.8}
                            />
                        </div>

                        {/* ==========================================
                            TITLE
                        =========================================== */}

                        <h2
                            className="
                                mt-3
                                text-center
                                text-base
                                font-semibold
                                text-[#252525]
                                sm:mt-4
                                sm:text-lg
                            "
                        >
                            Order Placed Successfully
                        </h2>

                        {/* ==========================================
                            MESSAGE
                        =========================================== */}

                        <p
                            className="
                                mt-1
                                text-center
                                text-xs
                                text-dark-gray
                                sm:text-sm
                            "
                        >
                            Your order has been submitted successfully.
                        </p>

                        {/* ==========================================
                            ORDER RESULT
                        =========================================== */}

                        {orderResult && (
                            <div
                                className="
                                    mt-4
                                    rounded-md
                                    border
                                    border-light-azure
                                    bg-light-blue
                                    p-3
                                    sm:mt-5
                                    sm:p-4
                                "
                            >
                                {/* SERVICE */}

                                <div
                                    className="
                                        flex
                                        items-start
                                        justify-between
                                        gap-4
                                        text-xs
                                        sm:text-sm
                                    "
                                >
                                    <span
                                        className="
                                            shrink-0
                                            text-dark-gray
                                        "
                                    >
                                        Service
                                    </span>

                                    <span
                                        className="
                                            min-w-0
                                            break-words
                                            text-right
                                            font-medium
                                            text-primary-blue
                                        "
                                    >
                                        {
                                            orderResult.serviceName
                                        }
                                    </span>
                                </div>

                                {/* QUANTITY */}

                                <div
                                    className="
                                        mt-2
                                        flex
                                        items-center
                                        justify-between
                                        gap-4
                                        text-xs
                                        sm:text-sm
                                    "
                                >
                                    <span
                                        className="
                                            text-dark-gray
                                        "
                                    >
                                        Quantity
                                    </span>

                                    <span
                                        className="
                                            font-medium
                                            text-[#252525]
                                        "
                                    >
                                        {Number(
                                            orderResult.quantity ||
                                            0
                                        ).toLocaleString()}
                                    </span>
                                </div>

                                {/* CHARGE */}

                                <div
                                    className="
                                        mt-2
                                        flex
                                        items-center
                                        justify-between
                                        gap-4
                                        text-xs
                                        sm:text-sm
                                    "
                                >
                                    <span
                                        className="
                                            text-dark-gray
                                        "
                                    >
                                        Charge
                                    </span>

                                    <span
                                        className="
                                            font-semibold
                                            text-primary-blue
                                        "
                                    >
                                        PKR{" "}
                                        {Number(
                                            orderResult.charge ??
                                            orderResult.total ??
                                            0
                                        ).toFixed(2)}
                                    </span>
                                </div>
                            </div>
                        )}

                        {/* ==========================================
                            DONE BUTTON
                        =========================================== */}

                        <button
                            type="button"
                            onClick={
                                handleCloseSuccess
                            }
                            className="
                                mt-4
                                h-10
                                w-full
                                cursor-pointer
                                rounded-md
                                bg-primary-blue
                                text-xs
                                font-medium
                                text-white
                                outline-none
                                transition-colors
                                hover:bg-primary-blue/90
                                focus:outline-none
                                sm:mt-5
                                sm:h-11
                                sm:text-sm
                            "
                        >
                            Done
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

export default NewOrder;