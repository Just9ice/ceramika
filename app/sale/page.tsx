'use client'

import React, { useState } from 'react';
import Navbar from "@/components/navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import CartDrawer from "@/components/CartDrawer";
import ProductCard from "@/components/ProductCard";
import { PRODUCTS, waGeneralLink } from "@/lib/data";
import { useCart } from "@/components/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator } from "lucide-react";
import { FaWhatsapp as WhatsAppIcon } from 'react-icons/fa';

export default function SalePage() {
 const { cart, addToCart, cartOpen, setCartOpen, removeFromCart } = useCart();
 
 const saleProducts = PRODUCTS.filter(p => p.tag === 'Sale' || p.pricePerSqm < 15000);

 const [calcLength, setCalcLength] = useState('');
 const [calcWidth, setCalcWidth] = useState('');
 const [calcPrice, setCalcPrice] = useState('');
 const [calcResult, setCalcResult] = useState<{
  sqm: number; withWaste: number; cartons: number; total: number;
 } | null>(null);

 function runCalculator() {
  const l = parseFloat(calcLength);
  const w = parseFloat(calcWidth);
  const p = parseFloat(calcPrice);
  if (!l || !w || !p) return;
  const sqm = l * w;
  const withWaste = sqm * 1.1;
  const cartons = Math.ceil(withWaste / 1.44);
  const total = withWaste * p;
  setCalcResult({ sqm, withWaste, cartons, total });
 }

 const displayResult = calcResult ?? { sqm: 0, withWaste: 0, cartons: 0, total: 0 };

 return (
  <div className="min-h-screen bg-background flex flex-col pt-20">
   <Navbar cartCount={cart.length} onCartOpen={() => setCartOpen(true)} />

   <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div className="mb-12 border-b border-border/50 pb-8">
     <p className="text-[#ef4444] text-xs font-black tracking-[0.3em] uppercase mb-4">Limited Time Offers</p>
     <h1 className="text-4xl md:text-5xl font-black text-foreground mb-4" style={{ fontFamily: "'Georgia', serif" }}>
      The Sale Edit
     </h1>
     <p className="text-muted-foreground text-sm max-w-2xl leading-relaxed">
      Selected stock, significantly reduced. Don&apos;t miss out on these premium cuts for your next project. Available while supplies last.
     </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
     <AnimatePresence mode="popLayout">
      {saleProducts.map((p) => (
       <motion.div
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        key={p.id}
       >
        <ProductCard product={p} onAddToCart={addToCart} />
       </motion.div>
      ))}
     </AnimatePresence>
    </div>
   </main>

   {/* ═══════════════════════════════════════════════════════════════
     SQM CALCULATOR
   ═══════════════════════════════════════════════════════════════ */}
   <section className="relative bg-background py-24 border-y border-border overflow-hidden">
    <div className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none" style={{ background: 'radial-gradient(circle at 80% 20%, rgba(200,169,110,0.06) 0%, transparent 70%)' }} />
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
     <div className="grid lg:grid-cols-[1fr_1.2fr] gap-16 items-center">
      <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}>
       <div className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 rounded-full border text-xs" style={{ borderColor: 'rgba(200,169,110,0.25)', background: 'rgba(200,169,110,0.06)', color: '#c8a96e' }}>
        <Calculator className="w-3.5 h-3.5" /> Free Tool
       </div>
       <h2 className="text-foreground font-black leading-tight mb-4" style={{ fontFamily: "var(--font-cormorant), serif", fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>
        SqM &amp; Cost<br />
        <span className="text-transparent [-webkit-text-stroke:1.5px_#a68038] opacity-90">Calculator.</span>
       </h2>
       <p className="text-foreground/80 leading-relaxed mb-7 text-sm max-w-md">
        Enter your room dimensions. We&apos;ll calculate the exact square metres needed, add a 10% wastage buffer, and give you the total cost and carton count.
       </p>
       <div className="flex flex-col gap-3">
        {["Includes 10% wastage buffer", "Carton count included", "Works with any tile price"].map((item) => (
         <div key={item} className="flex items-center gap-2.5">
          <div className="w-1.5 h-1.5 rounded-full bg-[#c8a96e] shrink-0" />
          <span className="text-foreground/80 text-sm">{item}</span>
         </div>
        ))}
       </div>
      </motion.div>
      <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }} className="relative rounded-3xl overflow-hidden bg-card border border-border shadow-xl hover:shadow-2xl transition-all">
       <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#c8a96e]/40 to-transparent" />
       <div className="p-7 sm:p-9">
        <p className="text-foreground/80 text-xs uppercase tracking-widest mb-6">Room dimensions</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
         {[
          { label: "Length (m)", value: calcLength, set: setCalcLength, placeholder: "5" },
          { label: "Width (m)", value: calcWidth, set: setCalcWidth, placeholder: "4" },
          { label: "Price (₦/sqm)", value: calcPrice, set: setCalcPrice, placeholder: "12000" },
         ].map((field) => (
          <div key={field.label} className="flex flex-col gap-1.5">
           <label className="text-muted-foreground text-[10px] uppercase tracking-widest">{field.label}</label>
           <input type="number" className="w-full rounded-xl border border-border bg-input px-4 py-3 text-foreground outline-none text-sm transition-all focus:border-[#a68038] focus:ring-1 focus:ring-[#c8a96e]/20" placeholder={field.placeholder} value={field.value} onChange={(e) => field.set(e.target.value)} />
          </div>
         ))}
        </div>
        <motion.button onClick={runCalculator} className="w-full py-3.5 rounded-xl bg-[#c8a96e] text-[#0b1410] font-black text-sm uppercase tracking-widest mb-6" whileHover={{ scale: 1.02, backgroundColor: '#d4b87e' }} whileTap={{ scale: 0.98 }}>
         <span className="flex items-center justify-center gap-2"><Calculator className="w-4 h-4" /> Calculate</span>
        </motion.button>
        <div className="grid grid-cols-2 gap-3">
         {[
          { label: "Base Area", value: `${displayResult.sqm.toFixed(2)} sqm`, hi: false },
          { label: "With 10% Waste", value: `${displayResult.withWaste.toFixed(2)} sqm`, hi: true },
          { label: "Cartons Needed", value: `${displayResult.cartons} cartons`, hi: false },
          { label: "Est. Total", value: `₦${displayResult.total.toLocaleString("en-NG", { maximumFractionDigits: 0 })}`, hi: true },
         ].map((r) => (
          <AnimatePresence key={r.label} mode="wait">
           <motion.div key={r.value} initial={{ opacity: 0.6, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }} className={`rounded-2xl p-4 border ${r.hi ? 'bg-[#c8a96e]/10 border-[#a68038]' : 'bg-muted/50 border-border'}`}>
            <p className="text-muted-foreground text-[10px] uppercase tracking-widest mb-1">{r.label}</p>
            <p className={`font-black text-xl ${r.hi ? 'text-[#a68038]' : 'text-foreground'}`} style={{ fontFamily: "var(--font-cormorant), serif" }}>{r.value}</p>
           </motion.div>
          </AnimatePresence>
         ))}
        </div>
       </div>
      </motion.div>
     </div>
    </div>
   </section>

   {/* ═══════════════════════════════════════════════════════════════
     WHATSAPP CTA
   ═══════════════════════════════════════════════════════════════ */}
   <section className="relative bg-[#25d366]/[0.12] py-20 border-t border-border overflow-hidden">
    <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 70% at 50% 50%, rgba(37,211,102,0.18) 0%, transparent 70%)' }} />
    <div className="relative max-w-xl mx-auto text-center px-4">
     <div className="relative inline-flex items-center justify-center mb-7">
      <motion.div className="absolute w-20 h-20 rounded-full" style={{ background: 'rgba(37,211,102,0.12)' }} animate={{ scale: [1, 1.45, 1.7], opacity: [0.5, 0.15, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut' }} />
      <motion.div className="absolute w-20 h-20 rounded-full" style={{ background: 'rgba(37,211,102,0.08)' }} animate={{ scale: [1, 1.3, 1.55], opacity: [0.4, 0.12, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut', delay: 0.6 }} />
      <div className="relative w-16 h-16 bg-[#25d366]/10 border border-[#25d366]/25 rounded-full flex items-center justify-center">
       <WhatsAppIcon className="w-8 h-8 text-[#25d366]" />
      </div>
     </div>
     <motion.h2 className="text-foreground font-black mb-3" style={{ fontFamily: "var(--font-cormorant), serif", fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
      Ready to order from the sale?
     </motion.h2>
     <p className="text-foreground/80 mb-8 leading-relaxed">
      Message us directly for bulk discounts, stock confirmation, or help choosing the right tile.
     </p>
     <motion.a href={waGeneralLink("Hello! I need help choosing tiles from the sale.")} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 bg-[#25d366] text-foreground font-black px-9 py-4 rounded-full text-sm" whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(37,211,102,0.3)' }} whileTap={{ scale: 0.97 }}>
      <WhatsAppIcon className="w-5 h-5" /> Chat with Our Team
     </motion.a>
     <p className="text-foreground/80 text-xs mt-4">Average response time: under 10 minutes</p>
    </div>
   </section>

   <Footer />
   <FloatingWhatsApp />

   <AnimatePresence>
    {cartOpen && (
     <CartDrawer
      items={cart}
      onClose={() => setCartOpen(false)}
      onRemove={removeFromCart}
     />
    )}
   </AnimatePresence>
  </div>
 );
}
