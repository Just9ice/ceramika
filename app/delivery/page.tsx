'use client';

import { useState } from "react";

import Navbar from "@/components/navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { waGeneralLink } from "@/lib/data";
import { Truck, Package, Plane, Store } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Delivery Options

const DELIVERY_OPTIONS = [
  {
    icon: Truck,
    zone: "Lagos",
    tag: "Fastest",
    tagColor: "#c8a96e",
    details: [
      "Direct van delivery to your site, home, or office.",
      "Driver calls 1 hour before arrival",
      "Available Island and Mainland",
      "Bulky orders may require ground-floor or site access.",
    ],
    fee: "Quoted at order - based on quantity and location.",
  },
  {
    icon: Plane,
    zone: "Abuja (FCT)",
    tag: "Popular",
    tagColor: "#c8a96e",
    details: [
      "Logistics partners deliver to your address",
      "Tracking number provided after dispatch",
      "Delivery to Maitama, Asokoro, Gwarinpa, Garki, Wuse, and surrounding areas.",
      "Large orders may be split across multiple trips.",
    ],
    fee: "Quoted at confirmation.",
  },
  {
    icon: Package,
    zone: "Other States",
    tag: "Nationwide",
    tagColor: "#c8a96e",
    details: [
      "Secure delivery to your site, home, or office.",
      "Tracking updates provided",
      "Available for bulk orders",
    ],
    fee: "Quoted at order - based on quantity and location.",
  },
  {
    icon: Store,
    zone: "Showroom Pickup",
    tag: "Free",
    tagColor: "#25d366",
    details: [
      "Pick up your order from our showroom in Lagos.",
      "No delivery fees.",
      "View your tiles before you leave",
      "Bring your order number or WhatsApp confirmation",
      "Open Monday - Friday, 8am - 5pm",
    ],
    fee: "Free - no delivery charge.",
  },
];

// State Coverage list

const STATES = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa",
  "Benue", "Borno", "Cross River", "Delta", "Ebonyi", "Edo",
  "Ekiti", "Enugu", "FCT (Abuja)", "Gombe", "Imo", "Jigawa",
  "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara",
  "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun",
  "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara",
];

// FAQs

const DELIVERY_FAQS = [
  {
    q: "When does the delivery timer start?",
    a: "The delivery timeline starts from the date of dispatch - not the date of order. We dispach after confirming full payment. For bank transfers, dispatch begins once payment clears in our account.",
  },
  {
    q: "How will I know when my order has been dispatched?",
    a: "We send WhatsApp message with dispatch confirmation as soon as your order leaves our warehouse. For interstate deliveries, we include the logistics agent's contact details so you can track your delivery.",
  },
  {
    q: "What if I'm not available at the delivery address?",
    a: "Our driver will call your number before arriving. If you're unavailable, we'll attempt to rearrange deliver. A re-delivery fee may apply for repeated missed deliveries.",
  },
  {
    q: "Can we deliver to my construction site?",
    a: "Ues, we do site deliveries across Lagos and Abuja. Please ensure site access is available for a delivery vehicle. Let us know at order time if the site is above ground level or if a crane access is required.",
  },
  {
    q: "Do you offer same-day delivery?",
    a: "Same-day delivery is available for those in Lagos and environs. But fees may be applied."
  },
  {
    q: "What happens if tiles arrive broken?",
    a: "Photograph the packaging and damaged tiles immediately and contact us on WhatsApp within 48 hours. See our Returns Policy for full details on transit damage claims."
  },
  {
    q: "Do you ship outside of Nigeria?",
    a: "We currently only deliver within the shores of Nigeria. For international enquires, please contact us directly to discuss options.",
  },
];

// FAQ Bento Grid

// Bento layout config: each card gets a col/row span to create an asymmetric premium grid
const BENTO_CONFIG = [
  { colSpan: "lg:col-span-2", rowSpan: "" },  // 0 — wide
  { colSpan: "lg:col-span-1", rowSpan: "" },  // 1
  { colSpan: "lg:col-span-1", rowSpan: "" },  // 2
  { colSpan: "lg:col-span-2", rowSpan: "" },  // 3 — wide
  { colSpan: "lg:col-span-1", rowSpan: "" },  // 4
  { colSpan: "lg:col-span-1", rowSpan: "" },  // 5
  { colSpan: "lg:col-span-3", rowSpan: "" },  // 6 — full-width
];

