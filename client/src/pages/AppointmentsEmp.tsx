import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import axios from "axios";
import toast from "react-hot-toast";

// Job and Org interfaces
interface Job {
  title: string;
  description: string;
  location: string;
  employmentType: string;
  salaryRange: string;
}

interface Organization {
  fullName: string;
  organizationName: string;
  email: string;
  phoneNumber: string;
}

interface Application {
  _id: string;
  status: string;
  note: string;
  cv: string;
  jobId: Job;
  organizationId: Organization;
}

const Applications = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [selectedApplication, setSelectedApplication] =
    useState<Application | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem("userAuthToken");
      const res = await axios.get(
        `http://localhost:3012/api/v1/candidate/get-applications`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setApplications(res.data.data || []);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to fetch applications"
      );
    } finally {
      setLoading(false);
    }
  };

  const openModal = (application: Application) => {
    setSelectedApplication(application);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedApplication(null);
    setIsModalOpen(false);
    document.body.style.overflow = "auto";
  };

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold text-center">Your Job Applications</h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : applications.length === 0 ? (
        <p className="text-center text-gray-400">No applications found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {applications.map((app) => (
            <div
              key={app._id}
              className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition"
            >
              <h2 className="text-lg font-semibold text-gray-800">
                {app.jobId?.title || "Job Title Unavailable"}
              </h2>
              <p className="text-sm text-gray-500 mb-1">
                Organization: {app.organizationId?.fullName || "N/A"}
              </p>
              <p className="text-sm text-gray-500">Status: {app.status}</p>
              <div className="mt-4 text-right">
                <button
                  onClick={() => openModal(app)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 rounded text-sm"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen &&
        selectedApplication &&
        createPortal(
          <div className="fixed inset-0 bg-black/50 z-999999 flex items-center justify-center backdrop-blur-sm">
            <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-xl relative overflow-auto max-h-[90vh]">
              <button
                onClick={closeModal}
                className="absolute top-3 right-3 text-xl text-gray-600 hover:text-black"
                aria-label="Close"
              >
                ✕
              </button>

              <h2 className="text-xl font-bold text-blue-600 mb-4 text-center">
                {selectedApplication.jobId?.title || "Untitled Job"}
              </h2>

              <div className="space-y-3 text-sm text-gray-700">
                {/* Job Info */}
                <section>
                  <h3 className="font-semibold text-gray-500 mb-1">Job Info</h3>
                  <p>
                    <strong>Description:</strong>{" "}
                    {selectedApplication.jobId?.description || "N/A"}
                  </p>
                  <p>
                    <strong>Location:</strong>{" "}
                    {selectedApplication.jobId?.location || "N/A"}
                  </p>
                  <p>
                    <strong>Type:</strong>{" "}
                    {selectedApplication.jobId?.employmentType || "N/A"}
                  </p>
                  <p>
                    <strong>Salary:</strong>{" "}
                    {selectedApplication.jobId?.salaryRange || "N/A"}
                  </p>
                </section>

                {/* Organization Info */}
                <section>
                  <h3 className="font-semibold text-gray-500 mt-4 mb-1">
                    Organization Info
                  </h3>
                  <p>
                    <strong>Name:</strong>{" "}
                    {selectedApplication.organizationId?.fullName || "N/A"}
                  </p>
                  <p>
                    <strong>Email:</strong>{" "}
                    {selectedApplication.organizationId?.email || "N/A"}
                  </p>
                  <p>
                    <strong>Phone:</strong>{" "}
                    {selectedApplication.organizationId?.phoneNumber || "N/A"}
                  </p>
                </section>

                {/* Candidate Application */}
                <section>
                  <h3 className="font-semibold text-gray-500 mt-4 mb-1">
                    Your Application
                  </h3>
                  <p>
                    <strong>Status:</strong> {selectedApplication.status}
                  </p>
                  <p>
                    <strong>Note:</strong>{" "}
                    {selectedApplication.note || "No note provided"}
                  </p>
                  {selectedApplication.cv && (
                    <p>
                      <strong>CV:</strong>{" "}
                      <a
                        href={`http://localhost:3012/${selectedApplication.cv}`}
                        className="text-blue-600 underline"
                        target="_blank"
                        rel="noreferrer"
                      >
                        View CV
                      </a>
                    </p>
                  )}
                </section>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};

export default Applications;
