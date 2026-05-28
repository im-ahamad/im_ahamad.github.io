import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { motion, Variants, useAnimation } from "framer-motion";

function isTouchDevice(): boolean {
  if (typeof window === "undefined") return true;
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
}

const isTouch = isTouchDevice();

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.15, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const childVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export function withScrollMotion<T extends object>(
  WrappedComponent: React.ComponentType<T>
) {
  if (isTouch) {
    const StaticSection = (props: T) => (
      <section>
        <WrappedComponent {...props} />
      </section>
    );
    return React.memo(StaticSection);
  }

  const AnimatedSection = (props: T) => {
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

  return React.memo(AnimatedSection);
}
