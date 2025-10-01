"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import MarketplaceButton from "./ui/MarketplaceButton";

interface MarketplaceFormData {
  companyName: string;
  industry: string;
  companySize: string;
  contactNo: string;
  email: string;
  otherIndustry?: string;
}

interface MarketplaceRegistrationFormProps {
  className?: string;
  isOpen?: boolean;
  onClose?: () => void;
}

const MarketplaceRegistrationForm: React.FC<
  MarketplaceRegistrationFormProps
> = ({ className = "", isOpen = false, onClose }) => {
  const [formData, setFormData] = useState<MarketplaceFormData>({
    companyName: "",
    industry: "",
    companySize: "",
    contactNo: "",
    email: "",
    otherIndustry: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const industries = [
    "Retail & E-commerce",
    "Finance & Banking",
    "Healthcare & Pharmaceuticals",
    "Hospitality & Tourism",
    "Information Technology (IT) & Software",
    "Transportation & Logistics",
    "Education & EdTech",
    "Other - please specify",
  ];

  const companySizes = ["1-10", "11-50", "51-100", "101+"];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log("Marketplace Registration Data:", formData);

    // Reset form
    setFormData({
      companyName: "",
      industry: "",
      companySize: "",
      contactNo: "",
      email: "",
      otherIndustry: "",
    });

    setIsSubmitting(false);
    alert("Registration successful! We'll contact you soon.");
  };

  const isFormValid = () => {
    return (
      formData.companyName.trim() &&
      formData.industry &&
      formData.companySize &&
      formData.contactNo.trim() &&
      formData.email.trim() &&
      (formData.industry !== "Other - please specify" ||
        formData.otherIndustry?.trim())
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div
        className={`relative bg-black/90 border border-gray-800/50 rounded-xl p-6 backdrop-blur-md max-w-2xl w-full max-h-[90vh] overflow-y-auto ${className}`}
      >
        {/* Close button */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        )}
        {/* Header */}
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-white mb-2 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
            Join Our Marketplace
          </h3>
          <p className="text-gray-400 text-sm">
            Register to access cybersecurity services
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Row 1: Company Name & Industry */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Company Name *
              </label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-sm"
                placeholder="Your company name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Industry *
              </label>
              <select
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-sm"
              >
                <option value="">Select industry</option>
                {industries.map((industry) => (
                  <option
                    key={industry}
                    value={industry}
                    className="bg-gray-800"
                  >
                    {industry}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Other Industry Input */}
          {formData.industry === "Other - please specify" && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <input
                type="text"
                name="otherIndustry"
                value={formData.otherIndustry}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-sm"
                placeholder="Please specify your industry"
              />
            </motion.div>
          )}

          {/* Row 2: Company Size & Contact */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Company Size *
              </label>
              <select
                name="companySize"
                value={formData.companySize}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-sm"
              >
                <option value="">Select size</option>
                {companySizes.map((size) => (
                  <option key={size} value={size} className="bg-gray-800">
                    {size} employees
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Contact Number *
              </label>
              <input
                type="tel"
                name="contactNo"
                value={formData.contactNo}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-sm"
                placeholder="Your contact number"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-sm"
              placeholder="your.email@company.com"
            />
          </div>

          {/* Submit Button */}
          <MarketplaceButton
            type="submit"
            disabled={!isFormValid() || isSubmitting}
            size="lg"
            className="w-full"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Registering...</span>
              </div>
            ) : (
              "Join Marketplace"
            )}
          </MarketplaceButton>
        </form>
      </div>
    </div>
  );
};

export default MarketplaceRegistrationForm;
