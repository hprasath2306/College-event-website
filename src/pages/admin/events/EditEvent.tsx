import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { EventDetailsType } from '../../../types/event';

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (event: Partial<EventDetailsType>) => void;
  event: EventDetailsType | null;
  isLoading: boolean;
}

const EditModal = ({ isOpen, onClose, onSave, event, isLoading }: EditModalProps) => {
  const [formData, setFormData] = useState<Partial<EventDetailsType>>({});
  const [coordinators, setCoordinators] = useState<Array<{ name: string; role: string; phone: string }>>([]);
  const [rules, setRules] = useState<string[]>([]);
  const [requirements, setRequirements] = useState<string[]>([]);

  useEffect(() => {
    if (event) {
      setFormData(event);
      setCoordinators(event.coordinators || [{ name: '', role: '', phone: '' }]);
      setRules(event.rules.map(r => typeof r === 'string' ? r : r.rule));
      setRequirements(event.requirements.map(r => typeof r === 'string' ? r : r.requirement));
    }
  }, [event]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addCoordinator = () => {
    setCoordinators([...coordinators, { name: '', role: '', phone: '' }]);
  };

  const addRule = () => {
    setRules([...rules, '']);
  };

  const addRequirement = () => {
    setRequirements([...requirements, '']);
  };

  const handleCoordinatorChange = (index: number, field: string, value: string) => {
    const newCoordinators = [...coordinators];
    newCoordinators[index] = { ...newCoordinators[index], [field]: value };
    setCoordinators(newCoordinators);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    const updatedEvent = {
      ...formData,
      coordinators: coordinators.map(coord => ({
        name: coord.name,
        phone: coord.phone,
        role: coord.role || ''
      })),
      rules: rules.map(rule => ({
        rule: rule
      })),
      requirements: requirements.map(req => ({
        requirement: req
      })),
      isTeamEvent: formData.type === 'TEAM',
      eventDate: new Date(formData.startDate || new Date()).toISOString(),
      startDate: new Date(formData.startDate || new Date()).toISOString(),
      endDate: new Date(formData.endDate || new Date()).toISOString(),
      duration: Number(formData.duration || 0),
      maxTeamSize: formData.type === 'TEAM' ? Number(formData.maxTeamSize) : null
    };
    onSave(updatedEvent);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={() => !isLoading && onClose()}
          />
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative bg-[#1a1a1a] rounded-xl p-8 max-w-4xl w-full m-4 max-h-[90vh] overflow-y-auto"
          >
            <h3 className="text-xl font-semibold mb-4">Edit Event</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Event Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name || ''}
                    onChange={handleChange}
                    className="w-full bg-[#252525] border border-gray-700 rounded-lg px-4 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Venue</label>
                  <input
                    type="text"
                    name="venue"
                    value={formData.venue || ''}
                    onChange={handleChange}
                    className="w-full bg-[#252525] border border-gray-700 rounded-lg px-4 py-2"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description || ''}
                  onChange={handleChange}
                  className="w-full bg-[#252525] border border-gray-700 rounded-lg px-4 py-2"
                  rows={4}
                  required
                />
              </div>

              {/* Event Type and Category */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <select
                    name="category"
                    value={formData.category || 'TECHNICAL'}
                    onChange={handleChange}
                    className="w-full bg-[#252525] border border-gray-700 rounded-lg px-4 py-2"
                  >
                    <option value="TECHNICAL">Technical</option>
                    <option value="NON_TECHNICAL">Non Technical</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Type</label>
                  <select
                    name="type"
                    value={formData.type || 'SINGLE'}
                    onChange={handleChange}
                    className="w-full bg-[#252525] border border-gray-700 rounded-lg px-4 py-2"
                  >
                    <option value="SINGLE">Single</option>
                    <option value="TEAM">Team</option>
                  </select>
                </div>
                {formData.type === 'TEAM' && (
                  <div>
                    <label className="block text-sm font-medium mb-2">Max Team Size</label>
                    <input
                      type="number"
                      name="maxTeamSize"
                      value={formData.maxTeamSize || ''}
                      onChange={handleChange}
                      className="w-full bg-[#252525] border border-gray-700 rounded-lg px-4 py-2"
                      min="2"
                    />
                  </div>
                )}
              </div>

              {/* Dates and Duration */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Start Date</label>
                  <input
                    type="datetime-local"
                    name="startDate"
                    value={formData.startDate || ''}
                    onChange={handleChange}
                    className="w-full bg-[#252525] border border-gray-700 rounded-lg px-4 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">End Date</label>
                  <input
                    type="datetime-local"
                    name="endDate"
                    value={formData.endDate || ''}
                    onChange={handleChange}
                    className="w-full bg-[#252525] border border-gray-700 rounded-lg px-4 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Duration (minutes)</label>
                  <input
                    type="number"
                    name="duration"
                    value={formData.duration || ''}
                    onChange={handleChange}
                    className="w-full bg-[#252525] border border-gray-700 rounded-lg px-4 py-2"
                    required
                  />
                </div>
              </div>

              {/* Coordinators */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="text-sm font-medium">Coordinators</label>
                  <button
                    type="button"
                    onClick={addCoordinator}
                    className="text-[#FF3366] hover:text-[#ff1f57]"
                  >
                    + Add Coordinator
                  </button>
                </div>
                {coordinators.map((coord, index) => (
                  <div key={index} className="grid grid-cols-3 gap-4 mb-4">
                    <input
                      placeholder="Name"
                      value={coord.name}
                      onChange={(e) => handleCoordinatorChange(index, 'name', e.target.value)}
                      className="bg-[#252525] border border-gray-700 rounded-lg px-4 py-2"
                    />
                    <input
                      placeholder="Role"
                      value={coord.role}
                      onChange={(e) => handleCoordinatorChange(index, 'role', e.target.value)}
                      className="bg-[#252525] border border-gray-700 rounded-lg px-4 py-2"
                    />
                    <input
                      placeholder="Phone"
                      value={coord.phone}
                      onChange={(e) => handleCoordinatorChange(index, 'phone', e.target.value)}
                      className="bg-[#252525] border border-gray-700 rounded-lg px-4 py-2"
                    />
                  </div>
                ))}
              </div>

              {/* Rules */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="text-sm font-medium">Rules</label>
                  <button
                    type="button"
                    onClick={addRule}
                    className="text-[#FF3366] hover:text-[#ff1f57]"
                  >
                    + Add Rule
                  </button>
                </div>
                {rules.map((rule, index) => (
                  <input
                    key={index}
                    value={rule}
                    onChange={(e) => {
                      const newRules = [...rules];
                      newRules[index] = e.target.value;
                      setRules(newRules);
                    }}
                    placeholder="Enter rule"
                    className="w-full bg-[#252525] border border-gray-700 rounded-lg px-4 py-2 mb-2"
                  />
                ))}
              </div>

              {/* Requirements */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="text-sm font-medium">Requirements</label>
                  <button
                    type="button"
                    onClick={addRequirement}
                    className="text-[#FF3366] hover:text-[#ff1f57]"
                  >
                    + Add Requirement
                  </button>
                </div>
                {requirements.map((req, index) => (
                  <input
                    key={index}
                    value={req}
                    onChange={(e) => {
                      const newReqs = [...requirements];
                      newReqs[index] = e.target.value;
                      setRequirements(newReqs);
                    }}
                    placeholder="Enter requirement"
                    className="w-full bg-[#252525] border border-gray-700 rounded-lg px-4 py-2 mb-2"
                  />
                ))}
              </div>

              {/* Submit Buttons */}
              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isLoading}
                  className="px-4 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 
                           disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-2 rounded-lg bg-[#FF3366] text-white hover:bg-[#ff1f57]
                           disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Saving...
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const EditEvent = () => {
  const [events, setEvents] = useState<EventDetailsType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editLoading, setEditLoading] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventDetailsType | null>(null);
  const [editModal, setEditModal] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://symposium-api-production.up.railway.app/api/events');
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
      setError('Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (event: EventDetailsType) => {
    setSelectedEvent(event);
    setEditModal(true);
  };

  const handleSave = async (updatedEvent: Partial<EventDetailsType>) => {
    if (!selectedEvent) return;
    
    setEditLoading(true);
    try {
      await axios.put(`http://localhost:3000/api/events/${selectedEvent.id}`, updatedEvent);
      
      // Update local state with new data
      setEvents(events.map(event => 
        event.id === selectedEvent.id ? { ...event, ...updatedEvent } : event
      ));
      
      setEditModal(false);
      setSelectedEvent(null);
    } catch (error) {
      console.error('Error updating event:', error);
      setError('Failed to update event');
    } finally {
      setEditLoading(false);
    }
  };

  // ... loading and error states same as DeleteEvent ...

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 pt-24">
      <EditModal
        isOpen={editModal}
        onClose={() => !editLoading && setEditModal(false)}
        onSave={handleSave}
        event={selectedEvent}
        isLoading={editLoading}
      />

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-['Righteous'] mb-4">
            Edit Events
          </h1>
          <p className="text-gray-400 text-lg">
            Modify existing event details
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#1a1a1a] rounded-xl overflow-hidden group"
            >
              <div className="relative aspect-video">
                <img
                  src={event.image}
                  alt={event.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    onClick={() => handleEdit(event)}
                    className="bg-[#FF3366] text-white p-3 rounded-full hover:bg-[#ff1f57] transition-colors"
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{event.name}</h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {event.description}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>
                    <i className="fas fa-users mr-2"></i>
                    {event.isTeamEvent ? `Team (${event.maxTeamSize})` : 'Individual'}
                  </span>
                  <span>
                    <i className="fas fa-tag mr-2"></i>
                    {event.category}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EditEvent;