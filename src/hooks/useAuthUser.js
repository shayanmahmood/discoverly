import { useState } from "react";
import { toast } from "sonner";
import {
  forgotPassword,
  login,
  logout,
  resendVerificationEmail,
  resetPassword,
  signUp,
  updateUserPassword,
  updateUserProfile,
} from "../api/AuthApi";
import { useNavigate } from "react-router-dom";
import { fetchUser } from "../api/FetchingData";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsloading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    setIsloading(true);
    try {
      const userData = await login(email, password);
      setUser(userData);
      navigate("/", { replace: true });
      toast.success("Login successful! 🎉");
    } catch (err) {
      toast.error(`Login failed: ${err.message}`);
    } finally {
      setIsloading(false);
    }
  };

  const handleRegister = async (email, password, name, photo, phone, bio) => {
    setIsloading(true);
    try {
      const userData = await signUp(email, password, name, photo, phone, bio);
      setUser(userData);
      navigate("/verify-email", { replace: true });
      toast.success("Account created successfully! 🎉");
    } catch (err) {
      toast.error(`Signup failed: ${err.message}`);
    } finally {
      setIsloading(false);
    }
  };

  const handleLogout = async () => {
    setIsloading(true);
    try {
      await logout();
      setUser(null);
      toast.success("Logged out successfully! 👋");
    } catch (err) {
      toast.error(`Logout failed: ${err.message}`);
    } finally {
      setIsloading(false);
    }
  };

  const handleForgotPassword = async (email) => {
    setIsloading(true);
    try {
      const msg = await forgotPassword(email);
      toast.success(msg);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsloading(false);
    }
  };

  const handleResetPassword = async (oobCode, newPassword) => {
    setIsloading(true);
    try {
      const msg = await resetPassword(oobCode, newPassword);
      toast.success(msg);
      navigate("/login");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsloading(false);
    }
  };

  const getUserById = async (id) => {
    setIsloading(true);
    try {
      const user = await fetchUser(id);
      return user;
    } catch (err) {
      toast.error(`Error having during fetching user ${err.message}`);
    } finally {
      setIsloading(false);
    }
  };

  const updateUser = async (id, updatedData) => {
    setIsloading(true);
    try {
      const user = await updateUserProfile(id, updatedData);
      navigate("/");
      return user;
    } catch (err) {
      toast.error(`Error having during updating user ${err.message}`);
    } finally {
      setIsloading(false);
    }
  };

  const updatePassword = async (user, currentPassword, newPassword) => {
    setIsloading(true);
    try {
      const msg = await updateUserPassword(user, currentPassword, newPassword);
      toast.success("password changed  successfully! 👋");
      return msg;
    } catch (err) {
      toast.error(`Error having during updating password ${err.message}`);
    } finally {
      setIsloading(false);
    }
  };

  const handleResendEmail = async () => {
    setIsloading(true);
    try {
      const user = await resendVerificationEmail();
      return user;
    } catch (err) {
      toast.error(`Error having during Resending email ${err.message}`);
    } finally {
      setIsloading(false);
    }
  };

  return {
    isLoading,
    user,

    handleLogin,
    handleRegister,
    handleLogout,
    handleResetPassword,
    handleForgotPassword,
    handleResendEmail,

    getUserById,
    updateUser,
    updatePassword,
  };
};

export default useAuth;
