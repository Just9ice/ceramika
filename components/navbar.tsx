"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { ShoppingCart, Search, Menu, X } from "lucide-react";
import { fetchProducts } from "@/lib/api";
import type { Product } from "@/lib/data";

const SearchModal = ({ onClose }: { onClose: () => void }) => {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  
  useEffect(() => {
    fetchProducts().then(setProducts).catch(console.error);
    
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const filtered = products.filter(p => 
    p.name.toLowerCase().includes(query.toLowerCase()) || 
    p.sku.toLowerCase().includes(query.toLowerCase()) ||
    p.effect.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-md flex flex-col"
    >
      <div className="flex items-center justify-between p-6 md:p-10">
        <div className="w-8" />
        <span className="text-sm font-bold tracking-widest uppercase text-muted-foreground">Search</span>
        <button onClick={onClose} className="p-2 hover:bg-black/5 rounded-full transition-colors text-foreground">
          <X className="w-6 h-6" />
        </button>
      </div>
      
      <div className="flex-1 w-full max-w-5xl mx-auto flex flex-col px-6 pb-12">
        <input
          autoFocus
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search products, finishes..."
          className="w-full bg-transparent text-3xl md:text-5xl lg:text-6xl font-black outline-none placeholder:text-muted-foreground/30 border-b border-border pb-4 md:pb-6 mb-8 text-foreground"
          style={{ fontFamily: "var(--font-cormorant), serif" }}
        />
        
        <div className="flex-1 overflow-y-auto">
          {query.length > 1 ? (
            filtered.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                {filtered.map(p => (
                  <Link key={p.id} href={`/product/${p.id}`} onClick={onClose} className="group">
                    <div className="aspect-[4/5] bg-muted relative mb-4 overflow-hidden rounded-md">
                      <img src={p.image} alt={p.name} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <h4 className="font-bold text-sm text-foreground">{p.name}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{p.finish}</p>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No products found for "{query}"</p>
            )
          ) : (
            <p className="text-muted-foreground uppercase text-xs font-bold tracking-widest">Type at least 2 characters to search...</p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const NavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Link href={href} className="relative px-2 py-2 text-[10px] md:text-xs font-medium tracking-widest text-foreground hover:text-foreground/70 transition-colors uppercase">
      {children}
    </Link>
  );
};

export default function Navbar({
  cartCount = 0,
  onCartOpen,
}: {
  cartCount: number;
  onCartOpen: () => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#efebe1]/95 backdrop-blur-md shadow-sm"
          : "bg-[#efebe1]/45 absolute"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 h-20 flex items-center justify-between relative">
        {/* Left: Logo */}
        <div className="flex-1 flex items-center justify-start">
          <Link href="/" className="flex items-center">
            <img
              src="/Logo.png"
              alt="Ceramika Logo"
              className="h-6 sm:h-8 w-auto object-contain"
            />
          </Link>
        </div>

        {/* Center: Links (Desktop) */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center justify-center gap-8">
          <NavLink href="/shop">Shop</NavLink>
          <NavLink href="/locations">Locations</NavLink>
          <NavLink href="/about">About Us</NavLink>
          <NavLink href="/cart">Cart</NavLink>
        </div>

        {/* Right: Actions */}
        <div className="hidden md:flex flex-1 items-center justify-end gap-6">
          <motion.button
            onClick={() => setSearchOpen(true)}
            whileTap={{ scale: 0.9 }}
            className="text-[#252525] hover:text-[#641F35] transition-colors duration-300"
          >
            <Search className="w-5 h-5" strokeWidth={1.5} />
          </motion.button>
          <motion.button
            onClick={onCartOpen}
            whileTap={{ scale: 0.9 }}
            className="relative text-[#252525] hover:[#641F35] transition-colors duration-300"
          >
            <ShoppingCart className="w-5 h-5" strokeWidth={1.5} />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-accent text-accent-foreground text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </motion.button>
        </div>

        {/* Mobile Hamburger & Actions */}
        <div className="flex items-center gap-4 md:hidden">
          <button onClick={() => setSearchOpen(true)} className="relative text-foreground p-1">
            <Search className="w-5 h-5" strokeWidth={1.5} />
          </button>
          <button onClick={onCartOpen} className="relative text-foreground p-1">
            <ShoppingCart className="w-5 h-5" strokeWidth={1.5} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-foreground p-1"
          >
            {menuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#efebe1] border-t border-border/20 px-6 py-4 flex flex-col gap-4 overflow-hidden"
          >
            {[
              { label: "Shop", href: "/shop" },
              { label: "Locations", href: "/locations" },
              { label: "About Us", href: "/about" },
              { label: "Cart", href: "/cart" },
            ].map((link) => (
              <Link
                href={link.href}
                key={link.label}
                onClick={() => setMenuOpen(false)}
                className="text-foreground font-medium py-3 border-b border-black/5 text-sm tracking-widest uppercase transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Overlay */}
      <AnimatePresence>
        {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} />}
      </AnimatePresence>
    </header>
  );
}
