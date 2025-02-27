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

export default function Admin() {
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