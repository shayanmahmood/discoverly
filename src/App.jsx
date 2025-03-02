/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/react-in-jsx-scope */
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AppLayout from "./pages/Layout/AppLayout";
import { EventProvider } from "./Contexts/EventProvider";
import EventDetails from "./pages/EventsDetails";
import AllEvents from "./pages/AllEvents";
import ContactUs from "./pages/ContactUs";

function App() {
  return (
    <BrowserRouter>
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
