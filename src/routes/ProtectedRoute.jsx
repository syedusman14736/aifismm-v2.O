import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const ProtectedRoute = () => {
    const {
        loading,
        isAuthenticated,
    } = useAuthContext();

    // Auth state load hone ka wait
    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-light-blue">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-primary-blue" />
            </div>
        );
    }

    // User authenticated nahi hai
    if (!isAuthenticated) {
        return (
            <Navigate
                to="/login"
                replace
            />
        );
    }

    // Protected page
    return <Outlet />;
};

export default ProtectedRoute;