import { memo } from "react";
import heroBrain from "@/assets/hero-brain.jpg";
import neuralPattern from "@/assets/neural-pattern.jpg";

const BackgroundAnimation = memo(() => {
  const particles = Array.from({ length: 15 }, (_, i) => (
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
  ));

  return (
    <div className="background-animation">
      <div className="absolute inset-0 z-0 opacity-[0.12]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.3)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.3)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <div
        className="absolute inset-0 z-0 opacity-[0.15] animate-bg-pulse-slow"
        style={{
          backgroundImage: `url(${neuralPattern})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div
        className="absolute inset-0 z-0 opacity-[0.20] animate-bg-pulse-slower"
        style={{
          backgroundImage: `url(${heroBrain})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="absolute inset-0 z-0 pointer-events-none hidden md:block">
        {particles}
      </div>
    </div>
  );
});

export default BackgroundAnimation;
