import { Link } from "react-router-dom";
import EventCard from "./EventCard";
import { Event } from "../types/event";
import BiteBiddersBanner from '../assets/bite-bidders-banner.svg'
import DesignUnderPressureBanner from '../assets/design-pressure-banner.svg'
import OopsBanner from '../assets/oops-banner.svg'
interface AwesomeEventsProps {
  isVisible: boolean;
}

const featuredEvents: Event[] = [
  {
    "id": "bite-bidders",
    "title": "Bite Bidders",
    "description": "A team-based competition where participants take a tech quiz and bid on coding challenges, with the highest-scoring team winning. The event is open to all students of CSE branch.",
    "duration": "40 Minutes",
    "teamSize": "2 members",
    "category": "technical",
    "date": "2025-03-23",
    "image": BiteBiddersBanner
  },
  {
    "id": "design-under-pressure",
    "title": "Design Under Pressure",
    "description": "A solo design challenge where participants create a poster using Figma or Adobe XD, adapting to unexpected design constraints every 20 minutes focusing on creativity and time management.",
    "duration": "60 Minutes",
    "teamSize": "1 member",
    "category": "technical",
    "date": "2025-03-22",
    "image": DesignUnderPressureBanner
  },
  {
    "id": "oops-fix-it",
    "title": "Oops! Fix It",
    "description": "A solo debugging competition where participants identify, fix, and optimize buggy code under time constraints across three rounds. The event is open to all students of any branch and year.",
    "duration": "90 Minutes",
    "teamSize": "1 member",
    "category": "technical",
    "date": "2025-03-15",
    "image": OopsBanner
  },
];

const AwesomeEvents = ({ isVisible }: AwesomeEventsProps) => {
  return (
    <section 
      id="events-section"
      className={`py-20 px-4 transition-all duration-1000 transform
                 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-['Righteous'] text-center mb-12">
          Our <span className="text-[#FF3366]">Awesome</span> Events
        </h2>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredEvents.map((event) => (
            <EventCard
              key={event.id}
              {...event}
            />
          ))}
        </div>

        {/* View All Events Link */}
        <div className="text-center">
          <Link
            to="/events"
            className="inline-flex items-center gap-2 text-[#FF3366] hover:text-[#ff1f57] 
                     font-semibold text-lg transition-colors group"
          >
            View All Events 
            <i className="fas fa-arrow-right transform group-hover:translate-x-1 transition-transform"></i>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AwesomeEvents;