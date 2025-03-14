// App.tsx - Main routing configuration
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import TrainerRepository from "./pages/TrainerRepository";
import LeadGeneration from "./pages/LeadGeneration";
import ScreeningRequestPage from "./pages/ScreeningRequest";
import './App.css'
import RfiqPage from "./pages/RfiqPage";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="trainer-repository" element={<TrainerRepository />} />
          <Route path="lead-generation" element={<LeadGeneration />} />
          <Route path="screening-request" element={<ScreeningRequestPage />} />
          <Route path="/rfiq/:trainerName" element={<RfiqPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
