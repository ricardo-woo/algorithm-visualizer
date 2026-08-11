import "./App.css";
import { Home } from "./pages/Home";
import { HashRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <div className="bg-background">
        <HashRouter>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </HashRouter>
      </div>
    </>
  );
}

export default App;
