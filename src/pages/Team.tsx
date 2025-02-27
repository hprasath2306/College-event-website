import { useEffect, useState } from 'react';
import axios from 'axios';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  imageUrl: string;
  phone: string;
}

const Team = () => {
  const [showContent, setShowContent] = useState(false);
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setShowContent(true);
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      const response = await axios.get('https://symposium-api-production.up.railway.app/api/coordinators');
      setMembers(response.data);
    } catch (error) {
      setError('Failed to load team members');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#FF3366]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden mt-10">
        <div className="absolute inset-0 bg-gradient-to-r opacity-20"></div>
        <div 
          className={`relative text-center transform transition-all duration-1000 ${
            showContent ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <h1 className="text-5xl md:text-6xl font-['Righteous'] mb-4">
            Meet Our Team
          </h1>
          <p className="text-xl text-gray-300">
            The awesome people behind FEST 2025 🚀
          </p>
        </div>
      </section>

      {/* Team Grid */}
      <section className="max-w-7xl mx-auto px-6 py-2 mb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {members.map((member, index) => (
            <div
              key={member.id}
              className={`group relative bg-[#1a1a1a] rounded-xl overflow-hidden transform transition-all duration-500 hover:-translate-y-2 ${
                showContent 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="relative h-80 overflow-hidden">
                <img
                  src={member.imageUrl}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121212] to-transparent opacity-60"></div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-2xl font-['Righteous'] mb-1">
                  {member.name}
                </h3>
                <p className="text-[#FF3366] mb-4">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 bg-[#FF3366] text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-[#ff1f57] transition-colors"
      >
        <i className="fas fa-arrow-up"></i>
      </button>
    </div>
  );
};

export default Team;