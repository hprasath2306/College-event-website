import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Events from "./pages/Events";
import Header from "./components/Header";
import Team from "./pages/Team";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";
import EventDetail from "./pages/EventDetail";

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
          <Route path="/events/:eventId" element={<EventDetail />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
