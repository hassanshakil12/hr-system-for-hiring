import {
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  ReactPortal,
  useEffect,
  useState,
} from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { createPortal } from "react-dom";

const JobsPage = () => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [applications, setApplications] = useState<any[]>([]);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const token = localStorage.getItem("userAuthToken");
      const res = await axios.get(
        "http://localhost:3012/api/v1/organization/get-jobs",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setJobs(res.data.data);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to fetch jobs");
    }
  };

  const handleViewJob = async (job: any) => {
    setSelectedJob(job);
    setIsViewModalOpen(true);
    document.body.style.overflow = "hidden";
    try {
      const token = localStorage.getItem("userAuthToken");
      const res = await axios.get(
        `http://localhost:3012/api/v1/organization/get-applications/${job._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setApplications(res.data.data);
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Failed to fetch applications"
      );
    }
  };

  const handleDeleteClick = (job: any) => {
    setSelectedJob(job);
    setIsDeleteModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const handleConfirmDelete = async () => {
    try {
      const token = localStorage.getItem("userAuthToken");
      await axios.delete(
        `http://localhost:3012/api/v1/organization/delete-job/${selectedJob._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Job deleted successfully");
      setJobs(jobs.filter((job) => job._id !== selectedJob._id));
      setIsDeleteModalOpen(false);
      setSelectedJob(null);
      document.body.style.overflow = "auto";
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Delete failed");
    }
  };

  const handleCloseModal = () => {
    setIsViewModalOpen(false);
    setIsDeleteModalOpen(false);
    setSelectedJob(null);
    setApplications([]);
    document.body.style.overflow = "auto";
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-6 text-center">All Jobs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <div
            key={job._id}
            className="bg-white rounded-xl shadow p-5 border border-gray-200 hover:shadow-md"
          >
            <h2 className="text-lg font-semibold text-gray-800 truncate">
              {job.title}
            </h2>
            <p className="text-sm text-gray-600 mt-1 truncate">
              {job.description?.slice(0, 100)}...
            </p>
            <div className="text-xs text-gray-500 mt-2">
              <p>Location: {job.location}</p>
              <p>Type: {job.employmentType}</p>
              <p>Posted On: {new Date(job.createdAt).toLocaleDateString()}</p>
            </div>
            <div className="mt-4 flex gap-2 justify-end">
              <button
                onClick={() => handleViewJob(job)}
                className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                View
              </button>
              <button
                onClick={() => handleDeleteClick(job)}
                className="px-3 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* View Job Modal */}
      {isViewModalOpen &&
        selectedJob &&
        createPortal(
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-999999">
            <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 relative">
              {/* Close Button */}
              <button
                className="absolute top-3 right-3 text-gray-500 hover:text-red-600 text-lg"
                onClick={handleCloseModal}
              >
                ✕
              </button>

              {/* Job Title */}
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {selectedJob.title}
              </h2>
              <p className="text-gray-600 text-sm mb-4">
                {selectedJob.description}
              </p>

              {/* Job Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700 mb-4">
                <div>
                  <span className="font-medium text-gray-900">Location: </span>
                  {selectedJob.location}
                </div>
                <div>
                  <span className="font-medium text-gray-900">Type: </span>
                  {selectedJob.employmentType}
                </div>
                <div>
                  <span className="font-medium text-gray-900">Salary: </span>
                  {selectedJob.salaryRange}
                </div>
                <div className="col-span-full">
                  <span className="font-medium text-gray-900">Keywords:</span>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {selectedJob.keywords.map(
                      (keyword: string, index: number) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium"
                        >
                          {keyword}
                        </span>
                      )
                    )}
                  </div>
                </div>
              </div>

              <hr className="my-4 border-gray-300" />

              {/* Applications */}
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Applications ({applications.length})
              </h3>

              {applications.length > 0 ? (
                <ul className="space-y-4 mt-3">
                  {applications.map((app) => (
                    <li
                      key={app._id}
                      className="border rounded-lg p-4 bg-gray-50 shadow-sm"
                    >
                      <div className="mb-2">
                        <h4 className="text-base font-semibold text-gray-800">
                          {app.candidateId?.fullName}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {app.candidateId?.email} &nbsp;|&nbsp;{" "}
                          {app.candidateId?.phoneNumber}
                        </p>
                      </div>

                      {app.candidateId?.bio && (
                        <p className="text-sm text-gray-700 mb-2">
                          <span className="font-medium">Bio:</span>{" "}
                          {app.candidateId.bio}
                        </p>
                      )}

                      {app.cv ? (
                        <a
                          href={`http://localhost:3012/${app.cv}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block mt-1 text-blue-600 text-sm hover:underline"
                        >
                          📄 View CV
                        </a>
                      ) : (
                        <p className="text-sm text-gray-400 italic">
                          No CV uploaded
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500 mt-2">
                  No applications found.
                </p>
              )}
            </div>
          </div>,
          document.body
        )}

      {/* Delete Modal */}
      {isDeleteModalOpen &&
        selectedJob &&
        createPortal(
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-sm w-full relative">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Confirm Delete
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                Are you sure you want to delete the job:{" "}
                <b>{selectedJob.title}</b>?
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={handleCloseModal}
                  className="px-4 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className="px-4 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Yes, Delete
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
