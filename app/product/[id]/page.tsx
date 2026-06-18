'use client';

import { useState, use } from "react";
import { PRODUCTS, CartItem, waProductLink, waGeneralLink } from "@/lib/data";
import Navbar from "@/components/navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import CartDrawer from "@/components/CartDrawer";
import ProductCard from "@/components/ProductCard";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import Link from "next/link";

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const product = PRODUCTS.find((p) => p.id === Number(resolvedParams.id));

  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [sqm, setSqm] = useState(10);
  const [addedFlash, setAddedFlash] = useState(false);
  
  // Calculator state
  const [calcL, setCalcL] = useState("");
  const [calcW, setCalcW] = useState("");
  const [calcRes, setCalcRes] = useState<{
    sqm: number; withWaste: number; cartons: number; total: number;
  } | null>(null);

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground text-lg mb-4">Product Not Found</p>
          <Link href="/shop" className="text-[#a68038] hover:underline text-sm">
            ← Browse All Tiles
          </Link>
        </div>
      </div>
    );
  }

  function addToCart() {
    setCart((prev) => {
      const ex = prev.find((i) => i.id === product!.id);
      if (ex) return prev.map((i) => (i.id === product!.id ? { ...i, sqm: i.sqm + sqm } : i));
      return [...prev, { ...product!, sqm }];
    });
    setAddedFlash(true);
    setTimeout(() => setAddedFlash(false), 2500);
    setCartOpen(true);
  }

  function runCalc() {
    const l = parseFloat(calcL);
    const w = parseFloat(calcW);
    if (!l || !w) return;

    const base = l * w;
    const withWaste = base * 1.1;
    const cartons = Math.ceil(withWaste / product!.cartonSqm);
    const total = withWaste * product!.pricePerSqm
    setCalcRes({ sqm: base, withWaste, cartons, total });
  }

  const related = PRODUCTS.filter(
    (p) => p.id !== product.id && (p.room === product.room || p.material === product.material)
  ).slice(0, 4);

  const isDarkSwatch =
    product.gradient.includes("zinc-8") ||
    product.gradient.includes("neutral-7") ||
    product.gradient.includes("yellow-7");

  return (
    <div className="min-h-screen bg-background pt-24">
      <Navbar cartCount={cart.length} onCartOpen={() => setCartOpen(true)} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16 pt-8">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs mb-8 text-muted-foreground">
          <Link href="/" className="hover:text-[#a68038] transition-colors">Home</Link>
          <span className="text-border">/</span>
          <Link href="/shop" className="hover:text-[#a68038] transition-colors">Shop</Link>
          <span className="text-border">/</span>
          <span className="text-foreground/70">{product.name}</span>
        </nav>

        {/* Product Hero Grid */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">

          {/* LEFT -Tile swatch + thumbnails */}
          <div className="flex flex-col gap-3">
            {/* Main swatch */}
            <div
              className={`relative rounded-2xl overflow-hidden h-80 sm:h-[420px] bg-gradient-to-br ${product.gradient}`}
            >
              {product.image && (
                <img
                  src={product.image}
                  alt={product.name}
                  className="absolute top-0 left-0 w-full h-full object-cover z-0"
                />
              )}
              {/* Title grid overlay */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(0, 0, 0, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.15) 1px, transparent 1px)",
                  backgroundSize: "60px 60px",
                }}
              />
              {/* Gloss */}
              <div className="absolute inset-0 top-0 left-0 right-0 h-1/3 bg-gradient-to-br from-white/20 via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {product.tag && (
                <span
                  className="absolute top-4 left-4 text-xs font-black tracking-widest uppercase px-3 py-1.5 rounded-full bg-background/80 backdrop-blur-sm"
                  style={{ color: product.accent }}
                >
                  {product.tag}
                </span>
              )}

              {/* WhatsApp Share */}
              <a
                href={waProductLink(product)}
                className="absolute top-4 right-4 z-10 bg-[#25d366] text-white p-2.5 rounded-full hover:scale-110 transition-all shadow-lg"
                title="Share via WhatsApp"
              >
                <WhatsAppIcon className="w-4 h-4" />
              </a>

              {/* Size Label */}
              <span
                className={`absolute bottom-4 right-4 text-sm px-3 py-1.5 rounded-lg font-mono border ${isDarkSwatch
                  ? "bg-white/10 text-white/50 border-white/20"
                  : "bg-black/10 text-black/50 border-black/20"
                  }`}
              >
                {product.size}
              </span>
            </div>

            {/* Mini preview swatches (room scene suggestions) */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { bg: "from-stone-100 to-stone-200", img: product.image },
                { bg: "from-white to-slate-50", img: product.image2 },
                { bg: product.gradient, img: undefined },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`relative h-16 rounded-lg bg-gradient-to-br ${item.bg} border border-border cursor-pointer hover:border-[#a68038] transition-colors overflow-hidden`}
                >
                  {item.img && (
                    <img src={item.img} alt={`${product.name} view ${i+1}`} className="relative z-0 w-full h-full object-cover" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT - Product Info */}
          <div className="flex flex-col">
            <h1
              className="text-foreground font-black leading-tight mb-4"
              style={{
                fontFamily: "'Georgia', serif", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)"
              }}
            >
              {product.name}
            </h1>

            {/* Description */}
            <p
              className="text-muted-foreground text-sm leading-relaxed mb-6"
            >
              {product.description}
            </p>

            {/* Specs grid */}
            <div className="grid grid-cols-3 gap-2 mb-6">
              {[
                {
                  label: "Effects",
                  value: product.finish
                },
                {
                  label: "Size",
                  value: product.size
                },
                {
                  label: "Sqm/Carton",
                  value: `${product.cartonSqm} sqm`
                },
                {
                  label: "Stock",
                  value: product.inStock,
                  isStock: true
                },
              ].map((s) => (
                <div
                  key={s.label}
                  className="bg-card border border-border rounded-xl p-3"
                >
                  <p className="text-muted-foreground/70 text-xs uppercase tracking-widest mb-0.5">{s.label}</p>
                  {s.isStock ? (
                      <p className="text-foreground text-sm font-semibold flex items-center gap-2">
                         <span className={`w-2 h-2 rounded-full ${s.value ? 'bg-green-500' : 'bg-red-500'}`}></span>
                         {s.value ? "In Stock" : "Out of Stock"}
                      </p>
                  ) : (
                    <p className="text-foreground text-sm font-semibold">{s.value as string}</p>
                  )}
                </div>
              ))}
            </div>

            {/* Price */}
            <div className="mb-6">
              <span
                className="text-[#a68038] font-black"
                style={{
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  fontFamily: "'Georgia', serif"
                }}
              >
                ₦{product.pricePerSqm.toLocaleString()}
              </span>
              <span className="text-muted-foreground text-sm ml-2">per sqm</span>
            </div>

            {/* SQM selector + Add to cart */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <label className="text-muted-foreground text-xs uppercase tracking-widest whitespace-nowrap">
                  SQM needed:
                </label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSqm(Math.max(5, sqm - 5))}
                    className="w-8 h-8 rounded-lg bg-muted border border-border text-foreground hover:bg-muted/80 font-bold flex items-center justify-center"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={sqm}
                    onChange={(e) => setSqm(Number(e.target.value))}
                    className="w-16 text-center bg-card border border-border rounded-lg px-2 py-1.5 text-foreground text-sm font-semibold focus:outline-none focus:border-[#a68038] "
                  />
                  <button
                    onClick={() => setSqm(sqm + 5)}
                    className="w-8 h-8 rounded-lg bg-muted border border-border text-foreground hover:bg-muted/80 font-bold flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
                <span className="text-muted-foreground text-xs">
                  = {Math.ceil(sqm / product.cartonSqm)} cartons
                </span>
              </div>

              <div className="text-[#a68038] text-sm font-semibold">
                Subtotal: ₦{(sqm * product.pricePerSqm).toLocaleString()}
              </div>

              <div className="flex gap-3 mt-2">
                <button
                  onClick={addToCart}
                  disabled={!product.inStock}
                  className={`flex-1 py-4 font-black text-sm tracking-widest uppercase rounded-xl transition-all ${addedFlash
                    ? "bg-[#25d366] text-white"
                    : product.inStock
                      ? "bg-[#c8a96e] hover:bg-[#d4b87e] text-[#0f1a12] hover:scale-[1.02]"
                      : "bg-muted text-muted-foreground cursor-not-allowed"
                    }`}
                >
                  {addedFlash ? "✓ Added" : product.inStock ? "Add to Cart" : "Out of Stock"}
                </button>

                <a
                  href={waProductLink(product)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-4 bg-[#25d366]/10 hover:bg-[#25d366]/20 border border-[#25d366]/20 text-[#25d366] font-bold text-sm rounded-xl transition-all whitespace-nowrap"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  Order via WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* SQM Calculator Section */}
        <div className="max-w-lg mb-16 pt-8 border-t border-border">
            <h3 className="text-foreground font-black text-xl mb-4" style={{ fontFamily: "'Georgia', serif" }}>
                SQM Calculator
            </h3>
            <p className="text-muted-foreground text-sm mb-6">
              Enter your room dimensions and we&apos;ll calculate how many cartons of{" "}
              <span className="text-foreground font-medium">{product.name}</span> you need, including a 10% wastage buffer.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-4">
              {[
                { label: "Room Length (m)", val: calcL, set: setCalcL, ph: "e.g. 5" },
                { label: "Room Width (m)", val: calcW, set: setCalcW, ph: "e.g. 4" },
              ].map((f) => (
                <div key={f.label}>
                  <label className="text-muted-foreground text-xs uppercase tracking-widest block mb-2">{f.label}</label>
                  <input
                    type="number"
                    value={f.val}
                    onChange={(e) => f.set(e.target.value)}
                    placeholder={f.ph}
                    className="w-full bg-card border border-border rounded-xl px-4 py-3 text-foreground placeholder-muted-foreground/50 focus:outline-none focus:border-[#a68038] text-sm"
                  />
                </div>
              ))}
            </div>

            <div className="bg-card border border-border rounded-xl p-3 mb-4 text-sm mt-6">
              <span className="text-muted-foreground">Using: </span>
              <span className="text-foreground font-medium">{product.name}</span>
              <span className="text-[#a68038] ml-2 font-bold">₦{product.pricePerSqm.toLocaleString()}/sqm</span>
            </div>

            <button
              onClick={runCalc}
              className="w-full py-4 bg-[#c8a96e] hover:bg-[#d4b87e] text-[#0f1a12] font-black text-sm tracking-widest uppercase rounded-xl transition-all hover:scale-[1.02] mb-4"
            >
              Calculate
            </button>

            {calcRes && (
              <div className="grid grid-cols-2 gap-3 mb-6">
                {[
                  { label: "Base Area", value: `${calcRes.sqm.toFixed(2)} sqm`, hi: false },
                  { label: "With 10% Waste", value: `${calcRes.withWaste.toFixed(2)} sqm`, hi: true },
                  { label: "Cartons", value: `${calcRes.cartons} cartons`, hi: false },
                  { label: "Total Cost", value: `₦${calcRes.total.toLocaleString("en-NG", { maximumFractionDigits: 0 })}`, hi: true },
                ].map((r) => (
                  <div
                    key={r.label}
                    className={`rounded-xl p-4 ${r.hi ? "bg-[#c8a96e]/10 border border-[#a68038] " : "bg-card border border-border"
                      }`}
                  >
                    <p className="text-muted-foreground text-xs mb-1">{r.label}</p>
                    <p className={`font-black text-lg ${r.hi ? "text-[#a68038] " : "text-foreground"}`}>{r.value}</p>
                  </div>
                ))}

                {calcRes && (
                  <div className="col-span-2 mt-4">
                    <a
                      href={waGeneralLink(
                        `Hello CeramiKa! I used your calculator and I need ${calcRes.cartons} cartons of ${product.name} (${calcRes.withWaste.toFixed(1)} sqm). Total: ₦${calcRes.total.toLocaleString("en-NG", { maximumFractionDigits: 0 })}. Can you confirm availability?`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-3.5 bg-[#25d366] hover:bg-[#1fb859] text-white font-bold text-sm rounded-xl transition-all"
                    >
                      <WhatsAppIcon className="w-4 h-4" />
                      Order {calcRes.cartons} Cartons via WhatsApp
                    </a>
                  </div>
                )}
              </div>
            )}
        </div>

        {/* ── Related products ── */}
        {related.length > 0 && (
          <div className="border-t border-border pt-12">
            <h2 className="text-foreground font-black text-2xl mb-6" style={{ fontFamily: "'Georgia', serif" }}>
              You Might Also Like
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} onAddToCart={(prod) => {
                  setCart((prev) => {
                    const ex = prev.find((i) => i.id === prod.id);
                    if (ex) return prev.map((i) => (i.id === prod.id ? { ...i, sqm: i.sqm + 10 } : i));
                    return [...prev, { ...prod, sqm: 10 }];
                  });
                }} />
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
      <FloatingWhatsApp />

      {cartOpen && (
        <CartDrawer
          items={cart}
          onClose={() => setCartOpen(false)}
          onRemove={(id) => setCart((p) => p.filter((i) => i.id !== id))}
        />
      )}
    </div>
  )
}
