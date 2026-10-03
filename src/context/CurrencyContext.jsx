import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";

const CurrencyContext = createContext(null);

const API_URL =
    import.meta.env.VITE_API_URL ||
    "http://localhost:4040";

const API_BASE_URL = API_URL.endsWith("/api")
    ? API_URL
    : `${API_URL}/api`;

export const CurrencyProvider = ({ children }) => {
    const [currency, setCurrency] = useState(null);
    const [currencies, setCurrencies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [changing, setChanging] = useState(false);
    const [error, setError] = useState("");

    // ==========================================
    // FETCH AVAILABLE CURRENCIES
    // ==========================================

    const fetchCurrencies = useCallback(async () => {
        try {
            const response = await fetch(
                `${API_BASE_URL}/currencies`
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    "Failed to fetch currencies."
                );
            }

            setCurrencies(data.currencies || []);
        } catch (error) {
            console.error(
                "Currency fetch error:",
                error
            );

            setError(error.message);
        }
    }, []);

    // ==========================================
    // FETCH USER CURRENCY
    // ==========================================

    const fetchUserCurrency = useCallback(async () => {
        try {
            const token =
                localStorage.getItem("aifi_token");

            if (!token) {
                setCurrency(null);
                setLoading(false);
                return;
            }

            const response = await fetch(
                `${API_BASE_URL}/user/currency`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`,
                    },
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    "Failed to fetch user currency."
                );
            }

            setCurrency(data.currency || null);
        } catch (error) {
            console.error(
                "User currency error:",
                error
            );

            setError(error.message);
        } finally {
            setLoading(false);
        }
    }, []);

    // ==========================================
    // INITIAL LOAD
    // ==========================================

    useEffect(() => {
        const loadCurrencyData = async () => {
            await Promise.all([
                fetchCurrencies(),
                fetchUserCurrency(),
            ]);
        };

        loadCurrencyData();
    }, [
        fetchCurrencies,
        fetchUserCurrency,
    ]);

    // ==========================================
    // CHANGE USER CURRENCY
    // ==========================================

    const changeCurrency = async (currencyCode) => {
        try {
            setChanging(true);
            setError("");

            const token =
                localStorage.getItem("aifi_token");

            if (!token) {
                throw new Error(
                    "Authentication required."
                );
            }

            const response = await fetch(
                `${API_BASE_URL}/user/currency`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type":
                            "application/json",
                        Authorization:
                            `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        currency: currencyCode,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    "Failed to update currency."
                );
            }

            setCurrency(data.currency);

            return {
                success: true,
                currency: data.currency,
            };
        } catch (error) {
            console.error(
                "Change currency error:",
                error
            );

            setError(error.message);

            return {
                success: false,
                message: error.message,
            };
        } finally {
            setChanging(false);
        }
    };

    // ==========================================
    // CONVERT USD → SELECTED CURRENCY
    //
    // Example:
    //
    // USD = 1
    // PKR = 278
    //
    // $10 × 278 = Rs 2780
    // ==========================================

    const convertFromUSD = useCallback(
        (amount) => {
            const value = Number(amount);

            if (!Number.isFinite(value)) {
                return 0;
            }

            const rate = Number(currency?.rate);

            // USD is the base currency.
            // If currency data is not ready,
            // keep the original USD amount.
            if (
                !Number.isFinite(rate) ||
                rate <= 0
            ) {
                return value;
            }

            return value * rate;
        },
        [currency]
    );

    // ==========================================
    // FORMAT USD AMOUNT IN SELECTED CURRENCY
    //
    // This function receives USD.
    //
    // Example:
    //
    // formatCurrency(10)
    //
    // PKR → Rs 2780
    // EUR → €9
    // AED → د.إ36.7
    // ==========================================

    const formatCurrency = useCallback(
        (amount, decimals = 8) => {
            const converted =
                convertFromUSD(amount);

            const number = Number(converted);

            if (!Number.isFinite(number)) {
                return `$ 0`;
            }

            let precision = decimals;

            // Normal currency amounts
            if (number >= 1) {
                precision = 2;
            }

            // Small amounts
            else if (number >= 0.01) {
                precision = 4;
            }

            // Very small service prices
            else if (number >= 0.0001) {
                precision = 6;
            }

            // Extremely small service prices
            else {
                precision = 8;
            }

            const formatted = number
                .toFixed(precision)
                .replace(/\.?0+$/, "");

            return `${currency?.symbol || "$"} ${formatted}`;
        },
        [convertFromUSD, currency]
    );

    // ==========================================
    // CONTEXT
    // ==========================================

    return (
        <CurrencyContext.Provider
            value={{
                currency,
                currencies,

                loading,
                changing,
                error,

                fetchCurrencies,
                fetchUserCurrency,
                changeCurrency,

                // USD BASE CONVERSION
                convertFromUSD,

                // USD → SELECTED CURRENCY
                formatCurrency,
            }}
        >
            {children}
        </CurrencyContext.Provider>
    );
};

// ==========================================
// HOOK
// ==========================================

export const useCurrency = () => {
    const context =
        useContext(CurrencyContext);

    if (!context) {
        throw new Error(
            "useCurrency must be used inside CurrencyProvider."
        );
    }

    return context;
};

export default CurrencyContext;