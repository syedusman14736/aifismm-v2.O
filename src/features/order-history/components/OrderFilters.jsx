import React from "react";
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
        <div className="rounded-md bg-white">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">

                {/* Search */}
                <div className="relative">
                    <Search
                        size={15}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af]"
                    />

                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search Order ID / Link"
                        className="w-full h-9 pl-9 pr-3 rounded-md border border-[#e5e7eb] text-xs text-[#111827] outline-none focus:border-[#111827]"
                    />
                </div>

                {/* Status */}
                {/* <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="h-9 px-3 rounded-md border border-[#e5e7eb] text-xs text-[#374151] outline-none bg-white"
                >
                    {statuses.map((item) => (
                        <option key={item} value={item}>
                            {item === "All" ? "All Status" : item}
                        </option>
                    ))}
                </select> */}

                {/* Platform */}
                <select
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value)}
                    className="h-9 px-3 rounded-md border border-[#e5e7eb] text-xs text-[#374151] outline-none bg-white"
                >
                    {platforms.map((item) => (
                        <option key={item} value={item}>
                            {item === "All" ? "All Platforms" : item}
                        </option>
                    ))}
                </select>

                {/* Category */}
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="h-9 px-3 rounded-md border border-[#e5e7eb] text-xs text-[#374151] outline-none bg-white"
                >
                    {categories.map((item) => (
                        <option key={item} value={item}>
                            {item === "All" ? "All Categories" : item}
                        </option>
                    ))}
                </select>

                {/* Date */}
                <select
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                    className="h-9 px-3 rounded-md border border-[#e5e7eb] text-xs text-[#374151] outline-none bg-white"
                >
                    {dateRanges.map((item) => (
                        <option key={item} value={item}>
                            {item === "All" ? "All Dates" : item}
                        </option>
                    ))}
                </select>


                <button
                    type="button"
                    onClick={resetFilters}
                    className="h-9 px-3 inline-flex items-center gap-2 h-8 px-3 rounded-md border border-[#e5e7eb] text-xs text-[#374151] hover:bg-[#f9fafb] transition"
                >
                    <RefreshCw size={13} />
                    Reset Filters
                </button>
            </div>

            {/* Bottom row */}

        </div>
    );
};

export default OrderFilters;