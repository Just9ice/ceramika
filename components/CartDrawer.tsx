'use client';

import React, { useState } from 'react'
import { CartItem, WA_NUMBER } from '@/lib/data'
import WhatsAppIcon from '@/components/ui/WhatsAppIcon';
import { motion, AnimatePresence } from 'framer-motion';

interface CartDrawerProps {
    items: CartItem[];
    onClose: () => void;
    onRemove: (id: number) => void;
}

export default function CartDrawer({ items, onClose, onRemove }: CartDrawerProps) {
    const total = items.reduce((sum, i) => sum + i.sqm * i.pricePerSqm, 0);
    const [isCheckout, setIsCheckout] = useState(false);
    
    // KYC Form State
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        homeAddress: '',
        officeAddress: '',
        dispatchLocation: ''
    });

    const handleCheckout = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Build Invoice
        const lines = items.map(
            (i) => `• ${i.name} — ${i.sqm} sqm × ₦${i.pricePerSqm.toLocaleString()} = ₦${(i.sqm * i.pricePerSqm).toLocaleString()}`
        );
        
        const invoiceText = [
            `*NEW ORDER INVOICE*`,
            ``,
            `*Customer Details:*`,
            `Name: ${formData.name}`,
            `Phone: ${formData.phone}`,
            `Email: ${formData.email || 'N/A'}`,
            `Home Address: ${formData.homeAddress || 'N/A'}`,
            `Office Address: ${formData.officeAddress || 'N/A'}`,
            `*Dispatch To:* ${formData.dispatchLocation}`,
            ``,
            `*Order Items:*`,
            ...lines,
            ``,
            `*Total Due: ₦${total.toLocaleString()}*`,
            ``,
            `Please confirm availability and arrange payment.`,
        ].join('\n');

        const uri = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(invoiceText)}`;
        window.open(uri, '_blank');
        onClose(); // Optional: clear cart logic can go here.
    };

    return (
        <div className='fixed inset-0 z-[100] flex justify-end'>
            {/* Backdrop */}
            <motion.div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
                aria-hidden='true'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
            />

            {/* Drawer Panel */}
            <motion.div 
                className="relative bg-background border-l border-border/50 w-full max-w-md h-full flex flex-col shadow-2xl overflow-hidden"
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
            >

                {/* Header */}
                <div className="flex flex-shrink-0 items-center justify-between px-6 py-5 border-b border-border/50 bg-card">
                    <h2
                        className="text-card-foreground font-black tracking-tight"
                        style={{ fontFamily: "'Georgia' serif", fontSize: "1.25rem" }}
                    >
                        {isCheckout ? 'Delivery Details' : 'Your Bag'}
                    </h2>
                    <button
                        onClick={() => isCheckout ? setIsCheckout(false) : onClose()}
                        aria-label='close'
                        className='text-muted-foreground hover:text-foreground transition-colors'
                    >
                        {isCheckout ? (
                            <svg className='w-5 h-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
                            </svg>
                        ) : (
                            <svg className='w-5 h-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                            </svg>
                        )}
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto relative">
                    <AnimatePresence mode="wait">
                        {!isCheckout ? (
                            <motion.div 
                                key="cart-list"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="flex flex-col px-6 py-4 gap-4"
                            >
                                {items.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center mt-20 gap-3 text-muted-foreground">
                                        <svg className='w-12 h-12 opacity-50' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z' />
                                        </svg>
                                        <p className="text-sm font-semibold uppercase tracking-widest">Your bag is empty</p>
                                    </div>
                                ) : (
                                    items.map((item) => (
                                        <div key={item.id} className="flex gap-4 p-3 rounded-2xl bg-card border border-border shadow-sm">
                                            {/* Tile colour swatch */}
                                            <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${item.gradient} shrink-0 border border-border/50`} />
                                            <div className="flex-1 min-w-0 flex flex-col justify-center">
                                                <p className="text-foreground text-sm font-bold truncate">
                                                    {item.name}
                                                </p>
                                                <p className="text-muted-foreground text-xs mt-0.5">
                                                    {item.sqm} sqm . ₦{item.pricePerSqm.toLocaleString()}/sqm
                                                </p>
                                                <p className="text-accent-foreground text-sm font-black mt-1">
                                                    ₦{(item.sqm * item.pricePerSqm).toLocaleString()}
                                                </p>
                                            </div>

                                            <button
                                                onClick={() => onRemove(item.id)}
                                                className='text-muted-foreground hover:text-destructive transiton-colors p-2 self-start'
                                            >
                                                <svg className='w-4 h-4' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16' />
                                                </svg>
                                            </button>
                                        </div>
                                    ))
                                )}
                            </motion.div>
                        ) : (
                            <motion.form 
                                key="checkout-form"
                                onSubmit={handleCheckout}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="flex flex-col px-6 py-6 gap-4"
                            >
                                <p className="text-sm text-muted-foreground mb-2">
                                    Please provide your details below. This will be formatted into an invoice and sent via WhatsApp to our team for immediate processing.
                                </p>
                                
                                <div className="space-y-3">
                                    <div>
                                        <label className="block text-xs font-semibold text-foreground/70 uppercase tracking-widest mb-1.5">Full Name *</label>
                                        <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-3 py-2.5 bg-input border border-border rounded-xl text-sm outline-none focus:border-accent text-foreground transition-colors placeholder-muted-foreground" placeholder="John Doe" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-foreground/70 uppercase tracking-widest mb-1.5">Phone Number *</label>
                                        <input required type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full px-3 py-2.5 bg-input border border-border rounded-xl text-sm outline-none focus:border-accent text-foreground transition-colors placeholder-muted-foreground" placeholder="08012345678" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-foreground/70 uppercase tracking-widest mb-1.5">Email Address</label>
                                        <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-3 py-2.5 bg-input border border-border rounded-xl text-sm outline-none focus:border-accent text-foreground transition-colors placeholder-muted-foreground" placeholder="john@example.com" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-foreground/70 uppercase tracking-widest mb-1.5">Physical Home Address</label>
                                        <textarea value={formData.homeAddress} onChange={e => setFormData({...formData, homeAddress: e.target.value})} rows={2} className="w-full px-3 py-2.5 bg-input border border-border rounded-xl text-sm outline-none focus:border-accent text-foreground transition-colors placeholder-muted-foreground resize-none" placeholder="123 Ceramic Way..." />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-foreground/70 uppercase tracking-widest mb-1.5">Office Address (Optional)</label>
                                        <textarea value={formData.officeAddress} onChange={e => setFormData({...formData, officeAddress: e.target.value})} rows={2} className="w-full px-3 py-2.5 bg-input border border-border rounded-xl text-sm outline-none focus:border-accent text-foreground transition-colors placeholder-muted-foreground resize-none" placeholder="Corporate HQ..." />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-foreground/70 uppercase tracking-widest mb-1.5">Dispatch Location *</label>
                                        <input required type="text" value={formData.dispatchLocation} onChange={e => setFormData({...formData, dispatchLocation: e.target.value})} className="w-full px-3 py-2.5 bg-input border border-border rounded-xl text-sm outline-none focus:border-accent text-foreground transition-colors placeholder-muted-foreground" placeholder="Which address should we deliver to?" />
                                    </div>
                                </div>
                            </motion.form>
                        )}
                    </AnimatePresence>
                </div>

                {/* Footer with total + checkout */}
                {items.length > 0 && (
                    <div className="flex-shrink-0 px-6 py-5 border-t border-border/50 bg-card flex flex-col gap-4 shadow-[0_-10px_40px_rgba(0,0,0,0.03)]">
                        <div className="flex items-center justify-between">
                            <span className="text-muted-foreground text-sm font-bold uppercase tracking-widest">
                                Estimated Total
                            </span>
                            <span className="font-black text-2xl text-foreground" style={{ fontFamily: "'Georgia', serif" }}>
                                ₦{total.toLocaleString()}
                            </span>
                        </div>

                        {!isCheckout ? (
                            <button
                                onClick={() => setIsCheckout(true)}
                                className="w-full py-4 bg-[#25d366] text-white hover:bg-[#1fb859] font-black tracking-widest text-sm uppercase rounded-xl transition-all active:scale-[0.98] shadow-md"
                            >
                                Secure Checkout
                            </button>
                        ) : (
                            <button
                                onClick={handleCheckout}
                                disabled={!formData.name || !formData.phone || !formData.dispatchLocation}
                                className="flex items-center justify-center gap-2 w-full py-4 bg-[#25d366] disabled:bg-[#25d366]/50 text-white font-black tracking-widest text-sm uppercase rounded-xl transition-all active:scale-[0.98] shadow-md hover:bg-[#1fb859]"
                            >
                                <WhatsAppIcon className="w-5 h-5" />
                                Generate WA Invoice
                            </button>
                        )}
                    </div>
                )}
            </motion.div>
        </div>
    );
}
