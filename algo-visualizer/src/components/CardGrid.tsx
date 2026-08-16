import { Button } from "./Button";

interface Algorithm {
  id: string;
  title: string;
  description: string;
  worstCase: string;
}

interface CardItemProps {
  title: string;
  description: string;
  worstCase: string;
}

const defaultAlgorithms: Algorithm[] = [
  {
    id: "a-star",
    title: "A* SEARCH",
    description:
      "A* finds the shortest path by considering both the distance traveled and the estimated distance to the goal.",
    worstCase: "O(bᵈ)",
  },
  {
    id: "bfs",
    title: "BREADTH FIRST SEARCH",
    description:
      "BFS explores nodes level by level to find the shortest path in an unweighted graph.",
    worstCase: "O(V + E)",
  },
  {
    id: "dijkstra",
    title: "DIJKSTRA",
    description:
      "Dijkstra's algorithm finds the shortest path by always exploring the node with the smallest known distance from the start.",
    worstCase: "O(E log V)",
  },
];

const CardItem = ({ title, description, worstCase }: CardItemProps) => {
  return (
    <div className="rounded w-full transition-all delay-75 duration-200 ease-in-out hover:scale-105 h-full outline-secondary outline-2 font-tech p-6 dark:text-dark-foreground flex flex-col">
      <h3 className="mt-4 text-lg">{title}</h3>
      <p className="text-justify my-6 text-muted dark:text-dark-muted">
        {description}
      </p>
      <div className="flex mb-10 flex-row items-center justify-between">
        <p>Worst Case</p>
        <p className="text-secondary text-sm">{worstCase}</p>
      </div>
      <div className="mt-auto">
        <Button
          width="w-full"
          display="View →"
          bgcolor="bg-accent"
          txtcolor="text-foreground"
        />
      </div>
    </div>
  );
};

interface CardGridProps {
  algorithms?: Algorithm[];
}

export const CardGrid = ({ algorithms = defaultAlgorithms }: CardGridProps) => {
  return (
    <div className="py-10">
      <div className="grid grid-cols-1 place-items-center justify-evenly gap-10 items-center sm:grid-cols-2 xl:grid-cols-4">
        {algorithms.map((algorithm) => (
          <CardItem key={algorithm.id} {...algorithm} />
        ))}
      </div>
    </div>
  );
};

export default CardGrid;
