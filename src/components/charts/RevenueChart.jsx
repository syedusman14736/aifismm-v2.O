
import { useEffect, useMemo, useState } from "react";

import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";

import { useCurrency } from "../../context/CurrencyContext";

const API_URL =
    import.meta.env.VITE_API_URL ||
    "http://localhost:4040/api";

export default function RevenueChart() {
    const {
        currency: selectedCurrency,
        convertFromUSD,
        formatCurrency,
    } = useCurrency();

    const [chartData, setChartData] = useState([]);
    const [totalSpending, setTotalSpending] = useState(0);
    const [percentageChange, setPercentageChange] = useState(0);
    const [loading, setLoading] = useState(true);

    // ==========================================
    // FETCH SPENDING DATA
    // ==========================================

    useEffect(() => {
        const fetchSpending = async () => {
            try {
                const token =
                    localStorage.getItem("aifi_token");

                if (!token) {
                    setLoading(false);
                    return;
                }

                const response = await fetch(
                    `${API_URL}/dashboard/spending`,
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    }
                );

                const data = await response.json();

                if (!response.ok || !data.success) {
                    throw new Error(
                        data.message ||
                        "Unable to fetch spending data."
                    );
                }

                setChartData(
                    data.spending?.chartData || []
                );

                // Backend amount is USD
                setTotalSpending(
                    Number(data.spending?.total || 0)
                );

                setPercentageChange(
                    Number(
                        data.spending?.percentageChange || 0
                    )
                );
            } catch (error) {
                console.error(
                    "Fetch Spending Error:",
                    error
                );

                setChartData([]);
                setTotalSpending(0);
                setPercentageChange(0);
            } finally {
                setLoading(false);
            }
        };

        fetchSpending();
    }, []);

    // ==========================================
    // CONVERT CHART DATA
    // USD -> SELECTED CURRENCY
    // ==========================================

    const convertedChartData = useMemo(() => {
        return chartData.map((item) => ({
            ...item,
            spending: convertFromUSD(
                Number(item.spending) || 0
            ),
        }));
    }, [
        chartData,
        convertFromUSD,
        selectedCurrency,
    ]);

    // ==========================================
    // DYNAMIC Y-AXIS
    // ==========================================

    const maxSpending = convertedChartData.length
        ? Math.max(
            ...convertedChartData.map(
                (item) =>
                    Number(item.spending) || 0
            )
        )
        : 0;

    const getYAxisMax = (value) => {
        if (value <= 0) {
            return 1;
        }

        if (value < 0.01) {
            return Math.ceil(value * 1000) / 1000;
        }

        if (value < 0.1) {
            return Math.ceil(value * 100) / 100;
        }

        if (value < 1) {
            return Math.ceil(value * 10) / 10;
        }

        if (value <= 10) {
            return Math.ceil(value);
        }

        if (value <= 100) {
            return Math.ceil(value / 10) * 10;
        }

        if (value <= 500) {
            return 500;
        }

        if (value <= 1000) {
            return 1000;
        }

        if (value <= 5000) {
            return (
                Math.ceil(value / 1000) * 1000
            );
        }

        if (value <= 10000) {
            return (
                Math.ceil(value / 2000) * 2000
            );
        }

        if (value <= 50000) {
            return (
                Math.ceil(value / 10000) * 10000
            );
        }

        if (value <= 100000) {
            return (
                Math.ceil(value / 20000) * 20000
            );
        }

        if (value <= 500000) {
            return (
                Math.ceil(value / 100000) * 100000
            );
        }

        if (value <= 1000000) {
            return (
                Math.ceil(value / 200000) * 200000
            );
        }

        return (
            Math.ceil(value / 1000000) * 1000000
        );
    };

    const yAxisMax = getYAxisMax(maxSpending);

    const formatYAxis = (value) => {
        if (value === 0) {
            return "0";
        }

        if (value >= 1000000) {
            return `${Number(
                (value / 1000000).toFixed(1)
            )}M`;
        }

        if (value >= 1000) {
            return `${Number(
                (value / 1000).toFixed(1)
            )}k`;
        }

        if (value < 1) {
            return Number(
                value.toFixed(6)
            ).toString();
        }

        return value.toLocaleString("en-PK");
    };

    // ==========================================
    // FORMAT CHART CURRENCY
    // ==========================================

    const formatChartCurrency = (value) => {
        const number = Number(value);

        if (!Number.isFinite(number)) {
            return `${selectedCurrency?.symbol || "$"} 0`;
        }

        let precision = 2;

        if (number < 1) {
            precision = 8;
        } else if (number < 100) {
            precision = 2;
        }

        const formatted = number
            .toFixed(precision)
            .replace(/\.?0+$/, "");

        return `${selectedCurrency?.symbol || "$"} ${formatted}`;
    };

    // ==========================================
    // CUSTOM TOOLTIP
    // ==========================================

    const CustomTooltip = ({
        active,
        payload,
        label,
    }) => {
        if (!active || !payload?.length) {
            return null;
        }

        return (
            <div className="rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-xl sm:px-4 sm:py-3">
                <p className="text-xs font-semibold text-slate-800 sm:text-sm">
                    {formatChartCurrency(
                        payload[0].value
                    )}
                </p>

                <p className="mt-1 text-[10px] text-slate-500 sm:text-xs">
                    {label}, 2026
                </p>
            </div>
        );
    };

    const isIncrease = percentageChange >= 0;

    return (
        <div className="w-full min-w-0 rounded-md border border-light-azure bg-light-blue px-3 py-3 sm:px-4 sm:py-4">

            {/* Header */}
            <div className="mb-4 flex min-w-0 items-start justify-between gap-3 sm:mb-5">

                <div className="min-w-0">

                    <h2 className="text-xs text-dark-gray">
                        Total Spending Overview
                    </h2>

                    <div className="mt-3 sm:mt-4">

                        <h3 className="text-xl font-medium tracking-tight text-[#252525] sm:text-2xl">
                            {loading
                                ? formatCurrency(0)
                                : formatCurrency(
                                    totalSpending
                                )}
                        </h3>

                        <p className="text-[10px] text-dark-gray sm:text-xs">

                            <span
                                className={`font-medium ${isIncrease
                                    ? "text-emerald-600"
                                    : "text-red-500"
                                    }`}
                            >
                                {isIncrease
                                    ? "↑"
                                    : "↓"}{" "}
                                {Math.abs(
                                    percentageChange
                                ).toFixed(1)}
                                %
                            </span>{" "}

                            vs previous 30 days

                        </p>

                    </div>

                </div>

                {/* Filter */}
                <button
                    className="
                        shrink-0
                        whitespace-nowrap
                        rounded-md
                        border
                        border-[#dfe2e5]
                        bg-white
                        px-2.5
                        py-2
                        text-[10px]
                        font-medium
                        text-[#57595a]
                        transition
                        hover:bg-slate-50
                        cursor-pointer
                        sm:px-3
                        sm:py-2.5
                        sm:text-xs
                    "
                >
                    Last 30 days
                </button>

            </div>

            {/* Responsive Chart */}
            <div className="w-full min-w-0 aspect-[1.45/1] sm:aspect-[2/1] lg:aspect-[2.5/1]">

                <ResponsiveContainer
                    width="100%"
                    height="100%"
                    className="outline-none focus:outline-none"
                >

                    <AreaChart
                        data={convertedChartData}
                        margin={{
                            top: 0,
                            right: 0,
                            left: 5,
                            bottom: 0,
                        }}
                        style={{
                            outline: "none",
                        }}
                    >

                        {/* Gradient */}
                        <defs>
                            <linearGradient
                                id="spendingGradient"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="0%"
                                    stopColor="#4980f7"
                                    stopOpacity={0.22}
                                />

                                <stop
                                    offset="100%"
                                    stopColor="#4980f7"
                                    stopOpacity={0}
                                />
                            </linearGradient>
                        </defs>

                        {/* Grid */}
                        <CartesianGrid
                            vertical={false}
                            stroke="#e2e8f0"
                            strokeDasharray="4 6"
                        />

                        {/* X Axis */}
                        <XAxis
                            dataKey="date"
                            axisLine={false}
                            tickLine={false}
                            tick={{
                                fill: "#64748b",
                                fontSize: 10,
                            }}
                            interval="preserveStartEnd"
                            minTickGap={20}
                            padding={{
                                left: 0,
                                right: 0,
                            }}
                            dy={8}
                        />

                        {/* Y Axis */}
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            width={35}
                            domain={[0, yAxisMax]}
                            tick={{
                                fill: "#64748b",
                                fontSize: 10,
                            }}
                            tickFormatter={formatYAxis}
                            tickCount={6}
                        />

                        {/* Tooltip */}
                        <Tooltip
                            content={<CustomTooltip />}
                            cursor={{
                                stroke: "#cbd5e1",
                                strokeWidth: 1,
                                strokeDasharray: "5 5",
                            }}
                        />

                        {/* Spending Area */}
                        <Area
                            type="monotone"
                            dataKey="spending"
                            stroke="#4980f7"
                            strokeWidth={1.5}
                            fill="url(#spendingGradient)"
                            activeDot={{
                                r: 5,
                                fill: "#4980f7",
                                stroke: "#ffffff",
                                strokeWidth: 3,
                            }}
                        />

                    </AreaChart>

                </ResponsiveContainer>

            </div>

        </div>
    );
}
