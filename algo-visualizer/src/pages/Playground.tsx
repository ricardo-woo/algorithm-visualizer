import VisualizationControllers from "../components/VisualizationControllers";
import VisualizationViewport from "../components/VisualizationViewport";

const Playground = () => {
  return (
    <div className="grid gap-4 grid-rows-2 mx-auto w-full max-w-full py-10 px-4 sm:grid-cols-4 sm:px-6 lg:px-6">
      <VisualizationViewport />
      <VisualizationControllers />
    </div>
  );
};

export default Playground;
