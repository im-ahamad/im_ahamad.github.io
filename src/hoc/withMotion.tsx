import React, { useRef, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { motion, Variants, useAnimation } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.15, duration: 0.7, ease: "easeInOut" },
  },
};

const childVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeInOut" },
  },
};

export function withScrollMotion<T extends object>(
  WrappedComponent: React.ComponentType<T>
) {
  return (props: T) => {
    const controls = useAnimation();
    const [ref, inView] = useInView({
      threshold: 0.2,
      triggerOnce: true, // Changed to true to prevent repeated animations
    });

    useEffect(() => {
      if (inView) {
        controls.start("visible");
      }
    }, [inView, controls]);

    return (
      <motion.section
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={containerVariants}
      >
        <WrappedComponent {...props} motionChildVariants={childVariants} />
      </motion.section>
    );
  };
}
