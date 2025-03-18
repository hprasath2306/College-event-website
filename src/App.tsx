import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Team from "./pages/Team";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";
import EventDetail from "./pages/EventDetail";
import Admin from "./pages/admin/Admin";
import Moments from "./pages/Moments";
import Schedule from "./pages/Schedule";
import StudentUpload from "./pages/admin/students/StudentUpload";
import ManageEvents from "./pages/admin/events/ManageEvents";
import CreateEvent from "./pages/admin/events/CreateEvent";
import DeleteEvent from "./pages/admin/events/DeleteEvent";
import EditEvent from "./pages/admin/events/EditEvent";
import CreateTeam from "./pages/admin/team/CreateTeam";
import ManageTeam from "./pages/admin/team/ManageTeam";
import Registration from "./pages/admin/registrations/Registration";
function App() {
  return (
    <div className="bg-[#121212] text-white min-h-screen">
      <Router>
        <Header />
        <CustomCursor />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/events" element={<Events />} /> */}
          <Route path="/team" element={<Team />} />
          <Route path="/moments" element={<Moments />} />
          <Route path="/events/:eventId" element={<EventDetail />} />
          <Route path="/schedule" element={<Schedule />} />

          <Route path="/psnaAdmin" element={<Admin />} />
          <Route path="/psnaAdmin/studentUpload" element={<StudentUpload />} />
          <Route path="/psnaAdmin/events" element={<ManageEvents />} />
          <Route path="/psnaAdmin/events/create" element={<CreateEvent />} />
          <Route path="/psnaAdmin/events/delete" element={<DeleteEvent />} />
          <Route path="/psnaAdmin/events/edit" element={<EditEvent />} />
          <Route path="/psnaAdmin/team/create" element={<CreateTeam />} />
          <Route path="/psnaAdmin/team" element={<ManageTeam />} />
          <Route path="/psnaAdmin/registrations" element={<Registration />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
