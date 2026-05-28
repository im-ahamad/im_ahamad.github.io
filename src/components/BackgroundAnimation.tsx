import { useRef } from "react";
import heroBrain from "@/assets/hero-brain.jpg";
import neuralPattern from "@/assets/neural-pattern.jpg";

function isTouchDevice(): boolean {
  if (typeof window === "undefined") return true;
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
}

const isTouch = isTouchDevice();

const BackgroundAnimation = () => {
  const ref = useRef(null);

  if (isTouch) {
    return (
      <div className="background-animation" ref={ref}>
        <div
          className="absolute inset-0 z-0 opacity-[0.04]"
          style={{
            backgroundImage: `url(${neuralPattern})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 z-0 opacity-[0.03]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        </div>
      </div>
    );
  }

  return (
    <div className="background-animation" ref={ref}>
      <div
        className="absolute inset-0 z-0 opacity-[0.18]"
        style={{
          backgroundImage: `url(${heroBrain})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div
        className="absolute inset-0 z-0 opacity-[0.12]"
        style={{
          backgroundImage: `url(${neuralPattern})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 z-0 opacity-[0.08]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>
    </div>
  );
};

export default BackgroundAnimation;
