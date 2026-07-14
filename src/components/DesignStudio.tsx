import React, { useState, useRef } from 'react';
import { 
  Paintbrush, Palette, Layers, Sparkles, CheckCircle, Calculator, 
  Upload, HelpCircle, ArrowRight, Eye, RefreshCw, Star, ArrowUpRight
} from 'lucide-react';
import { DESIGN_PACKAGES } from '../data';
import { DesignPackage, CartItem, DesignBrief } from '../types';

interface DesignStudioProps {
  onAddToCart: (item: CartItem) => void;
  onOpenCart: () => void;
}

export default function DesignStudio({ onAddToCart, onOpenCart }: DesignStudioProps) {
  const [selectedPackage, setSelectedPackage] = useState<DesignPackage | null>(null);
  
  // Interactive design brief board state
  const [dragActive, setDragActive] = useState(false);
  const [briefTitle, setBriefTitle] = useState('');
  const [briefDesc, setBriefDesc] = useState('');
  const [briefStyle, setBriefStyle] = useState<'Minimalist' | 'Bold' | 'Corporate' | 'Playful' | 'Vintage'>('Minimalist');
  const [briefText, setBriefText] = useState('');
  const [selectedColors, setSelectedColors] = useState<string[]>(['#000000']);
  const [draftFiles, setDraftFiles] = useState<File[]>([]);
  const [briefSubmitted, setBriefSubmitted] = useState(false);
  const [briefId, setBriefId] = useState('');

  // Interactive Price Estimator State
  const [estServiceType, setEstServiceType] = useState<'logo' | 'branding' | 'flyer' | 'social'>('logo');
  const [estComplexity, setEstComplexity] = useState<'standard' | 'premium' | 'enterprise'>('premium');
  const [estVariants, setEstVariants] = useState(2);
  const [estUrgency, setEstUrgency] = useState<'standard' | 'express'>('standard');

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Portfolio items
  const portfolioItems = [
    { title: 'Safari Horizon Lodge', category: 'Brand Identity', image: 'https://images.unsplash.com/photo-1541462608141-2f52d051e485?auto=format&fit=crop&w=400&q=80', description: 'Logo & Stationery' },
    { title: 'Malindi Grain Traders', category: 'Packaging', image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=400&q=80', description: 'Heavy packaging label design' },
    { title: 'Kilimanjaro Summit Tech', category: 'Corporate Suite', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80', description: 'Interactive branding suite' },
    { title: 'Chapa Kazi App Launch', category: 'Social Media', image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=400&q=80', description: 'Dynamic advertising poster' },
  ];

  // Dynamic colors list
  const colorPaletteOptions = [
    { hex: '#0a2a66', name: 'Navy Blue (IH)' },
    { hex: '#1e3e1b', name: 'Forest Green (TeCH)' },
    { hex: '#1e3a8a', name: 'Royal Blue' },
    { hex: '#10b981', name: 'Emerald' },
    { hex: '#f59e0b', name: 'Amber Glow' },
    { hex: '#ef4444', name: 'Scarlet' },
    { hex: '#ffffff', name: 'Alpine White' },
    { hex: '#111827', name: 'Charcoal Noir' },
  ];

  // Calculate customized estimated design price
  const calculateEstimatedPrice = () => {
    let basePrice = 3000;
    if (estServiceType === 'branding') basePrice = 8000;
    if (estServiceType === 'flyer') basePrice = 2000;
    if (estServiceType === 'social') basePrice = 1500;

    let complexityMultiplier = 1;
    if (estComplexity === 'premium') complexityMultiplier = 1.3;
    if (estComplexity === 'enterprise') complexityMultiplier = 1.8;

    let varAddition = (estVariants - 1) * 800;
    
    let total = basePrice * complexityMultiplier + varAddition;
    if (estUrgency === 'express') total += 1500; // Urgent fee

    return Math.round(total);
  };

  const toggleColor = (hex: string) => {
    if (selectedColors.includes(hex)) {
      setSelectedColors(prev => prev.filter(c => c !== hex));
    } else {
      setSelectedColors(prev => [...prev, hex]);
    }
  };

  // Drag-and-Drop handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const files = Array.from(e.dataTransfer.files);
      setDraftFiles(prev => [...prev, ...files]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const files = Array.from(e.target.files);
      setDraftFiles(prev => [...prev, ...files]);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  // Add design package directly to Cart
  const handleAddPackageToCart = (pkg: DesignPackage) => {
    onAddToCart({
      id: pkg.id,
      type: 'design',
      name: pkg.title,
      price: pkg.price,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=100&q=80',
      details: `Graphic Package. Timeline: ${pkg.timeline}. Deliverables: ${pkg.deliverables.join(', ')}.`
    });
    onOpenCart();
  };

  // Submit Brief Board Form to Cart
  const handleBriefSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const estPrice = calculateEstimatedPrice();
    const briefDetails = `Design Type: ${estServiceType.toUpperCase()}. Complexity: ${estComplexity.toUpperCase()}. Variants: ${estVariants}, Urgency: ${estUrgency.toUpperCase()}. Brief Description: ${briefDesc}. Style Selected: ${briefStyle}. Colors chosen: ${selectedColors.join(', ')}. Draft uploads: ${
      draftFiles.length > 0 ? draftFiles.map(f => f.name).join(', ') : 'None'
    }`;

    onAddToCart({
      id: `custom-design-${Date.now()}`,
      type: 'design',
      name: `Bespoke ${estServiceType.toUpperCase()} Graphic Design`,
      price: estPrice,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=100&q=80',
      details: briefDetails
    });

    setBriefSubmitted(true);
    const code = `CYB-DSGN-${Math.floor(1000 + Math.random() * 9000)}`;
    setBriefId(code);

    // Reset fields
    setBriefTitle('');
    setBriefDesc('');
    setBriefText('');
    setDraftFiles([]);

    setTimeout(() => {
      setBriefSubmitted(false);
      onOpenCart();
    }, 5000);
  };

  return (
    <section id="design" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="border-b border-gray-100 pb-6 mb-12 text-center md:text-left md:flex items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-gray-900 font-sans">
            Graphic Design Studio
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Elevate your brand with award-winning vector identities. From single promotional leaflets to full-scale corporate brand systems.
          </p>
        </div>

        <div className="hidden md:flex items-center gap-1 bg-amber-50 text-amber-900 px-3 py-1.5 rounded-full text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-spin" />
          <span>Vector Master Source Files included in standard deliveries</span>
        </div>
      </div>

      {/* PORTFOLIO GRID SHOWCASE */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
        {portfolioItems.map((item, idx) => (
          <div
            key={idx}
            className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xs transition-all duration-300 hover:scale-[1.02] hover:shadow-md"
          >
            <div className="relative h-44 overflow-hidden bg-gray-50">
              <img
                src={item.image}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute bottom-3 left-3 inline-flex items-center rounded-md bg-white/90 backdrop-blur-xs px-2.5 py-1 text-[10px] font-bold text-gray-800 shadow-xs">
                {item.category}
              </span>
            </div>
            <div className="p-3">
              <h5 className="font-bold text-gray-900 text-xs leading-tight">{item.title}</h5>
              <p className="text-[10px] text-gray-400 mt-0.5">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT PANEL: GRAPHIC DESIGN PACKAGES (5 Columns) */}
        <div className="lg:col-span-5 space-y-6">
          <h3 className="font-sans font-black text-gray-900 text-lg">
            Ready-to-Go Brand Packages
          </h3>

          <div className="space-y-4">
            {DESIGN_PACKAGES.map((pkg) => (
              <div
                key={pkg.id}
                id={`design-pkg-${pkg.id}`}
                className="bg-white border border-gray-100 rounded-2xl p-5 hover:border-amber-200 hover:shadow-xs transition-all duration-200"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-extrabold text-gray-900 text-sm">
                    {pkg.title}
                  </h4>
                  <span className="text-sm font-black text-[#1e3e1b] font-mono">
                    KSh {pkg.price.toLocaleString()}
                  </span>
                </div>

                <p className="text-xs text-gray-400 mb-3 leading-normal">
                  {pkg.description}
                </p>

                <div className="space-y-1.5 border-t border-gray-50 pt-3">
                  <span className="block text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                    Included Deliverables ({pkg.timeline}):
                  </span>
                  {pkg.deliverables.map((del, d_idx) => (
                    <div key={d_idx} className="flex items-start gap-1.5 text-xs text-gray-600">
                      <CheckCircle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                      <span>{del}</span>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-2 mt-4">
                  <button
                    onClick={() => handleAddPackageToCart(pkg)}
                    className="py-2.5 bg-[#0a2a66]/5 hover:bg-[#0a2a66]/10 text-[#0a2a66] rounded-xl text-xs font-bold transition-all text-center"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => {
                      const msg = `Hello Hesketh Computers! 👋
I would like to order this Premium Brand Package:

🎨 *Package:* ${pkg.title}
💰 *Price:* KSh ${pkg.price.toLocaleString()}
⏱️ *Timeline:* ${pkg.timeline}
📦 *Deliverables:*
${pkg.deliverables.map(d => `• ${d}`).join('\n')}

Please get in touch to start. Thanks!`;
                      window.open(`https://wa.me/254741466333?text=${encodeURIComponent(msg)}`, '_blank');
                    }}
                    className="py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-extrabold transition-all text-center flex items-center justify-center gap-1 uppercase tracking-wide"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.852.002-2.632-1.023-5.105-2.887-6.97C16.586 1.968 14.116.944 11.48.944 6.046.944 1.62 5.362 1.616 10.796c-.001 1.639.453 3.24 1.314 4.672L1.921 21.03l5.748-1.505c1.4.761 2.9.162 4.978.162z" />
                    </svg>
                    WhatsApp
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT PANEL: INTERACTIVE ESTIMATOR & CUSTOM DESIGN BRIEF BOARD (7 Columns) */}
        <div id="design-brief-creator" className="lg:col-span-7 bg-white border border-gray-100 rounded-3xl p-6 shadow-xs space-y-6">
          <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
            <div className="p-2 bg-amber-50 text-amber-700 rounded-lg">
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-sans font-black text-gray-900 text-sm">Custom Graphic Brief & Estimator</h3>
              <span className="text-[11px] text-gray-400 block">Configure design complexity, check real-time costs, and submit your brief.</span>
            </div>
          </div>

          {briefSubmitted ? (
            <div className="text-center py-12 space-y-3">
              <CheckCircle className="w-14 h-14 text-emerald-500 mx-auto animate-bounce" />
              <h4 className="font-sans font-black text-gray-900 text-lg">Custom Design Added to Cart!</h4>
              <p className="text-xs text-gray-500 max-w-md mx-auto">
                We have saved your styling preferences and file drafts under design tracking ID <span className="font-mono font-bold text-blue-600">{briefId}</span>. Checkout to authorize the designers.
              </p>
            </div>
          ) : (
            <form onSubmit={handleBriefSubmit} className="space-y-5">
              
              {/* ESTIMATOR CONFIGURATIONS */}
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">
                    Design Asset Category
                  </label>
                  <select
                    value={estServiceType}
                    onChange={(e) => setEstServiceType(e.target.value as any)}
                    className="w-full p-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-amber-500"
                  >
                    <option value="logo">Vector Logo Design (Base KSh 3,000)</option>
                    <option value="branding">Full Corporate Branding (Base KSh 8,000)</option>
                    <option value="flyer">Event Flyer / Corporate Banner (Base KSh 2,000)</option>
                    <option value="social">Social Media Poster / Ads (Base KSh 1,500)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">
                    Designer Expertise level
                  </label>
                  <select
                    value={estComplexity}
                    onChange={(e) => setEstComplexity(e.target.value as any)}
                    className="w-full p-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-amber-500"
                  >
                    <option value="standard">Standard Designer (+0%)</option>
                    <option value="premium">Senior Brand Specialist (+30%)</option>
                    <option value="enterprise">Art Director Consultation (+80%)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">
                    Unique Draft Concepts
                  </label>
                  <select
                    value={estVariants}
                    onChange={(e) => setEstVariants(parseInt(e.target.value))}
                    className="w-full p-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-amber-500"
                  >
                    <option value="1">1 Concept Draft</option>
                    <option value="2">2 Alternative Concepts (+KSh 800)</option>
                    <option value="3">3 Alternative Concepts (+KSh 1,600)</option>
                    <option value="4">4 Alternative Concepts (+KSh 2,400)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">
                    Scheduling Urgency
                  </label>
                  <select
                    value={estUrgency}
                    onChange={(e) => setEstUrgency(e.target.value as any)}
                    className="w-full p-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-amber-500"
                  >
                    <option value="standard">Standard (2-4 Working Days)</option>
                    <option value="express">Express Delivery (24 Hours) (+KSh 1,500)</option>
                  </select>
                </div>
              </div>

              {/* DESIGN BRIEF PARTICULARS */}
              <div className="border-t border-gray-100 pt-5 space-y-4 text-xs">
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">
                    Creative Title / Brand name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Safari Horizon Ltd (Logo Request)"
                    value={briefTitle}
                    onChange={(e) => setBriefTitle(e.target.value)}
                    className="w-full p-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">
                      Visual Vibe/Aesthetic Style
                    </label>
                    <select
                      value={briefStyle}
                      onChange={(e) => setBriefStyle(e.target.value as any)}
                      className="w-full p-2.5 border border-gray-200 rounded-xl focus:outline-none"
                    >
                      <option value="Minimalist">Minimalist (Clean, high spacing)</option>
                      <option value="Bold">Bold (Vibrant, geometric)</option>
                      <option value="Corporate">Corporate (Tech, solid grids)</option>
                      <option value="Playful">Playful (Organic curves, friendly)</option>
                      <option value="Vintage">Vintage (Classic lineart, heritage)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">
                      Visual text tags / Slogan to include
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Slogan: 'Connect the wild'"
                      value={briefText}
                      onChange={(e) => setBriefText(e.target.value)}
                      className="w-full p-2.5 border border-gray-200 rounded-xl focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">
                    Describe your Brand, target market, & creative ideas
                    </label>
                  <textarea
                    required
                    placeholder="Provide details about what your business does, your competitor references, and any design ideas you have..."
                    value={briefDesc}
                    onChange={(e) => setBriefDesc(e.target.value)}
                    rows={3}
                    className="w-full p-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>

                {/* COLOR PALETTE INTERACTIVE SELECTOR */}
                <div>
                  <span className="block text-[10px] font-bold text-gray-400 uppercase mb-2">
                    Preferred Color Swatches (Select Multiple)
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {colorPaletteOptions.map((cOption) => {
                      const isSelected = selectedColors.includes(cOption.hex);
                      return (
                        <button
                          type="button"
                          key={cOption.hex}
                          onClick={() => toggleColor(cOption.hex)}
                          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border text-[10px] font-bold transition-all ${
                            isSelected
                              ? 'border-amber-500 bg-amber-50/50 text-amber-900 ring-1 ring-amber-100'
                              : 'border-gray-100 hover:border-gray-200 text-gray-500'
                          }`}
                        >
                          <span 
                            className="w-3.5 h-3.5 rounded-full border border-gray-200/50" 
                            style={{ backgroundColor: cOption.hex }} 
                          />
                          {cOption.name}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* REFERENCE MOODBOARD FILE UPLOADER (Supports Drag & Drop as mandated by rules) */}
                <div>
                  <span className="block text-[10px] font-bold text-gray-400 uppercase mb-1.5">
                    Reference Designs / Logo Drafts / Sketch Files
                  </span>
                  <div
                    onDragEnter={handleDrag}
                    onDragOver={handleDrag}
                    onDragLeave={handleDrag}
                    onDrop={handleDrop}
                    onClick={triggerFileSelect}
                    className={`border-2 border-dashed rounded-2xl p-5 text-center cursor-pointer transition-all duration-150 ${
                      dragActive
                        ? 'border-amber-500 bg-amber-50/50'
                        : draftFiles.length > 0
                        ? 'border-emerald-200 bg-emerald-50/20'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <Upload className="w-6 h-6 text-gray-400 mx-auto mb-1.5" />
                    <span className="block font-bold text-[11px] text-gray-700">
                      Drag & Drop sample graphics here
                    </span>
                    <span className="block text-[9px] text-gray-400">
                      or <span className="text-amber-600 font-bold hover:underline">browse</span> device images
                    </span>
                  </div>

                  {draftFiles.length > 0 && (
                    <div className="mt-2.5 space-y-1 bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                      {draftFiles.map((f, fidx) => (
                        <div key={fidx} className="flex items-center justify-between text-[10px] text-gray-600">
                          <span className="truncate max-w-sm font-semibold">{f.name}</span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setDraftFiles(prev => prev.filter((_, i) => i !== fidx));
                            }}
                            className="text-red-500 font-bold hover:underline"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* ESTIMATE SUM & ADD TO CART */}
              <div className="border-t border-gray-100 pt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="block text-[10px] font-bold text-gray-400 uppercase">
                    Interactive Project Estimate:
                  </span>
                  <span className="text-2xl font-black text-[#1e3e1b] font-mono">
                    KSh {calculateEstimatedPrice().toLocaleString()}
                  </span>
                  <span className="text-[10px] text-gray-400 block -mt-0.5">
                    *Comprehensive pricing. No hidden fees.
                  </span>
                </div>

                <div className="flex w-full sm:w-auto items-center gap-2">
                  <button
                    type="submit"
                    className="px-5 py-3 bg-[#0a2a66] hover:bg-opacity-95 text-white font-bold text-xs rounded-xl transition-all"
                  >
                    Add to Cart
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (!briefTitle || !briefDesc) {
                        alert("Please fill in Brand Name/Title and Brief Description first!");
                        return;
                      }
                      const msg = `Hello Hesketh Computers! 👋
I would like to order a Custom Graphic Design:

📦 *Asset Category:* ${estServiceType.toUpperCase()}
🎨 *Style:* ${briefStyle} | *Urgency:* ${estUrgency.toUpperCase()}
🎯 *Brand Name:* ${briefTitle}
 Slogan:* ${briefText || 'None'}
📝 *Creative Description:* ${briefDesc}
🎨 *Selected Colors:* ${selectedColors.join(', ')}
💰 *Interactive Estimate:* KSh ${calculateEstimatedPrice().toLocaleString()}

Please consult with me. Thanks!`;
                      window.open(`https://wa.me/254741466333?text=${encodeURIComponent(msg)}`, '_blank');
                    }}
                    className="px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 uppercase tracking-wider"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.852.002-2.632-1.023-5.105-2.887-6.97C16.586 1.968 14.116.944 11.48.944 6.046.944 1.62 5.362 1.616 10.796c-.001 1.639.453 3.24 1.314 4.672L1.921 21.03l5.748-1.505c1.4.761 2.9.162 4.978.162z" />
                    </svg>
                    WhatsApp Order
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
