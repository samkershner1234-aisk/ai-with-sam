import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AiTimeWasteAudit from "./pages/AiTimeWasteAudit";
import Teams from "./pages/Teams";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ai-time-waste-audit" element={<AiTimeWasteAudit />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
    );
}

export default App;
