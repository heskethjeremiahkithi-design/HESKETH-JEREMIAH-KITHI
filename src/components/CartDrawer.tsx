import React, { useState } from 'react';
import { 
  X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, 
  MapPin, Phone, CreditCard, Send, CheckCircle, Smartphone
} from 'lucide-react';
import { CartItem, TrackerStatus } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQty: (id: string, qty: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onAddOrderToTracker: (newOrder: TrackerStatus) => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
  onAddOrderToTracker,
}: CartDrawerProps) {
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'shipping' | 'payment' | 'success'>('cart');
  
  // Checkout Form states
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState<'pickup-kilifi' | 'pickup-malindi' | 'delivery'>('pickup-kilifi');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'mpesa' | 'bank' | 'cash'>('mpesa');
  const [mpesaNumber, setMpesaNumber] = useState('');
  
  // Confirmed Order Details
  const [confirmedOrderId, setConfirmedOrderId] = useState('');

  if (!isOpen) return null;

  const KSH_EXCHANGE_RATE = 130; // $1 = 130 KSh

  // Convert individual item price to unified KSh if it was input as USD (i.e. 'product')
  const getItemPriceInKsh = (item: CartItem) => {
    if (item.type === 'product') {
      return item.price * KSH_EXCHANGE_RATE;
    }
    return item.price;
  };

  const getSubtotalKsh = () => {
    return cart.reduce((acc, item) => acc + (getItemPriceInKsh(item) * item.quantity), 0);
  };

  const getWhatsAppLink = (orderId: string) => {
    const formattedPhone = "254741466333";
    const itemsText = cart.map(item => `• ${item.quantity}x ${item.name} - KSh ${(getItemPriceInKsh(item) * item.quantity).toLocaleString()}`).join('\n');
    const deliveryStr = deliveryMethod === 'pickup-kilifi' 
      ? 'Collect at Kilifi Headquarters (IH-TeCH House, Charo Wa Mae Road)' 
      : deliveryMethod === 'pickup-malindi' 
        ? 'Collect at Malindi Shop (Hesketh Complex, Lamu Road)' 
        : `Courier Delivery to: ${deliveryAddress}`;
        
    const paymentStr = paymentMethod === 'mpesa' 
      ? `M-Pesa (Number: ${mpesaNumber})` 
      : paymentMethod === 'bank' 
        ? 'KCB Bank Transfer' 
        : 'Pay Cash / Card on Pickup';
    
    const text = `Hello Hesketh Computers! 👋
I would like to place an order/request:

📌 *Order ID:* ${orderId || 'HESK-XXXX'}
👤 *Customer Name:* ${customerName}
📞 *Customer Phone:* ${customerPhone}
✉️ *Customer Email:* ${customerEmail}

📦 *Items/Services Ordered:*
${itemsText}

💰 *Subtotal:* KSh ${getSubtotalKsh().toLocaleString()}
🚚 *Delivery:* ${deliveryStr}
💳 *Payment Method:* ${paymentStr}

Please review and confirm my order. Thank you!`;

    return `https://wa.me/${formattedPhone}?text=${encodeURIComponent(text)}`;
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (checkoutStep === 'shipping') {
      setCheckoutStep('payment');
    } else if (checkoutStep === 'payment') {
      // Complete Order!
      const orderId = `HESK-${Math.floor(1000 + Math.random() * 9000)}`;
      setConfirmedOrderId(orderId);

      // Construct Tracker Status object to push to global tracker state
      const firstItemName = cart[0]?.name || 'ICT Services';
      const itemsCountDesc = cart.length > 1 ? `${firstItemName} + ${cart.length - 1} other items` : firstItemName;
      
      const newOrder: TrackerStatus = {
        orderId,
        customerName,
        type: cart[0]?.type === 'product' ? 'Wholesale Purchase' : cart[0]?.type === 'service' ? 'Cyber Service' : 'Graphic Design',
        items: itemsCountDesc,
        status: 'received',
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        timeline: [
          { title: 'Order & Request Received', description: 'Your request has been filed. WhatsApp dispatch initiated.', date: new Date().toLocaleString(), completed: true },
          { title: 'Security & Verification Review', description: 'Checking document layouts or hardware warehouse stock availability.', date: 'Pending Verification', completed: false },
          { title: 'ICT Processing / Packing', description: 'Initiating typeset, portal filing, custom design drafts, or bulk packaging.', date: 'Pending Execution', completed: false },
          { title: 'Dispatch / Pickup Handover', description: 'Handover for delivery or ready for in-store collection.', date: 'Pending Delivery', completed: false }
        ]
      };

      onAddOrderToTracker(newOrder);
      setCheckoutStep('success');

      // Auto-direct to WhatsApp immediately
      try {
        window.open(getWhatsAppLink(orderId), '_blank');
      } catch (err) {
        console.error("Popup blocked, fallback to user click", err);
      }
    }
  };

  const resetDrawer = () => {
    onClearCart();
    setCheckoutStep('cart');
    setCustomerName('');
    setCustomerPhone('');
    setCustomerEmail('');
    setDeliveryAddress('');
    setMpesaNumber('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity" 
        onClick={onClose} 
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          
          {/* DRAWER HEADER */}
          <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-gray-50">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#0a2a66]" />
              <h3 className="font-sans font-black text-gray-900 text-sm uppercase tracking-wide">
                {checkoutStep === 'cart' && 'Your Service Cart'}
                {checkoutStep === 'shipping' && 'Step 1: Contact & Delivery'}
                {checkoutStep === 'payment' && 'Step 2: Payment Method'}
                {checkoutStep === 'success' && 'Order Confirmed!'}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* DRAWER MAIN BODY */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            {/* STEP 1: CART OVERVIEW */}
            {checkoutStep === 'cart' && (
              <>
                {cart.length === 0 ? (
                  <div className="text-center py-20 space-y-4">
                    <div className="h-16 w-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-gray-400">
                      <ShoppingBag className="w-8 h-8" />
                    </div>
                    <h4 className="font-bold text-gray-700 text-sm">Your Cart is Empty</h4>
                    <p className="text-xs text-gray-400 max-w-xs mx-auto">
                      Explore our computers wholesale shop, cyber portal, or design calculator to add assets.
                    </p>
                    <button
                      onClick={onClose}
                      className="px-5 py-2 border border-gray-200 rounded-full text-xs font-bold text-gray-700 hover:bg-gray-50 transition-all"
                    >
                      Continue Browsing
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => {
                      const kshPrice = getItemPriceInKsh(item);
                      return (
                        <div
                          key={item.id}
                          className="flex gap-4 p-4 rounded-2xl border border-gray-100 bg-white shadow-xs hover:border-gray-200 transition-all"
                        >
                          {item.image && (
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-16 h-16 object-cover rounded-xl border border-gray-50"
                            />
                          )}
                          <div className="flex-1 flex flex-col justify-between text-xs">
                            <div>
                              <div className="flex items-start justify-between">
                                <h4 className="font-extrabold text-gray-900 leading-tight pr-2">
                                  {item.name}
                                </h4>
                                <button
                                  onClick={() => onRemoveItem(item.id)}
                                  className="text-gray-400 hover:text-red-500 p-0.5 transition-colors"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                              {item.details && (
                                <p className="text-[10px] text-gray-400 mt-1 line-clamp-2">
                                  {item.details}
                                </p>
                              )}
                            </div>

                            <div className="flex items-center justify-between mt-3">
                              {/* Quantity selection (Only available for Products) */}
                              {item.type === 'product' ? (
                                <div className="flex items-center gap-1.5">
                                  <button
                                    onClick={() => onUpdateQty(item.id, item.quantity - 1)}
                                    className="p-1 border border-gray-100 rounded-md hover:bg-gray-50 text-gray-600 font-bold"
                                  >
                                    -
                                  </button>
                                  <span className="font-bold text-gray-800 text-xs px-1">
                                    {item.quantity}
                                  </span>
                                  <button
                                    onClick={() => onUpdateQty(item.id, item.quantity + 1)}
                                    className="p-1 border border-gray-100 rounded-md hover:bg-gray-50 text-gray-600 font-bold"
                                  >
                                    +
                                  </button>
                                </div>
                              ) : (
                                <span className="text-[10px] text-gray-400 font-semibold bg-gray-50 px-2 py-0.5 rounded border border-gray-100">
                                  Assigned Service
                                </span>
                              )}

                              <div className="text-right">
                                <span className="block font-black text-[#1e3e1b] font-mono">
                                  KSh {(kshPrice * item.quantity).toLocaleString()}
                                </span>
                                {item.type === 'product' && (
                                  <span className="text-[9px] text-gray-400 block -mt-0.5">
                                    (${item.price * item.quantity} USD)
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </>
            )}

            {/* STEP 2: SHIPPING / CONTACT FORM */}
            {checkoutStep === 'shipping' && (
              <form id="shipping-form" onSubmit={handleCheckoutSubmit} className="space-y-4">
                <div className="space-y-3.5">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                    Your Contact Details
                  </h4>
                  
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe Mwangi"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full text-xs p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 0712345678"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className="w-full text-xs p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. jdoe@gmail.com"
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        className="w-full text-xs p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-3.5 border-t border-gray-100 pt-5">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                    Delivery / Collection Method
                  </h4>

                  <div className="space-y-2.5">
                    <label className="flex items-start gap-3 p-3 border border-gray-100 rounded-xl cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="delivery"
                        checked={deliveryMethod === 'pickup-kilifi'}
                        onChange={() => setDeliveryMethod('pickup-kilifi')}
                        className="mt-1 text-blue-600"
                      />
                      <div className="text-xs">
                        <span className="font-bold text-gray-800 block">Collect at Kilifi Headquarters (Free)</span>
                        <span className="text-[10px] text-gray-400">IH-TeCH House, Charo Wa Mae Road.</span>
                      </div>
                    </label>

                    <label className="flex items-start gap-3 p-3 border border-gray-100 rounded-xl cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="delivery"
                        checked={deliveryMethod === 'pickup-malindi'}
                        onChange={() => setDeliveryMethod('pickup-malindi')}
                        className="mt-1 text-blue-600"
                      />
                      <div className="text-xs">
                        <span className="font-bold text-gray-800 block">Collect at Malindi Shop (Free)</span>
                        <span className="text-[10px] text-gray-400">Hesketh Complex, Lamu Road.</span>
                      </div>
                    </label>

                    <label className="flex items-start gap-3 p-3 border border-gray-100 rounded-xl cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="delivery"
                        checked={deliveryMethod === 'delivery'}
                        onChange={() => setDeliveryMethod('delivery')}
                        className="mt-1 text-blue-600"
                      />
                      <div className="text-xs flex-1">
                        <span className="font-bold text-gray-800 block">Courier Home/Office Delivery</span>
                        <span className="text-[10px] text-gray-400">Shipped nationwide via G4S / Wells Fargo.</span>
                      </div>
                    </label>
                  </div>

                  {deliveryMethod === 'delivery' && (
                    <div className="space-y-1.5 animate-in fade-in-50 duration-200">
                      <label className="block text-[10px] font-bold text-gray-400 uppercase">
                        Physical Delivery Address
                      </label>
                      <textarea
                        required
                        placeholder="House No, Building Name, Street Name, Town/City"
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                        rows={2}
                        className="w-full text-xs p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  )}
                </div>
              </form>
            )}

            {/* STEP 3: PAYMENT TYPE */}
            {checkoutStep === 'payment' && (
              <form id="payment-form" onSubmit={handleCheckoutSubmit} className="space-y-4">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                  Select payment configuration
                </h4>

                <div className="space-y-3">
                  {/* M-PESA */}
                  <label className="flex items-start gap-3.5 p-4 border border-gray-100 rounded-2xl cursor-pointer hover:bg-gray-50 transition-all">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'mpesa'}
                      onChange={() => setPaymentMethod('mpesa')}
                      className="mt-1 text-[#1e3e1b]"
                    />
                    <div className="flex-1 text-xs">
                      <span className="font-extrabold text-gray-900 flex items-center gap-1.5">
                        <Smartphone className="w-4 h-4 text-emerald-600" />
                        M-Pesa Express (STK Push)
                      </span>
                      <p className="text-[10px] text-gray-400 mt-0.5 leading-normal">
                        Receive a secure prompt on your mobile phone to enter your PIN. Real-time activation.
                      </p>

                      {paymentMethod === 'mpesa' && (
                        <div className="mt-3 space-y-1 animate-in slide-in-from-top-2 duration-150">
                          <label className="block text-[9px] font-bold text-gray-400 uppercase">
                            M-Pesa Registered Number
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. 0712345678"
                            value={mpesaNumber}
                            onChange={(e) => setMpesaNumber(e.target.value)}
                            className="w-full text-xs p-2.5 border border-gray-200 rounded-lg focus:outline-none"
                          />
                        </div>
                      )}
                    </div>
                  </label>

                  {/* BANK TRANSFER */}
                  <label className="flex items-start gap-3.5 p-4 border border-gray-100 rounded-2xl cursor-pointer hover:bg-gray-50 transition-all">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'bank'}
                      onChange={() => setPaymentMethod('bank')}
                      className="mt-1 text-blue-600"
                    />
                    <div className="text-xs">
                      <span className="font-extrabold text-gray-900 flex items-center gap-1.5">
                        <CreditCard className="w-4 h-4 text-blue-600" />
                        Direct KCB Bank Transfer
                      </span>
                      <p className="text-[10px] text-gray-400 mt-0.5 leading-normal">
                        Transfer directly to Hesketh Computers Account. Verify transfer receipt at the physical counter.
                      </p>
                    </div>
                  </label>

                  {/* CASH ON PICKUP */}
                  <label className="flex items-start gap-3.5 p-4 border border-gray-100 rounded-2xl cursor-pointer hover:bg-gray-50 transition-all">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'cash'}
                      onChange={() => setPaymentMethod('cash')}
                      className="mt-1 text-gray-600"
                    />
                    <div className="text-xs">
                      <span className="font-extrabold text-gray-900 flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-gray-600" />
                        Pay Cash / Card on Pickup
                      </span>
                      <p className="text-[10px] text-gray-400 mt-0.5 leading-normal">
                        Bring physical cash or swipable debit cards directly to our Kilifi / Malindi store branches.
                      </p>
                    </div>
                  </label>
                </div>
              </form>
            )}

            {/* STEP 4: SUCCESS SUMMARY */}
            {checkoutStep === 'success' && (
              <div className="text-center py-10 space-y-5 animate-in fade-in duration-300">
                <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto animate-bounce" />
                <h4 className="font-sans font-black text-gray-900 text-lg">
                  Order Successfully Filed!
                </h4>
                <p className="text-xs text-gray-500 max-w-xs mx-auto">
                  Thank you for choosing Hesketh Computers. Your order has been registered in our tracking logs.
                </p>

                {/* Primary WhatsApp Dispatch Action */}
                <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 space-y-3 max-w-sm mx-auto">
                  <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-widest block">
                    Direct-to-WhatsApp Dispatch
                  </span>
                  <p className="text-[11px] text-emerald-700 leading-normal">
                    Click the button below to instantly transmit your items list, contact details, and custom brief straight to our official shop WhatsApp:
                  </p>
                  <a
                    href={getWhatsAppLink(confirmedOrderId)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-all uppercase tracking-wider hover:scale-[1.02]"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.852.002-2.632-1.023-5.105-2.887-6.97C16.586 1.968 14.116.944 11.48.944 6.046.944 1.62 5.362 1.616 10.796c-.001 1.639.453 3.24 1.314 4.672L1.921 21.03l5.748-1.505c1.4.761 2.9.162 4.978.162z" />
                    </svg>
                    Send Order on WhatsApp
                  </a>
                </div>

                {/* Tracker code highlight */}
                <div className="bg-[#1e3e1b]/5 rounded-2xl p-5 border border-[#1e3e1b]/10 max-w-sm mx-auto">
                  <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                    Your Tracking Invoice ID
                  </span>
                  <span className="text-xl font-black text-[#1e3e1b] font-mono tracking-wide">
                    {confirmedOrderId}
                  </span>
                  <p className="text-[10px] text-gray-400 mt-2">
                    Copy this ID and paste it in our **Order Tracker** search tab at any time to monitor filing, design, or courier dispatch progress.
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    onClick={resetDrawer}
                    className="w-full py-3 bg-gradient-to-r from-[#0a2a66] to-[#1e3e1b] text-white font-extrabold text-xs rounded-xl hover:shadow-md transition-all"
                  >
                    Return to Shop Dashboard
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* DRAWER FOOTER (SUBTOTAL & PRIMARY ACTION) */}
          {checkoutStep !== 'success' && cart.length > 0 && (
            <div className="px-6 py-5 border-t border-gray-100 bg-gray-50 space-y-4">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold text-gray-500">
                  <span>Standard Kenyan Duty & VAT:</span>
                  <span className="font-bold text-gray-700">Included</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-extrabold text-gray-800">Unified Subtotal:</span>
                  <span className="text-xl font-black text-[#1e3e1b] font-mono">
                    KSh {getSubtotalKsh().toLocaleString()}
                  </span>
                </div>
                {checkoutStep === 'cart' && (
                  <span className="block text-[10px] text-gray-400 text-right">
                    (Approx. ${(getSubtotalKsh() / KSH_EXCHANGE_RATE).toFixed(2)} USD)
                  </span>
                )}
              </div>

              {/* ACTION BUTTON */}
              {checkoutStep === 'cart' && (
                <button
                  onClick={() => setCheckoutStep('shipping')}
                  className="w-full py-3 bg-gradient-to-r from-[#0a2a66] to-[#1e3e1b] hover:from-[#133c80] hover:to-[#264c22] text-white text-sm font-black rounded-xl shadow-md flex items-center justify-center gap-1.5 hover:gap-2.5 transition-all"
                >
                  Proceed to Contact <ArrowRight className="w-4 h-4" />
                </button>
              )}

              {checkoutStep === 'shipping' && (
                <button
                  form="shipping-form"
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-[#0a2a66] to-[#1e3e1b] text-white text-sm font-black rounded-xl shadow-md flex items-center justify-center gap-1.5"
                >
                  Configure Payment <ArrowRight className="w-4 h-4" />
                </button>
              )}

              {checkoutStep === 'payment' && (
                <button
                  form="payment-form"
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white text-sm font-black rounded-xl shadow-md flex items-center justify-center gap-1.5"
                >
                  <Send className="w-4 h-4" /> Submit & Authorize Order
                </button>
              )}

              <div className="flex items-center justify-center gap-1.5 text-[10px] font-semibold text-gray-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Trade Assurance payment security certified.</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
