"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { CldUploadButton, CloudinaryUploadWidgetResults } from "next-cloudinary";
import Image from "next/image";
import axios from "axios";

interface Product {
  name: string;
  description: string;
  image: string;
  link?: string;
}

interface ServiceOffered {
  name: string;
  description: string;
  image: string;
}

interface ExpertiseCertification {
  type: string;
  name: string;
  logo: string;
}

interface CaseStudy {
  title: string;
  client: string;
  challenge: string;
  solution: string;
  result: string;
}

interface ClientReview {
  clientName: string;
  position: string;
  company: string;
  review: string;
  rating: number;
}

interface SocialLink {
  platform: string;
  url: string;
}

interface CompanyFormData {
  company_name: string;
  overview: string;
  year_founded: string;
  headquarters_city: string;
  headquarters_country: string;
  services_offered: ServiceOffered[];
  products: Product[];
  expertise_and_certifications: ExpertiseCertification[];
  case_studies: CaseStudy[];
  client_reviews: ClientReview[];
  social_links: SocialLink[];
  website: string;
  logo: string;
  industries_served: string[];
  target_business_size: string[];
  geographic_coverage: string[];
  team_size: string;
}

interface EditCompanyFormProps {
  company: CompanyFormData;
  onClose: () => void;
  onSave: (updatedCompany: CompanyFormData) => void;
}

