/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/react-in-jsx-scope */
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./pages/Layout/AppLayout";
import { EventProvider } from "./Contexts/EventProvider";
import ContactUs from "./pages/ContactUs";
import EventDetails from "./pages/Events/EventsDetailsPage";
import { Toaster as Sonner } from "sonner";
import { Toaster } from "./components/ui/Toaster";
import Home from "./pages/Home/Home";
import AllEvents from "./pages/Events/AllEvents";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/SignUp";
import ForgotPassword from "./pages/Auth/ForgetPassword";
import ResetPassword from "./pages/Auth/ResetPassword";
import { AuthProvider } from "./Contexts/AuthContext";
import ProtectedRoute from "./pages/Layout/ProtectedRoute";

function App() {
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
                  <AppLayout />
                </EventProvider>
              </ProtectedRoute>
            }
          >
            <Route index element={<Home />} />
            <Route path="/event/:id" element={<EventDetails />} />
            <Route path="/events" element={<AllEvents />} />
            <Route path="/Contact" element={<ContactUs />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
