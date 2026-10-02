"use client";

import { motion } from "framer-motion";
import React from "react";

interface KineticProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
}

/**
 * RevealLine: Smooth upward kinetic text reveal.
 * Uses motion.span (block) to ensure 100% valid HTML nesting inside headings (h1, h2, h3)
 * without triggering React hydration mismatches or clipping text.
 */
export function RevealLine({
  children,
  className = "",
  delay = 0,
  duration = 0.55,
  y = 18,
}: KineticProps) {
  return (
    <motion.span
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`block ${className}`}
    >
      {children}
    </motion.span>
  );
}

/**
 * FadeUp: Smooth upward translation with opacity fade as element enters viewport.
 * Uses safe viewport amount with no negative margins to prevent elements from staying invisible.
 */
export function FadeUp({
  children,
  className = "",
  delay = 0,
  duration = 0.5,
  y = 18,
}: KineticProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * StaggerContainer: Parent container that cascades animations across its children on scroll.
 */
export function StaggerContainer({
  children,
  className = "",
  staggerDelay = 0.08,
}: {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.05 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
