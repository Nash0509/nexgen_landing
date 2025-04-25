"use client";
import React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { toast } from "react-toastify";
import Spinner from "@/app/Components/Spinner";
import Joi from "joi";

const ApplyForm = () => {
  const [loading, setLoading] = React.useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  const [formData, setFormData] = React.useState({
    fullName: "",
    email: "",
    phone: undefined as number | undefined,
    dob: null as Date | null,
    graduation: "",
    resume: null as File | null,
    residence: "",
  });

  const [errorInfo, setErrorInfo] = React.useState({
    fullName: "",
    email: "",
    phone: "",
    dob: "",
    graduation: "",
    resume: "",
    residence: "",
  });

  const applySchema = Joi.object({
    fullName: Joi.string().min(3).max(50).required(),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
    phone: Joi.string()
      .pattern(/^\d{10}$/)
      .required(),
    dob: Joi.date().required(),
    graduation: Joi.string().required(),
    resume: Joi.object().required(),
    residence: Joi.string().min(5).max(500).required(),
  });

  const api_base_url = process.env.API_BASE_URL;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "dob" ? (value ? new Date(value) : null) : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      //@ts-expect-error suppress for resume file
      setFormData((prev) => ({ ...prev, resume: e.target.files[0] }));
    }
  };

  const handleSubmit = () => {
    const { error } = applySchema.validate(formData, { abortEarly: false });

    // Reset all errors first
    setErrorInfo({
      fullName: "",
      email: "",
      phone: "",
      dob: "",
      graduation: "",
      resume: "",
      residence: "",
    });

    if (error) {
      error.details.forEach((err) => {
        setErrorInfo((prev) => ({
          ...prev,
          [err.path[0] as string]: err.message,
        }));
      });
      return;
    }

    const resumeToSend = new FormData();
    if (formData.resume) {
      resumeToSend.append("file", formData.resume);
    }

    setLoading(true);

    fetch(
      `${api_base_url}/vacancy/vacancyaplicant?name=${
        formData.fullName
      }&email=${formData.email}&phoneNo=${Number(formData.phone)}&dob=${
        formData.dob
      }&qualification=${formData.graduation}&address=${
        formData.residence
      }&vacancyId=${Number(searchParams.get("id"))}`,
      {
        method: "POST",
        body: resumeToSend,
      }
    )
      .then((res) => res.json())
      .then(() => {
        setLoading(false);
        setFormData({
          fullName: "",
          email: "",
          phone: undefined,
          dob: null,
          graduation: "",
          resume: null,
          residence: "",
        });
        setErrorInfo({
          fullName: "",
          email: "",
          phone: "",
          dob: "",
          graduation: "",
          resume: "",
          residence: "",
        });
        toast.success("Application sent successfully!");
        router.push("/Jobs/jobs");
      })
      .catch(() => {
        setLoading(false);
        toast.error("An error occurred, please try again...");
      });
  };

  return (
    <div className="relative min-h-screen bg-gray-900 text-white flex flex-col md:flex-row items-center justify-center p-6 gap-8">
      <div className="absolute z-[0] w-[60%] h-[60%] -left-[50%] rounded-full blue__gradient bottom-40 border-2" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full hidden md:block md:w-[45%] p-8 rounded-xl shadow-lg min-h-screen md:flex md:justify-center md:items-center"
      >
        <Image
          src="/jobs.png"
          height={450}
          width={450}
          alt="apply_jobs"
          className=""
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-gray-800 w-full m-auto p-8 rounded-xl shadow-lg min-h-screen"
      >
        <h2 className="text-xl font-bold text-white mb-6 text-center">
          Apply for{" "}
          <span className="text-red-500">{searchParams.get("position")}</span>
        </h2>

        <div className="space-y-5">
          <div>
            <label className="text-gray-300 text-sm">Full Name</label>
            <input
              type="text"
              name="fullName"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {errorInfo.fullName && (
              <p className="text-red-500 text-sm">{errorInfo.fullName}</p>
            )}
          </div>

          <div>
            <label className="text-gray-300 text-sm">Email</label>
            <input
              type="email"
              name="email"
              required
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {errorInfo.email && (
              <p className="text-red-500 text-sm">{errorInfo.email}</p>
            )}
          </div>

          <div>
            <label className="text-gray-300 text-sm">Phone No.</label>
            <input
              type="number"
              name="phone"
              placeholder="Phone"
              value={formData.phone ?? ""}
              onChange={handleChange}
              className="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {errorInfo.phone && (
              <p className="text-red-500 text-sm">{errorInfo.phone}</p>
            )}
          </div>

          <div>
            <label className="text-gray-300 text-sm">Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={
                formData.dob ? formData.dob.toISOString().split("T")[0] : ""
              }
              onChange={handleChange}
              className="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {errorInfo.dob && (
              <p className="text-red-500 text-sm">{errorInfo.dob}</p>
            )}
          </div>

          <div>
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
            {errorInfo.graduation && (
              <p className="text-red-500 text-sm">{errorInfo.graduation}</p>
            )}
          </div>

          <div>
            <label className="text-gray-300 text-sm">Upload Resume</label>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="w-full text-white bg-gray-700 rounded-lg p-3 cursor-pointer file:bg-blue-500 file:text-white file:border-0 file:rounded-md file:px-4 file:py-2 hover:file:bg-green-600 transition"
            />
            {errorInfo.resume && (
              <p className="text-red-500 text-sm">{errorInfo.resume}</p>
            )}
          </div>

          <div>
            <label className="text-gray-300 text-sm">Place of Residence</label>
            <input
              type="text"
              name="residence"
              placeholder="Enter residence"
              value={formData.residence}
              onChange={handleChange}
              className="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {errorInfo.residence && (
              <p className="text-red-500 text-sm">{errorInfo.residence}</p>
            )}
          </div>
        </div>

        <button
          className="w-full mt-6 bg-blue-500 text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-green-600 transition duration-200 shadow-md"
          onClick={handleSubmit}
        >
          {!loading && <CheckCircle size={22} />}
          {loading && <Spinner />}
          Submit Application
        </button>
      </motion.div>
    </div>
  );
};

export default ApplyForm;
