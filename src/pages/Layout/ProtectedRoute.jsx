/* eslint-disable react/react-in-jsx-scope */
import { Navigate } from "react-router-dom";
import useAuthUser from "../../hooks/useAuth";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuthUser();

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <h2>🔄 Checking authentication...</h2>
      </div>
    );
  }

  return user ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
