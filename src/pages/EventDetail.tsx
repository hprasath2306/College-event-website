import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import RegisterModal from '../components/RegisterModal';
import { EventDetailsType } from '../types/event';
import { fetchEventsDetails } from '../utils/events';

interface ApiError {
  message: string;
  status?: number;
}

// interface RegistrationResponse {
//   success: boolean;
//   message: string;
//   data?: {
//     registrationId: string;
//     eventId: string;
//   };
// }

// Add type for rule and requirement
type Rule = string | { id: string; eventId: string; rule: string };
type Requirement = string | { id: string; eventId: string; requirement: string };

const EventDetail = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState<EventDetailsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchEventDetails = async () => {
      setLoading(true);
      try {
        const data = await fetchEventsDetails();
        const foundEvent = data.find((event: EventDetailsType) => event.id === eventId);
        setEvent(foundEvent || null);
      } catch (error: unknown) {
        const apiError = error as ApiError;
        console.error('Error fetching event:', apiError.message);
        setEvent(null);
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [eventId]);

  // const handleRegistration = async () => {
  //   try {
  //     const response = await axios.post<RegistrationResponse>(
  //       'https://api.example.com/register',
  //       { eventId }
  //     );
  //     console.log(response.data.message);
  //   } catch (error: unknown) {
  //     const apiError = error as ApiError;
  //     console.error('Registration error:', apiError.message);
  //   }
  // };

  // const handleTeamRegistration = async () => {
  //   try {
  //     const response = await axios.post<RegistrationResponse>(
  //       'https://api.example.com/team-register',
  //       { eventId }
  //     );
  //     console.log(response.data.message);
  //   } catch (error: unknown) {
  //     const apiError = error as ApiError;
  //     console.error('Team registration error:', apiError.message);
  //   }
  // };

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

  // const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
  //   year: 'numeric',
  //   month: 'long',
  //   day: 'numeric',
  // });

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <div className="relative h-[60vh]">
        <div className="absolute inset-0">
          <img src={event.image} className="w-full h-full object-cover" alt={event.name} />
          {/* <div className="absolute inset-0 bg-black bg-opacity-60"></div> */}
        </div>
        {/* <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
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
        </div> */}
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <section>
              <h2 className="text-2xl font-['Righteous'] mb-4">About the Event</h2>
              <p className="text-gray-300 whitespace-pre-wrap font-mono text-sm" style={{ whiteSpace: 'pre-wrap' }}>
                {event.description}
              </p>
            </section>

            {event.rules.length > 0 && (
              <section>
                <h2 className="text-2xl font-['Righteous'] mb-4">Rules</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                  {event.rules.map((rule: Rule, index) => (
                    <li key={index} className="whitespace-pre-wrap" style={{ whiteSpace: 'pre-wrap' }}>
                      {typeof rule === 'string' ? rule : rule.rule}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {event.requirements.length > 0 && (
              <section>
                <h2 className="text-2xl font-['Righteous'] mb-4">Requirements</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                  {event.requirements.map((req: Requirement, index) => (
                    <li key={index} className="whitespace-pre-wrap" style={{ whiteSpace: 'pre-wrap' }}>
                      {typeof req === 'string' ? req : req.requirement}
                    </li>
                  ))}
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
                  <span className="text-2xl">🥇</span><span className="text-2xl">🥈</span><span className="text-2xl">🥉</span>
                </div>
              </div>
            </div>

            <div className="bg-[#1a1a1a] p-6 rounded-xl">
              <h3 className="text-xl font-['Righteous'] mb-4">Event Coordinators</h3>
              <div className="space-y-4">
                {event.coordinators.map((coordinator, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <span className="text-2xl">👤</span>
                    <div>
                      <p>{coordinator.name}</p>
                      <p>{coordinator.role}</p>
                      <a 
                        href={`https://wa.me/${coordinator.phone}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#FF3366] hover:text-[#ff1f57] cursor-pointer flex items-center gap-1"
                      >
                        <i className="fab fa-whatsapp"></i>
                        {coordinator.phone}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#1a1a1a] p-6 rounded-xl">
              <h3 className="text-xl font-['Righteous'] mb-4">Join Event Group</h3>
              <a 
                href="https://chat.whatsapp.com/your-group-invite-link"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#25D366] text-white py-3 rounded-xl hover:bg-[#128C7E] flex items-center justify-center gap-2 transition-colors"
              >
                <i className="fab fa-whatsapp text-xl"></i>
                Join WhatsApp Group
              </a>
            </div>

            <button onClick={() => setIsModalOpen(true)} className="w-full bg-[#FF3366] text-white py-3 rounded-xl hover:bg-[#ff1f57]">
              Register Now
            </button>
          </div>
        </div>
      </div>
      <RegisterModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} eventTitle={event.name} />
    </div>
  );
};

export default EventDetail;
