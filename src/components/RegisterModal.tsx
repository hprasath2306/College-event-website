import { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { EventDetailsType } from "../types/event";

interface Registration {
  id: string;
  eventTitle: string;
  studentIds: string[];
}

interface TeamMember {
  id: string;
  name: string;
  regNo: string;
}

interface Student {
  id: string;
  name: string;
  regNo: string;
  registrations: Registration[];
  TeamMember: TeamMember[];
}

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventTitle: string;
}

interface RegistrationResponse {
  message: string;
  registration?: {
    id: string;
    studentId: string;
    eventId: string;
  };
}

const RegisterModal = ({ isOpen, onClose, eventTitle }: RegisterModalProps) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [searchQueries, setSearchQueries] = useState<string[]>(['']);
  const [selectedStudents, setSelectedStudents] = useState<(Student | null)[]>([]);
  const [loading, setLoading] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [error, setError] = useState('');
  const [eventDetails, setEventDetails] = useState<EventDetailsType | null>(null);

  useEffect(() => {
    // Fetch event details and students when modal opens
    if (isOpen) {
      fetchEventDetails();
      fetchStudents();
    }
  }, [isOpen, eventTitle]);

  const fetchEventDetails = async () => {
    try {
      const response = await axios.get('https://symposium-api-production.up.railway.app/api/events');
      const event = response.data.find((e: EventDetailsType) => e.name === eventTitle);
      if (event) {
        setEventDetails(event);
        // Initialize arrays based on team size
        const size = event.maxTeamSize || 1;
        setSearchQueries(new Array(size).fill(''));
        setSelectedStudents(new Array(size).fill(null));
        setError('');
      }
    } catch (error) {
      console.error('Error fetching event details:', error);
      setError('Failed to fetch event details');
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await axios.get('https://symposium-api-production.up.railway.app/api/students');
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
      setError('Failed to fetch students');
    }
  };

  const handleSearchChange = (value: string, index: number) => {
    const newQueries = [...searchQueries];
    newQueries[index] = value;
    setSearchQueries(newQueries);
  };

  const handleStudentSelect = (student: Student, index: number) => {
    // Check if student is already selected
    if (selectedStudents.some(s => s?.id === student.id)) {
      setError('This student is already selected');
      return;
    }

    const newSelectedStudents = [...selectedStudents];
    newSelectedStudents[index] = student;
    setSelectedStudents(newSelectedStudents);
    
    // Clear the search query for this position
    const newQueries = [...searchQueries];
    newQueries[index] = '';
    setSearchQueries(newQueries);
  };

  const handleSubmit = async () => {
    if (!eventDetails) {
      setError('Event details not found');
      return;
    }

    if (selectedStudents.length !== (eventDetails?.maxTeamSize || 1)) {
      setError(`Please select ${eventDetails?.maxTeamSize || 1} team member${(eventDetails?.maxTeamSize || 1) > 1 ? 's' : ''}`);
      return;
    }

    setLoading(true);
    try {
      // Single event registration
      if (!eventDetails.isTeamEvent) {
        const response = await axios.post<RegistrationResponse>(
          'https://symposium-api-production.up.railway.app/api/registrations/single',
          {
            studentId: selectedStudents[0]?.id,
            eventId: eventDetails.id
          }
        );
        
        setRegistered(true);
        setTimeout(() => {
          onClose();
          setRegistered(false);
          setSelectedStudents(new Array(eventDetails.maxTeamSize || 1).fill(null));
          setSearchQueries(new Array(eventDetails.maxTeamSize || 1).fill(''));
        }, 2000);
      } else {
        // Team registration
        const response = await axios.post('https://symposium-api-production.up.railway.app/api/registrations/team', {
          eventId: eventDetails.id,
          studentIds: selectedStudents.map(student => student?.id)
        });
        
        setRegistered(true);
        setTimeout(() => {
          onClose();
          setRegistered(false);
          setSelectedStudents(new Array(eventDetails.maxTeamSize || 1).fill(null));
          setSearchQueries(new Array(eventDetails.maxTeamSize || 1).fill(''));
        }, 2000);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.error || 'Registration failed. Please try again.');
      } else {
        setError('Registration failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-[#1a1a1a] rounded-xl p-8 m-4 animate-modalSlideIn pointer-events-auto">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          disabled={loading || registered}
        >
          <i className="fas fa-times text-xl" />
        </button>

        {/* Modal Content */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-['Righteous'] mb-2">Register for</h2>
          <p className="text-[#FF3366] text-xl">{eventTitle}</p>
          <p className="text-gray-400 mt-2">Team Size: {eventDetails?.maxTeamSize || 1}</p>
        </div>

        {/* Team Member Selection */}
        <div className="space-y-4">
          {searchQueries.map((query, index) => (
            <div key={index} className="relative">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                {(eventDetails?.maxTeamSize || 1) > 1 ? `Team Member ${index + 1}` : 'Participant'}
              </label>
              
              {selectedStudents[index] ? (
                <div className="flex items-center justify-between bg-gray-800 p-3 rounded-lg">
                  <div>
                    <p className="text-white">{selectedStudents[index].name}</p>
                    <p className="text-sm text-gray-400">{selectedStudents[index].regNo}</p>
                  </div>
                  <button
                    onClick={() => {
                      const newSelected = [...selectedStudents];
                      newSelected[index] = null;
                      setSelectedStudents(newSelected);
                    }}
                    className="text-red-400 hover:text-red-300"
                  >
                    <i className="fas fa-times" />
                  </button>
                </div>
              ) : (
                <>
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => handleSearchChange(e.target.value, index)}
                    placeholder="Search by name or register number"
                    className="w-full px-4 py-2 bg-[#252525] border border-gray-700 rounded-lg
                             focus:outline-none focus:border-[#FF3366] transition-colors
                             text-white placeholder-gray-500"
                  />
                  
                  {/* Search Results */}
                  {query && (
                    <div className="absolute z-10 w-full mt-1 bg-[#252525] border border-gray-700 rounded-lg max-h-48 overflow-y-auto">
                      {students
                        .filter(student => 
                          (student.name.toLowerCase().includes(query.toLowerCase()) ||
                           student.regNo.toLowerCase().includes(query.toLowerCase())) &&
                          !selectedStudents.some(s => s?.id === student.id)
                        )
                        .map(student => (
                          <div
                            key={student.id}
                            onClick={() => handleStudentSelect(student, index)}
                            className="p-3 hover:bg-gray-700 cursor-pointer"
                          >
                            <p className="text-white">{student.name}</p>
                            <p className="text-sm text-gray-400">{student.regNo}</p>
                          </div>
                        ))
                      }
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>

        {error && (
          <p className="text-red-400 mt-4 text-center">{error}</p>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading || registered || selectedStudents.length !== (eventDetails?.maxTeamSize || 1)}
          className="w-full bg-[#FF3366] text-white py-3 rounded-lg mt-6
                   hover:bg-[#ff1f57] transition-colors font-semibold
                   disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Registering...' : 'Confirm Registration'}
        </button>

        {/* Success Message */}
        <AnimatePresence>
          {registered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#1a1a1a]/90 backdrop-blur-sm rounded-xl flex items-center justify-center"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-check text-2xl text-white" />
                </div>
                <p className="text-white text-xl">Registration Successful!</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RegisterModal;