import React from "react";

const StatusTabs = ({
    status,
    setStatus,
    statuses,
}) => {
    return (
        <div className="flex gap-1 overflow-x-auto border-b border-light-azure pt-3 hide-scrollbar">

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
                            cursor-pointer
                            ${isActive
                                ? "border-primary-blue text-primary-blue"
                                : "border-transparent text-dark-gray hover:text-primary-blue"
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