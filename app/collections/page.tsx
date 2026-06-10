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

interface Category {
  label: string;
  Icon: LucideIcon;
  count: number;
  href: string;
  image?: string;
}

const CATEGORIES: Category[] = [
  { label: "Bathroom",  Icon: Bath,      count: 48, href: "/shop",     image: "/Bathroom2.jpg"  },
  { label: "Kitchen",   Icon: ChefHat,   count: 36, href: "/shop",     image: "/Kitchen.jpg"   },
  { label: "Floor",     Icon: Grid2x2,   count: 92, href: "/shop",     image: "/Floor.jpg"     },
  { label: "Porcelain", Icon: Gem,       count: 55, href: "/shop", image: "/Porcelain.jpg" },
  { label: "Ceramic",   Icon: Layers,    count: 74, href: "/shop", image: "/Ceramic.jpg"   },
  { label: "Marble",    Icon: Square,    count: 61, href: "/shop", image: "/Marble.jpg"    },
  { label: "Matte",     Icon: Brush,     count: 61, href: "/shop",   image: "/Mette2.jpg"    },
  { label: "Glossy",    Icon: Sparkles,  count: 43, href: "/shop",   image: "/glossy.jpg"   },
];

export default function CollectionsPage() {
  const { cart, cartOpen, setCartOpen, removeFromCart } = useCart();
  
  return (
    <div className="min-h-screen bg-background flex flex-col pt-20">
      <Navbar cartCount={cart.length} onCartOpen={() => setCartOpen(true)} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12 border-b border-border/50 pb-8 text-center max-w-3xl mx-auto">
          <p className="text-[#a68038] dark:text-[#c8a96e] text-xs font-black tracking-[0.3em] uppercase mb-4">Curated Settings</p>
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
