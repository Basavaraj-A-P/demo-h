import React, { useEffect, useState } from 'react';

export const AmbientBackground: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-[#EFE9FB]">
      <div className="absolute inset-0 bg-white/10 z-10 pointer-events-none"></div>
      
      {isMobile ? (
        <img
          key="mobile-bg"
          src="/assets/background/mobile-bg.webp"
          alt="Ambient Mobile Background"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
      ) : (
        <img
          key="desktop-bg"
          src="/assets/background/desktop-bg.webp"
          alt="Ambient Desktop Background"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
      )}
    </div>
  );
};
