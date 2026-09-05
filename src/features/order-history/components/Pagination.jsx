import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({
    currentPage,
    totalPages,
    itemsPerPage,
    totalItems,
    changePage,
    changeItemsPerPage,
}) => {
    const startItem =
        totalItems === 0
            ? 0
            : (currentPage - 1) * itemsPerPage + 1;

    const endItem = Math.min(
        currentPage * itemsPerPage,
        totalItems
    );

    return (
        <div className="flex flex-col gap-3 border-t border-[#e5e7eb] py-4 sm:flex-row sm:items-center sm:justify-between">

            {/* Result Info */}
            <p className="text-[11px] text-[#4b5563]">
                Showing{" "}
                <span className="font-medium text-[#4b5563]">
                    {startItem}
                </span>
                {" - "}
                <span className="font-medium text-[#4b5563]">
                    {endItem}
                </span>
                {" of "}
                <span className="font-medium text-[#4b5563]">
                    {totalItems}
                </span>
                {" orders"}
            </p>


            <div className="flex items-center gap-2">

                {/* Items Per Page */}
                <select
                    value={itemsPerPage}
                    onChange={(e) =>
                        changeItemsPerPage(e.target.value)
                    }
                    className="
                        h-8
                        rounded-md
                        border border-[#e5e7eb]
                        bg-white
                        px-2
                        text-[11px]
                        text-[#374151]
                        outline-none
                    "
                >
                    <option value="5">
                        5 / page
                    </option>

                    <option value="10">
                        10 / page
                    </option>

                    <option value="20">
                        20 / page
                    </option>

                    <option value="50">
                        50 / page
                    </option>
                </select>


                {/* Previous */}
                <button
                    onClick={() =>
                        changePage(currentPage - 1)
                    }
                    disabled={currentPage === 1}
                    className="
                        flex
                        h-8
                        w-8
                        items-center
                        justify-center
                        rounded-md
                        border border-[#e5e7eb]
                        text-[#6b7280]
                        transition
                        hover:bg-[#f9fafb]
                        disabled:cursor-not-allowed
                        disabled:opacity-40
                    "
                >
                    <ChevronLeft size={14} />
                </button>


                {/* Page */}
                <div className="flex h-8 min-w-8 items-center justify-center rounded-md bg-[#fa6c0a] px-2 text-[11px] font-medium text-white">
                    {currentPage}
                </div>


                {/* Next */}
                <button
                    onClick={() =>
                        changePage(currentPage + 1)
                    }
                    disabled={
                        currentPage === totalPages
                    }
                    className="
                        flex
                        h-8
                        w-8
                        items-center
                        justify-center
                        rounded-md
                        border border-[#e5e7eb]
                        text-[#6b7280]
                        transition
                        hover:bg-[#f9fafb]
                        disabled:cursor-not-allowed
                        disabled:opacity-40
                    "
                >
                    <ChevronRight size={14} />
                </button>

            </div>

        </div>
    );
};

export default Pagination;