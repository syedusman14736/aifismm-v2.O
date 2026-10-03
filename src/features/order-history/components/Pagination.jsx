
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
        <div
            className="
                flex
                min-w-0
                flex-col
                gap-3
                border-t
                border-light-azure
                py-3
                sm:py-4
                md:flex-row
                md:items-center
                md:justify-between
            "
        >
            {/* Result Info */}

            <p className="text-[10px] text-dark-gray sm:text-[11px]">
                Showing{" "}
                <span className="font-medium text-dark-gray">
                    {startItem}
                </span>
                {" - "}
                <span className="font-medium text-dark-gray">
                    {endItem}
                </span>
                {" of "}
                <span className="font-medium text-dark-gray">
                    {totalItems}
                </span>
                {" orders"}
            </p>

            {/* Controls */}

            <div
                className="
                    flex
                    min-w-0
                    items-center
                    gap-1.5
                    sm:gap-2
                "
            >
                {/* Items Per Page */}

                <select
                    value={itemsPerPage}
                    onChange={(e) =>
                        changeItemsPerPage(e.target.value)
                    }
                    className="
                        h-8
                        min-w-0
                        cursor-pointer
                        rounded-md
                        border
                        border-light-azure
                        bg-light-blue
                        px-1.5
                        text-[10px]
                        text-dark-gray
                        outline-none
                        transition
                        focus:ring-dark-blue/20
                        sm:px-2
                        sm:text-[11px]
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
                    type="button"
                    onClick={() =>
                        changePage(currentPage - 1)
                    }
                    disabled={currentPage === 1}
                    className="
                        flex
                        h-8
                        w-8
                        shrink-0
                        cursor-pointer
                        items-center
                        justify-center
                        rounded-md
                        border
                        border-light-azure
                        text-dark-gray
                        outline-none
                        transition-colors
                        hover:bg-[#f9fafb]
                        disabled:cursor-not-allowed
                        disabled:opacity-40
                        focus:outline-none
                    "
                >
                    <ChevronLeft
                        size={14}
                        strokeWidth={1.8}
                    />
                </button>

                {/* Current Page */}

                <div
                    className="
                        flex
                        h-8
                        min-w-8
                        shrink-0
                        items-center
                        justify-center
                        rounded-md
                        bg-primary-blue
                        px-2
                        text-[11px]
                        font-medium
                        text-light-blue
                    "
                >
                    {currentPage}
                </div>

                {/* Next */}

                <button
                    type="button"
                    onClick={() =>
                        changePage(currentPage + 1)
                    }
                    disabled={
                        currentPage === totalPages ||
                        totalPages === 0
                    }
                    className="
                        flex
                        h-8
                        w-8
                        shrink-0
                        cursor-pointer
                        items-center
                        justify-center
                        rounded-md
                        border
                        border-light-azure
                        text-dark-gray
                        outline-none
                        transition-colors
                        hover:bg-[#f9fafb]
                        disabled:cursor-not-allowed
                        disabled:opacity-40
                        focus:outline-none
                    "
                >
                    <ChevronRight
                        size={14}
                        strokeWidth={1.8}
                    />
                </button>
            </div>
        </div>
    );
};

export default Pagination