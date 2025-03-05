import { useState } from "react";
import { toast } from "sonner";
import {
  forgotPassword,
  login,
  logout,
  resetPassword,
  signUp,
} from "../api/AuthApi";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    try {
      const userData = await login(email, password);
      setUser(userData);
      navigate("/", { replace: true });
      toast.success("Login successful! 🎉");
    } catch (err) {
      setError(err.message);
      toast.error(`Login failed: ${err.message}`);
    }
  };

  const handleRegister = async (email, password, name, photo) => {
    try {
      const userData = await signUp(email, password, name, photo);
      setUser(userData);
      navigate("/");
      toast.success("Account created successfully! 🎉");
    } catch (err) {
      setError(err.message);
      toast.error(`Signup failed: ${err.message}`);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      toast.success("Logged out successfully! 👋");
    } catch (err) {
      setError(err.message);
      toast.error(`Logout failed: ${err.message}`);
    }
  };

  const handleForgotPassword = async (email) => {
    setError(null);
    setMessage("");

    try {
      const msg = await forgotPassword(email);
      toast.success(msg);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleResetPassword = async (oobCode, newPassword) => {
    setError(null);
    setMessage("");

    try {
      const msg = await resetPassword(oobCode, newPassword);
      toast.success(msg);
      navigate("/login");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return {
    user,
    error,
    handleLogin,
    handleRegister,
    handleLogout,
    handleResetPassword,
    handleForgotPassword,
  };
};

export default useAuth;
