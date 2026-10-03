import {
    Activity,
    LayoutDashboard,
    Boxes,
    Server,
    Globe2,
    ShoppingCart,
    Users,
    WalletCards,
    Ticket,
    Settings,
    LogOut,
    ClipboardList,
    ChevronRight,
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";

function AdminSidebar() {
    const location = useLocation();

    const [requestsOpen, setRequestsOpen] = useState(
        location.pathname.startsWith("/admin/refund-requests") ||
        location.pathname.startsWith("/admin/refill-requests")
    );

    const navItems = [
        {
            to: "/admin",
            label: "Dashboard",
            icon: LayoutDashboard,
            end: true,
        },
        {
            to: "/admin/services",
            label: "Services",
            icon: Boxes,
        },
        {
            to: "/admin/providers",
            label: "Providers",
            icon: Server,
        },
        {
            to: "/admin/platforms",
            label: "Platforms",
            icon: Globe2,
        },
        {
            to: "/admin/orders",
            label: "Orders",
            icon: ShoppingCart,
        },
        {
            to: "/admin/users",
            label: "Users",
            icon: Users,
        },
        {
            to: "/admin/payments",
            label: "Payments",
            icon: WalletCards,
        },
        {
            to: "/admin/tickets",
            label: "Tickets",
            icon: Ticket,
        },
        {
            to: "/admin/settings",
            label: "Settings",
            icon: Settings,
        },
    ];

    const requestsActive =
        location.pathname.startsWith(
            "/admin/refund-requests"
        ) ||
        location.pathname.startsWith(
            "/admin/refill-requests"
        );

    return (
        <aside className="bg-light-blue border-r border-light-azure h-screen w-auto px-2 py-2 flex flex-col justify-between items-center sticky top-0 shrink-0">
            {/* Brand */}
            <div className="flex flex-col justify-center items-center">
                <div
                    title="AiFi SMM Admin"
                    className="text-light-blue flex py-2 justify-center items-center w-full text-center bg-dark-blue rounded-md"
                >
                    <Activity size={20} />
                </div>

                {/* Navigation */}
                <ul className="flex flex-col gap-2 mt-5 items-center justify-center">
                    {navItems.map((item) => {
                        const Icon = item.icon;

                        return (
                            <li key={item.to}>
                                <NavLink
                                    to={item.to}
                                    end={item.end}
                                    title={item.label}
                                    aria-label={item.label}
                                    className={({ isActive }) =>
                                        isActive
                                            ? "text-dark-blue p-2 rounded-md cursor-pointer block"
                                            : "text-dark-gray p-2 rounded-md cursor-pointer block hover:text-dark-blue transition-colors"
                                    }
                                >
                                    <Icon
                                        size={20}
                                        strokeWidth={1.9}
                                    />
                                </NavLink>
                            </li>
                        );
                    })}

                    {/* ==========================================
                        REQUESTS
                    ========================================== */}

                    <li className="relative">
                        <button
                            type="button"
                            title="Requests"
                            aria-label="Requests"
                            onClick={() =>
                                setRequestsOpen(
                                    (previous) =>
                                        !previous
                                )
                            }
                            className={
                                requestsActive
                                    ? "text-dark-blue p-2 rounded-md cursor-pointer block"
                                    : "text-dark-gray p-2 rounded-md cursor-pointer block hover:text-dark-blue transition-colors"
                            }
                        >
                            <ClipboardList
                                size={20}
                                strokeWidth={1.9}
                            />
                        </button>

                        {/* Requests Flyout */}
                        {requestsOpen && (
                            <div className="absolute left-full top-0 ml-2 w-52 bg-white border border-light-azure rounded-lg shadow-lg overflow-hidden z-50">
                                {/* Header */}
                                <div className="px-3 py-2 border-b border-light-azure bg-light-blue">
                                    <p className="text-sm font-semibold text-dark-blue">
                                        Requests
                                    </p>
                                </div>

                                {/* Refund Requests */}
                                <NavLink
                                    to="/admin/refund-requests"
                                    className={({ isActive }) =>
                                        `flex items-center justify-between gap-2 px-3 py-2.5 text-sm transition-colors ${isActive
                                            ? "bg-light-blue text-dark-blue font-medium"
                                            : "text-dark-gray hover:bg-light-blue hover:text-dark-blue"
                                        }`
                                    }
                                >
                                    <span>
                                        Refund Requests
                                    </span>

                                    <ChevronRight
                                        size={15}
                                        strokeWidth={1.8}
                                    />
                                </NavLink>

                                {/* Refill Requests */}
                                <NavLink
                                    to="/admin/refill-requests"
                                    className={({ isActive }) =>
                                        `flex items-center justify-between gap-2 px-3 py-2.5 text-sm transition-colors ${isActive
                                            ? "bg-light-blue text-dark-blue font-medium"
                                            : "text-dark-gray hover:bg-light-blue hover:text-dark-blue"
                                        }`
                                    }
                                >
                                    <span>
                                        Refill Requests
                                    </span>

                                    <ChevronRight
                                        size={15}
                                        strokeWidth={1.8}
                                    />
                                </NavLink>
                            </div>
                        )}
                    </li>
                </ul>
            </div>

            {/* Logout */}
            <div className="flex flex-col justify-center items-center">
                <NavLink
                    to="/admin/logout"
                    end
                    title="Logout"
                    aria-label="Logout"
                    className={({ isActive }) =>
                        isActive
                            ? "text-dark-blue p-2 rounded-md cursor-pointer block"
                            : "text-red-500 p-2 rounded-md cursor-pointer block hover:text-red-600 transition-colors"
                    }
                >
                    <LogOut
                        size={20}
                        strokeWidth={1.9}
                    />
                </NavLink>
            </div>
        </aside>
    );
}

export default AdminSidebar;