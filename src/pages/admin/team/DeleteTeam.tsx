import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  phone: string;
  imageUrl: string;
}

const DeleteTeam = () => {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await axios.get('https://symposium-api-production.up.railway.app/api/coordinators');
      setMembers(response.data);
    } catch (error) {
      setError('Failed to load team members');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (member: TeamMember) => {
    setSelectedMember(member);
  };

  const confirmDelete = async () => {
    if (!selectedMember) return;

    setDeleteLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await axios.delete(`https://symposium-api-production.up.railway.app/api/coordinators/${selectedMember.id}`);
      setSuccess('Team member deleted successfully!');
      setMembers(members.filter(m => m.id !== selectedMember.id));
      setSelectedMember(null);
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete team member');
    } finally {
      setDeleteLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#FF3366]"></div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {members.map((member) => (
        <motion.div
          key={member.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#1a1a1a] rounded-xl overflow-hidden group"
        >
          <div className="relative aspect-video">
            <img
              src={member.imageUrl}
              alt={member.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button
                onClick={() => handleDelete(member)}
                className="bg-red-500 text-white p-3 rounded-full hover:bg-red-600 transition-colors"
              >
                <i className="fas fa-trash"></i>
              </button>
            </div>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
            <p className="text-gray-400 mb-2">{member.role}</p>
            <p className="text-gray-500 text-sm">
              <i className="fas fa-phone mr-2"></i>
              {member.phone}
            </p>
          </div>
        </motion.div>
      ))}

      {/* Delete Confirmation Modal */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={() => setSelectedMember(null)} />
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative bg-[#1a1a1a] rounded-xl p-8 max-w-md w-full text-center"
          >
            <h3 className="text-xl font-semibold mb-4">Delete Team Member</h3>
            <p className="text-gray-400 mb-6">
              Are you sure you want to delete {selectedMember.name}? This action cannot be undone.
            </p>

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            {success && <p className="text-green-500 text-sm mb-4">{success}</p>}

            <div className="flex justify-center gap-4">
              <button
                type="button"
                onClick={() => setSelectedMember(null)}
                className="px-4 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={deleteLoading}
                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600
                         disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {deleteLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Deleting...
                  </>
                ) : (
                  'Delete'
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default DeleteTeam;
