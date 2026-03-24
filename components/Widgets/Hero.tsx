
import React, { useState, useEffect, useRef } from 'react';
import { PLANTS } from '../../constants';
import { ArrowRight, Leaf, ShoppingCart, ChevronDown } from 'lucide-react';
import gsap from 'gsap';

interface HeroProps {
  onAddToCart: (plantId: string, quantity: number) => void;
}

const Hero: React.FC<HeroProps> = ({ onAddToCart }) => {
  const [selection, setSelection] = useState({
    name: '',
    email: '',
    plantId: PLANTS[0].id,
    quantity: 1
  });

  const heroRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 1024;
      
      // Initial state is opacity 0 from Tailwind classes
      const tl = gsap.timeline({ 
        defaults: { ease: 'expo.out', duration: 1.2 } 
      });
      
      tl.fromTo('.hero-badge', 
          { y: 30, opacity: 0 }, 
          { y: 0, opacity: 1, delay: 0.3 }
        )
        .fromTo('.hero-title', 
          { y: 50, opacity: 0 }, 
          { y: 0, opacity: 1 }, 
          '-=1.0'
        )
        .fromTo('.hero-desc', 
          { y: 40, opacity: 0 }, 
          { y: 0, opacity: 1 }, 
          '-=0.9'
        )
        .fromTo('.hero-btns', 
          { y: 30, opacity: 0 }, 
          { y: 0, opacity: 1 }, 
          '-=0.8'
        )
        .fromTo(formRef.current, 
          { 
            x: isMobile ? 0 : 60, 
            y: isMobile ? 40 : 0, 
            opacity: 0,
            scale: 0.95
          }, 
          { 
            x: 0, 
            y: 0, 
            opacity: 1, 
            scale: 1,
            duration: 1.4,
            ease: 'elastic.out(1, 0.8)'
          }, 
          '-=1.1'
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddToCart(selection.plantId, selection.quantity);
    
    const btn = e.currentTarget.querySelector('button');
    if (btn) {
      const originalText = btn.innerHTML;
      btn.innerHTML = 'Added!';
      btn.classList.add('bg-green-600');
      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.classList.remove('bg-green-600');
      }, 2000);
    }
  };

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center pt-24 pb-12 lg:pt-32 lg:pb-20 overflow-hidden bg-white">
      {/* Background and Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=2000" 
          alt="Lush green interior" 
          className="w-full h-full object-cover object-center md:object-[center_25%] opacity-25 md:opacity-20"
        />
        {/* Responsive Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/80 to-white lg:bg-gradient-to-r lg:from-white lg:via-white/70 lg:to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Text Content */}
          <div className="space-y-6 md:space-y-8 text-center lg:text-left">
            <div className="hero-badge inline-flex items-center space-x-2 px-4 py-1.5 bg-primary/10 text-primary rounded-full text-xs sm:text-sm font-semibold opacity-0 mx-auto lg:mx-0">
              <Leaf size={16} />
              <span>Free Global Shipping on Orders Over $100</span>
            </div>
            
            <h1 className="hero-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-dark leading-[1.1] opacity-0">
              Bring Nature <br className="hidden sm:block" />
              <span className="text-primary italic">To Your Doorstep</span>
            </h1>
            
            <p className="hero-desc text-base sm:text-lg text-gray-600 max-w-xl leading-relaxed opacity-0 mx-auto lg:mx-0">
              Discover a curated collection of premium indoor plants. From low-maintenance succulents 
              to majestic monsteras, we bring the best of nature directly to your home.
            </p>

            <div className="hero-btns flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 opacity-0">
              <a href="#shop" className="w-full sm:w-auto px-8 py-4 bg-primary text-white rounded-md font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all flex items-center justify-center space-x-2 active:scale-95">
                <span>Browse Shop</span>
                <ArrowRight size={20} />
              </a>
              <a href="#about" className="w-full sm:w-auto px-8 py-4 bg-white/50 backdrop-blur-sm text-dark border border-gray-200 rounded-md font-bold hover:border-primary hover:text-primary transition-all active:scale-95 text-center">
                Learn More
              </a>
            </div>
          </div>

          {/* Quick Shop Form */}
          <div ref={formRef} className="opacity-0 w-full max-w-md mx-auto lg:ml-auto">
            <div className="bg-white/95 backdrop-blur-md p-6 sm:p-8 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white/50">
              <div className="mb-6">
                <h3 className="text-xl sm:text-2xl font-bold text-dark mb-1">Quick Shop</h3>
                <p className="text-sm text-gray-500">Add our top favorite to your cart instantly.</p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Your Name</label>
                  <input 
                    type="text" 
                    required
                    placeholder="John Doe"
                    className="w-full px-4 py-3 sm:py-3.5 rounded-md bg-gray-50/50 border border-gray-100 focus:ring-4 focus:ring-primary/10 focus:border-primary focus:bg-white outline-none transition-all placeholder:text-gray-300 text-sm md:text-base"
                    value={selection.name}
                    onChange={e => setSelection({...selection, name: e.target.value})}
                  />
                </div>
                
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                  <input 
                    type="email" 
                    required
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 sm:py-3.5 rounded-md bg-gray-50/50 border border-gray-100 focus:ring-4 focus:ring-primary/10 focus:border-primary focus:bg-white outline-none transition-all placeholder:text-gray-300 text-sm md:text-base"
                    value={selection.email}
                    onChange={e => setSelection({...selection, email: e.target.value})}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div className="relative space-y-1.5">
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Plant</label>
                    <div className="relative">
                      <select 
                        className="w-full px-4 py-3 sm:py-3.5 rounded-md bg-gray-50/50 border border-gray-100 focus:ring-4 focus:ring-primary/10 focus:border-primary focus:bg-white outline-none appearance-none transition-all text-dark font-medium cursor-pointer text-sm md:text-base pr-10"
                        value={selection.plantId}
                        onChange={e => setSelection({...selection, plantId: e.target.value})}
                      >
                        {PLANTS.map(p => (
                          <option key={p.id} value={p.id}>{p.name}</option>
                        ))}
                      </select>
                      <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" />
                    </div>
                  </div>
                  
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Qty</label>
                    <input 
                      type="number" 
                      min="1" 
                      className="w-full px-4 py-3 sm:py-3.5 rounded-md bg-gray-50/50 border border-gray-100 focus:ring-4 focus:ring-primary/10 focus:border-primary focus:bg-white outline-none transition-all text-dark font-medium text-sm md:text-base"
                      value={selection.quantity}
                      onChange={e => setSelection({...selection, quantity: parseInt(e.target.value)})}
                    />
                  </div>
                </div>
                
                <button 
                  type="submit"
                  className="w-full py-4 bg-cta text-white rounded-md font-bold text-base md:text-lg hover:bg-cta/90 transition-all shadow-xl shadow-cta/20 flex items-center justify-center space-x-2 group active:scale-[0.98] mt-2"
                >
                  <span>Add to Cart</span>
                  <ShoppingCart size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default Hero;
