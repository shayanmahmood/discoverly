import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

/* eslint-disable react/react-in-jsx-scope */
function AppLayout() {
  const location = useLocation();
  const isDashboard = location.pathname === "/dashboard";
  return (
    <div className="min-h-screen flex flex-col">
      {!isDashboard && <Navbar />}
      <main className="flex-grow">
        <Outlet />
      </main>
      {!isDashboard && <Footer />}
    </div>
  );
}

export default AppLayout;
