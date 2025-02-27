import { Link } from 'react-router-dom';

const EventManageCard = ({ title, description, icon, link }: {
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

const ManageEvents = () => {
  const eventActions = [
    {
      title: "Create Event",
      description: "Add a new event to the symposium",
      icon: "fas fa-plus-circle",
      link: "/psnaAdmin/events/create"
    },
    {
      title: "Edit Event",
      description: "Modify existing event details",
      icon: "fas fa-edit",
      link: "/psnaAdmin/events/edit"
    },
    {
      title: "Delete Event",
      description: "Remove events from the symposium",
      icon: "fas fa-trash-alt",
      link: "/psnaAdmin/events/delete"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 pt-24">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-['Righteous'] mb-4">
            Manage Events
          </h1>
          <p className="text-gray-400 text-lg">
            Create, edit, or delete symposium events
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {eventActions.map((action, index) => (
            <EventManageCard
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
};

export default ManageEvents;
