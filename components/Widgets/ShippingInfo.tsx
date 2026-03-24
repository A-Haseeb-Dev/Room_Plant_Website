
import React from 'react';
import { Truck, ShieldCheck, Globe2, RefreshCw } from 'lucide-react';

const ShippingInfo: React.FC = () => {
  const features = [
    { icon: <Truck size={32} />, title: 'Global Express', desc: 'Secure transit with premium carriers like DHL & FedEx.' },
    { icon: <ShieldCheck size={32} />, title: 'Guaranteed Fresh', desc: 'If your plant arrives unhappy, we replace it for free.' },
    { icon: <Globe2 size={32} />, title: '50+ Countries', desc: 'We ship to over 50 countries with phytosanitary certificates.' },
    { icon: <RefreshCw size={32} />, title: '30-Day Returns', desc: 'Hassle-free returns on all non-plant accessories.' },
  ];

  return (
    <section className="py-12 md:py-20 border-y border-gray-100 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {features.map((f, i) => (
            <div key={i} className="flex flex-col items-center text-center group px-4">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-primary/5 text-primary rounded-full flex items-center justify-center mb-4 md:mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <div className="scale-90 md:scale-100">{f.icon}</div>
              </div>
              <h4 className="text-lg md:text-xl font-bold text-dark mb-2">{f.title}</h4>
              <p className="text-gray-500 text-xs md:text-sm leading-relaxed max-w-[240px] md:max-w-none">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShippingInfo;
