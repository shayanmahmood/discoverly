/* eslint-disable react/react-in-jsx-scope */
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { PageLoader } from "../../components/ui/Loader";

const AuthHandler = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const mode = searchParams.get("mode"); // Get query parameter
  const oobCode = searchParams.get("oobCode");

  useEffect(() => {
    if (mode === "verifyEmail") {
      navigate(`/welcome?oobCode=${oobCode}`); // Redirect to Email Verification Page
    } else if (mode === "reset") {
      navigate("/reset-password"); // Redirect to Reset Password Page
    } else {
      navigate(`/reset-password?oobCode=${oobCode}`); // Default fallback
    }
  }, [mode, navigate, oobCode]);

  return <PageLoader message="Processing authentication..." />; // Loading message
};

export default AuthHandler;
