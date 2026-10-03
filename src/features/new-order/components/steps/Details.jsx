import {
    MessageSquareText,
} from "lucide-react";

function Details({
    link,
    quantity,
    comments,
    onLinkChange,
    onQuantityChange,
    onCommentsChange,
    selectedService,
    isCustomComments,
}) {
    const minQuantity =
        Number(
            selectedService?.min
        ) || 0;

    const maxQuantity =
        Number(
            selectedService?.max
        ) || 0;

    return (
        <section className="min-w-0">

            {/* =========================================
                SERVICE DESCRIPTION
            ========================================== */}

            <div
                className="
                    min-w-0
                    rounded-md
                    border
                    border-light-azure
                    bg-light-blue
                    px-3
                    py-4
                    sm:px-4
                "
            >
                <p
                    className="
                        min-h-[140px]
                        break-words
                        whitespace-pre-line
                        text-xs
                        leading-4
                        text-dark-gray
                        sm:text-[13px]
                        sm:leading-5
                    "
                >
                    {selectedService?.description ||
                        "Select a service to view its description."}
                </p>
            </div>

            {/* =========================================
                LINK
            ========================================== */}

            <div className="mt-2 min-w-0">
                <div className="relative min-w-0">
                    <input
                        type="url"
                        value={link}
                        onChange={(e) =>
                            onLinkChange(
                                e.target.value
                            )
                        }
                        placeholder={
                            selectedService
                                ? "Enter Post / Reel / Profile Link"
                                : "Select a service first"
                        }
                        disabled={!selectedService}
                        className="
                            h-11
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
                            placeholder:text-xs
                            md:placeholder:text-[13px]
                            placeholder:text-dark-gray
                            focus:border-primary-blue
                            focus:ring-2
                            focus:ring-primary-blue/10
                            disabled:cursor-not-allowed
                            disabled:bg-light-blue
                            disabled:text-dark-gray
                            sm:text-sm
                        "
                    />
                </div>
            </div>

            {/* =========================================
                CUSTOM COMMENTS
            ========================================== */}

            {isCustomComments ? (
                <div className="mt-3 min-w-0">

                    <div className="relative min-w-0">
                        <MessageSquareText
                            size={16}
                            className="
                                pointer-events-none
                                absolute
                                left-3
                                top-3
                                text-dark-gray
                            "
                        />

                        <textarea
                            value={comments}
                            onChange={(e) =>
                                onCommentsChange(
                                    e.target.value
                                )
                            }
                            disabled={!selectedService}
                            rows={7}
                            placeholder="Enter one comment per line..."
                            className="
                                min-h-[150px]
                                w-full
                                resize-y
                                rounded-md
                                border
                                border-light-azure
                                bg-light-blue
                                py-3
                                pl-10
                                pr-3
                                text-xs
                                leading-5
                                text-dark-gray
                                outline-none
                                placeholder:text-[#a3a7aa]
                                focus:border-primary-blue
                                focus:ring-2
                                focus:ring-primary-blue/10
                                disabled:cursor-not-allowed
                                disabled:bg-light-blue
                                disabled:text-dark-gray
                                sm:text-sm
                            "
                        />
                    </div>

                    <div
                        className="
                            mt-1
                            flex
                            items-center
                            justify-between
                            gap-3
                        "
                    >
                        <p
                            className="
                                text-[10px]
                                text-dark-gray
                                sm:text-[11px]
                            "
                        >
                            Enter one comment per line.
                        </p>

                        <p
                            className="
                                shrink-0
                                text-[10px]
                                font-medium
                                text-primary-blue
                                sm:text-[11px]
                            "
                        >
                            {
                                comments
                                    .split(/\r?\n/)
                                    .map((comment) =>
                                        comment.trim()
                                    )
                                    .filter(Boolean)
                                    .length
                            }{" "}
                            comments
                        </p>
                    </div>

                    <p
                        className="
                            mt-1
                            text-[10px]
                            text-dark-gray
                            sm:text-[11px]
                        "
                    >
                        Min:{" "}
                        {minQuantity.toLocaleString()}
                        {" • "}
                        Max:{" "}
                        {maxQuantity.toLocaleString()}
                    </p>
                </div>
            ) : (
                /* =========================================
                    NORMAL QUANTITY
                ========================================== */

                <div className="mt-2 min-w-0">

                    <input
                        type="number"
                        value={quantity}
                        min={
                            selectedService
                                ? minQuantity
                                : undefined
                        }
                        max={
                            selectedService
                                ? maxQuantity
                                : undefined
                        }
                        step="1"
                        onChange={(e) =>
                            onQuantityChange(
                                e.target.value
                            )
                        }
                        disabled={!selectedService}
                        placeholder={
                            selectedService
                                ? "Enter quantity"
                                : "Select a service first"
                        }
                        className="
                            h-11
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
                            placeholder:text-dark-gray
                            placeholder:text-xs
                            md:placeholder:text-[13px]
                            focus:border-primary-blue
                            focus:ring-2
                            focus:ring-primary-blue/10
                            disabled:cursor-not-allowed
                            disabled:bg-light-blue
                            disabled:text-dark-gray
                            sm:text-sm
                        "
                    />

                    <p
                        className="
                            mt-2
                            text-[10px]
                            text-dark-gray
                            sm:text-[11px]
                        "
                    >
                        {selectedService ? (
                            <>
                                Min:{" "}
                                {minQuantity.toLocaleString()}
                                {" • "}
                                Max:{" "}
                                {maxQuantity.toLocaleString()}
                            </>
                        ) : (
                            "Select a service to view quantity limits"
                        )}
                    </p>
                </div>
            )}
        </section>
    );
}

export default Details;