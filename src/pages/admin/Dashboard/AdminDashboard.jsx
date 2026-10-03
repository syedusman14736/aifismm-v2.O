import {
    Boxes,
    Server,
    ShoppingCart,
    Globe2,
    ArrowUpRight,
    Activity,
} from "lucide-react";

import { Link } from "react-router-dom";

function AdminDashboard() {

    const stats = [
        {
            title: "Total Services",
            value: "424",
            icon: Boxes,
            link: "/admin/services",
        },
        {
            title: "Providers",
            value: "0",
            icon: Server,
            link: "/admin/providers",
        },
        {
            title: "Platforms",
            value: "4",
            icon: Globe2,
            link: "/admin/platforms",
        },
        {
            title: "Total Orders",
            value: "0",
            icon: ShoppingCart,
            link: "/admin/orders",
        },
    ];

    const quickActions = [
        {
            title: "Manage Services",
            description: "View, edit and manage your services.",
            icon: Boxes,
            link: "/admin/services",
        },
        {
            title: "Manage Providers",
            description: "Manage SMM service providers.",
            icon: Server,
            link: "/admin/providers",
        },
        {
            title: "Manage Platforms",
            description: "Manage Instagram, TikTok and other platforms.",
            icon: Globe2,
            link: "/admin/platforms",
        },
        {
            title: "Manage Orders",
            description: "View and manage customer orders.",
            icon: ShoppingCart,
            link: "/admin/orders",
        },
    ];

    return (
        <div className="space-y-5">

            {/* Header */}
            <div className="flex flex-col gap-1">
                <h1 className="text-primary text-xl sm:text-2xl font-semibold">
                    Admin Dashboard
                </h1>

                <p className="text-dark-gray text-sm">
                    Manage your AiFi SMM panel from here.
                </p>
            </div>


            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">

                {stats.map((item) => {

                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.title}
                            to={item.link}
                            className="bg-light-blue border border-light-azure rounded-xl p-4 sm:p-5 hover:border-gray-blue transition-colors"
                        >

                            <div className="flex items-start justify-between gap-3">

                                <div className="min-w-0">

                                    <p className="text-dark-gray text-xs sm:text-sm">
                                        {item.title}
                                    </p>

                                    <h2 className="text-primary text-xl sm:text-2xl font-semibold mt-2">
                                        {item.value}
                                    </h2>

                                </div>

                                <div className="shrink-0 p-2 rounded-lg bg-bg text-primary">
                                    <Icon
                                        size={19}
                                        strokeWidth={1.8}
                                    />
                                </div>

                            </div>

                            <div className="flex items-center gap-1 mt-4 text-xs text-dark-gray">
                                <span>View details</span>

                                <ArrowUpRight
                                    size={13}
                                    strokeWidth={1.8}
                                />
                            </div>

                        </Link>
                    );
                })}

            </div>


            {/* Main Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">


                {/* Quick Actions */}
                <div className="xl:col-span-2 bg-light-blue border border-light-azure rounded-xl p-4 sm:p-5">

                    <div className="flex items-center justify-between mb-4">

                        <div>
                            <h2 className="text-primary font-semibold text-base sm:text-lg">
                                Quick Actions
                            </h2>

                            <p className="text-dark-gray text-xs sm:text-sm mt-1">
                                Quickly access important admin sections.
                            </p>
                        </div>

                    </div>


                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                        {quickActions.map((item) => {

                            const Icon = item.icon;

                            return (
                                <Link
                                    key={item.title}
                                    to={item.link}
                                    className="group border border-light-azure rounded-lg p-4 bg-bg hover:border-gray-blue transition-colors"
                                >

                                    <div className="flex items-start gap-3">

                                        <div className="shrink-0 p-2 rounded-lg bg-light-blue text-primary">
                                            <Icon
                                                size={18}
                                                strokeWidth={1.8}
                                            />
                                        </div>

                                        <div className="min-w-0">

                                            <div className="flex items-center gap-1.5">

                                                <h3 className="text-primary text-sm font-medium">
                                                    {item.title}
                                                </h3>

                                                <ArrowUpRight
                                                    size={13}
                                                    className="text-dark-gray group-hover:text-primary transition-colors"
                                                    strokeWidth={1.8}
                                                />

                                            </div>

                                            <p className="text-dark-gray text-xs mt-1 leading-5">
                                                {item.description}
                                            </p>

                                        </div>

                                    </div>

                                </Link>
                            );
                        })}

                    </div>

                </div>


                {/* System Status */}
                <div className="bg-light-blue border border-light-azure rounded-xl p-4 sm:p-5">

                    <div className="flex items-center gap-2">

                        <div className="p-2 rounded-lg bg-bg text-primary">
                            <Activity
                                size={18}
                                strokeWidth={1.8}
                            />
                        </div>

                        <div>
                            <h2 className="text-primary font-semibold text-base">
                                System Status
                            </h2>

                            <p className="text-dark-gray text-xs mt-0.5">
                                Current system overview
                            </p>
                        </div>

                    </div>


                    <div className="mt-5 space-y-3">

                        {/* API */}
                        <div className="flex items-center justify-between py-2 border-b border-light-azure">

                            <span className="text-dark-gray text-sm">
                                API
                            </span>

                            <div className="flex items-center gap-1.5">

                                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />

                                <span className="text-xs text-dark-gray">
                                    Operational
                                </span>

                            </div>

                        </div>


                        {/* Database */}
                        <div className="flex items-center justify-between py-2 border-b border-light-azure">

                            <span className="text-dark-gray text-sm">
                                Database
                            </span>

                            <div className="flex items-center gap-1.5">

                                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />

                                <span className="text-xs text-dark-gray">
                                    Connected
                                </span>

                            </div>

                        </div>


                        {/* Services */}
                        <div className="flex items-center justify-between py-2">

                            <span className="text-dark-gray text-sm">
                                Services
                            </span>

                            <div className="flex items-center gap-1.5">

                                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />

                                <span className="text-xs text-dark-gray">
                                    Active
                                </span>

                            </div>

                        </div>

                    </div>

                </div>

            </div>


            {/* Recent Activity */}
            <div className="bg-light-blue border border-light-azure rounded-xl p-4 sm:p-5">

                <div className="flex items-center justify-between mb-4">

                    <div>
                        <h2 className="text-primary font-semibold text-base sm:text-lg">
                            Recent Activity
                        </h2>

                        <p className="text-dark-gray text-xs sm:text-sm mt-1">
                            Latest admin activity will appear here.
                        </p>
                    </div>

                </div>


                <div className="border border-light-azure rounded-lg bg-bg px-4 py-8 flex flex-col items-center justify-center text-center">

                    <div className="p-2.5 rounded-full bg-light-blue text-dark-gray mb-3">
                        <Activity
                            size={19}
                            strokeWidth={1.8}
                        />
                    </div>

                    <p className="text-primary text-sm font-medium">
                        No recent activity
                    </p>

                    <p className="text-dark-gray text-xs mt-1">
                        Admin actions will be displayed here.
                    </p>

                </div>

            </div>

        </div>
    );
}

export default AdminDashboard;