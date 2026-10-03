import {
    User,
    Bell,
} from "lucide-react";

import { Link } from "react-router-dom";

function AdminTopbar() {
    return (
        <header className="bg-light-blue px-3 sm:px-4 py-2 sm:py-3 border-b border-light-azure flex justify-between items-center shrink-0">

            {/* Breadcrumb */}
            <div className="flex gap-1 items-center justify-center min-w-0">

                <h1 className="text-dark-blue font-medium text-[14px] md:text-[16px] whitespace-nowrap">
                    AiFi SMM
                </h1>

                <span className="text-dark-gray text-[14px] md:text-[16px]">
                    /
                </span>

                <h1 className="text-dark-gray font-medium text-[14px] md:text-[16px] whitespace-nowrap">
                    Admin
                </h1>

            </div>

            {/* Actions */}
            <div className="flex shrink-0">

                <ul className="flex items-center justify-center gap-2">

                    {/* Notifications */}
                    <li className="text-dark-gray p-1.5 rounded-md cursor-pointer">
                        <Bell
                            size={19}
                            strokeWidth={1.8}
                        />
                    </li>

                    {/* Admin Profile */}
                    <Link
                        to="/admin/profile"
                        className="text-light-blue bg-dark-blue p-1.5 rounded-full cursor-pointer"
                    >
                        <User
                            size={19}
                            strokeWidth={1.8}
                        />
                    </Link>

                </ul>

            </div>

        </header>
    );
}

export default AdminTopbar;