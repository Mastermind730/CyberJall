/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useState } from "react";
import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";
import { FiShield, FiServer, FiCode, FiLock, FiCloud, FiLayers, FiActivity, FiCheck } from "react-icons/fi";

const ServerlessContainerSecurity = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  const engagementOptions = [
    {
      name: "Security Audit",
      price: "From $2,500",
      features: [
        "One-time deep-dive assessment",
        "Container image scanning",
        "Serverless IAM review",
        "Compliance gap analysis",
        "Detailed report"
      ],
      cta: "Request Audit"
    },
    {
      name: "Deployment Hardening",
      price: "From $5,500",
      features: [
        "Pre-production security",
        "K8s CIS Benchmarking",
        "Least-privilege configuration",
        "Secrets management setup",
        "CI/CD integration"
      ],
      cta: "Secure Deployment"
    },
    {
      name: "Continuous Protection",
      price: "From $9,500",
      features: [
        "Runtime monitoring",
        "Threat detection",
        "Quarterly reviews",
        "Priority support",
        "Incident response"
      ],
      cta: "Get Protected"
    }
  ];

  const features = [
    {
      icon: <FiServer className="w-6 h-6" />,
      title: "Container Image Scanning",
      desc: "Detect vulnerabilities in Docker images before deployment"
    },
    {
      icon: <FiCloud className="w-6 h-6" />,
      title: "Serverless IAM Review",
      desc: "Audit Lambda permissions and apply least-privilege"
    },
    {
      icon: <FiLayers className="w-6 h-6" />,
      title: "K8s Hardening",
      desc: "CIS Benchmark compliance for Kubernetes clusters"
    },
    {
      icon: <FiActivity className="w-6 h-6" />,
      title: "Runtime Monitoring",
      desc: "Detect suspicious container behavior in production"
    },
    {
      icon: <FiCode className="w-6 h-6" />,
      title: "CI/CD Integration",
      desc: "Automate security checks in build pipelines"
    },
    {
      icon: <FiLock className="w-6 h-6" />,
      title: "Secret Management",
      desc: "Secure environment variables and cloud keys"
    }
  ];

  return (
    <div className="bg-black text-white min-h-screen">
      <Head>
        <title>Serverless & Container Security | CyberJall</title>
        <meta name="description" content="Secure your cloud-native applications with our specialized container and serverless security services" />
      </Head>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-gray-900 to-black">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-repeat opacity-30" />
        </div>
        
        <div className="container mx-auto px-6 py-24 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-1 bg-orange-500 mr-4"></div>
              <span className="text-orange-400 uppercase text-sm font-semibold tracking-wider">Cloud-Native Security</span>
            </div>
            <h1 className="text-5xl font-bold leading-tight mb-6">
              <span className="text-red-500">Serverless & Container</span> Security
            </h1>
            <p className="text-xl text-gray-300 mb-10">
              Secure your modern cloud-native applications without compromising speed or scalability
            </p>
            <div className="flex flex-wrap gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-medium"
              >
                Explore Providers
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border border-orange-500 text-orange-500 hover:bg-orange-500 hover:bg-opacity-10 px-8 py-4 rounded-lg font-medium"
              >
                See Case Studies
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why It Matters */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">🚨 Why <span className="text-orange-500">It Matters</span></h2>
            <div className="w-24 h-1 bg-red-600 mx-auto mb-6"></div>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto">
              Cloud-native technologies introduce new attack surfaces that traditional security tools can&apos;t detect
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "Misconfigured Containers",
                desc: "Can expose entire environments to compromise"
              },
              {
                title: "Excessive Permissions",
                desc: "Serverless functions often run with unnecessary access"
              },
              {
                title: "Vulnerable Images",
                desc: "Base images may contain known vulnerabilities"
              },
              {
                title: "CI/CD Blind Spots",
                desc: "Security gaps in automated deployment pipelines"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="bg-gray-900 p-6 rounded-lg border-l-4 border-red-600"
              >
                <h3 className="text-xl font-bold mb-3 text-orange-400">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">🎯 Key <span className="text-red-500">Deliverables</span></h2>
            <div className="w-24 h-1 bg-orange-500 mx-auto mb-6"></div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-800 p-8 rounded-xl"
                onMouseEnter={() => setHoveredFeature(index)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <motion.div
                  animate={{
                    color: hoveredFeature === index ? "#F97316" : "#EF4444"
                  }}
                  className="mb-4"
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Ideal For */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">👤 <span className="text-orange-500">Ideal For</span></h2>
            <div className="w-24 h-1 bg-red-600 mx-auto mb-6"></div>
          </div>

          <div className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-6">
            {[
              "Startups using containers/serverless",
              "Microservices architectures",
              "Teams deploying via CI/CD",
              "Kubernetes/Lambda environments",
              "Organizations with compliance needs",
              "Cloud-native application teams"
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center bg-gray-800 p-5 rounded-lg"
              >
                <div className="bg-orange-500 bg-opacity-20 p-2 rounded-full mr-4">
                  <FiCheck className="text-orange-400" />
                </div>
                <span>{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Engagement Options */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">🛠️ Engagement <span className="text-orange-500">Options</span></h2>
            <div className="w-24 h-1 bg-red-600 mx-auto mb-6"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {engagementOptions.map((option, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className={`rounded-xl overflow-hidden ${index === 1 ? "border-2 border-orange-500" : "border border-gray-700"}`}
              >
                <div className={`p-6 ${index === 1 ? "bg-gray-900" : "bg-gray-800"}`}>
                  <h3 className="text-2xl font-bold mb-2">{option.name}</h3>
                  <p className="text-orange-400 text-xl mb-6">{option.price}</p>
                  <ul className="space-y-3 mb-8">
                    {option.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <FiCheck className="text-green-400 mt-1 mr-2 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className={`w-full py-3 rounded-lg font-medium ${index === 1 ? "bg-orange-600 hover:bg-orange-700" : "bg-gray-700 hover:bg-gray-600"}`}
                  >
                    {option.cta}
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CyberJall Advantage */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">🔐 CyberJall <span className="text-red-500">Advantage</span></h2>
            <div className="w-24 h-1 bg-orange-500 mx-auto mb-6"></div>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto">
              Access cloud-native security experts who understand the complexity of securing fast-moving architectures
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              "K8s/Docker/serverless experts",
              "Integration-ready solutions",
              "Bundling with DevSecOps/CSPM",
              "Cyber Health Score tracking",
              "Subscription-based plans",
              "Unified reporting & support",
              "Free threat research access",
              "Quarterly security reviews"
            ].map((advantage, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.03 }}
                className="flex items-start bg-gray-800 p-5 rounded-lg border border-gray-700"
              >
                <div className="bg-red-600 bg-opacity-20 p-2 rounded-full mr-4">
                  <FiShield className="text-red-400" />
                </div>
                <span>{advantage}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-900 to-orange-900">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl font-bold mb-6">Secure Your Cloud-Native Stack</h2>
            <p className="text-xl mb-10 text-orange-100">
              Connect with specialized container and serverless security experts today
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-black px-8 py-4 rounded-lg font-medium"
              >
                Browse Providers
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border border-white text-white hover:bg-white hover:bg-opacity-10 px-8 py-4 rounded-lg font-medium"
              >
                Get Custom Quote
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ServerlessContainerSecurity;