import React, { useState } from 'react';
import axios from 'axios';

interface User {
    id: number;
    name: string;
    year: number;
    section: string;
    email: string;
    phone: string;
    event: string;
}

export default function Admin() {
    const [eventName, setEventName] = useState('');
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [searched, setSearched] = useState(false);

    // List of events
    const events = [
        "Oops! Fix It",
        "The Code Confusion Cup",
        "Code Free",
        "Logical Baton",
        "Pitch Perfect",
        "Code Dejavu",
        "Mock Job Interview",
        "Design Under Pressure – Figma/Adobe XD Challenge",
        "Bite Bidders",
        "Code with Comali",
        "MINI MARVELS: THE ART YOU CAN EAT",
        "DIGITAL DYNAMO",
        "TECH PICTIONARY",
        "IPL Auction",
        "CLIPCRAFT",
        "ESCAPE ROOM"
      ]

    const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!eventName) return;
        
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`https://63cbb242-3a7a-4763-8f17-fcbde3478ca4.eu-central-1.cloud.genez.io/api/users/${eventName}`);
            setUsers(response.data);
            setSearched(true);
        } catch (error: any) {
            setError(error.response?.data?.message || 'Failed to fetch users');
            setUsers([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#121212] text-white p-6 md:p-12 mt-10">
            {/* Header */}
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-['Righteous'] mb-8">
                    Export Registrations
                </h1>

                {/* Search Form */}
                <div className="bg-[#1a1a1a] rounded-xl p-6 mb-8">
                    <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <select
                                value={eventName}
                                onChange={(e) => setEventName(e.target.value)}
                                className="w-full px-4 py-3 bg-[#252525] border border-gray-700 rounded-lg
                                         focus:outline-none focus:border-[#FF3366] transition-colors
                                         text-white appearance-none cursor-pointer"
                                required
                                style={{
                                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'right 1rem center',
                                    backgroundSize: '1.5em 1.5em'
                                }}
                            >
                                <option value="" disabled>Select an event</option>
                                {events.map((event) => (
                                    <option 
                                        key={event} 
                                        value={event}
                                        className="bg-[#252525] text-white"
                                    >
                                        {event}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button
                            type="submit"
                            className="px-8 py-3 bg-[#FF3366] text-white rounded-lg
                                   hover:bg-[#ff1f57] transition-colors font-semibold
                                   transform hover:scale-[1.02] active:scale-[0.98] transition-transform
                                   disabled:opacity-50 disabled:cursor-not-allowed
                                   flex items-center justify-center gap-2"
                            disabled={loading || !eventName}
                        >
                            {loading ? (
                                <>
                                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                                    <span>Fetching...</span>
                                </>
                            ) : (
                                <>
                                    <i className="fas fa-search"></i>
                                    <span>View Registrations</span>
                                </>
                            )}
                        </button>
                    </form>
                </div>

                {/* Results Section */}
                {error ? (
                    <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 text-center">
                        <p className="text-red-400">{error}</p>
                    </div>
                ) : searched && (
                    <div className="bg-[#1a1a1a] rounded-xl overflow-hidden">
                        <div className="p-6 border-b border-gray-800">
                            <h2 className="text-2xl font-['Righteous']">
                                Registrations for "{eventName}"
                            </h2>
                            <p className="text-gray-400 mt-1">
                                Total registrations: {users.length}
                            </p>
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-[#252525]">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Name</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Year</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Section</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Email</th>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Phone</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-800">
                                    {users.map((user) => (
                                        <tr
                                            key={user.id}
                                            className="hover:bg-[#252525] transition-colors"
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{user.year}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{user.section}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{user.phone}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Export Button */}
                        {users.length > 0 && (
                            <div className="p-6 border-t border-gray-800">
                                <button
                                    onClick={() => {
                                        const csv = [
                                            ['Name', 'Year', 'Section', 'Email', 'Phone'],
                                            ...users.map(user => [
                                                user.name,
                                                user.year,
                                                user.section,
                                                user.email,
                                                user.phone
                                            ])
                                        ].map(row => row.join(',')).join('\n');

                                        const blob = new Blob([csv], { type: 'text/csv' });
                                        const url = window.URL.createObjectURL(blob);
                                        const a = document.createElement('a');
                                        a.href = url;
                                        a.download = `${eventName}-registrations.csv`;
                                        a.click();
                                    }}
                                    className="flex items-center gap-2 px-6 py-3 bg-[#252525] text-white rounded-lg
                                           hover:bg-[#303030] transition-colors font-semibold"
                                >
                                    <i className="fas fa-download"></i>
                                    Export to CSV
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}