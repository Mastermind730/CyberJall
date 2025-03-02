'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const ContactPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [name,setName] = useState("");
  const [email,setEmail]= useState("");
  const [message,setMessage] = useState("");

  const sendEmail=async(e:Event)=>{
    e.preventDefault();
        const data ={
          name,
          email,message
        }
        console.log(data)
        try{
        const res=await axios.post("/api/sendEmail",data);
          console.log(res.data);
          setEmail("");
          setName("");
          setMessage("");
        }catch(err){
console.log("error submitting form",err);
        }
  }
    

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 to-white overflow-hidden relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.8 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="absolute top-10 left-10 w-64 h-64 rounded-full bg-blue-300 blur-3xl"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.8 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="absolute top-1/2 right-20 w-96 h-96 rounded-full bg-indigo-300 blur-3xl"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.8 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="absolute bottom-20 left-1/3 w-80 h-80 rounded-full bg-sky-300 blur-3xl"
          />
        </div>
      </div>

      <div className="container px-6 py-12 mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-flex items-center justify-center px-4 py-1.5 mb-4 rounded-full bg-blue-100 backdrop-blur-sm"
          >
            <span className="text-sm font-medium text-blue-600">Reach Out To Us</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-3xl font-bold text-gray-800 md:text-4xl lg:text-5xl"
          >
            Let&apos;s Start a Conversation
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-4 max-w-2xl mx-auto text-gray-600"
          >
            We&apos;d love to hear from you. Our team is ready to assist with any questions or inquiries you may have.
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
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  ),
                  title: 'Email',
                  text: 'Our friendly team is here to help.',
                  contact: 'hello@company.com',
                  delay: 0.1
                },
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                  ),
                  title: 'Phone',
                  text: 'Mon-Fri from 8am to 5pm.',
                  contact: '+1 (555) 000-0000',
                  delay: 0.2
                },
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  ),
                  title: 'Office',
                  text: 'Come say hello at our office HQ.',
                  contact: '100 Smith Street Collingwood VIC 3066 AU',
                  delay: 0.3
                },
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                    </svg>
                  ),
                  title: 'Live chat',
                  text: 'Our friendly team is here to help.',
                  contact: 'Start new chat',
                  delay: 0.4
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + item.delay }}
                  className="p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-50 group hover:border-blue-200"
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full blur-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                    <motion.span 
                      whileHover={{ scale: 1.05, rotate: 5 }}
                      className="inline-flex items-center justify-center p-3 text-blue-600 rounded-full bg-blue-100"
                    >
                      {item.icon}
                    </motion.span>
                  </div>

                  <h2 className="mt-4 text-base font-semibold text-gray-800">{item.title}</h2>
                  <p className="mt-2 text-sm text-gray-500">{item.text}</p>
                  <p className="mt-2 text-sm font-medium text-blue-600">{item.contact}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="overflow-hidden rounded-2xl h-64 bg-blue-100 relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/20"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-blue-800 font-medium">Interactive Map Placeholder</p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="lg:col-span-3"
          >
            <motion.div
              className="p-8 rounded-3xl bg-white backdrop-blur-sm shadow-xl border border-blue-100"
              initial={{ y: 50 }}
              animate={{ y: 0 }}
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
                      <label className="block mb-2 text-sm font-medium text-gray-700"> Name</label>
                      <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                        <input
                        onChange={(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{setName(e?.target?.value)}}
                          type="text"
                          placeholder="John"
                          className="block w-full px-5 py-3 text-gray-700 placeholder-gray-400 bg-white bg-opacity-90 border border-gray-200 rounded-lg focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40 transition-all duration-300"
                        />
                      </motion.div>
                    </div>

                   
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Email address</label>
                    <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                      <input
                       onChange={(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{setEmail(e?.target?.value)}}

                        type="email"
                        placeholder="johndoe@example.com"
                        className="block w-full px-5 py-3 text-gray-700 placeholder-gray-400 bg-white bg-opacity-90 border border-gray-200 rounded-lg focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40 transition-all duration-300"
                      />
                    </motion.div>
                  </div>
                 

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Message</label>
                    <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                      <textarea
                        onChange={(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{setMessage(e?.target?.value)}}

                        className="block w-full h-32 px-5 py-3 text-gray-700 placeholder-gray-400 bg-white bg-opacity-90 border border-gray-200 rounded-lg md:h-48 focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40 resize-none transition-all duration-300"
                        placeholder="How can we help you?"
                      ></textarea>
                    </motion.div>
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative group"
                  >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-300 group-hover:duration-200"></div>
                    <button  className="relative w-full px-8 py-4 text-sm font-medium text-white transition-all duration-300 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg hover:from-blue-500 hover:to-indigo-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2">
                      Send Message
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