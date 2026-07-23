import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AiTimeWasteAudit from './pages/AiTimeWasteAudit';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ai-time-waste-audit" element={<AiTimeWasteAudit />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
