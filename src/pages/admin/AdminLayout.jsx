import React from "react";
import { Outlet } from "react-router-dom";

import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";

const AdminLayout = () => {
    return (
        <div className="min-h-screen bg-bg text-dark-gray">
            <div className="flex min-h-screen">
                {/* Sidebar */}
                <AdminSidebar />

                {/* Main Area */}
                <div className="flex min-w-0 flex-1 flex-col">
                    {/* Topbar */}
                    <AdminTopbar />

                    {/* Page Content */}
                    <main className="min-w-0 flex-1 bg-bg">
                        <div className="mx-auto w-full max-w-[1800px] p-4 sm:p-5 lg:p-6">
                            <Outlet />
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;