"use client"

import { cn } from "@/lib/utils"
import React, { useEffect, useState } from "react"
import Image from "next/image"

interface Entity {
  id: number
  name: string
  logo: string
  type: "client" | "partner"
  industry: string
  since?: string
}

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: Entity[]
  direction?: "left" | "right"
  speed?: "fast" | "normal" | "slow"
  pauseOnHover?: boolean
  className?: string
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const scrollerRef = React.useRef<HTMLUListElement>(null)

  useEffect(() => {
    addAnimation()
  }, [items])

  const [start, setStart] = useState(false)

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children)

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true)
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem)
        }
      })

      getDirection()
      getSpeed()
      setStart(true)
    }
  }

  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty("--animation-direction", "forwards")
      } else {
        containerRef.current.style.setProperty("--animation-direction", "reverse")
      }
    }
  }

  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s")
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s")
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s")
      }
    }
  }

  return (
    <div className="relative w-full overflow-hidden">
      <div
        ref={containerRef}
        className={cn(
          "scroller relative z-20 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
          className,
        )}
      >
        <ul
          ref={scrollerRef}
          className={cn(
            "flex min-w-full shrink-0 gap-8 py-4 w-max flex-nowrap",
            start && "animate-scroll",
            pauseOnHover && "hover:[animation-play-state:paused]",
          )}
        >
          {items.map((entity, idx) => (
            <li
              key={`${entity.id}-${idx}`}
              className="w-80 max-w-full relative rounded-2xl border flex-shrink-0 px-8 py-6 md:w-[450px]"
              style={{
                background:
                  entity.type === "client"
                    ? "linear-gradient(180deg, rgba(6, 182, 212, 0.1), rgba(59, 130, 246, 0.1))"
                    : "linear-gradient(180deg, rgba(168, 85, 247, 0.1), rgba(236, 72, 153, 0.1))",
                borderColor: entity.type === "client" ? "rgba(6, 182, 212, 0.3)" : "rgba(168, 85, 247, 0.3)",
              }}
            >
              <div className="relative z-10 h-full flex flex-col justify-between">
                {/* Logo section */}
                <div className="flex justify-center mb-6">
                  <div
                    className={`relative w-32 h-32 rounded-2xl ${
                      entity.type === "client"
                        ? "bg-gradient-to-br from-cyan-900/40 to-blue-900/40 border-2 border-cyan-500/40"
                        : "bg-gradient-to-br from-purple-900/40 to-pink-900/40 border-2 border-purple-500/40"
                    } flex items-center justify-center backdrop-blur-sm hover:scale-110 transition-transform duration-300`}
                  >
                    <Image
                      src={entity.logo || "/placeholder.svg?height=96&width=96"}
                      alt={entity.name}
                      width={96}
                      height={96}
                      className="object-contain p-3 filter hover:brightness-110 transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Content section */}
                <div className="text-center space-y-4">
                  <h3 className="text-2xl font-bold mb-2 text-white hover:text-white transition-colors duration-300">
                    {entity.name}
                  </h3>

                  <div
                    className={`inline-block px-4 py-2 rounded-full text-sm font-bold ${
                      entity.type === "client"
                        ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                        : "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                    }`}
                  >
                    {entity.industry}
                  </div>

                  {/* Animated divider */}
                  <div className="relative py-4">
                    <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                  </div>

                  <div className="flex items-center justify-center space-x-2">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        entity.type === "client" ? "bg-cyan-400" : "bg-purple-400"
                      } animate-pulse`}
                    />
                    <span className="text-sm text-gray-400 font-medium">Partner since {entity.since}</span>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
