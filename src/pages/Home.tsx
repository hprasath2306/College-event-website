import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [showEvents, setShowEvents] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const eventsSection = document.getElementById('events-section');
      if (eventsSection) {
        const rect = eventsSection.getBoundingClientRect();
        setShowEvents(rect.top <= window.innerHeight * 0.75);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if(showEvents) {
  }

  return (
    <div className="relative">
      <section className="hero">
        <div className="hero-content">
          <h1>CSEUTSAV' <span className="highlight">25!</span></h1>
          <p className="tagline">Where Fun Meets Future! 🎮 🎨  🎪</p>
          <Link
            to="/events"
            className="cta-button"
          >
            Explore Events
          </Link>
        </div>
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-8 h-12 rounded-full border-2 border-white flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-white rounded-full animate-scrollDown"></div>
          </div>
        </div>
      </section>
      {/* <AwesomeEvents isVisible={showEvents} /> */}
    </div>
  );
};

export default Home;