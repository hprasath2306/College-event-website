// src/pages/Events.tsx
import { useEffect, useState } from 'react';
import EventCard from '../components/EventCard';
import { fetchEventsDetails } from '../utils/events';
import { Event, EventDetailsType } from '../types/event';
import { differenceInHours } from 'date-fns';

const Events = () => {
  const [activeCategory, setActiveCategory] = useState('all');  
  const [eventsDetailsData, setEventsDetailsData] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await fetchEventsDetails();
        setEventsDetailsData(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const filteredEvents = activeCategory === 'all' 
    ? eventsDetailsData 
    : eventsDetailsData.filter(event => 
        event.category === (activeCategory === 'technical' ? 'TECHNICAL' : 'NON_TECHNICAL')
      );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#FF3366]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden align-center">
        {/* Background Image with Overlay */}

        {/* Content */}
        <div className="relative z-10 text-center px-4 mt-30">
          <h1 className="text-6xl md:text-7xl font-['Righteous'] mb-4 animate-slideDown">
            Our <span className="text-[#FFF]">Events</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto animate-slideUp">
            Choose from our exciting range of technical and cultural events!
          </p>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-2 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Category Filters */}
          <div className="flex justify-center gap-4 mb-12 overflow-x-auto pb-4">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-6 py-2 rounded-full transition-all duration-300
                        ${activeCategory === 'all'
                          ? 'bg-[#FF3366] text-white'
                          : 'bg-[#1a1a1a] text-gray-400 hover:bg-[#FF3366]/10'
                        }`}
            >
              All Events
            </button>
            <button
              onClick={() => setActiveCategory('technical')}
              className={`px-6 py-2 rounded-full transition-all duration-300
                        ${activeCategory === 'technical'
                          ? 'bg-[#FF3366] text-white'
                          : 'bg-[#1a1a1a] text-gray-400 hover:bg-[#FF3366]/10'
                        }`}
            >
              Technical
            </button>
            <button
              onClick={() => setActiveCategory('non-technical')}
              className={`px-6 py-2 rounded-full transition-all duration-300
                        ${activeCategory === 'non-technical'
                          ? 'bg-[#FF3366] text-white'
                          : 'bg-[#1a1a1a] text-gray-400 hover:bg-[#FF3366]/10'
                        }`}
            >
              Non Technical
            </button>
            
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event) => {              
              return (
                <div key={event.id} className="animate-fadeIn">
                  <EventCard
                    id={event.id}
                    title={event.name}
                    date={event.startDate}
                    description={event.description}
                    image={event.image}
                    duration={event.duration}
                    teamSize={`${event.maxTeamSize || 1}`}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Events;