"use client";

import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import Footer from "@/components/Footer";
import Navbar from "@/components/navbar";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { ADDRESS, EMAIL, HOURS, PHONE, waGeneralLink } from "@/lib/data";
import { motion } from "framer-motion";
import { Clock, Mail, MapPin, Phone, Sparkles } from "lucide-react";

const TEAM = [
 {
  name: "Chukwuma Obi",
  role: "Founder & CEO",
  initials: "CO",
  color: "#c8a96e",
  bio: "Former civil engineer with 15 years in the Nigerian construction industry. Founded CeramiKa after seeing how hard it was to source quality tiles at fair prices.",
 },
 {
  name: "Anita Osuji",
  role: "Head of Design & Showroom",
  initials: "AO",
  color: "#059669",
  bio: "Interior design graduate from Covenant University. Curates every tile in our collection and helps clients visualize their final spaces.",
 },
 {
  name: "Tunde Adeyemi",
  role: "Logistics & Delivery Lead",
  initials: "TA",
  color: "#5b8dd9",
  bio: "Manages nationwide delivery across all 36 states. Built our logistics network from scratch to ensure on-time delivery every time.",
 },
 {
  name: "Ngozi Eze",
  role: "Customer Experience",
  initials: "NE",
  color: "#d97060",
  bio: "The voice behind our WhatsApp. Ngozi handles every order, query, and follow-up.",
 },
];

const VALUES = [
 {
  symbol: "NG",
  title: "Built for Nigeria",
  desc: "We price in Naira, deliver nationwide, and are on WhatsApp — because that is how modern Nigerians trade.",
 },
 {
  symbol: <Sparkles className="w-5 h-5" strokeWidth={2} />,
  title: "Quality First",
  desc: "Every tile is personally vetted. We reject stock that does not meet our standards on durability and aesthetics.",
 },
 {
  symbol: "⬡",
  title: "Transparent by Default",
  desc: "Our showroom address, phone numbers, and team faces are all public. You know exactly who you are buying from.",
 },
 {
  symbol: "↗",
  title: "Fast Everywhere",
  desc: "Lagos in 1–3 days. Abuja in 2–4. All 36 states covered. We built a delivery network around Nigerian realities.",
 },
];

const TIMELINE = [
 {
  year: "2012",
  event: "Founded in Lagos",
  desc: "Chukwuemeka opens a small tile showroom in Victoria Island with 40 SKUs and a vision.",
 },
 {
  year: "2016",
  event: "First website launched",
  desc: "Nigeria's first dedicated tile e-commerce site. Orders came via phone and bank transfers.",
 },
 {
  year: "2019",
  event: "WhatsApp commerce begins",
  desc: "We added WhatsApp to our sales channels. Within 3 months, 70% of orders came through WhatsApp.",
 },
 {
  year: "2021",
  event: "Nationwide delivery",
  desc: "Partnership with logistics companies enables delivery to all 36 states of the Federation.",
 },
 {
  year: "2023",
  event: "500+ products",
  desc: "Collection grew to 500+ SKUs across 8 material types and 15 finish categories.",
 },
 {
  year: "2025",
  event: "CeramiKa relaunches",
  desc: "Complete rebranding and new platform with SQM calculator, WhatsApp checkout, and Paystack integration.",
 },
];

const fadeUp = {
 hidden: { opacity: 0, y: 28 },
 show: (i: number = 0) => ({
  opacity: 1,
  y: 0,
  transition: {
   duration: 0.6,
   delay: i * 0.08,
   ease: [0.22, 1, 0.36, 1] as const,
  },
 }),
};

