/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { fetchPartners } from "@/lib/partnerService";
import Image from "next/image";

interface ServicePartner {
  id: string;
  company_name: string;
  logo: string;
  website: string;
}

// Zod schema for form validation
const formSchema = z.object({
  companyName: z.string().min(1, { message: "Company name is required" }),
  industry: z.string().min(1, { message: "Please select an industry" }),
  companySize: z.string().min(1, { message: "Please select company size" }),
  contactName: z.string().min(1, { message: "Contact name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  services: z
    .array(z.string())
    .min(1, { message: "Select at least one service" }),
  providerPreferences: z
    .array(z.string())
    .min(1, { message: "Select at least one preference" }),
  multipleProviders: z.boolean({
    required_error: "Please select an option",
  }),
  confirmSubmission: z.boolean().refine((val) => val === true, {
    message: "You must confirm to submit",
  }),
  preferredPartners: z.array(z.string()),       
  packageDuration: z
    .string()
    .min(1, { message: "Please select a package duration" }),
  specialRequirements: z.string().optional(),
});
interface SecurityAssessmentRequest {
  companyName: string;
  companySize: string;
  confirmSubmission: boolean;
  contactName: string;
  email: string;
  industry: string;
  multipleProviders: boolean;
  packageDuration: string;
  providerPreferences: string[];
  services: string[];
  specialRequirements?: string;
}

// Services and Provider Preferences data
const servicesData = [
  {
    id: "api",
    name: "API Security Testing",
    icon: "M12 19l9 2-9-18-9 18 9-2zm0 0v-8",
  },
  {
    id: "cloud",
    name: "Cloud Penetration Testing",
    icon: "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z",
  },
  {
    id: "network",
    name: "Network Penetration Testing",
    icon: "M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4",
  },
  {
    id: "web",
    name: "Web Penetration Testing",
    icon: "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9",
  },
  {
    id: "endpoint",
    name: "Endpoint Security",
    icon: "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z",
  },
  {
    id: "compliance",
    name: "Compliance Audits",
    icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
  },
  {
    id: "training",
    name: "Security Training",
    icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
  },
  {
    id: "others",
    name: "Others",
    icon: "M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z",
  },
];

const preferenceData = [
  {
    id: "experience",
    name: "Industry Experience",
    icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  },
  {
    id: "pricing",
    name: "Affordable Pricing",
    icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    id: "response",
    name: "Fast Response Time",
    icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    id: "track",
    name: "Proven Track Record",
    icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z",
  },
  {
    id: "flexible",
    name: "Flexible Engagement Models",
    icon: "M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4",
  },
  {
    id: "certifications",
    name: "Certifications & Accreditations",
    icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
  },
];

interface svgIconProps {
  path: string;
  className?: string;
}

const SvgIcon = (props: svgIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={props.className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d={props.path}
    />
  </svg>
);

export default function Home() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<SecurityAssessmentRequest>();
  const [activeSection, setActiveSection] = useState(1);
  const [formProgress, setFormProgress] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [loading, setIsLoading] = useState<boolean>(false);
  const [submissionError, setSubmissionError] = useState<string | null>();
  const [partners, setPartners] = useState<ServicePartner[]>([]);
  const [loadingPartners, setLoadingPartners] = useState(true);

  useEffect(() => {
    const loadPartners = async () => {
      setLoadingPartners(true);
      try {
        const fetchedPartners = await fetchPartners();
        setPartners(fetchedPartners);
      } catch (error) {
        console.error("Failed to load partners:", error);
      } finally {
        setLoadingPartners(false);
      }
    };

    loadPartners();
  }, []);

  //   useEffect(() => {
  //     setMounted(true);

  //     // Add background animation
  //     const interval = setInterval(() => {
  //       if (document.getElementById('gradient-bg')) {
  //         document.getElementById('gradient-bg').style.backgroundPosition = `${Math.random() * 100}% ${Math.random() * 100}%`;
  //       }
  //     }, 3000);

  //     return () => clearInterval(interval);
  //   }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    trigger,
    setValue,
  } = useForm({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      services: [],
      providerPreferences: [],
      multipleProviders: undefined, // Changed from false to undefined for proper validation
      packageDuration: "",
      confirmSubmission: false,
    },
  });

  useEffect(() => {
    // Calculate form progress
    const totalSections = 5;
    const completedSections = activeSection - 1;
    const progressPercentage = (completedSections / totalSections) * 100;
    setFormProgress(progressPercentage);
  }, [activeSection]);

  const onSubmit = async (data: SecurityAssessmentRequest) => {
    setIsLoading(true);
    setSubmissionError(null);

    try {
      const response = await axios.post("/api/requestPackage", data);
      console.log(response, "res");
      // Update state to show success message
      setFormData(data);
      setIsSubmitted(true);

      return response.data;
    } catch (error) {
      console.error("Error submitting security assessment form:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const watchServices = watch("services");
  const watchPreferences = watch("providerPreferences");

  const nextSection = async () => {
    let fieldsToValidate: string[] = [];

    switch (activeSection) {
      case 1:
        fieldsToValidate = [
          "companyName",
          "industry",
          "companySize",
          "contactName",
          "email",
        ];
        break;
      case 2:
        fieldsToValidate = ["services"];
        break;
      case 3:
        fieldsToValidate = ["providerPreferences", "multipleProviders"];
        break;
      case 4:
        fieldsToValidate = ["packageDuration"];
        break;
      default:
        break;
    }
    type FormField =
      | "companyName"
      | "industry"
      | "companySize"
      | "contactName"
      | "email"
      | "services"
      | "providerPreferences"
      | "multipleProviders"
      | "packageDuration";

    const isStepValid = await trigger(fieldsToValidate as FormField[]);
    if (isStepValid && activeSection < 6) {
      setActiveSection((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const prevSection = () => {
    if (activeSection > 1) {
      setActiveSection((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Animation variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  // Render check icon for completed sections
  const renderSectionIcon = (sectionNumber: number) => {
    if (sectionNumber < activeSection) {
      return (
        <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      );
    } else if (sectionNumber === activeSection) {
      return (
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-red-600 to-orange-500 flex items-center justify-center text-white font-bold">
          {sectionNumber}
        </div>
      );
    } else {
      return (
        <div className="w-8 h-8 rounded-full border-2 border-gray-500 text-gray-500 flex items-center justify-center font-bold">
          {sectionNumber}
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen mt-12 bg-black text-white relative overflow-hidden">
      {/* Dynamic gradient background */}
      <div
        id="gradient-bg"
        className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-black transition-all duration-3000 ease-in-out"
        style={{ backgroundSize: "400% 400%" }}
      ></div>

      {/* Animated background elements */}
      {mounted && (
        <>
          <div className="fixed inset-0 overflow-hidden pointer-events-none">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0.2, 0.4, 0.2],
                x: ["-10%", "5%", "-10%"],
                y: ["-15%", "-5%", "-15%"],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-gradient-to-r from-red-600/20 to-orange-500/10 blur-3xl"
            ></motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0.15, 0.3, 0.15],
                x: ["5%", "-5%", "5%"],
                y: ["10%", "20%", "10%"],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="absolute top-1/3 -left-20 w-72 h-72 rounded-full bg-gradient-to-r from-orange-600/15 to-red-500/5 blur-3xl"
            ></motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0.1, 0.2, 0.1],
                x: ["0%", "10%", "0%"],
                y: ["-5%", "5%", "-5%"],
              }}
              transition={{
                duration: 22,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="absolute bottom-20 right-1/4 w-80 h-80 rounded-full bg-gradient-to-r from-red-700/15 to-orange-600/5 blur-3xl"
            ></motion.div>
          </div>

          {/* Decorative grid lines */}
          <div className="fixed inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
        </>
      )}

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Header with pulsing CTA */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-10"
        >
          <div className="inline-block mb-4">
            <div className="relative inline-flex items-center justify-center">
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                className="absolute inset-0 rounded-full bg-gradient-to-r from-red-600/50 to-orange-500/50 blur-lg"
              ></motion.div>
              <div className="relative bg-black/50 backdrop-blur-sm px-6 py-3 rounded-full border border-gray-700 shadow-lg">
                <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-red-400 via-orange-300 to-red-400 bg-clip-text text-transparent">
                  CyberJall Security Solutions
                </h1>
              </div>
            </div>
          </div>

          <h2 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-red-500 via-orange-400 to-red-500 bg-clip-text text-transparent">
              Submit Your Cybersecurity Requirements
            </span>
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Tell us what you&apos;re looking for, and we&apos;ll help connect
            you with the right cybersecurity service providers — all in one
            custom package tailored to your needs.
          </p>
        </motion.div>

        {/* Progress bar for multi-step form */}
        {!isSubmitted && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="max-w-3xl mx-auto mb-8"
          >
            <div className="flex justify-between text-xs text-gray-500 mb-2 px-1">
              <span>Start</span>
              <span>Complete</span>
            </div>
            <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${formProgress}%` }}
                className="h-full bg-gradient-to-r from-red-500 to-orange-500 rounded-full"
                transition={{ duration: 0.5 }}
              ></motion.div>
            </div>
            <div className="flex justify-between mt-4 relative">
              {[1, 2, 3, 4, 5,6].map((step) => (
                <div key={step} className="flex flex-col items-center relative">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: step <= activeSection ? 1 : 0.8 }}
                    className={`w-8 h-8 rounded-full flex items-center justify-center z-10 transition-all duration-300 ${
                      step < activeSection
                        ? "bg-gradient-to-r from-green-500 to-green-600 text-white"
                        : step === activeSection
                        ? "bg-gradient-to-r from-red-500 to-orange-500 text-white"
                        : "bg-gray-800 text-gray-500"
                    }`}
                  >
                    {step < activeSection ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <span className="text-sm font-medium">{step}</span>
                    )}
                  </motion.div>
                  <span
                    className={`absolute -bottom-6 text-xs whitespace-nowrap ${
                      step === activeSection
                        ? "text-orange-400 font-medium"
                        : "text-gray-500"
                    }`}
                  >
                    {
                      [
                        "Business Info",
                        "Services",
                        "Preferences",
                        "Package",
                        "Partners", 
                        "Submit",
                      ][step - 1]
                    }
                  </span>
                </div>
              ))}
              <div
                className="absolute top-4 h-px w-full bg-gray-700 -z-10"
                style={{ transform: "translateY(-50%)" }}
              ></div>
            </div>
          </motion.div>
        )}

        {isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-3xl mx-auto relative z-10"
          >
            {/* Success card with animated elements */}
            <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black p-10 rounded-2xl border border-gray-700/50 shadow-2xl backdrop-blur-sm">
              {/* Decorative elements */}
              <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br from-orange-600/20 to-red-500/10 blur-2xl"></div>
              <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-gradient-to-br from-red-600/20 to-orange-500/10 blur-2xl"></div>

              <div className="text-center relative z-10">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 20,
                    delay: 0.2,
                  }}
                  className="mb-8"
                >
                  <div className="relative inline-block">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-500/50 to-green-400/50 blur-xl"></div>
                    <div className="relative w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-green-500 to-green-400 flex items-center justify-center shadow-lg">
                      <svg
                        className="w-10 h-10 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  </div>
                </motion.div>

                <motion.h2
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-3xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
                >
                  Request Submitted Successfully!
                </motion.h2>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="space-y-6 text-left"
                >
                  <div className="p-4 rounded-xl bg-black/30 border border-gray-700">
                    <h3 className="text-xl font-semibold mb-2 text-gray-200">
                      What&apos;s Next?
                    </h3>
                    <p className="text-gray-300">
                      Our team at CyberJall is now reviewing your request.
                      We&apos;ll coordinate with the most suitable service
                      providers based on your preferences and package duration.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-black/30 border border-gray-700">
                    <div className="flex items-start">
                      <div className="mr-3 mt-1">
                        <svg
                          className="w-5 h-5 text-orange-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-200">
                          Expected Response Time
                        </h4>
                        <p className="text-gray-400">
                          You can expect to hear from us within 1–2 business
                          days with a curated proposal tailored to your needs.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-black/30 border border-gray-700">
                    <div className="flex items-start">
                      <div className="mr-3 mt-1">
                        <svg
                          className="w-5 h-5 text-orange-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-200">
                          Questions?
                        </h4>
                        <p className="text-gray-400">
                          If you have any questions, feel free to reach out at{" "}
                          <a
                            href="mailto:support@cyberjall.com"
                            className="text-orange-400 hover:text-orange-300 transition-colors"
                          >
                            support@cyberjall.com
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.9 }}
                  className="mt-10"
                >
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="group relative px-6 py-3 overflow-hidden rounded-lg bg-black/40 text-white border border-gray-700 hover:border-orange-400 transition-colors"
                  >
                    <div className="absolute inset-0 w-3 bg-gradient-to-r from-red-500 to-orange-500 transition-all duration-300 ease-out group-hover:w-full"></div>
                    <span className="relative flex items-center justify-center gap-2">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 19l-7-7m0 0l7-7m-7 7h18"
                        />
                      </svg>
                      Return to Form
                    </span>
                  </button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-3xl mx-auto relative z-10"
          >
            <AnimatePresence mode="wait">
              {/* Section 1: Business Information */}
              {activeSection === 1 && (
                <motion.div
                  key="section1"
                  // variants={sectionVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="relative overflow-hidden"
                >
                  <div className="relative overflow-hidden bg-gradient-to-br from-gray-900/90 via-gray-800/90 to-black/90 p-8 md:p-10 rounded-2xl border border-gray-700/50 shadow-2xl backdrop-blur-sm">
                    {/* Section header */}
                    <div className="flex items-center mb-8">
                      {renderSectionIcon(1)}
                      <h2 className="text-2xl md:text-3xl font-bold text-white ml-3">
                        Business Information
                      </h2>
                    </div>

                    <div className="space-y-8">
                      <motion.div  className="group">
                        <label className="block text-gray-300 mb-2 font-medium">
                          Company Name
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <SvgIcon
                              path="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                              className="h-5 w-5 text-gray-500"
                            />
                          </div>
                          <input
                            type="text"
                            {...register("companyName")}
                            className="w-full bg-gray-900/50 border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition duration-200"
                            placeholder="Enter your company name"
                          />
                        </div>
                        {errors.companyName && (
                          <p className="mt-2 text-red-400 text-sm">
                            {errors.companyName.message}
                          </p>
                        )}
                      </motion.div>

                      <motion.div variants={itemVariants} className="group">
                        <label className="block text-gray-300 mb-2 font-medium">
                          Industry
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <SvgIcon
                              path="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                              className="h-5 w-5 text-gray-500"
                            />
                          </div>
                          <select
                            {...register("industry")}
                            className="w-full bg-gray-900/50 border border-gray-700 rounded-lg pl-10 pr-10 py-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none transition duration-200"
                          >
                            <option value="">Select Industry</option>
                            <option value="Finance">Finance</option>
                            <option value="Healthcare">Healthcare</option>
                            <option value="Retail">Retail</option>
                            <option value="SaaS">SaaS</option>
                            <option value="Manufacturing">Manufacturing</option>
                            <option value="Other">Other</option>
                          </select>
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <SvgIcon
                              path="M19 9l-7 7-7-7"
                              className="h-4 w-4 text-gray-500"
                            />
                          </div>
                        </div>
                        {errors.industry && (
                          <p className="mt-2 text-red-400 text-sm">
                            {errors.industry.message}
                          </p>
                        )}
                      </motion.div>

                      <motion.div variants={itemVariants} className="group">
                        <label className="block text-gray-300 mb-2 font-medium">
                          Company Size
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <SvgIcon
                              path="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                              className="h-5 w-5 text-gray-500"
                            />
                          </div>
                          <select
                            {...register("companySize")}
                            className="w-full bg-gray-900/50 border border-gray-700 rounded-lg pl-10 pr-10 py-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none transition duration-200"
                          >
                            <option value="">Select Company Size</option>
                            <option value="1-10">1–10 employees</option>
                            <option value="11-50">11–50 employees</option>
                            <option value="51-200">51–200 employees</option>
                            <option value="201-500">201–500 employees</option>
                            <option value="500+">500+ employees</option>
                          </select>
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <SvgIcon
                              path="M19 9l-7 7-7-7"
                              className="h-4 w-4 text-gray-500"
                            />
                          </div>
                        </div>
                        {errors.companySize && (
                          <p className="mt-2 text-red-400 text-sm">
                            {errors.companySize.message}
                          </p>
                        )}
                      </motion.div>

                      <motion.div variants={itemVariants} className="group">
                        <label className="block text-gray-300 mb-2 font-medium">
                          Contact Person Name
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <SvgIcon
                              path="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                              className="h-5 w-5 text-gray-500"
                            />
                          </div>
                          <input
                            type="text"
                            {...register("contactName")}
                            className="w-full bg-gray-900/50 border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition duration-200"
                            placeholder="Enter contact person name"
                          />
                        </div>
                        {errors.contactName && (
                          <p className="mt-2 text-red-400 text-sm">
                            {errors.contactName.message}
                          </p>
                        )}
                      </motion.div>

                      <motion.div variants={itemVariants} className="group">
                        <label className="block text-gray-300 mb-2 font-medium">
                          Email Address
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <SvgIcon
                              path="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                              className="h-5 w-5 text-gray-500"
                            />
                          </div>
                          <input
                            type="email"
                            {...register("email")}
                            className="w-full bg-gray-900/50 border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition duration-200"
                            placeholder="Enter your email address"
                          />
                        </div>
                        {errors.email && (
                          <p className="mt-2 text-red-400 text-sm">
                            {errors.email.message}
                          </p>
                        )}
                      </motion.div>
                    </div>

                    {/* Navigation buttons */}
                    <div className="mt-10 flex justify-end">
                      <motion.button
                        type="button"
                        onClick={nextSection}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center px-6 py-3 bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-500 hover:to-orange-400 text-white font-bold rounded-lg shadow-lg transition-all duration-300"
                      >
                        Next
                        <svg
                          className="ml-2 h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                          />
                        </svg>
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Section 2: Browse & Select Services */}
              {activeSection === 2 && (
                <motion.div
                  key="section2"
                  variants={sectionVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <div className="bg-gradient-to-br from-gray-900/90 via-gray-800/90 to-black/90 p-8 md:p-10 rounded-2xl border border-gray-700/50 shadow-2xl backdrop-blur-sm">
                    {/* Section header */}
                    <div className="flex items-center mb-8">
                      {renderSectionIcon(2)}
                      <h2 className="text-2xl md:text-3xl font-bold text-white ml-3">
                        Browse & Select Services
                      </h2>
                    </div>

                    <motion.div variants={itemVariants} className="mb-6">
                      <label className="block text-gray-300 mb-4 font-medium">
                        What type of cybersecurity services are you interested
                        in?
                      </label>
                      <div className="grid md:grid-cols-2 gap-4">
                        {servicesData.map((service) => (
                          <motion.div
                            key={service.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`relative rounded-xl p-4 cursor-pointer transition-all duration-200 border ${
                              watchServices.includes(service.name)
                                ? "bg-gradient-to-br from-red-900/30 to-orange-900/20 border-orange-500/50"
                                : "bg-gray-900/30 border-gray-700"
                            }`}
                          >
                            <input
                              type="checkbox"
                              id={`service-${service.id}`}
                              value={service.name}
                              {...register("services")}
                              className="sr-only"
                            />
                            <label
                              htmlFor={`service-${service.id}`}
                              className="flex items-start cursor-pointer"
                            >
                              <div
                                className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${
                                  watchServices.includes(service.name)
                                    ? "bg-gradient-to-br from-red-600 to-orange-500"
                                    : "bg-gray-800"
                                }`}
                              >
                                <SvgIcon
                                  path={service.icon}
                                  className="h-6 w-6 text-white"
                                />
                              </div>
                              <div className="ml-3">
                                <div className="text-white font-medium">
                                  {service.name}
                                </div>
                                {service.id === "others" &&
                                  watchServices.includes(service.name) && (
                                    <div className="mt-3">
                                      <input
                                        type="text"
                                        placeholder="Please specify other services"
                                        className="w-full bg-gray-900/70 border border-gray-700 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                      />
                                    </div>
                                  )}
                              </div>
                              <div className="absolute top-4 right-4">
                                <div
                                  className={`w-5 h-5 rounded flex items-center justify-center ${
                                    watchServices.includes(service.name)
                                      ? "bg-orange-500 text-white"
                                      : "border border-gray-600"
                                  }`}
                                >
                                  {watchServices.includes(service.name) && (
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-3 w-3"
                                      viewBox="0 0 20 20"
                                      fill="currentColor"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                  )}
                                </div>
                              </div>
                            </label>
                          </motion.div>
                        ))}
                      </div>
                      {errors.services && (
                        <p className="mt-3 text-red-400 text-sm">
                          {errors.services.message}
                        </p>
                      )}
                    </motion.div>

                    {/* Navigation buttons */}
                    <div className="mt-10 flex justify-between">
                      <motion.button
                        type="button"
                        onClick={prevSection}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-bold rounded-lg shadow-lg transition-all duration-300"
                      >
                        <svg
                          className="mr-2 h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 17l-5-5m0 0l5-5m-5 5h12"
                          />
                        </svg>
                        Previous
                      </motion.button>
                      <motion.button
                        type="button"
                        onClick={nextSection}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center px-6 py-3 bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-500 hover:to-orange-400 text-white font-bold rounded-lg shadow-lg transition-all duration-300"
                      >
                        Next
                        <svg
                          className="ml-2 h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                          />
                        </svg>
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Section 3: Provider Preferences */}
              {activeSection === 3 && (
                <motion.div
                  key="section3"
                  variants={sectionVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <div className="bg-gradient-to-br from-gray-900/90 via-gray-800/90 to-black/90 p-8 md:p-10 rounded-2xl border border-gray-700/50 shadow-2xl backdrop-blur-sm">
                    {/* Section header */}
                    <div className="flex items-center mb-8">
                      {renderSectionIcon(3)}
                      <h2 className="text-2xl md:text-3xl font-bold text-white ml-3">
                        Provider Preferences
                      </h2>
                    </div>

                    <div className="space-y-8">
                      <motion.div variants={itemVariants}>
                        <label className="block text-gray-300 mb-4 font-medium">
                          What do you value most in a service provider?
                        </label>
                        <div className="grid md:grid-cols-2 gap-4">
                          {preferenceData.map((pref) => (
                            <motion.div
                              key={pref.id}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className={`relative rounded-xl p-4 cursor-pointer transition-all duration-200 border ${
                                watchPreferences.includes(pref.name)
                                  ? "bg-gradient-to-br from-red-900/30 to-orange-900/20 border-orange-500/50"
                                  : "bg-gray-900/30 border-gray-700"
                              }`}
                            >
                              <input
                                type="checkbox"
                                id={`pref-${pref.id}`}
                                value={pref.name}
                                {...register("providerPreferences")}
                                className="sr-only"
                              />
                              <label
                                htmlFor={`pref-${pref.id}`}
                                className="flex items-start cursor-pointer"
                              >
                                <div
                                  className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${
                                    watchPreferences.includes(pref.name)
                                      ? "bg-gradient-to-br from-red-600 to-orange-500"
                                      : "bg-gray-800"
                                  }`}
                                >
                                  <SvgIcon
                                    path={pref.icon}
                                    className="h-6 w-6 text-white"
                                  />
                                </div>
                                <div className="ml-3">
                                  <div className="text-white font-medium">
                                    {pref.name}
                                  </div>
                                </div>
                                <div className="absolute top-4 right-4">
                                  <div
                                    className={`w-5 h-5 rounded flex items-center justify-center ${
                                      watchPreferences.includes(pref.name)
                                        ? "bg-orange-500 text-white"
                                        : "border border-gray-600"
                                    }`}
                                  >
                                    {watchPreferences.includes(pref.name) && (
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-3 w-3"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                      >
                                        <path
                                          fillRule="evenodd"
                                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                          clipRule="evenodd"
                                        />
                                      </svg>
                                    )}
                                  </div>
                                </div>
                              </label>
                            </motion.div>
                          ))}
                        </div>
                        {errors.providerPreferences && (
                          <p className="mt-3 text-red-400 text-sm">
                            {errors.providerPreferences.message}
                          </p>
                        )}
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <label className="block text-gray-300 mb-4 font-medium">
                          Would you like to work with multiple providers in a
                          single package?
                        </label>
                        <div className="flex space-x-6">
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`relative rounded-xl p-4 cursor-pointer transition-all duration-200 border w-1/2 ${
                              watch("multipleProviders") === true
                                ? "bg-gradient-to-br from-red-900/30 to-orange-900/20 border-orange-500/50"
                                : "bg-gray-900/30 border-gray-700"
                            }`}
                          >
                            <input
                              type="radio"
                              id="multiple-yes"
                              checked={watch("multipleProviders") === true}
                              onChange={() =>
                                setValue("multipleProviders", true)
                              }
                              className="sr-only"
                            />
                            <label
                              htmlFor="multiple-yes"
                              className="flex items-center cursor-pointer"
                            >
                              <div
                                className={`flex-shrink-0 w-6 h-6 rounded-full ${
                                  watch("multipleProviders") === true
                                    ? "bg-orange-500 border-2 border-orange-300"
                                    : "border-2 border-gray-600"
                                }`}
                              >
                                {watch("multipleProviders") === true && (
                                  <div className="w-2 h-2 mx-auto mt-1.5 rounded-full bg-white"></div>
                                )}
                              </div>
                              <span className="ml-3 text-white font-medium">
                                Yes
                              </span>
                            </label>
                          </motion.div>
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`relative rounded-xl p-4 cursor-pointer transition-all duration-200 border w-1/2 ${
                              watch("multipleProviders") === false
                                ? "bg-gradient-to-br from-red-900/30 to-orange-900/20 border-orange-500/50"
                                : "bg-gray-900/30 border-gray-700"
                            }`}
                          >
                            <input
                              type="radio"
                              id="multiple-no"
                              checked={watch("multipleProviders") === false}
                              onChange={() =>
                                setValue("multipleProviders", false)
                              }
                              className="sr-only"
                            />
                            <label
                              htmlFor="multiple-no"
                              className="flex items-center cursor-pointer"
                            >
                              <div
                                className={`flex-shrink-0 w-6 h-6 rounded-full ${
                                  watch("multipleProviders") === false
                                    ? "bg-orange-500 border-2 border-orange-300"
                                    : "border-2 border-gray-600"
                                }`}
                              >
                                {watch("multipleProviders") === false && (
                                  <div className="w-2 h-2 mx-auto mt-1.5 rounded-full bg-white"></div>
                                )}
                              </div>
                              <span className="ml-3 text-white font-medium">
                                No
                              </span>
                            </label>
                          </motion.div>
                        </div>
                      </motion.div>
                    </div>

                    {/* Navigation buttons */}
                    <div className="mt-10 flex justify-between">
                      <motion.button
                        type="button"
                        onClick={prevSection}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-bold rounded-lg shadow-lg transition-all duration-300"
                      >
                        <svg
                          className="mr-2 h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 17l-5-5m0 0l5-5m-5 5h12"
                          />
                        </svg>
                        Previous
                      </motion.button>
                      <motion.button
                        type="button"
                        onClick={nextSection}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center px-6 py-3 bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-500 hover:to-orange-400 text-white font-bold rounded-lg shadow-lg transition-all duration-300"
                      >
                        Next
                        <svg
                          className="ml-2 h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                          />
                        </svg>
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Section 4: Customize Your Package */}
              {activeSection === 4 && (
                <motion.div
                  key="section4"
                  variants={sectionVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <div className="bg-gradient-to-br from-gray-900/90 via-gray-800/90 to-black/90 p-8 md:p-10 rounded-2xl border border-gray-700/50 shadow-2xl backdrop-blur-sm">
                    {/* Section header */}
                    <div className="flex items-center mb-8">
                      {renderSectionIcon(4)}
                      <h2 className="text-2xl md:text-3xl font-bold text-white ml-3">
                        Customize Your Package
                      </h2>
                    </div>

                    <div className="space-y-8">
                      <motion.div variants={itemVariants}>
                        <label className="block text-gray-300 mb-4 font-medium">
                          Select Preferred Package Duration
                        </label>
                        <div className="grid grid-cols-3 gap-4">
                          {["4", "8", "12"].map((duration) => (
                            <motion.div
                              key={duration}
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.97 }}
                              className={`relative rounded-xl p-5 cursor-pointer transition-all duration-200 border text-center ${
                                watch("packageDuration") === duration
                                  ? "bg-gradient-to-br from-red-900/30 to-orange-900/20 border-orange-500/50"
                                  : "bg-gray-900/30 border-gray-700"
                              }`}
                            >
                              <input
                                type="radio"
                                id={`duration-${duration}`}
                                value={duration}
                                {...register("packageDuration")}
                                className="sr-only"
                              />
                              <label
                                htmlFor={`duration-${duration}`}
                                className="block cursor-pointer"
                              >
                                <div className="text-2xl font-bold text-white mb-1">
                                  {duration}
                                </div>
                                <div className="text-gray-400">Months</div>
                                {watch("packageDuration") === duration && (
                                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-4 w-4 text-white"
                                      viewBox="0 0 20 20"
                                      fill="currentColor"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                  </div>
                                )}
                              </label>
                            </motion.div>
                          ))}
                        </div>
                        {errors.packageDuration && (
                          <p className="mt-3 text-red-400 text-sm">
                            {errors.packageDuration.message}
                          </p>
                        )}
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <label className="block text-gray-300 mb-2 font-medium">
                          Add any special requirements or notes
                        </label>
                        <div className="relative">
                          <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                            <SvgIcon
                              path="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              className="h-5 w-5 text-gray-500"
                            />
                          </div>
                          <textarea
                            {...register("specialRequirements")}
                            rows={5}
                            className="w-full bg-gray-900/50 border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition duration-200"
                            placeholder="Describe any specific requirements or constraints..."
                          ></textarea>
                        </div>
                      </motion.div>
                    </div>

                    {/* Navigation buttons */}
                    <div className="mt-10 flex justify-between">
                      <motion.button
                        type="button"
                        onClick={prevSection}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-bold rounded-lg shadow-lg transition-all duration-300"
                      >
                        <svg
                          className="mr-2 h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 17l-5-5m0 0l5-5m-5 5h12"
                          />
                        </svg>
                        Previous
                      </motion.button>
                      <motion.button
                        type="button"
                        onClick={nextSection}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center px-6 py-3 bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-500 hover:to-orange-400 text-white font-bold rounded-lg shadow-lg transition-all duration-300"
                      >
                        Next
                        <svg
                          className="ml-2 h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                          />
                        </svg>
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Section 5: Select Preferred Partners */}
{activeSection === 5 && (
  <motion.div
    key="section5"
    variants={sectionVariants}
    initial="hidden"
    animate="visible"
    exit="exit"
  >
    <div className="bg-gradient-to-br from-gray-900/90 via-gray-800/90 to-black/90 p-8 md:p-10 rounded-2xl border border-gray-700/50 shadow-2xl backdrop-blur-sm">
      {/* Section header */}
      <div className="flex items-center mb-8">
        {renderSectionIcon(5)}
        <h2 className="text-2xl md:text-3xl font-bold text-white ml-3">
          Select Preferred Partners
        </h2>
      </div>

      <motion.div variants={itemVariants} className="mb-6">
        <label className="block text-gray-300 mb-4 font-medium">
          Choose from our verified partners (optional)
        </label>
        {loadingPartners ? (
  <div className="flex justify-center py-8">
    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-orange-500"></div>
  </div>
) : (
  <div className="grid md:grid-cols-2 gap-4">
    {partners.map((partner) => (
      <motion.div
        key={partner.id}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`relative rounded-xl p-4 cursor-pointer transition-all duration-200 border ${
          watch("preferredPartners")?.includes(partner.id)
            ? "bg-gradient-to-br from-red-900/30 to-orange-900/20 border-orange-500/50"
            : "bg-gray-900/30 border-gray-700"
        }`}
      >
        <input
          type="checkbox"
          id={`partner-${partner.id}`}
          value={partner.id}
          {...register("preferredPartners")}
          className="sr-only"
        />
        <label
          htmlFor={`partner-${partner.id}`}
          className="flex items-start cursor-pointer"
        >
          <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gray-800 flex items-center justify-center overflow-hidden">
            <Image
              src={partner.logo} 
              alt={partner.company_name}
              width={60}
              height={60}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/48';
                (e.target as HTMLImageElement).className = 'w-full h-full object-contain p-2';
              }}
            />
          </div>
          <div className="ml-3 flex-1">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-white font-medium">{partner.company_name}</div>
                <a 
                  href={partner.website} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-orange-400 hover:underline block mt-1 truncate max-w-[160px]"
                  title={partner.website}
                >
                  {partner.website.replace(/^https?:\/\/(www\.)?/, '')}
                </a>
              </div>
              <div className="flex items-center bg-gray-800 px-2 py-1 rounded text-sm">
                <svg
                  className="w-4 h-4 text-yellow-400 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                4.5
              </div>
            </div>
            <p className="text-sm text-gray-300 mt-2 line-clamp-2">
              Cybersecurity service provider specializing in various security solutions
            </p>
          </div>
          <div className="absolute top-4 right-4">
            <div
              className={`w-5 h-5 rounded flex items-center justify-center ${
                watch("preferredPartners")?.includes(partner.id)
                  ? "bg-orange-500 text-white"
                  : "border border-gray-600"
              }`}
            >
              {watch("preferredPartners")?.includes(partner.id) && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>
          </div>
        </label>
      </motion.div>
    ))}
  </div>
)}
      </motion.div>

      {/* Navigation buttons */}
      <div className="mt-10 flex justify-between">
        <motion.button
          type="button"
          onClick={prevSection}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-bold rounded-lg shadow-lg transition-all duration-300"
        >
          <svg
            className="mr-2 h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 17l-5-5m0 0l5-5m-5 5h12"
            />
          </svg>
          Previous
        </motion.button>
        <motion.button
          type="button"
          onClick={nextSection}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center px-6 py-3 bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-500 hover:to-orange-400 text-white font-bold rounded-lg shadow-lg transition-all duration-300"
        >
          Next
          <svg
            className="ml-2 h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </motion.button>
      </div>
    </div>
  </motion.div>
)}
{/*Review and submit*/}
              {activeSection === 6 && (
                <motion.div
                  key="section5"
                  variants={sectionVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <div className="bg-gradient-to-br from-gray-900/90 via-gray-800/90 to-black/90 p-8 md:p-10 rounded-2xl border border-gray-700/50 shadow-2xl backdrop-blur-sm">
                    {/* Section header */}
                    <div className="flex items-center mb-8">
                      {renderSectionIcon(5)}
                      <h2 className="text-2xl md:text-3xl font-bold text-white ml-3">
                        Review & Submit
                      </h2>
                    </div>

                    <div className="space-y-8">
                      <motion.div
                        variants={itemVariants}
                        className="bg-gray-900/50 rounded-xl p-6 border border-gray-700"
                      >
                        <h3 className="text-xl font-semibold mb-4 text-gray-200">
                          Request Summary
                        </h3>
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <p className="text-gray-400">Company Name</p>
                              <p className="text-white">
                                {watch("companyName")}
                              </p>
                            </div>
                            <div>
                              <p className="text-gray-400">Industry</p>
                              <p className="text-white">{watch("industry")}</p>
                            </div>
                            <div>
                              <p className="text-gray-400">Company Size</p>
                              <p className="text-white">
                                {watch("companySize")}
                              </p>
                            </div>
                            <div>
                              <p className="text-gray-400">Contact Person</p>
                              <p className="text-white">
                                {watch("contactName")}
                              </p>
                            </div>
                            <div>
                              <p className="text-gray-400">Email</p>
                              <p className="text-white">{watch("email")}</p>
                            </div>
                          </div>

                          <div className="pt-4 border-t border-gray-700">
                            <p className="text-gray-400 mb-2">
                              Selected Services
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {watch("services")?.map((service, index) => (
                                <span
                                  key={index}
                                  className="inline-flex items-center px-3 py-1 rounded-full bg-gray-800 text-sm text-white"
                                >
                                  {service}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="pt-4 border-t border-gray-700">
                            <p className="text-gray-400 mb-2">
                              Provider Preferences
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {watch("providerPreferences")?.map(
                                (pref, index) => (
                                  <span
                                    key={index}
                                    className="inline-flex items-center px-3 py-1 rounded-full bg-gray-800 text-sm text-white"
                                  >
                                    {pref}
                                  </span>
                                )
                              )}
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-700">
                            <div>
                              <p className="text-gray-400">
                                Multiple Providers
                              </p>
                              <p className="text-white">
                                {watch("multipleProviders") ? "Yes" : "No"}
                              </p>
                            </div>
                            <div>
                              <p className="text-gray-400">Package Duration</p>
                              <p className="text-white">
                                {watch("packageDuration")} months
                              </p>
                            </div>
                          </div>
                          {watch("preferredPartners")?.length > 0 && (
  <div className="pt-4 border-t border-gray-700">
    <p className="text-gray-400 mb-2">Preferred Partners</p>
    <div className="flex flex-wrap gap-2">
      {watch("preferredPartners")?.map((partnerId) => {
        const partner = partners.find(p => p.id === partnerId);
        return (
          <span
            key={partnerId}
            className="inline-flex items-center px-3 py-1 rounded-full bg-gray-800 text-sm text-white"
          >
            {partner?.company_name}
          </span>
        );
      })}
    </div>
  </div>
)}

                          {watch("specialRequirements") && (
                            <div className="pt-4 border-t border-gray-700">
                              <p className="text-gray-400 mb-2">
                                Special Requirements
                              </p>
                              <p className="text-white">
                                {watch("specialRequirements")}
                              </p>
                            </div>
                          )}
                        </div>
                      </motion.div>

                      <motion.div
                        variants={itemVariants}
                        className="flex items-start"
                      >
                        <div className="flex items-center h-5">
                          <input
                            id="confirm-submission"
                            type="checkbox"
                            {...register("confirmSubmission")}
                            className="w-4 h-4 rounded bg-gray-800 border-gray-600 focus:ring-orange-500 focus:ring-2"
                          />
                        </div>
                        <div className="ml-3">
                          <label
                            htmlFor="confirm-submission"
                            className="text-gray-300"
                          >
                            I confirm that the information provided is accurate
                            and I agree to CyberJall&apos;s Terms of Service and
                            Privacy Policy.
                          </label>
                          {errors.confirmSubmission && (
                            <p className="mt-1 text-red-400 text-sm">
                              {errors.confirmSubmission.message}
                            </p>
                          )}
                        </div>
                      </motion.div>
                    </div>

                    <div className="mt-10 flex justify-between">
                      <motion.button
                        type="button"
                        onClick={prevSection}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-bold rounded-lg shadow-lg transition-all duration-300"
                      >
                        <svg
                          className="mr-2 h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 17l-5-5m0 0l5-5m-5 5h12"
                          />
                        </svg>
                        Previous
                      </motion.button>
                      <motion.button
                        type="submit"
                        disabled={!isValid}
                        whileHover={{ scale: isValid ? 1.03 : 1 }}
                        whileTap={{ scale: isValid ? 0.98 : 1 }}
                        className={`flex items-center px-6 py-3 text-white font-bold rounded-lg shadow-lg transition-all duration-300 ${
                          isValid
                            ? "bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-500 hover:to-orange-400"
                            : "bg-gray-700 cursor-not-allowed"
                        }`}
                      >
                        Submit Request
                        <svg
                          className="ml-2 h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 12h14M12 5l7 7-7 7"
                          />
                        </svg>
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.form>
        )}
      </div>
    </div>
  );
}
