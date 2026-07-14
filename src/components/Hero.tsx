import React from 'react';
import { Monitor, ArrowRight, ShieldCheck, Cpu, Paintbrush, Globe, Layers } from 'lucide-react';

interface HeroProps {
  onNavigate: (section: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-[#030d22] mt-[-80px] pt-[160px] pb-20 lg:pt-[192px] lg:pb-28 border-b border-gray-900">
      {/* High-Resolution Tech & Business Workspace Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center pointer-events-none opacity-40"
        style={{
          backgroundImage: `url('https://img.magnific.com/free-photo/cropped-image-woman-inputting-card-information-key-phone-laptop-while-shopping-online_1423-68.jpg')`,
        }}
      />
      {/* Dark Gradient Overlay to ensure maximum text readability and contrast */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#030d22]/95 via-[#030d22]/85 to-[#030d22]/95 pointer-events-none" />

      {/* Decorative Gradient Radial Glows */}
      <div className="absolute top-1/4 left-1/3 -z-10 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 -z-10 h-[400px] w-[400px] rounded-full bg-emerald-500/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Verification Pill / Badge */}
        <div className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold text-gray-200 backdrop-blur-md mb-8 border border-white/10">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Kilifi & Malindi’s Trusted Full-Range Coastal ICT Hub</span>
        </div>

        {/* Display Typography (Large, tracking-tight, high-contrast) */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-black tracking-tight text-white max-w-4xl mx-auto leading-[1.15] mb-6">
          Premium Wholesales & Professional{' '}
          <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-emerald-400 bg-clip-text text-transparent">
            ICT Solutions
          </span>{' '}
          in Kenya
        </h1>

        <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed mb-12">
          From premium wholesale computers and accessories to seamless KRA and eCitizen cyber café services, and world-class vector graphic design—all under one roof.
        </p>

        {/* Interactive Highlight Cards (3-Pillar Quick Entry Navigation) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto text-left mb-16">
          {/* Card 1: Computers & Accessories */}
          <div 
            onClick={() => onNavigate('wholesale')}
            id="hero-nav-wholesale"
            className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/5 bg-white/[0.04] backdrop-blur-md p-6 shadow-xl hover:shadow-2xl hover:border-blue-400/30 hover:bg-white/[0.07] transition-all duration-300"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-blue-500/10 to-transparent rounded-bl-full" />
            <div className="mb-4 inline-flex items-center justify-center rounded-xl bg-blue-500/10 p-3 text-blue-400 group-hover:scale-110 group-hover:bg-blue-500/20 transition-all duration-200">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
              Computers & Accessories
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed mb-4">
              Wholesale computer hardware supply. Tiered bulk discounts, minimum order parameters, and certified quality guarantees.
            </p>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-blue-400 group-hover:gap-2 transition-all">
              Explore Products <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>

          {/* Card 2: Cyber Cafe Portal */}
          <div 
            onClick={() => onNavigate('cyber')}
            id="hero-nav-cyber"
            className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/5 bg-white/[0.04] backdrop-blur-md p-6 shadow-xl hover:shadow-2xl hover:border-emerald-400/30 hover:bg-white/[0.07] transition-all duration-300"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-emerald-500/10 to-transparent rounded-bl-full" />
            <div className="mb-4 inline-flex items-center justify-center rounded-xl bg-emerald-500/10 p-3 text-emerald-400 group-hover:scale-110 group-hover:bg-emerald-500/20 transition-all duration-200">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
              Kenyan Cyber Services
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed mb-4">
              On-demand KRA returns filing, eCitizen, NTSA, HELB portals, secure file printing, and high-fidelity typesetting in Kenya Shillings.
            </p>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 group-hover:gap-2 transition-all">
              Launch Portal <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>

          {/* Card 3: Graphic Studio */}
          <div 
            onClick={() => onNavigate('design')}
            id="hero-nav-design"
            className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/5 bg-white/[0.04] backdrop-blur-md p-6 shadow-xl hover:shadow-2xl hover:border-amber-400/30 hover:bg-white/[0.07] transition-all duration-300"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-amber-500/10 to-transparent rounded-bl-full" />
            <div className="mb-4 inline-flex items-center justify-center rounded-xl bg-amber-500/10 p-3 text-amber-400 group-hover:scale-110 group-hover:bg-amber-500/20 transition-all duration-200">
              <Paintbrush className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
              Graphic Design Studio
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed mb-4">
              Premium brand identities, vector logo designs, promotional flyers, and corporate suites with bespoke pricing estimate builders.
            </p>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-400 group-hover:gap-2 transition-all">
              Build Design Brief <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>

        {/* Business Stats Section */}
        <div className="border-t border-white/10 pt-10 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div>
            <span className="block text-3xl font-black text-white">100%</span>
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Trade Assured</span>
          </div>
          <div>
            <span className="block text-3xl font-black text-white">5+ Yrs</span>
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Verified Supplier</span>
          </div>
          <div>
            <span className="block text-3xl font-black text-white">5,000+</span>
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Active Clients</span>
          </div>
          <div>
            <span className="block text-3xl font-black text-white">24hr</span>
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Support Response</span>
          </div>
        </div>
      </div>
    </section>
  );
}
