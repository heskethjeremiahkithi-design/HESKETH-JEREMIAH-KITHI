import React from 'react';
import { Mail, Phone, MapPin, Clock, Star, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white border-t border-gray-800">
      {/* Upper Content Grid */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Brand Info */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="font-sans text-lg font-black tracking-wider text-white">
              HESKETH COMPUTERS & ACCESSORIES
            </span>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed">
            Kilifi & Malindi’s premier full-stack ICT and design agency. Wholesalers of verified computer components, laser printing terminals, eCitizen helpers, and award-winning vector logo creators.
          </p>
          
          <div className="flex items-center gap-2 pt-2">
            <span className="inline-flex items-center gap-1 text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              Verified Gold Supplier
            </span>
          </div>
        </div>

        {/* Malindi Branch */}
        <div className="space-y-3.5">
          <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400">
            Malindi Branch Stalls
          </h4>
          <ul className="space-y-2 text-xs text-gray-300">
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Hesketh Complex, Lamu Road. Suite B2, Malindi, Coastal Kenya</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>+254 741 466333</span>
            </li>
            <li className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Mon - Sat: 8:00 AM - 7:00 PM</span>
            </li>
          </ul>
        </div>

        {/* Kilifi Headquarters */}
        <div className="space-y-3.5">
          <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400">
            Kilifi Headquarters
          </h4>
          <ul className="space-y-2 text-xs text-gray-300">
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <span>IH-TeCH House, Charo Wa Mae Road. Suite 4, Kilifi Town, Coastal Kenya</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-blue-400 shrink-0" />
              <span>+254 741 466333</span>
            </li>
            <li className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-400 shrink-0" />
              <span>Mon - Fri: 8:00 AM - 6:00 PM</span>
            </li>
          </ul>
        </div>

        {/* Support & Quick Contact */}
        <div className="space-y-3.5">
          <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400">
            Support Desk
          </h4>
          <p className="text-xs text-gray-300 leading-normal">
            For rapid inquiry routing regarding custom graphic design specifications or bulk quotation RFQ shipping rates:
          </p>
          <ul className="space-y-2 text-xs text-gray-300">
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-amber-400 shrink-0" />
              <span>support@heskethcomputers.co.ke</span>
            </li>
            <li className="flex items-center gap-1 text-amber-400 font-bold">
              <Star className="w-4 h-4 fill-current shrink-0" />
              <span>24 Hour Emergency Support</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Lower Copyright Area */}
      <div className="bg-gray-950 text-center py-6 border-t border-gray-800 text-[11px] text-gray-500 font-medium">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span>
            © {new Date().getFullYear()} Hesketh Computers and Accessories Shop. All Rights Reserved.
          </span>
          <span className="flex items-center gap-1 text-gray-400">
            <span>Powered by</span>
            <span className="font-bold text-white bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              IH-TeCH Solution Provider
            </span>
          </span>
        </div>
      </div>
    </footer>
  );
}
