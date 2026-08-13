export interface Node {
  x: number;
  y: number;
}

export type StepType = "visit" | "frontier";

export interface SearchStep {
  type: StepType;
  node: Node;
}

export interface SearchResult {
  steps: SearchStep[];
  path: Node[];
  found: boolean;
}

export type Grid = number[][];
