import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

interface Student {
  id: string;
  name: string;
  email: string;
  department: string;
  year: string;
  rollNo: string;
  regNo: string;
}

interface Team {
  id: string;
  name: string;
  members: {
    student: Student;
  }[];
}

interface Event {
  id: string;
  name: string;
  isTeamEvent: boolean;
}

interface Registration {
  id: string;
  event: Event;
  student: Student | null;
  team: Team | null;
  createdAt: string;
}

const Registration = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<string>('');
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchEvents();
    fetchRegistrations();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('https://symposium-api-production.up.railway.app/api/events');
      setEvents(response.data);
    } catch (error) {
      setError('Failed to fetch events');
    }
  };

  const fetchRegistrations = async () => {
    try {
      const response = await axios.get('https://symposium-api-production.up.railway.app/api/registrations');
      setRegistrations(response.data);
    } catch (error) {
      setError('Failed to fetch registrations');
    } finally {
      setLoading(false);
    }
  };

  const filteredRegistrations = selectedEvent
    ? registrations.filter(reg => reg.event.id === selectedEvent)
    : registrations;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#FF3366]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 pt-24">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-['Righteous'] mb-4">
            Event Registrations
          </h1>
          <p className="text-gray-400 text-lg">
            View and manage event registrations
          </p>
        </div>

        {/* Event Filter */}
        <div className="mb-8">
          <select
            value={selectedEvent}
            onChange={(e) => setSelectedEvent(e.target.value)}
            className="w-full md:w-auto bg-[#1a1a1a] border border-gray-700 rounded-lg px-4 py-2 text-white"
          >
            <option value="">All Events</option>
            {events.map((event) => (
              <option key={event.id} value={event.id}>
                {event.name}
              </option>
            ))}
          </select>
        </div>

        {/* Registrations Grid */}
        <div className="grid gap-6">
          {filteredRegistrations.map((registration) => (
            <motion.div
              key={registration.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#1a1a1a] rounded-xl p-6"
            >
              <div className="flex flex-col md:flex-row justify-between mb-4">
                <h3 className="text-xl font-semibold mb-2 md:mb-0">
                  {registration.event.name}
                </h3>
                <span className="text-[#FF3366]">
                  {new Date(registration.createdAt).toLocaleDateString()}
                </span>
              </div>

              {registration.event.isTeamEvent ? (
                // Team Registration
                <div>
                  <p className="text-gray-400 mb-2">Team: {registration.team?.name}</p>
                  <div className="grid gap-4 mt-4">
                    {registration.team?.members.map((member) => (
                      <div key={member.student.id} className="bg-[#252525] p-4 rounded-lg">
                        <p className="font-medium">{member.student.name}</p>
                        {/* <p className="text-gray-400 text-sm">{member.student.rollNo}</p> */}
                        {/* <p className="text-gray-400 text-sm"> */}
                          {/* {member.student.department} - {member.student.year} Year */}
                        {/* </p> */}
                        {/* <p className="text-gray-400 text-sm">{member.student.email}</p> */}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                // Individual Registration
                <div className="bg-[#252525] p-4 rounded-lg">
                  <p className="font-medium">{registration.student?.name}</p>
                  <p className="text-gray-400 text-sm">{registration.student?.rollNo}</p>
                  <p className="text-gray-400 text-sm">
                    {/* {registration.student?.department} - {registration.student?.year} Year */}
                  </p>
                  <p className="text-gray-400 text-sm">{registration.student?.regNo}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {filteredRegistrations.length === 0 && (
          <div className="text-center text-gray-400 py-12">
            No registrations found
          </div>
        )}
      </div>
    </div>
  );
};

export default Registration;
