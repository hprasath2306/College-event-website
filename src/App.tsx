import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Events from "./pages/Events";
import Header from "./components/Header";
import Team from "./pages/Team";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";
import EventDetail from "./pages/EventDetail";
import Admin from "./pages/Admin";
import Moments from "./pages/Moments";
import Schedule from "./pages/Schedule";

function App() {
  return (
    <div className="bg-[#121212] text-white min-h-screen">
      <Router>
        <Header />
        <CustomCursor />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/team" element={<Team />} />
          <Route path="/moments" element={<Moments />} />
          <Route path="/events/:eventId" element={<EventDetail />} />
          <Route path="/psnaAdmin" element={<Admin />} />
          <Route path="/schedule" element={<Schedule />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
