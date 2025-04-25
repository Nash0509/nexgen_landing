"use client";
import React, { useState } from "react";
import { Briefcase, MapPin, FileText, X, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

type jobDetails = {
  id: number;
  position: string;
  description: string;
  addressL1: string;
  addressL2: string;
  pinCode: number;
  mode: string;
  workingHr: string;
  date: string;
  status: boolean;
  ctc: string;
};

export default function JobListings() {
  interface Job {
    id: number;
    position: string;
    description: string;
    addressL1: string;
    addressL2: string;
    pinCode: number;
    mode: string;
    workingHr: string;
    date: string;
    status: boolean;
    ctc: string;
  }

  const jobToQueryParams = (job: jobDetails) => {
    return new URLSearchParams({
      id: job.id.toString(),
      position: job.position,
      description: job.description,
      addressL1: job.addressL1,
      addressL2: job.addressL2,
      pinCode: job.pinCode.toString(),
      mode: job.mode,
      workingHr: job.workingHr,
      date: job.date,
      status: job.status.toString(),
      ctc: job.ctc,
    }).toString();
  };

  const api_base_url = process.env.API_BASE_URL;

  const router = useRouter();

  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showDetails, setShowDetails] = useState<Job | null>(null);
  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    graduation: "",
    resume: null as File | null,
    residence: "",
  });
  const [jobs, setJobs] = useState([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      //@ts-expect-error Not that important error
      setFormData((prev) => ({ ...prev, resume: e.target.files[0] }));
    }
  };

  const handleSubmit = () => {
    setSelectedJob(null);
  };

  React.useEffect(() => {
    fetch(`${api_base_url}/vacancy`)
      .then((res) => res.json())
      .then((res) => {
        setJobs(res);
        console.log("This is the jobs...", res);
      })
      .catch(() => {
        toast.error(
          "An error occured while fetching the jobs, please try again..."
        );
      });
  }, [api_base_url]);

  return (
    <div className="relative min-h-screen bg-gray-900 text-white p-10 pt-[6rem]">
      <h1 className="text-4xl font-bold text-center mb-10">
        Job <span className="text-red-500">Openings</span>
      </h1>
      <div className="absolute z-[0] w-[60%] h-[60%] -left-[50%] rounded-full blue__gradient bottom-40 border-2" />
      <div className="relative grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job: jobDetails) => (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            key={job.id}
            className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700"
          >
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Briefcase size={20} /> {job.position}
            </h2>
            <p className="text-gray-400 flex items-center gap-2 mt-2">
              <MapPin size={18} />{" "}
              {job.addressL1 + ", " + job.addressL2 + ", " + job.pinCode}
            </p>
            <p
              className="text-blue-400 underline py-2 cursor-pointer"
              onClick={() => setShowDetails(job)}
            >
              View Details
            </p>
            <button
              className="mt-2 flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              onClick={() => {
                const query = jobToQueryParams(job);
                router.push(`/Jobs/apply?${query}`);
              }}
            >
              <FileText size={18} /> Apply Now
            </button>
          </motion.div>
        ))}
      </div>

      {showDetails && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 m-4">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96 border border-gray-700">
            <h2 className="text-xl md:2xl font-bold text-white mb-4">
              {showDetails.position}
            </h2>
            <p className="text-gray-300 mb-2 text-md md:text-lg">
              <strong>Description:</strong> {showDetails.description}
            </p>
            <p className="text-gray-400 mb-4">
              <strong>Location:</strong>{" "}
              {showDetails.addressL1 +
                ", " +
                showDetails.addressL2 +
                ", " +
                showDetails.pinCode}
            </p>
            <div className="flex gap-2">
              <button
                className="w-full bg-red-500 text-white py-2 rounded-md flex items-center justify-center gap-2 hover:bg-red-600"
                onClick={() => setShowDetails(null)}
              >
                <X size={18} /> Close
              </button>
              <button
                className="w-full bg-blue-500 text-white py-2 rounded-md flex items-center justify-center gap-2 hover:bg-blue-600"
                onClick={() => {
                  const query = jobToQueryParams(showDetails);
                  router.push(`/Jobs/apply?${query}`);
                }}
              >
                <FileText size={18} /> Apply Now
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedJob && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80">
          <div className="bg-gray-800 p-10 rounded-xl shadow-2xl w-[500px] border border-gray-700">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              Apply for {selectedJob.position}
            </h2>

            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-gray-300 text-sm">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full name"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-gray-300 text-sm">Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-gray-300 text-sm">Qualification</label>
                <select
                  name="graduation"
                  value={formData.graduation}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="" disabled>
                    Select Qualification
                  </option>
                  <option value="B.Tech">B.Tech</option>
                  <option value="M.Tech">M.Tech</option>
                  <option value="B.Sc">B.Sc</option>
                  <option value="M.Sc">M.Sc</option>
                  <option value="Diploma">Diploma</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-gray-300 text-sm">Upload Resume</label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="w-full text-white bg-gray-700 rounded-lg p-3 cursor-pointer file:bg-green-500 file:text-white file:border-0 file:rounded-md file:px-4 file:py-2 hover:file:bg-green-600 transition"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-gray-300 text-sm">
                  Place of Residence
                </label>
                <input
                  type="text"
                  name="residence"
                  placeholder="Enter residence"
                  value={formData.residence}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            <button
              className="w-full mt-6 bg-green-500 text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-green-600 transition duration-200"
              onClick={handleSubmit}
            >
              <CheckCircle size={20} /> Submit Application
            </button>

            <button
              className="mt-4 text-gray-400 w-full py-3 flex items-center justify-center gap-2 hover:text-white transition duration-200"
              onClick={() => setSelectedJob(null)}
            >
              <X size={20} /> Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
