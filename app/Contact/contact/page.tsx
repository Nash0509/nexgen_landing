"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { PhoneCall, Mail, MapPin } from "lucide-react";
import Map from "@/app/Components/Map";
import { toast } from "react-toastify";
import Spinner from "@/app/Components/Spinner";
import Joi from "joi";

const Page = () => {
  const api_base_url = process.env.API_BASE_URL;

  const [contactInfo, setContactInfo] = React.useState({
    name: "",
    email: "",
    phone: undefined as number | undefined,
    querry: "",
  });
  const [errorInfo, setErrorInfo] = React.useState({
    name: "",
    email: "",
    phone: "",
    querry: "",
  });
  const [loading, setLoading] = React.useState(false);

  const contactSchema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
    phone: Joi.string()
      .pattern(/^\d{10}$/)
      .required(),
    querry: Joi.string().min(5).max(500).required(),
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string
  ) => {
    setContactInfo({ ...contactInfo, [field]: e.target.value });
  };

  const handleSubmit = () => {
    setLoading(true);
    const { error } = contactSchema.validate(contactInfo, {
      abortEarly: false,
    });
    if (error) {
      error.details.forEach((err) => {
        setErrorInfo((prev) => ({ ...prev, [err.path[0]]: err.message }));
      });
      setLoading(false);
      return;
    }
    fetch(`${api_base_url}/vacancy/querry`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contactInfo),
    })
      .then((res) => res.json())
      .then(() => {
        toast.success(
          "Your querry have been submitted successfully. Out team will get back to you soon."
        );
        ["name", "email", "phone", "querry"].forEach((field) => {
          setContactInfo((prev) => ({ ...prev, [field]: "" }));
          setErrorInfo((prev) => ({ ...prev, [field]: "" }));
        });
        setLoading(false);
      })
      .catch(() => {
        toast.error("An error occurred while submitting the query.");
      });
  };

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center px-6 py-16 space-y-12">
      <div className="absolute z-[0] w-[60%] h-[60%] -left-[50%] rounded-full blue__gradient bottom-40 border-2" />
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl font-bold text-white">
          Get <span className="text-red-500">in</span> Touch
        </h1>
        <p className="text-gray-400 mt-2">
          Reach out to us for any inquiries about our products and services.
        </p>
      </div>
      <div className="flex flex-wrap gap-4 w-full max-w-7xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-gray-800 p-6 grow rounded-lg border border-gray-600 transition-all hover:shadow-lg shadow-lg flex-1 text-center flex items-center justify-center"
        >
          <p className="text-gray-300 text-lg leading-relaxed">
            Have any questions? Contact the{" "}
            <span className="font-semibold text-white">Nexgen team</span>.
            We&rsquo;ll be happy to assist you with top-quality service.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full"
        >
          {[
            {
              title: "Call us now",
              content: "+91 (Land Line)",
              href: "tel:+919810227663",
              icon: <PhoneCall size={24} className="text-blue-400" />,
            },
            {
              title: "Visit our office",
              content:
                "Swadeshi compound, A-1/265, Kavi Nagar Industrial Area, Sector 17, Kavi Nagar, Ghaziabad, Uttar Pradesh 201002",
              href: "https://maps.app.goo.gl/kJXsfFrB65iNeApr7",
              icon: <MapPin size={24} className="text-red-400" />,
            },
            {
              title: "Send an email",
              content: "info@nexgen.in",
              href: "mailto:info@nexgen.in",
              icon: <Mail size={24} className="text-green-400" />,
            },
          ].map((item, index) => (
            <motion.a
              key={index}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{
                scale: 1.05,
                backgroundColor: "#2563eb",
                color: "#fff",
              }}
              className="p-5 bg-gray-800 bg-opacity-75 shadow-md rounded-xl text-lg font-medium text-white border border-gray-600 transition-all hover:shadow-lg flex flex-col items-center gap-3 text-center"
            >
              {item.icon}
              <p className="text-lg font-semibold text-gray-400">
                {item.title}
              </p>
              <p className="text-white">{item.content}</p>
            </motion.a>
          ))}
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 bg-opacity-90 shadow-xl rounded-lg p-8 w-full max-w-7xl flex flex-wrap justify-center gap-8"
      >
        <div className="flex-1">
          <h2 className="text-3xl font-semibold text-center text-white mb-6">
            Send <span className="text-red-500">a</span> query
          </h2>
          <div className="flex flex-col gap-4">
            {["name", "email", "phone"].map((field: string, index) => (
              <React.Fragment key={index}>
                <input
                  key={index}
                  type={
                    field === "email"
                      ? "email"
                      : field === "phone"
                      ? "number"
                      : "text"
                  }
                  placeholder={field.replace(/([A-Z])/g, " $1").trim()}
                  //@ts-expect-error Not that important error
                  value={contactInfo[field]}
                  onChange={(e) => handleChange(e, field)}
                  className="p-3 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-700 text-white placeholder-gray-400"
                />
                <p>
                  {errorInfo[field as keyof typeof errorInfo] && (
                    <span className="text-red-500 text-sm">
                      {errorInfo[field as keyof typeof errorInfo]}
                    </span>
                  )}
                </p>
              </React.Fragment>
            ))}
            <textarea
              placeholder="Your Query"
              value={contactInfo.querry}
              onChange={(e) => handleChange(e, "querry")}
              className="p-3 rounded-md h-32 border border-gray-700 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-700 text-white placeholder-gray-400"
            />
            <button
              onClick={handleSubmit}
              className="p-3 bg-blue-500 text-white flex justify-center items-center gap-4 font-medium rounded-md transition duration-200 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {loading && <Spinner />} {!loading && "Submit"}
            </button>
          </div>
        </div>

        <div className="flex-1 flex justify-center items-center min-w-[350px] max-w-md">
          <Image
            src="/a11.png"
            width={400}
            height={400}
            alt="Floating Decoration"
            className="rounded-lg shadow-lg"
          />
        </div>
      </motion.div>
      <div className="w-full max-w-7xl">
        <Map />
      </div>
    </div>
  );
};

export default Page;
