// src/pages/Events.tsx
import { useState } from 'react';
import EventCard from '../components/EventCard';

const Events = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const events = [
    {
      "id": "oops-fix-it",
      "title": "Oops! Fix It",
      "description": "This coding competition challenges participants to identify and fix bugs in various programming tasks across multiple rounds. Teams will demonstrate their debugging skills and coding efficiency to become the Bug Busters Champion.",
      "duration": "90 Minutes",
      "teamSize": "1 to 2 members (individual participation allowed)",
      "prize": "₹50,000",
      "category": "technical",
      "date": "2025-03-15",
      "image": "https://example.com/images/oops-fix-it.jpg"
    },
    {
      "id": "code-confusion-cup",
      "title": "The Code Confusion Cup",
      "description": "This coding competition challenges participants to solve problems using unconventional methods, emphasizing creativity and efficiency. Teams will navigate through multiple rounds with unique constraints to become the champions.",
      "duration": "90 Minutes",
      "teamSize": "1 to 2 members (individual participation allowed)",
      "prize": "₹50,000",
      "category": "technical",
      "date": "2025-03-16",
      "image": "https://example.com/images/code-confusion-cup.jpg"
    },
    {
      "id": "code-free",
      "title": "Code Free",
      "description": "This unique competition challenges participants to solve problems without writing any code. Teams will explain their solutions using words, pseudocode, or diagrams, emphasizing clarity and creativity.",
      "duration": "90 Minutes",
      "teamSize": "1 to 2 members (individual participation allowed)",
      "prize": "₹50,000",
      "category": "technical",
      "date": "2025-03-17",
      "image": "https://example.com/images/code-free.jpg"
    },
    {
      "id": "logical-baton",
      "title": "Logical Baton",
      "description": "This collaborative coding competition requires teams to work sequentially on a program, with each member responsible for a specific part. Teams must ensure their final program compiles and runs correctly, emphasizing teamwork.",
      "duration": "35 Minutes",
      "teamSize": "Exactly 3 members (no substitutions allowed)",
      "prize": "₹50,000",
      "category": "technical",
      "date": "2025-03-18",
      "image": "https://example.com/images/logical-baton.jpg"
    },
    {
      "id": "pitch-perfect",
      "title": "Pitch Perfect",
      "description": "This competition challenges teams to present innovative ideas and defend them in a Q&A session. Teams will showcase their creativity, feasibility, and impact through structured presentations and articulate responses to judges.",
      "duration": "17 Minutes",
      "teamSize": "1 to 3 members (individual participation allowed)",
      "prize": "₹50,000",
      "category": "technical",
      "date": "2025-03-19",
      "image": "https://example.com/images/pitch-perfect.jpg"
    },
    {
      "id": "code-dejavu",
      "title": "Code Dejavu",
      "description": "This unique competition challenges participants to solve problems without writing any code. Teams will explain their solutions using words, pseudocode, or diagrams, emphasizing clarity and creativity.",
      "duration": "90 Minutes",
      "teamSize": "1 to 2 members (individual participation allowed)",
      "prize": "₹50,000",
      "category": "technical",
      "date": "2025-03-20",
      "image": "https://example.com/images/code-dejavu.jpg"
    },
    {
      "id": "mock-job-interview",
      "title": "Mock Job Interview",
      "description": "This individual event simulates a real-world job interview, consisting of a Technical Round and an HR Round. Participants will demonstrate their technical knowledge, problem-solving abilities, and communication skills in front of a panel.",
      "duration": "25 Minutes",
      "teamSize": "Individual participation only",
      "prize": "Feedback for improvement",
      "category": "professional development",
      "date": "2025-03-21",
      "image": "https://example.com/images/mock-job-interview.jpg"
    },
    {
      "id": "design-under-pressure",
      "title": "Design Under Pressure – Figma/Adobe XD Challenge",
      "description": "A design competition where teams of two work under time pressure to create a poster with an open theme. Every 20 minutes, a new hindrance or element will be added, testing creativity.",
      "duration": "1 Hour",
      "teamSize": "2 members per team",
      "prize": "Recognition and feedback from judges",
      "category": "design",
      "date": "2025-03-22",
      "image": "https://example.com/images/design-under-pressure.jpg"
    },
    {
      "id": "bite-bidders",
      "title": "Bite Bidders",
      "description": "A competitive event where teams of two participate in a tech quiz and a coding bidding challenge. Teams will test their technical knowledge and coding skills to become the BITE BIDDERS CHAMPIONS!",
      "duration": "40 Minutes",
      "teamSize": "2 members per team",
      "prize": "Recognition and prizes for the winning team",
      "category": "technical",
      "date": "2025-03-23",
      "image": "https://example.com/images/bite-bidders.jpg"
    },
    {
      "id": "code-with-comali",
      "title": "Code with Comali",
      "description": "A unique coding competition where teams of two work together, with one member guiding the other in solving coding problems and recreating designs. Effective communication and teamwork are essential for success.",
      "duration": "35 Minutes",
      "teamSize": "2 members per team",
      "prize": "Recognition and prizes for the winning team",
      "category": "technical",
      "date": "2025-03-24",
      "image": "https://example.com/images/code-with-comali.jpg"
    },
    {
      "id": "mini-marvels",
      "title": "MINI MARVELS",
      "description": "This fireless cooking competition celebrates the artistic presentation of miniature dishes. Teams will transform raw, edible ingredients into visually stunning, bite-sized creations, showcasing their culinary artistry.",
      "duration": "1 Hour",
      "teamSize": "Teams of 4 (mix of any year)",
      "prize": "₹50,000",
      "category": "non-technical",
      "date": "2025-03-25",
      "image": "https://example.com/images/mini-marvels.jpg"
    },
    {
      "id": "digital-dynamo",
      "title": "DIGITAL DYNAMO",
      "description": "A fun quiz competition focusing on general tech knowledge, computer science basics, famous personalities, trends, and innovations. Teams will compete in multiple rounds to showcase their knowledge and skills.",
      "duration": "Variable (2 Rounds)",
      "teamSize": "2 to 3 members per team",
      "prize": "Recognition and prizes for the winning team",
      "category": "non-technical",
      "date": "2025-03-26",
      "image": "https://example.com/images/digital-dynamo.jpg"
    },
    {
      "id": "tech-pictionary",
      "title": "TECH PICTIONARY",
      "description": "A fun and interactive game where players draw technical terms while their team guesses the term within a time limit. Teams will showcase their creativity and knowledge of tech vocabulary and trends.",
      "duration": "Variable (3 Rounds)",
      "teamSize": "3 to 6 players per team",
      "prize": "Recognition and prizes for the winning team",
      "category": "non-technical",
      "date": "2025-03-27",
      "image": "https://example.com/images/tech-pictionary.jpg"
    },
    {
      "id": "ipl-auction",
      "title": "IPL Auction",
      "description": "A competitive event where teams participate in an IPL trivia quiz followed by a player auction. Teams will build their rosters based on trivia performance and strategic bidding to create the strongest lineup.",
      "duration": "Variable (2 Rounds)",
      "teamSize": "3 players per team",
      "prize": "Recognition and prizes for the winning team",
      "category": "non-technical",
      "date": "2025-03-28",
      "image": "https://example.com/images/ipl-auction.jpg"
    },
    {
      "id": "clipcraft",
      "title": "CLIPCRAFT",
      "description": "An exciting event where participants create short reel-like video clips (1-2 minutes) that convey interesting concepts related to technology, college life, or social themes. The best reel will be selected based on creativity, clarity, and audience.",
      "duration": "1-2 Minutes",
      "teamSize": "Individual participation 3 members",
      "prize": "Recognition and prizes for the winning team",
      "category": "non-technical",
      "date": "2025-03-29",
      "image": "https://example.com/images/clipcraft.jpg"
    },
    {
      "id": "escape-room",
      "title": "ESCAPE ROOM",
      "description": "A mystery-based puzzle-solving game where teams solve a series of clues, riddles, and challenges to 'escape' from the room within a given time limit. Teams will participate in a tabletop escape challenge, solving puzzles.",
      "duration": "TBD",
      "teamSize": "2 members per team",
      "prize": "Recognition and prizes for the winning team",
      "category": "non-technical",
      "date": "2025-03-30",
      "image": "https://example.com/images/escape-room.jpg"
    }
  ]
  

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