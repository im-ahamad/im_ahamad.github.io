import { useEffect, useRef, useState } from "react";

const POOL_SIZE = 10;
const SPAWN_INTERVAL = 55;

function isTouchDevice(): boolean {
  if (typeof window === "undefined") return true;
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
}

function MobileRipple() {
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `@keyframes bubble-ripple { 0% { transform: scale(0); opacity: 0.5; } 100% { transform: scale(8); opacity: 0; } }`;
    document.head.appendChild(style);

    const container = document.createElement("div");
    container.style.cssText =
      "position:fixed;inset:0;pointer-events:none;z-index:9999";
    document.body.appendChild(container);

    const handler = (e: MouseEvent | TouchEvent) => {
      const point =
        "changedTouches" in e
          ? e.changedTouches[0]
          : (e as MouseEvent);
      const ripple = document.createElement("div");
      ripple.style.cssText = `
        position:absolute;
        left:${point.clientX}px; top:${point.clientY}px;
        width:16px; height:16px;
        margin-left:-8px; margin-top:-8px;
        border-radius:50%;
        background:radial-gradient(circle,hsl(var(--primary)/0.4),transparent 70%);
        animation:bubble-ripple 0.5s ease-out forwards;
      `;
      container.appendChild(ripple);
      ripple.addEventListener("animationend", () => ripple.remove());
    };

    document.addEventListener("click", handler);
    return () => {
      document.removeEventListener("click", handler);
      container.remove();
      style.remove();
    };
  }, []);

  return null;
}

function DesktopBubbles() {
  const mouseRef = useRef({ x: -100, y: -100 });
  const glowRef = useRef({ x: -100, y: -100 });
  const poolRef = useRef<HTMLDivElement[]>([]);
  const particlesRef = useRef<
    Array<{
      ox: number;
      oy: number;
      size: number;
      startTime: number;
      duration: number;
    }>
  >([]);
  const rafRef = useRef(0);
  const nextSpawnRef = useRef(0);
  const lastMoveRef = useRef(0);
  const glowElRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = document.createElement("div");
    container.style.cssText =
      "position:fixed;inset:0;pointer-events:none;z-index:9999";
    document.body.appendChild(container);

    const glow = document.createElement("div");
    glow.style.cssText = `
      position:absolute;top:0;left:0;
      width:40px;height:40px;
      margin-left:-20px;margin-top:-20px;
      border-radius:50%;
      background:radial-gradient(circle,hsl(var(--primary)/0.12),transparent 70%);
      pointer-events:none;
      transform:translate3d(-100px,-100px,0);
      will-change:transform;
    `;
    container.appendChild(glow);
    glowElRef.current = glow;

    for (let i = 0; i < POOL_SIZE; i++) {
      const el = document.createElement("div");
      el.style.cssText = `
        position:absolute;top:0;left:0;
        border-radius:50%;
        pointer-events:none;
        background:radial-gradient(circle,hsl(var(--primary)/0.25),transparent 70%);
        opacity:0;
        transform:translate3d(0,0,0);
        will-change:transform,opacity;
      `;
      container.appendChild(el);
      poolRef.current.push(el);
      particlesRef.current.push({
        ox: 0,
        oy: 0,
        size: 6,
        startTime: 0,
        duration: 1000,
      });
    }

    let spawnIdx = 0;

    const move = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      lastMoveRef.current = performance.now();
    };

    document.addEventListener("mousemove", move, { passive: true });

    const tick = (now: number) => {
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const moving = now - lastMoveRef.current < 200;

      glowRef.current.x += (mx - glowRef.current.x) * 0.12;
      glowRef.current.y += (my - glowRef.current.y) * 0.12;
      glow.style.transform = `translate3d(${glowRef.current.x}px,${glowRef.current.y}px,0)`;
      glow.style.opacity = moving ? "1" : "0";

      if (now - nextSpawnRef.current > SPAWN_INTERVAL && moving) {
        nextSpawnRef.current = now;
        spawnIdx = (spawnIdx + 1) % POOL_SIZE;

        const angle = Math.random() * Math.PI * 2;
        const dist = 4 + Math.random() * 16;
        const size = 3 + Math.random() * 8;

        particlesRef.current[spawnIdx] = {
          ox: Math.cos(angle) * dist,
          oy: Math.sin(angle) * dist,
          size,
          startTime: now,
          duration: 700 + Math.random() * 500,
        };
      }

      for (let i = 0; i < POOL_SIZE; i++) {
        const p = particlesRef.current[i];
        const el = poolRef.current[i];
        const age = now - p.startTime;
        const t = age / p.duration;

        if (t >= 1) {
          el.style.opacity = "0";
          continue;
        }

        const px = mx + p.ox;
        const py = my + p.oy;
        const grow = t < 0.2 ? t / 0.2 : 1 - ((t - 0.2) / 0.8) * 0.5;
        const opacity = Math.sin(t * Math.PI * 0.8) * 0.45;

        el.style.opacity = String(opacity);
        el.style.width = `${p.size}px`;
        el.style.height = `${p.size}px`;
        el.style.marginLeft = `${-p.size / 2}px`;
        el.style.marginTop = `${-p.size / 2}px`;
        el.style.transform = `translate3d(${px}px,${py}px,0) scale(${grow})`;
      }

      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener("mousemove", move);
      cancelAnimationFrame(rafRef.current);
      container.remove();
    };
  }, []);

  return null;
}

export default function BubbleCursor() {
  const [touch] = useState(isTouchDevice);

  if (touch) return <MobileRipple />;
  return <DesktopBubbles />;
}
