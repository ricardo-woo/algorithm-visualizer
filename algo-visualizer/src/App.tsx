import "./App.css";
import { Home } from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Playground from "./pages/Playground";
import { Navbar } from "./components/Navbar";

function App() {
  return (
    <>
      <BrowserRouter basename="/algorithm-visualizer/">
        <div className="bg-background dark:bg-dark-background">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/playground" element={<Playground />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
