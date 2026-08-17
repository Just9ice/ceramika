"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/navbar";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import CartDrawer from "@/components/CartDrawer";
import { useCart } from "@/components/CartContext";
import { AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function About() {
  const { cart, removeFromCart, cartOpen, setCartOpen } = useCart();

  return (
    <div className="bg-white min-h-screen font-sans">
      <Navbar cartCount={cart.length} onCartOpen={() => setCartOpen(true)} />

      {/* Hero Image */}
      <section className="pt-20">
        <div className="w-full h-[60vh] md:h-[70vh] relative">
          <Image
            src="https://res.cloudinary.com/dpsufnobu/image/upload/v1786968946/products_unmapped/zjg8gxovdfju0fmomcww.png"
            alt="Ceramika interior"
            className="w-full h-full object-cover"
            fill
            sizes="100vw"
            priority
          />
        </div>
      </section>

      {/* Who we are */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-8 pt-20 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mb-16 items-start">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#111]">
            Who we are
          </h1>
          <p className="text-lg md:text-xl text-black/70 leading-relaxed font-light">
            A Spanish supply chain, a Nigerian market, and a collection built
            deliberately for the space between the two.
          </p>
        </div>
        <div className="w-full h-px bg-black/10"></div>
      </section>

      {/* The Group / The Brand */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-8 pb-32">
        <div className="flex flex-col gap-16">
          {/* Group */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2.5fr] gap-4 md:gap-16">
            <div>
              <span className="text-[#8c3a3a] text-[10px] font-semibold tracking-widest uppercase">
                THE GROUP
              </span>
            </div>
            <div className="max-w-2xl">
              <h2 className="text-xl md:text-2xl font-bold mb-4 tracking-tight text-[#111]">
                Impacto Grupo
              </h2>
              <p className="text-black/70 leading-relaxed text-sm">
                We are a part of Impacto Grupo, an established importer and
                distributor of building materials in Nigeria.
                <br />
                <br />
                That relationship gives Ceramika access to a deep, continuously
                moving inventory of Spanish porcelain — and the buying position
                to price it well.
              </p>
            </div>
          </div>

          {/* Brand */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2.5fr] gap-4 md:gap-16">
            <div className="flex flex-col justify-between items-start h-full pb-2">
              <span className="text-[#8c3a3a] text-[10px] font-semibold tracking-widest uppercase mb-8 md:mb-0">
                THE BRAND
              </span>
            </div>
            <div className="max-w-2xl">
              <h2 className="text-xl md:text-2xl font-bold mb-4 tracking-tight text-[#111]">
                Ceramika
              </h2>
              <p className="text-black/70 leading-relaxed text-sm">
                We're also its own brand. Our collection is manufactured in
                collaboration with Torrecid in Spain for specific project
                requirements.
                <br />
                <br />
                The collection includes 60x60, 60x120 and 20x120 formats —
                chosen for the way buildings are actually specified and built
                here.
              </p>
            </div>
            <button className="hidden md:block mt-auto border border-black/20 text-black text-[10px] font-semibold tracking-widest uppercase px-6 py-3 hover:bg-[#f8f8f8] transition-colors">
              Download Ceramika Catalogue
            </button>
            {/* Mobile button */}
            <div className="md:hidden mt-4">
              <button className="border border-black/20 text-black text-[10px] font-semibold tracking-widest uppercase px-6 py-3 hover:bg-[#f8f8f8] transition-colors w-full text-center">
                Download Ceramika Catalogue
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Designed with our market in mind */}
      <section className="bg-[#f2ede4] py-24">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
            {/* Image */}
            <div className="aspect-square md:aspect-[4/3] w-full bg-white">
              <img
                src="https://res.cloudinary.com/dpsufnobu/image/upload/products/PRSCK44BONOSAND1A_env.jpg"
                alt="Stacked Ceramika tiles"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Text content */}
            <div className="flex flex-col">
              <span className="text-[#8c3a3a] text-[10px] font-semibold tracking-widest uppercase mb-6">
                TILES
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-[1.05] text-[#111]">
                Designed with
                <br />
                our market in mind.
              </h2>
              <p className="text-black/70 leading-relaxed text-sm md:text-base max-w-md mb-12">
                The Ceramika collection was developed specifically with Nigerian
                construction needs in mind — combining high quality with more
                accessible pricing.
              </p>
              <div className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-black/50 tracking-tight flex gap-4 md:gap-6 flex-wrap">
                <span>60×60</span>
                <span>60×120</span>
                <span>20×120</span>
              </div>
            </div>
          </div>
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
