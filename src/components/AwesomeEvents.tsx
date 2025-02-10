import { Link } from "react-router-dom";
import EventCard from "./EventCard";
import { Event } from "../types/event";

interface AwesomeEventsProps {
  isVisible: boolean;
}

const featuredEvents: Event[] = [
  {
    id: 'hack-attack',
    title: 'Hack Attack',
    date: 'March 15',
    description: '24-hour coding marathon. Build something!',
    image: 'https://source.unsplash.com/400x300/?coding',
    duration: '24 Hours',
    teamSize: 'Team of 4',
    prize: '₹50,000 Prize'
  },
  {
    id: 'dance-mania',
    title: 'Dance Mania',
    date: 'March 18',
    description: 'Show your moves in this epic dance battle!',
    image: 'https://source.unsplash.com/400x300/?dance',
    duration: '2 Hours',
    teamSize: 'Solo/Group',
    prize: '₹30,000 Prize'
  },
  {
    id: 'battle-of-bands',
    title: 'Battle of Bands',
    date: 'March 19',
    description: 'Rock the stage with your band!',
    image: 'https://source.unsplash.com/400x300/?music-band',
    duration: '3 Hours',
    teamSize: 'Band',
    prize: '₹45,000 Prize'
  }
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