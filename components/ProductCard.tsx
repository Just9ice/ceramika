'use client';

import { Product } from '@/lib/data';
import { useRef, useState } from 'react';

import Link from 'next/link';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, sourceEl?: HTMLElement | null) => void;
}

const TAG_STYLES: Record<string, { bg: string; color: string; border: string }> = {
  Bestseller: { bg: 'rgba(200,169,110,0.12)', color: 'var(--color-accent)', border: 'rgba(200,169,110,0.3)' },
  New:    { bg: 'rgba(59,130,246,0.12)', color: '#3b82f6', border: 'rgba(59,130,246,0.3)' },
  Premium:  { bg: 'rgba(168,85,247,0.12)', color: '#a855f7', border: 'rgba(168,85,247,0.3)' },
  Luxury:   { bg: 'rgba(212,175,55,0.12)', color: '#d4af37', border: 'rgba(212,175,55,0.3)' },
  Sale:    { bg: 'rgba(239,68,68,0.12)',  color: '#ef4444', border: 'rgba(239,68,68,0.3)'  },
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
      className="group flex flex-col h-full w-full relative overflow-hidden border border-border bg-card shadow-sm"
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

      {/* ── Tile swatch / image (now on top) ───────────────── */}
      <div
        ref={imageRef}
        className="relative w-full aspect-[4/5] overflow-hidden bg-muted"
      >
        {/* Clickable link overlay */}
        <Link href={`/product/${product.id}`} className="absolute inset-0 z-[5]" />

        {/* Primary image */}
        <img
          src={product.image}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-in-out"
          style={{ transform: hovered ? 'scale(1.05)' : 'scale(1)' }}
        />
        {/* Secondary image (fade in on hover) */}
        {product.image2 && (
          <img
            src={product.image2}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out"
            style={{ opacity: hovered ? 1 : 0 }}
          />
        )}

        {/* Out of stock badge */}
        {!product.inStock && (
          <div className="absolute top-3 left-3 bg-background/90 backdrop-blur-sm px-2 py-1 flex items-center justify-center z-10 border border-border">
            <span className="text-foreground/70 text-[10px] uppercase font-semibold tracking-widest">
              Sold Out
            </span>
          </div>
        )}

        {/* Tag badge (Top right) */}
        {product.tag === 'Sale' && tagStyle && (
          <div className="absolute top-3 right-3 bg-red-50 px-2 py-1 z-10 border border-red-100">
            <span className="text-red-600 text-[10px] uppercase font-semibold tracking-widest">
              Sale
            </span>
          </div>
        )}

        {/* Quick Add overlay */}
        <motion.div
          className="absolute bottom-3 left-3 right-3 z-20 flex"
          initial={{ opacity: 0, y: 10 }}
          animate={hovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.2 }}
        >
          <motion.button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="w-full bg-foreground text-background py-3 text-xs font-semibold tracking-widest uppercase disabled:opacity-40 transition-colors hover:bg-[#a68038]"
            whileTap={{ scale: 0.98 }}
          >
            {addedFlash ? '✓ Added' : 'Quick Add'}
          </motion.button>
        </motion.div>
      </div>

      {/* ── Info section (now at bottom) ────────────────────── */}
      <div className="p-4 flex flex-col flex-grow bg-card">
        <Link href={`/product/${product.id}`} className="group-hover:opacity-80 transition-opacity">
          <h3 className="font-serif text-lg text-foreground mb-1">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-muted-foreground text-xs mb-3 font-sans">
          {product.size}
        </p>

        <div className="flex items-center mt-auto">
          <span className="text-foreground font-sans text-sm font-semibold">
            ₦{product.pricePerSqm.toLocaleString()} / sqm
          </span>
        </div>
      </div>
    </motion.div>
  );
}
