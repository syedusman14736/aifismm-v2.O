import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const PublicRoute = () => {
    const {
        loading,
        isAuthenticated,
    } = useAuthContext();

    // Auth check complete hone ka wait
    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-white">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-orange-500" />
            </div>
        );
    }

    // Already logged in
    if (isAuthenticated) {
        return (
            <Navigate
                to="/dashboard"
                replace
            />
        );
    }

    // Not logged in
    return <Outlet />;
};

export default PublicRoute;