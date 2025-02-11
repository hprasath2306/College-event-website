import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import RegisterModal from '../components/RegisterModal';

// Event interface (move to a types file if needed)
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
    second?: string;
    third?: string;
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
    const fetchEventDetails = () => {
      const eventsData: Event[] = [
        {
          id: 'oops-fix-it',
          title: 'Oops! Fix It',
          date: '2025-03-15',
          time: '90 Minutes',
          venue: 'TBA',
          image: 'https://example.com/images/oops-fix-it.jpg',
          description: 'This coding competition challenges participants to identify and fix bugs...',
          rules: [
            'Teams must consist of exactly 4 members',
            'All code must be written during the hackathon',
            'Use of open-source libraries is allowed',
            'Projects must be original work',
            'Final submission must include source code and documentation',
          ],
          requirements: ['Laptop with required development tools', 'Valid college ID', 'Power adapters'],
          prizes: {
            first: '₹50,000',
            second: '₹30,000',
            third: '₹20,000',
          },
          coordinators: [
            { name: 'John Doe', role: 'Technical Head', phone: '9876543210' },
            { name: 'Jane Smith', role: 'Event Coordinator', phone: '9876543211' },
          ],
        },
      ];

      setLoading(true);
      setTimeout(() => {
        const foundEvent = eventsData.find((event) => event.id === eventId);
        setEvent(foundEvent || null);
        setLoading(false);
      }, 500);
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
        <Link to="/events" className="bg-[#FF3366] text-white px-6 py-2 rounded-full hover:bg-[#ff1f57]">
          Back to Events
        </Link>
      </div>
    );
  }

  const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <div className="relative h-[60vh]">
        <div className="absolute inset-0">
          <img src={event.image} className="w-full h-full object-cover" alt={event.title} />
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        </div>
        <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
          <div className="max-w-7xl mx-auto w-full">
            <h1 className="text-4xl md:text-6xl font-['Righteous'] mb-4">{event.title}</h1>
            <div className="flex flex-wrap gap-6 text-lg">
              <span className="flex items-center gap-2">
                <i className="fas fa-calendar"></i> {formattedDate}
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
          <div className="lg:col-span-2 space-y-8">
            <section>
              <h2 className="text-2xl font-['Righteous'] mb-4">About the Event</h2>
              <p className="text-gray-300">{event.description}</p>
            </section>

            {event.rules.length > 0 && (
              <section>
                <h2 className="text-2xl font-['Righteous'] mb-4">Rules</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                  {event.rules.map((rule, index) => <li key={index}>{rule}</li>)}
                </ul>
              </section>
            )}

            {event.requirements.length > 0 && (
              <section>
                <h2 className="text-2xl font-['Righteous'] mb-4">Requirements</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                  {event.requirements.map((req, index) => <li key={index}>{req}</li>)}
                </ul>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="bg-[#1a1a1a] p-6 rounded-xl">
              <h3 className="text-xl font-['Righteous'] mb-4">Prize Pool</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-2xl">🥇</span>
                  <div className="text-xl font-semibold">{event.prizes.first}</div>
                </div>
                {event.prizes.second && (
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">🥈</span>
                    <div className="text-xl font-semibold">{event.prizes.second}</div>
                  </div>
                )}
              </div>
            </div>

            <button onClick={() => setIsModalOpen(true)} className="w-full bg-[#FF3366] text-white py-3 rounded-xl hover:bg-[#ff1f57]">
              Register Now
            </button>
          </div>
        </div>
      </div>
      <RegisterModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} eventTitle={event.title} />
    </div>
  );
};

export default EventDetail;
