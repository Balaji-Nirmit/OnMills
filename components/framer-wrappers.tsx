"use client";

import { motion } from 'framer-motion';

export const MotionDiv = motion.div;
export const MotionH1 = motion.h1;

// Individual transition settings to avoid TS spread errors
export const springTransition = { 
  duration: 0.8, 
  ease: [0.16, 1, 0.3, 1] as const 
};

export const scaleTransition = { 
  duration: 1.2, 
  ease: [0.16, 1, 0.3, 1] as const 
};

// Re-exporting the initial/animate states for easy use
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 }
};