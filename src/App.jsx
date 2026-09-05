import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardLayout from "./components/layout/DashboardLayout";
import NewOrder from "./features/new-order/NewOrder";
import OrderHistory from "./features/order-history/OrderHistory";
import AddFunds from "./features/add-funds/AddFunds";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard">

          <Route index element={<DashboardLayout />} />

          <Route
            path="new-order"
            element={<NewOrder />}
          />

          <Route
            path="order-history"
            element={<OrderHistory />}
          />

          <Route
            path="add-funds"
            element={<AddFunds />}
          />

        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App