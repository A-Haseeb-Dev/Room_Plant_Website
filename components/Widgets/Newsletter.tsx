
import React from 'react';

const Newsletter: React.FC = () => {
  return (
    <section className="py-24 bg-dark relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

      <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">Join the Plant Community</h2>
        <p className="text-gray-400 text-lg mb-10">
          Subscribe to get <span className="text-cta font-bold">10% OFF</span> your first order, 
          exclusive care tips, and early access to rare drops.
        </p>
        
        <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
          <input 
            type="email" 
            placeholder="Enter your email address" 
            className="flex-grow px-6 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            required
          />
          <button 
            type="submit"
            className="px-8 py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
          >
            Subscribe Now
          </button>
        </form>
        <p className="mt-4 text-xs text-gray-500 italic">No spam, just greens. Unsubscribe anytime.</p>
      </div>
    </section>
  );
};

export default Newsletter;
