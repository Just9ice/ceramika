'use client'

import React from 'react';
import Navbar from "@/components/navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import CartDrawer from "@/components/CartDrawer";
import ProductCard from "@/components/ProductCard";
import { PRODUCTS } from "@/lib/data";
import { useCart } from "@/components/CartContext";
import { motion, AnimatePresence } from "framer-motion";

export default function SalePage() {
  const { cart, addToCart, cartOpen, setCartOpen, removeFromCart } = useCart();
  
  const saleProducts = PRODUCTS.filter(p => p.tag === 'Sale' || p.pricePerSqm < 15000);

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
            Selected stock, significantly reduced. Don't miss out on these premium cuts for your next project. Available while supplies last.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {saleProducts.map((p, i) => (
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
