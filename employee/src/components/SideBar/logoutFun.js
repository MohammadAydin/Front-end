import { useNavigate } from "react-router-dom";
import { getUserFromLocalStorage } from "../../utils/localStorage";
import customFetch from "../../utils/axios";
import { toast } from "react-toastify";
import { useAuthStore } from "../../store/useAuthStore";

const useLogout = () => {
  // Logout Routing Definition
  const navigate = useNavigate();

  const logoutFromStore = useAuthStore((state) => state.logout);
  // Logout function
  const logout = async () => {
    // Passing LocalStorage tokens to api
    try {
      const user = getUserFromLocalStorage();
      const response = await customFetch.post("/logout");
      // If successful
      logoutFromStore();
      // Print in Console Reply
      //Show a successful logout message to the user
      toast.success("Logout successful");
      // Delete user and token from LocalStorage
      // Go to the login page after a second and a half
      setTimeout(() => {
        navigate("/login");
      }, 1500);
      // If unsuccessful
    } catch (error) {
      // Show an error message to the user
      toast.error("error Logout server problem");
      // Show in the console the response to the error message
      console.error(
        "Logout error:",
        error.response?.data?.message || error.message
      );
    }
  };

  return logout;
};

export default useLogout;
