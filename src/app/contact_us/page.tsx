'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const ContactPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      name,
      email,
      message
    }
    console.log(data)
    try {
      const res = await axios.post("/api/sendEmail", data);
      console.log(res.data);
      setEmail("");
      setName("");
      setMessage("");
    } catch (err) {
      console.log("error submitting form", err);
    }
  }

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="min-h-screen bg-gradient-to-br from-black via-neutral-900 to-red-950 overflow-hidden relative">
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
          animate={{ 
            opacity: isLoaded ? 0.2 : 0, 
            scale: isLoaded ? 1.2 : 0.8,
            rotate: 360
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity, 
            repeatType: "reverse",
            ease: "easeInOut"
          }}
          className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%] bg-gradient-to-r from-red-900/30 to-black/30 blur-3xl rotate-45"
        />
        <motion.div
          initial={{ opacity: 0, x: -100, y: -100 }}
          animate={{ 
            opacity: isLoaded ? 0.1 : 0, 
            x: isLoaded ? 100 : -100,
            y: isLoaded ? 100 : -100
          }}
          transition={{ 
            duration: 15, 
            repeat: Infinity, 
            repeatType: "mirror",
            ease: "easeInOut"
          }}
          className="absolute inset-0 bg-gradient-to-br from-red-900/20 to-black/20 blur-2xl"
        />
      </div>

      <div className="container px-6 py-12 mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              duration: 0.5, 
              type: "spring", 
              stiffness: 200 
            }}
            className="inline-flex items-center justify-center px-4 py-1.5 mb-4 rounded-full bg-red-900/20 backdrop-blur-sm"
          >
            <span className="text-sm font-medium text-red-300">Connect With Us</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20, letterSpacing: -0.1 }}
            animate={{ opacity: 1, y: 0, letterSpacing: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-3xl font-bold text-white md:text-4xl lg:text-5xl tracking-tight"
          >
            Let&apos;s Ignite a Conversation
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-4 max-w-2xl mx-auto text-neutral-400"
          >
            Reach out and let&apos;s create something extraordinary together.
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
                  contact: 'connect@blazetech.com',
                  delay: 0.1,
                  gradient: 'from-red-600 to-black'
                },
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                  ),
                  title: 'Phone',
                  text: 'Mon-Fri, 8am-5pm',
                  contact: '+1 (888) BLAZE-TX',
                  delay: 0.2,
                  gradient: 'from-black to-red-700'
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
                  contact: '1337 Forge Street, Austin, TX',
                  delay: 0.3,
                  gradient: 'from-red-800 to-black'
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
                  gradient: 'from-black to-red-900'
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + item.delay }}
                  className="p-6 rounded-2xl bg-neutral-900/60 backdrop-blur-sm shadow-2xl border border-red-900/30 group hover:border-red-600/50 transition-all duration-300"
                >
                  <div className="relative">
                    <motion.span
                      whileHover={{ scale: 1.1, rotate: 10 }}
                      className="inline-flex items-center justify-center p-3 text-red-400 rounded-full bg-red-900/20"
                    >
                      {item.icon}
                    </motion.span>
                    <div 
                      className={`absolute inset-0 bg-gradient-to-r ${item.gradient} rounded-full blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300`}
                    />
                  </div>

                  <h2 className="mt-4 text-base font-semibold text-white">{item.title}</h2>
                  <p className="mt-2 text-sm text-neutral-400">{item.text}</p>
                  <p className="mt-2 text-sm font-medium text-red-300">{item.contact}</p>
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
              className="p-8 rounded-3xl bg-neutral-900/80 backdrop-blur-sm shadow-2xl border border-red-900/30"
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
                  <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-neutral-300">Name</label>
                      <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                        <input
                          onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => { setName(e?.target?.value) }}
                          type="text"
                          placeholder="Your Name"
                          className="block w-full px-5 py-3 text-white placeholder-neutral-500 bg-neutral-800 border border-neutral-700 rounded-lg focus:border-red-600 focus:ring-red-600 focus:outline-none focus:ring focus:ring-opacity-40 transition-all duration-300"
                        />
                      </motion.div>
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-neutral-300">Email Address</label>
                      <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                        <input
                          onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => { setEmail(e?.target?.value) }}
                          type="email"
                          placeholder="you@example.com"
                          className="block w-full px-5 py-3 text-white placeholder-neutral-500 bg-neutral-800 border border-neutral-700 rounded-lg focus:border-red-600 focus:ring-red-600 focus:outline-none focus:ring focus:ring-opacity-40 transition-all duration-300"
                        />
                      </motion.div>
                    </div>
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-neutral-300">Message</label>
                    <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                      <textarea
                        onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => { setMessage(e?.target?.value) }}
                        className="block w-full h-32 px-5 py-3 text-white placeholder-neutral-500 bg-neutral-800 border border-neutral-700 rounded-lg md:h-48 focus:border-red-600 focus:ring-red-600 focus:outline-none focus:ring focus:ring-opacity-40 resize-none transition-all duration-300"
                        placeholder="Share your vision with us..."
                        rows={4}
                      ></textarea>
                    </motion.div>
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative group"
                  >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-red-600 to-black rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-300 group-hover:duration-200"></div>
                    <button 
                      type="submit"
                      className="relative w-full px-8 py-4 text-sm font-medium text-white transition-all duration-300 bg-gradient-to-r from-red-700 to-black rounded-lg hover:from-red-600 hover:to-neutral-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 hover:text-neutral-200"
                    >
                      Ignite Communication
                    </button>
                  </motion.div>
                </div>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;