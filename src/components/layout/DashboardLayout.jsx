import { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { useCurrency } from "../../context/CurrencyContext";

import RevenueChart from "../charts/RevenueChart";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import MobileNavigation from "./MobileNavigation";

import Arrow from "/src/assets/icons/arrow.svg?react";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

function DashboardLayout() {
  const { user } = useAuthContext();

  const {
    currency: selectedCurrency,
    formatCurrency,
  } = useCurrency();

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==========================================
  // FETCH DASHBOARD STATS
  // ==========================================

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      setError("");

      const token =
        localStorage.getItem("aifi_token");

      if (!token) {
        setError(
          "Authentication token not found."
        );
        return;
      }

      const response = await fetch(
        `${API_URL}/dashboard/stats`,
        {
          method: "GET",

          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
          "Unable to fetch dashboard stats."
        );
      }

      if (!data.success) {
        throw new Error(
          data.message ||
          "Unable to fetch dashboard stats."
        );
      }

      setStats(data.stats);
    } catch (error) {
      console.error(
        "Dashboard Stats Error:",
        error
      );

      setError(
        error.message ||
        "Unable to load dashboard data."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // INITIAL FETCH
  // ==========================================

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  // ==========================================
  // DASHBOARD DATA
  // ==========================================

  const username =
    stats?.username ||
    user?.username ||
    "username";

  const totalOrders =
    stats?.totalOrders ?? 0;

  const balance =
    stats?.balance ??
    user?.balance ??
    0;

  const totalSpent =
    stats?.totalSpent ?? 0;

  // ==========================================
  // FORMAT NUMBER
  // ==========================================

  const formatMoney = (value) => {
    const number = Number(value);

    if (!Number.isFinite(number)) {
      return "0";
    }

    return number.toLocaleString("en-PK", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 6,
    });
  };

  // ==========================================
  // FORMAT TOTAL SPENT
  // ==========================================

  const formatSpent = (value) => {
    const number = Number(value || 0);

    if (number >= 1000000) {
      return `${(
        number / 1000000
      ).toFixed(1)}M`;
    }

    if (number >= 1000) {
      return `${(
        number / 1000
      ).toFixed(1)}K`;
    }

    return formatMoney(number);
  };

  // ==========================================
  // FORMAT TOTAL SPENT IN SELECTED CURRENCY
  // ==========================================

  const formatSpentCurrency = (value) => {
    const number = Number(value || 0);

    if (!Number.isFinite(number)) {
      return formatCurrency(0);
    }

    // Keep the compact K/M display,
    // but convert the actual PKR value first.

    const rate =
      Number(selectedCurrency?.rate);

    if (
      !Number.isFinite(rate) ||
      rate <= 0
    ) {
      return formatCurrency(number);
    }

    const converted =
      number / rate;

    if (converted >= 1000000) {
      return `${selectedCurrency?.symbol || "Rs"} ${(
        converted / 1000000
      ).toFixed(1)}M`;
    }

    if (converted >= 1000) {
      return `${selectedCurrency?.symbol || "Rs"} ${(
        converted / 1000
      ).toFixed(1)}K`;
    }

    return formatCurrency(number);
  };

  // ==========================================
  // CURRENT DATE
  // ==========================================

  const currentDate =
    new Date().toLocaleDateString(
      "en-US",
      {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }
    );

  return (
    <div className="flex h-svh bg-bg w-full overflow-hidden">

      {/* Desktop Sidebar */}
      <div className="hidden md:block shrink-0">
        <Sidebar />
      </div>

      {/* Main Dashboard Area */}
      <div className="flex min-w-0 flex-1 flex-col h-full">

        <Topbar />

        <main className="hide-scrollbar flex-1 min-w-0 overflow-y-auto px-3 py-3 sm:px-4 md:px-4 md:py-3 pb-16 md:pb-3">

          <div className="leading-5.5">

            <h1 className="text-[18px] text-dark-blue font-medium">
              Hey, {user?.name || "User"} 👋
            </h1>

            <p className="text-[12px] text-dark-gray">
              {currentDate}
            </p>

          </div>

          {error && (
            <div className="mt-3 rounded-md border border-red-200 bg-light-blue px-3 py-2">
              <p className="text-[11px] md:text-xs text-red-600">
                {error}
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 my-3">

            {/* Username */}

            <div className="min-w-0 rounded-md border border-light-azure overflow-hidden">

              <div className="flex flex-col gap-1 px-3 sm:px-4 py-3 bg-light-blue">

                <p className="text-[11px] text-dark-gray">
                  Username
                </p>

                <h1 className="text-[18px] lg:text-[20px] font-medium text-dark-blue truncate">

                  <span className="text-[14px] md:text-[16px]">
                    @
                  </span>

                  {loading
                    ? "..."
                    : username}

                </h1>

              </div>

              <div className="flex justify-between items-center bg-light-blue px-3 sm:px-4 py-2 cursor-pointer rounded-b-md border-t border-light-azure min-w-0">

                <p className="text-[11px] md:text-xs text-dark-blue w-full truncate">
                  View Profile
                </p>

                <span className="text-dark-gray shrink-0 ml-2">
                  <Arrow />
                </span>

              </div>

            </div>

            {/* Total Orders */}

            <div className="min-w-0 rounded-md border border-light-azure overflow-hidden">

              <div className="flex flex-col gap-1 px-3 sm:px-4 py-3 bg-light-blue">

                <p className="text-[11px] md:text-xs text-dark-gray">
                  Total Orders
                </p>

                <h1 className="text-[18px] lg:text-[20px] font-medium text-dark-blue truncate">

                  {loading
                    ? "..."
                    : totalOrders.toLocaleString(
                      "en-PK"
                    )}

                </h1>

              </div>

              <div className="flex justify-between items-center bg-light-blue px-3 sm:px-4 py-2 cursor-pointer rounded-b-md border-t border-light-azure min-w-0">

                <p className="text-[11px] md:text-xs text-dark-blue w-full truncate">
                  View Order History
                </p>

                <span className="text-dark-gray shrink-0 ml-2">
                  <Arrow />
                </span>

              </div>

            </div>

            {/* Current Balance */}

            <div className="min-w-0 rounded-md border border-light-azure overflow-hidden">

              <div className="flex flex-col gap-1 px-3 sm:px-4 py-3 bg-light-blue">

                <p className="text-[11px] md:text-xs text-dark-gray">
                  Current Balance
                </p>

                <h1 className="text-[18px] lg:text-[20px] font-medium text-dark-blue truncate">

                  {loading
                    ? "..."
                    : formatCurrency(
                      balance
                    )}

                </h1>

              </div>

              <div className="flex justify-between items-center bg-light-blue px-3 sm:px-4 py-2 cursor-pointer rounded-b-md border-t border-light-azure min-w-0">

                <p className="text-[11px] md:text-xs text-dark-blue w-full truncate">
                  Add more Balance
                </p>

                <span className="text-dark-gray shrink-0 ml-2">
                  <Arrow />
                </span>

              </div>

            </div>

            {/* Total Spent */}

            <div className="min-w-0 rounded-md border border-light-azure overflow-hidden">

              <div className="flex flex-col gap-1 px-3 sm:px-4 py-3 bg-light-blue">

                <p className="text-[11px] md:text-xs text-dark-gray">
                  Total Spent
                </p>

                <h1 className="text-[18px] lg:text-[20px] font-medium text-dark-blue truncate">

                  {loading
                    ? "..."
                    : formatSpentCurrency(
                      totalSpent
                    )}

                </h1>

              </div>

              <div className="flex justify-between items-center bg-light-blue px-3 sm:px-4 py-2 cursor-pointer rounded-b-md border-t border-light-azure min-w-0">

                <p className="text-[11px] md:text-xs text-dark-blue w-full truncate">
                  Place New Order
                </p>

                <span className="text-dark-gray shrink-0 ml-2">
                  <Arrow />
                </span>

              </div>

            </div>

          </div>

          <RevenueChart />

        </main>

      </div>

      <MobileNavigation />

    </div>
  );
}

export default DashboardLayout;