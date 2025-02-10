// src/components/CustomCursor.tsx
import { useEffect, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  life: number;
}

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isClicked, setIsClicked] = useState(false);

  const createParticles = (x: number, y: number) => {
    const newParticles: Particle[] = [];
    for (let i = 0; i < 8; i++) {
      const angle = (Math.PI * 2 * i) / 8;
      newParticles.push({
        x,
        y,
        size: Math.random() * 3 + 2,
        speedX: Math.cos(angle) * (Math.random() * 5 + 3),
        speedY: Math.sin(angle) * (Math.random() * 5 + 3),
        life: 1
      });
    }
    setParticles(newParticles);
  };

  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement;
      setIsPointer(
        window.getComputedStyle(target).cursor === 'pointer' ||
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') !== null ||
        target.closest('button') !== null
      );
    };

    const handleClick = (e: MouseEvent) => {
      setIsClicked(true);
      createParticles(e.clientX, e.clientY);
      setTimeout(() => setIsClicked(false), 300);
    };

    window.addEventListener('mousemove', updateCursor);
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('mousemove', updateCursor);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  useEffect(() => {
    if (particles.length > 0) {
      const animateParticles = () => {
        setParticles(prevParticles =>
          prevParticles
            .map(particle => ({
              ...particle,
              x: particle.x + particle.speedX,
              y: particle.y + particle.speedY,
              life: particle.life - 0.02,
              speedX: particle.speedX * 0.98,
              speedY: particle.speedY * 0.98
            }))
            .filter(particle => particle.life > 0)
        );
      };

      const animationFrame = requestAnimationFrame(animateParticles);
      return () => cancelAnimationFrame(animationFrame);
    }
  }, [particles]);

  return (
    <>
      {/* Main cursor */}
      <div
        className={`fixed pointer-events-none z-50 transition-transform duration-150
                   ${isClicked ? 'scale-90' : isPointer ? 'scale-150' : 'scale-100'}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
          zIndex: 100000
        }}
      >
        <div className="relative">
          {/* Inner cursor */}
          <div className="w-4 h-4 bg-[#FF3366] rounded-full 
                        transition-transform duration-150" />
          
          {/* Outer ring */}
          <div className="absolute inset-0 -m-1 w-6 h-6 border-2 border-[#FF3366] 
                        rounded-full opacity-60 transition-transform duration-150" />
        </div>
      </div>

      {/* Trailing cursor */}
      <div
        className="fixed pointer-events-none z-40 transition-all duration-300 ease-out"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)'
        }}
      >
        <div className="w-8 h-8 bg-[#FF3366]/20 rounded-full" />
      </div>

      {/* Particles */}
      {particles.map((particle, index) => (
        <div
          key={index}
          className="fixed pointer-events-none z-50 w-1 h-1 bg-[#FF3366]"
          style={{
            left: particle.x,
            top: particle.y,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.life,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}
    </>
  );
};

export default CustomCursor;