import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShieldCheck, CheckCircle2, MessageCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export const CartDrawer: React.FC = () => {
  const { isCartOpen, setIsCartOpen, items, updateQuantity, removeFromCart, subtotal, totalCount, clearCart } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isCartOpen) return null;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setOrderPlaced(true);
    }, 600);
  };

  const resetAndClose = () => {
    clearCart();
    setOrderPlaced(false);
    setIsCartOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => setIsCartOpen(false)}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF6F0] text-[#2B1F22] shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-5 border-b border-[#E8DEC8] flex items-center justify-between bg-[#FCF9F2]">
            <div className="flex items-center gap-2">
              <h2 className="font-serif-marcellus text-xl text-[#3B0F1E]">Your Shopping Bag</h2>
              <span className="text-xs text-[#8B2E49] font-medium bg-[#8B2E49]/10 px-2 py-0.5 rounded-full">
                {totalCount} {totalCount === 1 ? 'piece' : 'pieces'}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1 text-slate-500 hover:text-black rounded-lg transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {orderPlaced ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="font-serif-marcellus text-2xl text-[#3B0F1E]">Order Confirmed!</h3>
                <p className="text-xs text-slate-600 max-w-xs mx-auto">
                  Thank you, <strong className="text-[#3B0F1E]">{customerName || 'Handloom Connoisseur'}</strong>! Your order #PDM-{Math.floor(1000 + Math.random() * 9000)} has been received and sent to our master weaving dispatch hub.
                </p>
                <div className="bg-[#FFFDF9] p-4 rounded-lg border border-[#E8DEC8] text-left text-xs space-y-1.5 max-w-xs mx-auto">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Dispatch Timeline:</span>
                    <span className="font-medium text-[#3B0F1E]">Within 48 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Packaging:</span>
                    <span className="font-medium text-[#3B0F1E]">Breathable Muslin Saree Bag</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Payment:</span>
                    <span className="font-medium text-emerald-700">Cash on Delivery / UPI</span>
                  </div>
                </div>
                <button
                  onClick={resetAndClose}
                  className="w-full mt-4 py-3 bg-[#4A1525] text-white rounded-lg text-xs font-semibold hover:bg-[#3B0F1E] transition-all"
                >
                  Continue Exploring Sarees
                </button>
              </div>
            ) : items.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 bg-[#EFE8DA] rounded-full flex items-center justify-center mx-auto text-[#8B2E49]">
                  <X className="w-8 h-8 opacity-40" />
                </div>
                <h3 className="font-serif-marcellus text-xl text-[#3B0F1E]">Your Bag is Empty</h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Discover India’s finest Maheshwari, Paithani, and Narayanpet handloom sarees direct from weaving clusters.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-2.5 bg-[#4A1525] text-[#FAF5EF] rounded-lg text-xs font-semibold hover:bg-[#3B0F1E] transition-colors"
                >
                  Browse Handloom Collection
                </button>
              </div>
            ) : (
              <>
                {/* Free shipping reassurance */}
                <div className="bg-[#FFFDF9] border border-[#E8DEC8] p-3 rounded-lg text-xs text-[#5A484C] flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span><strong>Free Express Shipping</strong> &amp; Silk Mark Guaranteed on this order.</span>
                </div>

                {/* Items List */}
                <div className="divide-y divide-[#E8DEC8]">
                  {items.map(item => {
                    const imgUrl = item.saree.localImages?.[0] || item.saree.imageUrls?.[0] || '';
                    return (
                      <div key={`${item.saree.id}-${item.selectedColor}`} className="py-4 flex gap-3.5">
                        <img
                          src={imgUrl}
                          alt={item.saree.name}
                          className="w-18 h-24 object-cover rounded-md border border-[#E8DEC8] bg-stone-100 shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start">
                              <h4 className="font-serif-marcellus text-sm font-semibold text-[#3B0F1E] line-clamp-1">
                                {item.saree.name}
                              </h4>
                              <button
                                onClick={() => removeFromCart(item.saree.id, item.selectedColor)}
                                className="text-slate-400 hover:text-red-600 transition-colors p-1"
                                aria-label="Remove item"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <div className="text-xs text-slate-500 mt-0.5">
                              <span>Weave: {item.saree.weave}</span>
                              <span className="mx-1.5" aria-hidden="true">·</span>
                              <span>Color: {item.selectedColor}</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#F0E9DA]">
                            <div className="flex items-center border border-[#D5C9B3] rounded-md bg-white">
                              <button
                                onClick={() => updateQuantity(item.saree.id, item.selectedColor, -1)}
                                className="p-1 text-slate-600 hover:text-black"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="px-2 text-xs font-semibold tabular-nums">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.saree.id, item.selectedColor, 1)}
                                className="p-1 text-slate-600 hover:text-black"
                                aria-label="Increase quantity"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                            <div className="text-right">
                              <span className="font-serif-marcellus text-sm font-bold text-[#3B0F1E] tabular-nums">
                                Rs {(item.saree.price * item.quantity).toLocaleString('en-IN')}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Quick Checkout Form */}
                <form onSubmit={handleCheckout} className="pt-4 border-t border-[#E8DEC8] space-y-3">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#3B0F1E]">
                    Fast Delivery Details (COD Available)
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      required
                      placeholder="Your Full Name"
                      value={customerName}
                      onChange={e => setCustomerName(e.target.value)}
                      className="w-full text-xs px-3 py-2 border border-[#D5C9B3] rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-[#8B2E49]"
                    />
                    <input
                      type="tel"
                      required
                      placeholder="WhatsApp Mobile"
                      value={customerPhone}
                      onChange={e => setCustomerPhone(e.target.value)}
                      className="w-full text-xs px-3 py-2 border border-[#D5C9B3] rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-[#8B2E49]"
                    />
                  </div>
                  <div className="bg-[#FFFDF9] p-3 rounded-md border border-[#E8DEC8] space-y-1.5 text-xs">
                    <div className="flex justify-between text-slate-600">
                      <span>Bag Subtotal</span>
                      <span className="tabular-nums">Rs {subtotal.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Handloom Saree Dispatch</span>
                      <span className="text-emerald-700 font-medium">FREE</span>
                    </div>
                    <div className="flex justify-between font-serif-marcellus text-base font-bold text-[#3B0F1E] pt-1.5 border-t border-[#F0E9DA]">
                      <span>Total Amount</span>
                      <span className="tabular-nums">Rs {subtotal.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-[#4A1525] text-[#FAF5EF] rounded-lg text-xs font-semibold hover:bg-[#3B0F1E] active:scale-98 transition-all flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? 'Securing Handloom Order...' : `Place Handloom Order · Rs ${subtotal.toLocaleString('en-IN')}`}
                  </button>

                  {/* Direct WhatsApp Concierge Link */}
                  <a
                    href={`https://wa.me/919999999999?text=${encodeURIComponent(
                      `Hello Padmora! I would like to order: ${items
                        .map(i => `${i.saree.name} (${i.selectedColor})`)
                        .join(', ')} - Total: Rs ${subtotal}`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2.5 bg-emerald-700 text-white rounded-lg text-xs font-medium hover:bg-emerald-800 transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Order via WhatsApp Concierge</span>
                  </a>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
