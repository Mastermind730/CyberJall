/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface FormData {
  companyName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  userType: "customer" | "provider";
}

interface FormErrors {
  companyName?: string;
  email?: string;
  phoneNumber?: string;
  password?: string;
  confirmPassword?: string;
  userType?: string;
}

const Page = () => {
  const [formData, setFormData] = useState<FormData>({
    companyName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    userType: "customer",
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = (): FormErrors => {
    const errors: FormErrors = {};
    if (!formData.companyName.trim()) errors.companyName = "Company name is required";
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }
    if (!formData.phoneNumber.trim()) {
      errors.phoneNumber = "Phone number is required";
    }
    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    if (!formData.userType) {
      errors.userType = "Please select your role";
    }
    return errors;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = validateForm();
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      setIsSubmitting(true);

      try {
        const response = await axios.post("/api/register", formData);

        if (response.data) {
          toast.success(
            formData.userType === "provider"
              ? "Registration successful! Please complete your company profile..."
              : "Registration successful! Redirecting to login...", 
            {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });

          // Store user data in localStorage for future use
          localStorage.setItem("user", JSON.stringify({
            ...response.data,
            role: formData.userType
          }));

          // If user is a provider, redirect to company details form
          if (formData.userType === "provider") {
            setTimeout(() => {
              router.push("/createCompany");
            }, 3000);
          } else {
            setTimeout(() => {
              router.push("/login");
            }, 3000);
          }
        }
      } catch (error: any) {
        console.error("Registration failed:", error);
        const errorMessage = error.response?.data?.error || "Registration failed. Please try again.";
        toast.error(errorMessage, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 overflow-hidden relative">
      <ToastContainer />
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-red-500 opacity-10"
            style={{
              width: `${Math.random() * 300 + 100}px`,
              height: `${Math.random() * 300 + 100}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Header */}
      <motion.header
        className="relative z-10 pt-16 pb-8 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-6 mt-8">
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-orange-400"
            animate={{
              textShadow: [
                "0 0 5px rgba(255, 99, 71, 0.3)",
                "0 0 15px rgba(255, 99, 71, 0.5)",
                "0 0 5px rgba(255, 99, 71, 0.3)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Join CyberJall InfoTech
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Secure your digital assets with our comprehensive security platform.
          </motion.p>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="relative z-10 pb-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Form Section */}
            <motion.div
              className="w-full lg:w-1/2 bg-black/20 backdrop-blur-lg rounded-2xl p-8 border border-red-500/20 shadow-xl"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <motion.form
                onSubmit={handleSubmit}
                className="space-y-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
              >
                <motion.h2
                  className="text-2xl md:text-3xl font-bold text-white text-center"
                  whileHover={{ scale: 1.02 }}
                >
                  Create Your Account
                </motion.h2>

                {/* User Type */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <label className="text-white/90 text-sm font-medium mb-1 block">I am a</label>
                  <select
                    name="userType"
                    value={formData.userType}
                    onChange={handleChange}
                    className={`w-full bg-black/10 border border-red-500/30 rounded-lg py-2 px-4 text-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-transparent`}
                  >
                    <option value="customer">Security Service Customer</option>
                    <option value="provider">Security Service Provider</option>
                  </select>
                </motion.div>

                {/* Company Name */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <label className="text-white/90 text-sm font-medium mb-1 block">
                    {formData.userType === 'provider' ? 'Company Name' : 'Your Organization'}
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    className={`w-full bg-black/10 border ${
                      formErrors.companyName ? "border-red-400" : "border-red-500/30"
                    } rounded-lg py-2 px-4 text-white placeholder-red-300/60 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-transparent`}
                    placeholder={
                      formData.userType === 'provider' 
                        ? 'Enter your company name' 
                        : 'Enter your organization name'
                    }
                  />
                  {formErrors.companyName && (
                    <p className="text-red-300 text-xs mt-1">{formErrors.companyName}</p>
                  )}
                </motion.div>

                {/* Email */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <label className="text-white/90 text-sm font-medium mb-1 block">Work Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full bg-black/10 border ${
                      formErrors.email ? "border-red-400" : "border-red-500/30"
                    } rounded-lg py-2 px-4 text-white placeholder-red-300/60 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-transparent`}
                    placeholder="Enter your work email"
                  />
                  {formErrors.email && (
                    <p className="text-red-300 text-xs mt-1">{formErrors.email}</p>
                  )}
                </motion.div>

                {/* Phone Number */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <label className="text-white/90 text-sm font-medium mb-1 block">Phone Number</label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className={`w-full bg-black/10 border ${
                      formErrors.phoneNumber ? "border-red-400" : "border-red-500/30"
                    } rounded-lg py-2 px-4 text-white placeholder-red-300/60 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-transparent`}
                    placeholder="Enter your phone number"
                  />
                  {formErrors.phoneNumber && (
                    <p className="text-red-300 text-xs mt-1">{formErrors.phoneNumber}</p>
                  )}
                </motion.div>

                {/* Password */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <label className="text-white/90 text-sm font-medium mb-1 block">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full bg-black/10 border ${
                      formErrors.password ? "border-red-400" : "border-red-500/30"
                    } rounded-lg py-2 px-4 text-white placeholder-red-300/60 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-transparent`}
                    placeholder="Enter your password"
                  />
                  {formErrors.password && (
                    <p className="text-red-300 text-xs mt-1">{formErrors.password}</p>
                  )}
                </motion.div>

                {/* Confirm Password */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                >
                  <label className="text-white/90 text-sm font-medium mb-1 block">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`w-full bg-black/10 border ${
                      formErrors.confirmPassword ? "border-red-400" : "border-red-500/30"
                    } rounded-lg py-2 px-4 text-white placeholder-red-300/60 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-transparent`}
                    placeholder="Confirm your password"
                  />
                  {formErrors.confirmPassword && (
                    <p className="text-red-300 text-xs mt-1">{formErrors.confirmPassword}</p>
                  )}
                </motion.div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  className="w-full bg-gradient-to-r from-red-600 to-orange-500 text-white rounded-lg py-3 font-semibold hover:bg-gradient-to-r hover:from-red-700 hover:to-orange-600 transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating Account...
                    </span>
                  ) : (
                    "Create Account"
                  )}
                </motion.button>

                <motion.p 
                  className="text-center text-white/70 text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                >
                  Already have an account?{' '}
                  <a 
                    href="/login" 
                    className="text-red-400 hover:text-red-300 underline transition-colors"
                  >
                    Sign in
                  </a>
                </motion.p>
              </motion.form>
            </motion.div>

            {/* Animation Section */}
            <motion.div
              className="w-full lg:w-1/2 flex justify-center items-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative w-full max-w-md">
                <div className="absolute inset-0 bg-gradient-to-br from-red-600 to-orange-500 rounded-full opacity-20 blur-xl"></div>
                <motion.div
                  animate={{
                    rotateY: [0, 360],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  className="relative z-10"
                >
                  <Image
                    src="/security-vector.svg"
                    alt="Security Illustration"
                    width={500}
                    height={500}
                    className="drop-shadow-2xl"
                  />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Page;