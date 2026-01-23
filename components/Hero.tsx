
import React, { useState, useEffect, useRef } from 'react';
import { PLANTS } from '../constants';
import { ArrowRight, Leaf, ShoppingCart } from 'lucide-react';
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
      const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1 } });
      
      tl.fromTo('.hero-badge', { y: 20, opacity: 0 }, { y: 0, opacity: 1, delay: 0.2 })
        .fromTo('.hero-title', { y: 40, opacity: 0 }, { y: 0, opacity: 1 }, '-=0.8')
        .fromTo('.hero-desc', { y: 20, opacity: 0 }, { y: 0, opacity: 1 }, '-=0.7')
        .fromTo('.hero-btns', { y: 20, opacity: 0 }, { y: 0, opacity: 1 }, '-=0.7')
        .fromTo(formRef.current, { x: 50, opacity: 0 }, { x: 0, opacity: 1 }, '-=0.9');
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddToCart(selection.plantId, selection.quantity);
    alert(`Added to cart! We'll send shipping details to ${selection.email}`);
  };

  return (
    <section ref={heroRef} className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-white">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=2000" 
          alt="Lush green interior" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="hero-badge inline-flex items-center space-x-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold opacity-0">
              <Leaf size={16} />
              <span>Free Shipping on Orders Over $100</span>
            </div>
            <h1 className="hero-title text-5xl lg:text-7xl font-serif font-bold text-dark leading-tight opacity-0">
              Bring Nature <br />
              <span className="text-primary italic">To Your Doorstep</span>
            </h1>
            <p className="hero-desc text-lg text-gray-600 max-w-xl leading-relaxed opacity-0">
              Discover a curated collection of premium indoor plants. From low-maintenance succulents 
              to majestic monsteras, we bring the best of nature directly to your home.
            </p>

            <div className="hero-btns flex flex-wrap gap-4 opacity-0">
              <a href="#shop" className="px-8 py-4 bg-primary text-white rounded-lg font-semibold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all flex items-center space-x-2">
                <span>Browse Shop</span>
                <ArrowRight size={20} />
              </a>
              <a href="#about" className="px-8 py-4 bg-white text-dark border border-gray-200 rounded-lg font-semibold hover:border-primary hover:text-primary transition-all">
                Learn More
              </a>
            </div>
          </div>

          <div ref={formRef} className="opacity-0 bg-white/95 backdrop-blur-sm p-8 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white max-w-md ml-auto">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-dark mb-1">Quick Shop</h3>
              <p className="text-sm text-gray-500">Add our top favorite to your cart instantly.</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Your Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="John Doe"
                  className="w-full px-4 py-3.5 rounded-xl bg-gray-50 border border-gray-100 focus:ring-4 focus:ring-primary/10 focus:border-primary focus:bg-white outline-none transition-all placeholder:text-gray-300"
                  value={selection.name}
                  onChange={e => setSelection({...selection, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Email Address</label>
                <input 
                  type="email" 
                  required
                  placeholder="john@example.com"
                  className="w-full px-4 py-3.5 rounded-xl bg-gray-50 border border-gray-100 focus:ring-4 focus:ring-primary/10 focus:border-primary focus:bg-white outline-none transition-all placeholder:text-gray-300"
                  value={selection.email}
                  onChange={e => setSelection({...selection, email: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Plant</label>
                  <select 
                    className="w-full px-4 py-3.5 rounded-xl bg-gray-50 border border-gray-100 focus:ring-4 focus:ring-primary/10 focus:border-primary focus:bg-white outline-none appearance-none transition-all text-dark font-medium cursor-pointer"
                    value={selection.plantId}
                    onChange={e => setSelection({...selection, plantId: e.target.value})}
                  >
                    {PLANTS.map(p => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                  <div className="absolute right-4 bottom-4 pointer-events-none text-gray-400">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Qty</label>
                  <input 
                    type="number" 
                    min="1" 
                    className="w-full px-4 py-3.5 rounded-xl bg-gray-50 border border-gray-100 focus:ring-4 focus:ring-primary/10 focus:border-primary focus:bg-white outline-none transition-all text-dark font-medium"
                    value={selection.quantity}
                    onChange={e => setSelection({...selection, quantity: parseInt(e.target.value)})}
                  />
                </div>
              </div>
              <button 
                type="submit"
                className="w-full py-4 bg-cta text-white rounded-xl font-bold text-lg hover:bg-cta/90 transition-all shadow-xl shadow-cta/20 flex items-center justify-center space-x-2 group active:scale-[0.98]"
              >
                <span>Add to Cart</span>
                <ShoppingCart size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
