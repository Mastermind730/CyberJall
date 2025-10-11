"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

interface ClientLogo {
  id: number;
  name: string;
  logo: string;
}

const ClientCarousel: React.FC = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isSlowed, setIsSlowed] = useState(false);

  const clientLogos: ClientLogo[] = [
    { id: 1, name: "Food Vez", logo: "/IMG-20250531-WA0000.jpg" },
    { id: 2, name: "EN Times", logo: "/client1.jpg" },
    { id: 3, name: "Business Legacy", logo: "/client2.jpg" },
    { id: 4, name: "Paripoorna Foods", logo: "/pariporna.png" },
    { id: 5, name: "CyberArt", logo: "/cyberart.png" },
    { id: 6, name: "Main Logo", logo: "/main_logo.png" },
    { id: 7, name: "Smart Choice", logo: "/smart_choice.png" },
  ];

  // Create duplicated array for infinite scroll effect
  const duplicatedLogos = [...clientLogos, ...clientLogos, ...clientLogos];

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    let animationId: number;
    let scrollSpeed = isSlowed ? 0.3 : 1;

    const animate = () => {
      if (!isPaused && carousel) {
        carousel.scrollLeft += scrollSpeed;

        // Reset scroll position for infinite effect
        if (carousel.scrollLeft >= carousel.scrollWidth / 3) {
          carousel.scrollLeft = 0;
        }
      }
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isPaused, isSlowed]);

  return (
    <section className="relative overflow-hidden py-16 md:py-24 bg-black">
      {/* Marketplace grid pattern background */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
          linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
        `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Background gradient effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[20%] left-[20%] w-64 h-64 bg-red-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[20%] right-[20%] w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
            Trusted Security Partners
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Join our marketplace of verified cybersecurity providers and trusted
            enterprise clients
          </p>
        </div>

        {/* Carousel wrapper */}
        <div className="relative overflow-hidden bg-white/[0.02] backdrop-blur-md py-8 md:py-12 lg:py-16 border border-gray-800/50">
          {/* Fade gradients */}
          <div className="absolute left-0 top-0 bottom-0 w-16 md:w-24 lg:w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-16 md:w-24 lg:w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>

          {/* Carousel container */}
          <div
            ref={carouselRef}
            className="flex overflow-hidden px-16 md:px-24 lg:px-32 gap-8 sm:gap-12 md:gap-16 lg:gap-20 smooth-scroll"
            onMouseEnter={() => setIsSlowed(true)}
            onMouseLeave={() => setIsSlowed(false)}
          >
            {duplicatedLogos.map((client, index) => (
              <div
                key={`${client.id}-${index}`}
                className="flex-shrink-0 flex items-center justify-center w-40 h-28 sm:w-44 sm:h-32 md:w-48 md:h-36 lg:w-52 lg:h-40 xl:w-56 xl:h-44 transition-all duration-300 ease-out hover:scale-110"
              >
                <Image
                  src={client.logo}
                  alt={client.name}
                  width={220}
                  height={176}
                  className="w-full h-full object-contain grayscale brightness-75 transition-all duration-300 ease-out hover:grayscale-0 hover:brightness-100 hover:scale-110"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientCarousel;
