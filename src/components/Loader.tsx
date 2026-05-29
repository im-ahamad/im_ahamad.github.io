import { useEffect } from "react";
import { useLoader } from "@/context/LoaderContext";

const Loader = () => {
  const { visible } = useLoader();

  useEffect(() => {
    if (visible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [visible]);

  return (
    <div
      className={`fixed inset-0 z-[999999] flex flex-col items-center justify-center bg-slate-50 dark:bg-[#0a0a0f] transition-opacity duration-500 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      style={{ transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)" }}
    >
      <div className="flex flex-col items-center gap-6">
        <div className="font-['Space_Grotesk'] text-[28px] font-bold tracking-[-0.5px] bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
          Ahamad
        </div>
        <div className="relative w-[60px] h-[60px]">
          <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-blue-500 animate-[spin_0.8s_linear_infinite]" />
          <div className="absolute inset-[6px] rounded-full border-[3px] border-transparent border-r-purple-500 animate-[spin_1s_linear_infinite_reverse]" />
          <div className="absolute inset-[12px] rounded-full border-[3px] border-transparent border-b-cyan-400 animate-[spin_0.6s_linear_infinite]" />
        </div>
        <div className="w-[200px] h-[3px] rounded-full overflow-hidden bg-blue-500/10">
          <div className="h-full rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-400 animate-[loaderFill_1.2s_ease-in-out_forwards]" />
        </div>
        <div className="font-['Space_Grotesk'] text-[13px] tracking-[3px] uppercase bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent animate-[loaderPulse_1.5s_ease-in-out_infinite]">
          Loading
        </div>
      </div>
    </div>
  );
};

export default Loader;
