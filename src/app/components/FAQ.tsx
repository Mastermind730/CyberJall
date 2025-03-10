"use client";
import React, { useState } from 'react';
import { ChevronDown, Shield, Search, Clock, FileText, Globe, Settings, AlertCircle, Server, Check, Users, ArrowRight } from 'lucide-react';
import { LucideIcon } from 'lucide-react';
import Link from 'next/link';

interface FAQProps {
    question: string;
    answer: string[];
    icon: LucideIcon
}

const FAQItem: React.FC<FAQProps> = ({ question, answer, icon: Icon }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-800/50 py-4">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="flex w-full items-center justify-between text-left hover:bg-red-900/10 transition-colors p-4 rounded-lg group"
      >
        <div className="flex items-center space-x-4">
          <Icon className="text-red-500 w-6 h-6 group-hover:text-red-400 transition-colors" />
          <h3 className="text-lg font-semibold text-gray-200 group-hover:text-red-300 transition-colors">{question}</h3>
        </div>
        <ChevronDown 
          className={`w-5 h-5 text-gray-500 transform transition-all ${isOpen ? 'rotate-180 text-red-500' : 'group-hover:text-red-400'}`} 
        />
      </button>
      {isOpen && (
        <div className="px-4 pb-4 text-gray-400">
          <ul className="space-y-2 pl-10 list-disc">
            {answer.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const CyberJallFAQ = () => {
  const faqData = [
    {
      question: "Why Choose CyberJall for Web Application Penetration Testing?",
      answer: [
        "Vetted security professionals with proven expertise.",
        "Customizable testing packages tailored to your business needs.",
        "Collaborative approach with multiple providers.",
        "Transparent pricing and detailed vulnerability reports."
      ],
      icon: Shield
    },
    {
      question: "How Will Penetration Testing Benefit My Company?",
      answer: [
        "Prevent data breaches, financial loss, and reputational damage.",
        "Identify security gaps before attackers can exploit them.",
        "Ensure compliance with industry regulations.",
        "Strengthen customer trust through proactive security measures.",
        "Reduce downtime by preventing security incidents that disrupt business operations."
      ],
      icon: Search
    },
    {
      question: "How Often Should My Company Conduct Penetration Testing?",
      answer: [
        "At least once a year.",
        "When launching new web applications or making significant updates.",
        "After integrating third-party services handling sensitive data.",
        "Following a security incident or vulnerability suspicion.",
        "When regulatory bodies require periodic security assessments."
      ],
      icon: Clock
    },
    {
      question: "What Kind of Report Will I Receive?",
      answer: [
        "Detailed vulnerability assessment report.",
        "Security weaknesses ranked by severity.",
        "Exploitation techniques used by testers.",
        "Step-by-step remediation guidelines.",
        "Risk impact analysis with improvement recommendations."
      ],
      icon: FileText
    },
    {
      question: "Is Penetration Testing Required for Regulatory Compliance?",
      answer: [
        "Yes, required by standards like PCI-DSS, GDPR, HIPAA, and ISO 27001.",
        "Helps businesses meet industry-specific security regulations.",
        "Provides audit-ready reports from verified security providers."
      ],
      icon: Globe
    },
    {
      question: "What is the Difference Between Automated and Manual Penetration Testing?",
      answer: [
        "Automated testing uses security tools to scan for known vulnerabilities quickly but may miss complex threats.",
        "Manual testing is performed by ethical hackers who simulate real-world attack scenarios to uncover hidden weaknesses.",
        "CyberJall's approach: We provide access to providers that offer both methods for a thorough security evaluation."
      ],
      icon: Settings
    },
    {
      question: "Will Penetration Testing Affect My Web Application's Performance?",
      answer: [
        "No, professional penetration testers follow a structured methodology to ensure minimal disruption.",
        "Testing can be scheduled during off-peak hours to prevent impact on daily operations."
      ],
      icon: AlertCircle
    },
    {
      question: "Can I Customize My Penetration Testing Scope?",
      answer: [
        "Yes! CyberJalls platform allows businesses to select security providers and customize testing parameters.",
        "Targeted application areas (e.g., login, payment gateway, APIs).",
        "Depth of testing (basic scanning vs. advanced exploitation).",
        "Compliance-focused testing for industry-specific security needs."
      ],
      icon: Server
    },
    {
      question: "What Happens If Vulnerabilities Are Found?",
      answer: [
        "A detailed remediation plan from cybersecurity professionals.",
        "Re-testing services to ensure issues are resolved.",
        "Continuous security monitoring (optional) to prevent future risks."
      ],
      icon: Check
    },
    {
      question: "How is CyberJall Different From Hiring an In-House Security Team?",
      answer: [
        "Hiring an in-house team is costly and time-consuming.",
        "CyberJall offers on-demand access to verified security experts without long-term hiring commitments.",
        "Our marketplace lets you compare multiple providers and choose the best fit for your business."
      ],
      icon: Users
    },
    {
      question: "How Do I Get Started With Penetration Testing on CyberJall?",
      answer: [
        "Explore our marketplace to find security experts.",
        "Select a package that fits your security needs.",
        "Define your testing scope and schedule an assessment.",
        "Receive a detailed report with remediation steps."
      ],
      icon: ArrowRight
    }
  ];

  return (
    <div className="bg-black min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-red-500 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Discover how CyberJall ensures your web application&apos;s security with our comprehensive penetration testing services.
          </p>
        </div>
        <div className="bg-gray-900 shadow-2xl shadow-red-900/30 rounded-xl overflow-hidden border border-gray-800">
          {faqData.map((faq, index) => (
            <FAQItem 
              key={index} 
              question={faq.question} 
              answer={faq.answer} 
              icon={faq.icon} 
            />
          ))}
        </div>
        <div className="text-center mt-12">
          <p className="text-gray-500">
            Have more questions? <Link href="/contact_us" className="text-red-500 hover:text-red-400 transition-colors">Contact our experts</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CyberJallFAQ;