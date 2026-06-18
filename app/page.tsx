"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/navbar";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import CartDrawer from "@/components/CartDrawer";
import { useState } from "react";
import { PRODUCTS, waGeneralLink, Product } from "@/lib/data";
import { useCart } from "@/components/CartContext";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Calculator } from "lucide-react";
import { FaWhatsapp as WhatsAppIcon } from "react-icons/fa";

export default function Home() {
  const { cart, addToCart, cartOpen, setCartOpen, removeFromCart } = useCart();

  const [calcLength, setCalcLength] = useState("");
  const [calcWidth, setCalcWidth] = useState("");
  const [calcPrice, setCalcPrice] = useState("");
  const [calcResult, setCalcResult] = useState<{
    sqm: number;
    withWaste: number;
    cartons: number;
    total: number;
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

  const displayResult = calcResult ?? {
    sqm: 0,
    withWaste: 0,
    cartons: 0,
    total: 0,
  };

  function handleAddToCartLocal(product: Product) {
    addToCart(product);
  }

  return (
    <>
      <Navbar cartCount={cart.length} onCartOpen={() => setCartOpen(true)} />

      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex items-end sm:items-center pb-20 sm:pb-0 overflow-hidden bg-[#e0dacc]">
        <div className="absolute inset-0">
          {/* We use a relevant image from public, or just fallback to hero-main */}
          <img
            src="/living-room.jpg"
            className="w-full h-full object-cover bg-gradient-to-b from-white/90 via-black/30 to-black/60"
            alt="Hero Background"
          />
          {/* Subtle overlay to ensure text is readable based on the reference */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-black/60" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 w-full mt-32 sm:mt-0">
          <p className="text-white/90 text-xs tracking-[0.25em] uppercase mb-6 drop-shadow-sm">
            Selected stock - significantly reduced
          </p>
          <h1
            className="text-white leading-[1.05] mb-10 drop-shadow-sm font-normal"
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontSize: "clamp(3.5rem, 7vw, 6rem)",
            }}
          >
            Up to 40% off
            <br />
            Spanish porcelain
          </h1>

          <div className="flex flex-row gap-4">
            <Link
              href="/sale"
              className="px-8 py-3.5 bg-white text-[#111] text-xs font-semibold tracking-[0.15em] uppercase transition-colors hover:bg-gray-100 shadow-sm"
            >
              Shop the edit
            </Link>
            <Link
              href="/shop"
              className="px-8 py-3.5 border border-white/60 text-white text-xs font-semibold tracking-[0.15em] uppercase transition-colors hover:bg-white/10"
            >
              View all tiles
            </Link>
          </div>
        </div>
      </section>

      {/* Split Text Section */}
      <section className="bg-[#fbfa8] py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 grid lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-24">
          <div>
            <p className="text-[#c19b6e] text-xs font-semibold tracking-[0.2em] uppercase mt-2">
              European quality. Lagos prices.
            </p>
          </div>
          <div>
            <h2
              className="text-[#1a1a1a] font-normal leading-[1.25] mb-10 max-w-2xl"
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontSize: "clamp(2.2rem, 4vw, 3.2rem)",
              }}
            >
              A curated edit of Spanish porcelain, chosen for taste rather than
              turnover.
            </h2>
            <div className="text-[#555] text-sm md:text-base leading-relaxed max-w-xl space-y-6">
              <p>
                Ceramika is the sister brand to Muse Studio, our premium design
                house. We bring the same considered eye to surfaces that happen
                to cost less. Each tile here is genuine European stock —
                selected, photographed in situ, and offered at a price that
                makes good design quietly accessible.
              </p>
              <p>
                No loud stickers. No tile-depot clutter. Just a small,
                well-edited collection, reduced while it lasts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Browse By Section */}
      <section className="bg-[#f2efe9] py-14 border-t border-border/40">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 flex flex-col md:flex-row md:items-center gap-6 md:gap-12">
          <h3 className="text-[#777] text-xs font-semibold tracking-[0.2em] uppercase shrink-0">
            Browse by
          </h3>
          <div className="flex flex-wrap gap-3">
            {[
              "On sale",
              "Matte finish",
              "Large format",
              "Outdoor",
              "Cream & beige",
              "Terracotta",
              "Under ₦15,000",
            ].map((label) => (
              <Link
                key={label}
                href="/shop"
                className="bg-[#fbfa8] px-6 py-3 text-xs text-[#333] border border-border/70 hover:border-[#c19b6e] transition-colors rounded-none shadow-sm"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Sale Edit Section */}
      <section className="bg-[#fbfa8] py-20 pb-32">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 mb-14">
          <p className="text-[#c19b6e] text-xs font-semibold tracking-[0.2em] uppercase mb-4 mt-8">
            Best Sellers
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-border/50 pb-6 gap-4">
            <h2
              className="text-[#1a1a1a] font-normal leading-[1.1]"
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
              }}
            >
              Selected stock, significantly reduced
            </h2>
            <Link
              href="/shop"
              className="text-xs font-semibold tracking-[0.2em] uppercase text-[#777] hover:text-[#c19b6e] transition-colors shrink-0"
            >
              View Best Sellers
            </Link>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 sm:px-12 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
          {/* Custom structured cards based on screenshot */}
          {[
            {
              id: "1",
              name: "Marfil Cream",
              image: "/mery_gold.jpg",
              discount: "35% off",
              size: "60×120 CM • MATTE",
              oldPrice: "18,500",
              newPrice: "11,900",
              badgeBg: "#a87153",
            },
            {
              id: "2",
              name: "Grafito Charcoal",
              image: "/Madrazo_Black.jpg",
              discount: "30% off",
              size: "60×60 CM • SATIN",
              oldPrice: "21,000",
              newPrice: "14,700",
              badgeBg: "#a87153",
            },
            {
              id: "3",
              name: "Arena Sand",
              image: "/Ambiente_Bonova_Sand.jpg",
              discount: "32% off",
              size: "60×60 CM • MATTE",
              oldPrice: "14,500",
              newPrice: "9,900",
              badgeBg: "#a87153",
            },
            {
              id: "4",
              name: "Terracota Clay",
              image: "/porcelanico_albarracin_cotto_mate.jpg",
              discount: "35% off",
              size: "90×90 CM • MATTE",
              oldPrice: "24,000",
              newPrice: "15,600",
              badgeBg: "#a87153",
            },
          ].map((item, idx) => (
            <div key={idx} className="group relative">
              <div className="relative aspect-square bg-[#ece8de] w-full mb-5 flex items-center justify-center p-6 sm:p-10 shadow-sm">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover shadow-md"
                />
                <div
                  className="absolute top-2 left-2 text-[10px] text-white px-2 py-1 uppercase tracking-widest font-semibold"
                  style={{ backgroundColor: item.badgeBg }}
                >
                  {item.discount}
                </div>
              </div>

              <div className="flex flex-col gap-1 mb-5">
                <div className="flex justify-between items-center">
                  <h3
                    className="text-[#1a1a1a] font-normal text-xl"
                    style={{ fontFamily: "var(--font-cormorant), serif" }}
                  >
                    {item.name}
                  </h3>
                  <div className="text-right flex items-center gap-2">
                    <span className="text-[#a0a0a0] text-xs line-through block">
                      ₦{item.oldPrice}
                    </span>
                    <span className="text-[#c19b6e] text-sm font-semibold block">
                      ₦{item.newPrice}
                    </span>
                  </div>
                </div>
                <p className="text-[#888] text-[10px] tracking-widest uppercase">
                  {item.size}
                </p>
              </div>

              {idx !== 3 ? (
                <button
                  onClick={() =>
                    handleAddToCartLocal(PRODUCTS[idx] || PRODUCTS[0])
                  }
                  className="w-full bg-transparent border border-border/70 py-3 text-xs font-semibold tracking-[0.2em] uppercase text-[#333] hover:border-[#c19b6e] hover:text-[#c19b6e] transition-colors"
                >
                  Add to cart
                </button>
              ) : (
                <a
                  href={waGeneralLink(
                    `Hello, I'd like to enquire about ${item.name}`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full block text-center bg-transparent border border-border/70 py-3 text-xs font-semibold tracking-[0.2em] uppercase text-[#333] hover:border-[#c19b6e] hover:text-[#c19b6e] transition-colors"
                >
                  Enquire
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
        SQM CALCULATOR
      ═══════════════════════════════════════════════════════════════ */}
      <section className="relative bg-background py-24 border-y border-border overflow-hidden">
        <div
          className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 80% 20%, rgba(200,169,110,0.06) 0%, transparent 70%)",
          }}
        ></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 rounded-full border text-xs"
                style={{
                  borderColor: "rgba(200,169,110,0.25)",
                  background: "rgba(200,169,110,0.06)",
                  color: "#c8a96e",
                }}
              >
                <Calculator className="w-3.5 h-3.5" /> Free Tool
              </div>
              <h2
                className="text-foreground font-black leading-tight mb-4"
                style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontSize: "clamp(2rem, 4vw, 3.2rem)",
                }}
              >
                SqM &amp; Cost
                <br />
                <span className="text-transparent [-webkit-text-stroke:1.5px_#a68038] opacity-90">
                  Calculator.
                </span>
              </h2>
              <p className="text-foreground/80 leading-relaxed mb-7 text-sm max-w-md">
                Enter your room dimensions. We&apos;ll calculate the exact
                square metres needed, add a 10% wastage buffer, and give you the
                total cost and carton count.
              </p>
              <div className="flex flex-col gap-3">
                {[
                  "Includes 10% wastage buffer",
                  "Carton count included",
                  "Works with any tile price",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#c8a96e] shrink-0" />
                    <span className="text-foreground/80 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="relative rounded-3xl overflow-hidden bg-card border border-border shadow-xl hover:shadow-2xl transition-all"
            >
              <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#c8a96e]/40 to-transparent" />
              <div className="p-7 sm:p-9">
                <p className="text-foreground/80 text-xs uppercase tracking-widest mb-6">
                  Room dimensions
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
                  {[
                    {
                      label: "Length (m)",
                      value: calcLength,
                      set: setCalcLength,
                      placeholder: "5",
                    },
                    {
                      label: "Width (m)",
                      value: calcWidth,
                      set: setCalcWidth,
                      placeholder: "4",
                    },
                    {
                      label: "Price (₦/sqm)",
                      value: calcPrice,
                      set: setCalcPrice,
                      placeholder: "12000",
                    },
                  ].map((field) => (
                    <div key={field.label} className="flex flex-col gap-1.5">
                      <label className="text-muted-foreground text-[10px] uppercase tracking-widest">
                        {field.label}
                      </label>
                      <input
                        type="number"
                        className="w-full rounded-xl border border-border bg-input px-4 py-3 text-foreground outline-none text-sm transition-all focus:border-[#a68038] focus:ring-1 focus:ring-[#c8a96e]/20"
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
                  whileHover={{ scale: 1.02, backgroundColor: "#d4b87e" }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="flex items-center justify-center gap-2">
                    <Calculator className="w-4 h-4" /> Calculate
                  </span>
                </motion.button>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    {
                      label: "Base Area",
                      value: `${displayResult.sqm.toFixed(2)} sqm`,
                      hi: false,
                    },
                    {
                      label: "With 10% Waste",
                      value: `${displayResult.withWaste.toFixed(2)} sqm`,
                      hi: true,
                    },
                    {
                      label: "Cartons Needed",
                      value: `${displayResult.cartons} cartons`,
                      hi: false,
                    },
                    {
                      label: "Est. Total",
                      value: `₦${displayResult.total.toLocaleString("en-NG", { maximumFractionDigits: 0 })}`,
                      hi: true,
                    },
                  ].map((r) => (
                    <AnimatePresence key={r.label} mode="wait">
                      <motion.div
                        key={r.value}
                        initial={{ opacity: 0.6, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className={`rounded-2xl p-4 border ${r.hi ? "bg-[#c8a96e]/10 border-[#a68038]" : "bg-muted/50 border-border"}`}
                      >
                        <p className="text-muted-foreground text-[10px] uppercase tracking-widest mb-1">
                          {r.label}
                        </p>
                        <p
                          className={`font-black text-xl ${r.hi ? "text-[#a68038]" : "text-foreground"}`}
                          style={{ fontFamily: "var(--font-cormorant), serif" }}
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
        WHATSAPP CTA
      ═══════════════════════════════════════════════════════════════ */}
      <section className="relative bg-[#25d366]/[0.12] py-20 border-t border-border overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 70% at 50% 50%, rgba(37,211,102,0.18) 0%, transparent 70%)",
          }}
        ></div>
        <div className="relative max-w-xl mx-auto text-center px-4">
          <div className="relative inline-flex items-center justify-center mb-7">
            <motion.div
              className="absolute w-20 h-20 rounded-full"
              style={{ background: "rgba(37,211,102,0.12)" }}
              animate={{ scale: [1, 1.45, 1.7], opacity: [0.5, 0.15, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
            ></motion.div>
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
            ></motion.div>
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
