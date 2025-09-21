import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FleetSection from "./pages/FleetSection";
import PassengerDetails from "./pages/PassengerDetails";
import Register from "./pages/Register";
import RideHistoryPage from "./pages/RideHistoryPage";
import ViewBookingPage from "./pages/viewbooking";
import ErrorPage from "./pages/ErrorPage";
import QA from "./pages/QA";
import TC from "./pages/TC";
import Contact from "./pages/contact";
import EditProfile from "./pages/EditProfilePage";
import Payout from "./pages/Payout";
import CardDetailsPage from "./pages/cardDetailspage"
import ProfilePage from "./pages/ProfilePage";
import Submission from "./pages/Submission";
import { AdminRoute, CustomerRoute } from "./Protected/PrivateRoute";
import HomePage from "./pages/HomePage";
import Addfleet from "./pages/Admin/Addfleet";
import OrderSummaryPage from "./pages/orderSummaryPage";
import ManageCardPage from "./pages/ManageCardPage";
import ForgetPasswordPage from "./pages/ForgetPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import Cardpage from "./pages/CardPage";
import AdminLoginPage from "./pages/Admin/AdminLogin";
import QuotesHistoryPage from "./pages/QuotesHistoryPage";
import useTokenExpiration from "./components/Hooks/useTokenExpiration";
import AdminDashBoardPage from "./pages/Admin/AdminDashBoardPage";
import EditFleet from "./pages/EditFleet";
const App = () => {
  useTokenExpiration();
  const [user, setUser] = useState({
    role: "admin",
    username: "JohnDoe", // Example username
  });

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/fleet/:id" element={<FleetSection />} />
        <Route path="/edit-fleet/:id" element={<EditFleet />} />
        <Route
          path="/details/:twoway/:carid/:lid"
          element={<PassengerDetails />}
        />
        <Route
          path="/Cardpage/:userId/:bookingId/payout"
          element={<Payout />}
        />
         <Route
          path="/Cardpage/:userId/payout/CardDetailsPage"
          element={<CardDetailsPage />}
        />
        <Route path="/submission" element={<Submission />} />
        <Route path="/login" element={<Register />} />
        <Route path="/order-summary" element={<OrderSummaryPage />} />
        <Route path="/forget-password" element={<ForgetPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/quotes-history" element={<QuotesHistoryPage />} />
        <Route
          path="/manage-card/:userId"
          element={
            <CustomerRoute>
              <ManageCardPage />
            </CustomerRoute>
          }
        />
        <Route
          path="/ride-history"
          element={
            <CustomerRoute>
              <RideHistoryPage />
            </CustomerRoute>
          }
        />
        <Route
          path="/view-bookings"
          element={
            <CustomerRoute>
              <ViewBookingPage />
            </CustomerRoute>
          }
        />
        <Route path="/qa" element={<QA />} />
        <Route path="/terms-conditions" element={<TC />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/edit-profile"
          element={
            <CustomerRoute>
              <EditProfile />
            </CustomerRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <CustomerRoute>
              <ProfilePage />
            </CustomerRoute>
          }
        />
        <Route path="/tc" element={<TC />} />
        <Route path="/Cardpage/:userId/:bookingId" element={<Cardpage />} />
        {/* Admin Routes (Protected) */}
        <Route path="/admin/Login" element={<AdminLoginPage />} />

        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
            <AdminDashBoardPage/>
            </AdminRoute>
          }
        />
        <Route
          path="/admin/add-fleet"
          element={
            <AdminRoute>
              <Addfleet />
            </AdminRoute>
          }
        />

        {/* Error Page */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
};

export default App;
