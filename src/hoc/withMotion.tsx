import React, { useEffect, useState } from "react";
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
      threshold: 0.05,
      triggerOnce: true,
    });
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
      if (inView && !hasAnimated) {
        controls.start("visible");
        setHasAnimated(true);
      }
    }, [inView, controls, hasAnimated]);

    useEffect(() => {
      const timer = setTimeout(() => {
        if (!hasAnimated) {
          controls.start("visible");
          setHasAnimated(true);
        }
      }, 3000);
      return () => clearTimeout(timer);
    }, [controls, hasAnimated]);

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
