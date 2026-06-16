'use client';

import { useState, use } from "react";
import { PRODUCTS, CartItem, waProductLink, waGeneralLink } from "@/lib/data";
import Navbar from "@/components/navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import CartDrawer from "@/components/CartDrawer";
import ProductCard from "@/components/ProductCard";
import PageHero from "@/components/PageHero";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import StarRating from "@/components/ui/StarRating";
import Link from "next/link";
import { Truck, Plane, Package, Store } from "lucide-react";

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const product = PRODUCTS.find((p) => p.id === Number(resolvedParams.id));

  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [sqm, setSqm] = useState(10);
  const [addedFlash, setAddedFlash] = useState(false);
  const [activeTab, setActiveTab] = useState<"details" | "calculator" | "delivery">("details");
  // Calculator state
  const [calcL, setCalcL] = useState("");
  const [calcW, setCalcW] = useState("");
  const [calcRes, setCalcRes] = useState<{
    sqm: number; withWaste: number; cartons: number; total: number;
  } | null>(null);

  if (!product) {
    return (
      <div
        className="min-h-screen bg-[#0f1a12] flex items-center justify-center"
      >
        <div className="text-center">
          <p className="text-white/30 text-lg mb-4">Product Not Found</p>
          <Link href="/by-room" className="text-[#a68038] hover:underline text-sm">
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
    <div className="min-h-screen bg-[#0f1a12]">
      <Navbar cartCount={cart.length} onCartOpen={() => setCartOpen(true)} />
      
      <PageHero
        label={`${product.material} • ${product.finish}`}
        title={product.name}
        subtitle={product.description}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs mb-8 text-white/25">
          <Link href="/" className="hover:text-[#a68038] transition-colors">Home</Link>
          <span className="text-white/10">/</span>
          <Link href="/by-room" className="hover:text-[#a68038] transition-colors">By Room</Link>
          <span className="text-white/10">/</span>
          <Link href={`/by-room?filter=${product.room.toLowerCase()}`} className="hover:text-[#a68038] transition-colors">{product.room}</Link>
          <span className="text-white/10">/</span>
          <span className="text-white/50">{product.name}</span>
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
                    "linear-gradient(rgba(0, 0, 0, 0.5) 1p, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.15) 1px, transparent 1px)",
                  backgroundSize: "60px 60px",
                }}
              />
              {/* Gloss */}
              <div className="absolute inset-0 top-0 left-0 right-0 h-1/3 bg-gradient-to-br from-white/20 via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {product.tag && (
                <span
                  className="absolute top-4 left-4 text-xs font-black tracking-widest uppercase px-3 py-1.5 rounded-full bg-[#0f1a12]/80 backdrop-blur-sm"
                  style={{ color: product.accent }}
                >
                  {product.tag}
                </span>
              )}

              {!product.inStock && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <span className="text-white/60 text-sm font-bold tracking-widest uppercase bg-black/50 px-4 py-2 rounded-full">
                    Out of Stock
                  </span>
                </div>
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
                  className={`relative h-16 rounded-lg bg-gradient-to-br ${item.bg} border border-white/10 cursor-pointer hover:border-[#a68038] transition-colors overflow-hidden`}
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
            <p
              className="text-white/30 text-xs uppercase tracking-widest mb-2"
            >
              {product.material} · {product.finish}
            </p>
            <h1
              className="text-white font-black leading-tight mb-3"
              style={{
                fontFamily: "'Georgia', serif", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)"
              }}
            >
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <StarRating rating={product.rating} />
              <span
                className="text-white/40 text-sm"
              >
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>

            {/* Description */}
            <p
              className="text-white/60 text-sm leading-relaxed mb-6"
            >
              {product.description}
            </p>

            {/* Specs grid */}
            <div className="grid grid-cols-3 gap-2 mb-6">
              {[
                {
                  label: "Material",
                  value: product.material
                },
                {
                  label: "Finish",
                  value: product.finish
                },
                {
                  label: "Room",
                  value: product.room
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
                  value: product.inStock ? "In Stock" : "Out of Stock"
                },
              ].map((s) => (
                <div
                  key={s.label}
                  className="bg-[#141e16] border border-white/5 rounded-xl p-3"
                >
                  <p className="text-white/25 text-xs uppercase tracking-widest mb-0.5">{s.label}</p>
                  <p className="text-white/70 text-sm font-semibold">{s.value}</p>
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
              <span className="text-white/30 text-sm ml-2">per sqm</span>
            </div>

            {/* SQM selector + Add to cart */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <label className="text-white/40 text-xs uppercase tracking-widest whitespace-nowrap">
                  SQM needed:
                </label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSqm(Math.max(5, sqm - 5))}
                    className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 text-white/60 hover:text-white font-bold flex items-center justify-center"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={sqm}
                    onChange={(e) => setSqm(Number(e.target.value))}
                    className="w-16 text-center bg-white/5 border border-white/10 rounded-lg px-2 py-1.5 text-white text-sm font-semibold text-center focus:outline-none focus:border-[#a68038] "
                  />
                  <button
                    onClick={() => setSqm(sqm + 5)}
                    className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 text-white/60 hover:text-white font-bold flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
                <span className="text-white/20 text-xs">
                  = {Math.ceil(sqm / product.cartonSqm)} cartons
                </span>
              </div>

              <div className="text-[#a68038] text-sm font-semibold">
                Subtotal: ₦{(sqm * product.pricePerSqm).toLocaleString()}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={addToCart}
                  disabled={!product.inStock}
                  className={`flex-1 py-4 font-black text-sm tracking-widest uppercase rounded-xl transition-all ${addedFlash
                    ? "bg-[#25d366] text-white"
                    : product.inStock
                      ? "bg-[#c8a96e] hover:bg-[#d4b87e] text-[#0f1a12] hover:scale-[1.02]"
                      : "bg-white/5 text-white/20 cursor-not-allowed"
                    }`}
                >
                  {addedFlash ? "✓ Added" : product.inStock ? "Add to Cart" : "Out of Stock"}
                </button>

                <a
                  href={waProductLink(product)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-4 bg-[#25d366]/50 text-[#25d366] font-bold text-sm rounded-xl transition-all whitespace-nowrap"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  Order via WhatsApp
                </a>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-2 mt-1">
                {[
                  "✓ Free delivery quote",
                  "✓ WhatsApp updates",
                  "✓ 14-day returns",
                  "✓ Secure payment"
                ].map((b) => (
                  <span
                    key={b}
                    className="text-xs text-white/25 borer border-white/5 rounded-full px-3 py-1"
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs: Details / Calculator / Delivery */}
        <div className="border-b border-white/10 mb-8">
          <div className="flex gap-0">
            {(["details", "calculator", "delivery"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3.5 text-sm font-semibold capitalize border-b-2 transition-all ${activeTab === tab
                  ? "border-[#a68038] text-[#a68038] "
                  : "border-transparent text-white/30 hover:text-white/60"
                  }`}
              >
                {tab === "calculator" ? "SQM Calculator" : tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Details tab */}
        {activeTab === "details" && (
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div>
              <h3 className="text-white font-bold text-sm mb-4 uppercase tracking-widest">Technical Specs</h3>
              <table className="w-full text-sm">
                <tbody>
                  {[
                    ["Material", product.material],
                    ["Finish", product.finish],
                    ["Size", product.size],
                    ["Room Use", product.room],
                    ["Sqm/Carton", `${product.cartonSqm} sqm`],
                    ["Rating", `${product.rating} / 5.0`],
                  ].map(([key, val]) => (
                    <tr key={key} className="border-b border-white/5">
                      <td className="py-2.5 text-white/30 w-1/2">{key}</td>
                      <td className="py-2.5 text-white/70 font-medium">{val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div>
              <h3 className="text-white font-bold text-sm mb-4 uppercase tracking-widest">Care & Maintenance</h3>
              <ul className="flex flex-col gap-3 text-sm text-white/45 leading-relaxed">
                <li className="flex gap-2"><span className="text-[#a68038] shrink-0">✓</span> Sweep or vacuum regularly to remove grit and dust.</li>
                <li className="flex gap-2"><span className="text-[#a68038] shrink-0">✓</span> Mop with a pH-neutral cleaner — avoid harsh acids or bleach.</li>
                <li className="flex gap-2"><span className="text-[#a68038] shrink-0">✓</span> Wipe spills immediately to prevent staining.</li>
                <li className="flex gap-2"><span className="text-[#a68038] shrink-0">✓</span> Use felt pads under furniture to prevent scratching.</li>
                {product.material === "Marble" || product.material === "Granite" ? (
                  <li className="flex gap-2"><span className="text-[#a68038] shrink-0">✓</span> Seal annually with a penetrating stone sealer.</li>
                ) : null}
              </ul>
            </div>
          </div>
        )}

        {/* SQM Calculator tab */}
        {activeTab === "calculator" && (
          <div className="max-w-lg mb-16">
            <p className="text-white/40 text-sm mb-6">
              Enter your room dimensions and we&apos;ll calculate how many cartons of{" "}
              <span className="text-white">{product.name}</span> you need, including a 10% wastage buffer.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-4">
              {[
                { label: "Room Length (m)", val: calcL, set: setCalcL, ph: "e.g. 5" },
                { label: "Room Width (m)", val: calcW, set: setCalcW, ph: "e.g. 4" },
              ].map((f) => (
                <div key={f.label}>
                  <label className="text-white/30 text-xs uppercase tracking-widest block mb-2">{f.label}</label>
                  <input
                    type="number"
                    value={f.val}
                    onChange={(e) => f.set(e.target.value)}
                    placeholder={f.ph}
                    className="w-full bg-[#141e16] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-[#a68038] text-sm"
                  />
                </div>
              ))}
            </div>

            <div className="bg-[#141e16] border border-white/5 rounded-xl p-3 mb-4 text-sm">
              <span className="text-white/30">Using: </span>
              <span className="text-white/60">{product.name}</span>
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
                    className={`rounded-xl p-4 ${r.hi ? "bg-[#c8a96e]/10 border border-[#a68038] " : "bg-[#141e16] border border-white/5"
                      }`}
                  >
                    <p className="text-white/30 text-xs mb-1">{r.label}</p>
                    <p className={`font-black text-lg ${r.hi ? "text-[#a68038] " : "text-white"}`}>{r.value}</p>
                  </div>
                ))}

                {calcRes && (
                  <div className="col-span-2">
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
        )}

        {/* Delivery tab */}
        {activeTab === "delivery" && (
          <div className="grid sm:grid-cols-2 gap-4 mb-16 max-w-2xl">
            {[
              {
                Icon: Truck,
                title: "Lagos Delivery",
                detail: "1–3 business days",
                info: "Direct van delivery to your site or home. Driver calls 1 hour before arrival.",
              },
              {
                Icon: Plane,
                title: "Abuja Delivery",
                detail: "2–4 business days",
                info: "Logistics partner delivers to your address. Tracking number provided.",
              },
              {
                Icon: Package,
                title: "Other States",
                detail: "3–7 business days",
                info: "We deliver to all 36 states via our nationwide logistics partners.",
              },
              {
                Icon: Store,
                title: "Showroom Pickup",
                detail: "Same day (if in stock)",
                info: "Pick up from our Victoria Island showroom. Free, immediate. Bring your order number.",
              },
            ].map((d) => (
              <div key={d.title} className="bg-[#141e16] border border-white/5 rounded-xl p-5">
                <div className="mb-3"><d.Icon className="w-6 h-6 text-[#a68038] " /></div>
                <h4 className="text-white font-bold text-sm">{d.title}</h4>
                <p className="text-[#a68038] text-sm font-semibold mt-0.5 mb-2">{d.detail}</p>
                <p className="text-white/35 text-xs leading-relaxed">{d.info}</p>
              </div>
            ))}
          </div>
        )}

        {/* ── Related products ── */}
        {related.length > 0 && (
          <div className="border-t border-white/5 pt-12">
            <h2 className="text-white font-black text-2xl mb-6" style={{ fontFamily: "'Georgia', serif" }}>
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

