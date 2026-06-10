'use client'

import Footer from "@/components/Footer";
import Navbar from "@/components/navbar";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import CartDrawer from "@/components/CartDrawer";
import ProductCard from "@/components/ProductCard";
import CategoryCard from "@/components/CategoryCard";
import { useState, useRef } from "react";
import { FaWhatsapp as WhatsAppIcon } from 'react-icons/fa';
import { PRODUCTS, TESTIMONIALS, waGeneralLink } from "@/lib/data";
import { animateFlyToCart } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { CardContainer } from "@/components/ui/3d-card";
import Link from "next/link";
import { Calculator, Bath, ChefHat, Grid2x2, Gem, Square, Layers, Sparkles, Brush, type LucideIcon } from "lucide-react";
import { useCart } from "@/components/CartContext";

const WA_NUMBER = '2348100000000';


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

const STATS = [
  { value: "12+",     label: "Years in Nigeria"  },
  { value: "50k+",    label: "Sqm Delivered"     },
  { value: "₦",       label: "Always in Naira"   },
  { value: "<10 min", label: "WhatsApp Response" },
];

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

export default function Home() {
  const { cart, addToCart, cartOpen, setCartOpen, removeFromCart } = useCart();
  const productsRef = useRef<HTMLDivElement | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);
  const [cursor, setCursor] = useState({ x: 0.35, y: 0.4 });

  // Calculator
  const [calcLength, setCalcLength] = useState('');
  const [calcWidth, setCalcWidth] = useState('');
  const [calcPrice, setCalcPrice] = useState('');
  const [calcResult, setCalcResult] = useState<{
    sqm: number; withWaste: number; cartons: number; total: number;
  } | null>(null);

  function handleAddToCartLocal(product: any, sourceEl?: HTMLElement | null) {
      addToCart(product, sourceEl);
      if (sourceEl) {
         animateFlyToCart(sourceEl);
      }
  }

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
    <>
      <Navbar cartCount={cart.length} onCartOpen={() => setCartOpen(true)} />

      {/* ═══════════════════════════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center overflow-hidden bg-background"
        onMouseMove={(e) => {
          const rect = heroRef.current?.getBoundingClientRect();
          if (!rect) return;
          setCursor({
            x: (e.clientX - rect.left) / rect.width,
            y: (e.clientY - rect.top)  / rect.height,
          });
        }}
      >
        {/* Background grid */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(#c8a96e 1px, transparent 1px), linear-gradient(90deg, #c8a96e 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        {/* Cursor-tracking radial glow blob */}
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full pointer-events-none"
          animate={{
            left: `calc(${cursor.x * 100}% - 300px)`,
            top:  `calc(${cursor.y * 100}% - 300px)`,
          }}
          transition={{ type: 'spring', stiffness: 60, damping: 22, mass: 0.8 }}
          style={{
            background: 'radial-gradient(circle, rgba(200,169,110,0.16) 0%, rgba(200,169,110,0.06) 40%, transparent 70%)',
          }}
        />
        {/* Right panel dark fade */}
        <div className="absolute top-0 right-0 w-1/2 h-full pointer-events-none hidden lg:block"
          style={{ background: "linear-gradient(to right, transparent, rgba(5,10,7,0.5))" }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-16 grid lg:grid-cols-2 gap-12 items-center w-full">

          {/* Copy */}
          <div>
            <motion.p
              className="text-[#a68038] dark:text-[#c8a96e] text-xs tracking-[0.32em] uppercase mb-5"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
            >
              Nigeria&apos;s Premier Tile Store
            </motion.p>
            <motion.h1
              className="font-black leading-[0.88] mb-6"
              style={{ fontFamily: "'Georgia', serif", fontSize: 'clamp(3.4rem, 8vw, 6.5rem)' }}
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.08, ease }}
            >
              <span className="text-foreground">Floors</span><br />
              <span className="text-transparent [-webkit-text-stroke:2px_#a68038] dark:[-webkit-text-stroke:2px_rgba(200,169,110,0.55)]">Walls.</span><br />
              <span className="text-foreground">That Last.</span>
            </motion.h1>
            <motion.p
              className="text-foreground/ text-lg leading-relaxed mb-8 max-w-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18, ease }}
            >
              Premium porcelain, ceramic, and marble tiles. Order online, confirm via WhatsApp. Delivered across Nigeria.
            </motion.p>

            {/* Trust pills */}
            <motion.div
              className="flex flex-wrap gap-2.5 mb-9"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.25, ease }}
            >
              {["✓ Lagos Showroom", "✓ Pay in Naira", "✓ WhatsApp Orders", "✓ Nationwide Delivery"].map((b) => (
                <span key={b} className="text-xs text-foreground/ border border-border rounded-full px-3 py-1.5 tracking-wide">
                  {b}
                </span>
              ))}
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row gap-3"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.32, ease }}
            >
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/shop"
                  className="block px-8 py-4 bg-[#25d366] hover:bg-[#1fb859] text-white font-black text-sm tracking-widest uppercase rounded-full text-center transition-colors shadow-lg hover:shadow-xl"
                >
                  Shop Tiles
                </Link>
              </motion.div>
              <motion.a
                href={waGeneralLink('Hello! I need help choosing tiles for my project.')}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-8 py-4 border border-[#25d366]/35 text-[#25d366] font-semibold text-sm rounded-full transition-colors hover:bg-[#25d366]/08"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <WhatsAppIcon className="w-4 h-4" />
                Get Free Advice
              </motion.a>
            </motion.div>
          </div>

          {/* Hero visual */}
          <CardContainer
            containerClassName="hidden lg:flex py-0 justify-end items-center"
            className="relative w-full"
          >
            <div className="relative flex justify-end max-w-[420px] ml-auto">
              {/* Main large tile card */}
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-[300px] h-[400px] rounded-2xl overflow-hidden shadow-2xl border border-border"
              >
                <img src="/hero-main.jpg" className="absolute inset-0 w-full h-full object-cover" alt="Luxury tiles" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(5,10,7,0.7) 0%, transparent 50%)' }} />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <span className="text-foreground/ text-[10px] uppercase tracking-widest">Featured</span>
                  <p className="text-foreground font-bold text-sm mt-0.5">Lagos Ivory Marble</p>
                  <p className="text-[#a68038] dark:text-[#c8a96e] text-xs">₦18,500/sqm</p>
                </div>
                {/* Top glow */}
                <div className="absolute top-0 left-8 right-8 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(200,169,110,0.4), transparent)' }} />
              </motion.div>

              {/* Floating badge — top right */}
              <motion.div
                animate={{ y: [0, -16, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -top-8 -right-8 w-[160px] h-[120px] rounded-2xl overflow-hidden shadow-xl border border-border"
              >
                <img src="/hero2.jpg" className="absolute inset-0 w-full h-full object-cover" alt="Tile" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(5,10,7,0.6), transparent)' }} />
                <span className="absolute bottom-2 right-2 text-[10px] text-foreground/ bg-black/30 px-2 py-0.5 rounded">Bathroom</span>
              </motion.div>

              {/* Floating badge — bottom left */}
              <motion.div
                animate={{ y: [0, 14, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-10 -left-10 w-[180px] h-[130px] rounded-2xl overflow-hidden shadow-xl border border-border"
              >
                <img src="/hero-3.jpg" className="absolute inset-0 w-full h-full object-cover" alt="Tile" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(5,10,7,0.6), transparent)' }} />
                <span className="absolute bottom-2 left-2 text-[10px] text-foreground/ bg-black/30 px-2 py-0.5 rounded">Living Room</span>
              </motion.div>
            </div>
          </CardContainer>
        </div>

        {/* Animated scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-foreground/ text-[10px] tracking-[0.3em] uppercase">Scroll</span>
          <motion.div
            className="w-px h-10 origin-top"
            style={{ background: 'linear-gradient(to bottom, rgba(200,169,110,0.4), transparent)' }}
            animate={{ scaleY: [0, 1, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          STATS BAR
      ═══════════════════════════════════════════════════════════════ */}
      <section className="relative bg-muted/30 border-y border-border py-0 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/5">
            {STATS.map(({ value, label }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08, ease }}
                className="flex flex-col items-center gap-2 py-10 px-6 text-center group"
              >
                <span
                  className="font-black text-[#a68038] dark:text-[#c8a96e] group-hover:scale-105 transition-transform duration-300"
                  style={{ fontFamily: "'Georgia', serif", fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)' }}
                >
                  {value}
                </span>
                <span className="text-foreground/ text-[10px] tracking-[0.2em] uppercase">{label}</span>
              </motion.div>
            ))}
          </div>
        </div>
        {/* Gold hairline at top */}
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(200,169,110,0.2), transparent)' }} />
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          CATEGORIES
      ═══════════════════════════════════════════════════════════════ */}
      <section className="bg-background py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            className="mb-10"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
          >
            <p className="text-[#a68038] dark:text-[#c8a96e] text-xs tracking-[0.3em] uppercase mb-3">Shop by Category</p>
            <div className="flex items-end justify-between">
              <h2
                className="text-foreground font-black"
                style={{ fontFamily: "'Georgia', serif", fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}
              >
                Explore Our<br />
                <span className="text-transparent [-webkit-text-stroke:1.5px_#a68038] dark:[-webkit-text-stroke:1.5px_rgba(200,169,110,0.45)]">
                  Collections.
                </span>
              </h2>
              <Link href="/shop" className="text-foreground/ hover:text-[#a68038] dark:text-[#c8a96e] text-sm transition-colors hidden sm:block">
                View all →
              </Link>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {CATEGORIES.map((cat, i) => (
              <motion.div
                key={cat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.06, ease }}
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
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          FEATURED PRODUCTS
      ═══════════════════════════════════════════════════════════════ */}
      <section id="products" ref={productsRef} className="bg-muted/30 py-20 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            className="flex items-end justify-between mb-12"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
          >
            <div>
              <p className="text-[#a68038] dark:text-[#c8a96e] text-xs tracking-[0.3em] uppercase mb-3">Our Collection</p>
              <h2
                className="text-foreground font-black"
                style={{ fontFamily: "'Georgia', serif", fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}
              >
                Featured<br />
                <span className="text-transparent [-webkit-text-stroke:1.5px_#a68038] dark:[-webkit-text-stroke:1.5px_rgba(200,169,110,0.45)]">
                  Tiles.
                </span>
              </h2>
            </div>
            <Link
              href="/shop"
              className="text-foreground/ hover:text-[#a68038] dark:text-[#c8a96e] text-sm transition-colors hidden sm:flex items-center gap-1"
            >
              Browse all tiles <span className="text-[#a68038] dark:text-[#c8a96e]">→</span>
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PRODUCTS.slice(0, 6).map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07, ease }}
              >
                <ProductCard product={p} onAddToCart={handleAddToCartLocal} />
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-10 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4, ease }}
          >
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 border border-border hover:border-[#a68038] dark:border-[#c8a96e]/40 text-foreground/ hover:text-[#a68038] dark:text-[#c8a96e] px-8 py-3 rounded-full text-sm transition-all duration-200 sm:hidden"
            >
              View all tiles →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SQM CALCULATOR — redesigned as dark glassmorphic card
      ═══════════════════════════════════════════════════════════════ */}
      <section className="relative bg-background py-24 border-y border-border overflow-hidden">
        {/* Decorative glow */}
        <div
          className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none"
          style={{ background: 'radial-gradient(circle at 80% 20%, rgba(200,169,110,0.06) 0%, transparent 70%)' }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-16 items-center">

            {/* Left copy */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease }}
            >
              <div
                className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 rounded-full border text-xs"
                style={{ borderColor: 'rgba(200,169,110,0.25)', background: 'rgba(200,169,110,0.06)', color: '#c8a96e' }}
              >
                <Calculator className="w-3.5 h-3.5" />
                Free Tool
              </div>
              <h2
                className="text-foreground font-black leading-tight mb-4"
                style={{ fontFamily: "'Georgia', serif", fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}
              >
                SqM &amp; Cost<br />
                <span className="text-transparent [-webkit-text-stroke:1.5px_#a68038] dark:[-webkit-text-stroke:1.5px_rgba(200,169,110,0.45)]">Calculator.</span>
              </h2>
              <p className="text-foreground/ leading-relaxed mb-7 text-sm">
                Enter your room dimensions. We&apos;ll calculate the exact square metres needed, add a 10% wastage buffer, and give you the total cost and carton count.
              </p>
              <div className="flex flex-col gap-3">
                {[
                  "Includes 10% wastage buffer",
                  "Carton count included",
                  "Works with any tile price",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#c8a96e] shrink-0" />
                    <span className="text-foreground/ text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Calculator card */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease }}
              className="relative rounded-3xl overflow-hidden bg-card border border-border shadow-xl hover:shadow-2xl transition-all"
            >
              {/* Top hairline */}
              <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#c8a96e]/40 to-transparent" />

              <div className="p-7 sm:p-9">
                <p className="text-foreground/ text-xs uppercase tracking-widest mb-6">Room dimensions</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
                  {[
                    { label: "Length (m)", value: calcLength, set: setCalcLength, placeholder: "5" },
                    { label: "Width (m)",   value: calcWidth,  set: setCalcWidth,  placeholder: "4" },
                    { label: "Price (₦/sqm)",value: calcPrice, set: setCalcPrice,  placeholder: "12000" },
                  ].map((field) => (
                    <div key={field.label} className="flex flex-col gap-1.5">
                      <label className="text-muted-foreground text-[10px] uppercase tracking-widest">{field.label}</label>
                      <input
                        type="number"
                        className="w-full rounded-xl border border-border bg-input px-4 py-3 text-foreground outline-none text-sm transition-all focus:border-[#a68038] dark:border-[#c8a96e] focus:ring-1 focus:ring-[#c8a96e]/20"
                        placeholder={field.placeholder}
                        value={field.value}
                        onChange={(e) => field.set(e.target.value)}
                      />
                    </div>
                  ))}
                </div>

                <motion.button
                  onClick={runCalculator}
                  className="w-full py-3.5 rounded-xl bg-[#c8a96e] text-[#0b1410] font-black text-sm uppercase tracking-widest mb-6"
                  whileHover={{ scale: 1.02, backgroundColor: '#d4b87e' }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="flex items-center justify-center gap-2">
                    <Calculator className="w-4 h-4" />
                    Calculate
                  </span>
                </motion.button>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Base Area",     value: `${displayResult.sqm.toFixed(2)} sqm`, hi: false },
                    { label: "With 10% Waste",value: `${displayResult.withWaste.toFixed(2)} sqm`, hi: true },
                    { label: "Cartons Needed",value: `${displayResult.cartons} cartons`, hi: false },
                    { label: "Est. Total",    value: `₦${displayResult.total.toLocaleString("en-NG", { maximumFractionDigits: 0 })}`, hi: true },
                  ].map((r) => (
                    <AnimatePresence key={r.label} mode="wait">
                      <motion.div
                        key={r.value}
                        initial={{ opacity: 0.6, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className={`rounded-2xl p-4 border ${r.hi ? 'bg-[#c8a96e]/10 border-[#a68038] dark:border-[#c8a96e]/30' : 'bg-muted/50 border-border'}`}
                      >
                        <p className="text-muted-foreground text-[10px] uppercase tracking-widest mb-1">{r.label}</p>
                        <p
                          className={`font-black text-xl ${r.hi ? 'text-[#a68038] dark:text-[#c8a96e] dark:text-[#d4b87e]' : 'text-foreground'}`}
                          style={{ fontFamily: "'Georgia', serif" }}
                        >
                          {r.value}
                        </p>
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
          TESTIMONIALS
      ═══════════════════════════════════════════════════════════════ */}
      <section className="bg-muted/30 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
          >
            <p className="text-[#a68038] dark:text-[#c8a96e] text-xs tracking-[0.3em] uppercase mb-3">Customer Reviews</p>
            <h2 className="text-foreground font-black" style={{ fontFamily: "'Georgia', serif", fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}>
              Nigerians Love CeramiKa
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-5">
            {TESTIMONIALS.slice(0, 3).map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.1, ease }}
                whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(0,0,0,0.3), 0 0 0 1px rgba(200,169,110,0.12)' }}
                className="group relative bg-card border border-border rounded-2xl p-6 overflow-hidden"
              >
                {/* Decorative giant quote */}
                <div
                  className="absolute -top-2 -left-1 text-[5.5rem] leading-none font-black pointer-events-none select-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ color: 'rgba(200,169,110,0.07)', fontFamily: "'Georgia', serif" }}
                >
                  &ldquo;
                </div>
                {/* Top hairline */}
                <div
                  className="absolute top-0 left-6 right-6 h-px opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(200,169,110,0.4), transparent)' }}
                />
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <svg key={j} className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="#c8a96e">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-foreground/ text-sm leading-relaxed mb-5 relative z-10">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-black shrink-0"
                    style={{ background: 'rgba(200,169,110,0.1)', color: '#c8a96e', border: '1px solid rgba(200,169,110,0.2)' }}
                  >
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-foreground font-bold text-sm">{t.name}</p>
                    <p className="text-foreground/ text-xs">{t.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          WHATSAPP CTA
      ═══════════════════════════════════════════════════════════════ */}
      <section className="relative bg-[#25d366]/[0.12] py-20 border-t border-border overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 60% 70% at 50% 50%, rgba(37,211,102,0.18) 0%, transparent 70%)' }}
        />
        <div className="relative max-w-xl mx-auto text-center px-4">
          <div className="relative inline-flex items-center justify-center mb-7">
            <motion.div
              className="absolute w-20 h-20 rounded-full"
              style={{ background: 'rgba(37,211,102,0.12)' }}
              animate={{ scale: [1, 1.45, 1.7], opacity: [0.5, 0.15, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut' }}
            />
            <motion.div
              className="absolute w-20 h-20 rounded-full"
              style={{ background: 'rgba(37,211,102,0.08)' }}
              animate={{ scale: [1, 1.3, 1.55], opacity: [0.4, 0.12, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut', delay: 0.6 }}
            />
            <div className="relative w-16 h-16 bg-[#25d366]/10 border border-[#25d366]/25 rounded-full flex items-center justify-center">
              <WhatsAppIcon className="w-8 h-8 text-[#25d366]" />
            </div>
          </div>
          <motion.h2
            className="text-foreground font-black mb-3"
            style={{ fontFamily: "'Georgia', serif", fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
          >
            Not sure which tile?
          </motion.h2>
          <p className="text-foreground/ mb-8 leading-relaxed">
            Tell us about your space and we&apos;ll recommend the perfect tiles for your budget — for free.
          </p>
          <motion.a
            href={waGeneralLink("Hello! I need help choosing tiles for my project.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-[#25d366] text-foreground font-black px-9 py-4 rounded-full text-sm"
            whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(37,211,102,0.3)' }}
            whileTap={{ scale: 0.97 }}
          >
            <WhatsAppIcon className="w-5 h-5" />
            Chat with Our Team
          </motion.a>
          <p className="text-foreground/ text-xs mt-4">Average response time: under 10 minutes</p>
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
    </>
  );
}
