import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EyeCloseIcon, EyeIcon } from "../../icons";
import axios from "axios";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState<"candidate" | "organization" | "recruiter">(
    "candidate"
  );
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
    bio: "",
    age: "",
    gender: "Male",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const payload = {
        ...formData,
        role,
        age: parseInt(formData.age),
      };

      const res = await axios.post(
        "http://localhost:3012/api/v1/auth/sign-up",
        payload
      );

      if (res.data.status) {
        alert("Registration successful!");
        navigate("/signin");
      } else {
        setError(res.data.message || "Something went wrong.");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-blue-100 px-4 py-10">
      <div className="bg-white rounded-xl shadow-md w-full max-w-lg p-8">
        <h2 className="text-2xl font-bold text-center text-blue-900 mb-6">
          Create Account
        </h2>

        {/* Role Selector */}
        <div className="flex justify-center gap-2 mb-6">
          {["candidate", "organization", "recruiter"].map((r) => (
            <button
              key={r}
              onClick={() => setRole(r as typeof role)}
              className={`flex-1 py-2 px-3 rounded-full text-sm font-medium transition-all ${
                role === r
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-blue-100"
              }`}
            >
              {r.charAt(0).toUpperCase() + r.slice(1)}
            </button>
          ))}
        </div>

        <form onSubmit={handleSignUp} className="space-y-4">
          {[
            { name: "fullName", label: "Full Name" },
            { name: "username", label: "Username", required: true },
            { name: "email", label: "Email", required: true },
            { name: "phoneNumber", label: "Phone Number", required: true },
            { name: "address", label: "Address" },
            { name: "bio", label: "Bio" },
            { name: "age", label: "Age" },
          ].map(({ name, label, required }) => (
            <input
              key={name}
              type="text"
              name={name}
              placeholder={label}
              value={formData[name as keyof typeof formData]}
              onChange={handleChange}
              required={required}
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          ))}

          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          {/* Password */}
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
              className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
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

          <div className="text-center mt-4">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-full shadow-md transition-all"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
