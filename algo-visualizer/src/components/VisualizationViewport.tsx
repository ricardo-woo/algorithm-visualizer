import ViewportController from "./ViewportController";
import { useRef, useEffect } from "react";

const VisualizationViewport = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas?.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let width = 0,
      height = 0;
    function resizeCanvas() {
      const rect = container!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;

      canvas!.width = width;
      canvas!.height = height;
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resizeCanvas();

    const observer = new ResizeObserver(resizeCanvas);
    observer.observe(container);
  }, []);

  return (
    <div className="rounded-2xl sm:col-span-3 w-full border border-white/5 bg-[#0a1120] p-4">
      <div className="mb-3 flex justify-between items-center gap-2 px-1">
        <span className="font-tech text-[0.68rem] uppercase tracking-wider text-[#90A1B9]">
          LIVE VIEW
        </span>
        <ViewportController />
      </div>
      <div
        ref={containerRef}
        className="rounded-2xl aspect-video overflow-hidden bg-white/3 transition-opacity duration-300"
      >
        <canvas ref={canvasRef}></canvas>
      </div>
    </div>
  );
};

export default VisualizationViewport;
