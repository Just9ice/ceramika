"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/navbar";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import CartDrawer from "@/components/CartDrawer";
import { useCart } from "@/components/CartContext";
import { waGeneralLink } from "@/lib/data";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { FaWhatsapp as WhatsAppIcon } from "react-icons/fa";
export default function Home() {
  const { cart, removeFromCart, cartOpen, setCartOpen } = useCart();

  const clearanceImages = [
    "https://res.cloudinary.com/dpsufnobu/image/upload/products/PRSCE61MERYGLDBR2A_main.jpg",
    "https://res.cloudinary.com/dpsufnobu/image/upload/products/BTPC72MDRZBLCK1A_main.jpg",
    "https://res.cloudinary.com/dpsufnobu/image/upload/products/PRSCK44BONOSAND1A_env.jpg",
    "https://res.cloudinary.com/dpsufnobu/image/upload/products_unmapped/terracotta.jpg",
    "https://res.cloudinary.com/dpsufnobu/image/upload/products_unmapped/living-room.jpg",
  ];

  const newInImages = [
    "https://res.cloudinary.com/dpsufnobu/image/upload/products_unmapped/living-room.jpg",
    "https://res.cloudinary.com/dpsufnobu/image/upload/products/PRSCE61MERYGLDBR2A_main.jpg",
    "https://res.cloudinary.com/dpsufnobu/image/upload/products/BTPC72MDRZBLCK1A_main.jpg",
    "https://res.cloudinary.com/dpsufnobu/image/upload/products/PRSCK44BONOSAND1A_env.jpg",
    "https://res.cloudinary.com/dpsufnobu/image/upload/products_unmapped/terracotta.jpg",
  ];

  return (
    <div className="bg-white min-h-screen font-sans">
      <Navbar cartCount={cart.length} onCartOpen={() => setCartOpen(true)} />

      {/* Hero Section */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center justify-start overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://res.cloudinary.com/dpsufnobu/image/upload/products_unmapped/living-room.jpg"
            alt="Living room with beautiful tiles"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 max-w-[1400px] w-full mx-auto px-4 sm:px-8 mt-10">
          <div className="max-w-[600px]">
            <h1 className="text-white text-[2.5rem] md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-4">
              Quality Spanish tiles
              <br />
              at the best rate
            </h1>
            <p className="text-white leading-relaxed text-base md:text-lg mb-8 max-w-[450px]">
              Spanish-quality tiles selected for beautiful spaces, practical
              projects and better value.
            </p>
            <Link
              href="/shop"
              className="inline-block bg-[#222] hover:bg-black text-white px-8 py-3 text-sm font-medium transition-colors"
            >
              Shop now
            </Link>
          </div>
        </div>
      </section>

      {/* Clearance Section */}
      <section className="py-16">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
          <h2 className="text-xl md:text-2xl font-medium mb-6">Clearance</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {clearanceImages.map((src, i) => (
              <div
                key={`clearance-${i}`}
                className="aspect-square bg-gray-100 overflow-hidden"
              >
                <img
                  src={src}
                  alt="Clearance Tile"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* New In Section */}
      <section className="py-8 pb-20">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
          <h2 className="text-xl md:text-2xl font-medium mb-6">New in</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {newInImages.map((src, i) => (
              <div
                key={`newin-${i}`}
                className="aspect-square bg-gray-100 overflow-hidden"
              >
                <img
                  src={src}
                  alt="New In Tile"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="bg-[#562f3a] py-20 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Left */}
            <div className="flex flex-col">
              <h2 className="text-white text-3xl md:text-4xl lg:text-[2.75rem] font-medium leading-tight mb-4 tracking-tight">
                Need help selecting a tile?
              </h2>
              <p className="text-white/90 text-sm md:text-base leading-relaxed mb-12 max-w-md">
                Tell us about your space and we'll recommend the perfect tiles
                for your budget.
              </p>

              <div className="mt-auto">
                <p className="text-white/60 text-[10px] tracking-widest uppercase mb-2">
                  WORKING HOURS
                </p>
                <p className="text-white text-xl md:text-2xl mb-8">
                  Mon-Fri 9:00am - 6:00pm
                </p>
                <a
                  href={waGeneralLink("Hello! I need help selecting a tile.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block border border-white/60 text-white px-8 py-3 text-xs tracking-widest uppercase hover:bg-white hover:text-[#562f3a] transition-colors"
                >
                  CALL US ON WHATSAPP
                </a>
              </div>
            </div>

            {/* Right (Form) */}
            <div className="flex flex-col justify-center">
              <form
                className="flex flex-col gap-10"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <input
                    type="text"
                    placeholder="FULL NAME"
                    className="bg-transparent border-b border-white/20 text-white placeholder:text-white/50 pb-3 outline-none focus:border-white text-[10px] uppercase tracking-widest transition-colors rounded-none"
                  />
                  <input
                    type="tel"
                    placeholder="PHONE NUMBER"
                    className="bg-transparent border-b border-white/20 text-white placeholder:text-white/50 pb-3 outline-none focus:border-white text-[10px] uppercase tracking-widest transition-colors rounded-none"
                  />
                </div>
                <input
                  type="email"
                  placeholder="EMAIL ADDRESS"
                  className="bg-transparent border-b border-white/20 text-white placeholder:text-white/50 pb-3 outline-none focus:border-white text-[10px] uppercase tracking-widest transition-colors w-full rounded-none"
                />
                <input
                  type="text"
                  placeholder="MESSAGE"
                  className="bg-transparent border-b border-white/20 text-white placeholder:text-white/50 pb-3 outline-none focus:border-white text-[10px] uppercase tracking-widest transition-colors w-full rounded-none"
                />
                <button
                  type="button"
                  className="bg-[#f3f0e8] text-black px-12 py-4 text-xs font-semibold tracking-widest uppercase hover:bg-white transition-colors self-start mt-4"
                >
                  Shop now
                </button>
              </form>
            </div>
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
    </div>
  );
}