export default function AboutPage() {
 return (
  <div className="min-h-screen bg-background overflow-x-hidden">
   <Navbar cartCount={0} onCartOpen={() => {}} />

   {/* ── HERO ─────────────────────────────────────────────── */}
   <section className="relative min-h-[85vh] flex flex-col justify-end pb-20 pt-36 overflow-hidden">
    <div
     className="absolute inset-0 pointer-events-none"
     style={{
      background:
       "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(200,169,110,0.10) 0%, transparent 70%)",
     }}
    />
    <div
     className="absolute inset-0 opacity-[0.03] pointer-events-none"
     style={{
      backgroundImage:
       "linear-gradient(#c8a96e 1px, transparent 1px), linear-gradient(90deg, #c8a96e 1px, transparent 1px)",
      backgroundSize: "72px 72px",
     }}
    />
    {/* Vertical accent */}
    <div
     className="absolute top-0 left-16 hidden lg:block w-px h-full opacity-8 pointer-events-none"
     style={{
      background:
       "linear-gradient(to bottom, transparent, #c8a96e 30%, transparent 80%)",
     }}
    />

    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 w-full">
     <motion.p
      className="text-[#a68038] text-xs tracking-[0.3em] uppercase mb-5"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
     >
      Our Story
     </motion.p>
     <motion.h1
      className="font-black leading-[0.88] mb-8"
      style={{
       fontFamily: "'Georgia', serif",
       fontSize: "clamp(3rem, 8vw, 7.5rem)",
      }}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
       duration: 0.78,
       delay: 0.08,
       ease: [0.22, 1, 0.36, 1],
      }}
     >
      <span className="text-transparent [-webkit-text-stroke:2px_#a68038] ,169,110,0.5)]">
       Nigeria&apos;s Tile
      </span>
      <br />
      <span className="text-transparent [-webkit-text-stroke:2px_#a68038] ,169,110,0.5)]">
       Experts.
      </span>
     </motion.h1>
     <motion.p
      className="text-foreground/40 text-lg max-w-lg leading-relaxed"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
       duration: 0.65,
       delay: 0.18,
       ease: [0.22, 1, 0.36, 1],
      }}
     >
      CeramiKa was born from a simple frustration: why was it so hard to
      find quality tiles at fair prices in Nigeria? We&apos;ve been fixing
      that since 2012.
     </motion.p>
    </div>
   </section>

   {/* ── MISSION QUOTE ────────────────────────────────────── */}
   <section className="relative border-y border-border py-20 overflow-hidden">
    <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-muted/30 to-background" />
    {/* Giant quote marks */}
    <div
     className="absolute left-4 top-4 text-[12rem] leading-none text-[#a68038] font-black select-none pointer-events-none"
     style={{ fontFamily: "'Georgia', serif" }}
     aria-hidden="true"
    >
     &ldquo;
    </div>
    <div
     className="absolute right-4 bottom-0 text-[12rem] leading-none text-[#a68038] font-black select-none pointer-events-none"
     style={{ fontFamily: "'Georgia', serif" }}
     aria-hidden="true"
    >
     &rdquo;
    </div>

    <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
     <motion.p
      className="text-[#a68038] text-xs tracking-[0.25em] uppercase mb-6"
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
     >
      Our Mission
     </motion.p>
     <motion.blockquote
      className="text-foreground font-black leading-snug"
      style={{
       fontFamily: "'Georgia', serif",
       fontSize: "clamp(1.3rem, 4vw, 2.6rem)",
      }}
      variants={fadeUp}
      custom={1}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
     >
      &ldquo;To make premium tiles accessible to every Nigerian — whether
      you&apos;re building a ₦500M Ikoyi villa or a ₦5M Yaba
      apartment.&rdquo;
     </motion.blockquote>
     <motion.p
      className="text-foreground/30 mt-5 text-sm"
      variants={fadeUp}
      custom={2}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
     >
      — Chukwuemeka Obi, Founder
     </motion.p>
    </div>
   </section>

   {/* ── VALUES ───────────────────────────────────────────── */}
   <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
    <motion.div
     className="mb-12"
     variants={fadeUp}
     initial="hidden"
     whileInView="show"
     viewport={{ once: true, margin: "-60px" }}
    >
     <p className="text-[#a68038] text-xs tracking-[0.25em] uppercase mb-3">
      What We Stand For
     </p>
     <h2
      className="text-foreground font-black text-4xl"
      style={{ fontFamily: "'Georgia', serif" }}
     >
      Our Values
     </h2>
    </motion.div>

    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
     {VALUES.map((v, i) => (
      <motion.div
       key={v.title}
       className="group relative overflow-hidden bg-card border border-border rounded-3xl p-7 hover:border-border transition-colors duration-300"
       variants={fadeUp}
       custom={i}
       initial="hidden"
       whileInView="show"
       viewport={{ once: true, margin: "-40px" }}
       whileHover={{ y: -4 }}
       transition={{ type: "spring", stiffness: 280, damping: 22 }}
      >
       <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"
        style={{
         background:
          "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(200,169,110,0.07) 0%, transparent 80%)",
        }}
       />
       <div
        className="absolute top-0 left-8 right-8 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
         background:
          "linear-gradient(90deg, transparent, rgba(200,169,110,0.5), transparent)",
        }}
       />
       <div
        className="w-12 h-12 rounded-2xl border border-[#a68038] flex items-center justify-center text-lg text-[#a68038] mb-5 font-bold"
        style={{ background: "rgba(200,169,110,0.06)" }}
       >
        {v.symbol}
       </div>
       <h3 className="text-foreground font-bold text-sm mb-2">
        {v.title}
       </h3>
       <p className="text-foreground/40 text-xs leading-relaxed">
        {v.desc}
       </p>
      </motion.div>
     ))}
    </div>
   </section>

   {/* ── TIMELINE ─────────────────────────────────────────── */}
   <section className="relative border-y border-border py-20 overflow-hidden">
    <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-muted/30 to-background" />
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
     <motion.div
      className="mb-14"
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
     >
      <p className="text-[#a68038] text-xs tracking-[0.25em] uppercase mb-3">
       Since 2012
      </p>
      <h2
       className="text-foreground font-black text-4xl"
       style={{ fontFamily: "'Georgia', serif" }}
      >
       Our Journey
      </h2>
     </motion.div>

     <div className="relative grid lg:grid-cols-2 gap-5">
      {/* Vertical line */}
      <div
       className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px"
       style={{
        background:
         "linear-gradient(to bottom, transparent, rgba(200,169,110,0.12) 15%, rgba(200,169,110,0.12) 85%, transparent)",
       }}
      />

      {TIMELINE.map((item, i) => (
       <motion.div
        key={item.year}
        className={`group relative flex gap-5 items-start p-6 rounded-2xl border border-border bg-card hover:border-border transition-colors ${i % 2 === 1 ? "lg:mt-8" : ""}`}
        variants={fadeUp}
        custom={i}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-30px" }}
       >
        <div
         className="shrink-0 w-14 h-14 rounded-2xl border border-[#a68038] flex items-center justify-center"
         style={{ background: "rgba(200,169,110,0.06)" }}
        >
         <span
          className="text-[#a68038] font-black text-sm"
          style={{ fontFamily: "'Georgia', serif" }}
         >
          {item.year}
         </span>
        </div>
        <div className="flex-1 min-w-0">
         <h4 className="text-foreground font-bold text-sm mb-1">
          {item.event}
         </h4>
         <p className="text-foreground/35 text-xs leading-relaxed">
          {item.desc}
         </p>
        </div>
       </motion.div>
      ))}
     </div>
    </div>
   </section>

   {/* ── TEAM ─────────────────────────────────────────────── */}
   <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
    <motion.div
     className="mb-12"
     variants={fadeUp}
     initial="hidden"
     whileInView="show"
     viewport={{ once: true }}
    >
     <p className="text-[#a68038] text-xs tracking-[0.25em] uppercase mb-3">
      The People
     </p>
     <h2
      className="text-foreground font-black text-4xl"
      style={{ fontFamily: "'Georgia', serif" }}
     >
      Meet the Team
     </h2>
    </motion.div>

    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
     {TEAM.map((member, i) => (
      <motion.div
       key={member.name}
       className="group relative overflow-hidden bg-card border border-border rounded-3xl p-7 hover:border-border transition-colors duration-300"
       variants={fadeUp}
       custom={i}
       initial="hidden"
       whileInView="show"
       viewport={{ once: true, margin: "-40px" }}
       whileHover={{ y: -3 }}
       transition={{ type: "spring", stiffness: 280, damping: 22 }}
      >
       {/* Avatar glow ring */}
       <div className="relative w-14 h-14 mb-5">
        <div
         className="absolute inset-[-3px] rounded-full opacity-40 group-hover:opacity-70 transition-opacity duration-300"
         style={{
          background: `radial-gradient(circle, ${member.color}55 0%, transparent 70%)`,
         }}
        />
        <div
         className="w-14 h-14 rounded-full flex items-center justify-center font-black text-base text-[#0b1410]"
         style={{ backgroundColor: member.color }}
        >
         {member.initials}
        </div>
       </div>
       <h3 className="text-foreground font-bold text-sm mb-1">
        {member.name}
       </h3>
       <p
        className="text-xs font-semibold mb-3"
        style={{ color: member.color }}
       >
        {member.role}
       </p>
       <p className="text-foreground/35 text-xs leading-relaxed">
        {member.bio}
       </p>
      </motion.div>
     ))}
    </div>
   </section>

   {/* ── SHOWROOM ─────────────────────────────────────────── */}
   <section className="relative border-t border-border py-20 overflow-hidden">
    <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-muted/30 to-background" />
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
     <div className="grid lg:grid-cols-2 gap-16 items-center">
      {/* Text */}
      <motion.div
       variants={fadeUp}
       initial="hidden"
       whileInView="show"
       viewport={{ once: true }}
      >
       <p className="text-[#a68038] text-xs tracking-[0.25em] uppercase mb-4">
        Visit Us
       </p>
       <h2
        className="text-foreground font-black text-4xl mb-6"
        style={{ fontFamily: "'Georgia', serif", lineHeight: 1.15 }}
       >
        Our Showroom
       </h2>

       <div className="flex flex-col gap-5 mb-8">
        {[
         { Icon: MapPin, label: "Address", value: ADDRESS },
         {
          Icon: Phone,
          label: "Phone",
          value: PHONE,
          href: `tel:${PHONE}`,
         },
         {
          Icon: Mail,
          label: "Email",
          value: EMAIL,
          href: `mailto:${EMAIL}`,
         },
         { Icon: Clock, label: "Hours", value: HOURS },
        ].map((item, i) => (
         <motion.div
          key={item.label}
          className="flex gap-4 items-start"
          variants={fadeUp}
          custom={i}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
         >
          <span className="text-lg mt-0.5 shrink-0">
           <item.Icon className="w-6 h-6 text-[#a68038] " />
          </span>
          <div>
           <span className="text-foreground/25 text-xs uppercase tracking-wider block mb-0.5">
            {item.label}
           </span>
           {item.href ? (
            <a
             href={item.href}
             className="text-foreground/60 hover:text-[#a68038] transition-colors text-sm"
            >
             {item.value}
            </a>
           ) : (
            <span className="text-foreground/60 text-sm">
             {item.value}
            </span>
           )}
          </div>
         </motion.div>
        ))}
       </div>

       <motion.a
        href={waGeneralLink(
         "Hello! I'd like to visit the CeramiKa showroom. Can I book a time?",
        )}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2.5 bg-[#25d366] hover:bg-[#1fb859] text-foreground font-black px-8 py-4 rounded-full text-sm transition-colors duration-200"
        whileHover={{
         scale: 1.04,
         boxShadow: "0 0 28px rgba(37,211,102,0.25)",
        }}
        whileTap={{ scale: 0.97 }}
       >
        <WhatsAppIcon className="w-5 h-5" />
        Book a Showroom Visit
       </motion.a>
      </motion.div>

      {/* Map visual */}
      <motion.div
       className="relative bg-card border border-border rounded-3xl overflow-hidden h-80 flex items-center justify-center"
       variants={fadeUp}
       custom={1}
       initial="hidden"
       whileInView="show"
       viewport={{ once: true }}
      >
       {/* Grid texture */}
       <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
         backgroundImage:
          "linear-gradient(#c8a96e 1px, transparent 1px), linear-gradient(90deg, #c8a96e 1px, transparent 1px)",
         backgroundSize: "40px 40px",
        }}
       />
       {/* Radial center glow */}
       <div
        className="absolute w-48 h-48 rounded-full"
        style={{
         background:
          "radial-gradient(circle, rgba(200,169,110,0.08) 0%, transparent 70%)",
        }}
       />
       <div className="relative text-center">
        <motion.div
         className="text-[#a68038] mb-3 flex justify-center"
         animate={{ y: [0, -6, 0] }}
         transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
         }}
        >
         <MapPin className="w-12 h-12" strokeWidth={1.5} />
        </motion.div>
        <p className="text-foreground/50 text-sm font-semibold">
         Victoria Island
        </p>
        <p className="text-foreground/20 text-xs mt-1">
         12 Tiles Avenue, Lagos
        </p>
        <a
         href="https://maps.google.com"
         target="_blank"
         rel="noopener noreferrer"
         className="inline-block mt-5 text-xs text-[#a68038] border border-[#a68038] rounded-full px-4 py-2 hover:bg-[#c8a96e]/10 transition-colors"
        >
         Open in Maps →
        </a>
       </div>
      </motion.div>
     </div>
    </div>
   </section>

   {/* ── CTA ─────────────────────────────────────────────── */}
   <section className="relative bg-[#25d366]/[0.12] py-28 overflow-hidden border-t border-border">
    <div
     className="absolute inset-0 pointer-events-none"
     style={{
      background:
       "radial-gradient(ellipse 60% 80% at 50% 100%, rgba(37,211,102,0.18) 0%, transparent 70%)",
     }}
    />
    <div className="relative max-w-md mx-auto text-center px-4">
     <div className="relative inline-flex items-center justify-center mb-8">
      <motion.div
       className="absolute w-24 h-24 rounded-full"
       style={{ background: "rgba(37,211,102,0.12)" }}
       animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
       transition={{
        duration: 2.5,
        repeat: Infinity,
        ease: "easeInOut",
       }}
      />
      <div
       className="relative w-16 h-16 rounded-full border border-[#25d366]/20 flex items-center justify-center"
       style={{ background: "rgba(37,211,102,0.1)" }}
      >
       <WhatsAppIcon className="w-8 h-8 text-[#25d366]" />
      </div>
     </div>
     <motion.h2
      className="text-foreground font-black text-3xl mb-3"
      style={{ fontFamily: "'Georgia', serif" }}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
     >
      Ready to find your tiles?
     </motion.h2>
     <motion.p
      className="text-foreground/40 text-sm mb-8 leading-relaxed"
      variants={fadeUp}
      custom={1}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
     >
      Our team helps with everything — from choosing the right tile to
      calculating sqm and arranging delivery. All on WhatsApp.
     </motion.p>
     <motion.a
      href={waGeneralLink(
       "Hello! I came from the About page and I'd like to explore your tile collection.",
      )}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2.5 bg-[#25d366] hover:bg-[#1fb859] text-foreground font-black px-8 py-4 rounded-full text-sm transition-colors duration-200"
      variants={fadeUp}
      custom={2}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      whileHover={{
       scale: 1.04,
       boxShadow: "0 0 32px rgba(37,211,102,0.25)",
      }}
      whileTap={{ scale: 0.97 }}
     >
      <WhatsAppIcon className="w-5 h-5" />
      Start the Conversation
     </motion.a>
    </div>
   </section>

   <Footer />
   <FloatingWhatsApp />
  </div>
 );
}
