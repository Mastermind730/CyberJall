"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FollowerPointerCard } from "./following-pointer";
import { cn } from "@/lib/utils";

interface InteractiveSectionProps {
  children: React.ReactNode;
  className?: string;
  title?: string | React.ReactNode;
  enablePointer?: boolean;
  delay?: number;
}

export const InteractiveSection: React.FC<InteractiveSectionProps> = ({
  children,
  className,
  title,
  enablePointer = true,
  delay = 0,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const content = (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay }}
      className={cn("relative", className)}
    >
      {children}
    </motion.div>
  );

  if (enablePointer) {
    return (
      <FollowerPointerCard
        title={
          title || (
            <div className="flex items-center gap-2">
              <span>🔒</span>
              <span>CyberJall</span>
            </div>
          )
        }
      >
        {content}
      </FollowerPointerCard>
    );
  }

  return content;
};
