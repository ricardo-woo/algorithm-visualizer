import { Button } from "../components/Button";
import { NavBar } from "../components/Navbar";

export function Home() {
  return (
    <>
      <NavBar />
      <h1 className="text-3xl font-bold">Home Page</h1>
      <Button display="Press" />
    </>
  );
}
