import { useEffect, useState } from "react";
import axios from "axios";
import { createPortal } from "react-dom";
import toast from "react-hot-toast";

interface Job {
  title?: string;
  description?: string;
  location?: string;
  employmentType?: string;
  salaryRange?: string;
}

interface Organization {
  fullName: string;
  organizationName?: string;
  email?: string;
  phoneNumber?: string;
}

interface Request {
  _id: string;
  status: "Pending" | "Accepted" | "Rejected";
  jobId?: Job;
  organizationId?: Organization;
}

const RequestsPage = () => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [acceptedRequests, setAcceptedRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalData, setModalData] = useState<Request | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [statusUpdateLoading, setStatusUpdateLoading] = useState(false);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("userAuthToken");
      const [pendingRes, acceptedRes] = await Promise.all([
        axios.get("http://localhost:3012/api/v1/recruiter/get-requests", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("http://localhost:3012/api/v1/recruiter/get-accepted", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);
      setRequests(pendingRes.data.data || []);
      setAcceptedRequests(acceptedRes.data.data || []);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to fetch requests");
    } finally {
      setLoading(false);
    }
  };

  const openModal = (request: Request) => {
    setModalData(request);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalData(null);
    document.body.style.overflow = "auto";
  };

  const handleStatusUpdate = async (status: "Accepted" | "Rejected") => {
    if (!modalData?._id) return;
    try {
      setStatusUpdateLoading(true);
      const token = localStorage.getItem("userAuthToken");
      await axios.put(
        `http://localhost:3012/api/v1/recruiter/update-request/${modalData._id}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(`Request ${status.toLowerCase()} successfully`);
      closeModal();
      fetchRequests();
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message || "Failed to update request status"
      );
    } finally {
      setStatusUpdateLoading(false);
    }
  };

  const renderRequestCard = (request: Request, showButtons = true) => {
    const job = request.jobId || {};
    const org: Organization | undefined = request.organizationId;
    return (
      <div
        key={request._id}
        className="bg-white rounded-xl border shadow-sm hover:shadow-md transition-all p-5"
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-1">
          {job.title || "Unknown Job"}
        </h3>
        <p className="text-sm text-gray-500 mb-2">
          Organization: {org?.fullName || "Unknown"}
        </p>
        <div className="text-sm text-gray-600 space-y-1">
          <p>
            <strong>Location:</strong> {job.location || "N/A"}
          </p>
          <p>
            <strong>Type:</strong> {job.employmentType || "N/A"}
          </p>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <button
            onClick={() => openModal(request)}
            className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-1.5 rounded transition"
          >
            View Details
          </button>
          {/* {showButtons && (
            <div className="flex gap-2">
              <button
                onClick={() => handleStatusUpdate("Accepted")}
                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 text-sm rounded"
                disabled={statusUpdateLoading}
              >
                Accept
              </button>
              <button
                onClick={() => handleStatusUpdate("Rejected")}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 text-sm rounded"
                disabled={statusUpdateLoading}
              >
                Reject
              </button>
            </div>
          )} */}
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 space-y-10">

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <>
          {/* Pending Requests */}
          <section>
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Pending Requests
            </h2>
            {requests.length === 0 ? (
              <p className="text-gray-400 text-sm">No pending requests.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {requests.map((r) => renderRequestCard(r, true))}
              </div>
            )}
          </section>

          {/* Accepted Requests */}
          <section>
            <h2 className="text-xl font-semibold mt-10 mb-4 text-gray-700">
              Accepted Requests
            </h2>
            {acceptedRequests.length === 0 ? (
              <p className="text-gray-400 text-sm">No accepted requests yet.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {acceptedRequests.map((r) => renderRequestCard(r, false))}
              </div>
            )}
          </section>
        </>
      )}

      {/* Modal */}
      {isModalOpen &&
        modalData &&
        createPortal(
          <div className="fixed inset-0 bg-black/50 z-[999999] flex items-center justify-center backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6 relative">
              <button
                onClick={closeModal}
                className="absolute top-3 right-3 text-xl text-gray-600 hover:text-black"
              >
                ✕
              </button>
              <h3 className="text-xl font-bold text-center mb-4 text-blue-600">
                {modalData.jobId?.title || "Request Details"}
              </h3>

              <div className="space-y-4 text-sm text-gray-700">
                <section>
                  <h4 className="font-semibold text-gray-500 mb-1">Job Info</h4>
                  <p>
                    <strong>Description:</strong>{" "}
                    {modalData.jobId?.description || "N/A"}
                  </p>
                  <p>
                    <strong>Location:</strong>{" "}
                    {modalData.jobId?.location || "N/A"}
                  </p>
                  <p>
                    <strong>Type:</strong>{" "}
                    {modalData.jobId?.employmentType || "N/A"}
                  </p>
                  <p>
                    <strong>Salary:</strong>{" "}
                    {modalData.jobId?.salaryRange || "N/A"}
                  </p>
                </section>

                <section>
                  <h4 className="font-semibold text-gray-500 mb-1">
                    Organization Info
                  </h4>
                  <p>
                    <strong>Name:</strong>{" "}
                    {modalData.organizationId?.fullName || "N/A"}
                  </p>
                  <p>
                    <strong>Email:</strong>{" "}
                    {modalData.organizationId?.email || "N/A"}
                  </p>
                  <p>
                    <strong>Phone:</strong>{" "}
                    {modalData.organizationId?.phoneNumber || "N/A"}
                  </p>
                </section>
              </div>

              {modalData.status === "Pending" && (
                <div className="mt-6 flex justify-end gap-4">
                  <button
                    onClick={() => handleStatusUpdate("Accepted")}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-1.5 rounded text-sm"
                    disabled={statusUpdateLoading}
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleStatusUpdate("Rejected")}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded text-sm"
                    disabled={statusUpdateLoading}
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};

export default RequestsPage;
