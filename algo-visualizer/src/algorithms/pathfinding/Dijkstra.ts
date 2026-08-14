import type { Grid, Node, SearchResult } from "../types";

export function runDijkstra(grid: Grid, start: Node, end: Node): SearchResult {
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

  const queue: { node: Node; distance: number }[] = [];

  const distances = new Map<number, number>();
  const previous = new Map<number, Node | null>();
  const visited = new Set<number>();

  const steps: SearchResult["steps"] = [];

  const startKey = key(start);

  distances.set(startKey, 0);
  previous.set(startKey, null);

  queue.push({
    node: start,
    distance: 0,
  });

  while (queue.length > 0) {
    queue.sort((a, b) => a.distance - b.distance);

    const current = queue.shift()!;
    const currentKey = key(current.node);

    if (visited.has(currentKey)) {
      continue;
    }

    visited.add(currentKey);

    steps.push({
      type: "visit",
      node: current.node,
    });

    if (current.node.x === end.x && current.node.y === end.y) {
      break;
    }

    for (const neighbor of neighborsOf(current.node)) {
      if (grid[neighbor.y][neighbor.x] === 1) {
        continue;
      }

      const neighborKey = key(neighbor);

      if (visited.has(neighborKey)) {
        continue;
      }

      const weight = 1;

      const newDistance = current.distance + weight;

      const oldDistance = distances.get(neighborKey) ?? Infinity;

      if (newDistance < oldDistance) {
        distances.set(neighborKey, newDistance);
        previous.set(neighborKey, current.node);

        queue.push({
          node: neighbor,
          distance: newDistance,
        });

        steps.push({
          type: "frontier",
          node: neighbor,
        });
      }
    }
  }

  const targetKey = key(end);
  const found = distances.has(targetKey);

  const path: Node[] = [];

  if (found) {
    let current: Node | null = end;

    while (current !== null) {
      path.unshift(current);

      current = previous.get(key(current)) ?? null;
    }
  }

  return {
    steps,
    path,
    found,
  };
}
