import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          y: '-100%',
          duration: 1,
          ease: 'power4.inOut',
          onComplete: onComplete,
        });
      },
    });

    // Initial reveal
    tl.to(logoRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out',
    });

    // Progress animation
    const progressObj = { value: 0 };
    tl.to(progressObj, {
      value: 100,
      duration: 2.5,
      ease: 'power1.inOut',
      onUpdate: () => {
        const val = Math.floor(progressObj.value);
        setPercentage(val);
        if (barRef.current) {
          barRef.current.style.width = `${val}%`;
        }
      },
    }, '-=0.5');

    // Logo exit
    tl.to(logoRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.5,
      ease: 'power2.in',
    });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div ref={containerRef} className="preloader-container">
      <div 
        ref={logoRef} 
        className="preloader-logo flex flex-col items-center"
        style={{ transform: 'translateY(20px)' }}
      >
        <span className="text-5xl mb-2">🌿</span>
        <h2 className="text-3xl font-bold tracking-tight">Room Plant</h2>
        <p className="text-sm font-sans text-gray-400 mt-1 uppercase tracking-widest">Premium Indoor Greens</p>
      </div>
      
      <div className="flex flex-col items-center">
        <div className="preloader-bar-container">
          <div ref={barRef} className="preloader-bar" />
        </div>
        <div className="preloader-percentage">
          {percentage}%
        </div>
      </div>
    </div>
  );
};

export default Preloader;
