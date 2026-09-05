import React from "react";

const StatusTabs = ({
    status,
    setStatus,
    statuses,
}) => {
    return (
        <div className="flex gap-1 overflow-x-auto border-b border-[#e5e7eb] pt-3 hide-scrollbar">

            {statuses.map((item) => {

                const isActive = status === item;

                return (
                    <button
                        key={item}
                        onClick={() => setStatus(item)}
                        className={`
                            whitespace-nowrap
                            border-b-2
                            px-3
                            pb-3
                            text-xs
                            font-medium
                            transition

                            ${isActive
                                ? "border-[#fa6c0a] text-[#fa6c0a]"
                                : "border-transparent text-[#6b7280] hover:text-[#fa6c0a]"
                            }
                        `}
                    >
                        {item === "All" ? "All Orders" : item}
                    </button>
                );
            })}

        </div>
    );
};

export default StatusTabs;