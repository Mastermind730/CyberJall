"use client";
import { useEffect, useState } from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
// Define Partner interface
interface Partner {
  id: string;
  company_name: string;
  logo?: string;
  website: string;
}

export default function Partners() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/company");

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        setPartners(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching partners:", err);
        setError("Failed to load partners. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPartners();
  }, []);

  // Functions to generate placeholder logos for partners without logos
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  const getRandomColor = (id: string) => {
    const colors = [
      "from-red-600 to-red-800",
      "from-orange-500 to-red-600",
      "from-red-700 to-black",
      "from-orange-400 to-orange-600",
      "from-red-500 to-black",
      "from-black to-red-900",
    ];

    // Use the id's last character to select a color
    const colorIndex = parseInt(id.charAt(id.length - 1), 16) % colors.length;
    return colors[colorIndex];
  };

  return (
    <div className="min-h-screen bg-black">
      <Head>
        <title>Our Partners | Your Company Name</title>
        <meta
          name="description"
          content="Our trusted partners and collaborators"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="relative overflow-hidden">
        {/* Background Vector Elements */}
        <div className="absolute top-0 right-0 -mt-20 -mr-20 opacity-20">
          <svg width="404" height="404" fill="none" viewBox="0 0 404 404">
            <defs>
              <pattern
                id="pattern-circles"
                x="0"
                y="0"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <circle
                  cx="10"
                  cy="10"
                  r="2"
                  className="text-red-800"
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect width="404" height="404" fill="url(#pattern-circles)" />
          </svg>
        </div>

        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 opacity-20">
          <svg width="404" height="404" fill="none" viewBox="0 0 404 404">
            <defs>
              <pattern
                id="pattern-squares"
                x="0"
                y="0"
                width="30"
                height="30"
                patternUnits="userSpaceOnUse"
              >
                <rect
                  x="10"
                  y="10"
                  width="10"
                  height="10"
                  className="text-orange-500"
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect width="404" height="404" fill="url(#pattern-squares)" />
          </svg>
        </div>

        <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl mb-4">
              Our <span className="text-red-600">Partners</span>
            </h1>
            <p className="max-w-xl mx-auto text-xl text-gray-400">
              We&apos;re proud to collaborate with these amazing organizations
              to deliver excellence.
            </p>

            {/* Decorative line */}
            <div className="mt-8 flex justify-center">
              <div className="h-1 w-32 bg-gradient-to-r from-red-600 via-orange-500 to-red-700 rounded-full"></div>
            </div>
          </motion.div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-600"></div>
            </div>
          ) : error ? (
            <div className="text-center text-red-500 p-8 bg-red-900 bg-opacity-20 rounded-lg border border-red-800">
              <p>{error}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {partners.map((partner, index) => (
                <motion.div
                  key={partner.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{
                    y: -5,
                    boxShadow:
                      "0 10px 25px -5px rgba(239, 68, 68, 0.2), 0 10px 10px -5px rgba(239, 68, 68, 0.1)",
                    borderColor: "#ef4444",
                  }}
                  className="bg-gray-900 rounded-xl overflow-hidden shadow-lg border border-gray-800 hover:border-red-500 transition-all duration-300"
                >
                  <div className="p-6 h-full flex flex-col justify-between">
                    <div>
                      <div className="flex justify-center mb-4 h-32 items-center">
                        {partner.logo && partner.logo !== "" ? (
                          <Image
                            width={250}
                            height={250}
                            src={partner.logo}
                            alt={`${partner.company_name} logo`}
                            className="max-h-24 max-w-full object-contain"
                          />
                        ) : (
                          <div
                            className={`w-24 h-24 rounded-full bg-gradient-to-br ${getRandomColor(
                              partner.id
                            )} flex items-center justify-center text-white text-2xl font-bold shadow-lg`}
                          >
                            {getInitials(partner.company_name)}
                          </div>
                        )}
                      </div>
                      <h3 className="text-xl font-semibold text-white text-center mt-2">
                        {partner.company_name}
                      </h3>
                    </div>

                    <div className="mt-6 flex justify-center gap-3 z-40">
                      <Link
                        href={`/company/${partner.id}`}
                        className="inline-flex items-center px-4 z-50 py-2 text-sm font-medium text-white bg-gradient-to-r from-red-700 to-red-500 rounded-full hover:from-red-800 hover:to-red-600 transition-colors duration-300 shadow-lg"
                      >
                        View Company
                        <svg
                          className="ml-2 h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      </Link>
                      
                      <Link
                        href={partner.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-red-600 to-orange-500 rounded-full hover:from-red-700 hover:to-orange-600 transition-colors duration-300 shadow-lg"
                      >
                        Visit Website
                        <svg
                          className="ml-2 h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Floating animated elements */}
          <div className="absolute top-1/4 left-5 animate-pulse">
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgba(239, 68, 68, 0.3)"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
            </svg>
          </div>
          <div className="absolute bottom-1/4 right-5 animate-bounce">
            <svg
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgba(249, 115, 22, 0.3)"
              strokeWidth="2"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </div>
          <div className="absolute top-1/2 right-1/4 animate-spin-slow">
            <svg
              width="35"
              height="35"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgba(239, 68, 68, 0.2)"
              strokeWidth="2"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            </svg>
          </div>

          {/* Flame-like decorative element */}
          <div className="absolute bottom-0 w-full left-0 h-32 bg-gradient-to-t from-red-900 to-transparent opacity-10"></div>
        </main>
      </div>
    </div>
  );
}