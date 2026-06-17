import sys

new_content = """'use client'

import Footer from "@/components/Footer";
import Navbar from "@/components/navbar";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import CartDrawer from "@/components/CartDrawer";
import { useState } from "react";
import { PRODUCTS, waGeneralLink, Product } from "@/lib/data";
import { useCart } from "@/components/CartContext";
import Link from "next/link";
import { AnimatePresence } from "framer-motion";

export default function Home() {
  const { cart, addToCart, cartOpen, setCartOpen, removeFromCart } = useCart();

  function handleAddToCartLocal(product: Product) {
    addToCart(product);
  }

  return (
    <>
      <Navbar cartCount={cart.length} onCartOpen={() => setCartOpen(true)} />

      {/* Hero Section */}
      <section
        className="relative h-screen min-h-[600px] flex items-end sm:items-center pb-20 sm:pb-0 overflow-hidden bg-[#e0dacc]"
      >
        <div className="absolute inset-0">
          {/* We use a relevant image from public, or just fallback to hero-main */}
          <img src="/living-room.jpg" className="w-full h-full object-cover" alt="Hero Background" />
          {/* Subtle overlay to ensure text is readable based on the reference */}
          <div className="absolute inset-0 bg-black/20" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 w-full mt-32 sm:mt-0">
          <p className="text-white/90 text-xs tracking-[0.25em] uppercase mb-6 drop-shadow-sm">
            Selected stock - significantly reduced
          </p>
          <h1
            className="text-white leading-[1.05] mb-10 drop-shadow-sm font-normal"
            style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 'clamp(3.5rem, 7vw, 6rem)' }}
          >
            Up to 40% off<br />Spanish porcelain
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
      <section className="bg-[#fbfa\f8] py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 grid lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-24">
          <div>
            <p className="text-[#c19b6e] text-xs font-semibold tracking-[0.2em] uppercase mt-2">European quality. Lagos prices.</p>
          </div>
          <div>
            <h2
              className="text-[#1a1a1a] font-normal leading-[1.25] mb-10 max-w-2xl"
              style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 'clamp(2.2rem, 4vw, 3.2rem)' }}
            >
              A curated edit of Spanish porcelain, chosen for taste rather than turnover.
            </h2>
            <div className="text-[#555] text-sm md:text-base leading-relaxed max-w-xl space-y-6">
              <p>
                Ceramika is the sister brand to Muse Studio, our premium design house. We bring the same considered eye to surfaces that happen to cost less. Each tile here is genuine European stock — selected, photographed in situ, and offered at a price that makes good design quietly accessible.
              </p>
              <p>
                No loud stickers. No tile-depot clutter. Just a small, well-edited collection, reduced while it lasts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Browse By Section */}
      <section className="bg-[#f2efe9] py-14 border-t border-border/40">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 flex flex-col md:flex-row md:items-center gap-6 md:gap-12">
          <h3 className="text-[#777] text-xs font-semibold tracking-[0.2em] uppercase shrink-0">Browse by</h3>
          <div className="flex flex-wrap gap-3">
            {["On sale", "Matte finish", "Large format", "Outdoor", "Cream & beige", "Terracotta", "Under ₦15,000"].map(label => (
              <Link key={label} href="/shop" className="bg-[#fbfa\f8] px-6 py-3 text-xs text-[#333] border border-border/70 hover:border-[#c19b6e] transition-colors rounded-none shadow-sm">
                {label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Collections Section */}
      <section className="bg-[#fbfa\f8] py-24 pb-12">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 border-b border-border/50 pb-6 mb-12 flex items-end justify-between">
          <h2 className="text-[#1a1a1a] font-normal" style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 'clamp(2rem, 3.5vw, 2.8rem)' }}>
            Featured collections
          </h2>
          <Link href="/shop" className="text-xs font-semibold tracking-[0.2em] uppercase text-[#777] hover:text-[#c19b6e] transition-colors">
            View all
          </Link>
        </div>

        <div className="max-w-7xl mx-auto px-6 sm:px-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <Link href="/shop" className="group block cursor-pointer">
            <img src="/living-room.jpg" alt="Indoor Floors" className="w-full aspect-[4/3] object-cover mb-5 transition-transform duration-500 group-hover:scale-[1.02]" />
            <div className="flex justify-between items-center text-[#1a1a1a]">
              <span className="font-normal text-2xl" style={{ fontFamily: 'var(--font-cormorant), serif' }}>Indoor Floors</span>
              <span className="text-[10px] font-semibold uppercase tracking-widest text-[#c19b6e]">Shop</span>
            </div>
            <p className="text-sm text-[#777] mt-1.5">Large-format calm for living spaces</p>
          </Link>
          
          <Link href="/shop" className="group block cursor-pointer">
            <img src="/outdoor.jpg" alt="Outdoor & Pool" className="w-full aspect-[4/3] object-cover mb-5 transition-transform duration-500 group-hover:scale-[1.02]" />
            <div className="flex justify-between items-center text-[#1a1a1a]">
              <span className="font-normal text-2xl" style={{ fontFamily: 'var(--font-cormorant), serif' }}>Outdoor & Pool</span>
              <span className="text-[10px] font-semibold uppercase tracking-widest text-[#c19b6e]">Shop</span>
            </div>
            <p className="text-sm text-[#777] mt-1.5">Slip-resistant surfaces for the sun</p>
          </Link>

          <Link href="/shop" className="group block cursor-pointer">
            <img src="/wall.jpg" alt="Feature Walls" className="w-full aspect-[4/3] object-cover mb-5 transition-transform duration-500 group-hover:scale-[1.02]" />
            <div className="flex justify-between items-center text-[#1a1a1a]">
              <span className="font-normal text-2xl" style={{ fontFamily: 'var(--font-cormorant), serif' }}>Feature Walls</span>
              <span className="text-[10px] font-semibold uppercase tracking-widest text-[#c19b6e]">Shop</span>
            </div>
            <p className="text-sm text-[#777] mt-1.5">Texture and quiet character</p>
          </Link>
        </div>
      </section>

      {/* Sale Edit Section */}
      <section className="bg-[#fbfa\f8] py-20 pb-32">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 mb-14">
          <p className="text-[#c19b6e] text-xs font-semibold tracking-[0.2em] uppercase mb-4 mt-8">The Sale Edit</p>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-border/50 pb-6 gap-4">
            <h2 className="text-[#1a1a1a] font-normal leading-[1.1]" style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 'clamp(2rem, 3.5vw, 2.8rem)' }}>
              Selected stock, significantly reduced
            </h2>
            <Link href="/sale" className="text-xs font-semibold tracking-[0.2em] uppercase text-[#777] hover:text-[#c19b6e] transition-colors shrink-0">
              Shop the edit
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
              badgeBg: "#a87153"
            },
            {
              id: "2",
              name: "Grafito Charcoal",
              image: "/Madrazo_Black.jpg",
              discount: "30% off",
              size: "60×60 CM • SATIN",
              oldPrice: "21,000",
              newPrice: "14,700",
              badgeBg: "#a87153"
            },
            {
              id: "3",
              name: "Arena Sand",
              image: "/Ambiente_Bonova_Sand.jpg",
              discount: "32% off",
              size: "60×60 CM • MATTE",
              oldPrice: "14,500",
              newPrice: "9,900",
              badgeBg: "#a87153"
            },
            {
              id: "4",
              name: "Terracota Clay",
              image: "/porcelanico_albarracin_cotto_mate.jpg",
              discount: "35% off",
              size: "90×90 CM • MATTE",
              oldPrice: "24,000",
              newPrice: "15,600",
              badgeBg: "#a87153"
            }
          ].map((item, idx) => (
            <div key={idx} className="group relative">
              <div className="relative aspect-square bg-[#ece8de] w-full mb-5 flex items-center justify-center p-6 sm:p-10 shadow-sm">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover shadow-md" />
                <div 
                  className="absolute top-2 left-2 text-[10px] text-white px-2 py-1 uppercase tracking-widest font-semibold"
                  style={{ backgroundColor: item.badgeBg }}
                >
                  {item.discount}
                </div>
              </div>

              <div className="flex flex-col gap-1 mb-5">
                <div className="flex justify-between items-center">
                  <h3 className="text-[#1a1a1a] font-normal text-xl" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
                    {item.name}
                  </h3>
                  <div className="text-right flex items-center gap-2">
                    <span className="text-[#a0a0a0] text-xs line-through block">₦{item.oldPrice}</span>
                    <span className="text-[#c19b6e] text-sm font-semibold block">₦{item.newPrice}</span>
                  </div>
                </div>
                <p className="text-[#888] text-[10px] tracking-widest uppercase">{item.size}</p>
              </div>

              {idx !== 3 ? (
                <button
                  onClick={() => handleAddToCartLocal(PRODUCTS[idx] || PRODUCTS[0])}
                  className="w-full bg-transparent border border-border/70 py-3 text-xs font-semibold tracking-[0.2em] uppercase text-[#333] hover:border-[#c19b6e] hover:text-[#c19b6e] transition-colors"
                >
                  Add to cart
                </button>
              ) : (
                <a
                  href={waGeneralLink(`Hello, I'd like to enquire about ${item.name}`)}
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
"""

with open("c:\\Users\\kechiregis\\Desktop\\Impacto\\cerameka\\app\\page.tsx", "w", encoding="utf-8") as f:
    f.write(new_content)
