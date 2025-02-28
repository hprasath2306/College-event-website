import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import * as XLSX from 'xlsx';

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

  const exportToExcel = () => {
    const dataToExport = filteredRegistrations.reduce((acc: any[], registration) => {
      if (registration.event.isTeamEvent && registration.team) {
        // Add team header row
        acc.push({
          'Event Name': registration.event.name,
          'Registration Date': new Date(registration.createdAt).toLocaleDateString(),
          'Registration Type': 'Team',
          'Team Name': registration.team.name,
          'Participant Name': '',
          'Roll No': '',
          'Registration No': '',
          'Department': '',
          'Year': '',
          'Email': ''
        });

        // Add team members
        registration.team.members.forEach(member => {
          acc.push({
            'Event Name': '',
            'Registration Date': '',
            'Registration Type': '',
            'Team Name': '↳', // Arrow indicating team member
            'Participant Name': member.student.name,
            'Roll No': member.student.rollNo,
            'Registration No': member.student.regNo,
            'Department': member.student.department,
            'Year': member.student.year,
            'Email': member.student.email
          });
        });

        // Add empty row for spacing between teams
        acc.push({
          'Event Name': '',
          'Registration Date': '',
          'Registration Type': '',
          'Team Name': '',
          'Participant Name': '',
          'Roll No': '',
          'Registration No': '',
          'Department': '',
          'Year': '',
          'Email': ''
        });
      } else {
        // Individual events
        acc.push({
          'Event Name': registration.event.name,
          'Registration Date': new Date(registration.createdAt).toLocaleDateString(),
          'Registration Type': 'Individual',
          'Team Name': '-',
          'Participant Name': registration.student?.name,
          'Roll No': registration.student?.rollNo,
          'Registration No': registration.student?.regNo,
          'Department': registration.student?.department,
          'Year': registration.student?.year,
          'Email': registration.student?.email
        });

        // Add empty row for spacing between registrations
        acc.push({
          'Event Name': '',
          'Registration Date': '',
          'Registration Type': '',
          'Team Name': '',
          'Participant Name': '',
          'Roll No': '',
          'Registration No': '',
          'Department': '',
          'Year': '',
          'Email': ''
        });
      }
      return acc;
    }, []);

    const ws = XLSX.utils.json_to_sheet(dataToExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Registrations');

    // Auto-size columns
    const colWidths = Object.keys(dataToExport[0] || {}).map(key => ({
      wch: Math.max(key.length, 20)
    }));
    ws['!cols'] = colWidths;

    // Add some style to the worksheet
    const range = XLSX.utils.decode_range(ws['!ref'] || 'A1');
    for (let R = range.s.r; R <= range.e.r; ++R) {
      for (let C = range.s.c; C <= range.e.c; ++C) {
        const cell_address = {r: R, c: C};
        const cell_ref = XLSX.utils.encode_cell(cell_address);
        if (!ws[cell_ref]) continue;
        
        // Make the header row bold
        if (R === 0) {
          ws[cell_ref].s = {
            font: { bold: true },
            fill: { fgColor: { rgb: "EFEFEF" } }
          };
        }
      }
    }

    XLSX.writeFile(wb, `Event_Registrations_${new Date().toLocaleDateString()}.xlsx`);
  };

  if(error){
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

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
        <div className="mb-8 flex justify-between items-center">
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
          
          <button
            onClick={exportToExcel}
            className="bg-[#FF3366] hover:bg-[#FF4D7D] text-white px-6 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Export to Excel
          </button>
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
