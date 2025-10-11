import React from "react";
import Link from "next/link";
import { GlowCard } from "./ui/spotlight-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../components/ui/carousel";

const serviceCategories = [
  {
    title: "VAPT",
    description:
      "Identify and fix weaknesses in applications, networks, and systems before attackers exploit them.",
    icon: "",
  },
  {
    title: "Cloud Security Services",
    description:
      "Protect cloud workloads, data, and infrastructure with posture management, DLP, and DevSecOps.",
    icon: "",
  },
  {
    title: "Compliance Readiness",
    description:
      "Achieve regulatory compliance with expert guidance, audits, and gap assessments.",
    icon: "",
  },
  {
    title: "Network Security",
    description:
      "Secure enterprise networks with firewalls, intrusion detection, and traffic monitoring.",
    icon: "",
  },
  {
    title: "IoT & OT Security",
    description:
      "Protect IoT devices and industrial systems (SCADA/ICS) from cyberattacks and downtime.",
    icon: "",
  },
  {
    title: "Advanced Threat Defense",
    description:
      "Detect, investigate, and respond to sophisticated cyber threats with AI-powered tools.",
    icon: "",
  },
  {
    title: "Endpoint Security",
    description:
      "Protect laptops, mobiles, and remote devices with next-gen antivirus and EDR solutions.",
    icon: "",
  },
  {
    title: "Identity & Access Management",
    description:
      "Ensure only the right people access the right resources at the right time.",
    icon: "",
  },
  {
    title: "Cybersecurity Awareness & Training",
    description:
      "Empower employees with knowledge to detect phishing, social engineering, and insider risks.",
    icon: "",
  },
  {
    title: "Incident Response & Recovery",
    description:
      "Minimize damage with rapid containment, forensic analysis, and remediation.",
    icon: "",
  },
  {
    title: "DevSecOps",
    description:
      "Integrate security into CI/CD pipelines to ship secure code faster.",
    icon: "",
  },
  {
    title: "Managed Security Services (MSSP)",
    description:
      "24/7 monitoring, SOC services, and managed detection for complete protection.",
    icon: "",
  },
  {
    title: "Cyber Health Score (AI-powered)",
    description:
      "Get a real-time snapshot of your security posture with actionable improvement insights.",
    icon: "",
  },
];

const industrySolutions = [
  {
    title: "Finance & Banking",
    description:
      "Secure digital transactions, prevent fraud, and meet regulatory compliance.",
    icon: "",
  },
  {
    title: "Healthcare",
    description:
      "Protect patient data and ensure HIPAA/GDPR compliance against ransomware threats.",
    icon: "",
  },
  {
    title: "E-commerce & Retail",
    description:
      "Safeguard online payments and customer information from data breaches.",
    icon: "",
  },
  {
    title: "IT & Software/Tech",
    description:
      "Secure applications, APIs, and cloud environments against evolving threats.",
    icon: "",
  },
  {
    title: "Manufacturing",
    description:
      "Protect IoT, OT, and supply chains from industrial cyberattacks.",
    icon: "",
  },
  {
    title: "Education & EdTech",
    description:
      "Secure student data, online learning platforms, and digital resources.",
    icon: "",
  },
  {
    title: "Government & Public Sector",
    description:
      "Protect citizen data and critical infrastructure with zero-trust security.",
    icon: "",
  },
  {
    title: "Energy & Utilities",
    description:
      "Defend power grids, oil & gas systems, and SCADA networks from cyber sabotage.",
    icon: "",
  },
  {
    title: "Telecom",
    description:
      "Protect networks, 5G infrastructure, and customer data from intrusions.",
    icon: "",
  },
  {
    title: "Legal & Consulting",
    description:
      "Safeguard client data and maintain confidentiality with compliance-driven security.",
    icon: "",
  },
  {
    title: "Real Estate & PropTech",
    description:
      "Secure property management platforms and customer transactions.",
    icon: "",
  },
  {
    title: "Logistics & Transportation",
    description:
      "Defend supply chain data and smart transport systems from cyber disruption.",
    icon: "",
  },
  {
    title: "Media & Entertainment",
    description:
      "Protect digital content, streaming platforms, and customer privacy.",
    icon: "",
  },
  {
    title: "Insurance",
    description:
      "Secure customer data, detect fraud, and meet strict compliance standards.",
    icon: "",
  },
  {
    title: "Hospitality & Travel",
    description:
      "Safeguard guest data, booking systems, and loyalty platforms.",
    icon: "",
  },
];

const ServiceCard = ({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: string;
}) => (
  <Link href="/services" className="block">
    <GlowCard
      glowColor="red"
      className="bg-black/80 border border-gray-800 hover:border-red-500/50 transition-all duration-300 h-full"
      customSize={true}
      height={280}
    >
      <div className="flex flex-col h-full">
        <div className="text-4xl mb-4">{icon}</div>
        <h3 className="text-lg font-bold text-white mb-3 leading-tight">
          {title}
        </h3>
        <p className="text-gray-300 text-sm leading-relaxed flex-grow">
          {description}
        </p>
        <div className="mt-4 pt-3 border-t border-gray-700">
          <span className="text-red-400 text-sm font-medium hover:text-red-300 transition-colors">
            Learn More →
          </span>
        </div>
      </div>
    </GlowCard>
  </Link>
);

const ServicesDisplay = () => {
  return (
    <section className="w-full px-4 py-16 md:py-24 bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Service Categories Section */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
            Explore Popular Service Categories
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-3xl mx-auto">
            Discover comprehensive cybersecurity solutions tailored to protect
            your business from evolving threats
          </p>

          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {serviceCategories.map((service, index) => (
                <CarouselItem
                  key={index}
                  className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                >
                  <ServiceCard
                    title={service.title}
                    description={service.description}
                    icon={service.icon}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-12 bg-gray-900 border-gray-700 hover:bg-gray-800" />
            <CarouselNext className="hidden md:flex -right-12 bg-gray-900 border-gray-700 hover:bg-gray-800" />
          </Carousel>
        </div>

        {/* Industry Solutions Section */}
        <div>
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
            Solutions by Industry &amp; Business Needs
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-3xl mx-auto">
            Industry-specific security solutions designed to meet your unique
            compliance and operational requirements
          </p>

          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {industrySolutions.map((industry, index) => (
                <CarouselItem
                  key={index}
                  className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                >
                  <ServiceCard
                    title={industry.title}
                    description={industry.description}
                    icon={industry.icon}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-12 bg-gray-900 border-gray-700 hover:bg-gray-800" />
            <CarouselNext className="hidden md:flex -right-12 bg-gray-900 border-gray-700 hover:bg-gray-800" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default ServicesDisplay;