function FAQBento() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-muted/20 border-t border-border py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[#a68038] text-xs tracking-[0.2em] uppercase mb-3">
            Common Questions
          </p>
          <h2
            className="text-foreground font-black text-4xl sm:text-5xl leading-none"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            Delivery
            <br />
            <span
              className="text-transparent [-webkit-text-stroke:1px_#a68038] ,169,110,0.5)]" 
            >
              FAQs
            </span>
          </h2>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {DELIVERY_FAQS.map((faq, i) => {
            const cfg = BENTO_CONFIG[i] ?? { colSpan: "lg:col-span-1", rowSpan: "" };
            const isOpen = openIndex === i;

            return (
              <motion.div
                key={faq.q}
                className={`group relative overflow-hidden rounded-3xl border cursor-pointer
                  ${cfg.colSpan} ${cfg.rowSpan}
                  ${isOpen
                    ? "border-[#a68038] bg-card"
                    : "border-border bg-card hover:border-border"
                  }`}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.55,
                  delay: i * 0.07,
                  ease: [0.22, 1, 0.36, 1],
                }}
                onClick={() => setOpenIndex(isOpen ? null : i)}
              >
                {/* Shimmer on hover */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background:
                      "linear-gradient(120deg, transparent 30%, rgba(200,169,110,0.04) 50%, transparent 70%)",
                  }}
                />

                {/* Glow border accent (top edge) */}
                <div
                  className={`absolute top-0 left-6 right-6 h-px transition-opacity duration-300
                    ${isOpen ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(200,169,110,0.6), transparent)",
                  }}
                />

                {/* Index number — decorative */}
                <div
                  className="absolute top-4 right-5 text-6xl font-black leading-none select-none pointer-events-none"
                  style={{
                    fontFamily: "'Georgia', serif",
                    color: "rgba(200,169,110,0.06)",
                    WebkitTextStroke: "1px rgba(200,169,110,0.06)",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>

                {/* Content */}
                <div className="relative p-6 flex flex-col gap-3 h-full">
                  {/* Toggle icon */}
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-foreground font-semibold text-sm leading-snug pr-8">
                      {faq.q}
                    </h3>
                    <motion.div
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="shrink-0 w-6 h-6 rounded-full border border-border flex items-center justify-center mt-0.5"
                      style={{
                        background: isOpen ? "rgba(200,169,110,0.15)" : "rgba(255,255,255,0.03)",
                        borderColor: isOpen ? "rgba(200,169,110,0.3)" : undefined,
                      }}
                    >
                      <span
                        className="text-xs leading-none"
                        style={{ color: isOpen ? "#c8a96e" : "rgba(255,255,255,0.3)" }}
                      >
                        +
                      </span>
                    </motion.div>
                  </div>

                  {/* Expandable answer */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-border pt-3 mt-1">
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            {faq.a}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Collapsed preview */}
                  {!isOpen && (
                    <p className="text-muted-foreground/70 text-xs leading-relaxed line-clamp-2">
                      {faq.a}
                    </p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Animation helpers ────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DeliveryPage() {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar cartCount={0} onCartOpen={() => { }} />

      {/* ══════════════════════════════════════════════════════════════
        HERO
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[92vh] flex flex-col justify-end pb-20 pt-36 overflow-hidden">
        {/* Deep radial background glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(200,169,110,0.10) 0%, transparent 70%)",
          }}
        />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(#c8a96e 1px, transparent 1px), linear-gradient(90deg, #c8a96e 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
        {/* Diagonal accent line */}
        <div
          className="absolute top-0 right-0 w-px h-full opacity-10 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent, #c8a96e, transparent)" }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 w-full">
          {/* Eyebrow */}
          <motion.p
            className="text-[#a68038] text-xs tracking-[0.3em] uppercase mb-5"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            Shipping &amp; Delivery
          </motion.p>

          {/* Headline */}
          <motion.h1
            className="font-black leading-[0.9] mb-8"
            style={{
              fontFamily: "'Georgia', serif",
              fontSize: "clamp(3.2rem, 9vw, 8rem)",
            }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-foreground">Delivery</span>
            <br />
            <span
              className="text-transparent [-webkit-text-stroke:2px_#a68038] ,169,110,0.55)]" 
            >
              Everywhere.
            </span>
          </motion.h1>

          {/* Subtitle + stats row */}
          <div className="flex flex-col lg:flex-row lg:items-end gap-10 lg:gap-20">
            <motion.p
              className="text-muted-foreground text-lg max-w-md leading-relaxed"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              We deliver premium tiles to all 36 Nigerian states. Here&apos;s everything
              you need to know about timelines, fees, and how it works.
            </motion.p>

            {/* Hero stats */}
            <motion.div
              className="flex gap-8 lg:gap-12 shrink-0"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              {[
                { value: "36", label: "States" },
                { value: "1–3", label: "Days (Lagos)" },
                { value: "48h", label: "Claim Window" },
              ].map((s) => (
                <div key={s.label} className="text-center lg:text-left">
                  <div
                    className="font-black text-3xl text-[#a68038] "
                    style={{ fontFamily: "'Georgia', serif" }}
                  >
                    {s.value}
                  </div>
                  <div className="text-muted-foreground text-xs mt-0.5 tracking-wide uppercase">
                    {s.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Scroll cue */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <span className="text-muted-foreground/50 text-[10px] tracking-[0.2em] uppercase">Scroll</span>
          <motion.div
            className="w-px h-10 bg-gradient-to-b from-[#c8a96e]/40 to-transparent"
            animate={{ scaleY: [1, 0.4, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
        HOW IT WORKS — 4 STEPS
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative border-y border-border py-20 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none bg-gradient-to-b from-muted/20 to-background"
          style={{ background: 'var(--gradient-section, transparent)' }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            className="mb-14 text-center"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
          >
            <p className="text-[#a68038] text-xs tracking-[0.25em] uppercase mb-3">Process</p>
            <h2
              className="text-foreground font-black text-4xl"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              How It Works
            </h2>
          </motion.div>

          <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Connecting line (desktop) */}
            <div className="hidden lg:block absolute top-8 left-[12.5%] right-[12.5%] h-px">
              <div
                className="h-full"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(200,169,110,0.2) 20%, rgba(200,169,110,0.2) 80%, transparent)",
                }}
              />
            </div>

            {[
              {
                step: "01",
                title: "Place Your Order",
                desc: "Order via the website cart or send us a WhatsApp message with your tile choice and delivery address.",
              },
              {
                step: "02",
                title: "Confirm & Pay",
                desc: "We confirm stock and send a payment link via Paystack, Flutterwave, or bank transfer.",
              },
              {
                step: "03",
                title: "We Dispatch",
                desc: "Once payment clears we pack your order and hand it to our logistics partners. WhatsApp notification sent.",
              },
              {
                step: "04",
                title: "Delivered to You",
                desc: "Tiles arrive at your door, site, or showroom. Driver calls ahead. You inspect and sign off.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                className="relative flex flex-col items-center lg:items-start text-center lg:text-left"
                variants={fadeUp}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-40px" }}
              >
                {/* Step bubble */}
                <div
                  className="relative w-16 h-16 rounded-full border border-[#a68038] flex items-center justify-center mb-5 shrink-0"
                  style={{ background: "rgba(200,169,110,0.06)" }}
                >
                  <span
                    className="font-black text-sm text-[#a68038] "
                    style={{ fontFamily: "'Georgia', serif" }}
                  >
                    {item.step}
                  </span>
                  {/* outer ring */}
                  <div className="absolute inset-[-6px] rounded-full border border-[#a68038] " />
                </div>
                <h3 className="text-foreground font-bold text-sm mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-xs leading-relaxed max-w-[200px]">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
        DELIVERY ZONES
      ══════════════════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <motion.div
          className="mb-12"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          <p className="text-[#a68038] text-xs tracking-[0.25em] uppercase mb-3">Options</p>
          <h2
            className="text-foreground font-black text-4xl"
            style={{ fontFamily: "'Georgia', serif", lineHeight: 1.15 }}
          >
            Delivery Zones
          </h2>
          <p className="text-muted-foreground text-sm mt-3 max-w-md leading-relaxed">
            Choose the option that fits your location. All fees are quoted at order confirmation.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-5">
          {DELIVERY_OPTIONS.map((opt, i) => {
            const Icon = opt.icon;
            return (
              <motion.div
                key={opt.zone}
                className="group relative overflow-hidden rounded-3xl border border-border bg-card flex flex-col gap-5 p-7 hover:border-border transition-colors duration-300"
                variants={fadeUp}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-40px" }}
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
              >
                {/* Hover glow sweep */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
                  style={{
                    background:
                      "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(200,169,110,0.06) 0%, transparent 80%)",
                  }}
                />
                {/* Top glow line */}
                <div
                  className="absolute top-0 left-8 right-8 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(200,169,110,0.5), transparent)",
                  }}
                />

                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-4">
                    <div
                      className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0"
                      style={{ background: `${opt.tagColor}12`, border: `1px solid ${opt.tagColor}22` }}
                    >
                      <Icon size={20} color={opt.tagColor} />
                    </div>
                    <div>
                      <h3 className="text-foreground font-bold text-base leading-tight">{opt.zone}</h3>
                    </div>
                  </div>
                  <span
                    className="text-xs font-bold px-3 py-1 rounded-full shrink-0 mt-0.5"
                    style={{
                      color: opt.tagColor,
                      background:
                        opt.tagColor === "#25d366"
                          ? "rgba(37,211,102,0.1)"
                          : "rgba(200,169,110,0.1)",
                      border: `1px solid ${opt.tagColor}30`,
                    }}
                  >
                    {opt.tag}
                  </span>
                </div>

                <div className="border-t border-border" />

                {/* Details */}
                <ul className="flex flex-col gap-2.5">
                  {opt.details.map((d) => (
                    <li key={d} className="flex gap-2.5 text-xs text-muted-foreground leading-relaxed">
                      <span className="text-[#a68038] shrink-0 mt-0.5">✓</span>
                      {d}
                    </li>
                  ))}
                </ul>

                {/* Fee chip */}
                <div className="mt-auto rounded-xl bg-muted/30 border border-border px-4 py-3">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">Fee</p>
                  <p className="text-foreground/70 text-sm font-medium">{opt.fee}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Timeline disclaimer */}
        <motion.div
          className="mt-6 flex gap-3 rounded-2xl border border-[#a68038] bg-[#c8a96e]/[0.04] p-5"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <span className="text-[#a68038] shrink-0 mt-0.5 text-base">ℹ</span>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Delays may occur due to public holidays, weather, or logistics capacity. We always notify you via WhatsApp
            if a delay is expected.
          </p>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
        PACKAGING
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative border-y border-border py-20 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none bg-gradient-to-b from-muted/20 to-background"
          style={{ background: 'var(--gradient-section, transparent)' }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Text */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
            >
              <p className="text-[#a68038] text-xs tracking-[0.25em] uppercase mb-4">How We Pack</p>
              <h2
                className="text-foreground font-black text-4xl mb-5"
                style={{ fontFamily: "'Georgia', serif", lineHeight: 1.15 }}
              >
                Packaged for
                <br />
                the Nigerian Road
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed mb-8 max-w-md">
                Tiles are fragile and Nigerian roads can be demanding. Every order leaves our
                warehouse in factory cartons with additional protective wrapping. We&apos;ve built our
                packing process around the reality of interstate logistics.
              </p>
              <ul className="flex flex-col gap-3.5">
                {[
                  "Tiles shipped in original sealed factory cartons.",
                  "Corner protectors on all carton edges for interstate orders.",
                  "Palletised for bulk orders of 50+ sqm to prevent shifting.",
                  "Fragile stickers and handling instructions on every carton.",
                  "Photo of packed order taken before dispatch — available on request.",
                ].map((item, i) => (
                  <motion.li
                    key={item}
                    className="flex gap-3 text-sm text-muted-foreground"
                    variants={fadeUp}
                    custom={i}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                  >
                    <span
                      className="shrink-0 w-5 h-5 rounded-full border border-[#a68038] flex items-center justify-center mt-0.5"
                      style={{ background: "rgba(200,169,110,0.06)" }}
                    >
                      <span className="text-[#a68038] text-[9px]">✓</span>
                    </span>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { stat: "36", label: "States Covered", sub: "All of Nigeria" },
                { stat: "48hr", label: "Claim Window", sub: "Report on WhatsApp" },
                { stat: "100%", label: "WA Tracked", sub: "Updates at every stage" },
              ].map((s, i) => (
                <motion.div
                  key={s.label}
                  className="group relative overflow-hidden bg-card border border-border rounded-2xl p-6 text-center hover:border-border transition-colors"
                  variants={fadeUp}
                  custom={i}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-30px" }}
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                    style={{
                      background:
                        "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(200,169,110,0.07) 0%, transparent 80%)",
                    }}
                  />
                  <div
                    className="text-[#a68038] font-black text-4xl mb-1"
                    style={{ fontFamily: "'Georgia', serif" }}
                  >
                    {s.stat}
                  </div>
                  <p className="text-foreground/70 text-sm font-medium">{s.label}</p>
                  <p className="text-muted-foreground/70 text-xs mt-0.5">{s.sub}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
        STATE COVERAGE
      ══════════════════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <motion.div
          className="mb-10"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          <p className="text-[#a68038] text-xs tracking-[0.25em] uppercase mb-3">Coverage</p>
          <h2
            className="text-foreground font-black text-4xl"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            All 36 States.
            <br />
            <span className="text-muted-foreground">No Exceptions.</span>
          </h2>
          <p className="text-muted-foreground text-sm mt-3">
            Plus the Federal Capital Territory. No Nigerian address is too far.
          </p>
        </motion.div>

        <motion.div
          className="flex flex-wrap gap-2"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          variants={{ show: { transition: { staggerChildren: 0.025 } }, hidden: {} }}
        >
          {STATES.map((state) => (
            <motion.span
              key={state}
              variants={{
                hidden: { opacity: 0, scale: 0.85 },
                show: { opacity: 1, scale: 1, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
              }}
              className={`text-xs px-3 py-1.5 rounded-full border transition-colors duration-200 ${state === "Lagos"
                  ? "bg-[#c8a96e]/10 border-[#a68038] text-[#a68038] font-semibold"
                  : state === "FCT (Abuja)"
                    ? "bg-[#c8a96e]/05 border-[#a68038] text-[#a68038] "
                    : "bg-muted/30 border-border text-muted-foreground hover:border-border hover:text-foreground/70"
                }`}
            >
              {state}
            </motion.span>
          ))}
        </motion.div>

        <motion.p
          className="text-muted-foreground/50 text-xs mt-5"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          Lagos and Abuja highlighted — fastest delivery zones.
        </motion.p>
      </section>

      {/* ══════════════════════════════════════════════════════════════
        DELIVERY FAQs — BENTO GRID
      ══════════════════════════════════════════════════════════════ */}
      <FAQBento />

      {/* ══════════════════════════════════════════════════════════════
        CTA
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative py-28 overflow-hidden border-t border-border">
        {/* Radial glow backdrop */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 80% at 50% 100%, rgba(37,211,102,0.07) 0%, transparent 70%)",
          }}
        />
        <div className="relative max-w-lg mx-auto text-center px-4">
          {/* Pulsing WhatsApp icon */}
          <div className="relative inline-flex items-center justify-center mb-8">
            <motion.div
              className="absolute w-24 h-24 rounded-full"
              style={{ background: "rgba(37,211,102,0.12)" }}
              animate={{ scale: [1, 1.35, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />
            <div
              className="relative w-16 h-16 rounded-full border border-[#25d366]/20 flex items-center justify-center"
              style={{ background: "rgba(37,211,102,0.1)" }}
            >
              <WhatsAppIcon className="w-8 h-8 text-[#25d366]" />
            </div>
          </div>

          <motion.h2
            className="text-foreground font-black text-4xl mb-4"
            style={{ fontFamily: "'Georgia', serif" }}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            Need a delivery quote?
          </motion.h2>
          <motion.p
            className="text-muted-foreground text-sm mb-9 leading-relaxed"
            variants={fadeUp}
            custom={1}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            Tell us your delivery state, the tiles you want, and the quantity.
            We&apos;ll confirm the fee and estimated timeline on WhatsApp — usually within 10 minutes.
          </motion.p>

          <motion.a
            href={waGeneralLink("Hello! I'd like a delivery quote. My delivery state is: [STATE]. Tiles: [TILE NAME]. Quantity: [SQM] sqm.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-[#25d366] hover:bg-[#1fb859] text-foreground font-black px-9 py-4 rounded-full text-sm transition-colors duration-200"
            variants={fadeUp}
            custom={2}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            whileHover={{ scale: 1.04, boxShadow: "0 0 32px rgba(37,211,102,0.25)" }}
            whileTap={{ scale: 0.97 }}
          >
            <WhatsAppIcon className="w-5 h-5" />
            Get a Delivery Quote
          </motion.a>

          <motion.p
            className="text-muted-foreground/50 text-xs mt-4"
            variants={fadeUp}
            custom={3}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            Average response: under 10 minutes · Mon – Sat, 8 am – 6 pm
          </motion.p>
        </div>
      </section>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}