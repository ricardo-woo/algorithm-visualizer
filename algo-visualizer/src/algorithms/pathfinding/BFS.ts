import type { Grid, Node, SearchResult } from "../types";

export function runBFS(grid: Grid, start: Node, end: Node): SearchResult {
  const rows = grid.length;
  const cols = grid[0].length;

  const key = (node: Node) => node.y * cols + node.x;

  const neighborsOf = (node: Node): Node[] => {
    const neighbors: Node[] = [];

    if (node.x > 0) {
      neighbors.push({
        x: node.x - 1,
        y: node.y,
      });
    }

    if (node.x < cols - 1) {
      neighbors.push({
        x: node.x + 1,
        y: node.y,
      });
    }

    if (node.y > 0) {
      neighbors.push({
        x: node.x,
        y: node.y - 1,
      });
    }

    if (node.y < rows - 1) {
      neighbors.push({
        x: node.x,
        y: node.y + 1,
      });
    }

    return neighbors;
  };

  const queue: Node[] = [start];
  let queueHead = 0;

  const visited = new Set<number>();
  const cameFrom = new Map<number, Node>();

  visited.add(key(start));

  const steps: SearchResult["steps"] = [];

  while (queueHead < queue.length) {
    const current = queue[queueHead++];

    steps.push({
      type: "visit",
      node: current,
    });

    if (current.x === end.x && current.y === end.y) {
      break;
    }

    for (const neighbor of neighborsOf(current)) {
      if (grid[neighbor.y][neighbor.x] === 1) {
        continue;
      }

      const neighborKey = key(neighbor);

      if (visited.has(neighborKey)) {
        continue;
      }

      visited.add(neighborKey);

      cameFrom.set(neighborKey, current);

      queue.push(neighbor);

      steps.push({
        type: "frontier",
        node: neighbor,
      });
    }
  }

  // Reconstruct path
  const path: Node[] = [];

  const endKey = key(end);

  const reachable = visited.has(endKey);

  if (reachable) {
    let current = end;

    path.push(current);

    while (cameFrom.has(key(current))) {
      current = cameFrom.get(key(current))!;
      path.push(current);
    }

    path.reverse();
  }

  return {
    steps,
    path,
    found: path.length > 0,
  };
}
