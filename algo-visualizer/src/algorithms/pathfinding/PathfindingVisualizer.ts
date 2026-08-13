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
  play: () => void;
  pause: () => void;
  stepForward: () => void;
  stepBackward: () => void;
  reset: () => void;
  destroy?: () => void;
}

export interface PathfindingAlgorithm {
  key: string;

  label: string;

  run: (grid: Grid, start: Node, end: Node) => SearchResult;
}

export interface PathfindingVisualizerOptions {
  algorithm?: PathfindingAlgorithm;
  cellSize?: number;
}

export function createPathfindingVisualizer(
  context: PathfindingVisualizerContext,
  options: PathfindingVisualizerOptions,
): PathfindingVisualizerInstance {
  const { ctx, width, height, reducedMotion } = context;
  const cellSize = options.cellSize ?? 32;

  const cols = Math.floor(width / cellSize);
  const rows = Math.floor(height / cellSize);

  const cellW = width / cols;
  const cellH = height / rows;

  const grid: Grid = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => (Math.random() < 0.2 ? 1 : 0)),
  );

  const start: Node = {
    x: 1,
    y: Math.floor(rows / 2),
  };

  const end: Node = {
    x: cols - 2,
    y: Math.floor(rows / 2),
  };

  const cells: string[][] = grid.map((row) =>
    row.map((value) => (value === 1 ? "wall" : "empty")),
  );
  const algorithm = options.algorithm ?? algorithms[0];

  const result = algorithm.run(grid, start, end);

  cells[start.y][start.x] = "start";
  cells[end.y][end.x] = "end";
  let timelineIndex = 0;

  const totalSteps = result.steps.length + result.path.length;

  let phase: PhaseType = "search";

  let phaseStart = 0;
  let lastAdvance = 0;

  let visitedCount = 0;

  let isPlaying = false;

  function play() {
    isPlaying = true;
  }

  function pause() {
    isPlaying = false;
  }

  function rebuildTimeline(index: number) {
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        cells[y][x] = grid[y][x] === 1 ? "wall" : "empty";
      }
    }

    cells[start.y][start.x] = "start";
    cells[end.y][end.x] = "end";

    const searchCount = Math.min(index, result.steps.length);

    for (let i = 0; i < searchCount; i++) {
      const step = result.steps[i];

      if (step.node.x === start.x && step.node.y === start.y) {
        continue;
      }

      if (step.node.x === end.x && step.node.y === end.y) {
        continue;
      }

      cells[step.node.y][step.node.x] =
        step.type === "visit" ? "visited" : "frontier";
    }

    const pathCount = Math.max(0, index - result.steps.length);

    for (let i = 0; i < pathCount && i < result.path.length; i++) {
      const node = result.path[i];

      if (node.x === start.x && node.y === start.y) {
        continue;
      }

      if (node.x === end.x && node.y === end.y) {
        continue;
      }

      cells[node.y][node.x] = "path";
    }

    // Update animation state
    if (index < result.steps.length) {
      phase = "search";
    } else if (index < result.steps.length + result.path.length) {
      phase = "path";
    } else {
      phase = "pause";
    }

    phaseStart = 0;
    lastAdvance = 0;
  }

  function stepForward() {
    if (timelineIndex >= totalSteps) return;
    pause();

    timelineIndex++;

    rebuildTimeline(timelineIndex);
  }

  function stepBackward() {
    if (timelineIndex <= 0) return;
    pause();

    timelineIndex--;

    rebuildTimeline(timelineIndex);
  }

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

  function reset() {
    timelineIndex = 0;
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        cells[y][x] = grid[y][x] === 1 ? "wall" : "empty";
      }
    }

    cells[start.y][start.x] = "start";
    cells[end.y][end.x] = "end";

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
      timelineIndex = totalSteps;
    }
  }

  function tick() {
    if (timelineIndex >= totalSteps) {
      phase = "pause";
      isPlaying = false;
      return;
    }
    timelineIndex++;
    rebuildTimeline(timelineIndex);
  }

  reset();

  function frame(time: number) {
    if (!phaseStart) {
      phaseStart = time;
    }

    if (!isPlaying) {
      draw();
      return;
    }

    if (reducedMotion) {
      // An explicit Play press still works under reduced motion — it
      // just reveals the rest of the run immediately instead of
      // animating node by node.
      while (isPlaying) {
        tick();
      }
      draw();
      return;
    }

    if (phase === "search") {
      if (time - lastAdvance > 14) {
        lastAdvance = time;

        tick();
      }
    } else if (phase === "path") {
      if (time - lastAdvance > 28) {
        lastAdvance = time;

        tick();
      }
    }

    draw();
  }

  return {
    frame,
    play,
    pause,
    stepForward,
    stepBackward,
    reset,
  };
}

export const algorithms: PathfindingAlgorithm[] = [
  {
    key: "bfs",
    label: "Breadth-First Search",
    run: runBFS,
  },
];
