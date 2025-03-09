"use client";
import React, { useState } from 'react';
import { ChevronDown, Shield, Search, Clock, FileText, Globe } from 'lucide-react';
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
        "Strengthen customer trust through proactive security measures."
      ],
      icon: Search
    },
    {
      question: "How Often Should My Company Conduct Penetration Testing?",
      answer: [
        "At least once a year.",
        "When launching new web applications or making significant updates.",
        "After integrating third-party services handling sensitive data.",
        "Following a security incident or vulnerability suspicion."
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