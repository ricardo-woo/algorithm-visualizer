import VisualizationViewport from "../components/VisualizationViewport";

const Playground = () => {
  return (
    <div className="grid grid-cols-4 mx-auto w-full max-w-full py-10 px-4 sm:px-6 lg:px-6">
      <VisualizationViewport />
    </div>
  );
};

export default Playground;
