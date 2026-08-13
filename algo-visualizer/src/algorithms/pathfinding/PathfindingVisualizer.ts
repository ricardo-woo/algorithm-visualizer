import type { Grid, Node, SearchResult, PhaseType } from "../types";
import { runBFS } from "./BFS";

const palette = {
  primary: "#065789",
  secondary: "#4398c7",
  accent: "#eac10b",
  wall: "#000",
  grid: "rgba(255,255,255,0.04)",
  visited: "rgba(67,152,199,0.35)",
  frontier: "rgba(67,152,199,0.75)",
};

export interface PathfindingVisualizerContext {
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  reducedMotion: boolean;
}

export interface PathfindingVisualizerInstance {
  frame: (time: number) => void;
  destroy?: () => void;
}

export interface PathfindingAlgorithm {
  key: string;

  label: string;

  run: (grid: Grid, start: Node, end: Node) => SearchResult;
}

export interface PathfindingVisualizerOptions {
  grid: Grid;
  start: Node;
  end: Node;
  result: SearchResult;
}

export function createPathfindingVisualizer(
  context: PathfindingVisualizerContext,
  options: PathfindingVisualizerOptions,
): PathfindingVisualizerInstance {
  const { ctx, width, height, reducedMotion } = context;

  const { grid, start, end, result } = options;

  const rows = grid.length;
  const cols = grid[0].length;

  const cellW = width / cols;
  const cellH = height / rows;

  const cells: string[][] = grid.map((row) =>
    row.map((value) => (value === 1 ? "wall" : "empty")),
  );

  cells[start.y][start.x] = "start";
  cells[end.y][end.x] = "end";

  let stepIndex = 0;
  let pathIndex = 0;

  let phase: PhaseType = "search";

  let phaseStart = 0;
  let lastAdvance = 0;

  let visitedCount = 0;

  function draw() {
    ctx.clearRect(0, 0, width, height);

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const state = cells[y][x];

        ctx.shadowBlur = 10;

        ctx.fillStyle =
          state === "wall"
            ? palette.wall
            : state === "visited"
              ? palette.visited
              : state === "frontier"
                ? palette.frontier
                : state === "path" || state === "end"
                  ? palette.accent
                  : state === "start"
                    ? palette.secondary
                    : palette.grid;

        ctx.shadowColor =
          state === "path" || state === "end" ? palette.accent : "transparent";

        ctx.fillRect(x * cellW + 1.5, y * cellH + 1.5, cellW - 3, cellH - 3);
      }
    }
  }

  function applyStep() {
    if (stepIndex >= result.steps.length) {
      phase = "path";
      return;
    }

    const step = result.steps[stepIndex];

    const isStart = step.node.x === start.x && step.node.y === start.y;

    const isEnd = step.node.x === end.x && step.node.y === end.y;

    if (!isStart && !isEnd) {
      cells[step.node.y][step.node.x] =
        step.type === "visit" ? "visited" : "frontier";
    }

    if (step.type === "visit") {
      visitedCount++;
    }

    stepIndex++;
  }

  function applyPathStep() {
    if (pathIndex >= result.path.length) {
      phase = "pause";
      phaseStart = 0;
      return;
    }

    const node = result.path[pathIndex];

    const isStart = node.x === start.x && node.y === start.y;

    const isEnd = node.x === end.x && node.y === end.y;

    if (!isStart && !isEnd) {
      cells[node.y][node.x] = "path";
    }

    pathIndex++;
  }

  function reset() {
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        cells[y][x] = grid[y][x] === 1 ? "wall" : "empty";
      }
    }

    cells[start.y][start.x] = "start";
    cells[end.y][end.x] = "end";

    stepIndex = 0;
    pathIndex = 0;
    visitedCount = 0;

    phase = "search";
    phaseStart = 0;
    lastAdvance = 0;

    if (reducedMotion) {
      for (const step of result.steps) {
        const isStart = step.node.x === start.x && step.node.y === start.y;

        const isEnd = step.node.x === end.x && step.node.y === end.y;

        if (!isStart && !isEnd) {
          cells[step.node.y][step.node.x] =
            step.type === "visit" ? "visited" : "frontier";
        }

        if (step.type === "visit") {
          visitedCount++;
        }
      }

      for (const node of result.path) {
        const isStart = node.x === start.x && node.y === start.y;

        const isEnd = node.x === end.x && node.y === end.y;

        if (!isStart && !isEnd) {
          cells[node.y][node.x] = "path";
        }
      }

      phase = "pause";
    }
  }

  reset();

  function frame(time: number) {
    if (!phaseStart) {
      phaseStart = time;
    }

    if (reducedMotion) {
      if (time - phaseStart > 4000) {
        reset();
      }

      draw();
      return;
    }

    if (phase === "search") {
      if (time - lastAdvance > 14) {
        lastAdvance = time;

        applyStep();
      }
    } else if (phase === "path") {
      if (time - lastAdvance > 28) {
        lastAdvance = time;

        applyPathStep();
      }
    } else if (phase === "pause") {
      if (time - phaseStart > 2600) {
        reset();
      }
    }

    draw();
  }

  return {
    frame,
  };
}

export const algorithms: PathfindingAlgorithm[] = [
  {
    key: "bfs",
    label: "Breadth-First Search",
    run: runBFS,
  },
];
