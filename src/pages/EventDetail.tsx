// src/pages/EventDetail.tsx
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import RegisterModal from '../components/RegisterModal';

// You can move this interface to a types file
interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  description: string;
  image: string;
  rules: string[];
  requirements: string[];
  prizes: {
    first: string;
    second: string;
    third: string;
  };
  coordinators: {
    name: string;
    role: string;
    phone: string;
  }[];
}

const EventDetail = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);


  useEffect(() => {
    // Simulating API call - replace with your actual data fetching
    const fetchEventDetails = () => {
      // This is example data - replace with your actual data source
      const eventsData = {
        'hack-attack': {
          id: 'hack-attack',
          title: 'Hack Attack',
          date: 'March 15, 2025',
          time: '9:00 AM - 9:00 AM (24 Hours)',
          venue: 'Main Auditorium',
          image: 'https://source.unsplash.com/1600x900/?coding',
          description: 'A 24-hour coding marathon where teams compete to build innovative solutions to real-world problems. Show off your coding skills, creativity, and problem-solving abilities in this exciting hackathon!',
          rules: [
            'Teams must consist of exactly 4 members',
            'All code must be written during the hackathon',
            'Use of open-source libraries is allowed',
            'Projects must be original work',
            'Final submission must include source code and documentation'
          ],
          requirements: [
            'Laptop with required development tools',
            'Valid college ID',
            'Power adapters',
            'Basic knowledge of programming'
          ],
          prizes: {
            first: '₹50,000',
            second: '₹30,000',
            third: '₹20,000'
          },
          coordinators: [
            {
              name: 'John Doe',
              role: 'Technical Head',
              phone: '9876543210'
            },
            {
              name: 'Jane Smith',
              role: 'Event Coordinator',
              phone: '9876543211'
            }
          ]
        }
        // Add more events as needed
      };

      setLoading(true);
      setTimeout(() => {
        const foundEvent = eventsData[eventId as keyof typeof eventsData];
        setEvent(foundEvent || null);
        setLoading(false);
      }, 500); // Simulated loading delay
    };

    fetchEventDetails();
  }, [eventId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#FF3366]"></div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-3xl font-bold mb-4">Event Not Found</h1>
        <p className="text-gray-400 mb-8">The event you're looking for doesn't exist.</p>
        <Link 
          to="/events"
          className="bg-[#FF3366] text-white px-6 py-2 rounded-full hover:bg-[#ff1f57] transition-colors"
        >
          Back to Events
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <div className="relative h-[60vh]">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${event.image})` }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        </div>
        <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
          <div className="max-w-7xl mx-auto w-full">
            <h1 className="text-4xl md:text-6xl font-['Righteous'] mb-4">
              {event.title}
            </h1>
            <div className="flex flex-wrap gap-6 text-lg">
              <span className="flex items-center gap-2">
                <i className="fas fa-calendar"></i> {event.date}
              </span>
              <span className="flex items-center gap-2">
                <i className="fas fa-clock"></i> {event.time}
              </span>
              <span className="flex items-center gap-2">
                <i className="fas fa-map-marker-alt"></i> {event.venue}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <section>
              <h2 className="text-2xl font-['Righteous'] mb-4">About the Event</h2>
              <p className="text-gray-300">{event.description}</p>
            </section>

            <section>
              <h2 className="text-2xl font-['Righteous'] mb-4">Rules</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                {event.rules.map((rule, index) => (
                  <li key={index}>{rule}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-['Righteous'] mb-4">Requirements</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                {event.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Prize Pool */}
            <div className="bg-[#1a1a1a] p-6 rounded-xl">
              <h3 className="text-xl font-['Righteous'] mb-4">Prize Pool</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-2xl">🥇</span>
                  <div>
                    <div className="text-sm text-gray-400">First Prize</div>
                    <div className="text-xl font-semibold">{event.prizes.first}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-2xl">🥈</span>
                  <div>
                    <div className="text-sm text-gray-400">Second Prize</div>
                    <div className="text-xl font-semibold">{event.prizes.second}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-2xl">🥉</span>
                  <div>
                    <div className="text-sm text-gray-400">Third Prize</div>
                    <div className="text-xl font-semibold">{event.prizes.third}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Coordinators */}
            <div className="bg-[#1a1a1a] p-6 rounded-xl">
              <h3 className="text-xl font-['Righteous'] mb-4">Event Coordinators</h3>
              <div className="space-y-4">
                {event.coordinators.map((coordinator, index) => (
                  <div key={index} className="flex flex-col gap-1">
                    <div className="font-semibold">{coordinator.name}</div>
                    <div className="text-sm text-gray-400">{coordinator.role}</div>
                    <a 
                      href={`tel:${coordinator.phone}`}
                      className="text-[#FF3366] hover:text-[#ff1f57] transition-colors"
                    >
                      {coordinator.phone}
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Register Button */}
            <button 
              onClick={() => setIsModalOpen(true)}
              className="w-full bg-[#FF3366] text-white py-3 rounded-xl
                         hover:bg-[#ff1f57] transition-colors font-semibold"
            >
              Register Now
            </button>
          </div>
        </div>
      </div>
      <RegisterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        eventTitle={event.title}
      />
    </div>
  );
};

export default EventDetail;