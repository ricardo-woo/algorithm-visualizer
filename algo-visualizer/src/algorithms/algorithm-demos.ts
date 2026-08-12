export interface DemoContext {
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  reducedMotion: boolean;
}

export interface DemoInstance {
  frame: (time: number) => void;
  destroy?: () => void;
}

export interface Demo {
  key: string;
  label: string;
  hudLabels: [string?, string?, string?];
  create: (
    context: DemoContext,
    setHud: (values: [string, string, string]) => void,
  ) => DemoInstance;
}

const palette = {
  primary: "#065789",
  secondary: "#4398c7",
  accent: "#eac10b",
  wall: "#000",
  grid: "rgba(255,255,255,0.04)",
  visited: "rgba(67,152,199,0.35)",
  frontier: "rgba(67,152,199,0.75)",
};

// A* Pathfinding

function createAStarDemo(
  context: DemoContext,
  setHud: (v: [string, string, string]) => void,
): DemoInstance {
  const { ctx, width, height, reducedMotion } = context;
  const cols = 18,
    rows = 10;
  const cellW = width / cols,
    cellH = height / rows;
  const start = { x: 0, y: Math.floor(rows / 2) };
  const end = { x: cols - 1, y: Math.floor(rows / 2) };

  type Node = { x: number; y: number };
  let cells: string[][] = [];
  let steps: { type: "visit" | "frontier"; node: Node }[] = [];
  let path: Node[] = [];
  let phase: "search" | "path" | "pause" = "search";
  let stepIndex = 0,
    pathIndex = 0,
    visitedCount = 0;
  let phaseStart = 0,
    lastAdvance = 0;

  const key = (n: Node) => n.y * cols + n.x;
  const neighbors = (n: Node): Node[] => {
    const out: Node[] = [];
    if (n.x > 0) out.push({ x: n.x - 1, y: n.y });
    if (n.x < cols - 1) out.push({ x: n.x + 1, y: n.y });
    if (n.y > 0) out.push({ x: n.x, y: n.y - 1 });
    if (n.y < rows - 1) out.push({ x: n.x, y: n.y + 1 });
    return out;
  };
  const heuristic = (a: Node, b: Node) =>
    Math.abs(a.x - b.x) + Math.abs(a.y - b.y);

  function bfsReachable(g: number[][]) {
    const seen: Record<number, boolean> = { [key(start)]: true };
    const q: Node[] = [start];
    while (q.length) {
      const cur = q.shift()!;
      if (cur.x === end.x && cur.y === end.y) return true;
      for (const n of neighbors(cur)) {
        if (g[n.y][n.x] === 1) continue;
        const k = key(n);
        if (seen[k]) continue;
        seen[k] = true;
        q.push(n);
      }
    }
    return false;
  }

  function generateMaze() {
    let g: number[][],
      tries = 0;
    do {
      g = Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => (Math.random() < 0.24 ? 1 : 0)),
      );
      g[start.y][start.x] = 0;
      g[end.y][end.x] = 0;
      tries++;
    } while (!bfsReachable(g) && tries < 40);
    return g;
  }

  function reset() {
    const grid = generateMaze();
    cells = grid.map((row) => row.map((v) => (v === 1 ? "wall" : "empty")));
    cells[start.y][start.x] = "start";
    cells[end.y][end.x] = "end";

    const open: (Node & { g: number; f: number })[] = [
      { ...start, g: 0, f: heuristic(start, end) },
    ];
    const cameFrom: Record<number, Node> = {};
    const gScore: Record<number, number> = { [key(start)]: 0 };
    const closed: Record<number, boolean> = {};
    steps = [];

    while (open.length) {
      open.sort((a, b) => a.f - b.f);
      const current = open.shift()!;
      const ck = key(current);
      if (closed[ck]) continue;
      closed[ck] = true;
      steps.push({ type: "visit", node: current });
      if (current.x === end.x && current.y === end.y) break;
      for (const n of neighbors(current)) {
        if (grid[n.y][n.x] === 1) continue;
        const nk = key(n);
        if (closed[nk]) continue;
        const tentativeG = gScore[ck] + 1;
        if (gScore[nk] === undefined || tentativeG < gScore[nk]) {
          gScore[nk] = tentativeG;
          cameFrom[nk] = current;
          open.push({ ...n, g: tentativeG, f: tentativeG + heuristic(n, end) });
          steps.push({ type: "frontier", node: n });
        }
      }
    }

    path = [];
    if (cameFrom[key(end)] || (start.x === end.x && start.y === end.y)) {
      let cur = end;
      path.push(cur);
      while (cameFrom[key(cur)]) {
        cur = cameFrom[key(cur)];
        path.push(cur);
      }
      path.reverse();
    }

    stepIndex = 0;
    pathIndex = 0;
    visitedCount = 0;
    phase = "search";
    phaseStart = 0;

    if (reducedMotion) {
      steps.forEach((s) => {
        if (
          cells[s.node.y][s.node.x] !== "start" &&
          cells[s.node.y][s.node.x] !== "end"
        ) {
          cells[s.node.y][s.node.x] =
            s.type === "visit" ? "visited" : "frontier";
        }
        if (s.type === "visit") visitedCount++;
      });
      path.forEach((n) => {
        if (cells[n.y][n.x] !== "start" && cells[n.y][n.x] !== "end")
          cells[n.y][n.x] = "path";
      });
      phase = "pause";
      setHud([
        path.length ? "Path found" : "No path",
        String(visitedCount),
        path.length ? String(path.length - 1) : "—",
      ]);
    } else {
      setHud(["Searching", "0", "—"]);
    }
  }

  reset();

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

  function frame(time: number) {
    if (reducedMotion) {
      if (!phaseStart) phaseStart = time;
      if (time - phaseStart > 4000) reset();
      draw();
      return;
    }
    if (!phaseStart) phaseStart = time;
    if (phase === "search") {
      if (time - lastAdvance > 14) {
        lastAdvance = time;
        if (stepIndex < steps.length) {
          const s = steps[stepIndex];
          if (
            cells[s.node.y][s.node.x] !== "start" &&
            cells[s.node.y][s.node.x] !== "end"
          ) {
            cells[s.node.y][s.node.x] =
              s.type === "visit" ? "visited" : "frontier";
          }
          if (s.type === "visit") {
            visitedCount++;
            setHud(["Searching", String(visitedCount), "—"]);
          }
          stepIndex++;
        } else {
          phase = "path";
        }
      }
    } else if (phase === "path") {
      if (time - lastAdvance > 28) {
        lastAdvance = time;
        if (pathIndex < path.length) {
          const n = path[pathIndex];
          if (cells[n.y][n.x] !== "start" && cells[n.y][n.x] !== "end")
            cells[n.y][n.x] = "path";
          pathIndex++;
        } else {
          setHud([
            path.length ? "Path found" : "No path",
            String(visitedCount),
            path.length ? String(path.length - 1) : "—",
          ]);
          phase = "pause";
          phaseStart = time;
        }
      }
    } else if (phase === "pause") {
      if (time - phaseStart > 2600) reset();
    }
    draw();
  }

  return { frame };
}

