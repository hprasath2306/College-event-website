import { Link } from "react-router-dom";
import { format } from 'date-fns';

interface EventCardProps {
  id: string;
  title: string;
  date: string;
  description: string;
  image: string;
  duration: string;
  teamSize: string;
}

const EventCard = ({
  id,
  title,
  date,
  description,
  image,
  duration,
  teamSize,
}: EventCardProps) => {
  // Format date to show just the day and month
  //I need like this format 2025-12-31 
  const formattedDate = format(new Date(date), 'yyyy-MM-dd');

  const members = teamSize === '1' ? 'member' : 'members';
  
  return (
    <div className="bg-[#1a1a1a] rounded-xl overflow-hidden shadow-lg 
                    hover:shadow-[0_0_20px_rgba(255,51,102,0.2)] transition-all duration-300
                    transform hover:-translate-y-1">
      <Link to={`/events/${id}`} className="block">
        <div className="relative h-48">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4 bg-[#FF3366] text-white px-3 py-1 rounded-full text-sm">
            {formattedDate}
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-gray-400 mb-4">
            {description}
          </p>
          <ul className="flex flex-wrap gap-4 text-sm text-gray-300">
            <li className="flex items-center gap-2">
              <i className="fas fa-clock"></i> {duration} Minutes
            </li>
            <li className="flex items-center gap-2">
              <i className="fas fa-users"></i> {teamSize+' '+members}
            </li>
          </ul>
        </div>
      </Link>
      <div className="px-6 pb-6">
        <Link
          to={`/events/${id}`}
          className="block w-full text-center bg-[#FF3366] text-white py-2 rounded-lg
                   hover:bg-[#ff1f57] transition-colors font-semibold"
        >
          Register Now!
        </Link>
      </div>
    </div>
  );
};

export default EventCard;