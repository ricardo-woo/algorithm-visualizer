import ViewportController from "./ViewportController";
import { useRef, useEffect, useState } from "react";
import { algorithms } from "../algorithms/pathfinding/PathfindingVisualizer";
import { createPathfindingVisualizer } from "../algorithms/pathfinding/PathfindingVisualizer";
import type { PathfindingVisualizerInstance } from "../algorithms/pathfinding/PathfindingVisualizer";

const VisualizationViewport = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const visualizerRef = useRef<PathfindingVisualizerInstance>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas?.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let animationFrame = 0;

    function resizeCanvas() {
      const rect = container!.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    const visualizer = createPathfindingVisualizer(
      {
        ctx,
        width: container.clientWidth,
        height: container.clientHeight,
        reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)")
          .matches,
      },
      {
        algorithm: algorithms[0],
        cellSize: 32,
      },
    );

    visualizerRef.current = visualizer;

    const frame = (time: number) => {
      visualizer.frame(time);
      animationFrame = requestAnimationFrame(frame);
    };

    animationFrame = requestAnimationFrame(frame);

    resizeCanvas();

    const observer = new ResizeObserver(resizeCanvas);
    observer.observe(container);

    return () => {
      cancelAnimationFrame(animationFrame);
      observer.disconnect();
      visualizer.destroy?.();
      visualizerRef.current = null;
    };
  }, []);

  return (
    <div className="rounded-2xl sm:col-span-3 w-full border border-white/5 bg-[#0a1120] p-4">
      <div className="mb-3 flex justify-between items-center gap-2 px-1">
        <span className="font-tech text-[0.68rem] uppercase tracking-wider text-[#90A1B9]">
          LIVE VIEW
        </span>
        <ViewportController
          isPlaying={isPlaying}
          onPlay={() => {
            visualizerRef.current?.play();
            setIsPlaying(true);
          }}
          onPause={() => {
            visualizerRef.current?.pause();
            setIsPlaying(false);
          }}
          onNext={() => {
            visualizerRef.current?.stepForward();
          }}
          onBack={() => {
            visualizerRef.current?.stepBackward();
          }}
        />
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
