import Card from "../components/CardGrid";
import Hero from "../components/Hero";
import { Navbar } from "../components/Navbar";

export function Home() {
  return (
    <>
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-6">
        <Navbar />
        <Hero />
        <Card />
      </div>
    </>
  );
}
