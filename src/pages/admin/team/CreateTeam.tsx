
import { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

interface CoordinatorForm {
  name: string;
  role: string;
  phone: string;
  imageFile: File | null;
  imagePreview: string;
}

const CreateTeam = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState<CoordinatorForm>({
    name: '',
    role: '',
    phone: '',
    imageFile: null,
    imagePreview: ''
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        imageFile: file,
        imagePreview: URL.createObjectURL(file)
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // First upload image to Cloudinary
      if (!formData.imageFile) {
        throw new Error('Please select an image');
      }

      const imageData = new FormData();
      imageData.append('file', formData.imageFile);
      imageData.append('upload_preset', 'fest-moments');

      const uploadRes = await axios.post(
        'https://api.cloudinary.com/v1_1/dyglppjr6/image/upload', 
        imageData
      );

      // Then create coordinator with image URL
      await axios.post('https://symposium-api-production.up.railway.app/api/coordinators', {
        name: formData.name,
        role: formData.role,
        phone: formData.phone,
        imageUrl: uploadRes.data.secure_url
      });

      setSuccess(true);
      setFormData({
        name: '',
        role: '',
        phone: '',
        imageFile: null,
        imagePreview: ''
      });

      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create coordinator');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 pt-24">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-['Righteous'] mb-4">
            Add Team Member
          </h1>
          <p className="text-gray-400 text-lg">
            Add coordinators to the symposium team
          </p>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#1a1a1a] rounded-xl p-8"
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full bg-[#252525] border border-gray-700 rounded-lg px-4 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Role</label>
              <input
                type="text"
                value={formData.role}
                onChange={e => setFormData(prev => ({ ...prev, role: e.target.value }))}
                className="w-full bg-[#252525] border border-gray-700 rounded-lg px-4 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Phone</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                className="w-full bg-[#252525] border border-gray-700 rounded-lg px-4 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Photo</label>
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="imageInput"
                  required
                />
                <label
                  htmlFor="imageInput"
                  className="block w-full bg-[#252525] border border-gray-700 rounded-lg px-4 py-2 cursor-pointer"
                >
                  {formData.imageFile ? 'Change Photo' : 'Choose Photo'}
                </label>
              </div>
            </div>
          </div>

          {formData.imagePreview && (
            <div className="mt-6">
              <img
                src={formData.imagePreview}
                alt="Preview"
                className="w-32 h-32 object-cover rounded-lg"
              />
            </div>
          )}

          {error && (
            <div className="mt-4 text-red-500 text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="mt-4 text-green-500 text-sm">
              Team member added successfully!
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full bg-[#FF3366] text-white py-2 rounded-lg hover:bg-[#ff1f57]
                     disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Adding...
              </>
            ) : (
              'Add Team Member'
            )}
          </button>
        </motion.form>
      </div>
    </div>
  );
};

export default CreateTeam;