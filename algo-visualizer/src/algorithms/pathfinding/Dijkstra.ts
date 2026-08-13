import type { Grid, Node, SearchResult, SearchStep } from "../types";

export function runDijkstra(
  grid: Grid,
  start: Node,
  target: Node,
): SearchResult {
  const distances = new Map<string, number>();
  const previous = new Map<string, Node | null>();

  const queue: { node: Node; distance: number }[] = [];

  const steps: SearchStep[] = [];

  const startKey = getKey(start);

  distances.set(startKey, 0);
  previous.set(startKey, null);

  queue.push({
    node: start,
    distance: 0,
  });

  const visited = new Set<string>();

  while (queue.length > 0) {
    queue.sort((a, b) => a.distance - b.distance);

    const current = queue.shift()!;
    const currentKey = getKey(current.node);

    if (visited.has(currentKey)) {
      continue;
    }

    visited.add(currentKey);

    steps.push({
      type: "visit",
      node: current.node,
    });

    if (current.node.x === target.x && current.node.y === target.y) {
      break;
    }

    for (const neighbor of getNeighbors(current.node, grid)) {
      const neighborKey = getKey(neighbor);

      if (visited.has(neighborKey)) {
        continue;
      }

      // Every edge currently has a cost of 1.
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

  const targetKey = getKey(target);
  const found = distances.has(targetKey);

  return {
    steps,
    path: found ? reconstructPath(target, previous) : [],
    found,
  };
}

function getKey(node: Node): string {
  return `${node.x},${node.y}`;
}

function getNeighbors(node: Node, grid: Grid): Node[] {
  const neighbors: Node[] = [];

  const directions = [
    { x: 0, y: -1 },
    { x: 0, y: 1 },
    { x: -1, y: 0 },
    { x: 1, y: 0 },
  ];

  for (const direction of directions) {
    const x = node.x + direction.x;
    const y = node.y + direction.y;

    if (y >= 0 && y < grid.length && x >= 0 && x < grid[y].length) {
      // Assuming 0 = walkable and 1 = wall.
      if (grid[y][x] === 0) {
        neighbors.push({ x, y });
      }
    }
  }

  return neighbors;
}

function reconstructPath(
  target: Node,
  previous: Map<string, Node | null>,
): Node[] {
  const path: Node[] = [];

  let current: Node | null = target;

  while (current !== null) {
    path.unshift(current);

    current = previous.get(getKey(current)) ?? null;
  }

  return path;
}
