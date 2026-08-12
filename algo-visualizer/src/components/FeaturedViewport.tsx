import { useEffect, useRef, useState } from "react";
import { demos } from "../algorithms/algorithm-demos";

const SHOW_DURATION_MS = 30000;
const FADE_MS = 320;
const PATHFINDING_INDEX = demos.findIndex((d) => d.key === "astar");

export const FeaturedViewport = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [demoIndex, setDemoIndex] = useState(0);
  const [hud, setHud] = useState<[string, string, string]>(["—", "—", "—"]);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mql.matches);
    if (mql.matches) setDemoIndex(PATHFINDING_INDEX);

    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
      if (e.matches) setDemoIndex(PATHFINDING_INDEX);
    };
    mql.addEventListener("change", handleChange);
    return () => mql.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0,
      height = 0;

    function resize() {
      const rect = container!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    const demo = demos[demoIndex];
    const instance = demo.create({ ctx, width, height, reducedMotion }, setHud);

    let raf = 0;
    let cancelled = false;
    function loop(time: number) {
      if (cancelled) return;
      instance.frame(time);
      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);

    let rotateTimer: ReturnType<typeof setTimeout> | undefined;
    if (!reducedMotion) {
      rotateTimer = setTimeout(() => {
        setFading(true);
        setTimeout(() => {
          setDemoIndex((i) => (i + 1) % demos.length);
          setFading(false);
        }, FADE_MS);
      }, SHOW_DURATION_MS);
    }

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      if (rotateTimer) clearTimeout(rotateTimer);
      ro.disconnect();
      instance.destroy?.();
    };
  }, [demoIndex, reducedMotion]);

  const demo = demos[demoIndex];

  return (
    <div className="rounded-2xl border border-white/5 bg-[#0a1120] dark:bg-[#F5EEDF] p-4">
      <div className="mb-3 flex items-center gap-2 px-1">
        <span className="font-tech text-[0.68rem] uppercase tracking-wider text-[#90A1B9] dark:text-[#6F5E46]">
          {demo.label}
        </span>
      </div>

      <div
        ref={containerRef}
        className={`aspect-video overflow-hidden rounded-lg bg-white/[0.03] dark:bg-black/[0.1] transition-opacity duration-300 ${
          fading ? "opacity-0" : "opacity-100"
        }`}
      >
        <canvas ref={canvasRef} />
      </div>

      <div className="mt-3.5 flex justify-between px-1 font-tech">
        {demo.hudLabels.map((label, i) => (
          <div key={label} className="flex flex-col gap-0.5">
            <span className="text-[0.8rem] uppercase tracking-wider text-[#90A1B9] dark:text-[#6F5E46]">
              {label}
            </span>
            <strong className="text-[0.9rem] font-semibold text-[#E2E8F0] dark:text-[#1D170F]">
              {hud[i]}
            </strong>
          </div>
        ))}
      </div>
    </div>
  );
};
