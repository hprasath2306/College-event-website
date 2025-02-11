import React, { useState } from "react";
import axios from "axios";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventTitle: string;
}

const RegisterModal = ({ isOpen, onClose, eventTitle }: RegisterModalProps) => {
  const [name, setName] = React.useState('');
  const [year, setYear] = React.useState('');
  const [classSection, setClassSection] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [loading, setLoading] = useState(false);
  const [registered, setRegistered] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('https://63cbb242-3a7a-4763-8f17-fcbde3478ca4.eu-central-1.cloud.genez.io/api/users', {
        name,
        year: parseInt(year),
        section: classSection,
        email,
        phone,
        event: eventTitle
      });
      console.log(response.data);
      setRegistered(true);
      setTimeout(() => {
        onClose();
        setRegistered(false);
        // Reset form
        setName('');
        setYear('');
        setClassSection('');
        setEmail('');
        setPhone('');
      }, 5000);
    } catch (error) {
      console.error('Registration failed:', error);
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
        </div>

        {/* Loading Overlay */}
        {loading && (
          <div className="absolute inset-0 bg-[#1a1a1a]/50 backdrop-blur-sm rounded-xl flex items-center justify-center z-10">
            <div className="flex flex-col items-center gap-4">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#FF3366] border-t-transparent"></div>
              <p className="text-white font-medium">Registering...</p>
            </div>
          </div>
        )}

        {/* Success Overlay */}
        {registered && (
          <div className="absolute inset-0 bg-[#1a1a1a]/50 backdrop-blur-sm rounded-xl flex items-center justify-center z-10">
            <div className="flex flex-col items-center gap-4 animate-successFadeIn">
              <div className="w-16 h-16 bg-[#FF3366] rounded-full flex items-center justify-center">
                <i className="fas fa-check text-2xl text-white"></i>
              </div>
              <div className="text-center">
                <p className="text-white text-xl font-medium mb-1">Registration Successful!</p>
                <p className="text-gray-400">You're all set for {eventTitle}</p>
              </div>
            </div>
          </div>
        )}

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              required
              className="w-full px-4 py-2 bg-[#252525] border border-gray-700 rounded-lg
                       focus:outline-none focus:border-[#FF3366] transition-colors
                       text-white placeholder-gray-500 cursor-text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="year" className="block text-sm font-medium text-gray-300 mb-1">
              Year
            </label>
            <select
              id="year"
              required
              className="w-full px-4 py-2 bg-[#252525] border border-gray-700 rounded-lg
                       focus:outline-none focus:border-[#FF3366] transition-colors
                       text-white placeholder-gray-500"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              disabled={loading}
            >
              <option value="">Select Year</option>
              <option value="1">1st Year</option>
              <option value="2">2nd Year</option>
              <option value="3">3rd Year</option>
              <option value="4">4th Year</option>
            </select>
          </div>

          <div>
            <label htmlFor="class" className="block text-sm font-medium text-gray-300 mb-1">
              Section
            </label>
            <input
              type="text"
              id="class"
              required
              value={classSection}
              onChange={(e) => setClassSection(e.target.value)}
              className="w-full px-4 py-2 bg-[#252525] border border-gray-700 rounded-lg
                       focus:outline-none focus:border-[#FF3366] transition-colors
                       text-white placeholder-gray-500"
              placeholder="e.g., A"
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
              College Mail ID
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 bg-[#252525] border border-gray-700 rounded-lg
                       focus:outline-none focus:border-[#FF3366] transition-colors
                       text-white placeholder-gray-500"
              placeholder="your.name@college.edu"
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              pattern="[0-9]{10}"
              className="w-full px-4 py-2 bg-[#252525] border border-gray-700 rounded-lg
                       focus:outline-none focus:border-[#FF3366] transition-colors
                       text-white placeholder-gray-500"
              placeholder="10-digit number"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#FF3366] text-white py-3 rounded-lg mt-6
                     hover:bg-[#ff1f57] transition-colors font-semibold
                     transform hover:scale-[1.02] active:scale-[0.98] transition-transform
                     disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit Registration'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterModal;