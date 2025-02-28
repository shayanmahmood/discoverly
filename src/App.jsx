/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/react-in-jsx-scope */
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AppLayout from "./pages/Layout/AppLayout";
import { EventProvider } from "./Contexts/EventProvider";

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
          <Route path="me" element={<h1>yes</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
