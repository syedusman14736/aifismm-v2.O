import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";
import { ChevronDown } from "lucide-react";



export default function RevenueChart() {

    const chartData = [
        { date: "Jul 21", revenue: 42000 },
        { date: "Jul 22", revenue: 51000 },
        { date: "Jul 23", revenue: 45000 },
        { date: "Jul 24", revenue: 47000 },
        { date: "Jul 25", revenue: 50000 },
        { date: "Jul 26", revenue: 54000 },
        { date: "Jul 27", revenue: 48000 },
        { date: "Jul 28", revenue: 49000 },
        { date: "Jul 29", revenue: 55000 },
        { date: "Jul 30", revenue: 52000 },
        { date: "Jul 31", revenue: 58000 },
        { date: "Aug 01", revenue: 53000 },
        { date: "Aug 02", revenue: 60000 },
        { date: "Aug 03", revenue: 55000 },
        { date: "Aug 04", revenue: 62000 },
        { date: "Aug 05", revenue: 58000 },
        { date: "Aug 06", revenue: 64000 },
        { date: "Aug 07", revenue: 72000 },
        { date: "Aug 08", revenue: 65000 },
        { date: "Aug 09", revenue: 78000 },
        { date: "Aug 10", revenue: 74000 },
        { date: "Aug 11", revenue: 82000 },
        { date: "Aug 12", revenue: 68000 },
        { date: "Aug 13", revenue: 75000 },
        { date: "Aug 14", revenue: 63000 },
        { date: "Aug 15", revenue: 88000 },
        { date: "Aug 16", revenue: 85000 },
        { date: "Aug 17", revenue: 92000 },
        { date: "Aug 18", revenue: 95000 },
        { date: "Aug 19", revenue: 97000 },
        { date: "Aug 20", revenue: 110000 },
    ];

    const formatCurrency = (value) => {
        return `PKR ${value.toLocaleString()}`;
    };

    const CustomTooltip = ({ active, payload, label }) => {
        if (!active || !payload?.length) return null;

        return (
            <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-xl">
                <p className="text-sm font-semibold text-slate-800">
                    {formatCurrency(payload[0].value)}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                    {label}, 2026
                </p>
            </div>
        );
    };

    return (
        <div className="w-full flex flex-col flex-1 rounded-md border border-[#dfe2e5] px-4 py-3 ">

            {/* Header */}
            <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                    <h2 className="text-sm  text-[#57595a]">
                        Total Revenue Overview
                    </h2>

                    <div className="mt-4">


                        <h3 className="mt-1 text-2xl font-medium tracking-tight text-[#252525]">
                            PKR 87,900
                        </h3>

                        <p className=" text-xs text-[#57595a]">
                            <span className="font-medium text-emerald-600">
                                ↑ 15.6%
                            </span>{" "}
                            vs last 30 days
                        </p>
                    </div>
                </div>

                {/* Filter */}
                <button
                    className="
            flex items-center gap-2 rounded-md border border-[#dfe2e5]
            bg-white px-3 py-2.5 text-xs font-medium text-[#57595a]
            transition hover:bg-slate-50 cursor-pointer"
                >
                    Last 30 days
                    {/* <ChevronDown size={14} /> */}
                </button>
            </div>

            {/* Chart */}
            <div className=" w-full flex-1">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={chartData}
                        margin={{
                            top: 15,
                            right: 15,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                        <defs>
                            <linearGradient
                                id="revenueGradient"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="0%"
                                    stopColor="#f97316"
                                    stopOpacity={0.22}
                                />

                                <stop
                                    offset="100%"
                                    stopColor="#f97316"
                                    stopOpacity={0}
                                />
                            </linearGradient>
                        </defs>

                        <CartesianGrid
                            vertical={false}
                            stroke="#e2e8f0"
                            strokeDasharray="4 6"
                        />

                        <XAxis
                            dataKey="date"
                            axisLine={false}
                            tickLine={false}
                            tick={{
                                fill: "#64748b",
                                fontSize: 12,
                            }}
                            interval={4}
                            dy={10}
                        />

                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            width={75}
                            tick={{
                                fill: "#64748b",
                                fontSize: 12,
                            }}
                            tickFormatter={(value) => {
                                if (value === 0) return "PKR 0K";

                                return `PKR ${value / 1000}K`;
                            }}
                        />

                        <Tooltip
                            content={<CustomTooltip />}
                            cursor={{
                                stroke: "#cbd5e1",
                                strokeWidth: 1,
                                strokeDasharray: "5 5",
                            }}
                        />

                        <Area
                            type="monotone"
                            dataKey="revenue"
                            stroke="#f97316"
                            strokeWidth={0.8}
                            fill="url(#revenueGradient)"
                            activeDot={{
                                r: 5,
                                fill: "#f97316",
                                stroke: "#ffffff",
                                strokeWidth: 3,
                            }}
                            dot={{
                                r: 0,
                                fill: "#ffffff",
                                stroke: "#f97316",
                                strokeWidth: 1,
                            }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}