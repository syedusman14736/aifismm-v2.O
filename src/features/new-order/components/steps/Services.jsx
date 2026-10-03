import {
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";

import { ChevronDown } from "lucide-react";

import { useCurrency } from "../../../../context/CurrencyContext";

function Services({
    availableServices = [],
    selectedServiceId,
    selectedService,
    onSelectService,
}) {
    const [isOpen, setIsOpen] =
        useState(false);

    const dropdownRef =
        useRef(null);

    const {
        formatCurrency,
    } = useCurrency();

    // ==========================================
    // CLOSE DROPDOWN ON OUTSIDE CLICK
    // ==========================================

    useEffect(() => {
        const handleClickOutside = (
            event
        ) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(
                    event.target
                )
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };
    }, []);

    // ==========================================
    // GROUP SERVICES
    // ==========================================

    const groupedServices =
        useMemo(() => {
            const groups = new Map();

            availableServices.forEach(
                (service) => {
                    const name = String(
                        service.name || ""
                    ).trim();

                    if (!name) {
                        return;
                    }

                    const normalizedName =
                        name.toLowerCase();

                    let groupName =
                        "Other Services";

                    if (
                        normalizedName.includes(
                            "follower"
                        )
                    ) {
                        groupName = "Followers";
                    } else if (
                        normalizedName.includes(
                            "like"
                        )
                    ) {
                        groupName = "Likes";
                    } else if (
                        normalizedName.includes(
                            "view"
                        )
                    ) {
                        groupName = "Views";
                    } else if (
                        normalizedName.includes(
                            "comment"
                        )
                    ) {
                        groupName = "Comments";
                    } else if (
                        normalizedName.includes(
                            "share"
                        )
                    ) {
                        groupName = "Shares";
                    } else if (
                        normalizedName.includes(
                            "save"
                        )
                    ) {
                        groupName = "Saves";
                    }

                    if (
                        !groups.has(
                            groupName
                        )
                    ) {
                        groups.set(
                            groupName,
                            []
                        );
                    }

                    groups
                        .get(groupName)
                        .push(service);
                }
            );

            return Array.from(
                groups.entries()
            );
        }, [
            availableServices,
        ]);

    // ==========================================
    // SERVICE TYPE
    // ==========================================
    //
    // This is only used for displaying/removing
    // labels such as Cheap / Refill / Refund.
    //
    // It is NOT used for:
    // - Platform detection
    // - Custom comments detection
    // - Service selection
    //
    // Custom comments are controlled by:
    // service.customComments
    //
    // ==========================================

    const getServiceTypeLabel = (
        service
    ) => {
        const text =
            `${service.name || ""} ${service.category || ""
                }`.toLowerCase();

        if (
            text.includes("cheapest") ||
            text.includes("cheap") ||
            text.includes("no refill")
        ) {
            return "Cheapest";
        }

        if (
            text.includes("refillable") ||
            text.includes("refill")
        ) {
            return "Refill";
        }

        if (
            text.includes("refundable") ||
            text.includes("refund")
        ) {
            return "Refund";
        }

        return null;
    };

    // ==========================================
    // SERVICE DISPLAY NAME
    // ==========================================

    const getServiceDisplayName = (
        service
    ) => {
        const typeLabel =
            getServiceTypeLabel(
                service
            );

        const name = String(
            service.name ||
            "Unnamed Service"
        );

        if (!typeLabel) {
            return name;
        }

        return name
            .replace(
                /\[\s*(cheapest|cheap|no\s*refill|refillable|refill|refundable|refund)\s*\]/gi,
                ""
            )
            .replace(
                /\(\s*(cheapest|cheap|no\s*refill|refillable|refill|refundable|refund)\s*\)/gi,
                ""
            )
            .replace(
                /\s{2,}/g,
                " "
            )
            .trim();
    };

    // ==========================================
    // FORMAT SERVICE RATE
    // ==========================================

    const formatServiceRate = (
        rate
    ) => {
        const numericRate =
            Number(rate);

        if (
            !Number.isFinite(
                numericRate
            )
        ) {
            return formatCurrency(0);
        }

        return formatCurrency(
            numericRate
        );
    };

    // ==========================================
    // SELECT SERVICE
    // ==========================================

    const handleSelect = (
        service
    ) => {
        onSelectService(
            Number(
                service.serviceId
            )
        );

        setIsOpen(false);
    };

    // ==========================================
    // EMPTY STATE
    // ==========================================

    const isDisabled =
        availableServices.length === 0;

    return (
        <section className="min-w-0">
            <div
                ref={dropdownRef}
                className="relative min-w-0"
            >
                {/* =====================================================
                    SELECT BUTTON
                ====================================================== */}

                <button
                    type="button"
                    onClick={() => {
                        if (
                            availableServices.length >
                            0
                        ) {
                            setIsOpen(
                                (prev) =>
                                    !prev
                            );
                        }
                    }}
                    disabled={isDisabled}
                    className="
                        flex
                        h-11
                        w-full
                        min-w-0
                        items-center
                        justify-between
                        gap-3
                        rounded-md
                        border
                        border-light-azure
                        bg-light-blue
                        px-3
                        text-left
                        text-xs
                        text-dark-blue
                        outline-none
                        transition
                        hover:border-light-azure
                        focus:border-primary-blue
                        focus:ring-2
                        focus:ring-primary-blue/10
                        disabled:cursor-not-allowed
                        disabled:bg-light-blue
                        disabled:text-dark-gray
                        sm:px-4
                        sm:text-[13px]
                    "
                >
                    <span className="min-w-0 truncate">
                        {selectedService
                            ? getServiceDisplayName(
                                selectedService
                            )
                            : availableServices.length ===
                                0
                                ? "Select a category first"
                                : "Choose a service"}
                    </span>

                    <ChevronDown
                        size={17}
                        className={`
                            shrink-0
                            text-[#777]
                            transition-transform
                            ${isOpen
                                ? "rotate-180"
                                : ""
                            }
                        `}
                    />
                </button>

                {/* =====================================================
                    SERVICE DROPDOWN
                ====================================================== */}

                {isOpen &&
                    availableServices.length >
                    0 && (
                        <div
                            className="
                                mt-1.5
                                max-h-[360px]
                                overflow-y-auto
                                rounded-md
                                border
                                border-light-azure
                                bg-light-blue
                                p-1.5
                            "
                        >
                            {groupedServices.map(
                                (
                                    [
                                        groupName,
                                        services,
                                    ],
                                    groupIndex
                                ) => (
                                    <div
                                        key={
                                            groupName
                                        }
                                    >
                                        {/* GROUP DIVIDER */}

                                        {groupIndex >
                                            0 && (
                                                <div
                                                    className="
                                                    my-1.5
                                                    border-t
                                                    border-light-azure
                                                "
                                                />
                                            )}

                                        {/* GROUP SERVICES */}

                                        {services.map(
                                            (
                                                service
                                            ) => {
                                                const isSelected =
                                                    Number(
                                                        selectedServiceId
                                                    ) ===
                                                    Number(
                                                        service.serviceId
                                                    );

                                                return (
                                                    <button
                                                        key={
                                                            service.serviceId
                                                        }
                                                        type="button"
                                                        onClick={() =>
                                                            handleSelect(
                                                                service
                                                            )
                                                        }
                                                        className={`
                                                            flex
                                                            w-full
                                                            min-w-0
                                                            items-center
                                                            justify-between
                                                            gap-3
                                                            border-b
                                                            border-light-azure
                                                            px-3
                                                            py-3
                                                            text-left
                                                            transition
                                                            last:border-b-0
                                                            ${isSelected
                                                                ? "bg-white/60"
                                                                : "hover:bg-[#efefef]"
                                                            }
                                                        `}
                                                    >
                                                        <div className="min-w-0">
                                                            <div className="flex min-w-0 flex-wrap items-center gap-1.5">
                                                                <span
                                                                    className={`
                                                                        min-w-0
                                                                        break-words
                                                                        text-xs
                                                                        sm:text-[13px]
                                                                        ${isSelected
                                                                            ? "font-medium text-primary-blue"
                                                                            : "text-dark-blue"
                                                                        }
                                                                    `}
                                                                >
                                                                    {
                                                                        getServiceDisplayName(
                                                                            service
                                                                        )
                                                                    }

                                                                    {" "}

                                                                    <span className="text-primary-blue">
                                                                        1000
                                                                        {" "}
                                                                        Per
                                                                        {" "}
                                                                        {formatServiceRate(
                                                                            service.rate
                                                                        )}
                                                                    </span>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </button>
                                                );
                                            }
                                        )}
                                    </div>
                                )
                            )}
                        </div>
                    )}
            </div>
        </section>
    );
}

export default Services;