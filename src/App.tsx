import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import AlibabaShop from './components/AlibabaShop';
import CyberCafe from './components/CyberCafe';
import DesignStudio from './components/DesignStudio';
import CartDrawer from './components/CartDrawer';
import OrderTracker from './components/OrderTracker';
import Footer from './components/Footer';
import { CartItem, TrackerStatus } from './types';
import { MOCK_ORDERS } from './data';
import { ShoppingBag, ArrowRight } from 'lucide-react';

export default function App() {
  // Navigation section
  const [activeSection, setActiveSection] = useState('all');
  
  // Cart state
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Tracker Orders state (Hydrated with seed data + persisted in localStorage)
  const [orders, setOrders] = useState<TrackerStatus[]>(() => {
    const saved = localStorage.getItem('hesketh_orders');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return MOCK_ORDERS;
      }
    }
    return MOCK_ORDERS;
  });
  
  const [isTrackerOpen, setIsTrackerOpen] = useState(false);

  // Sync orders to localStorage on changes
  useEffect(() => {
    localStorage.setItem('hesketh_orders', JSON.stringify(orders));
  }, [orders]);

  // Cart operations
  const handleAddToCart = (item: CartItem) => {
    setCart((prev) => {
      const exists = prev.find((x) => x.id === item.id);
      if (exists) {
        return prev.map((x) => 
          x.id === item.id ? { ...x, quantity: x.quantity + item.quantity } : x
        );
      }
      return [...prev, item];
    });
  };

  const handleUpdateQty = (id: string, qty: number) => {
    setCart((prev) => 
      prev.map((x) => (x.id === id ? { ...x, quantity: Math.max(1, qty) } : x))
    );
  };

  const handleRemoveItem = (id: string) => {
    setCart((prev) => prev.filter((x) => x.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleAddOrderToTracker = (newOrder: TrackerStatus) => {
    setOrders((prev) => [newOrder, ...prev]);
  };

  const handleNavigate = (sectionId: string) => {
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActiveSection('all');
      setIsTrackerOpen(false);
      return;
    }

    setActiveSection(sectionId);
    setIsTrackerOpen(false);

    // Scroll smoothly to section
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleOpenTracker = () => {
    setIsTrackerOpen(true);
    // Scroll directly to order tracker block
    setTimeout(() => {
      const element = document.getElementById('tracker-block');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  return (
    <div 
      className="min-h-screen flex flex-col text-gray-800 antialiased font-sans bg-fixed bg-cover bg-center transition-all duration-500"
      style={{
        backgroundImage: `linear-gradient(rgba(248, 250, 252, 0.92), rgba(248, 250, 252, 0.92)), url('https://images.unsplash.com/photo-1563013544-824ae1d704d3?q=80&w=2070&auto=format&fit=crop')`
      }}
    >
      {/* Dynamic Header Component */}
      <Header
        cart={cart}
        onOpenCart={() => setIsCartOpen(true)}
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenTracker={handleOpenTracker}
      />

      {/* Hero section */}
      <Hero onNavigate={handleNavigate} />

      {/* Master Content Area */}
      <main className="flex-1">
        
        {/* SECTION 1: WHOLESALE COMPUTER STORE */}
        <div id="wholesale" className={activeSection === 'all' || activeSection === 'wholesale' ? 'block' : 'hidden'}>
          <AlibabaShop 
            onAddToCart={handleAddToCart}
            onOpenCart={() => setIsCartOpen(true)}
          />
        </div>

        {/* SECTION 2: KENYAN CYBER HUB */}
        <div id="cyber" className={activeSection === 'all' || activeSection === 'cyber' ? 'block' : 'hidden'}>
          <CyberCafe 
            onAddToCart={handleAddToCart}
            onOpenCart={() => setIsCartOpen(true)}
          />
        </div>

        {/* SECTION 3: GRAPHIC STUDIO */}
        <div id="design" className={activeSection === 'all' || activeSection === 'design' ? 'block' : 'hidden'}>
          <DesignStudio 
            onAddToCart={handleAddToCart}
            onOpenCart={() => setIsCartOpen(true)}
          />
        </div>

        {/* SECURE ORDER TRACKING AREA */}
        <div 
          id="tracker-block" 
          className={`border-t border-gray-100 bg-white/70 py-8 ${
            isTrackerOpen || activeSection === 'all' ? 'block' : 'hidden'
          }`}
        >
          <OrderTracker 
            orders={orders}
            onClose={() => setIsTrackerOpen(false)}
          />
        </div>

      </main>

      {/* Sticky Quick-Cart Floating Banner (Renders on desktop/mobile when items are in cart) */}
      {cart.length > 0 && !isCartOpen && (
        <div className="fixed bottom-6 right-6 z-40 animate-bounce">
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2.5 px-5 py-3 bg-gradient-to-r from-[#0a2a66] to-[#1e3e1b] text-white font-extrabold text-sm rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>View Service Cart ({cart.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* SLIDING SHOPPING CART DRAWER */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onAddOrderToTracker={handleAddOrderToTracker}
      />

      {/* Footer Block */}
      <Footer />
    </div>
  );
}
