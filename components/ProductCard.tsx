'use client';

import { Product, WA_NUMBER, waProductLink } from '@/lib/data';
import { useRef, useState } from 'react';
import WhatsAppIcon from './ui/WhatsAppIcon';
import StarRating from './ui/StarRating';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductCardProps {
    product: Product;
    onAddToCart: (product: Product, sourceEl?: HTMLElement | null) => void;
}

const TAG_STYLES: Record<string, { bg: string; color: string; border: string }> = {
    Bestseller: { bg: 'rgba(200,169,110,0.12)', color: 'var(--color-accent)', border: 'rgba(200,169,110,0.3)' },
    New:        { bg: 'rgba(59,130,246,0.12)',  color: '#3b82f6', border: 'rgba(59,130,246,0.3)' },
    Premium:    { bg: 'rgba(168,85,247,0.12)',  color: '#a855f7', border: 'rgba(168,85,247,0.3)' },
    Luxury:     { bg: 'rgba(212,175,55,0.12)',  color: '#d4af37', border: 'rgba(212,175,55,0.3)'  },
    Sale:       { bg: 'rgba(239,68,68,0.12)',   color: '#ef4444', border: 'rgba(239,68,68,0.3)'   },
};

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
    const [hovered, setHovered] = useState(false);
    const [addedFlash, setAddedFlash] = useState(false);
    const imageRef = useRef<HTMLDivElement | null>(null);
    const tagStyle = product.tag ? TAG_STYLES[product.tag] : null;

    function handleAddToCart() {
        onAddToCart(product, imageRef.current);
        setAddedFlash(true);
        setTimeout(() => setAddedFlash(false), 1200);
    }

    return (
        <motion.div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="group flex flex-col h-full w-full relative rounded-3xl overflow-hidden border border-border bg-card shadow-sm"
            whileHover={{ y: -4 }}
            transition={{ type: 'spring', stiffness: 280, damping: 22 }}
            style={{ boxShadow: hovered ? '0 12px 40px rgba(0,0,0,0.1), 0 0 0 1px var(--color-border)' : undefined }}
        >
            {/* Top accent glow on hover */}
            <div
                className="absolute top-0 left-8 right-8 h-px transition-opacity duration-300 pointer-events-none"
                style={{
                    background: 'linear-gradient(90deg, transparent, rgba(200,169,110,0.6), transparent)',
                    opacity: hovered ? 1 : 0,
                }}
            />

            {/* ── Info section ─────────────────────────────────────── */}
            <div className="p-5 flex-shrink-0 z-10 relative">
                {/* Tag */}
                {product.tag === 'Bestseller' && tagStyle && (
                    <motion.span
                        className="inline-flex items-center mb-3 px-2.5 py-1 rounded-full text-[10px] font-black tracking-[0.15em] uppercase"
                        style={{
                            backgroundColor: tagStyle.bg,
                            color: tagStyle.color,
                            border: `1px solid ${tagStyle.border}`,
                        }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        {product.tag}
                    </motion.span>
                )}

                {/* Name */}
                <Link href={`/product/${product.id}`}>
                    <h3
                        className="font-black text-base text-card-foreground leading-tight mb-1.5 hover:opacity-80 transition-opacity duration-200"
                        style={{ fontFamily: "'Georgia', serif" }}
                    >
                        {product.name}
                    </h3>
                </Link>

                {/* Meta pills */}
                <div className="flex items-center gap-1 flex-wrap mb-4">
                    {[product.material, product.finish, product.room].map((m) => (
                        <span
                            key={m}
                            className="text-[10px] text-muted-foreground bg-muted border border-border rounded-full px-2 py-0.5"
                        >
                            {m}
                        </span>
                    ))}
                </div>

                {/* Price + rating row */}
                <div className="flex items-end justify-between mb-5">
                    <div>
                        <span className="text-foreground font-black text-xl" style={{ fontFamily: "'Georgia', serif" }}>
                            ₦{product.pricePerSqm.toLocaleString()}
                        </span>
                        <span className="text-muted-foreground text-xs ml-1">/sqm</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <StarRating rating={product.rating} />
                        <span className="text-muted-foreground text-[11px]">({product.reviewCount})</span>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                    <motion.button
                        id="add-to-cart"
                        onClick={handleAddToCart}
                        disabled={!product.inStock}
                        className="flex-1 relative overflow-hidden py-2.5 text-xs font-bold rounded-xl transition-colors duration-200 disabled:opacity-30 disabled:cursor-not-allowed border border-border text-foreground hover:bg-muted"
                        style={{
                            borderColor: addedFlash ? 'var(--color-primary)' : undefined,
                            color: addedFlash ? 'var(--color-primary)' : undefined,
                        }}
                        whileTap={{ scale: 0.96 }}
                    >
                        <AnimatePresence mode="wait">
                            {addedFlash ? (
                                <motion.span
                                    key="added"
                                    className="flex items-center justify-center gap-1"
                                    initial={{ opacity: 0, y: 6 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -6 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    ✓ Added
                                </motion.span>
                            ) : (
                                <motion.span
                                    key="add"
                                    initial={{ opacity: 0, y: -6 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 6 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    Add to Cart
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </motion.button>

                    <motion.a
                        href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
                            `Hello! I'm interested in ${product.name} — ₦${product.pricePerSqm.toLocaleString()}/sqm`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-bold rounded-xl transition-colors duration-200"
                        style={{
                            background: 'rgba(37,211,102,0.08)',
                            border: '1px solid rgba(37,211,102,0.25)',
                            color: '#25d366',
                        }}
                        whileHover={{ backgroundColor: 'rgba(37,211,102,0.15)' }}
                        whileTap={{ scale: 0.96 }}
                    >
                        <WhatsAppIcon className="w-3.5 h-3.5" />
                        Order
                    </motion.a>
                </div>
            </div>

            {/* ── Tile swatch / image ──────────────────────────────── */}
            <div
                ref={imageRef}
                className="relative flex-1 min-h-[13rem] overflow-hidden mt-auto"
            >
                {/* Clickable link overlay */}
                <Link href={`/product/${product.id}`} className="absolute inset-0 z-[5]" />

                {/* Primary image */}
                <img
                    src={product.image}
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{
                        opacity: hovered ? 0 : 1,
                        transform: hovered ? 'scale(1.07)' : 'scale(1)',
                        transition: 'opacity 0.5s ease, transform 0.6s ease',
                    }}
                />
                {/* Secondary image */}
                {product.image2 && (
                    <img
                        src={product.image2}
                        alt={product.name}
                        className="absolute inset-0 w-full h-full object-cover"
                        style={{
                            opacity: hovered ? 1 : 0,
                            transform: hovered ? 'scale(1.04)' : 'scale(1.08)',
                            transition: 'opacity 0.55s ease, transform 0.65s ease',
                        }}
                    />
                )}


                {/* Tile grid pattern */}
                <div
                    className="absolute inset-0 opacity-10 pointer-events-none"
                    style={{
                        backgroundImage:
                            'linear-gradient(rgba(0,0,0,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.15) 1px, transparent 1px)',
                        backgroundSize: '40px 40px',
                    }}
                />
                {/* Gloss highlight */}
                <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-white/12 to-transparent pointer-events-none" />
                {/* Bottom fade into card */}
                <div
                    className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none bg-gradient-to-t from-background/70 to-transparent"
                />

                {/* Out of stock */}
                {!product.inStock && (
                    <div className="absolute inset-0 bg-background/50 flex items-center justify-center z-10 backdrop-blur-[2px]">
                        <span className="text-foreground/50 text-xs px-3 py-1.5 rounded-full border border-border/50 bg-background/80">
                            Out of Stock
                        </span>
                    </div>
                )}

                {/* WhatsApp quick share (top-right on hover) */}
                <motion.a
                    href={waProductLink(product)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    title="Order via WhatsApp"
                    className="absolute top-3 right-3 bg-[#25d366] text-white p-2 rounded-full shadow-lg z-20"
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={hovered ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.7 }}
                    transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ scale: 1.12 }}
                    whileTap={{ scale: 0.92 }}
                >
                    <WhatsAppIcon className="w-4 h-4" />
                </motion.a>

                {/* Size badge */}
                <span
                    className="absolute bottom-3 right-3 text-xs px-2.5 py-1 rounded-lg font-mono z-10 backdrop-blur-sm border border-border text-foreground/80 bg-background/80 shadow-sm"
                >
                    {product.size}
                </span>

                {/* Quick Add overlay */}
                <motion.div
                    className="absolute inset-0 z-20 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={hovered ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    style={{ pointerEvents: hovered ? 'auto' : 'none', background: 'rgba(255,255,255,0.1)' }}
                >
                    <motion.button
                        onClick={handleAddToCart}
                        disabled={!product.inStock}
                        className="bg-[#25d366] text-white hover:bg-[#1fb859] px-7 py-3 rounded-full text-sm font-black shadow-2xl disabled:opacity-40 disabled:cursor-not-allowed pointer-events-auto transition-colors"
                        initial={{ y: 10, scale: 0.9 }}
                        animate={hovered ? { y: 0, scale: 1 } : { y: 10, scale: 0.9 }}
                        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                        whileHover={{ scale: 1.06, opacity: 0.9 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Quick Add
                    </motion.button>
                </motion.div>
            </div>
        </motion.div>
    );
}
