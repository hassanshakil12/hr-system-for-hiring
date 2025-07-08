import { SetStateAction, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Employees = () => {
  const [employees, setEmployees] = useState<any[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [requestMessage, setRequestMessage] = useState("");
  const [jobId, setJobId] = useState("");

  useEffect(() => {
    const fetchRecruiters = async () => {
      try {
        const token = localStorage.getItem("userAuthToken");
        const res = await axios.get(
          "http://localhost:3012/api/v1/organization/get-recruiters",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setEmployees(res.data.data);
      } catch (error: any) {
        toast.error(
          error.response?.data?.message || "Failed to fetch recruiters"
        );
      }
    };

    fetchRecruiters();
  }, []);

  const handleView = (employee: SetStateAction<any>) => {
    setSelectedEmployee(employee);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setIsRequestModalOpen(false);
    setSelectedEmployee(null);
    setRequestMessage("");
    document.body.style.overflow = "auto";
  };

  const handleDeleteClick = (employee: any) => {
    setSelectedEmployee(employee);
    setIsConfirmDeleteOpen(true);
    document.body.style.overflow = "hidden";
  };

  const handleConfirmDelete = () => {
    toast.success(`Deleted: ${selectedEmployee.fullName}`);
    setIsConfirmDeleteOpen(false);
    setSelectedEmployee(null);
    document.body.style.overflow = "auto";
  };

  const handleCancelDelete = () => {
    setIsConfirmDeleteOpen(false);
    setSelectedEmployee(null);
    document.body.style.overflow = "auto";
  };

  const handleRequestSubmit = async () => {
    try {
      const token = localStorage.getItem("userAuthToken");
      await axios.post(
        `http://localhost:3012/api/v1/organization/send-request/${selectedEmployee._id}`,
        { jobId, message: requestMessage },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Request sent successfully");
      handleClose();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to send request");
    }
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Recruiters</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {employees.map((employee, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow hover:shadow-lg transition-all border border-gray-100 overflow-hidden"
            >
              <div className="p-4">
                <div className="flex items-center space-x-4">
                  <img
                    src={
                      `http://localhost:3012/${employee.image}` ||
                      "/images/employe-img.png"
                    }
                    alt={employee.fullName}
                    className="w-14 h-14 rounded-full object-cover border"
                  />
                  <div>
                    <h3 className="text-md font-semibold text-gray-800 truncate">
                      {employee.fullName}
                    </h3>
                    <p className="text-sm text-gray-500">{employee.email}</p>
                  </div>
                </div>

                <div className="mt-4 text-sm text-gray-600 space-y-1">
                  <p>
                    <strong>Phone:</strong> {employee.phoneNumber || "N/A"}
                  </p>
                  <p>
                    <strong>Gender:</strong> {employee.gender || "N/A"}
                  </p>
                  <p>
                    <strong>Joined:</strong>{" "}
                    {employee.createdAt
                      ? new Date(employee.createdAt).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>

                <div className="mt-4 flex justify-between gap-2">
                  <button
                    onClick={() => handleView(employee)}
                    className="w-full py-1.5 rounded bg-blue-100 text-blue-700 hover:bg-blue-200 text-xs font-medium"
                  >
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal portals (unchanged below this) */}
      {isModalOpen &&
        selectedEmployee &&
        createPortal(
          <div className="fixed inset-0 z-99999 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-xl overflow-auto max-h-[90vh] relative">
              <button
                onClick={handleClose}
                className="absolute top-3 right-3 text-gray-600 hover:text-black text-xl"
              >
                ✕
              </button>

              <div className="flex flex-col items-start">
                <div className="w-32 h-32 mb-6 rounded-md overflow-hidden bg-gray-300">
                  <img
                    src={
                      `http://localhost:3012/${selectedEmployee.image}` ||
                      "/images/employe-img.png"
                    }
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>

                <h1 className="text-2xl font-bold mb-1">
                  {selectedEmployee.fullName}
                </h1>
                <hr className="w-full my-2" />

                <div className="w-full mb-4">
                  <h2 className="text-lg text-gray-500 font-semibold mb-1">
                    Contact Information
                  </h2>
                  <p className="text-sm">Email: {selectedEmployee.email}</p>
                  <p className="text-sm">
                    Phone: {selectedEmployee.phoneNumber}
                  </p>
                  <p className="text-sm">Address: {selectedEmployee.address}</p>
                </div>

                <div className="w-full">
                  <h2 className="text-lg text-gray-500 font-semibold mb-1">
                    More Info
                  </h2>
                  <p className="text-sm">Gender: {selectedEmployee.gender}</p>
                  <p className="text-sm">
                    Joined:{" "}
                    {new Date(selectedEmployee.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <button
                  onClick={() => setIsRequestModalOpen(true)}
                  className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Send Request
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}

      {/* Request Modal */}
      {isRequestModalOpen &&
        createPortal(
          <div className="fixed inset-0 z-99999 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="bg-white rounded-lg p-6 shadow-lg max-w-md w-full relative">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Send Request to {selectedEmployee?.fullName}
              </h2>
              <input
                placeholder="Enter Job ID"
                value={jobId}
                onChange={(e) => setJobId(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md mb-3"
              />
              <textarea
                placeholder="Message"
                value={requestMessage}
                onChange={(e) => setRequestMessage(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
              />
              <div className="flex justify-end gap-3">
                <button
                  onClick={handleClose}
                  className="px-4 py-1 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleRequestSubmit}
                  className="px-4 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Send
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}

      {/* Delete Modal */}
      {isConfirmDeleteOpen &&
        createPortal(
          <div className="fixed inset-0 z-99999 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm w-full relative">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Are you sure you want to delete this employee?
              </h2>
              <div className="flex justify-end gap-3">
                <button
                  onClick={handleCancelDelete}
                  className="px-4 py-1 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className="px-4 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default Employees;
