/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { Navigate } from "react-router-dom";
import useAuthUser from "../../hooks/useAuth";
import { PageLoader } from "../../components/ui/Loader";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuthUser();

  if (loading) {
    return (
      <>
        <PageLoader />
      </>
    );
  }

  return user ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
