export const CardGrid = () => {
  return (
    <div className="grid grid-cols-2 place-items-center justify-evenly gap-20 items-center md:grid-cols-5">
      <div className="rounded w-auto bg-accent p-4">
        <div>Hello</div>
      </div>
      <div className="rounded h-24 w-24 bg-gray-500">01</div>
      <div className="rounded h-24 w-24 bg-gray-500">01</div>
      <div className="rounded h-24 w-24 bg-gray-500">01</div>
      <div className="rounded h-24 w-24 bg-gray-500">01</div>
      <div className="rounded h-24 w-24 bg-gray-500">01</div>
    </div>
  );
};

export default CardGrid;
