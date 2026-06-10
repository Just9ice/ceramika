'use client';

import { PHONE, EMAIL, ADDRESS, HOURS, waGeneralLink } from '../lib/data';
import WhatsAppIcon from '@/components/ui/WhatsAppIcon';
import Link from 'next/link';
import { MapPin, Phone, Mail, Clock, Lock, Truck, RotateCcw, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { CeramikaLogo } from '@/components/ui/CeramikaLogo';

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
});

const SHOP_LINKS = [
    { label: 'Shop All', href: '/shop' },
    { label: 'Collections', href: '/collections' },
    { label: 'Sale', href: '/sale' },
];

const COMPANY_LINKS = [
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Delivery Info', href: '/delivery' },
    { label: 'Privacy Policy', href: '/policy/privacy' },
    { label: 'Return Policy', href: '/policy/return' },
    { label: 'Terms', href: '/terms' },
];

const PAYMENT_METHODS = ['Paystack', 'Flutterwave', 'Visa', 'Mastercard', 'Verve', 'Bank Transfer'];

export default function Footer() {
    return (
        <footer className="relative overflow-hidden bg-card border-t border-border/50">

            {/* ── Decorative background ────────────────────────────────── */}
            {/* Radial glow */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: 'radial-gradient(ellipse 80% 60% at 50% 100%, var(--color-accent) 0%, transparent 70%)',
                    opacity: 0.04
                }}
            />
            {/* Gold grid */}
            <div
                className="absolute inset-0 pointer-events-none opacity-5"
                style={{
                    backgroundImage: 'linear-gradient(var(--color-accent) 1px, transparent 1px), linear-gradient(90deg, var(--color-accent) 1px, transparent 1px)',
                    backgroundSize: '72px 72px',
                }}
            />

            {/* Vertical accent lines */}
            <div
                className="absolute top-0 left-[15%] w-px h-full pointer-events-none hidden lg:block"
                style={{ background: 'linear-gradient(to bottom, var(--color-border), transparent)' }}
            />
            <div
                className="absolute top-0 right-[15%] w-px h-full pointer-events-none hidden lg:block"
                style={{ background: 'linear-gradient(to bottom, var(--color-border), transparent)' }}
            />

            {/* ── Footer body ──────────────────────────────────────────── */}
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1.5fr] gap-12">

                    {/* Brand column */}
                    <motion.div {...fadeUp(0)}>
                        <Link href="/" className="inline-block mb-6 text-foreground hover:text-[#a68038] dark:hover:text-[#c8a96e] transition-colors duration-300">
                            <CeramikaLogo className="h-6 w-auto" />
                        </Link>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-xs">
                            Nigeria&apos;s premier destination for premium tiles and finishing materials. Trusted by homeowners, contractors, and architects nationwide since 2012.
                        </p>

                        {/* Contact details inline in brand */}
                        <div className="flex flex-col gap-2.5">
                            {[
                                { Icon: MapPin,  val: ADDRESS },
                                { Icon: Phone,   val: PHONE,  href: `tel:${PHONE}` },
                                { Icon: Mail,    val: EMAIL,  href: `mailto:${EMAIL}` },
                                { Icon: Clock,   val: HOURS },
                            ].map((item) => (
                                <div key={item.val} className="flex items-start gap-2.5">
                                    <item.Icon className="w-3.5 h-3.5 text-[#a68038] dark:text-[#c8a96e] shrink-0 mt-0.5" />
                                    {item.href ? (
                                        <a href={item.href} className="text-muted-foreground text-xs hover:text-foreground transition-colors leading-relaxed">
                                            {item.val}
                                        </a>
                                    ) : (
                                        <span className="text-muted-foreground text-xs leading-relaxed">{item.val}</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Shop links */}
                    <motion.div {...fadeUp(0.08)}>
                        <h4 className="text-foreground/70 font-bold text-[10px] mb-5 tracking-[0.2em] uppercase">
                            Shop
                        </h4>
                        <ul className="flex flex-col gap-2.5">
                            {SHOP_LINKS.map((l) => (
                                <li key={l.label}>
                                    <Link
                                        href={l.href}
                                        className="group flex items-center gap-2 text-muted-foreground text-sm hover:text-foreground transition-colors duration-200"
                                    >
                                        <span
                                            className="w-0 group-hover:w-2 h-px bg-accent transition-all duration-200 shrink-0"
                                        />
                                        {l.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Company links */}
                    <motion.div {...fadeUp(0.14)}>
                        <h4 className="text-foreground/70 font-bold text-[10px] mb-5 tracking-[0.2em] uppercase">
                            Company
                        </h4>
                        <ul className="flex flex-col gap-2.5">
                            {COMPANY_LINKS.map((l) => (
                                <li key={l.label}>
                                    <Link
                                        href={l.href}
                                        className="group flex items-center gap-2 text-muted-foreground text-sm hover:text-foreground transition-colors duration-200"
                                    >
                                        <span
                                            className="w-0 group-hover:w-2 h-px bg-accent transition-all duration-200 shrink-0"
                                        />
                                        {l.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Trust + payment */}
                    <motion.div {...fadeUp(0.2)}>
                        <h4 className="text-foreground/70 font-bold text-[10px] mb-5 tracking-[0.2em] uppercase">
                            Trust & Payments
                        </h4>

                        {/* Trust badges */}
                        <div className="grid grid-cols-2 gap-2 mb-6">
                            {[
                                { Icon: Lock,         label: 'Secure Checkout' },
                                { Icon: Truck,        label: 'Nationwide Delivery' },
                                { Icon: RotateCcw,    label: '14-Day Returns' },
                                { Icon: MessageCircle,label: '< 10 min Support' },
                            ].map((b) => (
                                <div
                                    key={b.label}
                                    className="flex flex-col items-center gap-1.5 bg-muted/30 border border-border/50 rounded-xl p-3 text-center"
                                >
                                    <b.Icon className="w-4 h-4 text-[#a68038] dark:text-[#c8a96e]" />
                                    <span className="text-muted-foreground text-[10px] leading-tight">{b.label}</span>
                                </div>
                            ))}
                        </div>

                        <p className="text-foreground/50 text-[10px] uppercase tracking-widest mb-3">We Accept</p>
                        <div className="flex gap-1.5 flex-wrap">
                            {PAYMENT_METHODS.map((p) => (
                                <span
                                    key={p}
                                    className="text-muted-foreground text-[10px] border border-border/50 rounded-md px-2 py-1"
                                >
                                    {p}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* ── Bottom bar ───────────────────────────────────────────── */}
            <div className="relative border-t border-border/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p className="text-muted-foreground text-xs">
                        © {new Date().getFullYear()} CeramiKa — a brand of{' '}
                        <span className="text-foreground/70">Impacto Trading Nigeria Limited</span>. All rights reserved.
                    </p>
                    <div className="flex items-center gap-4">
                        <span className="text-muted-foreground text-xs">All prices in ₦ Nigerian Naira</span>
                        <span className="text-muted-foreground/30 text-xs hidden sm:inline">·</span>
                        <span className="text-muted-foreground text-xs hidden sm:inline">CAC Registered</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
