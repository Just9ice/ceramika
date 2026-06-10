import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useScroll, useTransform, useMotionTemplate } from 'framer-motion';
import { ThemeToggle } from '@/components/ThemeToggle';
import { ShoppingCart } from 'lucide-react';
import { CeramikaLogo } from '@/components/ui/CeramikaLogo';

export default function Navbar({ cartCount = 0, onCartOpen }: { cartCount: number; onCartOpen: () => void }) {
    const pathname = usePathname();
    const { scrollY } = useScroll();
    const blur = useTransform(scrollY, [0, 200], [0, 12]);
    const blurFilter = useMotionTemplate`blur(${blur}px)`;

    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handler = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handler);
        return () => window.removeEventListener("scroll", handler);
    }, []);

    useEffect(() => {
        if (!menuOpen) return;

        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.closest('[aria-label="Toggle menu"]') || target.closest('nav')) return;
            setMenuOpen(false);
        };

        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, [menuOpen]);

    const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
        const isActive = pathname === href;
        return (
            <Link href={href} passHref legacyBehavior>
                <motion.a
                    whileHover={{ scale: 1.05, y: -1 }}
                    className="relative px-3 py-2 text-sm font-semibold tracking-widest text-foreground/70 hover:text-foreground transition-colors uppercase"
                >
                    {isActive && (
                        <motion.span
                            layoutId="nav-pill"
                            className="absolute left-0 -bottom-1 h-[2px] w-full bg-accent transition-all duration-300"
                            transition={{
                                type: "spring",
                                stiffness: 400,
                                damping: 30
                            }}
                        />
                    )}
                    <span className="relative z-10">{children}</span>
                </motion.a>
            </Link>
        );
    };

    return (
        <motion.header
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-background/80 backdrop-blur-md shadow-lg" : "bg-transparent"}`}
            style={{ backdropFilter: blurFilter }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                
                {/* Left Links (Desktop) */}
                <div className="hidden md:flex flex-1 items-center gap-8 justify-start">
                    <NavLink href="/shop">Shop</NavLink>
                    <NavLink href="/collections">Collections</NavLink>
                </div>

                {/* Logo (Center) */}
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="flex justify-center shrink-0"
                >
                    <Link href="/">
                        {/* We use a stylized text logo or an image logo based on what you have */}
                        <div className="flex items-center text-foreground hover:text-[#a68038] dark:hover:text-[#c8a96e] transition-colors duration-300">
                            <CeramikaLogo className="h-[22px] sm:h-6 w-auto" />
                        </div>
                    </Link>
                </motion.div>

                {/* Right Actions & Links */}
                <div className="hidden md:flex flex-1 items-center gap-8 justify-end">
                    <NavLink href="/sale">Sale</NavLink>
                    <NavLink href="/about">About</NavLink>
                    
                    <div className="flex items-center gap-4 pl-4 border-l border-border/50">
                        <ThemeToggle />
                        
                        <motion.button
                            onClick={onCartOpen}
                            whileTap={{ scale: 0.9 }}
                            whileHover={{ scale: 1.15, rotate: -15, transition: { type: "spring", stiffness: 400, damping: 10 } }}
                            className="relative flex items-center gap-2 p-2 text-sm font-semibold tracking-widest text-foreground/70 hover:text-foreground transition-colors uppercase"
                        >
                            <ShoppingCart className="w-5 h-5" />
                            {cartCount}
                        </motion.button>
                    </div>
                </div>

                {/* Mobile Hamburger & Actions */}
                <div className="flex items-center gap-4 md:hidden">
                    <ThemeToggle />
                    
                    <motion.button
                        onClick={onCartOpen}
                        whileTap={{ scale: 0.9 }}
                        whileHover={{ scale: 1.15, rotate: -15, transition: { type: "spring", stiffness: 400, damping: 10 } }}
                        className="relative p-2 text-foreground/70 hover:text-foreground transition-colors"
                    >
                        <ShoppingCart className="w-5 h-5" />
                        {cartCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                                {cartCount}
                            </span>
                        )}
                    </motion.button>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setMenuOpen(!menuOpen);
                        }}
                        className="p-2 text-foreground/70 hover:text-foreground"
                        aria-label="Toggle menu"
                    >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            {menuOpen
                                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
                        </svg>
                    </button>
                </div>

            </div>

            {/* Mobile Nav Menu */}
            {menuOpen && (
                <AnimatePresence>
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="md:hidden bg-background/98 backdrop-blur-xl border-b border-border/50 px-6 py-4 flex flex-col gap-4 shadow-xl"
                    >
                        {[
                            { label: 'Shop', href: '/shop' },
                            { label: 'Collections', href: '/collections' },
                            { label: 'Sale', href: '/sale' },
                            { label: 'About', href: '/about' },
                        ].map((link) => (
                            <Link href={link.href} key={link.label} legacyBehavior>
                                <a
                                    onClick={() => setMenuOpen(false)}
                                    className="text-foreground/80 hover:text-accent font-semibold py-3 border-b border-border/50 text-sm tracking-widest uppercase transition-colors"
                                >
                                    {link.label}
                                </a>
                            </Link>
                        ))}
                    </motion.div>
                </AnimatePresence>
            )}
        </motion.header>
    );
}