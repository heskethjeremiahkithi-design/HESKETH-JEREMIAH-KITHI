import React, { useState } from 'react';
import { 
  Search, ShieldCheck, CheckCircle2, Clock, 
  User, Calendar, Info, FileText, MapPin, AlertCircle
} from 'lucide-react';
import { TrackerStatus } from '../types';

interface OrderTrackerProps {
  orders: TrackerStatus[];
  onClose: () => void;
}

export default function OrderTracker({ orders, onClose }: OrderTrackerProps) {
  const [searchId, setSearchId] = useState('');
  const [activeOrder, setActiveOrder] = useState<TrackerStatus | null>(orders[0] || null);
  const [searchError, setSearchError] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedId = searchId.trim().toUpperCase();
    const found = orders.find(ord => ord.orderId === formattedId);
    
    if (found) {
      setActiveOrder(found);
      setSearchError(false);
    } else {
      setSearchError(true);
    }
  };

  const selectQuickOrder = (order: TrackerStatus) => {
    setActiveOrder(order);
    setSearchId(order.orderId);
    setSearchError(false);
  };

  return (
    <section id="tracker" className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Tracker Hero Block */}
      <div className="bg-gradient-to-r from-[#0a2a66] to-[#1e3e1b] rounded-3xl p-6 md:p-10 text-white shadow-md relative overflow-hidden mb-12">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: '3rem 3rem',
        }} />

        <div className="relative z-10 max-w-2xl space-y-4">
          <span className="inline-flex items-center gap-1 bg-white/10 text-white px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
            Active B2B & Retail Logistics Verification
          </span>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight font-sans">
            Interactive Service & Order Tracker
          </h2>
          <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
            Verify the direct progress of your wholesale laptop logistics, eCitizen/KRA applications, or graphic design vector concept iterations immediately.
          </p>

          {/* Interactive Search Box */}
          <form onSubmit={handleSearch} className="flex gap-2 max-w-md pt-2">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Enter Tracker ID (e.g., HESK-2849)"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white text-gray-900 rounded-xl text-xs font-bold focus:outline-none placeholder-gray-400"
              />
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 bg-white text-[#0a2a66] font-extrabold text-xs rounded-xl hover:bg-gray-100 transition-all shadow-xs"
            >
              Verify Code
            </button>
          </form>

          {searchError && (
            <div className="flex items-center gap-1.5 text-red-300 text-xs font-bold pt-1">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>Tracker ID not found. Verify formatting (e.g. HESK-XXXX) or try a sample code below.</span>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: QUICK PICK ACTIVE ORDERS (4 Columns) */}
        <div className="lg:col-span-4 space-y-4 bg-gray-50/50 border border-gray-100 rounded-3xl p-5">
          <h3 className="font-sans font-black text-gray-900 text-xs uppercase tracking-wider pl-1.5 mb-2">
            Active Sample Enquiries
          </h3>

          <div className="space-y-3">
            {orders.map((ord) => {
              const isSelected = activeOrder?.orderId === ord.orderId;
              return (
                <div
                  key={ord.orderId}
                  onClick={() => selectQuickOrder(ord)}
                  className={`cursor-pointer p-4 rounded-2xl border text-xs transition-all ${
                    isSelected
                      ? 'bg-white border-blue-200 ring-2 ring-blue-50/50 shadow-sm'
                      : 'bg-white border-gray-100 hover:border-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-mono font-black text-blue-700">{ord.orderId}</span>
                    <span className={`px-2 py-0.5 rounded-[5px] text-[9px] font-bold uppercase ${
                      ord.status === 'completed' ? 'bg-emerald-50 text-emerald-800' :
                      ord.status === 'processing' ? 'bg-blue-50 text-blue-800' :
                      ord.status === 'review' ? 'bg-amber-50 text-amber-800' :
                      'bg-gray-100 text-gray-500'
                    }`}>
                      {ord.status}
                    </span>
                  </div>

                  <h4 className="font-bold text-gray-800 leading-snug truncate">
                    {ord.items}
                  </h4>

                  <div className="flex justify-between text-[10px] text-gray-400 font-semibold mt-2 border-t border-gray-50 pt-2">
                    <span>{ord.customerName}</span>
                    <span>{ord.date}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: STEP-BY-STEP TRACKING TIMELINE (8 Columns) */}
        <div className="lg:col-span-8 bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-xs">
          {activeOrder ? (
            <div id="tracker-display-board" className="space-y-6 animate-in fade-in-50 duration-300">
              
              {/* Active Ticket Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-100 pb-5 gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-black text-xl text-blue-700">
                      {activeOrder.orderId}
                    </span>
                    <span className="text-gray-300">•</span>
                    <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2.5 py-0.5 rounded-full uppercase">
                      {activeOrder.type}
                    </span>
                  </div>
                  <h4 className="font-sans font-black text-gray-900 text-base leading-tight">
                    {activeOrder.items}
                  </h4>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">
                    Registered Client
                  </span>
                  <span className="font-bold text-gray-800 text-sm flex items-center gap-1 sm:justify-end">
                    <User className="w-3.5 h-3.5 text-gray-400" /> {activeOrder.customerName}
                  </span>
                </div>
              </div>

              {/* TIMELINE TIMETABLE GRID */}
              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">
                  Processing Pipeline Timeline
                </h4>

                <div className="relative pl-6 border-l-2 border-gray-100 space-y-8 ml-3">
                  {activeOrder.timeline.map((step, idx) => {
                    const isCompleted = step.completed;
                    return (
                      <div key={idx} className="relative text-xs">
                        {/* Timeline node bullet icon */}
                        <span className={`absolute -left-[31px] top-0.5 flex h-4 w-4 items-center justify-center rounded-full ring-4 ring-white ${
                          isCompleted
                            ? 'bg-emerald-500 text-white'
                            : 'bg-gray-100 text-gray-400 border border-gray-200'
                        }`}>
                          {isCompleted ? (
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          ) : (
                            <Clock className="w-3.5 h-3.5" />
                          )}
                        </span>

                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <h5 className={`font-extrabold text-sm ${
                              isCompleted ? 'text-gray-900' : 'text-gray-400'
                            }`}>
                              {step.title}
                            </h5>
                            <span className="text-[10px] font-semibold text-gray-400 bg-gray-50 px-2 py-0.5 rounded">
                              {step.date}
                            </span>
                          </div>
                          <p className="text-xs text-gray-400 leading-normal max-w-xl">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Verified Badge Footer */}
              <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 flex items-center gap-3 text-xs text-gray-600">
                <Info className="w-5 h-5 text-blue-600 shrink-0" />
                <p className="leading-normal">
                  To dispute any timeline updates or expedite urgent passport files or print delivery dispatches, call Kilifi & Malindi Support on <span className="font-bold text-gray-900">0741466333</span>.
                </p>
              </div>

            </div>
          ) : (
            <div className="text-center py-20 space-y-4">
              <AlertCircle className="w-12 h-12 text-gray-300 mx-auto" />
              <h4 className="font-bold text-gray-700">No Enquiry Selected</h4>
              <p className="text-xs text-gray-400 max-w-xs mx-auto">
                Please insert a valid Hesketh tracking code or choose one of the sample orders on the left panel.
              </p>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
