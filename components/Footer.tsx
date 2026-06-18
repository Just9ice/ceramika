'use client';

import { PHONE, EMAIL, ADDRESS } from '../lib/data';
import Link from 'next/link';
import { MapPin, Phone, Mail } from 'lucide-react';
import { motion } from 'framer-motion';


const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
});

const FOOTER_LINKS = [
  { label: 'Shop All', href: '/shop' },
  { label: 'About Us', href: '/about' },
  { label: 'Privacy Policy', href: '/policy/privacy' },
  { label: 'Return Policy', href: '/policy/return' },
  { label: 'Terms', href: '/terms' },
];

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* Left Column: Brand & Contact */}
          <motion.div {...fadeUp(0)} className="flex flex-col">
            <Link href="/" className="inline-block mb-6 text-foreground hover:text-[#a68038] transition-colors duration-300">
              <img src="/Logo.PNG" alt="Ceramika Logo" className="h-6 w-auto object-contain" />
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-8 max-w-sm">
              Nigeria&apos;s premier destination for premium tiles and finishing materials. Trusted by homeowners, contractors, and architects nationwide.
            </p>

            <div className="flex flex-col gap-3 mt-auto">
              {[
                { Icon: MapPin, val: ADDRESS },
                { Icon: Phone,  val: PHONE, href: `tel:${PHONE}` },
                { Icon: Mail,  val: EMAIL, href: `mailto:${EMAIL}` },
              ].map((item) => (
                <div key={item.val} className="flex items-start gap-3">
                  <item.Icon className="w-4 h-4 text-foreground/50 shrink-0 mt-0.5" />
                  {item.href ? (
                    <a href={item.href} className="text-muted-foreground text-sm hover:text-foreground transition-colors">
                      {item.val}
                    </a>
                  ) : (
                    <span className="text-muted-foreground text-sm">{item.val}</span>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Links */}
          <div className="md:ml-auto">
            <motion.div {...fadeUp(0.1)}>
              <h4 className="text-foreground font-semibold tracking-widest text-xs mb-6 uppercase">
                Links
              </h4>
              <ul className="flex flex-col gap-4">
                {FOOTER_LINKS.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-muted-foreground text-sm hover:text-foreground transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-xs uppercase tracking-wider">
            © {new Date().getFullYear()} CeramiKa
          </p>
          <div className="flex items-center gap-4 text-muted-foreground/60 text-xs uppercase tracking-wider">
            <span>All prices in NGN</span>
            <span className="hidden sm:inline">·</span>
            <span className="hidden sm:inline">CAC Registered</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
