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
}

interface FormErrors {
  companyName?: string;
  email?: string;
  phoneNumber?: string;
  password?: string;
  confirmPassword?: string;
}

const Page = () => {
  const [formData, setFormData] = useState<FormData>({
    companyName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
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
          toast.success("Registration successful! Redirecting to login...", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });

          setTimeout(() => {
            router.push("/createCompany");
          }, 3000);
        }
      } catch (error) {
        console.error("Registration failed:", error);
        toast.error("Registration failed. Please try again.", {
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
            Get Started with Bug Bounty Platform
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Secure your applications with our comprehensive platform designed for companies of all sizes.
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

                {/* Company Name */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <label className="text-white/90 text-sm font-medium mb-1 block">Company Name</label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    className={`w-full bg-black/10 border ${
                      formErrors.companyName ? "border-red-400" : "border-red-500/30"
                    } 
                      rounded-lg py-2 px-4 text-white placeholder-red-300/60 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-transparent`}
                    placeholder="Enter your company name"
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
                  <label className="text-white/90 text-sm font-medium mb-1 block">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full bg-black/10 border ${
                      formErrors.email ? "border-red-400" : "border-red-500/30"
                    } rounded-lg py-2 px-4 text-white placeholder-red-300/60 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-transparent`}
                    placeholder="Enter your email"
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
                  className="w-full bg-gradient-to-r from-red-600 to-orange-500 text-white rounded-lg py-2 font-semibold hover:bg-gradient-to-r hover:from-red-700 hover:to-orange-600 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Sign Up"}
                </motion.button>
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
                    src="/security-vector.svg" // Replace with your security vector image
                    alt="Security Animation"
                    width={400}
                    height={400}
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