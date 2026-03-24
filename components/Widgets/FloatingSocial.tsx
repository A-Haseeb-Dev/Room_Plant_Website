
import React from 'react';
import { Instagram, Linkedin, Mail, MessageSquare } from 'lucide-react';

const FloatingSocial: React.FC = () => {
  const socialLinks = [
    { icon: <MessageSquare size={20} />, label: 'WhatsApp', color: 'bg-[#25D366]', href: '#' },
    { icon: <Instagram size={20} />, label: 'Instagram', color: 'bg-[#E1306C]', href: '#' },
    { icon: <Linkedin size={20} />, label: 'LinkedIn', color: 'bg-[#0077B5]', href: '#' },
    { icon: <Mail size={20} />, label: 'Email', color: 'bg-primary', href: '#' },
  ];

  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40 flex flex-col items-end group">
      {socialLinks.map((link, idx) => (
        <a
          key={idx}
          href={link.href}
          className={`${link.color} text-white p-3 mb-1 flex items-center justify-center hover:pr-8 transition-all rounded-l-lg shadow-lg relative overflow-hidden group/link`}
        >
          <span className="absolute right-12 opacity-0 group-hover/link:opacity-100 whitespace-nowrap text-xs font-bold uppercase transition-opacity">
            {link.label}
          </span>
          {link.icon}
        </a>
      ))}
    </div>
  );
};

export default FloatingSocial;
