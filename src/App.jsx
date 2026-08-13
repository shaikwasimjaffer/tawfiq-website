import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Mission from "./pages/Mission";
import About from "./pages/About";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/mission" element={<Mission />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}
