import React, { useState } from 'react';
import { 
  Search, Filter, ShieldCheck, Award, Star, Truck, 
  ChevronRight, ArrowUpDown, X, MessageSquare, Info, Plus, Minus, Send, CheckCircle
} from 'lucide-react';
import { WHOLESALE_PRODUCTS } from '../data';
import { Product, CartItem } from '../types';

interface AlibabaShopProps {
  onAddToCart: (item: CartItem) => void;
  onOpenCart: () => void;
}

export default function AlibabaShop({ onAddToCart, onOpenCart }: AlibabaShopProps) {
  // Filters & State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [onlyVerified, setOnlyVerified] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // RFQ (Request for Quote) Form State
  const [rfqOpen, setRfqOpen] = useState(false);
  const [rfqQuantity, setRfqQuantity] = useState(0);
  const [rfqNotes, setRfqNotes] = useState('');
  const [rfqEmail, setRfqEmail] = useState('');
  const [rfqPhone, setRfqPhone] = useState('');
  const [rfqSubmitted, setRfqSubmitted] = useState(false);
  const [generatedRfqId, setGeneratedRfqId] = useState('');

  // Cart configuration state for selected product
  const [orderQty, setOrderQty] = useState(1);

  // Filter products
  const filteredProducts = WHOLESALE_PRODUCTS.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesVerified = !onlyVerified || product.verifiedSupplier;
    return matchesSearch && matchesCategory && matchesVerified;
  });

  const categories = [
    'All', 'Laptops', 'Desktops', 'Printers & Scanners', 'Accessories', 
    'Storage', 'Mouse & Keyboards', 'Cables & Adapters', 
    'Power & Chargers', 'Audio & Speakers', 'Networking', 'Protection & Stands'
  ];

  const openProductDetails = (product: Product) => {
    setSelectedProduct(product);
    setOrderQty(product.moq); // Start with Minimum Order Quantity
    setRfqSubmitted(false);
    setRfqNotes('');
  };

  const handleQtyChange = (val: number, min: number) => {
    if (val >= min) {
      setOrderQty(val);
    }
  };

  const calculateActivePrice = (qty: number, product: Product) => {
    // Look up tier
    // Tiers are sorted or defined, we check if qty meets the tier range
    // simple logic: check from highest to lowest tier
    const sortedTiers = [...product.tiers].reverse();
    for (const tier of sortedTiers) {
      const match = tier.range.match(/(\d+)\+?/);
      if (match) {
        const threshold = parseInt(match[1]);
        if (qty >= threshold) {
          return tier.price;
        }
      }
    }
    return product.basePrice;
  };

  const KSH_RATE = 130;
  const toKsh = (usd: number) => usd * KSH_RATE;

  const getProductWhatsAppUrl = (product: Product, qty: number) => {
    const pricePerUnit = calculateActivePrice(qty, product);
    const priceKsh = toKsh(pricePerUnit);
    const totalKsh = priceKsh * qty;
    const message = `Hello Hesketh Computers! 👋
I would like to inquire about/order:

📦 *Product:* ${product.name}
🔢 *Quantity:* ${qty} unit(s)
💰 *Price per unit:* KSh ${priceKsh.toLocaleString()}
💵 *Total Estimated:* KSh ${totalKsh.toLocaleString()}

Please confirm availability and dispatch instructions to Kilifi/Malindi. Thanks!`;
    return `https://wa.me/254741466333?text=${encodeURIComponent(message)}`;
  };

  const submitRfq = (e: React.FormEvent, product: Product) => {
    e.preventDefault();
    const rfqId = `RFQ-${Math.floor(100000 + Math.random() * 900000)}`;
    setGeneratedRfqId(rfqId);
    setRfqSubmitted(true);
    
    // Auto-open WhatsApp with the RFQ info too!
    const rfqText = `Hello Hesketh Computers! 👋
I have submitted a Request for Quotation (RFQ) on your website:

📌 *RFQ ID:* ${rfqId}
📦 *Product:* ${product.name}
🔢 *Quantity:* ${orderQty} units
📞 *Phone:* ${rfqPhone}
✉️ *Email:* ${rfqEmail}
📝 *Custom Notes:* ${rfqNotes || 'None'}

Please review my custom quotation request!`;
    window.open(`https://wa.me/254741466333?text=${encodeURIComponent(rfqText)}`, '_blank');

    // Auto clear after some time or let user enjoy confirmation
    setTimeout(() => {
      setRfqOpen(false);
      setRfqSubmitted(false);
      setSelectedProduct(null);
    }, 6000);
  };

  const addSelectedToCart = (product: Product) => {
    const pricePerUnit = calculateActivePrice(orderQty, product);
    onAddToCart({
      id: product.id,
      type: 'product',
      name: product.name,
      price: pricePerUnit,
      quantity: orderQty,
      image: product.image,
      details: `Unit Price: KSh ${toKsh(pricePerUnit).toLocaleString()} (Tier calculated based on MOQ of ${product.moq} and purchase quantity of ${orderQty} units).`
    });
    setSelectedProduct(null);
    onOpenCart();
  };

  return (
    <section id="wholesale" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Header and Brand Bar */}
      <div className="border-b border-gray-100 pb-6 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-gray-900 font-sans">
            Wholesale Computer Store
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Display modeled after <span className="font-bold text-[#0a2a66]">Alibaba B2B Wholesale Market</span>. Get tiered volume pricing & verified supplier guarantees.
          </p>
        </div>

        {/* Verification badges bar */}
        <div className="flex flex-wrap items-center gap-3 bg-gray-50 border border-gray-100 px-4 py-2 rounded-xl text-xs text-gray-600">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Trade Assurance
          </span>
          <span className="h-4 w-px bg-gray-200" />
          <span className="flex items-center gap-1">
            <Award className="w-4 h-4 text-blue-600" />
            Verified Gold Supplier
          </span>
          <span className="h-4 w-px bg-gray-200" />
          <span className="flex items-center gap-1">
            <Truck className="w-4 h-4 text-amber-600" />
            East Africa Logistics
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* SIDEBAR FILTERS */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white border border-gray-100 rounded-2xl p-5 space-y-6">
            <h3 className="font-bold text-gray-900 flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" />
              Source Filters
            </h3>

            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search computer hardware..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
              <Search className="absolute left-3 top-2.5 w-4.5 h-4.5 text-gray-400" />
            </div>

            {/* Category Filter */}
            <div>
              <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                Categories
              </span>
              
              {/* Desktop vertical list */}
              <div className="hidden lg:flex lg:flex-col gap-1.5">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-sm transition-all duration-150 ${
                      selectedCategory === cat
                        ? 'bg-gradient-to-r from-[#0a2a66] to-[#1e3e1b] text-white font-medium'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Mobile/Tablet horizontal scroll */}
              <div className="flex lg:hidden overflow-x-auto pb-2 gap-2 snap-x -mx-1 scrollbar-none">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`shrink-0 snap-start px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 ${
                      selectedCategory === cat
                        ? 'bg-gradient-to-r from-[#0a2a66] to-[#1e3e1b] text-white'
                        : 'bg-gray-50 border border-gray-100 text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Verified toggle */}
            <div className="border-t border-gray-100 pt-5">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={onlyVerified}
                  onChange={(e) => setOnlyVerified(e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
                />
                <span className="text-sm font-medium text-gray-700">
                  Verified Gold Suppliers Only
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* PRODUCTS GRID */}
        <div className="lg:col-span-3 space-y-6">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16 bg-white border border-gray-100 rounded-2xl">
              <Info className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h4 className="font-bold text-gray-700 text-lg">No Wholesale Products Found</h4>
              <p className="text-sm text-gray-400 mt-1">Try resetting your category or search terms.</p>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchTerm('');
                  setOnlyVerified(false);
                }}
                className="mt-4 px-4 py-2 bg-gradient-to-r from-[#0a2a66] to-[#1e3e1b] text-white text-xs font-bold rounded-lg hover:shadow-xs transition-all"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  onClick={() => openProductDetails(product)}
                  id={`product-card-${product.id}`}
                  className="group cursor-pointer flex flex-col bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-xs hover:shadow-md hover:border-gray-200 transition-all duration-300"
                >
                  {/* Image container */}
                  <div className="relative h-48 w-full overflow-hidden bg-gray-50">
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {product.tradeAssurance && (
                      <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded bg-orange-500 px-2 py-0.5 text-[10px] font-bold text-white shadow-xs">
                        Trade Assurance
                      </span>
                    )}
                    <span className="absolute top-3 right-3 inline-flex items-center gap-1 rounded bg-[#1e3e1b] px-2 py-0.5 text-[10px] font-bold text-white shadow-xs">
                      {product.status}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Supplier status */}
                      <div className="flex items-center gap-1.5 text-gray-400 text-[10px] font-semibold mb-2">
                        <span className="bg-amber-500/10 text-amber-800 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">
                          Gold
                        </span>
                        <span>{product.yearsActive} Yrs</span>
                        <span>•</span>
                        <span className="flex items-center gap-0.5 text-amber-500">
                          <Star className="w-3 h-3 fill-current" />
                          {product.rating}
                        </span>
                      </div>

                      {/* Product Name */}
                      <h4 className="font-sans font-bold text-gray-900 group-hover:text-[#0a2a66] text-sm leading-snug line-clamp-2 transition-colors mb-2">
                        {product.name}
                      </h4>

                      {/* Tier pricing display */}
                      <div className="bg-gray-50 rounded-xl p-2.5 mb-3">
                        <div className="flex items-baseline gap-1 text-gray-900">
                          <span className="text-xs font-bold text-gray-400">KSh</span>
                          <span className="text-lg font-black">{toKsh(product.tiers[product.tiers.length - 1].price).toLocaleString()}</span>
                          <span className="text-gray-400 text-xs">-</span>
                          <span className="text-base font-bold">{toKsh(product.basePrice).toLocaleString()}</span>
                          <span className="text-gray-400 text-[10px] ml-1">/ unit</span>
                        </div>
                        <span className="block text-[10px] text-gray-400 font-medium mt-0.5">
                          Tiered bulk pricing available
                        </span>
                      </div>
                    </div>

                    <div>
                      {/* MOQ Info */}
                      <div className="flex items-center justify-between border-t border-gray-50 pt-3 text-[11px] font-semibold text-gray-500">
                        <span>Min Order: {product.moq} Units</span>
                        <span className="text-gray-400">Specs Sheet available</span>
                      </div>

                      {/* View Button */}
                      <button className="mt-3.5 w-full flex items-center justify-center gap-1 py-2 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 rounded-lg text-xs font-black text-gray-700 border border-gray-200/60 transition-all">
                        Configure & Order via WhatsApp <ChevronRight className="w-3.5 h-3.5 text-blue-600" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* DETAIL MODAL & QUANTITY / RFQ CALCULATOR DRAWER */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/60 backdrop-blur-xs">
          <div className="h-full w-full max-w-2xl bg-white shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300">
            {/* Drawer Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 bg-gray-50">
              <div className="flex items-center gap-2">
                <span className="bg-[#0a2a66] text-white text-[10px] font-extrabold uppercase px-2 py-0.5 rounded">
                  B2B Wholesale Portal
                </span>
                <span className="text-xs text-gray-500 font-bold">
                  Product Details & Specs
                </span>
              </div>
              <button
                onClick={() => {
                  setSelectedProduct(null);
                  setRfqOpen(false);
                }}
                className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Content */}
            <div className="p-6 flex-1 space-y-6">
              {/* Product Info Summary */}
              <div className="flex flex-col sm:flex-row gap-5 pb-6 border-b border-gray-100">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  referrerPolicy="no-referrer"
                  className="w-full sm:w-44 h-36 object-cover rounded-xl border border-gray-100 bg-gray-50"
                />
                <div className="space-y-2">
                  <span className="text-xs font-bold text-[#1e3e1b] uppercase">
                    {selectedProduct.category}
                  </span>
                  <h3 className="text-lg font-extrabold text-gray-900 leading-snug">
                    {selectedProduct.name}
                  </h3>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="bg-amber-100 text-amber-800 font-extrabold px-1.5 py-0.5 rounded text-[10px]">
                      {selectedProduct.yearsActive} Yrs Verified
                    </span>
                    <span className="text-gray-400">•</span>
                    <span className="flex items-center gap-0.5 text-amber-500">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      {selectedProduct.rating} Rating
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 line-clamp-3">
                    {selectedProduct.description}
                  </p>
                </div>
              </div>

              {/* TIERED PRICE TABLE */}
              <div>
                <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">
                  Tiered Wholesale Prices
                </h4>
                <div className="grid grid-cols-3 gap-3">
                  {selectedProduct.tiers.map((tier, idx) => {
                    const isActive = orderQty >= parseInt(tier.range);
                    return (
                      <div
                        key={idx}
                        className={`p-3 rounded-xl border text-center transition-all ${
                          isActive
                            ? 'bg-blue-50/50 border-blue-200 text-blue-900 ring-1 ring-blue-100'
                            : 'border-gray-100 bg-gray-50/40 text-gray-500'
                        }`}
                      >
                        <span className="block text-xs font-bold uppercase tracking-wide">
                          {tier.range}
                        </span>
                        <span className="block text-base font-black mt-1">
                          KSh {toKsh(tier.price).toLocaleString()}
                        </span>
                        <span className="block text-[9px] text-gray-400">
                          per unit
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* TECHNICAL SPECIFICATIONS SHEET */}
              <div>
                <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">
                  Specifications Sheet
                </h4>
                <div className="border border-gray-100 rounded-xl overflow-hidden text-sm">
                  {selectedProduct.specs.map((spec, sidx) => (
                    <div
                      key={sidx}
                      className={`flex justify-between p-2.5 ${
                        sidx % 2 === 0 ? 'bg-gray-50/50' : 'bg-white'
                      }`}
                    >
                      <span className="font-semibold text-gray-500 text-xs">{spec.name}</span>
                      <span className="text-gray-800 font-bold text-xs text-right">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* BULK CALCULATOR & ADD TO CART */}
              <div className="bg-[#0a2a66]/5 rounded-2xl p-5 border border-[#0a2a66]/10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <div>
                    <h5 className="font-bold text-gray-900 text-sm">Wholesale Quote Calculator</h5>
                    <span className="text-xs text-gray-500">
                      Adjust units to apply bulk tier discounts (MOQ: {selectedProduct.moq}).
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleQtyChange(orderQty - 1, selectedProduct.moq)}
                      className="p-1 bg-white border border-gray-200 rounded-lg hover:border-gray-300 hover:bg-gray-50 text-gray-600 transition-all"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <input
                      type="number"
                      value={orderQty}
                      onChange={(e) => handleQtyChange(parseInt(e.target.value) || selectedProduct.moq, selectedProduct.moq)}
                      className="w-16 text-center border border-gray-200 rounded-lg py-1 text-sm font-bold focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <button
                      onClick={() => handleQtyChange(orderQty + 1, selectedProduct.moq)}
                      className="p-1 bg-white border border-gray-200 rounded-lg hover:border-gray-300 hover:bg-gray-50 text-gray-600 transition-all"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-[#0a2a66]/10 pt-4 text-sm font-bold text-gray-700">
                  <span>Unit Wholesale Cost:</span>
                  <span className="text-blue-800">KSh {toKsh(calculateActivePrice(orderQty, selectedProduct)).toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between pt-1 text-lg font-black text-gray-900">
                  <span>Estimated Total Order:</span>
                  <span className="text-gradient bg-gradient-to-r from-[#0a2a66] to-[#1e3e1b] bg-clip-text text-transparent">
                    KSh {(toKsh(calculateActivePrice(orderQty, selectedProduct)) * orderQty).toLocaleString()}
                  </span>
                </div>
                <span className="block text-[10px] text-gray-400 text-right mt-1 font-semibold">
                  *Excludes Kenyan Import Duty (Approx. 16% VAT)
                </span>
              </div>

              {/* REQUEST CUSTOM QUOTATION DRAWER TAB */}
              {rfqOpen ? (
                <div className="bg-white border border-gray-100 rounded-2xl p-5 space-y-4 animate-in fade-in-50 duration-200">
                  <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                    <h5 className="font-bold text-gray-900 flex items-center gap-1.5 text-sm">
                      <MessageSquare className="w-4 h-4 text-[#0a2a66]" />
                      Submit RFQ (Request For Quotation)
                    </h5>
                    <button
                      onClick={() => setRfqOpen(false)}
                      className="text-xs font-semibold text-red-500 hover:underline"
                    >
                      Cancel
                    </button>
                  </div>

                  {rfqSubmitted ? (
                    <div className="text-center py-6 space-y-2">
                      <CheckCircle className="w-10 h-10 text-emerald-500 mx-auto" />
                      <h6 className="font-bold text-gray-900">Quotation Request Received!</h6>
                      <p className="text-xs text-gray-500">
                        We have registered your inquiry with Ticket ID <span className="font-mono font-bold text-blue-600">{generatedRfqId}</span>. Our representative will contact you via phone within 2 hours.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={(e) => submitRfq(e, selectedProduct)} className="space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">
                            Contact Phone
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g., +254 700 000000"
                            value={rfqPhone}
                            onChange={(e) => setRfqPhone(e.target.value)}
                            className="w-full text-xs p-2 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">
                            Contact Email
                          </label>
                          <input
                            type="email"
                            required
                            placeholder="e.g., user@domain.com"
                            value={rfqEmail}
                            onChange={(e) => setRfqEmail(e.target.value)}
                            className="w-full text-xs p-2 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 focus:outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">
                          Specifications, Custom Requests or Shipping notes
                        </label>
                        <textarea
                          placeholder="Please describe any customs options, delivery packaging requirements or special scheduling..."
                          value={rfqNotes}
                          onChange={(e) => setRfqNotes(e.target.value)}
                          rows={3}
                          className="w-full text-xs p-2 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 focus:outline-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-2 bg-gradient-to-r from-[#0a2a66] to-[#1e3e1b] hover:from-[#133c80] hover:to-[#264c22] text-white font-bold text-xs rounded-lg transition-all flex items-center justify-center gap-1.5"
                      >
                        <Send className="w-3.5 h-3.5" /> Submit RFQ to Agent
                      </button>
                    </form>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setRfqOpen(true)}
                    className="flex-1 py-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 text-gray-700 font-bold text-sm transition-all text-center flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <MessageSquare className="w-4 h-4 text-blue-600" />
                    Request Custom Quote
                  </button>
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-gray-500 font-medium">
                {selectedProduct.shippingEstimate}
              </span>
              <div className="flex w-full sm:w-auto items-center gap-2">
                <a
                  href={getProductWhatsAppUrl(selectedProduct, orderQty)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 uppercase tracking-wider"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.852.002-2.632-1.023-5.105-2.887-6.97C16.586 1.968 14.116.944 11.48.944 6.046.944 1.62 5.362 1.616 10.796c-.001 1.639.453 3.24 1.314 4.672L1.921 21.03l5.748-1.505c1.4.761 2.9.162 4.978.162z" />
                  </svg>
                  WhatsApp Order
                </a>
                <button
                  onClick={() => addSelectedToCart(selectedProduct)}
                  className="flex-1 sm:flex-none px-5 py-3 bg-[#0a2a66] hover:bg-opacity-90 text-white font-extrabold text-xs rounded-xl transition-all"
                >
                  Add {orderQty} to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
