import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { EyeCloseIcon, EyeIcon } from "../../icons";

const LoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSignIn = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        "http://localhost:3012/api/v1/auth/sign-in",
        formData
      );

      if (res.data.status) {
        const { userAuthToken } = res.data.data;

        // Store token
        localStorage.setItem("userAuthToken", userAuthToken);

        // Decode role from token
        const decoded: any = jwtDecode(userAuthToken);
        const role = decoded?.role;

        // Redirect by role
        switch (role) {
          case "candidate":
            navigate("/candidate-dashboard");
            break;
          case "recruiter":
            navigate("/recruiter-dashboard");
            break;
          case "organization":
            navigate("/organization-dashboard");
            break;
          case "admin":
            navigate("/admin-dashboard");
            break;
          default:
            setError("Unknown role. Please contact support.");
        }
      } else {
        setError(res.data.message || "Login failed.");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-purple-100 px-4 py-10">
      <div className="bg-white shadow-xl rounded-xl w-full max-w-md p-8 border border-gray-200">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-blue-800 mb-6">
          Sign In
        </h2>

        <form onSubmit={handleSignIn} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
            >
              {showPassword ? (
                <EyeIcon className="w-5 h-5 text-gray-500" />
              ) : (
                <EyeCloseIcon className="w-5 h-5 text-gray-500" />
              )}
            </span>
          </div>

          {error && (
            <div className="text-red-600 text-sm text-center">{error}</div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-full transition-all"
          >
            Login
          </button>
        </form>

        <div className="text-center mt-4 text-sm text-gray-700">
          Don’t have an account?{" "}
          <a
            href="/signup"
            className="text-blue-600 font-medium hover:underline"
          >
            Register here
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
