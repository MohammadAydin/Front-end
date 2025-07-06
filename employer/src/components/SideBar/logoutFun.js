import { useNavigate } from "react-router-dom";
import {
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from "../../utils/localStorage";
import customFetch from "../../utils/axios";
import { toast } from "react-toastify";

const useLogout = () => {
  // Logout Routing Definition
  const navigate = useNavigate();
  // Logout function
  const logout = async () => {
    // Passing LocalStorage tokens to api
    try {
      const user = getUserFromLocalStorage();
      const response = await customFetch.post("/logout", {
        refresh_token: user.token,
      });
      // If successful
      // Print in Console Reply
      console.log(response.data.message);
      //Show a successful logout message to the user
      toast.success("Logout successful");
      // Delete user and token from LocalStorage
      removeUserFromLocalStorage();
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
