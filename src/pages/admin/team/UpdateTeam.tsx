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

const UpdateTeam = () => {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [editLoading, setEditLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleUpdate = async (member: TeamMember) => {
    setSelectedMember(member);
    setImagePreview(member.imageUrl);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMember) return;

    setEditLoading(true);
    setError(null);
    setSuccess(null);

    try {
      let imageUrl = selectedMember.imageUrl;

      // Upload new image if changed
      if (imageFile) {
        const imageData = new FormData();
        imageData.append('file', imageFile);
        imageData.append('upload_preset', 'fest-moments');

        const uploadRes = await axios.post(
          'https://api.cloudinary.com/v1_1/dyglppjr6/image/upload',
          imageData
        );
        imageUrl = uploadRes.data.secure_url;
      }

      // Update coordinator
      await axios.put(`https://symposium-api-production.up.railway.app/api/coordinators/${selectedMember.id}`, {
        ...selectedMember,
        imageUrl
      });

      setSuccess('Team member updated successfully!');
      fetchMembers();
      setSelectedMember(null);
      setImageFile(null);
      setImagePreview('');

      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update team member');
    } finally {
      setEditLoading(false);
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
    <div className="min-h-screen bg-gray-900 text-white p-8 pt-24">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-['Righteous'] mb-4">
            Update Team Members
          </h1>
          <p className="text-gray-400 text-lg">
            Edit existing team member details
          </p>
        </div>

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
                    onClick={() => handleUpdate(member)}
                    className="bg-[#FF3366] text-white p-3 rounded-full hover:bg-[#ff1f57] transition-colors"
                  >
                    <i className="fas fa-edit"></i>
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
        </div>

        {/* Edit Modal */}
        {selectedMember && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={() => setSelectedMember(null)} />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative bg-[#1a1a1a] rounded-xl p-8 max-w-md w-full"
            >
              <h3 className="text-xl font-semibold mb-4">Edit Team Member</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    value={selectedMember.name}
                    onChange={e => setSelectedMember({ ...selectedMember, name: e.target.value })}
                    className="w-full bg-[#252525] border border-gray-700 rounded-lg px-4 py-2"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Role</label>
                  <input
                    type="text"
                    value={selectedMember.role}
                    onChange={e => setSelectedMember({ ...selectedMember, role: e.target.value })}
                    className="w-full bg-[#252525] border border-gray-700 rounded-lg px-4 py-2"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Phone</label>
                  <input
                    type="tel"
                    value={selectedMember.phone}
                    onChange={e => setSelectedMember({ ...selectedMember, phone: e.target.value })}
                    className="w-full bg-[#252525] border border-gray-700 rounded-lg px-4 py-2"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Photo</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="imageInput"
                  />
                  <label
                    htmlFor="imageInput"
                    className="block w-full bg-[#252525] border border-gray-700 rounded-lg px-4 py-2 cursor-pointer"
                  >
                    Change Photo
                  </label>
                </div>

                {imagePreview && (
                  <div className="mt-4">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-32 h-32 object-cover rounded-lg"
                    />
                  </div>
                )}

                {error && <p className="text-red-500 text-sm">{error}</p>}
                {success && <p className="text-green-500 text-sm">{success}</p>}

                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => setSelectedMember(null)}
                    className="px-4 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={editLoading}
                    className="px-4 py-2 rounded-lg bg-[#FF3366] text-white hover:bg-[#ff1f57]
                             disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {editLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Updating...
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
      </div>
    </div>
  );
};

export default UpdateTeam;
