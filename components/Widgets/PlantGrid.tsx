
import React, { useEffect, useRef } from 'react';
import { CATEGORIES, PLANTS } from '../../constants';
import { Plant } from '../../types';
import { Plus, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PlantCard from '../Shared/PlantCard';

gsap.registerPlugin(ScrollTrigger);

interface PlantGridProps {
  onAddToCart: (plantId: string) => void;
  onViewDetails: (plant: Plant) => void;
}

const PlantGrid: React.FC<PlantGridProps> = ({ onAddToCart, onViewDetails }) => {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.category-card', 
        { y: 30, opacity: 0 },
        { 
          y: 0, opacity: 1, 
          stagger: 0.1, 
          duration: 0.8,
          scrollTrigger: {
            trigger: '.category-grid',
            start: 'top 85%',
          }
        }
      );

      gsap.fromTo('.section-title', 
        { y: 20, opacity: 0 },
        { 
          y: 0, opacity: 1, 
          duration: 0.8,
          scrollTrigger: {
            trigger: '.section-title-wrap',
            start: 'top 85%',
          }
        }
      );

      gsap.fromTo('.plant-card', 
        { y: 40, opacity: 0 },
        { 
          y: 0, opacity: 1, 
          stagger: 0.1, 
          duration: 0.8,
          scrollTrigger: {
            trigger: '.product-grid',
            start: 'top 85%',
          }
        }
      );
    }, gridRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={gridRef} className="py-16 md:py-24 bg-white" id="shop">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Categories */}
        <div className="mb-16 md:mb-24">
          <div className="text-center mb-10 md:mb-14 section-title-wrap">
            <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4 section-title opacity-0">Shop by Category</h2>
            <p className="text-gray-600 section-title opacity-0 max-w-2xl mx-auto">Find the perfect green companion for every corner of your life, from low light survivors to sunny statement pieces.</p>
          </div>
          <div className="category-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {CATEGORIES.map((cat) => (
              <a 
                key={cat.id} 
                href={`#cat-${cat.id}`}
                className="category-card opacity-0 group relative h-48 sm:h-64 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all"
              >
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4">
                  <h3 className="text-white font-bold text-sm sm:text-lg">{cat.name}</h3>
                  <p className="text-white/70 text-[10px] sm:text-xs mt-1 line-clamp-1">{cat.description}</p>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Featured Products */}
        <div id="best-sellers">
          <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end mb-10 md:mb-12 section-title-wrap gap-4">
            <div className="text-center sm:text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-dark mb-2 section-title opacity-0">Best Sellers</h2>
              <p className="text-gray-600 section-title opacity-0">Most loved by our international plant community.</p>
            </div>
            <a href="#" className="section-title opacity-0 text-primary font-bold flex items-center space-x-2 px-4 py-2 bg-primary/5 rounded-md hover:bg-primary/10 transition-all">
              <span>View All</span>
              <ArrowRight size={18} />
            </a>
          </div>
          
          <div className="product-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {PLANTS.map((plant) => (
              <PlantCard 
                key={plant.id} 
                plant={plant} 
                onAddToCart={onAddToCart} 
                onViewDetails={onViewDetails} 
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantGrid;
