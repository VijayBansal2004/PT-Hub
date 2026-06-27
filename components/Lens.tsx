"use client";

import React, { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";

interface LensProps {
  children: React.ReactNode;
  zoomFactor?: number;
  lensSize?: number;
}

export default function Lens({
  children,
  zoomFactor = 1.8,
  lensSize = 180
}: LensProps) {
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Motion values tracking the raw pointer relative to the container
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  // Spring configuration for smooth drag/follow look & feel
  const springConfig = { stiffness: 300, damping: 22, mass: 0.5 };

  // Smooth out coordinate tracking
  const smoothX = useSpring(pointerX, springConfig);
  const smoothY = useSpring(pointerY, springConfig);

  // Position of the magnifying lens overlay relative to container
  const lensX = useTransform(smoothX, (val) => val - lensSize / 2);
  const lensY = useTransform(smoothY, (val) => val - lensSize / 2);

  // Inverse alignment for the zoomed inner content
  const zoomedX = useTransform(smoothX, (val) => -val * zoomFactor + lensSize / 2);
  const zoomedY = useTransform(smoothY, (val) => -val * zoomFactor + lensSize / 2);

  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const relativeX = e.clientX - rect.left;
    const relativeY = e.clientY - rect.top;
    
    pointerX.set(relativeX);
    pointerY.set(relativeY);
    
    if (containerSize.width !== rect.width || containerSize.height !== rect.height) {
      setContainerSize({ width: rect.width, height: rect.height });
    }
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden cursor-crosshair rounded-2xl w-full h-full"
    >
      {/* Main non-zoomed content */}
      <div className="w-full h-full select-none pointer-events-none">
        {children}
      </div>

      {/* Magnified lens view */}
      <AnimatePresence>
        {isHovering && containerSize.width > 0 && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.15 }}
            style={{
              position: "absolute",
              width: lensSize,
              height: lensSize,
              borderRadius: "50%",
              border: "3px solid #6366f1", // Sleek indigo borders
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.4), inset 0 0 15px rgba(255, 255, 255, 0.15)",
              backgroundColor: "#1c1917",
              overflow: "hidden",
              pointerEvents: "none",
              x: lensX,
              y: lensY,
              top: 0,
              left: 0,
              zIndex: 30,
            }}
          >
            {/* Magnified Duplicate image box */}
            <motion.div
              style={{
                position: "absolute",
                width: containerSize.width * zoomFactor,
                height: containerSize.height * zoomFactor,
                x: zoomedX,
                y: zoomedY,
                left: 0,
                top: 0,
                pointerEvents: "none",
              }}
            >
              {children}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
