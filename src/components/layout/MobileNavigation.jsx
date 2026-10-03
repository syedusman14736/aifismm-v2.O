import {
    House,
    PlusCircle,
    History,
    Wallet,
    MoreHorizontal,
    Receipt,
    User,
    LogOut,
    X,
} from "lucide-react";

import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

function MobileNavigation() {
    const [showMore, setShowMore] = useState(false);

    const { logout } = useAuthContext();

    const navItems = [
        {
            to: "/dashboard",
            icon: House,
            label: "Home",
        },
        {
            to: "/dashboard/new-order",
            icon: PlusCircle,
            label: "New Order",
        },
        {
            to: "/dashboard/order-history",
            icon: History,
            label: "History",
        },
        {
            to: "/dashboard/add-funds",
            icon: Wallet,
            label: "Add Funds",
        },
    ];

    const moreItems = [
        {
            to: "/dashboard/payment-history",
            icon: Receipt,
            label: "Transactions",
        },
        {
            to: "/dashboard/profile",
            icon: User,
            label: "Profile",
        },
    ];

    // ==========================================
    // LOGOUT
    // ==========================================

    const handleLogout = () => {
        setShowMore(false);
        logout();
    };

    return (
        <>
            {/* More Menu Overlay */}
            {showMore && (
                <div
                    className="md:hidden fixed inset-0 z-40 bg-black/30"
                    onClick={() => setShowMore(false)}
                >
                    <div
                        className="absolute bottom-14 left-0 right-0 bg-light-blue rounded-t-xl shadow-xl border-t border-light-azure p-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* More Header */}
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-semibold text-dark-blue">
                                More
                            </h3>

                            <button
                                type="button"
                                onClick={() => setShowMore(false)}
                                className="w-8 h-8 flex items-center justify-center rounded-full text-dark-gray hover:bg-gray-100 transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {/* More Items */}
                        <div className="grid grid-cols-3 gap-3">
                            {moreItems.map(
                                ({ to, icon: Icon, label }) => (
                                    <NavLink
                                        key={to}
                                        to={to}
                                        onClick={() =>
                                            setShowMore(false)
                                        }
                                        className={({ isActive }) =>
                                            `flex flex-col items-center justify-center gap-2 py-3 rounded-xl transition-colors ${isActive
                                                ? "bg-light-blue text-dark-blue"
                                                : "text-dark-gray hover:bg-light-blue"
                                            }`
                                        }
                                    >
                                        <Icon className="w-5 h-5" />

                                        <span className="text-[10px] text-center">
                                            {label}
                                        </span>
                                    </NavLink>
                                )
                            )}

                            {/* Logout */}
                            <button
                                type="button"
                                onClick={handleLogout}
                                className="flex flex-col items-center justify-center gap-2 py-3 rounded-xl text-dark-gray hover:bg-light-blue transition-colors"
                            >
                                <LogOut className="w-5 h-5" />

                                <span className="text-[10px] text-center">
                                    Logout
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Bottom Navigation */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-light-blue border-t border-light-azure">
                <ul className="grid grid-cols-5 h-14">
                    {navItems.map(
                        ({ to, icon: Icon, label }) => (
                            <li key={to}>
                                <NavLink
                                    to={to}
                                    end
                                    className={({ isActive }) =>
                                        `h-full flex flex-col items-center justify-center gap-1 transition-colors ${isActive
                                            ? "text-dark-blue"
                                            : "text-dark-gray"
                                        }`
                                    }
                                >
                                    <Icon className="w-4.5 h-4.5 sm:w-5 sm:h-5" />

                                    <span className="text-[10px]">
                                        {label}
                                    </span>
                                </NavLink>
                            </li>
                        )
                    )}

                    {/* More */}
                    <li>
                        <button
                            type="button"
                            onClick={() =>
                                setShowMore((prev) => !prev)
                            }
                            className={`w-full h-full flex flex-col items-center justify-center gap-1 transition-colors ${showMore
                                ? "text-dark-blue"
                                : "text-dark-gray"
                                }`}
                        >
                            <MoreHorizontal className="w-4.5 h-4.5 sm:w-5 sm:h-5" />

                            <span className="text-[10px]">
                                More
                            </span>
                        </button>
                    </li>
                </ul>
            </nav>
        </>
    );

}

export default MobileNavigation;
