import {
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

const PaymentPagination = ({
    currentPage = 1,
    totalPages = 0,
    itemsPerPage = 10,
    totalItems = 0,
    changePage,
    changeItemsPerPage,
}) => {
    const safeCurrentPage =
        Number(currentPage) || 1;

    const safeItemsPerPage =
        Number(itemsPerPage) || 10;

    const safeTotalItems =
        Number(totalItems) || 0;

    const safeTotalPages =
        Number(totalPages) || 0;

    const startItem =
        safeTotalItems === 0
            ? 0
            : (safeCurrentPage - 1) *
            safeItemsPerPage +
            1;

    const endItem =
        safeTotalItems === 0
            ? 0
            : Math.min(
                safeCurrentPage *
                safeItemsPerPage,
                safeTotalItems
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
            <p
                className="
                    text-[10px]
                    text-gray-500
                    sm:text-[11px]
                "
            >
                Showing{" "}
                <span className="font-medium text-gray-700">
                    {startItem}
                </span>
                {" - "}
                <span className="font-medium text-gray-700">
                    {endItem}
                </span>
                {" of "}
                <span className="font-medium text-gray-700">
                    {safeTotalItems}
                </span>
                {" payments"}
            </p>

            <div
                className="
                    flex
                    min-w-0
                    items-center
                    gap-1.5
                    sm:gap-2
                "
            >
                <select
                    value={safeItemsPerPage}
                    onChange={(event) =>
                        changeItemsPerPage(
                            Number(event.target.value)
                        )
                    }
                    className="
                        h-8
                        min-w-0
                        cursor-pointer
                        rounded-md
                        border
                        border-light-azure
                        bg-gray-50
                        px-1.5
                        text-[10px]
                        text-dark-gray
                        outline-none
                        transition
                        focus:border-primary-blue
                        focus:ring-1
                        focus:ring-primary-blue/20
                        sm:px-2
                        sm:text-[11px]
                    "
                >
                    <option value={5}>
                        5 / page
                    </option>

                    <option value={10}>
                        10 / page
                    </option>

                    <option value={20}>
                        20 / page
                    </option>

                    <option value={50}>
                        50 / page
                    </option>
                </select>

                <button
                    type="button"
                    onClick={() =>
                        changePage(
                            safeCurrentPage - 1
                        )
                    }
                    disabled={
                        safeCurrentPage <= 1
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
                        hover:bg-gray-50
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
                    {safeCurrentPage}
                </div>

                <button
                    type="button"
                    onClick={() =>
                        changePage(
                            safeCurrentPage + 1
                        )
                    }
                    disabled={
                        safeTotalPages === 0 ||
                        safeCurrentPage >=
                        safeTotalPages
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
                        hover:bg-gray-50
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

export default PaymentPagination;