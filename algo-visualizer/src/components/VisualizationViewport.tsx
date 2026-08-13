import ViewportController from "./ViewportController";

const VisualizationViewport = () => {
  return (
    <div className="rounded-2xl sm:col-span-3 w-full border border-white/5 bg-[#0a1120] p-4">
      <div className="mb-3 flex justify-between items-center gap-2 px-1">
        <span className="font-tech text-[0.68rem] uppercase tracking-wider text-[#90A1B9]">
          LIVE VIEW
        </span>
        <ViewportController />
      </div>
      <div className="rounded-2xl aspect-video overflow-hidden bg-white/3 transition-opacity duration-300"></div>
    </div>
  );
};

export default VisualizationViewport;
