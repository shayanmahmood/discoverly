/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/react-in-jsx-scope */
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import { Toaster } from "./components/ui/Toaster";
import { Toaster as Sonner } from "sonner";

import EventDetails from "./pages/Events/EventsDetailsPage";

import ProtectedRoute from "./pages/Layout/ProtectedRoute";
import { EventDetailsProvider } from "./Contexts/Events/EventDetailsProvider";
import { EventProvider } from "./Contexts/EventProvider";
import { AuthProvider } from "./Contexts/AuthContext";

import AppLayout from "./pages/Layout/AppLayout";

import Home from "./pages/Home/Home";
import AllEvents from "./pages/Events/AllEvents";
import ContactUs from "./pages/ContactUs";

import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/SignUp";
import ForgotPassword from "./pages/Auth/ForgetPassword";
import ResetPassword from "./pages/Auth/ResetPassword";

import Dashboard from "./pages/Dashboard";
import EmailVerification from "./pages/Auth/EmailVerification";
import Welcome from "./pages/Auth/Welcome";
import AuthHandler from "./pages/Auth/AuthHandler";
import NotFound from "./pages/Home/PageNotFound";

function App() {
  const RedirectToDefaultTab = () => {
    return <Navigate to="/dashboard?tab=myEvents" replace />;
  };
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster />
        <Sonner />

        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <EventProvider>
                  <EventDetailsProvider>
                    <AppLayout />
                  </EventDetailsProvider>
                </EventProvider>
              </ProtectedRoute>
            }
          >
            <Route index element={<Home />} />
            <Route path="/event/:id" element={<EventDetails />} />
            <Route path="/events" element={<AllEvents />} />
            <Route path="/Contact" element={<ContactUs />} />
            <Route path="/dashboard" element={<Dashboard />}>
              <Route index element={<RedirectToDefaultTab />} />
            </Route>
            <Route path="/welcome" element={<Welcome />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/verify-email" element={<EmailVerification />} />
          <Route path="/auth" element={<AuthHandler />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
