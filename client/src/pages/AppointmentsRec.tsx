// Updated JobsPage.tsx with application listing, filtering by jobId, and application status update
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { createPortal } from "react-dom";

const JobsPage = () => {
  const [applications, setApplications] = useState<any[]>([]);
  const [selectedApplication, setSelectedApplication] = useState<any>(null);
  const [isAppModalOpen, setIsAppModalOpen] = useState(false);
  const [jobIdFilter, setJobIdFilter] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("userAuthToken");

  useEffect(() => {
    fetchAllApplications();
  }, []);

  const fetchAllApplications = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "http://localhost:3012/api/v1/recruiter/get-applications",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setApplications(res.data.data || []);
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Failed to fetch applications"
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchApplicationsByJobId = async () => {
    if (!jobIdFilter.trim()) return toast.error("Please enter a Job ID");
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:3012/api/v1/recruiter/get-applications/${jobIdFilter}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setApplications(res.data.data || []);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to fetch by Job ID");
    } finally {
      setLoading(false);
    }
  };

  const handleViewApplication = (app: any) => {
    setSelectedApplication(app);
    setIsAppModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const handleCloseModal = () => {
    setIsAppModalOpen(false);
    setSelectedApplication(null);
    document.body.style.overflow = "auto";
  };

  const updateApplicationStatus = async (status: string) => {
    if (!selectedApplication?._id) return;
    try {
      const res = await axios.put(
        `http://localhost:3012/api/v1/recruiter/update-application/${selectedApplication._id}`,
        { status },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Status updated successfully");
      fetchAllApplications();
      handleCloseModal();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update status");
    }
  };

  return (
    <div className="p-4">
      <div className="mb-6 flex flex-col sm:flex-row gap-2 justify-center items-center">
        <input
          type="text"
          value={jobIdFilter}
          onChange={(e) => setJobIdFilter(e.target.value)}
          placeholder="Enter Job ID to filter"
          className="px-3 py-2 border rounded-md text-sm w-full sm:w-64"
        />
        <button
          onClick={fetchApplicationsByJobId}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
        >
          Filter by Job ID
        </button>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : applications.length === 0 ? (
        <p className="text-center text-gray-400">No applications found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {applications.map((app) => (
            <div
              key={app._id}
              className="bg-white rounded-lg shadow-md p-4 border hover:shadow-lg transition"
            >
              <h2 className="text-lg font-semibold text-gray-800 mb-1">
                {app.candidateId?.fullName || "Unknown Candidate"}
              </h2>
              <p className="text-sm text-gray-600 mb-1">
                {app.candidateId?.email} | {app.candidateId?.phoneNumber}
              </p>
              <p className="text-sm text-gray-500 mb-1">
                Job: {app.jobId?.title || "N/A"}
              </p>
              <p className="text-sm text-gray-500 mb-1 capitalize">
                Status: <span className="font-medium">{app.status}</span>
              </p>
              <div className="mt-3 text-right">
                <button
                  onClick={() => handleViewApplication(app)}
                  className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {isAppModalOpen &&
        selectedApplication &&
        createPortal(
          <div className="fixed inset-0 bg-black/40 z-999999 flex items-center justify-center backdrop-blur-sm">
            <div className="bg-white p-6 rounded-xl w-full max-w-xl max-h-[90vh] overflow-auto relative shadow-xl">
              <button
                onClick={handleCloseModal}
                className="absolute top-3 right-3 text-xl text-gray-600 hover:text-black"
              >
                ✕
              </button>
              <h2 className="text-xl font-bold mb-2">Application Details</h2>
              <p className="text-sm text-gray-700 mb-1">
                <strong>Candidate:</strong>{" "}
                {selectedApplication.candidateId?.fullName}
              </p>
              <p className="text-sm text-gray-700 mb-1">
                <strong>Email:</strong> {selectedApplication.candidateId?.email}
              </p>
              <p className="text-sm text-gray-700 mb-1">
                <strong>Phone:</strong>{" "}
                {selectedApplication.candidateId?.phoneNumber}
              </p>
              <p className="text-sm text-gray-700 mb-2">
                <strong>Job:</strong> {selectedApplication.jobId?.title}
              </p>
              {selectedApplication.candidateId?.bio && (
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Bio:</strong> {selectedApplication.candidateId.bio}
                </p>
              )}
              {selectedApplication.cv ? (
                <a
                  href={`http://localhost:3012/${selectedApplication.cv}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:underline"
                >
                  📄 View CV
                </a>
              ) : (
                <p className="text-sm text-gray-400 italic">No CV uploaded</p>
              )}
              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => updateApplicationStatus("shortlisted")}
                  className="px-4 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm"
                >
                  Shortlist
                </button>
                <button
                  onClick={() => updateApplicationStatus("rejected")}
                  className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                >
                  Reject
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};

export default JobsPage;
