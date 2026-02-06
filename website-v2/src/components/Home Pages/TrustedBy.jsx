import React, { useState, useEffect, useRef } from 'react';

// Animated Stat Component (UNMODIFIED)
const AnimatedStat = ({ stat }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const statRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            animateCount();
          }
        });
      },
      { threshold: 0.5 }
    );

    if (statRef.current) {
      observer.observe(statRef.current);
    }

    return () => {
      if (statRef.current) {
        observer.unobserve(statRef.current);
      }
    };
  }, [hasAnimated]);

  const animateCount = () => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = stat.number / steps;
    let current = 0;
    const stepTime = duration / steps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= stat.number) {
        setCount(stat.number);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, stepTime);
  };

  return (
    <div ref={statRef} className="text-center group">
      <h3 className="text-5xl md:text-6xl font-bold text-[#2D4DE8] mb-3 group-hover:scale-110 transition-transform duration-300">
        {count}{stat.suffix}
      </h3>
      <p className="text-base md:text-lg font-semibold text-black leading-tight">
        {stat.label}
      </p>
    </div>
  );
};


// Main Component
const TrustedBy = () => {
  const stats = [
    { number: 100, label: 'AI Experts', suffix: '+' },
    { number: 160, label: 'Software Products Delivered', suffix: '+' },
    { number: 50, label: 'AI Solutions', suffix: '+' },
    { number: 15, label: 'Total Years of Experience', suffix: '+' }
  ];
    
  // Only logos from the provided image
  const logos = [
    { name: 'RACKSPACE', type: 'text', fontSize: 'text-2xl', margin: 'm-0' },
    { name: 'U.S. ARMY', type: 'text', fontSize: 'text-2xl', margin: 'm-0' },
    { name: 'ESPN', type: 'text', fontSize: 'text-3xl', margin: 'm-0' },
    { name: 'SIEMENS', type: 'text', fontSize: 'text-2xl', margin: 'm-0' },
    { name: 'HERSHEY\'S', type: 'text', fontSize: 'text-2xl', margin: 'm-0' },
  ];


  return (
    <section className="bg-[#F5F5F5] py-20">
      <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-20">
        
        {/* Trusted By Heading */}
        <h2 className="text-center text-4xl sm:text-5xl font-bold text-black mb-16 font-serif" style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
          Trusted By Leading Enterprises
        </h2>

        {/* Animated Company Logos - Infinite Scroll */}
        <div className="relative overflow-hidden mb-20">
          <style jsx>{`
            @keyframes scroll {
              0% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(-50%);
              }
            }
            .animate-scroll {
              animation: scroll 20s linear infinite;
            }
            .animate-scroll:hover {
              animation-play-state: paused;
            }
          `}</style>
           
          <div className="flex animate-scroll">
            {/* First set of logos */}
            {logos.map((logo, index) => (
              <div 
                key={`first-${index}`}
                className="flex-shrink-0 w-48 h-16 mx-8 flex justify-center items-center grayscale hover:grayscale-0 transition duration-300 opacity-75 hover:opacity-100"
              >
                <span className={`${logo.fontSize} font-bold text-gray-800 uppercase ${logo.margin} whitespace-nowrap`}>
                  {logo.name}
                </span>
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {logos.map((logo, index) => (
              <div 
                key={`second-${index}`}
                className="flex-shrink-0 w-48 h-16 mx-8 flex justify-center items-center grayscale hover:grayscale-0 transition duration-300 opacity-75 hover:opacity-100"
              >
                <span className={`${logo.fontSize} font-bold text-gray-800 uppercase ${logo.margin} whitespace-nowrap`}>
                  {logo.name}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Separator for Visual Break */}
        <div className="w-1/3 mx-auto h-[1px] bg-gray-300 my-10"></div>

        {/* Statistics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mt-16">
          {stats.map((stat, index) => (
            <AnimatedStat key={index} stat={stat} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default TrustedBy;