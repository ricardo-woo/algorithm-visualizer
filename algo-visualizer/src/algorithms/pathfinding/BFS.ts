import type { Grid, Node, SearchResult } from "../types";

export function runBFS(grid: Grid, start: Node, end: Node): SearchResult {
  const rows = grid.length;
  const cols = grid[0].length;

  const key = (node: Node) => node.y * cols + node.x;

  const neighborsOf = (node: Node): Node[] => {
    const out: Node[] = [];
    if (node.x > 0) out.push({ x: node.x - 1, y: node.y });
    if (node.x < cols - 1) out.push({ x: node.x + 1, y: node.y });
    if (node.y > 0) out.push({ x: node.x, y: node.y - 1 });
    if (node.y < rows - 1) out.push({ x: node.x, y: node.y + 1 });
    return out;
  };

  const queue: Node[] = [start];
  const cameFrom: Record<number, Node> = {};
  const visited: Record<number, boolean> = { [key(start)]: true };

  const steps: SearchResult["steps"] = [];

  while (queue.length) {
    const current = queue.shift()!;
    steps.push({ type: "visit", node: current });

    if (current.x === end.x && current.y === end.y) break;

    for (const neighbor of neighborsOf(current)) {
      if (grid[neighbor.y][neighbor.x]) continue; // wall

      const k = key(neighbor);
      if (visited[k]) continue;

      visited[k] = true;
      cameFrom[k] = current;
      queue.push(neighbor);
      steps.push({ type: "frontier", node: neighbor });
    }
  }

  const path: Node[] = [];
  const endKey = key(end);
  const reachable =
    cameFrom[endKey] || (start.x === end.x && start.y === end.y);

  if (reachable) {
    let cursor = end;
    path.push(cursor);
    while (cameFrom[key(cursor)]) {
      cursor = cameFrom[key(cursor)];
      path.push(cursor);
    }
    path.reverse();
  }

  return { steps, path, found: path.length > 0 };
}
