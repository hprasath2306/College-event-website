// src/pages/Events.tsx
import { useState } from 'react';
import EventCard from '../components/EventCard';

const Events = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const events = [
    {
      id: 'hack-attack',
      title: 'Hack Attack',
      date: 'March 15',
      description: '24-hour coding marathon. Build awesome!',
      image: 'https://source.unsplash.com/1600x900/?coding',
      duration: '24 Hours',
      teamSize: 'Team of 4',
      prize: '₹50,000',
      category: 'technical'
    },
    {
      id: 'dance-mania',
      title: 'Dance Mania',
      date: 'March 18',
      description: 'Show your moves in this epic dance battle!',
      image: 'https://source.unsplash.com/1600x900/?dance',
      duration: '2 Hours',
      teamSize: 'Solo/Group',
      prize: '₹30,000',
      category: 'cultural'
    },
    {
      id: 'battle-of-bands',
      title: 'Battle of Bands',
      date: 'March 19',
      description: 'Rock the stage with your band!',
      image: 'https://source.unsplash.com/1600x900/?music-band',
      duration: '3 Hours',
      teamSize: 'Band',
      prize: '₹45,000',
      category: 'cultural'
    },
    // Add more events as needed
  ];

  const filteredEvents = activeCategory === 'all' 
    ? events 
    : events.filter(event => event.category === activeCategory);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden align-center">
        {/* Background Image with Overlay */}

        {/* Content */}
        <div className="relative z-10 text-center px-4 mt-30">
          <h1 className="text-6xl md:text-7xl font-['Righteous'] mb-4 animate-slideDown">
            Our <span className="text-[#FF3366]">Events</span>
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
              onClick={() => setActiveCategory('cultural')}
              className={`px-6 py-2 rounded-full transition-all duration-300
                        ${activeCategory === 'cultural'
                          ? 'bg-[#FF3366] text-white'
                          : 'bg-[#1a1a1a] text-gray-400 hover:bg-[#FF3366]/10'
                        }`}
            >
              Non Technical
            </button>
            
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event) => (
              <div key={event.id} className="animate-fadeIn">
                <EventCard
                  id={event.id}
                  title={event.title}
                  date={event.date}
                  description={event.description}
                  image={event.image}
                  duration={event.duration}
                  teamSize={event.teamSize}
                  prize={event.prize}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Events;