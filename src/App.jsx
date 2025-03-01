/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/react-in-jsx-scope */
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AppLayout from "./pages/Layout/AppLayout";
import { EventProvider } from "./Contexts/EventProvider";
import EventDetails from "./pages/EventsDetails";

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
          <Route path="/events/:id" element={<EventDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
