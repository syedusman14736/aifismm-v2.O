import { RefreshCw, Search } from "lucide-react";

const OrderFilters = ({
    search,
    status,
    platform,
    category,
    dateRange,

    setSearch,
    setStatus,
    setPlatform,
    setCategory,
    setDateRange,

    statuses,
    platforms,
    categories,
    dateRanges,

    resetFilters,
}) => {
    return (
        <div className="min-w-0 rounded-md">
            <div
                className="
                    grid
                    min-w-0
                    grid-cols-1
                    gap-2
                    sm:grid-cols-2
                    sm:gap-2.5
                    lg:grid-cols-5
                    lg:gap-3
                "
            >
                {/* Search */}

                <div className="relative min-w-0">
                    <Search
                        size={15}
                        strokeWidth={1.8}
                        className="
                            pointer-events-none
                            absolute
                            left-3
                            top-1/2
                            -translate-y-1/2
                            text-dark-gray
                        "
                    />

                    <input
                        type="text"
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                        placeholder="Search Order ID / Link"
                        className="
                            h-9
                            w-full
                            min-w-0
                            rounded-md
                            border
                            border-light-azure
                            bg-light-blue
                            pl-9
                            pr-3
                            text-xs
                            text-dark-gray
                            outline-none
                            placeholder:text-dark-gray
                            transition
                            focus:border-dark-blue/20
                        "
                    />
                </div>

                {/* Platform */}

                <div className="min-w-0">
                    <select
                        value={platform}
                        onChange={(e) =>
                            setPlatform(e.target.value)
                        }
                        className="
                            h-9
                            w-full
                            min-w-0
                            rounded-md
                            border
                            border-light-azure
                            bg-light-blue
                            px-3
                            text-xs
                            text-dark-gray
                            outline-none
                            transition
                            focus:border-dark-blue/20
                        "
                    >
                        {platforms.map((item) => (
                            <option
                                key={item}
                                value={item}
                            >
                                {item === "All"
                                    ? "All Platforms"
                                    : item}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Category */}

                <div className="min-w-0">
                    <select
                        value={category}
                        onChange={(e) =>
                            setCategory(e.target.value)
                        }
                        className="
                            h-9
                            w-full
                            min-w-0
                            rounded-md
                            border
                            border-light-azure
                            bg-light-blue
                            px-3
                            text-xs
                            text-dark-gray
                            outline-none
                            transition
                            focus:border-dark-blue/20
                        "
                    >
                        {categories.map((item) => (
                            <option
                                key={item}
                                value={item}
                            >
                                {item === "All"
                                    ? "All Categories"
                                    : item}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Date */}

                <div className="min-w-0">
                    <select
                        value={dateRange}
                        onChange={(e) =>
                            setDateRange(e.target.value)
                        }
                        className="
                            h-9
                            w-full
                            min-w-0
                            rounded-md
                            border
                            border-light-azure
                            bg-light-blue
                            px-3
                            text-xs
                            text-dark-gray
                            outline-none
                            transition
                            focus:border-dark-blue/20
                        "
                    >
                        {dateRanges.map((item) => (
                            <option
                                key={item}
                                value={item}
                            >
                                {item === "All"
                                    ? "All Dates"
                                    : item}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Reset */}

                <button
                    type="button"
                    onClick={resetFilters}
                    className="
                        inline-flex
                        h-9
                        w-full
                        cursor-pointer
                        items-center
                        justify-center
                        gap-2
                        rounded-md
                        border
                        border-light-azure
                        bg-light-blue
                        px-3
                        text-xs
                        text-dark-gray
                        outline-none
                        transition-colors
                        hover:bg-[#f9fafb]
                        focus:outline-none
                        sm:w-full
                    "
                >
                    <RefreshCw
                        size={13}
                        strokeWidth={1.8}
                    />

                    <span>Reset Filters</span>
                </button>
            </div>
        </div>
    );
};

export default OrderFilters;