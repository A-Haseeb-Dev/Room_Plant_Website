
import React from 'react';
import { Plant } from '../../types';
import { Star, Plus, Eye } from 'lucide-react';

interface PlantCardProps {
  plant: Plant;
  onAddToCart: (plantId: string) => void;
  onViewDetails: (plant: Plant) => void;
}

const PlantCard: React.FC<PlantCardProps> = ({ plant, onAddToCart, onViewDetails }) => {
  return (
    <div className="plant-card opacity-0 group flex flex-col bg-white border border-gray-100 rounded-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
      <div className="relative aspect-[4/5] sm:h-72 overflow-hidden">
        <img 
          src={plant.image} 
          alt={plant.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {plant.isBestSeller && (
          <div className="absolute top-4 left-4 bg-accent text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm">
            Best Seller
          </div>
        )}
        {/* Mobile Interaction Layer (Always Visible on Touch Devices) */}
        <div className="absolute inset-0 bg-black/40 md:opacity-0 md:group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-3 sm:space-x-4">
          <button 
            onClick={() => onViewDetails(plant)}
            className="p-3 bg-white rounded-full text-dark hover:bg-primary hover:text-white transition-all transform md:translate-y-4 md:group-hover:translate-y-0 duration-300 shadow-lg active:scale-90"
            aria-label={`View details for ${plant.name}`}
          >
            <Eye size={22} />
          </button>
          <button 
            onClick={() => onAddToCart(plant.id)}
            className="p-3 bg-primary rounded-full text-white hover:bg-primary/90 transition-all transform md:translate-y-4 md:group-hover:translate-y-0 duration-300 delay-75 shadow-lg active:scale-90"
            aria-label={`Add ${plant.name} to cart`}
          >
            <Plus size={22} />
          </button>
        </div>
      </div>
      
      <div className="p-4 sm:p-6 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-1 sm:mb-2">
          <h3 className="text-base sm:text-lg font-bold text-dark group-hover:text-primary transition-colors truncate pr-2">{plant.name}</h3>
          <div className="flex items-center space-x-1 text-cta shrink-0">
            <Star size={14} fill="currentColor" />
            <span className="text-xs sm:text-sm font-bold">{plant.rating}</span>
          </div>
        </div>
        <p className="text-gray-500 italic text-xs sm:text-sm mb-4 truncate">{plant.scientificName}</p>
        <div className="mt-auto flex justify-between items-center">
          <span className="text-xl sm:text-2xl font-bold text-primary">${plant.price.toFixed(2)}</span>
          <span className={`text-[9px] sm:text-[10px] px-2 py-1 rounded-sm font-bold uppercase tracking-wider ${
            plant.careLevel === 'Easy' ? 'bg-green-100 text-green-700' :
            plant.careLevel === 'Intermediate' ? 'bg-blue-100 text-blue-700' :
            'bg-red-100 text-red-700'
          }`}>
            {plant.careLevel}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PlantCard;
