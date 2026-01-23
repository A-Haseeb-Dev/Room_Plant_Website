
import React, { useEffect, useRef } from 'react';
import { CATEGORIES, PLANTS } from '../constants';
import { Plant } from '../types';
import { Star, Plus, Eye } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface PlantGridProps {
  onAddToCart: (plantId: string) => void;
  onViewDetails: (plant: Plant) => void;
}

const PlantGrid: React.FC<PlantGridProps> = ({ onAddToCart, onViewDetails }) => {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Categories reveal
      gsap.fromTo('.category-card', 
        { y: 50, opacity: 0 },
        { 
          y: 0, opacity: 1, 
          stagger: 0.1, 
          duration: 0.8,
          scrollTrigger: {
            trigger: '.category-grid',
            start: 'top 80%',
          }
        }
      );

      // Best sellers title reveal
      gsap.fromTo('.section-title', 
        { y: 30, opacity: 0 },
        { 
          y: 0, opacity: 1, 
          duration: 0.8,
          scrollTrigger: {
            trigger: '.section-title',
            start: 'top 85%',
          }
        }
      );

      // Product cards reveal
      gsap.fromTo('.plant-card', 
        { y: 60, opacity: 0 },
        { 
          y: 0, opacity: 1, 
          stagger: 0.1, 
          duration: 0.8,
          scrollTrigger: {
            trigger: '.product-grid',
            start: 'top 80%',
          }
        }
      );
    }, gridRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={gridRef} className="py-24 bg-white" id="shop">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Categories */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-dark mb-4 section-title opacity-0">Shop by Category</h2>
            <p className="text-gray-600 section-title opacity-0">Find the perfect green companion for every corner of your life.</p>
          </div>
          <div className="category-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {CATEGORIES.map((cat) => (
              <a 
                key={cat.id} 
                href={`#cat-${cat.id}`}
                className="category-card opacity-0 group relative h-64 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all"
              >
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4">
                  <h3 className="text-white font-bold text-lg">{cat.name}</h3>
                  <p className="text-white/70 text-xs mt-1">{cat.description}</p>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Featured Products */}
        <div id="best-sellers">
          <div className="flex justify-between items-end mb-12 section-title opacity-0">
            <div>
              <h2 className="text-4xl font-bold text-dark mb-2">Best Sellers</h2>
              <p className="text-gray-600">Most loved by our international plant community.</p>
            </div>
            <a href="#" className="text-primary font-semibold flex items-center space-x-1 hover:underline">
              <span>View All</span>
              <Plus size={16} />
            </a>
          </div>
          
          <div className="product-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {PLANTS.map((plant) => (
              <div key={plant.id} className="plant-card opacity-0 group flex flex-col bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300">
                <div className="relative h-72 overflow-hidden">
                  <img 
                    src={plant.image} 
                    alt={plant.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {plant.isBestSeller && (
                    <div className="absolute top-4 left-4 bg-accent text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                      Best Seller
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-4">
                    <button 
                      onClick={() => onViewDetails(plant)}
                      className="p-3 bg-white rounded-full text-dark hover:bg-primary hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-300"
                    >
                      <Eye size={20} />
                    </button>
                    <button 
                      onClick={() => onAddToCart(plant.id)}
                      className="p-3 bg-primary rounded-full text-white hover:bg-primary/90 transition-all transform translate-y-4 group-hover:translate-y-0 duration-300 delay-75"
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                </div>
                
                <div className="p-6 flex-grow flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-dark group-hover:text-primary transition-colors">{plant.name}</h3>
                    <div className="flex items-center space-x-1 text-cta">
                      <Star size={14} fill="currentColor" />
                      <span className="text-sm font-bold">{plant.rating}</span>
                    </div>
                  </div>
                  <p className="text-gray-500 italic text-sm mb-4">{plant.scientificName}</p>
                  <div className="mt-auto flex justify-between items-center">
                    <span className="text-2xl font-bold text-primary">${plant.price.toFixed(2)}</span>
                    <span className={`text-xs px-2 py-1 rounded-md font-medium ${
                      plant.careLevel === 'Easy' ? 'bg-green-100 text-green-700' :
                      plant.careLevel === 'Intermediate' ? 'bg-blue-100 text-blue-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {plant.careLevel} Care
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantGrid;
