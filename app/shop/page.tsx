'use client'

import React, { useState, useMemo } from 'react';
import Navbar from "@/components/navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import CartDrawer from "@/components/CartDrawer";
import ProductCard from "@/components/ProductCard";
import { PRODUCTS, Product } from "@/lib/data";
import { useCart } from "@/components/CartContext";
import { motion, AnimatePresence } from "framer-motion";

// Extract unique filter options from PRODUCTS
const sizes = Array.from(new Set(PRODUCTS.map(p => p.size))).sort();
const materials = Array.from(new Set(PRODUCTS.map(p => p.material))).sort();
const finishes = Array.from(new Set(PRODUCTS.map(p => p.finish))).sort();
const rooms = Array.from(new Set(PRODUCTS.map(p => p.room))).sort();

export default function ShopPage() {
  const { cart, addToCart, cartOpen, setCartOpen, removeFromCart } = useCart();
  
  // Filter States
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [selectedFinishes, setSelectedFinishes] = useState<string[]>([]);
  const [selectedRooms, setSelectedRooms] = useState<string[]>([]);

  // Filtering Logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      if (selectedSizes.length > 0 && !selectedSizes.includes(p.size)) return false;
      if (selectedMaterials.length > 0 && !selectedMaterials.includes(p.material)) return false;
      if (selectedFinishes.length > 0 && !selectedFinishes.includes(p.finish)) return false;
      if (selectedRooms.length > 0 && !selectedRooms.includes(p.room)) return false;
      return true;
    });
  }, [selectedSizes, selectedMaterials, selectedFinishes, selectedRooms]);

  function handleFilterChange(
    stateUpdater: React.Dispatch<React.SetStateAction<string[]>>, 
    value: string
  ) {
    stateUpdater(prev => 
      prev.includes(value) ? prev.filter(i => i !== value) : [...prev, value]
    );
  }

  const FilterSection = ({ title, options, state, stateUpdater }: { title: string, options: string[], state: string[], stateUpdater: any }) => (
    <div className="mb-8">
      <h4 className="text-sm font-black tracking-widest uppercase mb-4 text-foreground/80">{title}</h4>
      <div className="space-y-3">
        {options.map(opt => (
          <label key={opt} className="flex items-center gap-3 cursor-pointer group">
            <div className={`w-4 h-4 border rounded flex items-center justify-center transition-colors ${state.includes(opt) ? 'bg-primary border-primary' : 'border-border group-hover:border-primary/50'}`}>
              {state.includes(opt) && (
                <svg className="w-3 h-3 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
            <span className={`text-sm ${state.includes(opt) ? 'text-foreground font-semibold' : 'text-muted-foreground group-hover:text-foreground'}`}>
              {opt}
            </span>
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex flex-col pt-20">
      <Navbar cartCount={cart.length} onCartOpen={() => setCartOpen(true)} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12 border-b border-border/50 pb-8">
          <p className="text-[#a68038] dark:text-[#c8a96e] text-xs font-black tracking-[0.3em] uppercase mb-4">The Collection</p>
          <h1 className="text-4xl md:text-5xl font-black text-foreground mb-4" style={{ fontFamily: "'Georgia', serif" }}>
            Shop all tiles
          </h1>
          <p className="text-muted-foreground text-sm max-w-2xl leading-relaxed">
            A small, well-edited range of premium porcelain, marble, ceramic, and granite. Use the filters to narrow by size, material, finish and setting — much of it is reduced while stock lasts.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-12">
          {/* Sidebar */}
          <aside className="w-full md:w-64 shrink-0">
            <FilterSection title="Size" options={sizes} state={selectedSizes} stateUpdater={setSelectedSizes} />
            <FilterSection title="Material" options={materials} state={selectedMaterials} stateUpdater={setSelectedMaterials} />
            <FilterSection title="Finish" options={finishes} state={selectedFinishes} stateUpdater={setSelectedFinishes} />
            <FilterSection title="Room" options={rooms} state={selectedRooms} stateUpdater={setSelectedRooms} />
          </aside>

          {/* Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6 text-sm text-muted-foreground">
              <span>{filteredProducts.length} TILES</span>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="py-20 text-center border border-border/50 rounded-3xl bg-card">
                <p className="text-foreground/50">No products match your selected filters.</p>
                <button 
                  onClick={() => {
                    setSelectedSizes([]);
                    setSelectedMaterials([]);
                    setSelectedFinishes([]);
                    setSelectedRooms([]);
                  }}
                  className="mt-4 text-primary hover:underline text-sm font-semibold"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                <AnimatePresence>
                  {filteredProducts.map((p, i) => (
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
            )}
          </div>
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
