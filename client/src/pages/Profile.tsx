import { useEffect, useState } from "react";
import axios from "axios";

const ProfilePage = () => {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  const [editData, setEditData] = useState<any>({});
  const [updateError, setUpdateError] = useState("");
  const [updateLoading, setUpdateLoading] = useState(false);
  const [editImage, setEditImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("userAuthToken");
        const res = await axios.get(
          "http://localhost:3012/api/v1/common/get-profile",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (res.data.status) {
          setProfile(res.data.data);
        } else {
          setError(res.data.message || "Failed to load profile");
        }
      } catch (err: any) {
        setError(err.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleEditChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setEditData((prev: any) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setEditImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleUpdateProfile = async () => {
    setUpdateLoading(true);
    setUpdateError("");

    try {
      const token = localStorage.getItem("userAuthToken");
      const formData = new FormData();

      for (const key in editData) {
        if (editData[key] !== undefined) {
          formData.append(key, editData[key]);
        }
      }

      if (editImage) {
        formData.append("image", editImage);
      }

      const res = await axios.put(
        "http://localhost:3012/api/v1/common/update-profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Update response:", res);

      if (res.data.status) {
        setProfile(res.data.data);
        setShowEdit(false);
      } else {
        setUpdateError(res.data.message || "Failed to update profile");
      }
    } catch (err: any) {
      setUpdateError(err.response?.data?.message || "Something went wrong");
    } finally {
      setUpdateLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen flex justify-center items-center text-red-600">
        {error}
      </div>
    );
  }

  const isOrg = profile.role === "organization";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-100 flex justify-center items-start font-sans py-10 px-4">
      <div className="w-full max-w-4xl bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl p-8 space-y-10 border border-gray-200">
        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-blue-500 shadow-lg">
            <img
              src={
                `http://localhost:3012/${profile.image}` ||
                "/images/profile_img.svg"
              }
              alt="Profile"
              className="w-full h-full object-cover"
              onError={(e) => (e.currentTarget.src = "/images/profile_img.svg")}
            />
          </div>
          <div className="text-center sm:text-left">
            <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">
              {profile.fullName || profile.username}
            </h1>
            <p className="text-gray-500 mt-1">
              {profile.bio || "No bio available"}
            </p>
            <div className="mt-2 text-sm text-gray-600 space-y-1">
              <p>
                Role: <span className="font-semibold">{profile.role}</span>
              </p>
              <p>
                Joined:{" "}
                <span className="font-semibold">
                  {new Date(profile.createdAt).toLocaleDateString()}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Sections */}
        <div className="grid gap-8 md:grid-cols-2">
          <ProfileSection title="Contact Information">
            <InfoRow label="Email" value={profile.email} />
            <InfoRow label="Phone" value={profile.phoneNumber || "N/A"} />
            <InfoRow label="Address" value={profile.address || "N/A"} />
          </ProfileSection>

          <ProfileSection title="Basic Information">
            {!isOrg && (
              <InfoRow label="Gender" value={profile.gender || "N/A"} />
            )}
            {!isOrg && (
              <InfoRow label="Age" value={profile.age?.toString() || "N/A"} />
            )}
            <InfoRow
              label="Status"
              value={profile.isActive ? "Active" : "Inactive"}
            />
          </ProfileSection>
        </div>

        <div className="flex justify-end">
          <button
            onClick={() => {
              setEditData(profile);
              setImagePreview(`http://localhost:3012/${profile.image}`);
              setShowEdit(true);
            }}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-full shadow transition"
          >
            Edit Profile
          </button>
        </div>

        {/* Edit Modal */}
        {showEdit && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-999999">
            <div className="bg-white p-6 rounded-xl w-full max-w-lg space-y-4 shadow-xl">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                Edit Profile
              </h2>
              {updateError && (
                <p className="text-red-500 text-sm">{updateError}</p>
              )}

              {/* Image Upload */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Profile Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full border border-gray-300 rounded-md p-2 bg-gray-50"
                />
                {imagePreview && (
                  <div className="flex justify-center pt-2">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="h-24 w-24 object-cover rounded-full border border-gray-300"
                    />
                  </div>
                )}
              </div>

              {/* Text Inputs */}
              {[
                "fullName",
                "username",
                "email",
                "phoneNumber",
                "address",
                "bio",
              ].map((field) => (
                <input
                  key={field}
                  type="text"
                  name={field}
                  placeholder={field[0].toUpperCase() + field.slice(1)}
                  value={editData[field] || ""}
                  onChange={handleEditChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none"
                />
              ))}

              {!isOrg && (
                <>
                  <input
                    type="text"
                    name="age"
                    placeholder="Age"
                    value={editData.age || ""}
                    onChange={handleEditChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none"
                  />

                  <select
                    name="gender"
                    value={editData.gender || ""}
                    onChange={handleEditChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </>
              )}

              <div className="flex justify-end gap-2">
                <button
                  className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400"
                  onClick={() => setShowEdit(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
                  onClick={handleUpdateProfile}
                  disabled={updateLoading}
                >
                  {updateLoading ? "Updating..." : "Update"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const ProfileSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="bg-white hover:shadow-lg transition-all duration-300 rounded-xl p-6 border border-gray-100">
    <h2 className="text-lg font-semibold text-gray-700 mb-4">{title}</h2>
    <div className="space-y-3">{children}</div>
  </div>
);

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between text-sm text-gray-600">
    <span className="font-medium">{label}</span>
    <span className="text-gray-800 text-right max-w-[60%] truncate">
      {value}
    </span>
  </div>
);

export default ProfilePage;
