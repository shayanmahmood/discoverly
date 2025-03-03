/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/react-in-jsx-scope */
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AppLayout from "./pages/Layout/AppLayout";
import { EventProvider } from "./Contexts/EventProvider";
import AllEvents from "./pages/AllEvents";
import ContactUs from "./pages/ContactUs";
import EventDetails from "./pages/EventsDetailsPage";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import ForgotPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";
import { Toaster as Sonner } from "sonner";
import { Toaster } from "./components/ui/Toaster";

function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <Sonner />

      <Routes>
        <Route
          path="/"
          element={
            <EventProvider>
              <AppLayout />
            </EventProvider>
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
  );
}

export default App;
