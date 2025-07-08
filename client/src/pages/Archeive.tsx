import { useEffect, useState } from "react";
import axios from "axios";
import { createPortal } from "react-dom";

const Archeive = () => {
  const [acceptedRequests, setAcceptedRequests] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleView = (request: any) => {
    setSelectedRequest(request);
    setModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const handleClose = () => {
    setModalOpen(false);
    setSelectedRequest(null);
    document.body.style.overflow = "auto";
  };

  useEffect(() => {
    const fetchAcceptedRequests = async () => {
      try {
        const token = localStorage.getItem("userAuthToken");
        const response = await axios.get(
          "http://localhost:3012/api/v1/organization/get-accepted-requests",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setAcceptedRequests(response.data.data || []);
      } catch (err: any) {
        setError(err?.response?.data?.message || "Failed to load data.");
      } finally {
        setLoading(false);
      }
    };

    fetchAcceptedRequests();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-center text-2xl font-bold mb-6">Archived Requests</h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : acceptedRequests.length === 0 ? (
        <p className="text-center text-gray-400">No accepted requests found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {acceptedRequests.map((item: any, index: number) => {
            const recruiter = item.recruiterId || {};
            const job = item.jobId || {};
            const imageUrl = recruiter.image
              ? `http://localhost:3012/${recruiter.image}`
              : "/images/profile_img.svg";

            return (
              <div
                key={item._id || index}
                className="bg-white rounded-lg shadow hover:shadow-lg border p-4 transition-all"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={imageUrl}
                    alt={recruiter.fullName || "Recruiter"}
                    className="w-12 h-12 rounded-full object-cover border"
                  />
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                      {recruiter.fullName || "Unknown Recruiter"}
                    </h2>
                    <p className="text-sm text-gray-500">{recruiter.email}</p>
                  </div>
                </div>

                <div className="text-sm text-gray-700 space-y-1">
                  <p>
                    <span className="font-semibold">Phone:</span>{" "}
                    {recruiter.phoneNumber || "N/A"}
                  </p>
                  <p>
                    <span className="font-semibold">Job:</span>{" "}
                    {job.title || "N/A"}
                  </p>
                  <p>
                    <span className="font-semibold">Location:</span>{" "}
                    {job.location || "N/A"}
                  </p>
                  <p>
                    <span className="font-semibold">Employment Type:</span>{" "}
                    {job.employmentType || "N/A"}
                  </p>
                </div>

                <div className="mt-4 text-right">
                  <button
                    onClick={() => handleView(item)}
                    className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-1.5 rounded transition"
                  >
                    View Details
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal */}
      {isModalOpen &&
        selectedRequest &&
        createPortal(
          <div className="fixed inset-0 z-999999 bg-black/50 flex items-center justify-center backdrop-blur-sm">
            <div className="bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 rounded-xl shadow-lg relative">
              <button
                onClick={handleClose}
                className="absolute top-3 right-3 text-gray-600 hover:text-black text-xl"
              >
                ✕
              </button>

              <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">
                {selectedRequest.jobId?.title || "Job Details"}
              </h2>

              <div className="space-y-6 text-sm text-gray-700">
                <section>
                  <h3 className="font-semibold text-gray-500 mb-1">Job Info</h3>
                  <ul className="space-y-1">
                    <li>
                      <strong>Description:</strong>{" "}
                      {selectedRequest.jobId?.description}
                    </li>
                    <li>
                      <strong>Type:</strong>{" "}
                      {selectedRequest.jobId?.employmentType}
                    </li>
                    <li>
                      <strong>Location:</strong>{" "}
                      {selectedRequest.jobId?.location}
                    </li>
                    <li>
                      <strong>Salary:</strong>{" "}
                      {selectedRequest.jobId?.salaryRange}
                    </li>
                    <li>
                      <strong>Keywords:</strong>{" "}
                      {selectedRequest.jobId?.keywords?.join(", ") || "N/A"}
                    </li>
                  </ul>
                </section>

                <section>
                  <h3 className="font-semibold text-gray-500 mb-1">
                    Recruiter Info
                  </h3>
                  <ul className="space-y-1">
                    <li>
                      <strong>Name:</strong>{" "}
                      {selectedRequest.recruiterId?.fullName}
                    </li>
                    <li>
                      <strong>Email:</strong>{" "}
                      {selectedRequest.recruiterId?.email}
                    </li>
                    <li>
                      <strong>Phone:</strong>{" "}
                      {selectedRequest.recruiterId?.phoneNumber}
                    </li>
                    <li>
                      <strong>Bio:</strong> {selectedRequest.recruiterId?.bio}
                    </li>
                  </ul>
                </section>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};

export default Archeive;
