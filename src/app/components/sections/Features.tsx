"use client";

import type React from "react";
import { useTheme } from "next-themes";
import Earth from "../ui/globe";
import ScrambleHover from "../ui/scramble";
import { FollowerPointerCard } from "../ui/following-pointer";
import { motion, useInView } from "framer-motion";
import { Suspense, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export default function Features() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const { theme } = useTheme();
  const [isHovering, setIsHovering] = useState(false);
  const [isCliHovering, setIsCliHovering] = useState(false);
  const [isFeature3Hovering, setIsFeature3Hovering] = useState(false);
  const [isFeature4Hovering, setIsFeature4Hovering] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const [baseColor, setBaseColor] = useState<[number, number, number]>([
    0.906, 0.541, 0.325,
  ]);
  const [glowColor, setGlowColor] = useState<[number, number, number]>([
    0.906, 0.541, 0.325,
  ]);
  const [dark, setDark] = useState<number>(1);

  useEffect(() => {
    setBaseColor([0.906, 0.541, 0.325]);
    setGlowColor([0.906, 0.541, 0.325]);
    setDark(theme === "dark" ? 1 : 0);
  }, [theme]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setInputValue("");
    }
  };

  return (
    <section
      id="features"
      className="text-white relative overflow-hidden py-12 sm:py-24 md:py-32"
    >
      <div className="bg-orange-500 absolute -top-10 left-1/2 h-16 w-44 -translate-x-1/2 rounded-full opacity-40 blur-3xl select-none"></div>
      <div className="via-orange-500/50 absolute top-0 left-1/2 h-px w-3/5 -translate-x-1/2 bg-gradient-to-r from-transparent to-transparent transition-all ease-in-out"></div>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.5, delay: 0 }}
        className="container mx-auto flex flex-col items-center gap-6 sm:gap-12"
      >
        <h2 className="mb-8 bg-gradient-to-b from-white to-gray-300 bg-clip-text text-center text-4xl font-semibold tracking-tighter text-transparent md:text-[54px] md:leading-[60px]">
          Platform Features
        </h2>
        <FollowerPointerCard
          title={
            <div className="flex items-center gap-2">
              <span>🔒</span>
              <span>Interactive Security Features</span>
            </div>
          }
        >
          <div className="cursor-none">
            <div className="grid grid-cols-12 gap-4 justify-center">
              {/* Unified Security Dashboard */}
              <motion.div
                className="group border-gray-700/40 text-white relative col-span-12 flex flex-col overflow-hidden rounded-xl border-2 p-6 shadow-xl transition-all ease-in-out md:col-span-6 xl:col-span-6 xl:col-start-2 bg-gray-900/50 backdrop-blur-sm"
                onMouseEnter={() => setIsCliHovering(true)}
                onMouseLeave={() => setIsCliHovering(false)}
                ref={ref}
                initial={{ opacity: 0, y: 50 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
                }
                transition={{ duration: 0.5, delay: 0.5 }}
                whileHover={{
                  scale: 1.02,
                  borderColor: "rgba(231, 138, 83, 0.6)",
                  boxShadow: "0 0 30px rgba(231, 138, 83, 0.2)",
                }}
                style={{ transition: "all 0s ease-in-out" }}
              >
                <div className="flex flex-col gap-4">
                  <h3 className="text-2xl leading-none font-semibold tracking-tight">
                    Unified Security Dashboard
                  </h3>
                  <div className="text-md text-gray-400 flex flex-col gap-2 text-sm">
                    <p className="max-w-[460px]">
                      Centralized platform connecting customers with verified
                      security providers for seamless collaboration.
                    </p>
                  </div>
                </div>
                <div className="pointer-events-none flex grow items-center justify-center select-none relative">
                  <div
                    className="relative w-full h-[400px] rounded-xl overflow-hidden"
                    style={{ borderRadius: "20px" }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900"></div>

                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                      initial={{ opacity: 0 }}
                      animate={isCliHovering ? { opacity: 1 } : { opacity: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <svg
                        width="100%"
                        height="100%"
                        viewBox="0 0 121 94"
                        className="absolute"
                      >
                        <motion.path
                          d="M 60.688 1.59 L 60.688 92.449 M 60.688 92.449 L 119.368 92.449 M 60.688 92.449 L 1.414 92.449"
                          stroke="rgb(231, 138, 83)"
                          fill="transparent"
                          strokeDasharray="2 2"
                          initial={{ pathLength: 0 }}
                          animate={
                            isCliHovering
                              ? { pathLength: 1 }
                              : { pathLength: 0 }
                          }
                          transition={{ duration: 2, ease: "easeInOut" }}
                        />
                      </svg>
                    </motion.div>

                    <motion.div
                      className="absolute top-1/2 left-1/2 w-16 h-16 bg-orange-500 rounded-full blur-[74px] opacity-65 transform -translate-x-1/2 -translate-y-1/2"
                      initial={{ scale: 1 }}
                      animate={
                        isCliHovering
                          ? { scale: [1, 1.342, 1, 1.342] }
                          : { scale: 1 }
                      }
                      transition={{
                        duration: 3,
                        ease: "easeInOut",
                        repeat: isCliHovering ? Number.POSITIVE_INFINITY : 0,
                        repeatType: "loop",
                      }}
                    />

                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex items-center gap-8">
                        <div className="flex flex-col gap-3">
                          {[
                            "Vulnerability Scan",
                            "Penetration Test",
                            "Compliance Audit",
                          ].map((item, index) => (
                            <motion.div
                              key={`left-${index}`}
                              className="bg-gray-800 rounded px-3 py-2 flex items-center gap-2 text-white text-sm font-medium shadow-sm border border-orange-500/20"
                              initial={{ opacity: 1, x: 0 }}
                              animate={
                                isCliHovering ? { x: [-20, 0] } : { x: 0 }
                              }
                              transition={{ duration: 0.5, delay: index * 0.1 }}
                              whileHover={{ scale: 1.05 }}
                            >
                              <div className="w-4 h-4 flex items-center justify-center">
                                {index === 0 && (
                                  <span className="text-xs">🔍</span>
                                )}
                                {index === 1 && (
                                  <span className="text-xs">🎯</span>
                                )}
                                {index === 2 && (
                                  <span className="text-xs">✅</span>
                                )}
                              </div>
                              {item}
                            </motion.div>
                          ))}
                        </div>

                        <motion.div
                          className="w-16 h-16 border-2 border-orange-500 rounded-lg overflow-hidden shadow-lg bg-gray-900 flex items-center justify-center"
                          initial={{ opacity: 1, scale: 1 }}
                          animate={
                            isCliHovering
                              ? { scale: [1, 1.1, 1] }
                              : { scale: 1 }
                          }
                          transition={{ duration: 0.6, ease: "easeOut" }}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                        >
                          <span className="text-3xl">🛡️</span>
                        </motion.div>

                        <div className="flex flex-col gap-3">
                          {[
                            "Threat Detection",
                            "Incident Response",
                            "Security Training",
                          ].map((item, index) => (
                            <motion.div
                              key={`right-${index}`}
                              className="bg-gray-800 rounded px-3 py-2 flex items-center gap-2 text-white text-sm font-medium shadow-sm border border-orange-500/20"
                              initial={{ opacity: 1, x: 0 }}
                              animate={
                                isCliHovering ? { x: [20, 0] } : { x: 0 }
                              }
                              transition={{ duration: 0.5, delay: index * 0.1 }}
                              whileHover={{ scale: 1.05 }}
                            >
                              <div className="w-4 h-4 flex items-center justify-center">
                                {index === 0 && (
                                  <span className="text-xs">⚠️</span>
                                )}
                                {index === 1 && (
                                  <span className="text-xs">🚨</span>
                                )}
                                {index === 2 && (
                                  <span className="text-xs">📚</span>
                                )}
                              </div>
                              {item}
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Global Security Coverage */}
              <motion.div
                className="group border-gray-700/40 text-white relative col-span-12 flex flex-col overflow-hidden rounded-xl border-2 p-6 shadow-xl transition-all ease-in-out md:col-span-6 xl:col-span-6 xl:col-start-8 bg-gray-900/50 backdrop-blur-sm"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                ref={ref}
                initial={{ opacity: 0, y: 50 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
                }
                transition={{ duration: 0.5, delay: 0.5 }}
                whileHover={{
                  scale: 1.02,
                  borderColor: "rgba(231, 138, 83, 0.6)",
                  boxShadow: "0 0 30px rgba(231, 138, 83, 0.2)",
                }}
                style={{ transition: "all 0s ease-in-out" }}
              >
                <div className="flex flex-col gap-4">
                  <h3 className="text-2xl leading-none font-semibold tracking-tight">
                    Global Security Coverage
                  </h3>
                  <div className="text-md text-gray-400 flex flex-col gap-2 text-sm">
                    <p className="max-w-[460px]">
                      Access certified security providers worldwide. Our network
                      spans across continents to protect your digital assets.
                    </p>
                  </div>
                </div>
                <div className="flex min-h-[300px] grow items-start justify-center select-none">
                  <h1 className="mt-8 text-center text-5xl leading-[100%] font-semibold sm:leading-normal lg:mt-12 lg:text-6xl">
                    <span className="bg-black relative mt-3 inline-block w-fit rounded-md border border-orange-500/30 px-1.5 py-0.5">
                      <ScrambleHover
                        text="CyberJall"
                        scrambleSpeed={70}
                        maxIterations={20}
                        useOriginalCharsOnly={false}
                        className="cursor-pointer bg-gradient-to-t from-[#e78a53] to-[#ff9d6b] bg-clip-text text-transparent"
                        isHovering={isHovering}
                        setIsHovering={setIsHovering}
                        characters="abcdefghijklmnopqrstuvwxyz!@#$%^&*()_+-=[]{}|;':\,./<>?"
                      />
                    </span>
                  </h1>
                  <div className="absolute top-64 z-10 flex items-center justify-center">
                    <div className="w-[400px] h-[400px]">
                      <Suspense
                        fallback={
                          <div className="bg-gray-800/20 h-[400px] w-[400px] animate-pulse rounded-full"></div>
                        }
                      >
                        <Earth
                          baseColor={baseColor}
                          markerColor={[0, 0, 0]}
                          glowColor={glowColor}
                          dark={dark}
                        />
                      </Suspense>
                    </div>
                  </div>
                  <div className="absolute top-1/2 w-full translate-y-20 scale-x-[1.2] opacity-70 transition-all duration-1000 group-hover:translate-y-8 group-hover:opacity-100">
                    <div className="from-orange-500/50 to-orange-500/0 absolute left-1/2 h-[256px] w-[60%] -translate-x-1/2 scale-[2.5] rounded-[50%] bg-radial from-10% to-60% opacity-20 sm:h-[512px]"></div>
                    <div className="from-orange-500/30 to-orange-500/0 absolute left-1/2 h-[128px] w-[40%] -translate-x-1/2 scale-200 rounded-[50%] bg-radial from-10% to-60% opacity-20 sm:h-[256px]"></div>
                  </div>
                </div>
              </motion.div>

              {/* AI-Powered Matching */}
              <motion.div
                className="group border-gray-700/40 text-white relative col-span-12 flex flex-col overflow-hidden rounded-xl border-2 p-6 shadow-xl transition-all ease-in-out md:col-span-6 xl:col-span-6 xl:col-start-2 bg-gray-900/50 backdrop-blur-sm"
                onMouseEnter={() => setIsFeature3Hovering(true)}
                onMouseLeave={() => setIsFeature3Hovering(false)}
                initial={{ opacity: 0, y: 50 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
                }
                transition={{ duration: 0.5, delay: 1.0 }}
                whileHover={{
                  scale: 1.02,
                  borderColor: "rgba(231, 138, 83, 0.5)",
                  boxShadow: "0 0 30px rgba(231, 138, 83, 0.2)",
                }}
                style={{ transition: "all 0s ease-in-out" }}
              >
                <div className="flex flex-col gap-4">
                  <h3 className="text-2xl leading-none font-semibold tracking-tight">
                    AI-Powered Matching
                  </h3>
                  <div className="text-md text-gray-400 flex flex-col gap-2 text-sm">
                    <p className="max-w-[460px]">
                      Intelligent algorithms match your security needs with the
                      most qualified providers in our network.
                    </p>
                  </div>
                </div>
                <div className="flex grow items-center justify-center select-none relative min-h-[300px] p-4">
                  <div className="w-full max-w-lg">
                    <div className="relative rounded-2xl border border-orange-500/20 bg-gray-900/60 backdrop-blur-sm">
                      <div className="p-4">
                        <textarea
                          className="w-full min-h-[100px] bg-transparent border-none text-white placeholder:text-gray-500 resize-none focus:outline-none text-base leading-relaxed"
                          placeholder="Describe your security requirements..."
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          onKeyDown={handleKeyDown}
                        />
                      </div>
                      <div className="flex items-center justify-between px-4 pb-4">
                        <div className="flex items-center gap-3">
                          <button className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors border border-orange-500/20">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-gray-400"
                            >
                              <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
                            </svg>
                          </button>
                          <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#e78a53] hover:bg-[#e78a53]/90 transition-colors text-white font-medium">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <circle cx="11" cy="11" r="8"></circle>
                              <path d="m21 21-4.3-4.3"></path>
                            </svg>
                            Find Providers
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Real-time Collaboration */}
              <motion.div
                className="group border-gray-700/40 text-white relative col-span-12 flex flex-col overflow-hidden rounded-xl border-2 p-6 shadow-xl transition-all ease-in-out md:col-span-6 xl:col-span-6 xl:col-start-8 bg-gray-900/50 backdrop-blur-sm"
                onMouseEnter={() => setIsFeature4Hovering(true)}
                onMouseLeave={() => setIsFeature4Hovering(false)}
                initial={{ opacity: 0, y: 50 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
                }
                transition={{ duration: 0.5, delay: 1.0 }}
                whileHover={{
                  rotateY: 5,
                  rotateX: 2,
                  boxShadow: "0 20px 40px rgba(231, 138, 83, 0.3)",
                  borderColor: "rgba(231, 138, 83, 0.6)",
                }}
                style={{ transition: "all 0s ease-in-out" }}
              >
                <div className="flex flex-col gap-4">
                  <h3 className="text-2xl leading-none font-semibold tracking-tight">
                    Real-time Collaboration
                  </h3>
                  <div className="text-md text-gray-400 flex flex-col gap-2 text-sm">
                    <p className="max-w-[460px]">
                      Seamless communication and project management between
                      customers and security providers.
                    </p>
                  </div>
                </div>
                <div className="flex grow items-center justify-center select-none relative min-h-[300px] p-4">
                  <div className="relative w-full max-w-sm">
                    <div className="w-full h-64 bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-lg shadow-lg border border-orange-500/20 flex items-center justify-center">
                      <div className="text-center space-y-4">
                        <div className="text-6xl">💬</div>
                        <p className="text-gray-400 text-sm">
                          Secure messaging & file sharing
                        </p>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg pointer-events-none"></div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </FollowerPointerCard>
      </motion.div>
    </section>
  );
}
