'use client';

import { ReactNode, useState } from "react";
import NavBar from "@/components/navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import CartDrawer from "@/components/CartDrawer";
import { AnimatePresence, motion } from "framer-motion";
import { CartItem } from "@/lib/data";

interface Section {
  id: string;
  title: string;
}

interface LegalLayoutProps {
  title: string;
  subtitle: string;
  effectiveDate: string;
  lastUpdated: string;
  sections: Section[];
  children: ReactNode;
}

export default function LegalLayout({
  title,
  subtitle,
  effectiveDate,
  lastUpdated,
  sections,
  children,
}: LegalLayoutProps) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  function removeFromCart(id: number) {
    setCart((prev) => prev.filter((i) => i.id !== id));
  }

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <NavBar cartCount={cart.length} onCartOpen={() => setCartOpen(true)} />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative pt-36 pb-16 overflow-hidden border-b border-border bg-background">
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
          <motion.p
            className="text-muted-foreground text-xs tracking-[0.3em] uppercase mb-4 font-semibold"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            Legal
          </motion.p>
          <motion.h1
            className="text-foreground font-serif font-black leading-tight mb-4"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)' }}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            {title}
          </motion.h1>
          <motion.p
            className="text-muted-foreground text-base max-w-2xl leading-relaxed mb-6 font-sans"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
          >
            {subtitle}
          </motion.p>
          <motion.div
            className="flex flex-wrap gap-2"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground bg-muted border border-border rounded-full px-3 py-1.5">
              <span className="font-semibold">Effective</span>
              <span className="text-foreground/70 font-medium">{effectiveDate}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground bg-muted border border-border rounded-full px-3 py-1.5">
              <span className="font-semibold">Updated</span>
              <span className="text-foreground/70 font-medium">{lastUpdated}</span>
            </span>
          </motion.div>
        </div>
      </section>

      {/* ── BODY ─────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14 grid lg:grid-cols-[220px_1fr] gap-14">

        {/* Sidebar TOC */}
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <p className="text-muted-foreground text-xs uppercase tracking-widest mb-4">Contents</p>
            <nav className="flex flex-col gap-0.5">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="group flex items-center gap-2 text-muted-foreground hover:text-[#a68038] text-xs py-2 pl-3 border-l border-border hover:border-[#a68038] transition-all duration-200"
                >
                  <span className="w-0 group-hover:w-1.5 h-1.5 rounded-full bg-[#c8a96e] shrink-0 transition-all duration-200" />
                  {s.title}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        {/* Content */}
        <motion.main
          className="legal-body min-w-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </motion.main>
      </div>

      {/* ── POLICY LINKS ─────────────────────────────────────── */}
      <div className="border-t border-border py-10 bg-gradient-to-b from-muted/30 to-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <p className="text-muted-foreground text-xs uppercase tracking-widest mb-4">Other Policies</p>
          <div className="flex flex-wrap gap-3">
            {[
              { label: "Terms & Conditions", href: "/terms" },
              { label: "Privacy Policy", href: "/policy/privacy" },
              { label: "Returns Policy", href: "/policy/return" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-[#a68038] border border-border hover:border-[#a68038] rounded-full px-4 py-2 transition-all duration-200 hover:-translate-y-0.5"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>

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

      {/* Prose styles for legal content */}
      <style>{`
        .legal-body h2 {
          font-family: 'Georgia', serif;
          font-size: 1.3rem;
          font-weight: 900;
          color: hsl(var(--foreground));
          margin: 2.8rem 0 0.75rem;
          padding-top: 0.5rem;
          scroll-margin-top: 6rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid hsl(var(--border));
        }
        .legal-body h3 {
          font-size: 0.8rem;
          font-weight: 700;
          color: rgba(200, 169, 110, 0.6);
          margin: 1.75rem 0 0.5rem;
          text-transform: uppercase;
          letter-spacing: 0.12em;
        }
        .legal-body p {
          color: hsl(var(--muted-foreground));
          font-size: 0.875rem;
          line-height: 1.9;
          margin-bottom: 1rem;
        }
        .legal-body ul, .legal-body ol {
          color: hsl(var(--muted-foreground));
          font-size: 0.875rem;
          line-height: 1.9;
          margin: 0.75rem 0 1.25rem 1.25rem;
        }
        .legal-body li {
          margin-bottom: 0.45rem;
        }
        .legal-body a {
          color: #c8a96e;
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        .legal-body strong {
          color: hsl(var(--foreground) / 0.8);
          font-weight: 600;
        }
        .legal-body .highlight-box {
          background: rgba(200, 169, 110, 0.06);
          border: 1px solid rgba(200, 169, 110, 0.18);
          border-radius: 14px;
          padding: 1rem 1.25rem;
          margin: 1.25rem 0;
          position: relative;
        }
        .legal-body .highlight-box::before {
          content: '';
          position: absolute;
          top: 0;
          left: 1.5rem;
          right: 1.5rem;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(200,169,110,0.4), transparent);
        }
        .legal-body .highlight-box p {
          margin-bottom: 0;
          color: rgba(200, 169, 110, 0.75);
          font-size: 0.83rem;
        }
        .legal-body .info-box {
          background: hsl(var(--muted));
          border: 1px solid hsl(var(--border));
          border-radius: 14px;
          padding: 1rem 1.25rem;
          margin: 1.25rem 0;
        }
        .legal-body .info-box p {
          margin-bottom: 0;
          font-size: 0.83rem;
        }
        .legal-body hr {
          border: none;
          border-top: 1px solid hsl(var(--border));
          margin: 2rem 0;
        }
      `}</style>
    </div>
  );
}
