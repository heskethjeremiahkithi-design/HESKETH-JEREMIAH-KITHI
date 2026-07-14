import React, { useState, useRef } from 'react';
import { 
  FileText, Upload, Printer, CheckCircle, Calculator, Info, Clock, 
  User, Phone, Mail, FileCheck, Layers, HelpCircle, ArrowRight
} from 'lucide-react';
import { CYBER_SERVICES } from '../data';
import { CyberService, CartItem } from '../types';

interface CyberCafeProps {
  onAddToCart: (item: CartItem) => void;
  onOpenCart: () => void;
}

export default function CyberCafe({ onAddToCart, onOpenCart }: CyberCafeProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'government' | 'printing' | 'documents'>('all');
  
  // Printing terminal state
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [printColor, setPrintColor] = useState<'bw' | 'color'>('bw');
  const [printPaperSize, setPrintPaperSize] = useState<'A4' | 'A3'>('A4');
  const [printDuplex, setPrintDuplex] = useState<'single' | 'double'>('single');
  const [printPages, setPrintPages] = useState(1);
  const [printCopies, setPrintCopies] = useState(1);
  const [printBinding, setPrintBinding] = useState<'none' | 'spiral' | 'hard'>('none');
  const [printOrdered, setPrintOrdered] = useState(false);
  const [printedCode, setPrintedCode] = useState('');
  
  // Government portal portal form state
  const [selectedGovService, setSelectedGovService] = useState<CyberService | null>(null);
  const [govName, setGovName] = useState('');
  const [govPhone, setGovPhone] = useState('');
  const [govEmail, setGovEmail] = useState('');
  const [govDetails, setGovDetails] = useState('');
  const [govFiles, setGovFiles] = useState<File[]>([]);
  const [govSubmitted, setGovSubmitted] = useState(false);
  const [govOrderCode, setGovOrderCode] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);
  const govFileInputRef = useRef<HTMLInputElement>(null);

  // Filter services
  const filteredServices = CYBER_SERVICES.filter(srv => {
    if (activeTab === 'all') return true;
    return srv.category === activeTab;
  });

  // Calculate printing price
  const calculatePrintingPrice = () => {
    let perPagePrice = printColor === 'color' ? 15 : 5; // A4 standard
    if (printPaperSize === 'A3') perPagePrice *= 2; // A3 is double
    let base = perPagePrice * printPages * printCopies;
    if (printDuplex === 'double') base = Math.round(base * 0.9); // 10% duplex discount
    
    let bindingPrice = 0;
    if (printBinding === 'spiral') bindingPrice = 50 * printCopies;
    if (printBinding === 'hard') bindingPrice = 150 * printCopies;
    
    return base + bindingPrice;
  };

  // Drag & drop handlers for Printing Terminal
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
      setUploadedFiles(prev => [...prev, ...files]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const files = Array.from(e.target.files);
      setUploadedFiles(prev => [...prev, ...files]);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  // Drag & drop handlers for Government Assistant
  const handleGovFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const files = Array.from(e.target.files);
      setGovFiles(prev => [...prev, ...files]);
    }
  };

  const removeFile = (index: number, type: 'print' | 'gov') => {
    if (type === 'print') {
      setUploadedFiles(prev => prev.filter((_, i) => i !== index));
    } else {
      setGovFiles(prev => prev.filter((_, i) => i !== index));
    }
  };

  // Submit print request to Cart
  const submitPrintToCart = (e: React.FormEvent) => {
    e.preventDefault();
    if (uploadedFiles.length === 0) return;
    
    const totalPrice = calculatePrintingPrice();
    const configDetails = `${printPaperSize} Size, ${printColor.toUpperCase()}, ${
      printDuplex === 'single' ? 'Single Sided' : 'Double Sided'
    }, Pages: ${printPages}, Copies: ${printCopies}, Binding: ${printBinding}. Files uploaded: ${uploadedFiles.map(f => f.name).join(', ')}`;

    onAddToCart({
      id: `print-${Date.now()}`,
      type: 'service',
      name: 'Custom Documents Fast-Print Order',
      price: totalPrice,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=100&q=80',
      details: configDetails
    });

    // Reset Form
    setUploadedFiles([]);
    setPrintPages(1);
    setPrintCopies(1);
    setPrintBinding('none');
    setPrintOrdered(true);
    const code = `CYB-PRNT-${Math.floor(1000 + Math.random() * 9000)}`;
    setPrintedCode(code);

    setTimeout(() => {
      setPrintOrdered(false);
      onOpenCart();
    }, 4000);
  };

  // Submit Government Service Request
  const handleGovSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedGovService) return;

    const totalPrice = selectedGovService.price;
    const detailsStr = `Government Service: ${selectedGovService.name}. Details: ${govDetails}. Uploads: ${
      govFiles.length > 0 ? govFiles.map(f => f.name).join(', ') : 'None'
    }`;

    onAddToCart({
      id: `${selectedGovService.id}-${Date.now()}`,
      type: 'service',
      name: selectedGovService.name,
      price: totalPrice,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=100&q=80',
      details: detailsStr
    });

    setGovSubmitted(true);
    const code = `CYB-GOV-${Math.floor(1000 + Math.random() * 9000)}`;
    setGovOrderCode(code);

    // Reset Form fields
    setGovName('');
    setGovPhone('');
    setGovEmail('');
    setGovDetails('');
    setGovFiles([]);

    setTimeout(() => {
      setGovSubmitted(false);
      setSelectedGovService(null);
      onOpenCart();
    }, 5000);
  };

  const handleServiceSelect = (srv: CyberService) => {
    setSelectedGovService(srv);
    setGovSubmitted(false);

    const reqList = srv.requirements && srv.requirements.length > 0
      ? `\n📋 *Filing Requirements:*\n${srv.requirements.map(r => `• ${r}`).join('\n')}`
      : '';

    const msg = `Hello Hesketh Computers! 👋
I would like to order a Cyber Service:

📦 *Service:* ${srv.name}
💰 *Price:* KSh ${srv.price.toLocaleString()} ${srv.unit}
📝 *Description:* ${srv.description}
${reqList}

Please assist me with this order. Thanks!`;

    window.open(`https://wa.me/254741466333?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <section id="cyber" className="bg-gradient-to-b from-white via-gray-50/50 to-white py-16 border-b border-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-black tracking-tight text-gray-900 font-sans">
            Kenyan Cyber Services Hub
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            No long queues at physical cyber cafes. Order your government filings, document typesetting, and high-quality printing online with real-time checkout & processing.
          </p>
        </div>

        {/* CORE GRID: PORTAL & PRINTING TERMINAL */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: DIRECT SERVICES LIST & ASSISTANT (7 Columns) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Categories & Tab Buttons */}
            <div className="bg-white border border-gray-100 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 shadow-xs">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider pl-2">
                Filter Cyber Services
              </span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { id: 'all', label: 'All Services' },
                  { id: 'government', label: 'Gov Portals' },
                  { id: 'printing', label: 'Print & Laminate' },
                  { id: 'documents', label: 'Document Typing' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-[#0a2a66] to-[#1e3e1b] text-white shadow-sm'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* SERVICES GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredServices.map((srv) => (
                <div
                  key={srv.id}
                  onClick={() => handleServiceSelect(srv)}
                  id={`cyber-service-card-${srv.id}`}
                  className="group cursor-pointer bg-white border border-gray-100 rounded-2xl p-5 hover:border-emerald-200 hover:shadow-xs transition-all duration-200 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                        srv.category === 'government' ? 'bg-amber-50 text-amber-800 border border-amber-100' :
                        srv.category === 'printing' ? 'bg-blue-50 text-blue-800 border border-blue-100' :
                        'bg-purple-50 text-purple-800 border border-purple-100'
                      }`}>
                        {srv.category === 'government' ? 'e-Gov' : srv.category === 'printing' ? 'Print' : 'Doc Work'}
                      </span>
                      <span className="text-sm font-black text-emerald-800 font-mono">
                        KSh {srv.price}
                      </span>
                    </div>

                    <h4 className="font-bold text-gray-900 text-sm group-hover:text-emerald-700 transition-colors">
                      {srv.name}
                    </h4>
                    <p className="text-xs text-gray-400 leading-normal line-clamp-2">
                      {srv.description}
                    </p>
                  </div>

                  <div className="border-t border-gray-50 pt-3 mt-4 flex items-center justify-between text-[10px] font-bold text-gray-500">
                    <span className="uppercase text-gray-400">{srv.unit}</span>
                    <span className="text-emerald-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Order on WhatsApp <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* GOVERMENT ASSISTANT FORM DISPLAY (Activates when a service card is clicked) */}
            {selectedGovService && (
              <div 
                id="cyber-form-container"
                className="bg-white border border-emerald-100 rounded-2xl p-6 shadow-sm space-y-4 animate-in fade-in slide-in-from-bottom-3 duration-300"
              >
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <div>
                    <h4 className="font-extrabold text-gray-900 text-base">
                      Portal Filing Assistant: <span className="text-emerald-700">{selectedGovService.name}</span>
                    </h4>
                    <span className="text-xs text-gray-500">
                      Pricing: <span className="font-bold text-emerald-800">KSh {selectedGovService.price} {selectedGovService.unit}</span>
                    </span>
                  </div>
                  <button
                    onClick={() => setSelectedGovService(null)}
                    className="text-xs font-bold text-red-500 hover:underline"
                  >
                    Close Form
                  </button>
                </div>

                {govSubmitted ? (
                  <div className="text-center py-8 space-y-3">
                    <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto" />
                    <h5 className="font-sans font-black text-gray-900 text-lg">Application Added to Cart!</h5>
                    <p className="text-xs text-gray-500 max-w-md mx-auto">
                      Your government portal service request has been queued under temporary transaction ID <span className="font-mono font-bold text-blue-600">{govOrderCode}</span>. Complete payment at checkout to initiate processing.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleGovSubmit} className="space-y-4">
                    {/* Requirements Alert Block */}
                    <div className="bg-amber-50 border border-amber-100 rounded-xl p-3.5 flex items-start gap-2.5 text-xs text-amber-800">
                      <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <span className="font-bold block">Filing Requirements for processing:</span>
                        <ul className="list-disc list-inside space-y-0.5 text-[11px] text-amber-700">
                          {selectedGovService.requirements.map((req, rid) => (
                            <li key={rid}>{req}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">
                          Applicant Full Name
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Your legal name"
                          value={govName}
                          onChange={(e) => setGovName(e.target.value)}
                          className="w-full text-xs p-2.5 border border-gray-200 rounded-lg focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">
                          Contact WhatsApp/Phone
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g., 0712345678"
                          value={govPhone}
                          onChange={(e) => setGovPhone(e.target.value)}
                          className="w-full text-xs p-2.5 border border-gray-200 rounded-lg focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">
                          Applicant Email
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="e.g., example@gmail.com"
                          value={govEmail}
                          onChange={(e) => setGovEmail(e.target.value)}
                          className="w-full text-xs p-2.5 border border-gray-200 rounded-lg focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">
                        Specific Instructions, iTax credentials, or details (e.g. business name proposals)
                      </label>
                      <textarea
                        required
                        placeholder="Provide details such as KRA Pin & password, eCitizen credentials, or business name choices..."
                        value={govDetails}
                        onChange={(e) => setGovDetails(e.target.value)}
                        rows={3}
                        className="w-full text-xs p-2.5 border border-gray-200 rounded-lg focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                      />
                    </div>

                    {/* Government file attachment upload (Manual picker) */}
                    <div>
                      <span className="block text-[10px] font-bold text-gray-400 uppercase mb-1.5">
                        Supporting Documents / ID scanned files
                      </span>
                      <div className="flex flex-wrap items-center gap-3">
                        <button
                          type="button"
                          onClick={() => govFileInputRef.current?.click()}
                          className="py-1.5 px-3 border border-dashed border-gray-200 rounded-lg text-xs font-semibold text-gray-600 hover:bg-gray-50 flex items-center gap-1"
                        >
                          <Upload className="w-3.5 h-3.5" /> Select files
                        </button>
                        <input
                          ref={govFileInputRef}
                          type="file"
                          multiple
                          onChange={handleGovFileChange}
                          className="hidden"
                        />
                        <span className="text-[10px] text-gray-400">PDF, JPG, PNG files accepted.</span>
                      </div>
                      
                      {govFiles.length > 0 && (
                        <div className="mt-2.5 space-y-1.5">
                          {govFiles.map((f, fidx) => (
                            <div key={fidx} className="flex items-center justify-between bg-gray-50 p-1.5 px-2.5 rounded-lg text-[10px] font-medium text-gray-600">
                              <span className="truncate max-w-xs">{f.name} ({(f.size/1024).toFixed(1)} KB)</span>
                              <button
                                type="button"
                                onClick={() => removeFile(fidx, 'gov')}
                                className="text-red-500 font-bold hover:underline"
                              >
                                Remove
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                      <button
                        type="submit"
                        className="py-3 px-4 bg-[#0a2a66] hover:bg-opacity-95 text-white font-extrabold text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5"
                      >
                        <FileCheck className="w-4 h-4" /> Queue & Add to Cart
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (!govName || !govPhone || !govDetails) {
                            alert("Please fill in Applicant Name, Contact Phone, and Instructions/Details first!");
                            return;
                          }
                          const msg = `Hello Hesketh Computers! 👋
I would like to order a Cyber Service:

📦 *Service:* ${selectedGovService.name}
👤 *Applicant Name:* ${govName}
📞 *Phone/WhatsApp:* ${govPhone}
✉️ *Email:* ${govEmail || 'Not provided'}
📝 *Instructions:* ${govDetails}
💰 *Price:* KSh ${selectedGovService.price.toLocaleString()}

Please process this for me. Thanks!`;
                          window.open(`https://wa.me/254741466333?text=${encodeURIComponent(msg)}`, '_blank');
                        }}
                        className="py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 uppercase tracking-wider"
                      >
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.852.002-2.632-1.023-5.105-2.887-6.97C16.586 1.968 14.116.944 11.48.944 6.046.944 1.62 5.362 1.616 10.796c-.001 1.639.453 3.24 1.314 4.672L1.921 21.03l5.748-1.505c1.4.761 2.9.162 4.978.162z" />
                        </svg>
                        Order on WhatsApp
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}
          </div>

          {/* RIGHT: PREMIUM ONLINE PRINTING TERMINAL (5 Columns) */}
          <div className="lg:col-span-5">
            <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm space-y-5">
              <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
                <div className="p-2 bg-blue-50 text-blue-700 rounded-lg">
                  <Printer className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-gray-900 text-sm">Direct Printing Terminal</h3>
                  <span className="text-[11px] text-gray-400 block">Upload files, select configurations & collect at the shop.</span>
                </div>
              </div>

              {printOrdered ? (
                <div className="text-center py-10 space-y-3">
                  <CheckCircle className="w-12 h-12 text-blue-500 mx-auto" />
                  <h5 className="font-sans font-black text-gray-900 text-base">Print Job added to Cart!</h5>
                  <p className="text-xs text-gray-500">
                    Your print order is queued under tracking reference <span className="font-mono font-bold text-blue-600">{printedCode}</span>.
                  </p>
                </div>
              ) : (
                <form onSubmit={submitPrintToCart} className="space-y-4">
                  
                  {/* DRAG AND DROP / FILE SELECT BOX (Supports BOTH as mandated by guidelines) */}
                  <div
                    onDragEnter={handleDrag}
                    onDragOver={handleDrag}
                    onDragLeave={handleDrag}
                    onDrop={handleDrop}
                    onClick={triggerFileSelect}
                    className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all duration-200 ${
                      dragActive
                        ? 'border-blue-500 bg-blue-50/50'
                        : uploadedFiles.length > 0
                        ? 'border-emerald-200 bg-emerald-50/20'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50/50'
                    }`}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2.5" />
                    <span className="block font-bold text-xs text-gray-700 mb-1">
                      Drag & Drop your files here
                    </span>
                    <span className="block text-[10px] text-gray-400">
                      or <span className="text-blue-600 font-bold hover:underline">browse files</span> from your device
                    </span>
                  </div>

                  {/* Uploaded File List */}
                  {uploadedFiles.length > 0 && (
                    <div className="space-y-1.5 bg-gray-50 p-2.5 rounded-xl border border-gray-100 max-h-36 overflow-y-auto">
                      <span className="block text-[9px] font-bold text-gray-400 uppercase tracking-wide">
                        Selected Files ({uploadedFiles.length})
                      </span>
                      {uploadedFiles.map((file, idx) => (
                        <div key={idx} className="flex items-center justify-between bg-white border border-gray-100 p-1.5 px-2 rounded-lg text-[10px] text-gray-600">
                          <span className="truncate max-w-[200px] font-semibold">{file.name}</span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeFile(idx, 'print');
                            }}
                            className="text-red-500 font-bold hover:underline"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Document Layout Configuration */}
                  <div className="grid grid-cols-2 gap-3.5 text-xs">
                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">
                        Ink Configuration
                      </label>
                      <select
                        value={printColor}
                        onChange={(e) => setPrintColor(e.target.value as any)}
                        className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none"
                      >
                        <option value="bw">Black & White (KSh 5)</option>
                        <option value="color">Full Color (KSh 15)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">
                        Paper Dimensions
                      </label>
                      <select
                        value={printPaperSize}
                        onChange={(e) => setPrintPaperSize(e.target.value as any)}
                        className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none"
                      >
                        <option value="A4">A4 Standard Size</option>
                        <option value="A3">A3 Double Size</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">
                        Sided Layout
                      </label>
                      <select
                        value={printDuplex}
                        onChange={(e) => setPrintDuplex(e.target.value as any)}
                        className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none"
                      >
                        <option value="single">Single-Sided</option>
                        <option value="double">Double-Sided (10% Off)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">
                        Binding Style
                      </label>
                      <select
                        value={printBinding}
                        onChange={(e) => setPrintBinding(e.target.value as any)}
                        className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none"
                      >
                        <option value="none">No Binding (Loose)</option>
                        <option value="spiral">Spiral Binding (+KSh 50)</option>
                        <option value="hard">Hardcover Binding (+KSh 150)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3.5 text-xs">
                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">
                        Number of Pages (Est)
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={printPages}
                        onChange={(e) => setPrintPages(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">
                        Number of Copies
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={printCopies}
                        onChange={(e) => setPrintCopies(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none font-bold"
                      />
                    </div>
                  </div>

                  {/* Cost Calculation summary */}
                  <div className="bg-gray-50 border border-gray-100 rounded-xl p-3.5 flex items-center justify-between">
                    <div className="flex items-center gap-1 text-xs text-gray-500 font-medium">
                      <Calculator className="w-4 h-4 text-blue-600" />
                      <span>Estimated Print Cost:</span>
                    </div>
                    <span className="text-base font-black text-blue-900 font-mono">
                      KSh {calculatePrintingPrice()}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-2">
                    <button
                      type="submit"
                      disabled={uploadedFiles.length === 0}
                      className={`py-3 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 ${
                        uploadedFiles.length > 0
                          ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md'
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      <Printer className="w-4 h-4" /> Add to Cart
                    </button>
                    <button
                      type="button"
                      disabled={uploadedFiles.length === 0}
                      onClick={() => {
                        const fileNames = uploadedFiles.map(f => f.name).join(', ');
                        const msg = `Hello Hesketh Computers! 👋
I would like to place a Direct Printing Job:

📄 *Files to Print:* ${fileNames}
🎨 *Color Mode:* ${printColor === 'color' ? 'Full Color' : 'Grayscale'}
📐 *Paper Size:* ${printPaperSize}
🔗 *Binding:* ${printBinding === 'spiral' ? 'Spiral (+KSh 50)' : printBinding === 'hard' ? 'Hardcover (+KSh 150)' : 'None'}
🔢 *Pages:* ${printPages} | *Copies:* ${printCopies}
💰 *Total Estimated Price:* KSh ${calculatePrintingPrice().toLocaleString()}

I am sending the documents over for quick printing. Thanks!`;
                        window.open(`https://wa.me/254741466333?text=${encodeURIComponent(msg)}`, '_blank');
                      }}
                      className={`py-3 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 uppercase tracking-wider ${
                        uploadedFiles.length > 0
                          ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md'
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.852.002-2.632-1.023-5.105-2.887-6.97C16.586 1.968 14.116.944 11.48.944 6.046.944 1.62 5.362 1.616 10.796c-.001 1.639.453 3.24 1.314 4.672L1.921 21.03l5.748-1.505c1.4.761 2.9.162 4.978.162z" />
                      </svg>
                      Order on WhatsApp
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
