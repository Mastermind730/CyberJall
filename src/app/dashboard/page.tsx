/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Dashboard() {
  const [userName, setUserName] = useState('Chetanwanl2226');
  const [activeTab, setActiveTab] = useState('Tasks'); // State to manage active tab

  // Dummy data for tabs
  const tasksData = [
    { id: 1, title: 'Review API Security', status: 'Pending' },
    { id: 2, title: 'Test Web Application', status: 'In Progress' },
    { id: 3, title: 'Submit Bug Report', status: 'Completed' },
  ];

  const activityData = [
    { id: 1, description: 'Logged in', timestamp: '2 hours ago' },
    { id: 2, description: 'Submitted a report', timestamp: '5 hours ago' },
    { id: 3, description: 'Joined a new program', timestamp: '1 day ago' },
  ];

  const announcementsData = [
    { id: 1, title: 'New Bug Bounty Program', description: 'A new program has been launched. Check it out!', date: '2023-10-01' },
    { id: 2, title: 'Maintenance Schedule', description: 'The platform will be down for maintenance on 2023-10-05.', date: '2023-09-28' },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        duration: 0.5 
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen bg-black">
      

      <main className="p-6 md:p-8 lg:p-12">
        <motion.div 
          className="max-w-6xl mx-auto bg-gray-900 bg-opacity-80 rounded-2xl shadow-2xl p-6 md:p-8 overflow-hidden border border-orange-600 border-opacity-20"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div className="flex items-center mt-12 pb-6 border-b border-orange-500 border-opacity-30 mb-8" variants={itemVariants}>
            <div className="bg-gradient-to-br from-red-600 to-orange-500 rounded-full p-1 mr-4">
              <div className="bg-gray-900 rounded-full p-1">
                <Image
                  src="/logo.png"
                  alt="User Icon"
                  width={50}
                  height={50}
                  className="rounded-full"
                />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-orange-500">Good afternoon, {userName}</h2>
              <p className="text-gray-300">Set availability</p>
            </div>
          </motion.div>

          {/* Rewards Section */}
          <motion.div className="mb-8" variants={itemVariants}>
            <h3 className="text-lg font-semibold text-orange-500 mb-4">Rewards</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-800 rounded-xl p-6 border border-orange-600 border-opacity-20 shadow-lg">
                <p className="text-gray-300">Last 30 days</p>
                <p className="text-2xl font-bold text-orange-500">$0.00</p>
              </div>
              <div className="bg-gray-800 rounded-xl p-6 border border-orange-600 border-opacity-20 shadow-lg">
                <p className="text-gray-300">Upcoming payments</p>
                <p className="text-2xl font-bold text-orange-500">$0.00</p>
              </div>
            </div>
          </motion.div>

          <motion.div className="mb-8" variants={itemVariants}>
            <div className="flex space-x-4 border-b border-orange-500 border-opacity-30">
              {['Tasks', 'Activity', 'Announcements'].map((tab) => (
                <button
                  key={tab}
                  className={`px-4 py-2 text-lg font-semibold ${
                    activeTab === tab
                      ? 'text-orange-500 border-b-2 border-orange-500'
                      : 'text-gray-300 hover:text-orange-400'
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="mt-6">
              {activeTab === 'Tasks' && (
                <div className="space-y-4">
                  {tasksData.map((task) => (
                    <div key={task.id} className="bg-gray-800 rounded-xl p-4 border border-orange-600 border-opacity-20 shadow-lg">
                      <h4 className="text-lg font-semibold text-orange-500">{task.title}</h4>
                      <p className="text-gray-300">Status: {task.status}</p>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'Activity' && (
                <div className="space-y-4">
                  {activityData.map((activity) => (
                    <div key={activity.id} className="bg-gray-800 rounded-xl p-4 border border-orange-600 border-opacity-20 shadow-lg">
                      <p className="text-gray-300">{activity.description}</p>
                      <p className="text-gray-400 text-sm">{activity.timestamp}</p>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'Announcements' && (
                <div className="space-y-4">
                  {announcementsData.map((announcement) => (
                    <div key={announcement.id} className="bg-gray-800 rounded-xl p-4 border border-orange-600 border-opacity-20 shadow-lg">
                      <h4 className="text-lg font-semibold text-orange-500">{announcement.title}</h4>
                      <p className="text-gray-300">{announcement.description}</p>
                      <p className="text-gray-400 text-sm">{announcement.date}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-4" variants={itemVariants}>
            <div className="bg-gray-800 rounded-xl p-6 border border-orange-600 border-opacity-20 shadow-lg">
              <h3 className="text-lg font-semibold text-orange-500 mb-2">Improve profile</h3>
              <p className="text-gray-300">Add external profiles</p>
              <p className="text-gray-400 text-sm mt-2">Increase your chance of getting invites and accepted to private programs.</p>
              <Link href="/about" className="text-orange-500 hover:text-orange-400 text-sm">About</Link>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 border border-orange-600 border-opacity-20 shadow-lg">
              <h3 className="text-lg font-semibold text-orange-500 mb-2">Secure account</h3>
              <p className="text-gray-300">Enable two-factor authentication.</p>
              <p className="text-gray-400 text-sm mt-2">Make your account more secure by requiring a special code in addition to your password to key it.</p>
              <Link href="/about" className="text-orange-500 hover:text-orange-400 text-sm">About</Link>
            </div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}