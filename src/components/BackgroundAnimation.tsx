import { useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import heroBrain from "@/assets/hero-brain.jpg";
import placeholder from "@/assets/placeholder.svg";
import neuralPattern from "@/assets/neural-pattern.jpg";

const BackgroundAnimation = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div className="background-animation">
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:4rem_4rem] animate-pulse"></div>
      </div>
      <motion.div
        className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage: `url(${neuralPattern})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        animate={isInView ? { scale: [1, 1.1, 1] } : {}}
        transition={{ duration: 20, repeat: Infinity }}
      />
      <motion.div
        className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage: `url(${heroBrain})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        animate={isInView ? { scale: [1, 1.1, 1] } : {}}
        transition={{ duration: 20, repeat: Infinity }}
      />
      <motion.div
        className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage: `url(${placeholder})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        animate={isInView ? { scale: [1, 1.1, 1] } : {}}
        transition={{ duration: 20, repeat: Infinity }}
      />

      <div className="absolute inset-0 z-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default BackgroundAnimation;