const EditCompanyForm = ({ company, onClose, onSave }: EditCompanyFormProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | "info" | "";
    message: string;
  }>({ type: "", message: "" });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm<CompanyFormData>({
    defaultValues: company,
  });

  // Field arrays
  const {
    fields: serviceFields,
    append: appendService,
    remove: removeService,
  } = useFieldArray({ control, name: "services_offered" });

  const {
    fields: productFields,
    append: appendProduct,
    remove: removeProduct,
  } = useFieldArray({ control, name: "products" });

  const {
    fields: certFields,
    append: appendCert,
    remove: removeCert,
  } = useFieldArray({ control, name: "expertise_and_certifications" });

  const {
    fields: caseFields,
    append: appendCase,
    remove: removeCase,
  } = useFieldArray({ control, name: "case_studies" });

  const {
    fields: reviewFields,
    append: appendReview,
    remove: removeReview,
  } = useFieldArray({ control, name: "client_reviews" });

  const { fields: socialFields } = useFieldArray({
    control,
    name: "social_links",
  });

  // Watch logo for preview
  const logo = watch("logo");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleLogoUpload = (result: CloudinaryUploadWidgetResults) => {
    if (result && typeof result.info !== "string") {
      const info = result.info as { secure_url: string };
      if (info?.secure_url) {
        setValue("logo", info.secure_url, { shouldValidate: true });
      }
    }
  };

  const onSubmit: SubmitHandler<CompanyFormData> = async (data) => {
    try {
      setIsSubmitting(true);
      setSubmitStatus({ type: "info", message: "Updating company profile..." });

      const response = await axios.put("/api/editCompany", data);

      setSubmitStatus({
        type: "success",
        message: "Company profile updated successfully!",
      });
      onSave(response.data.company);
      setTimeout(() => onClose(), 1500);
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "Failed to update company profile. Please try again.",
      });
      console.error("Error updating company:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="bg-gray-900 rounded-2xl shadow-2xl border border-orange-600 border-opacity-30 w-full max-w-6xl max-h-[95vh] overflow-y-auto"
      >
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
              Edit Company Profile
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-orange-500 transition-colors p-1"
              disabled={isSubmitting}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {submitStatus.message && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mb-6 p-4 rounded-lg ${
                submitStatus.type === "success"
                  ? "bg-green-900/50 text-green-300 border border-green-800"
                  : submitStatus.type === "error"
                  ? "bg-red-900/50 text-red-300 border border-red-800"
                  : "bg-blue-900/50 text-blue-300 border border-blue-800"
              }`}
            >
              <div className="flex items-center">
                {submitStatus.type === "success" && (
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                )}
                {submitStatus.type === "error" && (
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                )}
                {submitStatus.type === "info" && (
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                )}
                <span>{submitStatus.message}</span>
              </div>
            </motion.div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Basic Information Section */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 shadow-lg"
            >
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-r from-orange-500 to-red-500 p-2 rounded-lg mr-4">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white">
                  Basic Information
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-orange-400 mb-2 font-medium">
                    Company Name
                  </label>
                  <input
                    {...register("company_name", {
                      required: "Company name is required",
                    })}
                    className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  />
                  {errors.company_name && (
                    <p className="mt-1 text-red-500 text-sm">
                      {errors.company_name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-orange-400 mb-2 font-medium">
                    Logo
                  </label>
                  <div className="flex items-center space-x-4">
                    <div className="flex-1">
                      <CldUploadButton
                        uploadPreset="CompanyLogo"
                        onSuccess={handleLogoUpload}
                        options={{
                          multiple: false,
                          resourceType: "image",
                          maxFileSize: 5000000,
                        }}
                      >
                        <div className="w-full p-4 border-2 border-dashed border-gray-600 rounded-lg bg-gray-700/50 hover:bg-gray-700 transition-colors text-center cursor-pointer">
                          <svg
                            className="w-8 h-8 mx-auto text-orange-500 mb-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          <p className="text-gray-300">Upload Company Logo</p>
                          <p className="text-xs text-gray-500 mt-1">
                            PNG, JPG up to 5MB
                          </p>
                        </div>
                      </CldUploadButton>
                    </div>
                    {logo && (
                      <div className="relative w-20 h-20 bg-gray-700 rounded-md overflow-hidden border border-gray-600 flex-shrink-0">
                        <Image
                          src={logo}
                          alt="Company logo"
                          fill
                          className="object-contain p-2"
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-orange-400 mb-2 font-medium">
                    Overview
                  </label>
                  <textarea
                    {...register("overview", {
                      required: "Overview is required",
                      minLength: {
                        value: 50,
                        message: "Please provide at least 50 characters",
                      },
                    })}
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  />
                  {errors.overview && (
                    <p className="mt-1 text-red-500 text-sm">
                      {errors.overview.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-orange-400 mb-2 font-medium">
                    Website
                  </label>
                  <input
                    type="url"
                    {...register("website", {
                      pattern: {
                        value:
                          /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
                        message: "Please enter a valid URL",
                      },
                    })}
                    className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    placeholder="https://yourcompany.com"
                  />
                  {errors.website && (
                    <p className="mt-1 text-red-500 text-sm">
                      {errors.website.message}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Company Details Section */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 shadow-lg"
            >
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-r from-orange-500 to-red-500 p-2 rounded-lg mr-4">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white">
                  Company Details
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-orange-400 mb-2 font-medium">
                    Year Founded
                  </label>
                  <input
                    type="number"
                    min="1900"
                    max={new Date().getFullYear()}
                    {...register("year_founded", {
                      required: "Year founded is required",
                      min: {
                        value: 1900,
                        message: "Year must be after 1900",
                      },
                      max: {
                        value: new Date().getFullYear(),
                        message: "Year cannot be in the future",
                      },
                    })}
                    className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  />
                  {errors.year_founded && (
                    <p className="mt-1 text-red-500 text-sm">
                      {errors.year_founded.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-orange-400 mb-2 font-medium">
                    Headquarters City
                  </label>
                  <input
                    {...register("headquarters_city", {
                      required: "City is required",
                    })}
                    className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  />
                  {errors.headquarters_city && (
                    <p className="mt-1 text-red-500 text-sm">
                      {errors.headquarters_city.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-orange-400 mb-2 font-medium">
                    Headquarters Country
                  </label>
                  <input
                    {...register("headquarters_country", {
                      required: "Country is required",
                    })}
                    className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  />
                  {errors.headquarters_country && (
                    <p className="mt-1 text-red-500 text-sm">
                      {errors.headquarters_country.message}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Industries & Coverage Section */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 shadow-lg"
            >
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-r from-orange-500 to-red-500 p-2 rounded-lg mr-4">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white">
                  Industries & Coverage
                </h3>
              </div>

              <div className="space-y-6">
                {/* Industries Served */}
                <div>
                  <label className="block text-orange-400 mb-3 font-medium">
                    Industries Served
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {[
                      "Finance & Banking",
                      "Healthcare",
                      "E-commerce",
                      "Government",
                      "Education",
                      "Technology",
                      "Manufacturing",
                      "Retail",
                      "Telecom",
                      "Energy",
                      "Transportation",
                      "Other",
                    ].map((industry) => (
                      <label
                        key={industry}
                        className="flex items-center space-x-2 group"
                      >
                        <input
                          type="checkbox"
                          value={industry}
                          {...register("industries_served")}
                          className="hidden"
                        />
                        <div
                          className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                            watch("industries_served")?.includes(industry)
                              ? "bg-orange-500 border-orange-500"
                              : "bg-gray-700 border-gray-600 group-hover:border-orange-400"
                          }`}
                        >
                          {watch("industries_served")?.includes(industry) && (
                            <svg
                              className="w-3 h-3 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          )}
                        </div>
                        <span className="text-gray-200 group-hover:text-white transition-colors">
                          {industry}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Target Business Size */}
                <div>
                  <label className="block text-orange-400 mb-3 font-medium">
                    Target Business Size
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {["Startup", "SMB", "Enterprise"].map((size) => (
                      <label
                        key={size}
                        className="flex items-center space-x-2 group"
                      >
                        <input
                          type="checkbox"
                          value={size}
                          {...register("target_business_size")}
                          className="hidden"
                        />
                        <div
                          className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                            watch("target_business_size")?.includes(size)
                              ? "bg-orange-500 border-orange-500"
                              : "bg-gray-700 border-gray-600 group-hover:border-orange-400"
                          }`}
                        >
                          {watch("target_business_size")?.includes(size) && (
                            <svg
                              className="w-3 h-3 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          )}
                        </div>
                        <span className="text-gray-200 group-hover:text-white transition-colors">
                          {size}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Geographic Coverage */}
                <div>
                  <label className="block text-orange-400 mb-3 font-medium">
                    Geographic Coverage
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                    {["Local", "National", "Regional", "Global"].map(
                      (region) => (
                        <label
                          key={region}
                          className="flex items-center space-x-2 group"
                        >
                          <input
                            type="checkbox"
                            value={region}
                            {...register("geographic_coverage")}
                            className="hidden"
                          />
                          <div
                            className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                              watch("geographic_coverage")?.includes(region)
                                ? "bg-orange-500 border-orange-500"
                                : "bg-gray-700 border-gray-600 group-hover:border-orange-400"
                            }`}
                          >
                            {watch("geographic_coverage")?.includes(region) && (
                              <svg
                                className="w-3 h-3 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            )}
                          </div>
                          <span className="text-gray-200 group-hover:text-white transition-colors">
                            {region}
                          </span>
                        </label>
                      )
                    )}
                  </div>
                </div>

                {/* Team Size */}
                <div>
                  <label className="block text-orange-400 mb-2 font-medium">
                    Team Size
                  </label>
                  <select
                    {...register("team_size", {
                      required: "Please select team size",
                    })}
                    className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  >
                    <option value="">Select team size</option>
                    <option value="1-10">1-10 employees</option>
                    <option value="11-50">11-50 employees</option>
                    <option value="51-200">51-200 employees</option>
                    <option value="201-500">201-500 employees</option>
                    <option value="501-1000">501-1000 employees</option>
                    <option value="1000+">1000+ employees</option>
                  </select>
                  {errors.team_size && (
                    <p className="mt-1 text-red-500 text-sm">
                      {errors.team_size.message}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Services Offered Section */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 shadow-lg"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="bg-gradient-to-r from-orange-500 to-red-500 p-2 rounded-lg mr-4">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    Services Offered
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    appendService({ name: "", description: "", image: "" })
                  }
                  className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg text-white text-sm hover:from-orange-600 hover:to-red-600 transition-all flex items-center"
                >
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  Add Service
                </button>
              </div>

              {serviceFields.map((field, index) => (
                <div
                  key={field.id}
                  className="mb-6 last:mb-0 p-5 bg-gray-900/50 rounded-lg border border-gray-700"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-lg font-semibold text-orange-400">
                      Service #{index + 1}
                    </h4>
                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() => removeService(index)}
                        className="text-red-400 hover:text-red-300 p-1 rounded-full hover:bg-red-900/30 transition-colors"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Service Name
                      </label>
                      <input
                        {...register(`services_offered.${index}.name`, {
                          required: "Service name required",
                        })}
                        className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                      {errors.services_offered?.[index]?.name && (
                        <p className="mt-1 text-sm text-red-400">
                          {errors.services_offered[index]?.name?.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Service Image
                      </label>
                      <div className="flex items-center space-x-4">
                        <div className="flex-1">
                          <CldUploadButton
                            uploadPreset="ServiceImages"
                            onSuccess={(result) => {
                              if (result && typeof result.info !== "string") {
                                const info = result.info as { secure_url: string };
                                if (info?.secure_url) {
                                  setValue(
                                    `services_offered.${index}.image`,
                                    info.secure_url
                                  );
                                }
                              }
                            }}
                            options={{
                              multiple: false,
                              resourceType: "image",
                              maxFileSize: 5000000,
                            }}
                          >
                            <div className="w-full p-4 border-2 border-dashed border-gray-600 rounded-lg bg-gray-700/50 hover:bg-gray-700 transition-colors text-center cursor-pointer">
                              <svg
                                className="w-6 h-6 mx-auto text-orange-500 mb-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                              </svg>
                              <p className="text-gray-300">Upload Image</p>
                            </div>
                          </CldUploadButton>
                        </div>
                        {watch(`services_offered.${index}.image`) && (
                          <div className="relative w-16 h-16 bg-gray-700 rounded-md overflow-hidden border border-gray-600 flex-shrink-0">
                            <Image
                              src={watch(`services_offered.${index}.image`)}
                              alt={`Service ${index + 1} image`}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Description
                    </label>
                    <textarea
                      {...register(`services_offered.${index}.description`, {
                        required: "Description required",
                      })}
                      rows={3}
                      className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                    {errors.services_offered?.[index]?.description && (
                      <p className="mt-1 text-sm text-red-400">
                        {errors.services_offered[index]?.description?.message}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Products Section */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 shadow-lg"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="bg-gradient-to-r from-orange-500 to-red-500 p-2 rounded-lg mr-4">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white">Products</h3>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    appendProduct({
                      name: "",
                      description: "",
                      image: "",
                      link: "",
                    })
                  }
                  className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg text-white text-sm hover:from-orange-600 hover:to-red-600 transition-all flex items-center"
                >
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  Add Product
                </button>
              </div>

              {productFields.map((field, index) => (
                <div
                  key={field.id}
                  className="mb-6 last:mb-0 p-5 bg-gray-900/50 rounded-lg border border-gray-700"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-lg font-semibold text-orange-400">
                      Product #{index + 1}
                    </h4>
                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() => removeProduct(index)}
                        className="text-red-400 hover:text-red-300 p-1 rounded-full hover:bg-red-900/30 transition-colors"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Product Name
                      </label>
                      <input
                        {...register(`products.${index}.name`, {
                          required: "Product name required",
                        })}
                        className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                      {errors.products?.[index]?.name && (
                        <p className="mt-1 text-sm text-red-400">
                          {errors.products[index]?.name?.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Product Link (Optional)
                      </label>
                      <input
                        type="url"
                        {...register(`products.${index}.link`, {
                          pattern: {
                            value:
                              /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
                            message: "Please enter a valid URL",
                          },
                        })}
                        className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                      {errors.products?.[index]?.link && (
                        <p className="mt-1 text-sm text-red-400">
                          {errors.products[index]?.link?.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Product Image
                    </label>
                    <div className="flex items-center space-x-4">
                      <div className="flex-1">
                        <CldUploadButton
                          uploadPreset="ProductImages"
                          onSuccess={(result) => {
                            if (result && typeof result.info !== "string") {
                              const info = result.info as { secure_url: string };
                              if (info?.secure_url) {
                                setValue(
                                  `products.${index}.image`,
                                  info.secure_url
                                );
                              }
                            }
                          }}
                          options={{
                            multiple: false,
                            resourceType: "image",
                            maxFileSize: 5000000,
                          }}
                        >
                          <div className="w-full p-4 border-2 border-dashed border-gray-600 rounded-lg bg-gray-700/50 hover:bg-gray-700 transition-colors text-center cursor-pointer">
                            <svg
                              className="w-6 h-6 mx-auto text-orange-500 mb-2"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                            <p className="text-gray-300">Upload Image</p>
                          </div>
                        </CldUploadButton>
                      </div>
                      {watch(`products.${index}.image`) && (
                        <div className="relative w-16 h-16 bg-gray-700 rounded-md overflow-hidden border border-gray-600 flex-shrink-0">
                          <Image
                            src={watch(`products.${index}.image`)}
                            alt={`Product ${index + 1} image`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Description
                    </label>
                    <textarea
                      {...register(`products.${index}.description`, {
                        required: "Description required",
                      })}
                      rows={3}
                      className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                    {errors.products?.[index]?.description && (
                      <p className="mt-1 text-sm text-red-400">
                        {errors.products[index]?.description?.message}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Expertise & Certifications Section */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 shadow-lg"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="bg-gradient-to-r from-orange-500 to-red-500 p-2 rounded-lg mr-4">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    Expertise & Certifications
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    appendCert({ type: "", name: "", logo: "" })
                  }
                  className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg text-white text-sm hover:from-orange-600 hover:to-red-600 transition-all flex items-center"
                >
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  Add Certification
                </button>
              </div>

              {certFields.map((field, index) => (
                <div
                  key={field.id}
                  className="mb-6 last:mb-0 p-5 bg-gray-900/50 rounded-lg border border-gray-700"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-lg font-semibold text-orange-400">
                      Certification #{index + 1}
                    </h4>
                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() => removeCert(index)}
                        className="text-red-400 hover:text-red-300 p-1 rounded-full hover:bg-red-900/30 transition-colors"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Type
                      </label>
                      <select
                        {...register(
                          `expertise_and_certifications.${index}.type`,
                          { required: "Type required" }
                        )}
                        className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      >
                        <option value="">Select type</option>
                        <option value="certification">Certification</option>
                        <option value="partnership">Partnership</option>
                        <option value="expertise">Expertise</option>
                        <option value="achievement">Achievement</option>
                      </select>
                      {errors.expertise_and_certifications?.[index]?.type && (
                        <p className="mt-1 text-sm text-red-400">
                          {
                            errors.expertise_and_certifications[index]?.type
                              ?.message
                          }
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Name
                      </label>
                      <input
                        {...register(
                          `expertise_and_certifications.${index}.name`,
                          { required: "Name required" }
                        )}
                        className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                      {errors.expertise_and_certifications?.[index]?.name && (
                        <p className="mt-1 text-sm text-red-400">
                          {
                            errors.expertise_and_certifications[index]?.name
                              ?.message
                          }
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Logo
                    </label>
                    <div className="flex items-center space-x-4">
                      <div className="flex-1">
                        <CldUploadButton
                          uploadPreset="CertificationLogos"
                          onSuccess={(result) => {
                            if (result && typeof result.info !== "string") {
                              const info = result.info as { secure_url: string };
                              if (info?.secure_url) {
                                setValue(
                                  `expertise_and_certifications.${index}.logo`,
                                  info.secure_url
                                );
                              }
                            }
                          }}
                          options={{
                            multiple: false,
                            resourceType: "image",
                            maxFileSize: 5000000,
                          }}
                        >
                          <div className="w-full p-4 border-2 border-dashed border-gray-600 rounded-lg bg-gray-700/50 hover:bg-gray-700 transition-colors text-center cursor-pointer">
                            <svg
                              className="w-6 h-6 mx-auto text-orange-500 mb-2"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                            <p className="text-gray-300">Upload Logo</p>
                          </div>
                        </CldUploadButton>
                      </div>
                      {watch(`expertise_and_certifications.${index}.logo`) && (
                        <div className="relative w-16 h-16 bg-gray-700 rounded-md overflow-hidden border border-gray-600 flex-shrink-0">
                          <Image
                            src={watch(
                              `expertise_and_certifications.${index}.logo`
                            )}
                            alt={`Certification ${index + 1} logo`}
                            fill
                            className="object-contain p-2"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Case Studies Section */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 shadow-lg"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="bg-gradient-to-r from-orange-500 to-red-500 p-2 rounded-lg mr-4">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white">Case Studies</h3>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    appendCase({
                      title: "",
                      client: "",
                      challenge: "",
                      solution: "",
                      result: "",
                    })
                  }
                  className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg text-white text-sm hover:from-orange-600 hover:to-red-600 transition-all flex items-center"
                >
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  Add Case Study
                </button>
              </div>

              {caseFields.map((field, index) => (
                <div
                  key={field.id}
                  className="mb-6 last:mb-0 p-5 bg-gray-900/50 rounded-lg border border-gray-700"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-lg font-semibold text-orange-400">
                      Case Study #{index + 1}
                    </h4>
                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() => removeCase(index)}
                        className="text-red-400 hover:text-red-300 p-1 rounded-full hover:bg-red-900/30 transition-colors"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Title
                      </label>
                      <input
                        {...register(`case_studies.${index}.title`, {
                          required: "Title required",
                        })}
                        className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                      {errors.case_studies?.[index]?.title && (
                        <p className="mt-1 text-sm text-red-400">
                          {errors.case_studies[index]?.title?.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Client
                      </label>
                      <input
                        {...register(`case_studies.${index}.client`, {
                          required: "Client required",
                        })}
                        className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                      {errors.case_studies?.[index]?.client && (
                        <p className="mt-1 text-sm text-red-400">
                          {errors.case_studies[index]?.client?.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Challenge
                      </label>
                      <textarea
                        {...register(`case_studies.${index}.challenge`, {
                          required: "Challenge required",
                        })}
                        rows={3}
                        className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                      {errors.case_studies?.[index]?.challenge && (
                        <p className="mt-1 text-sm text-red-400">
                          {errors.case_studies[index]?.challenge?.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Solution
                      </label>
                      <textarea
                        {...register(`case_studies.${index}.solution`, {
                          required: "Solution required",
                        })}
                        rows={3}
                        className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                      {errors.case_studies?.[index]?.solution && (
                        <p className="mt-1 text-sm text-red-400">
                          {errors.case_studies[index]?.solution?.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Result
                      </label>
                      <textarea
                        {...register(`case_studies.${index}.result`, {
                          required: "Result required",
                        })}
                        rows={3}
                        className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                      {errors.case_studies?.[index]?.result && (
                        <p className="mt-1 text-sm text-red-400">
                          {errors.case_studies[index]?.result?.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Client Reviews Section */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 shadow-lg"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="bg-gradient-to-r from-orange-500 to-red-500 p-2 rounded-lg mr-4">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white">Client Reviews</h3>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    appendReview({
                      clientName: "",
                      position: "",
                      company: "",
                      review: "",
                      rating: 0,
                    })
                  }
                  disabled={reviewFields.length >= 5}
                  className={`px-4 py-2 rounded-lg text-white text-sm transition-all flex items-center ${
                    reviewFields.length >= 5
                      ? "bg-gray-600 cursor-not-allowed"
                      : "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                  }`}
                >
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  Add Review (Max 5)
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {reviewFields.map((field, index) => (
                  <div
                    key={field.id}
                    className="p-5 bg-gray-900/50 rounded-lg border border-gray-700"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-lg font-semibold text-orange-400">
                        Review #{index + 1}
                      </h4>
                      {index > 0 && (
                        <button
                          type="button"
                          onClick={() => removeReview(index)}
                          className="text-red-400 hover:text-red-300 p-1 rounded-full hover:bg-red-900/30 transition-colors"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      )}
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Client Name
                        </label>
                        <input
                          {...register(`client_reviews.${index}.clientName`, {
                            required: "Client name required",
                          })}
                          className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                        {errors.client_reviews?.[index]?.clientName && (
                          <p className="mt-1 text-sm text-red-400">
                            {errors.client_reviews[index]?.clientName?.message}
                          </p>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Position
                          </label>
                          <input
                            {...register(`client_reviews.${index}.position`, {
                              required: "Position required",
                            })}
                            className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          />
                          {errors.client_reviews?.[index]?.position && (
                            <p className="mt-1 text-sm text-red-400">
                              {errors.client_reviews[index]?.position?.message}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Company
                          </label>
                          <input
                            {...register(`client_reviews.${index}.company`, {
                              required: "Company required",
                            })}
                            className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          />
                          {errors.client_reviews?.[index]?.company && (
                            <p className="mt-1 text-sm text-red-400">
                              {errors.client_reviews[index]?.company?.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Rating
                        </label>
                        <select
                          {...register(`client_reviews.${index}.rating`, {
                            valueAsNumber: true,
                            required: "Rating required",
                            min: 1,
                            max: 5,
                          })}
                          className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        >
                          <option value="">Select rating</option>
                          <option value="5">★★★★★</option>
                          <option value="4">★★★★☆</option>
                          <option value="3">★★★☆☆</option>
                          <option value="2">★★☆☆☆</option>
                          <option value="1">★☆☆☆☆</option>
                        </select>
                        {errors.client_reviews?.[index]?.rating && (
                          <p className="mt-1 text-sm text-red-400">
                            {errors.client_reviews[index]?.rating?.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Review
                        </label>
                        <textarea
                          {...register(`client_reviews.${index}.review`, {
                            required: "Review required",
                          })}
                          rows={3}
                          className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                        {errors.client_reviews?.[index]?.review && (
                          <p className="mt-1 text-sm text-red-400">
                            {errors.client_reviews[index]?.review?.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Social Links Section */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 shadow-lg"
            >
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-r from-orange-500 to-red-500 p-2 rounded-lg mr-4">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white">Social Links</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {socialFields.map((field, index) => (
                  <div key={field.id} className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center flex-shrink-0">
                      {field.platform === "linkedin" && (
                        <svg
                          className="w-6 h-6 text-blue-400"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      )}
                      {field.platform === "x" && (
                        <svg
                          className="w-6 h-6 text-gray-200"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                      )}
                      {field.platform === "facebook" && (
                        <svg
                          className="w-6 h-6 text-blue-500"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z" />
                        </svg>
                      )}
                      {field.platform === "instagram" && (
                        <svg
                          className="w-6 h-6 text-pink-500"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                        </svg>
                      )}
                    </div>
                    <input
                      type="url"
                      {...register(`social_links.${index}.url`, {
                        pattern: {
                          value:
                            /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
                          message: "Invalid URL",
                        },
                      })}
                      className="flex-1 px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder={`${field.platform
                        .charAt(0)
                        .toUpperCase()}${field.platform.slice(1)} URL`}
                    />
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Form Actions */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex justify-end space-x-4 pt-6 border-t border-gray-700"
            >
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="px-6 py-3 border border-gray-600 rounded-lg text-gray-300 hover:bg-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-6 py-3 rounded-lg font-bold text-white transition-all ${
                  isSubmitting
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 shadow-lg hover:shadow-xl"
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center space-x-2">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <span>Saving Changes...</span>
                  </div>
                ) : (
                  "Save Changes"
                )}
              </button>
            </motion.div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default EditCompanyForm;