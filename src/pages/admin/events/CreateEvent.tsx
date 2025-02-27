import { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

interface Coordinator {
    name: string;
    role: string;
    phone: string;
}

interface EventForm {
    name: string;
    description: string;
    venue: string;
    image: string;
    category: 'TECHNICAL' | 'NON_TECHNICAL';
    type: 'SINGLE' | 'TEAM';
    duration: number;
    startDate: string;
    endDate: string;
    Date: string;
    isTeamEvent: boolean;
    maxTeamSize?: number;
    coordinators: Coordinator[];
    rules: string[];
    requirements: string[];
}

interface Notification {
    type: 'success' | 'error';
    message: string;
}

const CreateEvent = () => {
    const [formData, setFormData] = useState<EventForm>({
        name: '',
        description: '',
        venue: '',
        image: '',
        category: 'TECHNICAL',
        type: 'SINGLE',
        duration: 0,
        startDate: '',
        endDate: '',
        Date: '',
        isTeamEvent: false,
        coordinators: [{ name: '', role: '', phone: '' }],
        rules: [''],
        requirements: ['']
    });
    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState<Notification | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>('');

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Upload image to Cloudinary first
            let imageUrl = '';
            if (imageFile) {
                const formData = new FormData();
                formData.append('file', imageFile);
                formData.append('upload_preset', 'fest-moments'); // Use the same upload preset
                formData.append('tags', 'fest-events');

                const uploadResponse = await axios.post(
                    'https://api.cloudinary.com/v1_1/dyglppjr6/image/upload',
                    formData
                );

                if (uploadResponse.status === 200) {
                    imageUrl = uploadResponse.data.secure_url;
                } else {
                    throw new Error('Image upload failed');
                }
            }
            
            // Then create event with the Cloudinary URL
            await axios.post('https://symposium-api-production.up.railway.app/api/events', {
                ...formData,
                image: imageUrl,
                rules: formData.rules.filter(rule => rule.trim()).map(rule => ({ rule })),
                requirements: formData.requirements.filter(req => req.trim()).map(req => ({ requirement: req })),
                startDate: new Date(formData.startDate).toISOString(),
                endDate: new Date(formData.endDate).toISOString(),
                Date: new Date(formData.startDate).toISOString(), // Using startDate for the Date field
            });

            setNotification({
                type: 'success',
                message: 'Event created successfully!'
            });

            // Reset form
            setFormData({
                name: '',
                description: '',
                venue: '',
                image: '',
                category: 'TECHNICAL',
                type: 'SINGLE',
                duration: 0,
                startDate: '',
                endDate: '',
                Date: '',
                isTeamEvent: false,
                coordinators: [{ name: '', role: '', phone: '' }],
                rules: [''],
                requirements: ['']
            });
            setImageFile(null);
            setImagePreview('');

            setTimeout(() => {
                setNotification(null);
            }, 3000);

        } catch (error: unknown) {
            console.error('Error:', error);
            setNotification({
                type: 'error',
                message: axios.isAxiosError(error)
                    ? error.response?.data?.error || 'Failed to create event. Please try again.'
                    : 'Failed to create event. Please try again.'
            });
        } finally {
            setLoading(false);
        }
    };

    const addCoordinator = () => {
        setFormData({
            ...formData,
            coordinators: [...formData.coordinators, { name: '', role: '', phone: '' }]
        });
    };

    const addRule = () => {
        setFormData({
            ...formData,
            rules: [...formData.rules, '']
        });
    };

    const addRequirement = () => {
        setFormData({
            ...formData,
            requirements: [...formData.requirements, '']
        });
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8 pt-24">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-['Righteous'] mb-8 text-center">Create New Event</h1>

                {/* Notification */}
                <AnimatePresence>
                    {notification && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className={`mb-6 p-4 rounded-lg ${notification.type === 'success' ? 'bg-green-500/20' : 'bg-red-500/20'
                                }`}
                        >
                            {notification.message}
                        </motion.div>
                    )}
                </AnimatePresence>

                <form onSubmit={handleSubmit} className="space-y-6 bg-[#1a1a1a] p-8 rounded-xl">
                    {/* Image Upload Section */}
                    <div>
                        <label className="block text-sm font-medium mb-2">Event Banner</label>
                        <div className="relative flex flex-col items-center p-4 border-2 border-dashed border-gray-700 rounded-lg">
                            {imagePreview ? (
                                <div className="relative w-full aspect-video mb-4">
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="w-full h-full object-cover rounded-lg"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setImageFile(null);
                                            setImagePreview('');
                                        }}
                                        className="absolute top-2 right-2 bg-red-500 p-2 rounded-full"
                                    >
                                        <i className="fas fa-times" />
                                    </button>
                                </div>
                            ) : (
                                <div className="text-center">
                                    <i className="fas fa-cloud-upload-alt text-4xl mb-4" />
                                    <p className="text-gray-400">Click to upload or drag and drop</p>
                                    <p className="text-sm text-gray-500">SVG, PNG, JPG (max. 2MB)</p>
                                </div>
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                style={{ height: imagePreview ? '300px' : '100%' }}
                            />
                        </div>
                    </div>
                    {/* Basic Event Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium mb-2">Event Name</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full bg-[#252525] border border-gray-700 rounded-lg px-4 py-2"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Venue</label>
                            <input
                                type="text"
                                value={formData.venue}
                                onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                                className="w-full bg-[#252525] border border-gray-700 rounded-lg px-4 py-2"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Category</label>
                            <select
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value as 'TECHNICAL' | 'NON_TECHNICAL' })}
                                className="w-full bg-[#252525] border border-gray-700 rounded-lg px-4 py-2"
                            >
                                <option value="TECHNICAL">Technical</option>
                                <option value="NON_TECHNICAL">Non Technical</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Type</label>
                            <select
                                value={formData.type}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    type: e.target.value as 'SINGLE' | 'TEAM',
                                    isTeamEvent: e.target.value === 'TEAM'
                                })}
                                className="w-full bg-[#252525] border border-gray-700 rounded-lg px-4 py-2"
                            >
                                <option value="SINGLE">Single</option>
                                <option value="TEAM">Team</option>
                            </select>
                        </div>

                        {formData.isTeamEvent && (
                            <div>
                                <label className="block text-sm font-medium mb-2">Max Team Size</label>
                                <input
                                    type="number"
                                    value={formData.maxTeamSize || ''}
                                    onChange={(e) => setFormData({ ...formData, maxTeamSize: parseInt(e.target.value) })}
                                    className="w-full bg-[#252525] border border-gray-700 rounded-lg px-4 py-2"
                                    min="2"
                                    required
                                />
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium mb-2">Duration (minutes)</label>
                            <input
                                type="number"
                                value={formData.duration}
                                onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
                                className="w-full bg-[#252525] border border-gray-700 rounded-lg px-4 py-2"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Start Date</label>
                            <input
                                type="datetime-local"
                                value={formData.startDate}
                                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                className="w-full bg-[#252525] border border-gray-700 rounded-lg px-4 py-2"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">End Date</label>
                            <input
                                type="datetime-local"
                                value={formData.endDate}
                                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                                className="w-full bg-[#252525] border border-gray-700 rounded-lg px-4 py-2"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Description</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="w-full bg-[#252525] border border-gray-700 rounded-lg px-4 py-2"
                            rows={4}
                            required
                        />
                    </div>

                    {/* Coordinators Section */}
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-medium">Coordinators</h3>
                            <button
                                type="button"
                                onClick={addCoordinator}
                                className="text-[#FF3366] hover:text-[#ff1f57]"
                            >
                                + Add Coordinator
                            </button>
                        </div>
                        {formData.coordinators.map((coord, index) => (
                            <div key={index} className="grid grid-cols-3 gap-4 mb-4">
                                <input
                                    placeholder="Name"
                                    value={coord.name}
                                    onChange={(e) => {
                                        const newCoordinators = [...formData.coordinators];
                                        newCoordinators[index].name = e.target.value;
                                        setFormData({ ...formData, coordinators: newCoordinators });
                                    }}
                                    className="bg-[#252525] border border-gray-700 rounded-lg px-4 py-2"
                                />
                                <input
                                    placeholder="Role"
                                    value={coord.role}
                                    onChange={(e) => {
                                        const newCoordinators = [...formData.coordinators];
                                        newCoordinators[index].role = e.target.value;
                                        setFormData({ ...formData, coordinators: newCoordinators });
                                    }}
                                    className="bg-[#252525] border border-gray-700 rounded-lg px-4 py-2"
                                />
                                <input
                                    placeholder="Phone"
                                    value={coord.phone}
                                    onChange={(e) => {
                                        const newCoordinators = [...formData.coordinators];
                                        newCoordinators[index].phone = e.target.value;
                                        setFormData({ ...formData, coordinators: newCoordinators });
                                    }}
                                    className="bg-[#252525] border border-gray-700 rounded-lg px-4 py-2"
                                />
                            </div>
                        ))}
                    </div>

                    {/* Rules Section */}
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-medium">Rules</h3>
                            <button
                                type="button"
                                onClick={addRule}
                                className="text-[#FF3366] hover:text-[#ff1f57]"
                            >
                                + Add Rule
                            </button>
                        </div>
                        {formData.rules.map((rule, index) => (
                            <input
                                key={index}
                                placeholder="Rule"
                                value={rule}
                                onChange={(e) => {
                                    const newRules = [...formData.rules];
                                    newRules[index] = e.target.value;
                                    setFormData({ ...formData, rules: newRules });
                                }}
                                className="w-full bg-[#252525] border border-gray-700 rounded-lg px-4 py-2 mb-2"
                            />
                        ))}
                    </div>

                    {/* Requirements Section */}
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-medium">Requirements</h3>
                            <button
                                type="button"
                                onClick={addRequirement}
                                className="text-[#FF3366] hover:text-[#ff1f57]"
                            >
                                + Add Requirement
                            </button>
                        </div>
                        {formData.requirements.map((req, index) => (
                            <input
                                key={index}
                                placeholder="Requirement"
                                value={req}
                                onChange={(e) => {
                                    const newRequirements = [...formData.requirements];
                                    newRequirements[index] = e.target.value;
                                    setFormData({ ...formData, requirements: newRequirements });
                                }}
                                className="w-full bg-[#252525] border border-gray-700 rounded-lg px-4 py-2 mb-2"
                            />
                        ))}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#FF3366] text-white py-3 rounded-lg hover:bg-[#ff1f57] transition-colors
                     disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                        {loading ? (
                            <>
                                <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin mr-2" />
                                Creating Event...
                            </>
                        ) : (
                            'Create Event'
                        )}
                    </button>
                </form>

            </div>
        </div>
    );
};

export default CreateEvent;