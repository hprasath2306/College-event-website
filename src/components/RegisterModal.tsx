interface RegisterModalProps {
    isOpen: boolean;
    onClose: () => void;
    eventTitle: string;
  }
  
  const RegisterModal = ({ isOpen, onClose, eventTitle }: RegisterModalProps) => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      // Handle form submission
      console.log('Form submitted');
      onClose();
    };
  
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center">
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-transparent bg-opacity-80 backdrop-blur-sm"
          onClick={onClose}
        />
  
        {/* Modal */}
        <div className="relative w-full max-w-md bg-[#1a1a1a] rounded-xl p-8 m-4 animate-modalSlideIn pointer-events-auto">
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          >
            <i className="fas fa-times text-xl" />
          </button>
  
          {/* Modal Content */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-['Righteous'] mb-2">Register for</h2>
            <p className="text-[#FF3366] text-xl">{eventTitle}</p>
          </div>
  
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
                Class and Section
              </label>
              <input
                type="text"
                id="class"
                required
                className="w-full px-4 py-2 bg-[#252525] border border-gray-700 rounded-lg
                         focus:outline-none focus:border-[#FF3366] transition-colors
                         text-white placeholder-gray-500"
                placeholder="e.g., CSE-A"
              />
            </div>
  
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                College Mail ID
              </label>
              <input
                type="email"
                id="email"
                required
                className="w-full px-4 py-2 bg-[#252525] border border-gray-700 rounded-lg
                         focus:outline-none focus:border-[#FF3366] transition-colors
                         text-white placeholder-gray-500"
                placeholder="your.name@college.edu"
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
                pattern="[0-9]{10}"
                className="w-full px-4 py-2 bg-[#252525] border border-gray-700 rounded-lg
                         focus:outline-none focus:border-[#FF3366] transition-colors
                         text-white placeholder-gray-500"
                placeholder="10-digit number"
              />
            </div>
  
            <button
              type="submit"
              className="w-full bg-[#FF3366] text-white py-3 rounded-lg mt-6
                       hover:bg-[#ff1f57] transition-colors font-semibold
                       transform hover:scale-[1.02] active:scale-[0.98] transition-transform"
            >
              Submit Registration
            </button>
          </form>
        </div>
      </div>
    );
  };
  
  export default RegisterModal;