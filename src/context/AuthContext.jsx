import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

const AuthContext = createContext(null);

const API_URL =
    import.meta.env.VITE_API_URL ||
    "http://localhost:5000";

const API_BASE_URL = API_URL.endsWith("/api")
    ? API_URL
    : `${API_URL}/api`;

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        try {
            const savedUser =
                localStorage.getItem("aifi_user");

            return savedUser
                ? JSON.parse(savedUser)
                : null;
        } catch (error) {
            console.error(
                "Load Saved User Error:",
                error
            );

            return null;
        }
    });

    const [loading, setLoading] = useState(true);

    const fetchCurrentUser = async () => {
        const token =
            localStorage.getItem("aifi_token");

        if (!token) {
            setUser(null);
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(
                `${API_BASE_URL}/auth/me`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type":
                            "application/json",
                    },
                }
            );

            const data = await response.json();

            console.log(
                "AUTH ME STATUS:",
                response.status
            );

            console.log(
                "AUTH ME RESPONSE:",
                data
            );

            if (!response.ok) {
                if (
                    response.status === 401 ||
                    response.status === 403
                ) {
                    localStorage.removeItem(
                        "aifi_token"
                    );

                    localStorage.removeItem(
                        "aifi_user"
                    );

                    setUser(null);
                }

                return;
            }

            if (data.user) {
                setUser(data.user);

                localStorage.setItem(
                    "aifi_user",
                    JSON.stringify(data.user)
                );
            } else {
                console.error(
                    "Auth /me did not return user:",
                    data
                );
            }
        } catch (error) {
            console.error(
                "Fetch Current User Error:",
                error
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCurrentUser();
    }, []);

    const logout = () => {
        localStorage.removeItem("aifi_token");
        localStorage.removeItem("aifi_user");

        sessionStorage.removeItem(
            "aifi_pending_whatsapp"
        );

        sessionStorage.removeItem(
            "aifi_pending_auth"
        );

        setUser(null);

        window.location.href = "/login";
    };

    const refreshUser = async () => {
        await fetchCurrentUser();
    };

    const updateUserBalance = (balance) => {
        if (
            balance === undefined ||
            balance === null ||
            !Number.isFinite(Number(balance))
        ) {
            return;
        }

        setUser((prevUser) => {
            if (!prevUser) {
                return prevUser;
            }

            const updatedUser = {
                ...prevUser,
                balance: Number(balance),
            };

            localStorage.setItem(
                "aifi_user",
                JSON.stringify(updatedUser)
            );

            return updatedUser;
        });
    };

    const hasToken = Boolean(
        localStorage.getItem("aifi_token")
    );

    const isAuthenticated = hasToken;

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                loading,
                isAuthenticated,
                logout,
                refreshUser,
                updateUserBalance,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    const context =
        useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuthContext must be used inside AuthProvider"
        );
    }

    return context;
};