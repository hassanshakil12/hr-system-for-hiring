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
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<File | null>(null);

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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const payload = new FormData();

      for (const key in formData) {
        payload.append(key, (formData as any)[key]);
      }

      payload.append("role", role);
      payload.append("age", formData.age.toString());

      if (profileImage) {
        payload.append("profileImage", profileImage);
      }

      const res = await axios.post(
        "http://localhost:3012/api/v1/auth/sign-up",
        payload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
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
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-purple-100 px-4 py-10">
      <div className="bg-white shadow-xl rounded-xl w-full max-w-2xl p-8 border border-gray-200">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-blue-800 mb-8">
          Create Account
        </h2>

        {/* Role Selector */}
        <div className="flex justify-between mb-8 border border-gray-300 rounded-full overflow-hidden">
          {["candidate", "organization", "recruiter"].map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRole(r as typeof role)}
              className={`w-full py-2 px-4 text-sm font-semibold transition-all ${
                role === r
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-blue-50"
              }`}
            >
              {r.charAt(0).toUpperCase() + r.slice(1)}
            </button>
          ))}
        </div>

        <form
          onSubmit={handleSignUp}
          encType="multipart/form-data"
          className="space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Profile Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full border border-gray-300 rounded-md p-2 bg-gray-50"
            />
            {imagePreview && (
              <div className="flex justify-center pt-4">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="h-24 w-24 object-cover rounded-full border border-gray-300"
                />
              </div>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="text-red-600 text-sm text-center">{error}</div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-full transition-all"
          >
            Register
          </button>
        </form>

        <div className="text-center mt-6 text-sm text-gray-700">
          Already have an account?{" "}
          <a
            href="/signin"
            className="text-blue-600 font-medium hover:underline"
          >
            Sign in here
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
