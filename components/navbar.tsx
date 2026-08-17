import Link from "next/link";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { ShoppingCart, Search, Menu, X } from "lucide-react";

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
            whileTap={{ scale: 0.9 }}
            className="text-[#252525] hover:[#641F35] transition-colors duration-300"
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

        {/* Mobile Hamburger */}
        <div className="flex items-center gap-4 md:hidden">
          <button onClick={onCartOpen} className="relative text-foreground">
            <ShoppingCart className="w-5 h-5" strokeWidth={1.5} />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-accent text-accent-foreground text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
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
    </header>
  );
}
