const VisualizationViewport = () => {
  return (
    <div className="rounded-2xl col-span-3 border border-white/5 bg-[#0a1120] dark:bg-[#F5EEDF] p-4">
      <div className="mb-3 flex items-center gap-2 px-1">
        <span className="font-tech text-[0.68rem] uppercase tracking-wider text-[#90A1B9] dark:text-[#6F5E46]">
          LIVE VIEW
        </span>
      </div>
      <div className="rounded-2xl aspect-video overflow-hidden bg-white/[0.03] dark:bg-black/[0.1] transition-opacity duration-300"></div>
    </div>
  );
};

export default VisualizationViewport;
