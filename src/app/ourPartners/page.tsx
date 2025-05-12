"use client";
import { useEffect, useState } from "react";
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
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

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
      "from-red-600 via-red-700 to-red-800",
      "from-orange-400 via-orange-500 to-red-600",
      "from-red-700 via-red-800 to-black",
      "from-orange-400 via-orange-500 to-orange-600",
      "from-red-500 via-red-700 to-black",
      "from-black via-red-800 to-red-900",
    ];

    // Use the id's last character to select a color
    const colorIndex = parseInt(id.charAt(id.length - 1), 16) % colors.length;
    return colors[colorIndex];
  };

  return (
    <div className="min-h-screen bg-black relative">
    

      {/* Background Gradient Mesh */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-0 w-full h-1/3 bg-gradient-to-b from-red-900/20 to-transparent"></div>
        <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-red-900/20 to-transparent"></div>
        <div className="absolute left-0 h-full w-1/3 bg-gradient-to-r from-orange-800/10 to-transparent"></div>
        <div className="absolute right-0 h-full w-1/3 bg-gradient-to-l from-red-900/10 to-transparent"></div>
      </div>

      {/* Animated background elements */}
      <div className="fixed inset-0 z-0 overflow-hidden opacity-40">
        {/* Dynamic grid pattern */}
        <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 5% 15%, #7f1d1d33 1%, transparent 8%), radial-gradient(circle at 85% 45%, #9a3412aa 0.5%, transparent 5%), radial-gradient(circle at 35% 75%, #7f1d1d33 1%, transparent 8%), radial-gradient(circle at 65% 85%, #9a341222 0.5%, transparent 5%)" }}></div>
        
        {/* Floating particles */}
        <div className="absolute top-0 left-0 w-full h-full">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className={`absolute rounded-full bg-gradient-to-br ${
                i % 2 === 0 ? "from-red-600/30 to-red-800/10" : "from-orange-500/20 to-orange-700/10"
              }`}
              style={{
                width: `${Math.floor(Math.random() * 10) + 3}px`,
                height: `${Math.floor(Math.random() * 10) + 3}px`,
                left: `${Math.floor(Math.random() * 100)}%`,
                top: `${Math.floor(Math.random() * 100)}%`,
              }}
              animate={{
                y: [0, Math.random() * 50 - 25],
                x: [0, Math.random() * 50 - 25],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: Math.floor(Math.random() * 15) + 15,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <motion.h1 
            className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-orange-500">Partners</span>
          </motion.h1>
          
          <motion.p 
            className="max-w-2xl mx-auto text-xl text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            We&apos;re proud to collaborate with these amazing organizations
            to deliver excellence in everything we do.
          </motion.p>

          {/* Decorative line with enhanced animation */}
          <motion.div 
            className="mt-8 flex justify-center"
            initial={{ width: 0 }}
            animate={{ width: "auto" }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.div 
              className="h-1 w-48 bg-gradient-to-r from-red-700 via-orange-500 to-red-600 rounded-full"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ 
                duration: 5, 
                repeat: Infinity,
                ease: "linear" 
              }}
              style={{
                backgroundSize: "200% 200%",
              }}
            />
          </motion.div>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <motion.div 
              className="relative w-20 h-20"
              animate={{ rotate: 360 }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "linear" 
              }}
            >
              <div className="absolute inset-0 rounded-full border-4 border-t-red-600 border-r-orange-500 border-b-red-700 border-l-orange-600"></div>
              <div className="absolute inset-2 rounded-full border-4 border-t-orange-500 border-r-red-700 border-b-orange-600 border-l-red-600"></div>
            </motion.div>
          </div>
        ) : error ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center text-red-500 p-8 bg-gradient-to-br from-red-900/30 to-black rounded-xl border border-red-800/50 shadow-lg shadow-red-900/20"
          >
            <p>{error}</p>
          </motion.div>
        ) : (
          <motion.div 
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            {partners.map((partner) => (
            <motion.div
  key={partner.id}
  variants={{
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 }
  }}
  transition={{ duration: 0.6, ease: "easeOut" }}
  onHoverStart={() => setHoveredCard(partner.id)}
  onHoverEnd={() => setHoveredCard(null)}
  className="relative group"
>
  {/* Ambient glow effect */}
  <div 
    className="absolute -inset-0.5 bg-gradient-to-r from-red-500/60 via-orange-400/60 to-amber-500/60 rounded-2xl opacity-0 group-hover:opacity-80 transition-all duration-500 ease-out"
    style={{
      filter: "blur(18px)",
      transform: "translateZ(0)",
    }}
  />
  
  <motion.div
    whileHover={{ y: -12, scale: 1.02 }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
    className="relative h-full bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 rounded-xl overflow-hidden border border-gray-800/50 group-hover:border-red-500/70 transition-all duration-300 shadow-lg group-hover:shadow-2xl group-hover:shadow-red-500/20"
  >
    {/* Subtle texture overlay */}
    <div className="absolute inset-0 opacity-10 bg-[url('/noise-texture.png')] mix-blend-overlay pointer-events-none" />
    
    {/* Top accent line */}
    <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out" />
    
    {/* Card content container */}
    <div className="p-8 h-full flex flex-col justify-between relative z-10">
      <div>
        {/* Company logo area with enhanced presentation */}
        <div className="flex justify-center mb-6 h-36 items-center relative">
          {partner.logo && partner.logo !== "" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <Image
                width={250}
                height={250}
                src={partner.logo}
                alt={`${partner.company_name} logo`}
                className="max-h-28 max-w-full object-contain filter drop-shadow-lg"
              />
              
              {/* Enhanced logo glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/30 to-amber-500/20 filter blur-2xl opacity-0 group-hover:opacity-80 transition-opacity duration-700 -z-10 scale-110" />
            </motion.div>
          ) : (
            <motion.div
              whileHover={{ rotate: [0, -3, 3, -3, 0] }}
              transition={{ duration: 0.5 }}
              className="w-28 h-28 rounded-full bg-gradient-to-br from-red-600 via-red-500 to-orange-500 flex items-center justify-center text-white text-3xl font-bold shadow-xl relative z-10 border border-red-400/20"
            >
              {getInitials(partner.company_name)}
              
              {/* Multiple animated rings */}
              <motion.div
                className="absolute inset-0 rounded-full border border-red-400/40"
                animate={{
                  scale: [1, 1.15, 1],
                  opacity: [0.7, 0.2, 0.7],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute inset-0 rounded-full border border-orange-400/30"
                animate={{
                  scale: [1, 1.25, 1],
                  opacity: [0.5, 0.1, 0.5],
                }}
                transition={{
                  duration: 3,
                  delay: 0.3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          )}
        </div>
        
        {/* Company name with sophisticated underline animation */}
        <motion.h3 className="text-2xl font-bold text-center mt-2 mb-1">
          <span className="bg-gradient-to-r from-white via-gray-100 to-gray-200 bg-clip-text text-transparent group-hover:from-red-200 group-hover:via-white group-hover:to-amber-100 transition-all duration-500">
            {partner.company_name}
          </span>
          <div className="relative h-0.5 w-16 mx-auto mt-2 overflow-hidden">
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-red-500/0 via-red-500 to-red-500/0"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: hoveredCard === partner.id ? 1 : 0 }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </motion.h3>
      </div>

      {/* Action buttons with enhanced styling */}
      <div className="mt-8 flex justify-center gap-4">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative group/btn"
        >
          <Link
            href={`/company/${partner.id}`}
            className="inline-flex items-center px-5 py-3 text-sm font-medium text-white bg-gradient-to-br from-red-700 to-red-600 rounded-lg transition-all duration-300 shadow-md group-hover/btn:shadow-lg group-hover/btn:shadow-red-500/25 relative overflow-hidden"
          >
            {/* Button spotlight effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 ease-out" />
            
            <span className="relative z-20 flex items-center">
              View Details
              <svg
                className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-300"
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
            </span>
          </Link>
        </motion.div>
        
        <motion.div 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative group/btn"
        >
          <Link
            href={partner.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-5 py-3 text-sm font-medium text-white bg-gradient-to-br from-orange-600 to-red-600 rounded-lg transition-all duration-300 shadow-md group-hover/btn:shadow-lg group-hover/btn:shadow-orange-500/25 relative overflow-hidden"
          >
            {/* Button spotlight effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 ease-out" />
            
            <span className="relative z-20 flex items-center">
              Visit Website
              <svg
                className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-300"
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
            </span>
          </Link>
        </motion.div>
      </div>
    </div>
  </motion.div>
</motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Decorative elements that don't interfere with buttons */}
      <div className="fixed top-0 right-0 w-1/3 h-1/3 pointer-events-none">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-10">
          <defs>
            <linearGradient id="redGradient" gradientTransform="rotate(45)">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#991b1b" />
            </linearGradient>
          </defs>
          <motion.path
            fill="url(#redGradient)"
            d="M41.9,-73.3C56.1,-66.4,70.3,-58.4,78.9,-46.1C87.4,-33.8,90.3,-16.9,88.2,-1.2C86.1,14.5,79,29,70.6,42.8C62.2,56.5,52.5,69.5,39.6,76.2C26.8,82.8,10.9,83.2,-3.5,79.5C-17.8,75.7,-30.6,67.9,-42.6,59.5C-54.6,51,-65.8,41.9,-73.1,29.9C-80.3,18,-83.5,3.1,-80.8,-10.6C-78,-24.4,-69.3,-37,-58.9,-45.2C-48.5,-53.5,-36.5,-57.4,-25.1,-65.7C-13.6,-74,-6.8,-86.7,3.4,-92.5C13.6,-98.3,27.7,-80.1,41.9,-73.3Z"
            animate={{
              d: [
                "M41.9,-73.3C56.1,-66.4,70.3,-58.4,78.9,-46.1C87.4,-33.8,90.3,-16.9,88.2,-1.2C86.1,14.5,79,29,70.6,42.8C62.2,56.5,52.5,69.5,39.6,76.2C26.8,82.8,10.9,83.2,-3.5,79.5C-17.8,75.7,-30.6,67.9,-42.6,59.5C-54.6,51,-65.8,41.9,-73.1,29.9C-80.3,18,-83.5,3.1,-80.8,-10.6C-78,-24.4,-69.3,-37,-58.9,-45.2C-48.5,-53.5,-36.5,-57.4,-25.1,-65.7C-13.6,-74,-6.8,-86.7,3.4,-92.5C13.6,-98.3,27.7,-80.1,41.9,-73.3Z",
                "M34.5,-59.9C45.5,-54.9,55.9,-47.5,62.7,-37.2C69.5,-26.9,72.7,-13.5,73.6,0.5C74.5,14.5,73.1,29.1,65.9,39.2C58.7,49.3,45.8,55,33.2,60.5C20.5,66.1,8.1,71.5,-3.8,69.9C-15.8,68.3,-27.3,59.8,-37.8,50.6C-48.3,41.4,-57.8,31.4,-61.7,19.6C-65.7,7.8,-64.1,-5.9,-60,-17.7C-55.9,-29.6,-49.3,-39.6,-40.1,-45.5C-30.9,-51.3,-19.1,-53,-7.2,-61.1C4.7,-69.2,18.5,-83.7,29.2,-80.9C39.9,-78.1,47.6,-58.2,34.5,-59.9Z",
                "M31.8,-54.9C42.2,-52.2,52.2,-45.6,58.6,-36.2C65,-26.8,67.8,-14.4,68.6,-1.5C69.3,11.5,67.9,22.9,61.6,31.6C55.2,40.2,43.9,46,32.9,54C21.9,62.1,11,72.3,-0.7,73.3C-12.3,74.4,-24.6,66.2,-35.8,57.7C-47,49.1,-57.2,40.1,-62.7,28.9C-68.1,17.6,-68.9,4,-66.7,-9C-64.5,-22,-59.4,-34.4,-50.7,-41.7C-42,-49.1,-29.8,-51.3,-18.9,-53.1C-8,-55,-4,-56.5,3.2,-62C10.5,-67.5,21,-70.9,31.8,-54.9Z",
                "M41.9,-73.3C56.1,-66.4,70.3,-58.4,78.9,-46.1C87.4,-33.8,90.3,-16.9,88.2,-1.2C86.1,14.5,79,29,70.6,42.8C62.2,56.5,52.5,69.5,39.6,76.2C26.8,82.8,10.9,83.2,-3.5,79.5C-17.8,75.7,-30.6,67.9,-42.6,59.5C-54.6,51,-65.8,41.9,-73.1,29.9C-80.3,18,-83.5,3.1,-80.8,-10.6C-78,-24.4,-69.3,-37,-58.9,-45.2C-48.5,-53.5,-36.5,-57.4,-25.1,-65.7C-13.6,-74,-6.8,-86.7,3.4,-92.5C13.6,-98.3,27.7,-80.1,41.9,-73.3Z"
              ],
            }}
            transition={{
              repeat: Infinity,
              repeatType: "mirror",
              duration: 20,
              ease: "easeInOut",
            }}
            className="blur-md"
          />
        </svg>
      </div>

      <div className="fixed bottom-0 left-0 w-1/3 h-1/3 pointer-events-none">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-10">
          <defs>
            <linearGradient id="orangeGradient" gradientTransform="rotate(45)">
              <stop offset="0%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#ea580c" />
            </linearGradient>
          </defs>
          <motion.path
            fill="url(#orangeGradient)"
            d="M49.6,-83.5C63.1,-75.4,72.3,-60.1,79.7,-44.4C87.1,-28.7,92.8,-12.5,89.5,1.9C86.2,16.3,74,28.9,62.8,40.9C51.6,53,41.4,64.5,28.8,71.2C16.1,77.9,0.9,79.7,-15.3,78.4C-31.5,77.1,-48.7,72.5,-60.1,61.9C-71.5,51.3,-77.2,34.6,-81.3,17.3C-85.4,-0.1,-88,-18.1,-82.5,-32.9C-76.9,-47.7,-63.3,-59.3,-48.3,-66.7C-33.3,-74,-16.7,-77.1,0.7,-78.2C18,-79.3,36.1,-91.7,49.6,-83.5Z"
            animate={{
              d: [
                "M49.6,-83.5C63.1,-75.4,72.3,-60.1,79.7,-44.4C87.1,-28.7,92.8,-12.5,89.5,1.9C86.2,16.3,74,28.9,62.8,40.9C51.6,53,41.4,64.5,28.8,71.2C16.1,77.9,0.9,79.7,-15.3,78.4C-31.5,77.1,-48.7,72.5,-60.1,61.9C-71.5,51.3,-77.2,34.6,-81.3,17.3C-85.4,-0.1,-88,-18.1,-82.5,-32.9C-76.9,-47.7,-63.3,-59.3,-48.3,-66.7C-33.3,-74,-16.7,-77.1,0.7,-78.2C18,-79.3,36.1,-91.7,49.6,-83.5Z",
                "M38.5,-65.8C49.8,-59.9,58.5,-48.5,65.4,-35.9C72.3,-23.3,77.5,-9.5,77.2,4.2C76.9,17.9,71.1,31.4,62.7,43.2C54.3,55,43.3,65,30.4,71.1C17.6,77.3,2.8,79.5,-12.3,77.7C-27.5,75.9,-42.9,70.1,-53.9,59.9C-64.8,49.7,-71.2,35.2,-74.5,20C-77.8,4.8,-78,-11,-73.1,-25.1C-68.3,-39.2,-58.4,-51.5,-46,-57.9C-33.6,-64.3,-18.5,-64.8,-3.4,-60.2C11.7,-55.6,27.2,-71.8,38.5,-65.8Z",
                "M49.6,-83.5C63.1,-75.4,72.3,-60.1,79.7,-44.4C87.1,-28.7,92.8,-12.5,89.5,1.9C86.2,16.3,74,28.9,62.8,40.9C51.6,53,41.4,64.5,28.8,71.2C16.1,77.9,0.9,79.7,-15.3,78.4C-31.5,77.1,-48.7,72.5,-60.1,61.9C-71.5,51.3,-77.2,34.6,-81.3,17.3C-85.4,-0.1,-88,-18.1,-82.5,-32.9C-76.9,-47.7,-63.3,-59.3,-48.3,-66.7C-33.3,-74,-16.7,-77.1,0.7,-78.2C18,-79.3,36.1,-91.7,49.6,-83.5Z"
              ],
            }}
            transition={{
              repeat: Infinity,
              repeatType: "mirror",
              duration: 25,
              ease: "easeInOut",
            }}
            className="blur-md"
          />
        </svg>
      </div>
    </div>
  );
}