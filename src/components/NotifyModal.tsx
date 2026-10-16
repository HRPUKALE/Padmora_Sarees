import React, { useState } from 'react';
import { X, CheckCircle2, Bell, MessageCircle } from 'lucide-react';
import { Saree } from '../types/saree';

interface NotifyModalProps {
  saree: Saree | null;
  selectedColor?: string;
  onClose: () => void;
}

export const NotifyModal: React.FC<NotifyModalProps> = ({ saree, selectedColor, onClose }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isDone, setIsDone] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!saree) return null;

  const color = selectedColor || saree.colour || 'Classic';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsDone(true);
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />

      <div className="relative z-10 w-full max-w-md bg-[#FAF6F0] rounded-xl border border-[#E8DEC8] shadow-2xl overflow-hidden p-6 text-[#2B1F22]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-black transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {isDone ? (
          <div className="text-center py-6 space-y-3">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-serif-marcellus text-xl text-[#3B0F1E]">Priority Waitlist Confirmed!</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Namaste {name || 'connoisseur'}, your interest in the <strong className="text-[#3B0F1E]">{saree.name}</strong> ({color}) has been registered with our master weavers in {saree.weaverRegion || 'Madhya Pradesh'}.
            </p>
            <div className="p-3 bg-[#FFFDF9] rounded-lg border border-[#E8DEC8] text-xs text-slate-600">
              You will receive an exclusive WhatsApp notification <strong>24 hours prior</strong> to general release, with a reserved checkout link.
            </div>
            <button
              onClick={onClose}
              className="w-full mt-2 py-2.5 bg-[#4A1525] text-white rounded-lg text-xs font-semibold hover:bg-[#3B0F1E] transition-colors"
            >
              Done
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[#8B2E49]">
              <Bell className="w-5 h-5 text-[#C59B27]" />
              <h3 className="font-serif-marcellus text-xl text-[#3B0F1E]">
                Pre-Book / Notify Me
              </h3>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              This handcrafted <strong>{saree.name}</strong> in {color} is currently sold out. Master weavers take 4–7 days per batch. Join the priority waitlist to lock your piece with zero upfront commitment.
            </p>

            <div className="bg-[#FFFDF9] p-3 rounded-lg border border-[#E8DEC8] flex items-center justify-between text-xs">
              <div>
                <span className="text-slate-500">Selected Shade:</span>
                <span className="font-medium text-[#3B0F1E] ml-1">{color}</span>
              </div>
              <div>
                <span className="text-slate-500">Price:</span>
                <span className="font-serif-marcellus font-bold text-[#3B0F1E] ml-1">
                  Rs {saree.price.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-[11px] font-medium text-slate-700 mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Radhika Sharma"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-[#D5C9B3] rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-[#8B2E49]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-700 mb-1">WhatsApp Number (for priority alert)</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-[#D5C9B3] rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-[#8B2E49]"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 bg-[#4A1525] text-white rounded-lg text-xs font-semibold hover:bg-[#3B0F1E] transition-all"
              >
                {isSubmitting ? 'Registering...' : 'Join Exclusive Pre-Book Waitlist'}
              </button>
            </form>

            <div className="pt-2 border-t border-[#E8DEC8] text-center">
              <a
                href={`https://wa.me/919999999999?text=${encodeURIComponent(
                  `Hi Padmora! I am interested in pre-booking the ${saree.name} in ${color} (Rs ${saree.price}). When is the next batch ready?`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-emerald-700 hover:text-emerald-800 font-medium"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Or inquire directly with founder on WhatsApp</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
