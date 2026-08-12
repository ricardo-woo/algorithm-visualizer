import { Button } from "./Button";

interface CardItemProps {
  title?: string;
  description?: string;
  worstcase?: string;
}

const algorithms = [
  {
    title: "A* SEARCH",
    description:
      "A* finds the shortest path by considering both the distance traveled and the estimated distance to the goal.",
    worstcase: "O(bᵈ)",
  },
  {
    title: "BREADTH FIRST SEARCH",
    description:
      "BFS explores nodes level by level to find the shortest path in an unweighted graph.",
    worstcase: "O(V + E)",
  },
];

const CardItem = ({ title, description, worstcase }: CardItemProps) => {
  return (
    <div className="rounded w-full transition-all delay-25 duration-200 ease-in-out hover:scale-105 h-full outline-secondary outline-2 font-tech p-6 dark:text-dark-foreground">
      <h1 className="mt-4 text-lg">{title}</h1>
      <p className="text-justify my-6 text-muted dark:text-dark-muted">
        {description}
      </p>
      <div className="flex mb-10 flex-row items-center justify-between">
        <p>Worst Case</p>
        <p className="text-secondary text-sm">{worstcase}</p>
      </div>
      <Button
        width="w-full"
        display="View →"
        bgcolor="bg-accent"
        txtcolor="text-foreground"
      />
    </div>
  );
};

export const CardGrid = () => {
  return (
    <div className="py-10">
      <div className="grid grid-cols-1 place-items-center justify-evenly gap-20 items-center sm:grid-cols-2 xl:grid-cols-4">
        {algorithms.map((algorithm) => (
          <CardItem
            key={algorithm.title}
            title={algorithm.title}
            description={algorithm.description}
            worstcase={algorithm.worstcase}
          />
        ))}
      </div>
    </div>
  );
};

export default CardGrid;
