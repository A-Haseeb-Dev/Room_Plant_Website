
import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ShoppingCart, Globe, ChevronDown, Search, Instagram, Facebook, Twitter, ArrowRight } from 'lucide-react';
import gsap from 'gsap';

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount, onCartClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      menu.style.display = 'block';
      
      const tl = gsap.timeline();
      tl.fromTo(menu, 
        { opacity: 0, x: '100%' }, 
        { opacity: 1, x: '0%', duration: 0.5, ease: 'expo.out' }
      ).fromTo(
        '.mobile-nav-item',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, duration: 0.4, ease: 'power2.out' },
        '-=0.3'
      );
    } else {
      document.body.style.overflow = 'auto';
      gsap.to(menu, {
        opacity: 0,
        x: '100%',
        duration: 0.4,
        ease: 'expo.in',
        onComplete: () => {
          if (menu) menu.style.display = 'none';
        }
      });
    }
  }, [isOpen]);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Shop All', href: '#shop' },
    { name: 'Best Sellers', href: '#best-sellers' },
    { name: 'Plant Care', href: '#care-guides' },
    { name: 'Our Story', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-xl border-b border-gray-100">
      {/* Top Safe Area Spacer for the main bar if needed, but usually fixed top-0 handles it with viewport-fit=cover */}
      <div className="h-[env(safe-area-inset-top)] bg-white/90"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo Section */}
          <div className="flex items-center">
            <a href="#home" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-primary rounded-md flex items-center justify-center group-hover:rotate-12 transition-all duration-500 shadow-lg shadow-primary/20">
                <span className="text-white font-bold text-xl">R</span>
              </div>
              <span className="text-xl md:text-2xl font-serif font-bold text-dark tracking-tight">Room Plant</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-500 hover:text-primary text-sm font-semibold transition-all relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-primary hover:after:w-full after:transition-all"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Action Icons */}
          <div className="flex items-center space-x-1 sm:space-x-4">
            <button className="p-2.5 text-gray-400 hover:text-primary transition-colors hidden sm:block active:scale-90" aria-label="Search">
              <Search size={22} />
            </button>
            
            <button 
              onClick={onCartClick}
              className="relative p-2.5 text-dark hover:text-primary transition-all active:scale-90"
              aria-label="View Cart"
            >
              <ShoppingCart size={24} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute top-1.5 right-1.5 inline-flex items-center justify-center w-5 h-5 text-[10px] font-black text-white bg-cta rounded-full border-2 border-white shadow-sm animate-in zoom-in">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Toggle Button */}
            <button
              onClick={() => setIsOpen(true)}
              className="lg:hidden p-2.5 text-dark hover:text-primary transition-colors active:scale-95 bg-gray-50 rounded-md"
              aria-label="Open Menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Professional Full-screen Mobile Menu */}
      <div 
        ref={menuRef}
        className="fixed inset-0 z-[60] bg-white hidden opacity-0 touch-none h-[100dvh]"
      >
        <div className="flex flex-col h-full overflow-hidden">
          {/* Mobile Menu Header - High consistency with the main nav */}
          <div className="flex items-center justify-between px-6 h-20 border-b border-gray-50 pt-[env(safe-area-inset-top)] box-content">
             <div className="flex items-center space-x-3">
                <div className="w-9 h-9 bg-primary rounded-md flex items-center justify-center">
                  <span className="text-white font-bold text-lg">R</span>
                </div>
                <span className="font-serif font-bold text-xl text-dark">Room Plant</span>
             </div>
             <button 
                onClick={() => setIsOpen(false)}
                className="p-3 text-dark hover:text-primary transition-all bg-gray-50 rounded-full active:rotate-90 active:scale-90"
             >
               <X size={24} />
             </button>
          </div>

          {/* Scrollable Content Area */}
          <div className="flex-grow overflow-y-auto scroll-touch px-8 py-10 flex flex-col">
            <div className="mb-auto space-y-8">
              <p className="mobile-nav-item text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Navigation</p>
              <div className="flex flex-col space-y-6">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="mobile-nav-item text-4xl font-serif font-bold text-dark hover:text-primary transition-colors flex items-center justify-between group"
                    onClick={() => setIsOpen(false)}
                  >
                    <span>{link.name}</span>
                    <ArrowRight size={24} className="opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all text-primary" />
                  </a>
                ))}
              </div>
            </div>
            
            <div className="mt-12 space-y-8 pb-[max(2rem,env(safe-area-inset-bottom))]">
               <div className="mobile-nav-item">
                  <button 
                    onClick={() => { setIsOpen(false); window.location.href = '#shop'; }}
                    className="w-full py-5 bg-primary text-white rounded-lg font-bold text-lg shadow-xl shadow-primary/20 flex items-center justify-center space-x-3 active:scale-[0.98] transition-transform"
                  >
                    <span>Explore Collection</span>
                    <ArrowRight size={20} />
                  </button>
               </div>

               <div className="mobile-nav-item flex items-center justify-between border-t border-gray-100 pt-8">
                  <div className="flex space-x-6 text-gray-400">
                    <a href="#" className="hover:text-primary transition-all hover:-translate-y-1"><Instagram size={24} /></a>
                    <a href="#" className="hover:text-primary transition-all hover:-translate-y-1"><Facebook size={24} /></a>
                    <a href="#" className="hover:text-primary transition-all hover:-translate-y-1"><Twitter size={24} /></a>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500 font-medium">
                    <Globe size={16} className="text-primary" />
                    <span>Global</span>
                  </div>
               </div>

               <div className="mobile-nav-item text-center">
                  <p className="text-gray-400 text-[10px] tracking-wide">© 2024 ROOM PLANT • EST. IN LONDON</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
