"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiX,
  FiSend,
  FiLoader,
  FiMessageSquare,
  FiDollarSign,
  FiClock,
  FiCheckCircle,
} from "react-icons/fi";

interface Partner {
  id: string;
  company_name: string;
  logo?: string;
  headquarters_city: string;
  headquarters_country: string;
}

interface InviteModalProps {
  isOpen: boolean;
  onClose: () => void;
  partner: Partner | null;
  onSuccess: () => void;
}

interface FormData {
  message: string;
  serviceTypes: string[];
  urgency: string;
  budget: string;
}

const serviceOptions = [
  "VAPT (Vulnerability Assessment & Penetration Testing)",
  "Compliance (SOC 2, ISO 27001, GDPR, etc.)",
  "Cloud Security",
  "Network Security",
  "Application Security",
  "Incident Response",
  "Risk Assessment",
  "Security Training",
  "Threat Intelligence",
  "Security Audit",
];

const urgencyOptions = [
  { value: "standard", label: "Standard (30+ days)", color: "text-blue-400" },
  { value: "urgent", label: "Urgent (7-30 days)", color: "text-yellow-400" },
  {
    value: "critical",
    label: "Critical (Within 7 days)",
    color: "text-red-400",
  },
];

export default function InviteModal({
  isOpen,
  onClose,
  partner,
  onSuccess,
}: InviteModalProps) {
  const [formData, setFormData] = useState<FormData>({
    message: "",
    serviceTypes: [],
    urgency: "standard",
    budget: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleServiceToggle = (service: string) => {
    setFormData((prev) => ({
      ...prev,
      serviceTypes: prev.serviceTypes.includes(service)
        ? prev.serviceTypes.filter((s) => s !== service)
        : [...prev.serviceTypes, service],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Early return if no partner
    if (!partner) {
      setError("No partner selected");
      return;
    }
    
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/invites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          providerId: partner.id,
          message: formData.message,
          serviceTypes: formData.serviceTypes,
          urgency: formData.urgency,
          budget: formData.budget ? parseFloat(formData.budget) : null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send invite");
      }

      setSuccess(true);
      setTimeout(() => {
        onSuccess();
        onClose();
        setSuccess(false);
        setFormData({
          message: "",
          serviceTypes: [],
          urgency: "standard",
          budget: "",
        });
      }, 2000);
    } catch (error) {
      console.error("Error sending invite:", error);
      setError(
        error instanceof Error ? error.message : "Failed to send invite"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const getInitials = (name: string): string => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  // Don't render if no partner and modal is closed
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-gray-900 border border-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {success ? (
              <div className="p-8 text-center">
                <div className="mb-4">
                  <FiCheckCircle className="h-16 w-16 text-green-500 mx-auto" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Invite Sent Successfully!
                </h3>
                <p className="text-gray-400">
                  Your invitation has been sent to {partner?.company_name}. They
                  will receive a notification and can respond through their
                  dashboard.
                </p>
              </div>
            ) : (
              <>
                <div className="p-6 border-b border-gray-800">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-white">
                      Send Invitation
                    </h2>
                    <button
                      onClick={onClose}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <FiX className="h-6 w-6" />
                    </button>
                  </div>
                </div>

                {/* Partner Info */}
                {partner && (
                  <div className="p-6 border-b border-gray-800">
                    <div className="flex items-center space-x-4">
                      <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-gray-700 to-gray-800 overflow-hidden border-2 border-gray-600/50 flex items-center justify-center">
                        {partner.logo ? (
                          <img
                            src={partner.logo}
                            alt={`${partner.company_name} logo`}
                            className="max-h-full max-w-full object-contain"
                          />
                        ) : (
                          <span className="text-lg font-bold text-gray-300">
                            {getInitials(partner.company_name)}
                          </span>
                        )}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white">
                          {partner.company_name}
                        </h3>
                        <p className="text-gray-400">
                          {partner.headquarters_city},{" "}
                          {partner.headquarters_country}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                  {error && (
                    <div className="bg-red-900/50 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg">
                      {error}
                    </div>
                  )}

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      <FiMessageSquare className="inline mr-2" />
                      Message *
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          message: e.target.value,
                        }))
                      }
                      placeholder="Tell them about your security needs and why you'd like to work with them..."
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      rows={4}
                      required
                    />
                  </div>

                  {/* Services Needed */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      Services Needed
                    </label>
                    <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto">
                      {serviceOptions.map((service) => (
                        <label
                          key={service}
                          className="flex items-center p-3 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-750 cursor-pointer transition-colors"
                        >
                          <input
                            type="checkbox"
                            checked={formData.serviceTypes.includes(service)}
                            onChange={() => handleServiceToggle(service)}
                            className="h-4 w-4 text-blue-600 rounded border-gray-600 focus:ring-blue-500 bg-gray-700"
                          />
                          <span className="ml-3 text-sm text-white">
                            {service}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Urgency and Budget */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Urgency */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        <FiClock className="inline mr-2" />
                        Urgency
                      </label>
                      <select
                        value={formData.urgency}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            urgency: e.target.value,
                          }))
                        }
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {urgencyOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Budget */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        <FiDollarSign className="inline mr-2" />
                        Budget (Optional)
                      </label>
                      <input
                        type="number"
                        value={formData.budget}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            budget: e.target.value,
                          }))
                        }
                        placeholder="50000"
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        min="0"
                        step="1000"
                      />
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 pt-4">
                    <button
                      type="button"
                      onClick={onClose}
                      className="flex-1 px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting || !formData.message.trim() || !partner}
                      className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                    >
                      {isSubmitting ? (
                        <>
                          <FiLoader className="animate-spin mr-2" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <FiSend className="mr-2" />
                          Send Invitation
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}