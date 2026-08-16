import "./App.css";
import { Home } from "./pages/Home";
import { HashRouter, Routes, Route } from "react-router-dom";
import Playground from "./pages/Playground";
import { Navbar } from "./components/Navbar";
import Learn from "./pages/Learn";

function App() {
  return (
    <>
      <HashRouter>
        <div className="bg-background dark:bg-dark-background">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/playground" element={<Playground />} />
            <Route path="/learn" element={<Learn />} />
          </Routes>
        </div>
      </HashRouter>
    </>
  );
}

export default App;
