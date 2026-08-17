"use client";

import React, { useState, useMemo, useEffect } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import CartDrawer from "@/components/CartDrawer";
import ProductCard from "@/components/ProductCard";
import { waGeneralLink, Product } from "@/lib/data";
import { fetchProducts } from "@/lib/api";
import { useCart } from "@/components/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { FaWhatsapp as WhatsAppIcon } from "react-icons/fa";

function FilterSection({
  title,
  options,
  state,
  stateUpdater,
  defaultOpen = true,
  onClearAll,
  showClearAll,
}: {
  title: string;
  options: string[];
  state: string[];
  stateUpdater: React.Dispatch<React.SetStateAction<string[]>>;
  defaultOpen?: boolean;
  onClearAll?: () => void;
  showClearAll?: boolean;
}) {
  const [open, setOpen] = React.useState(defaultOpen);

  return (
    <div className="mb-8">
      {/* Dropdown header */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between py-2 bg-transparent"
      >
        <span className="text-[10px] md:text-xs font-semibold tracking-widest uppercase text-foreground/60">
          {title}
        </span>
        <svg
          className={`w-3 h-3 text-muted-foreground transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Collapsible body */}
      {open && (
        <div className="py-3 space-y-4">
          {options.map((opt) => (
            <label
              key={opt}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                type="checkbox"
                className="sr-only"
                checked={state.includes(opt)}
                onChange={() => {
                  stateUpdater((prev) =>
                    prev.includes(opt)
                      ? prev.filter((i) => i !== opt)
                      : [...prev, opt],
                  );
                }}
              />
              <div
                className={`w-4 h-4 border flex items-center justify-center transition-colors ${state.includes(opt) ? "bg-black border-black" : "border-black/30 group-hover:border-black/50"}`}
              >
                {state.includes(opt) && (
                  <svg
                    className="w-3 h-3 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </div>
              <span
                className={`text-sm ${state.includes(opt) ? "text-foreground font-medium" : "text-muted-foreground group-hover:text-foreground"}`}
              >
                {opt}
              </span>
            </label>
          ))}
          {/* Clear all filters */}
          {onClearAll && showClearAll && (
            <button
              onClick={onClearAll}
              className="mt-6 pt-4 text-[10px] md:text-xs font-semibold tracking-widest uppercase text-foreground/80 hover:text-foreground block text-left w-full"
            >
              CLEAR ALL FILTERS
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default function ShopPage() {
  const { cart, addToCart, cartOpen, setCartOpen, removeFromCart } = useCart();

  // Products from API
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts()
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load products:", err);
        setError("Failed to load products. Please try again.");
        setLoading(false);
      });
  }, []);

  const sizes = useMemo(() => {
    const seen = new Set<string>();
    for (const p of products) {
      if (p.size) seen.add(p.size);
    }
    return Array.from(seen).sort();
  }, [products]);

  const effectsOptions = useMemo(
    () => Array.from(new Set(products.map((p) => p.finish))).sort(),
    [products]
  );

  const PRICE_RANGES = useMemo(() => [
    "under ₦25,000",
    "₦25,000 - ₦35,000",
    "₦35,000 - ₦50,000",
    "above ₦50,000"
  ], []);

  // Filter States
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedEffects, setSelectedEffects] = useState<string[]>([]);
  const [selectedPrices, setSelectedPrices] = useState<string[]>([]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(12);

  // Reset pagination when filters change
  useEffect(() => {
    setVisibleCount(12);
  }, [selectedSizes, selectedEffects, selectedPrices]);

  const hasActiveFilters = selectedSizes.length > 0 || selectedEffects.length > 0 || selectedPrices.length > 0;
  
  const clearAllFilters = () => {
    setSelectedSizes([]);
    setSelectedEffects([]);
    setSelectedPrices([]);
  };

  // Filtering Logic
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (selectedSizes.length > 0 && (!p.size || !selectedSizes.includes(p.size))) return false;
      if (selectedEffects.length > 0 && !selectedEffects.includes(p.finish)) return false;
      if (selectedPrices.length > 0) {
        const matchesPrice = selectedPrices.some(range => {
          if (range === "under ₦25,000") return p.pricePerSqm < 25000;
          if (range === "₦25,000 - ₦35,000") return p.pricePerSqm >= 25000 && p.pricePerSqm <= 35000;
          if (range === "₦35,000 - ₦50,000") return p.pricePerSqm > 35000 && p.pricePerSqm <= 50000;
          if (range === "above ₦50,000") return p.pricePerSqm > 50000;
          return false;
        });
        if (!matchesPrice) return false;
      }
      return true;
    });
  }, [products, selectedSizes, selectedEffects, selectedPrices]);

  return (
    <div className="min-h-screen bg-background flex flex-col pt-20">
      <Navbar cartCount={cart.length} onCartOpen={() => setCartOpen(true)} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12 border-b border-border/50 pb-8">
          <p className="text-[#a68038] text-xs font-black tracking-[0.3em] uppercase mb-4">
            The Collection
          </p>
          <h1
            className="text-4xl md:text-5xl font-black text-foreground mb-4"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            Shop all tiles
          </h1>
          <p className="text-muted-foreground text-sm max-w-2xl leading-relaxed">
            Browse our full range of {products.length} premium Spanish porcelain tiles.
            Use the filters to narrow by size and effect — much of it is reduced while stock lasts.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
          {/* Mobile Filter Toggle */}
          <div className="md:hidden flex items-center justify-between pb-4 border-b border-border/50">
            <span className="text-sm text-muted-foreground font-semibold">
              {filteredProducts.length} TILES
            </span>
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="px-4 py-2 bg-foreground text-background text-xs font-bold tracking-widest uppercase rounded flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
              Filters
            </button>
          </div>

          {/* Sidebar (Desktop) & Drawer (Mobile) */}
          <aside className={`fixed inset-0 z-[100] bg-background md:bg-transparent md:static md:w-64 shrink-0 transition-transform duration-300 ${mobileFiltersOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
            <div className="flex flex-col h-full md:block">
              {/* Mobile Filter Header */}
              <div className="md:hidden flex items-center justify-between px-6 py-5 border-b border-border/50">
                <h2 className="font-serif text-2xl font-black">Filters</h2>
                <button onClick={() => setMobileFiltersOpen(false)} className="text-muted-foreground">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Filter Content */}
              <div className="flex-1 overflow-y-auto p-6 md:p-0">
                <FilterSection
                  title="Tile Size"
                  options={sizes}
                  state={selectedSizes}
                  stateUpdater={setSelectedSizes}
                  onClearAll={clearAllFilters}
                  showClearAll={hasActiveFilters}
                />
                <FilterSection
                  title="Price"
                  options={PRICE_RANGES}
                  state={selectedPrices}
                  stateUpdater={setSelectedPrices}
                  onClearAll={clearAllFilters}
                  showClearAll={hasActiveFilters}
                />
                <FilterSection
                  title="Effects"
                  options={effectsOptions}
                  state={selectedEffects}
                  stateUpdater={setSelectedEffects}
                  onClearAll={clearAllFilters}
                  showClearAll={hasActiveFilters}
                />
                
                {/* Fallback Clear All at the bottom of the sidebar like screenshot */}
                {hasActiveFilters && (
                  <button
                    onClick={clearAllFilters}
                    className="mt-8 text-[10px] md:text-xs font-semibold tracking-widest uppercase text-foreground/80 hover:text-foreground text-left block"
                  >
                    CLEAR ALL FILTERS
                  </button>
                )}
              </div>
              
              {/* Mobile Filter Footer (Apply Button) */}
              <div className="md:hidden p-6 border-t border-border/50">
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="w-full py-4 bg-foreground text-background font-bold tracking-widest text-sm uppercase rounded"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </aside>

          {/* Grid */}
          <div className="flex-1">
            <div className="hidden md:flex items-center justify-between mb-6 text-sm text-muted-foreground">
              <span>{filteredProducts.length} TILES</span>
            </div>

            {loading ? (
              /* Loading skeleton */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="aspect-[4/5] bg-muted rounded mb-4" />
                    <div className="h-4 bg-muted rounded w-3/4 mb-2" />
                    <div className="h-3 bg-muted rounded w-1/2 mb-2" />
                    <div className="h-4 bg-muted rounded w-1/3" />
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="py-20 text-center border border-border/50 rounded-3xl bg-card">
                <p className="text-foreground/50 mb-4">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="text-primary hover:underline text-sm font-semibold"
                >
                  Retry
                </button>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="py-20 text-center border border-border/50 rounded-3xl bg-card">
                <p className="text-foreground/50">
                  No products match your selected filters.
                </p>
                <button
                  onClick={() => {
                    setSelectedSizes([]);
                    setSelectedEffects([]);
                  }}
                  className="mt-4 text-primary hover:underline text-sm font-semibold"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                  <AnimatePresence>
                    {filteredProducts.slice(0, visibleCount).map((p) => (
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
                {visibleCount < filteredProducts.length && (
                  <div className="mt-12 flex justify-center">
                    <button
                      onClick={() => setVisibleCount((v) => v + 12)}
                      className="border border-black/20 text-black text-[10px] font-semibold tracking-widest uppercase px-8 py-3 hover:bg-black/5 transition-colors"
                    >
                      Load More
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>

      {/* ═══════════════════════════════════════════════════════════════
     WHATSAPP CTA
   ═══════════════════════════════════════════════════════════════ */}
      <section className="relative bg-[#25d366]/[0.12] py-20 border-t border-border overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 70% at 50% 50%, rgba(37,211,102,0.18) 0%, transparent 70%)",
          }}
        />
        <div className="relative max-w-xl mx-auto text-center px-4">
          <div className="relative inline-flex items-center justify-center mb-7">
            <motion.div
              className="absolute w-20 h-20 rounded-full"
              style={{ background: "rgba(37,211,102,0.12)" }}
              animate={{ scale: [1, 1.45, 1.7], opacity: [0.5, 0.15, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
            />
            <motion.div
              className="absolute w-20 h-20 rounded-full"
              style={{ background: "rgba(37,211,102,0.08)" }}
              animate={{ scale: [1, 1.3, 1.55], opacity: [0.4, 0.12, 0] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeOut",
                delay: 0.6,
              }}
            />
            <div className="relative w-16 h-16 bg-[#25d366]/10 border border-[#25d366]/25 rounded-full flex items-center justify-center">
              <WhatsAppIcon className="w-8 h-8 text-[#25d366]" />
            </div>
          </div>
          <motion.h2
            className="text-foreground font-black mb-3"
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            Not sure which tile?
          </motion.h2>
          <p className="text-foreground/80 mb-8 leading-relaxed">
            Tell us about your space and we&apos;ll recommend the perfect tiles
            for your budget — for free.
          </p>
          <motion.a
            href={waGeneralLink(
              "Hello! I need help choosing tiles for my project.",
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-[#25d366] text-foreground font-black px-9 py-4 rounded-full text-sm text-white/85"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 40px rgba(37,211,102,0.3)",
            }}
            whileTap={{ scale: 0.97 }}
          >
            <WhatsAppIcon className="w-5 h-5 text-white" /> Chat with Our Team
          </motion.a>
        </div>
      </section>

      <Footer theme="dark" />
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
