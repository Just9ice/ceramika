'use client'

import React from 'react';
import Navbar from "@/components/navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import CartDrawer from "@/components/CartDrawer";
import CategoryCard from "@/components/CategoryCard";
import { useCart } from "@/components/CartContext";
import { AnimatePresence, motion } from "framer-motion";
import { Bath, ChefHat, Grid2x2, Gem, Square, Layers, Sparkles, Brush, type LucideIcon } from "lucide-react";
import { waGeneralLink } from "@/lib/data";
import { FaWhatsapp as WhatsAppIcon } from 'react-icons/fa';

interface Category {
 label: string;
 Icon: LucideIcon;
 count: number;
 href: string;
 image?: string;
}

const CATEGORIES: Category[] = [
 { label: "Bathroom", Icon: Bath,   count: 48, href: "/shop",   image: "/Bathroom2.jpg" },
 { label: "Kitchen",  Icon: ChefHat,  count: 36, href: "/shop",   image: "/Kitchen.jpg"  },
 { label: "Floor",   Icon: Grid2x2,  count: 92, href: "/shop",   image: "/Floor.jpg"   },
 { label: "Porcelain", Icon: Gem,    count: 55, href: "/shop", image: "/Porcelain.jpg" },
 { label: "Ceramic",  Icon: Layers,  count: 74, href: "/shop", image: "/Ceramic.jpg"  },
 { label: "Marble",  Icon: Square,  count: 61, href: "/shop", image: "/Marble.jpg"  },
 { label: "Matte",   Icon: Brush,   count: 61, href: "/shop",  image: "/Mette2.jpg"  },
 { label: "Glossy",  Icon: Sparkles, count: 43, href: "/shop",  image: "/glossy.jpg"  },
];

export default function CollectionsPage() {
 const { cart, cartOpen, setCartOpen, removeFromCart } = useCart();
 
 return (
  <div className="min-h-screen bg-background flex flex-col pt-20">
   <Navbar cartCount={cart.length} onCartOpen={() => setCartOpen(true)} />

   <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div className="mb-12 border-b border-border/50 pb-8 text-center max-w-3xl mx-auto">
     <p className="text-[#a68038] text-xs font-black tracking-[0.3em] uppercase mb-4">Curated Settings</p>
     <h1 className="text-4xl md:text-5xl font-black text-foreground mb-4" style={{ fontFamily: "'Georgia', serif" }}>
      Our Collections
     </h1>
     <p className="text-muted-foreground text-sm leading-relaxed">
      Discover tiles specially chosen for various aesthetics and environments. Immerse yourself in the materials that make your spaces come alive.
     </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
     {CATEGORIES.map((cat, i) => (
       <motion.div
        key={cat.label}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: i * 0.06 }}
       >
        <CategoryCard
         label={cat.label}
         Icon={cat.Icon}
         count={cat.count}
         href={cat.href}
         image={cat.image}
        />
       </motion.div>
     ))}
    </div>
   </main>

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
      Not sure which collection?
     </motion.h2>
     <p className="text-foreground/80 mb-8 leading-relaxed">
      Tell us about your space and we&apos;ll recommend the perfect tiles for your budget — for free.
     </p>
     <motion.a href={waGeneralLink("Hello! I need help choosing a tile collection for my project.")} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 bg-[#25d366] text-foreground font-black px-9 py-4 rounded-full text-sm" whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(37,211,102,0.3)' }} whileTap={{ scale: 0.97 }}>
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
