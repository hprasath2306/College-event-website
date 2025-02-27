import { useState, useEffect } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';

const AdminCard = ({ title, description, icon, link }: {
  title: string;
  description: string;
  icon: string;
  link: string;
}) => (
  <Link 
    to={link}
    className="bg-[#1a1a1a] rounded-xl p-6 hover:shadow-[0_0_20px_rgba(255,51,102,0.2)] 
              transition-all duration-300 transform hover:-translate-y-1"
  >
    <div className="text-[#FF3366] text-3xl mb-4">
      <i className={icon}></i>
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </Link>
);

  const adminActions = [
    {
      title: "Upload Students",
      description: "Bulk upload students using Excel file",
      icon: "fas fa-user-plus",
      link: "/psnaAdmin/studentUpload"
    },
    {
      title: "Manage Events",
      description: "Create, edit, or delete events",
      icon: "fas fa-calendar-alt",
      link: "/psnaAdmin/events"
    },
    {
      title: "View Registrations",
      description: "View and export event registrations",
      icon: "fas fa-clipboard-list",
      link: "/admin/registrations"
    },
    {
      title: "Manage Teams",
      description: "View and manage event coordinators",
      icon: "fas fa-users",
      link: "/admin/teams"
    }
  ];

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'PsnACse' && password === '192.168.1.2025') {
      setIsAuthenticated(true);
      localStorage.setItem('adminAuth', 'true');
      setError('');
    } else {
      setError('Invalid credentials');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="bg-[#1a1a1a] rounded-xl p-8 w-full max-w-md">
          <h1 className="text-3xl font-['Righteous'] text-white mb-8 text-center">Admin Login</h1>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="text-gray-300 text-sm">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-[#252525] border border-gray-700 rounded-lg px-4 py-2 mt-1 text-white"
                required
              />
            </div>
            <div>
              <label className="text-gray-300 text-sm">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#252525] border border-gray-700 rounded-lg px-4 py-2 mt-1 text-white"
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full bg-[#FF3366] text-white py-2 rounded-lg hover:bg-[#ff1f57]"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 pt-24">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-['Righteous'] mb-4">
            Admin Dashboard
          </h1>
          <p className="text-gray-400 text-lg">
            Manage events, students, and registrations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {adminActions.map((action, index) => (
            <AdminCard
              key={index}
              title={action.title}
              description={action.description}
              icon={action.icon}
              link={action.link}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Admin;