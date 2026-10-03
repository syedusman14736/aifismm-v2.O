import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const AdminRoute = () => {
    const {
        loading,
        user,
        isAuthenticated,
    } = useAuthContext();

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-light-blue">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-primary-blue" />
            </div>
        );
    }

    // Not logged in
    if (!isAuthenticated) {
        return (
            <Navigate
                to="/login"
                replace
            />
        );
    }

    // Logged in but not admin
    if (user?.role !== "admin") {
        return (
            <Navigate
                to="/dashboard"
                replace
            />
        );
    }

    return <Outlet />;
};

export default AdminRoute;