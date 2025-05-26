'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { verifyCaptcha } from '../api/ServerAction';
import ReCAPTCHA from "react-google-recaptcha";

const ContactPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [workEmail, setWorkEmail] = useState("");
  const [inquiryType, setInquiryType] = useState("business");
  const [message, setMessage] = useState("");

  const recaptchaRef = React.useRef<ReCAPTCHA>(null);

  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      fullName,
      companyName,
      workEmail,
      inquiryType,
      message
    }
    console.log(data)
    try {
      const res = await axios.post("/api/sendEmail", data);
      console.log(res.data);
      setFullName("");
      setCompanyName("");
      setWorkEmail("");
      setInquiryType("business");
      setMessage("");
    } catch (err) {
      console.log("error submitting form", err);
    }
  }

  const handleCaptchaSubmission = async (token: string | null) => {
    if (token) {
        try {
            await verifyCaptcha(token);
        } catch (error) {
            console.error('Error verifying captcha:', error);
        }
    }
  };

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="min-h-screen bg-gradient-to-bl from-red-900 via-gray-800 to-black overflow-hidden relative">
      {/* Cosmic Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Stars */}
        {[...Array(200)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: `${Math.random() * 3}px`,
              height: `${Math.random() * 3}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.8 + 0.2,
              animation: `twinkle ${Math.random() * 5 + 3}s infinite alternate`
            }}
          />
        ))}

        {/* Large Nebula Elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 0.3 : 0 }}
          transition={{ duration: 2 }}
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-purple-900/30 blur-[100px]"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 0.4 : 0 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-blue-900/20 blur-[120px]"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 0.3 : 0 }}
          transition={{ duration: 2, delay: 1 }}
          className="absolute top-1/3 right-1/3 w-80 h-80 rounded-full bg-violet-900/25 blur-[90px]"
        />

        {/* Animated Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 0.03 : 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDQwIDQwIj48cGF0aCBkPSJNMCAwaDQwdjQwSDB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTAgMjBoNDBNMjAgMHY0MCIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utb3BhY2l0eT0iMC4xIiBzdHJva2Utd2lkdGg9IjEiLz48L3N2Zz4=')]"
        />
      </div>

      <div className="container px-6 py-12 mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mt-10 mb-16"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              duration: 0.5, 
              type: "spring", 
              stiffness: 200 
            }}
            className="inline-flex items-center justify-center px-4 py-1.5 mb-4 rounded-full bg-gradient-to-r from-blue-500/20 to-violet-500/20 backdrop-blur-sm"
          >
            <span className="text-sm font-medium text-blue-200">Connect With Us</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-3xl font-bold text-white md:text-4xl lg:text-5xl tracking-tight"
          >
            Let&apos; Start a Conversation
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-4 max-w-2xl mx-auto text-neutral-300"
          >
            Reach out and let&apos;s explore possibilities together.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="lg:col-span-2 space-y-8"
          >
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              {[
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  ),
                  title: 'Email',
                  text: 'Direct line to our team',
                  contact: 'cyberjall@gmail.com',
                  delay: 0.1,
                  gradient: 'from-blue-500 to-violet-600'
                },
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                  ),
                  title: 'Phone',
                  text: 'Mon-Fri, 8am-5pm',
                  contact: '+91 77098 69493',
                  delay: 0.2,
                  gradient: 'from-violet-600 to-purple-600'
                },
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  ),
                  title: 'Headquarters',
                  text: 'Visit our innovation hub',
                  contact: 'Pune , Maharashtra',
                  delay: 0.3,
                  gradient: 'from-purple-600 to-blue-500'
                },
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                    </svg>
                  ),
                  title: 'Instant Chat',
                  text: 'Real-time support',
                  contact: 'Start Conversation',
                  delay: 0.4,
                  gradient: 'from-blue-400 to-purple-500'
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + item.delay }}
                  className="p-6 rounded-2xl bg-gray-900/60 backdrop-blur-sm shadow-xl border border-gray-800 group hover:border-blue-400/50 transition-all duration-300"
                >
                  <div className="relative">
                    <motion.span
                      whileHover={{ scale: 1.1, rotate: 10 }}
                      className={`inline-flex items-center justify-center p-3 rounded-full ${
                        index % 3 === 0 ? 'bg-blue-500/20 text-blue-300' : 
                        index % 2 === 0 ? 'bg-violet-500/20 text-violet-300' : 'bg-purple-500/20 text-purple-300'
                      }`}
                    >
                      {item.icon}
                    </motion.span>
                    <div 
                      className={`absolute inset-0 bg-gradient-to-r ${item.gradient} rounded-2xl blur-lg opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
                    />
                  </div>

                  <h2 className="mt-4 text-base font-semibold text-white">{item.title}</h2>
                  <p className="mt-2 text-sm text-neutral-300">{item.text}</p>
                  <p className={`mt-2 text-sm font-medium ${
                    index % 3 === 0 ? 'text-blue-300' : 
                    index % 2 === 0 ? 'text-violet-300' : 'text-purple-300'
                  }`}>{item.contact}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="lg:col-span-3"
          >
            <motion.div
              className="p-8 rounded-3xl bg-gray-900/80 backdrop-blur-sm shadow-xl border border-gray-800"
              initial={{ y: 50, scale: 0.9 }}
              animate={{ y: 0, scale: 1 }}
              transition={{ 
                type: "spring",
                stiffness: 100,
                damping: 15,
                delay: 0.8
              }}
            >
              <form onSubmit={sendEmail}>
                <div className="space-y-6">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-neutral-300">Full Name*</label>
                    <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                      <input
                        onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => { setFullName(e?.target?.value) }}
                        value={fullName}
                        type="text"
                        placeholder="Your Full Name"
                        className="block w-full px-5 py-3 text-white placeholder-neutral-500 bg-gray-800 border border-gray-700 rounded-lg focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40 transition-all duration-300"
                        required
                      />
                    </motion.div>
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-neutral-300">Company Name*</label>
                    <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                      <input
                        onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => { setCompanyName(e?.target?.value) }}
                        value={companyName}
                        type="text"
                        placeholder="Your Company Name"
                        className="block w-full px-5 py-3 text-white placeholder-neutral-500 bg-gray-800 border border-gray-700 rounded-lg focus:border-violet-400 focus:ring-violet-400 focus:outline-none focus:ring focus:ring-opacity-40 transition-all duration-300"
                        required
                      />
                    </motion.div>
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-neutral-300">Work Email*</label>
                    <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                      <input
                        onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => { setWorkEmail(e?.target?.value) }}
                        value={workEmail}
                        type="email"
                        placeholder="you@company.com"
                        className="block w-full px-5 py-3 text-white placeholder-neutral-500 bg-gray-800 border border-gray-700 rounded-lg focus:border-purple-400 focus:ring-purple-400 focus:outline-none focus:ring focus:ring-opacity-40 transition-all duration-300"
                        required
                      />
                    </motion.div>
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-neutral-300">Inquiry Type*</label>
                    <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                      <select
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => { setInquiryType(e?.target?.value) }}
                        value={inquiryType}
                        className="block w-full px-5 py-3 text-white bg-gray-800 border border-gray-700 rounded-lg focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40 transition-all duration-300"
                        required
                      >
                        <option value="business">I am a Business – Want to know more / Service Request</option>
                        <option value="provider">I am a Service Provider – Want to list my company on this platform / Partnership</option>
                        <option value="other">Other</option>
                      </select>
                    </motion.div>
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-neutral-300">Message</label>
                    <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                      <textarea
                        onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => { setMessage(e?.target?.value) }}
                        value={message}
                        className="block w-full h-32 px-5 py-3 text-white placeholder-neutral-500 bg-gray-800 border border-gray-700 rounded-lg md:h-48 focus:border-violet-400 focus:ring-violet-400 focus:outline-none focus:ring focus:ring-opacity-40 resize-none transition-all duration-300"
                        placeholder="Share your vision with us..."
                        rows={4}
                      ></textarea>
                    </motion.div>
                  </div>

                  <div className="flex items-center">
                    <div className="text-sm text-neutral-400">
                      <span className="mr-2">Captcha</span>
                      <span className="text-neutral-500">(Security purpose – anti spam protection)</span>
                      <ReCAPTCHA
                        sitekey={"process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!"}
                        ref={recaptchaRef}
                        onChange={handleCaptchaSubmission}
                      />
                    </div>
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative group"
                  >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400 via-violet-400 to-purple-400 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-300 group-hover:duration-200 animate-tilt"></div>
                    <button 
                      type="submit"
                      className="relative w-full px-8 py-4 text-sm font-medium text-white transition-all duration-300 bg-gradient-to-r from-blue-500/80 via-violet-500/80 to-purple-500/80 rounded-lg hover:from-blue-500 hover:via-violet-500 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 hover:text-white"
                    >
                      Send Message
                    </button>
                  </motion.div>
                </div>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes twinkle {
          0% { opacity: 0.2; }
          100% { opacity: ${Math.random() * 0.7 + 0.3}; }
        }
      `}</style>
    </section>
  );
};

export default ContactPage;