/* ---------- Boids ---------- */

function createBoidsDemo(
  context: DemoContext,
  setHud: (v: [string, string, string]) => void,
): DemoInstance {
  const { ctx, width, height, reducedMotion } = context;
  const count = 100;
  type Boid = { x: number; y: number; vx: number; vy: number };
  const boids: Boid[] = Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 2,
    vy: (Math.random() - 0.5) * 2,
  }));
  const maxSpeed = 2.2,
    neighborRadius = 46,
    sepRadius = 18;

  function step() {
    for (const b of boids) {
      let sepX = 0,
        sepY = 0,
        aliX = 0,
        aliY = 0,
        cohX = 0,
        cohY = 0,
        n = 0;
      for (const o of boids) {
        if (o === b) continue;
        const dx = o.x - b.x,
          dy = o.y - b.y;
        const d = Math.hypot(dx, dy);
        if (d < neighborRadius && d > 0) {
          n++;
          aliX += o.vx;
          aliY += o.vy;
          cohX += o.x;
          cohY += o.y;
          if (d < sepRadius) {
            sepX -= dx / d;
            sepY -= dy / d;
          }
        }
      }
      if (n > 0) {
        aliX /= n;
        aliY /= n;
        cohX = cohX / n - b.x;
        cohY = cohY / n - b.y;
        b.vx += aliX * 0.02 + cohX * 0.0018 + sepX * 0.09;
        b.vy += aliY * 0.02 + cohY * 0.0018 + sepY * 0.09;
      }
      const speed = Math.hypot(b.vx, b.vy) || 1;
      if (speed > maxSpeed) {
        b.vx = (b.vx / speed) * maxSpeed;
        b.vy = (b.vy / speed) * maxSpeed;
      }
    }
    for (const b of boids) {
      b.x += b.vx;
      b.y += b.vy;
      if (b.x < 0) b.x += width;
      if (b.x > width) b.x -= width;
      if (b.y < 0) b.y += height;
      if (b.y > height) b.y -= height;
    }
  }

  let lastStep = 0,
    lastHud = 0;
  function frame(time: number) {
    if (!reducedMotion && time - lastStep > 16) {
      lastStep = time;
      step();
    }
    ctx.clearRect(0, 0, width, height);
    for (const b of boids) {
      const angle = Math.atan2(b.vy, b.vx);
      ctx.save();
      ctx.translate(b.x, b.y);
      ctx.rotate(angle);
      ctx.fillStyle = palette.secondary;
      ctx.beginPath();
      ctx.moveTo(6, 0);
      ctx.lineTo(-5, 3.5);
      ctx.lineTo(-5, -3.5);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }
    if (time - lastHud > 400) {
      lastHud = time;
      const avgSpeed =
        boids.reduce((s, b) => s + Math.hypot(b.vx, b.vy), 0) / boids.length;
      setHud(["Flocking", String(count), avgSpeed.toFixed(2)]);
    }
  }

  return { frame };
}

export const demos: Demo[] = [
  {
    key: "astar",
    label: "A* Pathfinding",
    hudLabels: ["Status", "Nodes Explored", "Path Length"],
    create: createAStarDemo,
  },
  {
    key: "boids",
    label: "Boids Flocking",
    hudLabels: ["Status", "Agents"],
    create: createBoidsDemo,
  },
];
