import Card from "../components/CardGrid";
import Hero from "../components/Hero";
import { Navbar } from "../components/Navbar";

export function Home() {
  return (
    <>
      <Navbar />
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-6">
        <Hero />
        <Card />
      </div>
    </>
  );
}
