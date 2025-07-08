import { useEffect, useState } from "react";
import axios from "axios";
import { createPortal } from "react-dom";
import toast from "react-hot-toast";

// Types
interface Organization {
  fullName: string;
  _id: string;
  organizationName: string;
}

interface Job {
  _id: string;
  title: string;
  description: string;
  location: string;
  employmentType: string;
  salaryRange: string;
  organizationId: Organization;
}

interface JobCardProps {
  job: Job;
  onViewDetails: (job: Job) => void;
}

// Job Card Component
const JobCard: React.FC<JobCardProps> = ({ job, onViewDetails }) => {
  const org = job.organizationId || {};
  return (
    <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition">
      <h2 className="text-lg font-semibold text-gray-800">{job.title}</h2>
      <p className="text-sm text-gray-500 mb-1">
        {org.fullName || "Unknown Organization"}
      </p>
      <p className="text-sm text-gray-500">Location: {job.location}</p>
      <p className="text-sm text-gray-500 mb-4">Type: {job.employmentType}</p>
      <button
        onClick={() => onViewDetails(job)}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 rounded text-sm"
      >
        View Details
      </button>
    </div>
  );
};

// Main Jobs Page Component
const JobsPage: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showJobModal, setShowJobModal] = useState(false);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [note, setNote] = useState("");
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const token = localStorage.getItem("userAuthToken");
      const res = await axios.get(
        "http://localhost:3012/api/v1/candidate/get-jobs",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setJobs(res.data.data || []);
    } catch (err) {
      toast.error("Failed to fetch jobs");
    } finally {
      setLoading(false);
    }
  };

  const handleJobView = (job: Job) => {
    setSelectedJob(job);
    setShowJobModal(true);
    document.body.style.overflow = "hidden";
  };

  const handleApplyClick = () => {
    setShowJobModal(false);
    setShowApplyModal(true);
  };

  const closeModals = () => {
    setShowJobModal(false);
    setShowApplyModal(false);
    setSelectedJob(null);
    setNote("");
    setCvFile(null);
    document.body.style.overflow = "auto";
  };

  const handleApplicationSubmit = async () => {
    if (!selectedJob?._id) return;
    if (!cvFile) {
      toast.error("Please upload your CV");
      return;
    }

    try {
      const token = localStorage.getItem("userAuthToken");
      const formData = new FormData();
      formData.append("note", note);
      formData.append("cv", cvFile);

      await axios.post(
        `http://localhost:3012/api/v1/candidate/apply-job/${selectedJob._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Application submitted successfully");
      closeModals();
    } catch (err) {
      toast.error("Application failed");
    }
  };

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold text-center">Available Jobs</h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <JobCard key={job._id} job={job} onViewDetails={handleJobView} />
          ))}
        </div>
      )}

      {/* Job Detail Modal */}
      {showJobModal &&
        selectedJob &&
        createPortal(
          <div className="fixed inset-0 bg-black/50 z-999999 flex items-center justify-center">
            <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-xl relative overflow-auto max-h-[90vh]">
              <button
                onClick={closeModals}
                className="absolute top-3 right-3 text-xl text-gray-600 hover:text-black"
              >
                ✕
              </button>
              <h2 className="text-xl font-bold text-center text-blue-600 mb-4">
                {selectedJob.title}
              </h2>
              <div className="space-y-2 text-sm text-gray-700">
                <p>
                  <strong>Description:</strong> {selectedJob.description}
                </p>
                <p>
                  <strong>Location:</strong> {selectedJob.location}
                </p>
                <p>
                  <strong>Type:</strong> {selectedJob.employmentType}
                </p>
                <p>
                  <strong>Salary:</strong> {selectedJob.salaryRange}
                </p>
                <p>
                  <strong>Organization:</strong>{" "}
                  {selectedJob.organizationId?.fullName || "N/A"}
                </p>
              </div>
              <div className="mt-6 text-right">
                <button
                  onClick={handleApplyClick}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-1.5 rounded"
                >
                  Apply for this Job
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}

      {/* Application Modal */}
      {showApplyModal &&
        createPortal(
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md relative overflow-auto max-h-[90vh]">
              <button
                onClick={closeModals}
                className="absolute top-3 right-3 text-xl text-gray-600 hover:text-black"
              >
                ✕
              </button>
              <h2 className="text-xl font-bold mb-4 text-center text-green-600">
                Apply for {selectedJob?.title}
              </h2>
              <div className="space-y-4">
                <textarea
                  placeholder="Add a short note (optional)"
                  className="w-full border rounded px-3 py-2 text-sm resize-none"
                  rows={4}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                ></textarea>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => setCvFile(e.target.files?.[0] || null)}
                  className="w-full border rounded px-3 py-2 text-sm"
                />
                <button
                  onClick={handleApplicationSubmit}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded font-medium text-sm"
                >
                  Submit Application
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
