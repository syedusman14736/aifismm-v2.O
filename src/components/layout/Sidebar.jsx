import {
    Activity,
    Home,
    PlusCircle,
    History,
    Wallet,
    ReceiptText,
    LogOut,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

function Sidebar() {
    const { logout } = useAuthContext();

    const handleLogout = () => {
        logout();
    };

    return (
        <aside className="bg-light-blue border-r border-light-azure h-full w-auto px-2 py-2 flex flex-col justify-between items-center">

            <div className="flex flex-col justify-center items-center">

                {/* Logo */}
                <div className="text-light-blue flex py-2 justify-center items-center w-full text-center bg-dark-blue rounded-md">
                    <Activity size={20} />
                </div>

                {/* Navigation */}
                <ul className="flex flex-col gap-2 mt-5 items-center justify-center">

                    <NavLink
                        to="/dashboard"
                        end
                        className={({ isActive }) =>
                            isActive
                                ? "text-dark-blue p-2 rounded-md cursor-pointer"
                                : "text-gray p-2 rounded-md cursor-pointer"
                        }
                    >
                        <Home size={20} />
                    </NavLink>

                    <NavLink
                        to="/dashboard/new-order"
                        end
                        className={({ isActive }) =>
                            isActive
                                ? "text-dark-blue p-2 rounded-md cursor-pointer"
                                : "text-dark-gray p-2 rounded-md cursor-pointer"
                        }
                    >
                        <PlusCircle size={20} />
                    </NavLink>

                    <NavLink
                        to="/dashboard/order-history"
                        end
                        className={({ isActive }) =>
                            isActive
                                ? "text-dark-blue p-2 rounded-md cursor-pointer"
                                : "text-dark-gray p-2 rounded-md cursor-pointer"
                        }
                    >
                        <History size={20} />
                    </NavLink>

                    <NavLink
                        to="/dashboard/add-funds"
                        end
                        className={({ isActive }) =>
                            isActive
                                ? "text-dark-blue p-2 rounded-md cursor-pointer"
                                : "text-dark-gray p-2 rounded-md cursor-pointer"
                        }
                    >
                        <Wallet size={20} />
                    </NavLink>

                    <NavLink
                        to="/dashboard/payment-history"
                        end
                        className={({ isActive }) =>
                            isActive
                                ? "text-dark-blue p-2 rounded-md cursor-pointer"
                                : "text-dark-gray p-2 rounded-md cursor-pointer"
                        }
                    >
                        <ReceiptText size={20} />
                    </NavLink>

                </ul>
            </div>

            {/* Logout */}
            <div className="flex flex-col justify-center items-center">

                <button
                    type="button"
                    onClick={handleLogout}
                    className="text-red-500 p-2 rounded-md cursor-pointer hover:bg-red-50 transition-colors"
                    aria-label="Logout"
                    title="Logout"
                >
                    <LogOut size={20} />
                </button>

            </div>

        </aside>
    );
}

export default Sidebar;