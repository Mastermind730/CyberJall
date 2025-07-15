/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useState, useEffect } from "react";
import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowRight, FiCheck, FiShield, FiCpu, FiCode, FiLock, FiCloud, FiUsers } from "react-icons/fi";
import { useRouter } from "next/navigation";

const DevSecOpsPage = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isHovering, setIsHovering] = useState("");


  const router = useRouter();

  const engagementOptions = [
    {
      name: "DevSecOps Starter",
      price: "From $3,500",
      features: [
        "Basic CI/CD hardening",
        "Secure code scanning",
        "Git integration",
        "Weekly security reports"
      ],
      cta: "Get Started"
    },
    {
      name: "End-to-End Buildout",
      price: "From $8,500",
      features: [
        "Full security automation",
        "SAST/DAST/SCA integration",
        "Container security",
        "Daily security reports",
        "Priority support"
      ],
      cta: "Schedule Demo"
    },
    {
      name: "DevSecOps + VAPT",
      price: "From $12,000",
      features: [
        "Everything in Buildout",
        "Monthly penetration tests",
        "Red team exercises",
        "Compliance reporting",
        "Dedicated security engineer"
      ],
      cta: "Contact Sales"
    }
  ];

  return (
    <div className="bg-black text-white min-h-screen">
      <Head>
        <title>DevSecOps Implementation | CyberJall</title>
        <meta name="description" content="Integrate security across your development lifecycle with our DevSecOps solutions" />
      </Head>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black" />
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-transparent to-black" />
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-transparent to-black" />
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
              <span className="text-orange-400 uppercase text-sm font-semibold tracking-wider">DevSecOps</span>
            </div>
            <h1 className="text-5xl font-bold leading-tight mb-6">
              <span className="text-red-500">Integrate Security</span> Across Your Development Lifecycle
            </h1>
            <p className="text-xl text-gray-300 mb-10">
              Shift Left, Stay Secure with automated security testing and compliance built into your CI/CD pipeline
            </p>
            <div className="flex flex-wrap gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-medium"
              >
                Browse Providers
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border border-orange-500 text-orange-500 hover:bg-orange-500 hover:bg-opacity-10 px-8 py-4 rounded-lg font-medium"
              >
                How It Works
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">🚨 Why DevSecOps <span className="text-orange-500">Matters</span></h2>
            <div className="w-24 h-1 bg-red-600 mx-auto mb-6"></div>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto">
              In fast-moving development environments, security can&apos;t be an afterthought. DevSecOps embeds security directly into your workflow.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <FiCode className="w-8 h-8" />,
                title: "Security as Afterthought",
                desc: "Manual reviews can't keep up with frequent releases"
              },
              {
                icon: <FiLock className="w-8 h-8" />,
                title: "Vulnerable Code",
                desc: "Developers may unknowingly push security flaws"
              },
              {
                icon: <FiCloud className="w-8 h-8" />,
                title: "Compliance Risks",
                desc: "Audit findings from insecure deployment practices"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="bg-gray-800 p-8 rounded-xl border-l-4 border-orange-500"
              >
                <div className="text-orange-500 mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Deliverables */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">🎯 Key <span className="text-red-500">Deliverables</span></h2>
            <div className="w-24 h-1 bg-orange-500 mx-auto mb-6"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "CI/CD Pipeline Hardening",
                items: [
                  "GitHub/GitLab/Jenkins integration",
                  "Pre-commit hooks",
                  "Automated security triggers"
                ]
              },
              {
                title: "Security Testing",
                items: [
                  "Static Analysis (SAST)",
                  "Dynamic Analysis (DAST)",
                  "Software Composition (SCA)"
                ]
              },
              {
                title: "Secrets Management",
                items: [
                  "Hardcoded secrets scanning",
                  "Vault integration",
                  "Credential rotation"
                ]
              },
              {
                title: "Container Security",
                items: [
                  "Docker image scanning",
                  "Kubernetes hardening",
                  "IaC validation"
                ]
              },
              {
                title: "Developer Enablement",
                items: [
                  "Secure coding guidelines",
                  "Workflow playbooks",
                  "Training workshops"
                ]
              },
              {
                title: "Compliance Automation",
                items: [
                  "ISO/SOC 2 readiness",
                  "Audit trail generation",
                  "Policy as Code"
                ]
              }
            ].map((deliverable, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-800 p-6 rounded-lg border-t-4 border-red-600"
              >
                <h3 className="text-xl font-bold mb-4 text-orange-400">{deliverable.title}</h3>
                <ul className="space-y-3">
                  {deliverable.items.map((item, i) => (
                    <li key={i} className="flex items-start">
                      <FiCheck className="text-green-400 mt-1 mr-2 flex-shrink-0" />
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
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
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              "Vetted DevSecOps experts",
              "Tech-stack-aligned implementations",
              "Multi-service bundling",
              "Subscription packages",
              "Cyber Health Score",
              "Developer webinars",
              "Unified onboarding",
              "24/7 platform support"
            ].map((advantage, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="flex items-start bg-gray-800 p-6 rounded-lg"
              >
                <div className="bg-red-600 bg-opacity-20 p-2 rounded-full mr-4">
                  <FiCheck className="text-red-400" />
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
            <h2 className="text-4xl font-bold mb-6">Ready to Shift Security Left?</h2>
            <p className="text-xl mb-10 text-orange-100">
              Connect with our vetted DevSecOps experts today and build security into your development workflow.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.button
              onClick={()=>{router.push("/contact_us")}}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-black px-8 py-4 rounded-lg font-medium"
              >
                Get Started Now
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border border-white text-white hover:bg-white hover:bg-opacity-10 px-8 py-4 rounded-lg font-medium"
              >
                Schedule Consultation
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default DevSecOpsPage;