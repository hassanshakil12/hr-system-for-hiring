import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const CreateJobForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    employmentType: "",
    salaryRange: "",
    keywords: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("userAuthToken");
      const keywordsArray = formData.keywords
        .split(",")
        .map((kw) => kw.trim())
        .filter(Boolean);

      const res = await axios.post(
        "http://localhost:3012/api/v1/organization/create-job",
        {
          ...formData,
          keywords: keywordsArray,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data.status) {
        toast.success("Job created successfully");
        setFormData({
          title: "",
          description: "",
          location: "",
          employmentType: "",
          salaryRange: "",
          keywords: "",
        });
      } else {
        toast.error(res.data.message || "Failed to create job");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Server Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-8 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">
        Create New Job
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
        <TextArea
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
        <Input
          label="Location"
          name="location"
          value={formData.location}
          onChange={handleChange}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Select
            label="Employment Type"
            name="employmentType"
            value={formData.employmentType}
            onChange={handleChange}
            options={["Full-time", "Part-time", "Contract", "Internship"]}
          />
          <Input
            label="Salary Range"
            name="salaryRange"
            value={formData.salaryRange}
            onChange={handleChange}
          />
        </div>

        <Input
          label="Keywords (comma separated)"
          name="keywords"
          value={formData.keywords}
          onChange={handleChange}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          {loading ? "Submitting..." : "Create Job"}
        </button>
      </form>
    </div>
  );
};

const Input = ({ label, name, value, onChange }: any) => (
  <div>
    <label className="block mb-1 text-sm font-medium text-gray-700">
      {label}
    </label>
    <input
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 outline-none"
      required
    />
  </div>
);

const TextArea = ({ label, name, value, onChange }: any) => (
  <div>
    <label className="block mb-1 text-sm font-medium text-gray-700">
      {label}
    </label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 outline-none"
      rows={4}
      required
    ></textarea>
  </div>
);

const Select = ({ label, name, value, onChange, options }: any) => (
  <div>
    <label className="block mb-1 text-sm font-medium text-gray-700">
      {label}
    </label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 outline-none"
      required
    >
      <option value="" disabled>
        -- Select --
      </option>
      {options.map((opt: string) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

export default CreateJobForm;
