import type { Grid } from "../types";

const palette = {
  primary: "#065789",
  secondary: "#4398c7",
  accent: "#eac10b",
  wall: "#000",
  grid: "rgba(255,255,255,0.04)",
  visited: "rgba(67,152,199,0.35)",
  frontier: "rgba(67,152,199,0.75)",
};

const GridMaker = ({ grid }: { grid: Grid }) => {
  return (
    <div className="flex flex-col gap-1">
      {grid.map((row, y) => (
        <div key={y} className="flex gap-1">
          {row.map((cell, x) => (
            <div
              key={`${x}-${y}`}
              className="h-8 w-8 rounded-md"
              style={{
                backgroundColor: cell === 1 ? palette.wall : palette.grid,
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default GridMaker;
