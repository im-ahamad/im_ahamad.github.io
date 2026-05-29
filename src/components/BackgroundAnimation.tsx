import { useRef } from "react";
import { motion } from "framer-motion";
import heroBrain from "@/assets/hero-brain.jpg";
import neuralPattern from "@/assets/neural-pattern.jpg";
import { useInView } from "react-intersection-observer";

const BackgroundAnimation = () => {
  const ref = useRef(null);
  const [inViewRef, inView] = useInView({ triggerOnce: true, threshold: 0 });

  return (
    <div className="background-animation" ref={ref}>
      {/* Base grid overlay */}
      <div className="absolute inset-0 z-0 opacity-[0.12]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.3)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.3)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      {/* Neural pattern layer with gentle pulse */}
      <motion.div
        ref={inViewRef}
        className="absolute inset-0 z-0 opacity-[0.15]"
        style={{
          backgroundImage: `url(${neuralPattern})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        animate={inView ? { scale: [1, 1.05, 1] } : {}}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Hero brain layer with gentle pulse */}
      <motion.div
        className="absolute inset-0 z-0 opacity-[0.20]"
        style={{
          backgroundImage: `url(${heroBrain})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        animate={inView ? { scale: [1, 1.05, 1] } : {}}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 z-0 pointer-events-none hidden md:block">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full animate-particle"
            style={{
              left: `${5 + (i * 7) % 90}%`,
              top: `${10 + (i * 13) % 80}%`,
              background: i % 3 === 0
                ? "hsl(var(--primary) / 0.4)"
                : i % 3 === 1
                  ? "hsl(var(--accent) / 0.35)"
                  : "hsl(280, 70%, 60% / 0.3)",
              "--float-y": `${-25 - (i % 3) * 10}px`,
              "--float-duration": `${4 + (i % 3) * 2}s`,
              "--float-delay": `${i * 0.4}s`,
            } as React.CSSProperties}
          />
        ))}
      </div>
    </div>
  );
};

export default BackgroundAnimation;
