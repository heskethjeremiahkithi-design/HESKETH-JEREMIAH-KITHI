import React from 'react';
import { ShoppingCart, Compass, Monitor, Globe, ShieldCheck } from 'lucide-react';
import { CartItem } from '../types';

interface HeaderProps {
  cart: CartItem[];
  onOpenCart: () => void;
  activeSection: string;
  onNavigate: (section: string) => void;
  onOpenTracker: () => void;
}

export default function Header({
  cart,
  onOpenCart,
  activeSection,
  onNavigate,
  onOpenTracker,
}: HeaderProps) {
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#030d22]/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* LOGO AREA - Custom SVG reproducing "IH-TeCH" logo */}
        <div 
          className="flex flex-col cursor-pointer group"
          onClick={() => onNavigate('hero')}
        >
          <div className="flex items-center gap-2">
            {/* Custom SVG replicating the exact shape in the image */}
            <svg 
              width="45" 
              height="30" 
              viewBox="0 0 160 100" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="transition-transform duration-300 group-hover:scale-105"
            >
              <defs>
                <linearGradient id="logo-grad" x1="0%" y1="100%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
              </defs>
              {/* I capsule */}
              <rect x="10" y="30" width="12" height="50" rx="6" fill="url(#logo-grad)" />
              
              {/* H left tall capsule */}
              <rect x="30" y="20" width="12" height="70" rx="6" fill="url(#logo-grad)" />
              
              {/* H connector & other capsules */}
              <rect x="50" y="30" width="12" height="50" rx="6" fill="url(#logo-grad)" />
              <rect x="62" y="49" width="30" height="12" rx="3" fill="url(#logo-grad)" />
              <rect x="92" y="30" width="12" height="50" rx="6" fill="url(#logo-grad)" />
              
              {/* Little dash */}
              <rect x="110" y="49" width="16" height="10" rx="3" fill="url(#logo-grad)" />
            </svg>
            
            <div className="flex flex-col">
              <span className="font-sans text-xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                IH-TeCH
              </span>
              <span className="text-[7.5px] font-bold tracking-widest text-blue-400 uppercase -mt-1">
                An Excellent ICT Solution Provider
              </span>
            </div>
          </div>
          <span className="text-[10px] text-gray-400 font-semibold tracking-wide ml-[2px] mt-0.5">
            HESKETH COMPUTERS & ACCESSORIES
          </span>
        </div>

        {/* NAVIGATION LINKS */}
        <nav className="hidden md:flex items-center gap-1">
          {[
            { id: 'wholesale', label: 'Wholesale Computers', icon: Monitor },
            { id: 'cyber', label: 'Cyber Cafe Services', icon: Globe },
            { id: 'design', label: 'Graphic Design Studio', icon: Compass },
          ].map((item) => {
            const IconComponent = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-500 to-emerald-600 text-white shadow-sm'
                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <IconComponent className="w-4 h-4" />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* ACTION BUTTONS */}
        <div className="flex items-center gap-4">
          <button
            onClick={onOpenTracker}
            className="hidden sm:flex items-center gap-1.5 px-4 py-2 border border-white/10 rounded-full text-xs font-semibold text-gray-300 hover:border-white/20 hover:bg-white/5 transition-all duration-150"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            Track Request
          </button>

          {/* SHOPPING CART CONTAINER */}
          <button
            onClick={onOpenCart}
            id="shopping-cart-btn"
            className="relative flex items-center justify-center p-2.5 rounded-full border border-white/10 hover:border-white/20 hover:bg-white/5 text-gray-300 transition-all duration-200"
            aria-label="Open Cart"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-sm animate-pulse">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
