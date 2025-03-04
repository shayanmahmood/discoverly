import { useAuth } from "../Contexts/AuthContext"; // Ensure correct path

const useAuthUser = () => {
  return useAuth();
};

export default useAuthUser;
