import Hero from "../components/Hero";
import { Navbar } from "../components/Navbar";

export function Home() {
  return (
    <>
      <div className="px-50">
        <Navbar />
        <Hero />
      </div>
    </>
  );
}
