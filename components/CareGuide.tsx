
import React, { useEffect, useRef } from 'react';
import { Droplets, Sun, Wind, Thermometer } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CareGuide: React.FC = () => {
  const guideRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.guide-content', 
        { x: -50, opacity: 0 },
        { 
          x: 0, opacity: 1, 
          duration: 1,
          scrollTrigger: {
            trigger: guideRef.current,
            start: 'top 75%',
          }
        }
      );

      gsap.fromTo('.tip-card', 
        { scale: 0.9, opacity: 0 },
        { 
          scale: 1, opacity: 1, 
          stagger: 0.15, 
          duration: 0.6,
          scrollTrigger: {
            trigger: '.tip-grid',
            start: 'top 80%',
          }
        }
      );

      gsap.fromTo('.guide-media', 
        { x: 50, opacity: 0 },
        { 
          x: 0, opacity: 1, 
          duration: 1,
          scrollTrigger: {
            trigger: guideRef.current,
            start: 'top 75%',
          }
        }
      );
    }, guideRef);

    return () => ctx.revert();
  }, []);

  const tips = [
    { icon: <Droplets className="text-blue-500" />, title: 'Watering', desc: 'Check soil moisture 2 inches deep before watering.' },
    { icon: <Sun className="text-yellow-500" />, title: 'Lighting', desc: 'Most room plants prefer bright, indirect sunlight.' },
    { icon: <Thermometer className="text-red-500" />, title: 'Humidity', desc: 'Mist leaves or use a pebble tray for tropical plants.' },
    { icon: <Wind className="text-primary" />, title: 'Air Flow', desc: 'Avoid placing plants directly near AC vents or heaters.' },
  ];

  return (
    <section ref={guideRef} className="py-24 bg-gray-50 overflow-hidden" id="care-guides">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="guide-content opacity-0">
            <h2 className="text-4xl font-bold text-dark mb-6">Expert Plant Care Guides</h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              We don't just sell plants; we ensure they thrive in your space. Our expert-led guides 
              cover everything from basic maintenance to advanced propagation techniques.
            </p>
            <div className="tip-grid grid sm:grid-cols-2 gap-6">
              {tips.map((tip, idx) => (
                <div key={idx} className="tip-card opacity-0 p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="mb-4">{tip.icon}</div>
                  <h4 className="font-bold text-dark mb-2">{tip.title}</h4>
                  <p className="text-sm text-gray-500">{tip.desc}</p>
                </div>
              ))}
            </div>
            <button className="mt-10 px-8 py-3 bg-accent text-white rounded-lg font-semibold hover:bg-accent/90 transition-all">
              Explore All Guides
            </button>
          </div>
          
          <div className="guide-media opacity-0 relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&q=80&w=800" 
                alt="Person caring for plant" 
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                <button className="w-16 h-16 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform text-primary">
                  <PlayIcon size={24} />
                </button>
              </div>
            </div>
            <div className="absolute -bottom-8 -left-8 p-6 bg-white rounded-2xl shadow-xl max-w-xs hidden md:block">
              <p className="text-dark font-medium">"Our ZZ plant from Room Plant is still growing strong 2 years later!"</p>
              <p className="text-primary text-sm mt-2">- Urban Jungle Team</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const PlayIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5v14l11-7z" />
  </svg>
);

export default CareGuide;
