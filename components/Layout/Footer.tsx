
import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-100 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">R</span>
              </div>
              <span className="text-xl font-serif font-bold text-dark tracking-tight">Room Plant</span>
            </div>
            <p className="text-gray-500 text-sm max-w-sm leading-relaxed mb-6">
              Empowering urban dwellers and office spaces with the beauty of nature. 
              We are committed to sustainable sourcing and providing the healthiest plants 
              across the globe.
            </p>
            <div className="flex space-x-4 grayscale opacity-60">
              <img src="https://cdn-icons-png.flaticon.com/512/349/349221.png" alt="Visa" className="h-6" />
              <img src="https://cdn-icons-png.flaticon.com/512/349/349228.png" alt="Mastercard" className="h-6" />
              <img src="https://cdn-icons-png.flaticon.com/512/174/174861.png" alt="PayPal" className="h-6" />
            </div>
          </div>

          <div>
            <h4 className="font-bold text-dark mb-6">Shop</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><a href="#" className="hover:text-primary transition-colors">All Plants</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Best Sellers</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">New Arrivals</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Accessories</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Gift Cards</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-dark mb-6">Support</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><a href="#" className="hover:text-primary transition-colors">Shipping Info</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Returns & Exchanges</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Care FAQ</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Tracking</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-dark mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Sustainability</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Wholesale</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center text-gray-400 text-xs gap-4">
          <p>&copy; {currentYear} Room Plant. All rights reserved. Created with love for greens.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-primary transition-colors">Sitemap</a>
            <a href="#" className="hover:text-primary transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
