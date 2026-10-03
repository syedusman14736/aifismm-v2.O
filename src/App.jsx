import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import VerifyWhatsApp from "./pages/auth/VerifyWhatsApp";
import ForgotPassword from "./pages/auth/ForgotPassword";
import VerifyResetOtp from "./pages/auth/VerifyResetOtp";
import ResetPassword from "./pages/auth/ResetPassword";

import DashboardLayout from "./components/layout/DashboardLayout";

import NewOrder from "./features/new-order/NewOrder";
import OrderHistory from "./features/order-history/OrderHistory";
import AddFunds from "./features/add-funds/AddFunds";
import PaymentHistory from "./features/payment-history/PaymentHistory";
import Profile from "./features/profile/Profile";

import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";

import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/Dashboard/AdminDashboard";
import AdminServices from "./pages/admin/Services/AdminServices";
import AdminPlatforms from "./pages/admin/Platforms/AdminPlatforms";
import AdminProviders from "./pages/admin/Providers/AdminProviders";

import AdminRefundRequests from "./pages/admin/Requests/AdminRefundRequests";
import AdminRefillRequests from "./pages/admin/Requests/AdminRefillRequests";
import AdminRoute from "./routes/AdminRoute";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* =====================================================
                            PUBLIC ROUTES
        ===================================================== */}

        <Route element={<PublicRoute />}>

          <Route
            path="/"
            element={<div className="h-screen flex justify-center items-center text-xl font-medium text-dark-gray"><div className="flex flex-col justify-center items-center gap-2">Coming Soon <a className="underline text-primary-blue" href="/signup">Signup Now</a></div></div>}
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/signup"
            element={<Signup />}
          />

          <Route
            path="/forgot-password"
            element={<ForgotPassword />}
          />

          <Route
            path="/verify-whatsapp"
            element={<VerifyWhatsApp />}
          />

          <Route
            path="/verify-reset-otp"
            element={<VerifyResetOtp />}
          />

          <Route
            path="/reset-password"
            element={<ResetPassword />}
          />

        </Route>


        {/* =====================================================
                            USER ROUTES
        ===================================================== */}

        <Route element={<ProtectedRoute />}>

          <Route
            path="/dashboard"
            element={<DashboardLayout />}
          />

          <Route
            path="/dashboard/new-order"
            element={<NewOrder />}
          />

          <Route
            path="/dashboard/order-history"
            element={<OrderHistory />}
          />

          <Route
            path="/dashboard/add-funds"
            element={<AddFunds />}
          />

          <Route
            path="/dashboard/payment-history"
            element={<PaymentHistory />}
          />

          <Route
            path="/dashboard/profile"
            element={<Profile />}
          />

        </Route>


        {/* =====================================================
                            ADMIN ROUTES
        ===================================================== */}

        <Route element={<AdminRoute />}>

          <Route
            path="/admin"
            element={<AdminLayout />}
          >

            <Route
              index
              element={<AdminDashboard />}
            />

            <Route
              path="services"
              element={<AdminServices />}
            />

            <Route
              path="providers"
              element={<AdminProviders />}
            />

            <Route
              path="platforms"
              element={<AdminPlatforms />}
            />

            <Route
              path="refund-requests"
              element={<AdminRefundRequests />}
            />

            <Route
              path="refill-requests"
              element={<AdminRefillRequests />}
            />

          </Route>

        </Route>


        {/* =====================================================
                            DEFAULT ROUTE
        ===================================================== */}

        <Route
          path="/"
          element={
            <Navigate
              to="/dashboard"
              replace
            />
          }
        />


        {/* =====================================================
                            404 FALLBACK
        ===================================================== */}

        <Route
          path="*"
          element={
            <Navigate
              to="/dashboard"
              replace
            />
          }
        />

      </Routes>
    </BrowserRouter >
  );
};


export default App;