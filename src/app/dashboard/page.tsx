/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import axios from "axios";
import EditCompanyForm from "../components/EditCompany";
import Link from "next/link";

interface User {
  id: string;
  work_email: string;
  company_name: string;
  contact: string;
  message: string;
  password: string;
}

interface Product {
  name: string;
  description: string;
  image: string;
  link?: string; // Optional product link
}

interface ServiceOffered {
  name: string;
  description: string;
  image: string; 

}

interface ExpertiseCertification {
  type: string;
  name: string;
  logo:string;
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

interface Company {
  id: string;
  company_name: string;
  logo: string;
  overview: string;
  year_founded: string;
  headquarters_city: string;
  headquarters_country: string;
  industries_served: string[];
  target_business_size: string[];
  geographic_coverage: string[];
  team_size: string;
  services_offered: ServiceOffered[];
  expertise_and_certifications: ExpertiseCertification[];
  case_studies: CaseStudy[];
  client_reviews: ClientReview[];
  social_links: SocialLink;
  website: string;
  products: Product[];
  createdAt: string;
  updatedAt: string;
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("Tasks");
  const [user, setUser] = useState<User | null>(null);
  const [logo, setLogo] = useState<string>("/default-company-logo.png");
  const [company, setCompany] = useState<Company | null>(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

 const getCompanyData = useCallback(async () => {
  if (!user?.company_name) return;
  
  try {
    const res = await axios.put("/api/editCompany", { 
      company_name: user.company_name 
    });
    if (res.data) {
      setCompany(res.data.company);
      setLogo(res.data.logo || "/default-company-logo.png");
    }
  } catch (error) {
    console.error("Error fetching company data:", error);
  }
}, [user?.company_name]); // Add dependencies here


console.log(company);
  useEffect(() => {
    getCompanyData();
  });

  const handleSaveCompany = (originalCompany: Company) => (updatedCompany: Company) => {
    setCompany(updatedCompany);
    setLogo(updatedCompany.logo || "/default-company-logo.png");
  };

  const getUserDisplayName = () => {
    if (!user) return "Guest";
    return user.company_name || user.work_email?.split('@')[0] || "User";
  };

  // Dummy data
  const tasksData = [
    { id: 1, title: "Review API Security", status: "Pending" },
    { id: 2, title: "Test Web Application", status: "In Progress" },
    { id: 3, title: "Submit Bug Report", status: "Completed" },
  ];

  const activityData = [
    { id: 1, description: "Logged in", timestamp: "2 hours ago" },
    { id: 2, description: "Submitted a report", timestamp: "5 hours ago" },
    { id: 3, description: "Joined a new program", timestamp: "1 day ago" },
  ];
  
  const announcementsData = [
    {
      id: 1,
      title: "New Bug Bounty Program",
      description: "A new program has been launched. Check it out!",
      date: "2023-10-01",
    },
    {
      id: 2,
      title: "Maintenance Schedule",
      description: "The platform will be down for maintenance on 2023-10-05.",
      date: "2023-09-28",
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.5,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  if (!isClient) {
    return null; // Or a loading spinner
  }

  return (
    <div className="min-h-screen bg-black">
      <main className="p-6 md:p-8 lg:p-12">
        <motion.div
          className="max-w-6xl mx-auto bg-gray-900 bg-opacity-80 rounded-2xl shadow-2xl p-6 md:p-8 overflow-hidden border border-orange-600 border-opacity-20"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div
            className="flex items-center mt-12 pb-6 border-b border-orange-500 border-opacity-30 mb-8"
            variants={itemVariants}
          >
            <div className="bg-gradient-to-br from-red-600 to-orange-500 rounded-full p-1 mr-4">
              <div className="bg-gray-900 rounded-full p-1">
                <Image
                  src={logo}
                  alt="Company Logo"
                  width={50}
                  height={50}
                  className="rounded-full"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/default-company-logo.png";
                  }}
                />
              </div>
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-orange-500">
                    Good afternoon, {getUserDisplayName()}
                  </h2>
                  <p className="text-gray-300">
                    {user?.work_email || "Set your email"}
                  </p>
                </div>
                <button
                  onClick={() => setShowEditForm(true)}
                  className="px-4 py-2 bg-orange-600 hover:bg-orange-700 rounded-lg text-sm font-medium transition-colors"
                >
                  Edit Profile
                </button>
              </div>
            </div>
          </motion.div>
          <motion.div className="mb-8" variants={itemVariants}>
            <h3 className="text-lg font-semibold text-orange-500 mb-4">
              Rewards
            </h3>
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
              {["Tasks", "Activity", "Announcements"].map((tab) => (
                <button
                  key={tab}
                  className={`px-4 py-2 text-lg font-semibold ${
                    activeTab === tab
                      ? "text-orange-500 border-b-2 border-orange-500"
                      : "text-gray-300 hover:text-orange-400"
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="mt-6">
              {activeTab === "Tasks" && (
                <div className="space-y-4">
                  {/* {tasksData.map((task) => (
                    <div
                      key={task.id}
                      className="bg-gray-800 rounded-xl p-4 border border-orange-600 border-opacity-20 shadow-lg"
                    >
                      <h4 className="text-lg font-semibold text-orange-500">
                        {task.title}
                      </h4>
                      <p className="text-gray-300">Status: {task.status}</p>
                    </div>
                  ))} */}
                  No current tasks
                </div>
              )}

              {activeTab === "Activity" && (
                <div className="space-y-4">
                  {/* {activityData.map((activity) => (
                    <div
                      key={activity.id}
                      className="bg-gray-800 rounded-xl p-4 border border-orange-600 border-opacity-20 shadow-lg"
                    >
                      <p className="text-gray-300">{activity.description}</p>
                      <p className="text-gray-400 text-sm">
                        {activity.timestamp}
                      </p>
                    </div>
                  ))} */}
                  No current Activities
                </div>
              )}

              {activeTab === "Announcements" && (
                <div className="space-y-4">
                  {/* {announcementsData.map((announcement) => (
                    <div
                      key={announcement.id}
                      className="bg-gray-800 rounded-xl p-4 border border-orange-600 border-opacity-20 shadow-lg"
                    >
                      <h4 className="text-lg font-semibold text-orange-500">
                        {announcement.title}
                      </h4>
                      <p className="text-gray-300">
                        {announcement.description}
                      </p>
                      <p className="text-gray-400 text-sm">
                        {announcement.date}
                      </p>
                    </div>
                  ))} */}
                  No current announcements
                </div>
              )}
            </div>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            variants={itemVariants}
          >
            <div className="bg-gray-800 rounded-xl p-6 border border-orange-600 border-opacity-20 shadow-lg">
              <h3 className="text-lg font-semibold text-orange-500 mb-2">
                Improve profile
              </h3>
              <p className="text-gray-300">Add external profiles</p>
              <p className="text-gray-400 text-sm mt-2">
                Increase your chance of getting invites and accepted to private
                programs.
              </p>
              <Link
                href="/about"
                className="text-orange-500 hover:text-orange-400 text-sm"
              >
                About
              </Link>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 border border-orange-600 border-opacity-20 shadow-lg">
              <h3 className="text-lg font-semibold text-orange-500 mb-2">
                Secure account
              </h3>
              <p className="text-gray-300">Enable two-factor authentication.</p>
              <p className="text-gray-400 text-sm mt-2">
                Make your account more secure by requiring a special code in
                addition to your password to key it.
              </p>
              <Link
                href="/about"
                className="text-orange-500 hover:text-orange-400 text-sm"
              >
                About
              </Link>
            </div>
          </motion.div>

          {/* Rest of your dashboard content... */}

        </motion.div>
      </main>
    

      {showEditForm && company && (
        <EditCompanyForm
          company={company}
          onClose={() => setShowEditForm(false)}
          onSave={handleSaveCompany(company)}
        />
      )}
    </div>
  );
}