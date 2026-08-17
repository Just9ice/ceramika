"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

const SHOWROOMS = [
  {
    id: 1,
    name: "Lekki 1",
    city: "LAGOS",
    address: "Kilometre 16, Lekki-Epe Expressway, by Agungi bus stop, Lagos.",
    phones: ["09055494223", "09055494237"],
  },
  {
    id: 2,
    name: "Ikorodu",
    city: "LAGOS",
    address: "112 Lagos-Ikorodu Road, by Majidun bus stop, Lagos.",
    phones: ["09055494230", "09055494239"],
  },
  {
    id: 3,
    name: "Coker",
    city: "LAGOS",
    address: "A&O Showroom, Block L, Shops 14/15, Agric Market, Coker, Lagos.",
    phones: ["09055494253", "09055494213"],
  },
  {
    id: 4,
    name: "Lekki 2",
    city: "LAGOS",
    address: "Coming soon...",
    phones: ["09055494223", "09055494237"],
  },
  {
    id: 5,
    name: "Bodija",
    city: "IBADAN",
    address:
      "Suite 6, OOSM Building, 40 Awolowo Way, Favos Junction, Opposite SD Hotel SPA, Major Salau Way, Bodija, Ibadan.",
    phones: ["09071525040", "09055494213"],
  },
  {
    id: 6,
    name: "Asaba 1",
    city: "ASABA",
    address:
      "Summit Junction, Rainoil Filling Station, Along Asaba-Benin Expressway, Asaba.",
    phones: ["07065232823", "09055494213"],
  },
  {
    id: 7,
    name: "Gudu",
    city: "ABUJA",
    address:
      "Plot 1125, Oladipo Diya Street, Near Gudu Market, Adjacent Zenith Bank ATM, Gudu District, Abuja.",
    phones: ["09055494221", "09055494235"],
  },
];

const CITIES = ["ALL", "LAGOS", "IBADAN", "ASABA", "ABUJA"];

// High-quality placeholder images that fit the architectural vibe
const IMAGE_1 =
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop"; // Kitchen vertical
const IMAGE_2 =
  "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=2070&auto=format&fit=crop"; // Kitchen horizontal

export default function LocationsPage() {
  const [activeCity, setActiveCity] = useState("ALL");

  const filteredShowrooms =
    activeCity === "ALL"
      ? SHOWROOMS
      : SHOWROOMS.filter((s) => s.city === activeCity);

  return (
    <div className="min-h-screen bg-[#faf9f6] flex flex-col pt-24 font-sans text-foreground">
      <Navbar
        cartCount={0}
        onCartOpen={function (): void {
          throw new Error("Function not implemented.");
        }}
      />

      <main className="flex-1 w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 pt-10 pb-20">
        {/* Header Section */}
        <motion.div
          className="flex flex-col md:flex-row md:items-end justify-between mb-8 border-b border-[#702031]/30 pb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1
            className="text-[3rem] md:text-[4rem] lg:text-[5rem] font-bold leading-[1.1] text-[#5c1e28] tracking-tight max-w-xl"
            style={{ fontFamily: "var(--font-cormorant), serif" }}
          >
            Come see the tile in person.
          </h1>
          <p className="text-foreground/80 text-sm md:text-base mt-6 md:mt-0 max-w-[280px]">
            Visit a Ceramika showroom and experience our collections up close.
          </p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column (Image + Filters) */}
          <motion.div
            className="lg:col-span-5 flex flex-col"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative aspect-[3/4] w-full mb-8 overflow-hidden bg-muted">
              <Image
                src={IMAGE_1}
                alt="Beautiful minimal kitchen showcasing Ceramika tiles"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
                priority
              />
            </div>

            {/* Desktop Filters */}
            <div className="hidden lg:flex flex-wrap gap-2">
              {CITIES.map((city) => (
                <button
                  key={city}
                  onClick={() => setActiveCity(city)}
                  className={`px-6 py-3 text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-300 border ${
                    activeCity === city
                      ? "bg-[#1c1c1c] text-white border-[#1c1c1c]"
                      : "bg-transparent text-[#1c1c1c] border-[#1c1c1c]/20 hover:border-[#1c1c1c]/60"
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Right Column (Locations List) */}
          <motion.div
            className="lg:col-span-7 flex flex-col"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Mobile Filters (Only visible on small screens) */}
            <div className="flex lg:hidden flex-wrap gap-2 mb-10">
              {CITIES.map((city) => (
                <button
                  key={city}
                  onClick={() => setActiveCity(city)}
                  className={`px-5 py-2.5 text-[9px] font-bold tracking-[0.2em] uppercase transition-all duration-300 border ${
                    activeCity === city
                      ? "bg-[#1c1c1c] text-white border-[#1c1c1c]"
                      : "bg-transparent text-[#1c1c1c] border-[#1c1c1c]/20 hover:border-[#1c1c1c]/60"
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
              <AnimatePresence mode="popLayout">
                {filteredShowrooms.map((showroom, idx) => (
                  <motion.div
                    key={showroom.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    className="flex flex-col border-t border-[#702031]/10 pt-4"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-xl font-bold text-[#1c1c1c]">
                        {showroom.name}
                      </h3>
                      <span className="text-[8px] font-bold tracking-[0.2em] text-[#702031] uppercase">
                        {showroom.city}
                      </span>
                    </div>

                    <p className="text-[11px] text-[#1c1c1c]/70 leading-relaxed mb-6 max-w-[220px]">
                      {showroom.address}
                    </p>

                    <div className="flex flex-col gap-1 mt-auto">
                      {showroom.phones.map((phone) => (
                        <a
                          key={phone}
                          href={`tel:${phone}`}
                          className="text-[11px] text-[#1c1c1c]/80 hover:text-black transition-colors"
                        >
                          {phone}
                        </a>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Full width bottom image */}
      <motion.div
        className="w-full h-[40vh] md:h-[60vh] relative mt-12 bg-muted"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <Image
          src={IMAGE_2}
          alt="Ceramika interior setup"
          fill
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>

      <Footer theme="dark" />
      <FloatingWhatsApp />
    </div>
  );
}
