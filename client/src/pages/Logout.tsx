import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      const token = localStorage.getItem("userAuthToken");

      try {
        if (token) {
          await axios.post(
            "http://localhost:3012/api/v1/auth/sign-out",
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        }
      } catch (error: any) {
        console.error(
          "[Logout] Error hitting sign-out API:",
          error.response?.data?.message || error.message
        );
      } finally {
        // Clear token regardless of success/failure
        localStorage.removeItem("userAuthToken");

        // Add a slight delay (UX polish)
        setTimeout(() => {
          navigate("/", { replace: true });
        }, 1500);
      }
    };

    performLogout();
  }, [navigate]);

  return (
    <div className="min-h-screen flex justify-center items-center bg-white">
      <div className="text-center">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600 text-sm">Logging you out...</p>
      </div>
    </div>
  );
};

export default Logout;
