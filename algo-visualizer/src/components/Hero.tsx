import { Button } from "./Button";
import { FeaturedViewport } from "./FeaturedViewport";

export const Hero = () => {
  return (
    <section>
      <div className="flex flex-col items-center gap-15 py-10 pb-20 lg:flex-row">
        <div className="w-auto lg:w-1/2">
          <h1 className="font-oxanium font-bold text-foreground dark:text-dark-foreground text-5xl ">
            ALGORITHMS FOR GAME DEVELOPERS
          </h1>
          <p className="font-oxanium text-muted dark:text-dark-muted mt-4 mb-8 pr-15 text-justify">
            Explore how algorithms work through interactive visualizations.
            Watch each step, experiment with different algorithms and build a
            deeper understanding of how they solve problems.
          </p>
          <div className="flex gap-4">
            <Button bgcolor="bg-accent" display="Find Algorithms" />
            <Button
              bgcolor="bg-secondary"
              txtcolor="text-white"
              display="Try it out →"
            />
          </div>
        </div>
        <div className="w-full lg:w-1/2">
          <FeaturedViewport />
        </div>
      </div>
    </section>
  );
};

export default Hero;
