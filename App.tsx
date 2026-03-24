
import React, { useState, useCallback, useEffect, useRef } from 'react';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Hero from './components/Widgets/Hero';
import PlantGrid from './components/Widgets/PlantGrid';
import CareGuide from './components/Widgets/CareGuide';
import ShippingInfo from './components/Widgets/ShippingInfo';
import Newsletter from './components/Widgets/Newsletter';
import FloatingSocial from './components/Widgets/FloatingSocial';
import AICareAssistant from './components/Widgets/AICareAssistant';
import Preloader from './components/Shared/Preloader';
import CustomCursor from './components/Shared/CustomCursor';
import { Plant, CartItem } from './types';
import { PLANTS } from './constants';
import { X, Minus, Plus, Trash2, ShoppingBag, Star } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);
  const mainRef = useRef<HTMLDivElement>(null);

  // Body scroll lock when overlay is active
  useEffect(() => {
    if (isCartOpen || selectedPlant) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = 'var(--scrollbar-width, 0px)';
    } else {
      document.body.style.overflow = 'auto';
      document.body.style.paddingRight = '0px';
    }
  }, [isCartOpen, selectedPlant]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Testimonials reveal
      gsap.fromTo('.testimonial-header', 
        { y: 30, opacity: 0 },
        { 
          y: 0, opacity: 1, 
          duration: 0.8,
          scrollTrigger: {
            trigger: '.testimonial-header',
            start: 'top 85%',
          }
        }
      );

      gsap.fromTo('.testimonial-card', 
        { y: 40, opacity: 0 },
        { 
          y: 0, opacity: 1, 
          stagger: 0.2, 
          duration: 0.8,
          scrollTrigger: {
            trigger: '.testimonial-grid',
            start: 'top 80%',
          }
        }
      );
    }, mainRef);

    return () => ctx.revert();
  }, []);

  const addToCart = useCallback((plantId: string, quantity: number = 1) => {
    const plant = PLANTS.find(p => p.id === plantId);
    if (!plant) return;

    setCart(prev => {
      const existing = prev.find(item => item.id === plantId);
      if (existing) {
        return prev.map(item => 
          item.id === plantId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { ...plant, quantity }];
    });
    setIsCartOpen(true);
  }, []);

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      {!isLoading && <CustomCursor />}
      
      <div 
        ref={mainRef} 
        className={`min-h-screen bg-white flex flex-col ${isLoading ? 'invisible h-0 overflow-hidden' : 'visible opacity-100 transition-opacity duration-1000'}`}
      >
        <h1 className="sr-only">Buy Room Plants Online | Room Plant - Premium Indoor Greens</h1>
      
      <Navbar cartCount={cartCount} onCartClick={() => setIsCartOpen(true)} />
      
      <main className="flex-grow">
        <div id="home">
          <Hero onAddToCart={addToCart} />
        </div>
        <ShippingInfo />
        <PlantGrid onAddToCart={(id) => addToCart(id, 1)} onViewDetails={setSelectedPlant} />
        <CareGuide />
        
        <section id="about" className="py-16 md:py-24 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
             <div className="testimonial-header opacity-0 text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">What Our Plant Parents Say</h2>
              <div className="flex justify-center space-x-1 text-cta mb-2">
                {[1, 2, 3, 4, 5].map(i => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <p className="text-gray-500 text-sm md:text-base">Trusted by over 10,000+ happy customers worldwide.</p>
            </div>
            <div className="testimonial-grid grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {[
                { name: 'Sarah J.', city: 'New York', text: 'Stunning plants! Arrived so fresh.' },
                { name: 'Michael K.', city: 'Berlin', text: 'Fast international shipping. Recommended!' },
                { name: 'Eliza R.', city: 'Tokyo', text: 'The care guides are so helpful for beginners.' }
              ].map((t, idx) => (
                <div key={idx} className="testimonial-card opacity-0 p-6 md:p-8 bg-gray-50 rounded-lg relative">
                  <span className="text-5xl md:text-6xl text-primary/10 absolute top-4 left-4 font-serif">"</span>
                  <p className="text-gray-600 italic mb-6 relative z-10 text-sm md:text-base">{t.text}</p>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center font-bold text-accent shrink-0">
                      {t.name[0]}
                    </div>
                    <div>
                      <h4 className="font-bold text-dark text-sm">{t.name}</h4>
                      <p className="text-gray-400 text-xs">{t.city}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div id="contact">
          <Newsletter />
        </div>
      </main>
      
      <Footer />
      <FloatingSocial />
      <AICareAssistant />

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[100] overflow-hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" onClick={() => setIsCartOpen(false)}></div>
          <div className="absolute inset-y-0 right-0 w-full md:max-w-md flex">
            <div className="w-full bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
              <div className="p-4 md:p-6 border-b border-gray-100 flex justify-between items-center pb-[max(1rem,env(safe-area-inset-top))] pt-[max(1rem,env(safe-area-inset-top))]">
                <div className="flex items-center space-x-2">
                  <ShoppingBag className="text-primary" />
                  <h2 className="text-xl font-bold text-dark">Your Cart ({cartCount})</h2>
                </div>
                <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors active:scale-90">
                  <X size={24} />
                </button>
              </div>

              <div className="flex-grow overflow-y-auto p-4 md:p-6 space-y-6 scroll-touch">
                {cart.length === 0 ? (
                  <div className="text-center py-20">
                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <ShoppingBag size={40} className="text-gray-300" />
                    </div>
                    <p className="text-gray-500">Your cart is feeling empty.</p>
                    <button onClick={() => setIsCartOpen(false)} className="mt-4 text-primary font-bold hover:underline py-2 px-4">
                      Browse our collection
                    </button>
                  </div>
                ) : (
                  cart.map(item => (
                    <div key={item.id} className="flex space-x-4">
                      <div className="w-20 h-24 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" loading="lazy" />
                      </div>
                      <div className="flex-grow min-w-0">
                        <div className="flex justify-between items-start">
                          <h4 className="font-bold text-dark truncate pr-2">{item.name}</h4>
                          <button onClick={() => removeFromCart(item.id)} className="text-gray-300 hover:text-red-500 p-1 transition-colors">
                            <Trash2 size={18} />
                          </button>
                        </div>
                        <p className="text-sm text-gray-500 mb-2">${item.price.toFixed(2)}</p>
                        <div className="flex items-center space-x-3">
                          <button onClick={() => updateQuantity(item.id, -1)} className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors active:bg-gray-100">
                            <Minus size={14} />
                          </button>
                          <span className="font-medium w-6 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors active:bg-gray-100">
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-4 md:p-6 border-t border-gray-100 space-y-4 mb-[env(safe-area-inset-bottom)]">
                  <div className="flex justify-between text-lg">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-bold text-dark">${cartTotal.toFixed(2)}</span>
                  </div>
                  <p className="text-xs text-gray-400">Shipping and taxes calculated at checkout.</p>
                  <button className="w-full py-4 bg-primary text-white rounded-md font-bold text-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 active:scale-[0.98]">
                    Proceed to Checkout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Plant Details Modal */}
      {selectedPlant && (
        <div className="fixed inset-0 z-[110] overflow-hidden flex items-center justify-center p-0 md:p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity" onClick={() => setSelectedPlant(null)}></div>
          <div className="relative bg-white w-full md:max-w-4xl max-h-full md:max-h-[90vh] md:rounded-xl overflow-hidden shadow-2xl flex flex-col md:flex-row animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => setSelectedPlant(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur rounded-full text-dark hover:bg-white transition-colors shadow-lg active:scale-90"
            >
              <X size={20} />
            </button>
            
            <div className="md:w-1/2 h-72 md:h-auto overflow-hidden shrink-0 pt-[env(safe-area-inset-top)] md:pt-0">
              <img src={selectedPlant.image} alt={selectedPlant.name} className="w-full h-full object-cover" />
            </div>
            
            <div className="md:w-1/2 p-6 md:p-12 overflow-y-auto scroll-touch pb-[max(2rem,env(safe-area-inset-bottom))]">
              <div className="flex items-center space-x-2 text-primary text-xs md:text-sm font-bold uppercase tracking-wider mb-2">
                <ShoppingBag size={16} />
                <span>Shop Premium</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-dark mb-1">{selectedPlant.name}</h2>
              <p className="text-gray-500 italic mb-6 text-sm md:text-base">{selectedPlant.scientificName}</p>
              
              <div className="flex items-center space-x-4 mb-8">
                <span className="text-2xl md:text-3xl font-bold text-primary">${selectedPlant.price.toFixed(2)}</span>
                <div className="flex items-center space-x-1 text-cta">
                  <Star size={18} fill="currentColor" />
                  <span className="font-bold">{selectedPlant.rating}</span>
                  <span className="text-gray-400 text-xs md:text-sm font-normal">({selectedPlant.reviewsCount} reviews)</span>
                </div>
              </div>

              <div className="space-y-6 mb-10">
                <div>
                  <h4 className="font-bold text-dark mb-2">Description</h4>
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed">{selectedPlant.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-gray-50 rounded-md">
                    <p className="text-[10px] md:text-xs text-gray-400 uppercase font-bold mb-1">Care Level</p>
                    <p className="font-bold text-dark text-sm md:text-base">{selectedPlant.careLevel}</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-md">
                    <p className="text-[10px] md:text-xs text-gray-400 uppercase font-bold mb-1">Category</p>
                    <p className="font-bold text-dark capitalize text-sm md:text-base">{selectedPlant.category}</p>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <button 
                  onClick={() => { addToCart(selectedPlant.id, 1); setSelectedPlant(null); }}
                  className="flex-grow py-4 bg-cta text-white rounded-md font-bold hover:bg-cta/90 transition-all shadow-lg shadow-cta/20 active:scale-[0.98]"
                >
                  Add to Cart
                </button>
              </div>
              
              <div className="mt-8 pt-8 border-t border-gray-100 flex flex-wrap items-center gap-4 text-[10px] md:text-xs text-gray-400">
                <div className="flex items-center space-x-1">
                  <Plus size={12} />
                  <span>Secure Checkout</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Plus size={12} />
                  <span>Phytosanitary Cert</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Plus size={12} />
                  <span>Fast Delivery</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
    </>
  );
};

export default App;
