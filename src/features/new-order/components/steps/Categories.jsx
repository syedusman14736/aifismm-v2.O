import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";

function Categories({
    availableCategories = [],
    selectedCategory,
    onSelectCategory,
    isLoading = false,
}) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // ==========================================
    // CLOSE DROPDOWN ON OUTSIDE CLICK
    // ==========================================

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
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
    // SELECT CATEGORY
    // ==========================================

    const handleSelect = (category) => {
        onSelectCategory(category);
        setIsOpen(false);
    };

    // ==========================================
    // DISABLED STATE
    // ==========================================

    const isDisabled =
        isLoading ||
        availableCategories.length === 0;

    // ==========================================
    // SELECTED PLATFORM
    // ==========================================

    const selectedPlatform =
        selectedCategory?.platform || null;

    const selectedPlatformImage =
        selectedPlatform?.image || null;

    const selectedPlatformName =
        selectedPlatform?.name || null;

    // ==========================================
    // SELECTED CATEGORY NAME
    // ==========================================

    const selectedCategoryName =
        selectedCategory?.category?.name || null;

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
                    disabled={isDisabled}
                    onClick={() =>
                        setIsOpen((prev) => !prev)
                    }
                    className="
                        flex
                        h-11
                        w-full
                        min-w-0
                        cursor-pointer
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
                        hover:border-primary-blue
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
                    <div className="flex min-w-0 items-center gap-2.5">
                        {/* =================================================
                            PLATFORM IMAGE
                        ================================================== */}

                        {selectedPlatformImage ? (
                            <img
                                src={
                                    selectedPlatformImage
                                }
                                alt={
                                    selectedPlatformName ||
                                    "Platform"
                                }
                                className="
                                    h-6
                                    w-6
                                    shrink-0
                                    rounded-md
                                    object-cover
                                "
                            />
                        ) : selectedCategory ? (
                            <div
                                className="
                                    flex
                                    h-6
                                    w-6
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-md
                                    bg-[#e8eaec]
                                    text-[10px]
                                    font-medium
                                    text-dark-gray
                                "
                            >
                                {selectedPlatformName
                                    ?.charAt(0)
                                    ?.toUpperCase() ||
                                    "P"}
                            </div>
                        ) : null}

                        {/* =================================================
                            CATEGORY TEXT
                        ================================================== */}

                        <span className="min-w-0 truncate">
                            {isLoading
                                ? "Loading categories..."
                                : selectedCategory
                                    ? selectedPlatformName
                                        ? `${selectedCategoryName || "Category"}`
                                        : selectedCategoryName ||
                                        "Category"
                                    : availableCategories.length === 0
                                        ? "No categories available"
                                        : "Choose a category"}
                        </span>
                    </div>

                    {/* =================================================
                        CHEVRON
                    ================================================== */}

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
                    DROPDOWN
                ====================================================== */}

                {isOpen && !isDisabled && (
                    <div
                        className="
                            absolute
                            left-0
                            right-0
                            z-50
                            mt-1.5
                            max-h-[320px]
                            overflow-y-auto
                            rounded-md
                            border
                            border-light-azure
                            bg-light-blue
                            p-1.5
                        "
                    >
                        {availableCategories.map(
                            (category) => {
                                const isSelected =
                                    selectedCategory?.id ===
                                    category.id;

                                const platform =
                                    category.platform ||
                                    null;

                                const platformImage =
                                    platform?.image ||
                                    null;

                                const platformName =
                                    platform?.name ||
                                    "Platform";

                                const categoryName =
                                    category?.category
                                        ?.name ||
                                    "Unnamed Category";

                                return (
                                    <button
                                        key={
                                            category.id
                                        }
                                        type="button"
                                        onClick={() =>
                                            handleSelect(
                                                category
                                            )
                                        }
                                        className={`
                                            flex
                                            w-full
                                            min-w-0
                                            cursor-pointer
                                            items-center
                                            justify-between
                                            gap-3
                                            border-b
                                            border-light-azure
                                            px-3
                                            py-2.5
                                            text-left
                                            last:border-b-0
                                            ${isSelected
                                                ? "bg-white/60"
                                                : "hover:bg-[#efefef]"
                                            }
                                        `}
                                    >
                                        {/* =================================================
                                            PLATFORM + CATEGORY
                                        ================================================== */}

                                        <div className="flex min-w-0 items-center gap-2.5">
                                            {/* PLATFORM IMAGE */}

                                            {platformImage ? (
                                                <img
                                                    src={
                                                        platformImage
                                                    }
                                                    alt={
                                                        platformName
                                                    }
                                                    className="
                                                        h-8
                                                        w-8
                                                        shrink-0
                                                        rounded-md
                                                        object-cover
                                                    "
                                                />
                                            ) : (
                                                <div
                                                    className="
                                                        flex
                                                        h-8
                                                        w-8
                                                        shrink-0
                                                        items-center
                                                        justify-center
                                                        rounded-md
                                                        bg-[#e8eaec]
                                                        text-[11px]
                                                        font-medium
                                                        text-dark-gray
                                                    "
                                                >
                                                    {platformName
                                                        .charAt(
                                                            0
                                                        )
                                                        .toUpperCase()}
                                                </div>
                                            )}

                                            {/* TEXT */}

                                            <div className="min-w-0">
                                                {/* PLATFORM */}

                                                {/* <p
                                                    className={`
                                                        truncate
                                                        text-[11px]
                                                        ${isSelected
                                                            ? "font-medium text-primary-blue"
                                                            : "text-dark-gray"
                                                        }
                                                    `}
                                                >
                                                    {
                                                        platformName
                                                    }
                                                </p> */}

                                                {/* CATEGORY */}

                                                <p
                                                    className={`
                                                        truncate
                                                        text-xs
                                                        sm:text-[13px]
                                                        ${isSelected
                                                            ? "font-medium text-primary-blue"
                                                            : "text-dark-blue"
                                                        }
                                                    `}
                                                >
                                                    {
                                                        categoryName
                                                    }
                                                </p>
                                            </div>
                                        </div>

                                        {/* =================================================
                                            CHECK
                                        ================================================== */}

                                        {isSelected && (
                                            <Check
                                                size={16}
                                                className="
                                                    shrink-0
                                                    text-primary-blue
                                                "
                                            />
                                        )}
                                    </button>
                                );
                            }
                        )}
                    </div>
                )}
            </div>
        </section>
    );
}

export default Categories;