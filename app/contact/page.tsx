"use client";

import { useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { PHONE, EMAIL, ADDRESS, HOURS, waGeneralLink } from "@/lib/data";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin } from "lucide-react";

const CHANNELS = [
    {
        icon: "whatsapp",
        label: "WhatsApp",
        value: PHONE,
        sub: "Fastest — under 10 min response",
        href: waGeneralLink("Hello CeramiKa! I have an enquiry."),
        color: "#25d366",
        external: true,
    },
    {
        icon: "phone",
        label: "Phone",
        value: PHONE,
        sub: "Mon – Sat, 8 am – 6 pm",
        href: `tel:${PHONE}`,
        color: "#c8a96e",
        external: false,
    },
    {
        icon: "email",
        label: "Email",
        value: EMAIL,
        sub: "We reply within 24 hours",
        href: `mailto:${EMAIL}`,
        color: "#c8a96e",
        external: false,
    },
    {
        icon: "location",
        label: "Showroom",
        value: ADDRESS,
        sub: HOURS,
        href: "https://maps.google.com/?q=12+Tiles+Avenue+Victoria+Island+Lagos",
        color: "#c8a96e",
        external: true,
    },
];

const TOPICS = [
    "Product enquiry",
    "Order status",
    "Delivery question",
    "Returns / refund",
    "Showroom visit",
    "Trade / bulk order",
    "Something else",
];

function ChannelIcon({ type, className, style }: { type: string; className?: string; style?: React.CSSProperties }) {
    if (type === "whatsapp") return (
        <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
    );
    if (type === "phone") return (
        <svg className={className} style={style} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
    );
    if (type === "email") return (
        <svg className={className} style={style} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
    );
    return (
        <svg className={className} style={style} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
    );
}

const RESPONSE_TIMES = [
    { channel: "WhatsApp", time: "Under 10 minutes", color: "#25d366" },
    { channel: "Phone", time: "Immediately", color: "#c8a96e" },
    { channel: "Email", time: "Within 24 hours", color: "#c8a96e" },
    { channel: "Order updates", time: "At dispatch + delivery", color: "#c8a96e" },
];

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show: (i: number = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.55, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] as const },
    }),
};

export default function ContactPage() {
    const [form, setForm] = useState({ name: "", phone: "", email: "", topic: "", message: "" });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        const text = [
            `Hello CeramiKa! I'm submitting an enquiry via the website.`,
            ``,
            `Name: ${form.name}`,
            `Phone: ${form.phone || "-"}`,
            `Email: ${form.email || "-"}`,
            `Topic: ${form.topic || "-"}`,
            ``,
            `Message: ${form.message}`,
        ].join("\n");
        setTimeout(() => {
            setLoading(false);
            setSubmitted(true);
            window.open(`https://wa.me/2348100000000?text=${encodeURIComponent(text)}`, "_blank");
        }, 600);
    }

    const isValid = form.name.trim() && form.message.trim();

    return (
        <div className="min-h-screen bg-background overflow-x-hidden">
            <Navbar cartCount={0} onCartOpen={() => {}} />

            {/* ── HERO ─────────────────────────────────────────────── */}
            <section className="relative pt-36 pb-20 overflow-hidden">
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: 'radial-gradient(ellipse 70% 55% at 50% -5%, rgba(200,169,110,0.11) 0%, transparent 70%)' }}
                />
                <div
                    className="absolute inset-0 opacity-[0.03] pointer-events-none"
                    style={{
                        backgroundImage: 'linear-gradient(#c8a96e 1px, transparent 1px), linear-gradient(90deg, #c8a96e 1px, transparent 1px)',
                        backgroundSize: '72px 72px',
                    }}
                />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
                    <motion.p
                        className="text-[#a68038] dark:text-[#c8a96e] text-xs tracking-[0.3em] uppercase mb-4"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    >
                        Get in Touch
                    </motion.p>
                    <motion.h1
                        className="font-black leading-[0.9] mb-5"
                        style={{ fontFamily: "'Georgia', serif", fontSize: 'clamp(2.8rem, 7vw, 6.5rem)' }}
                        initial={{ opacity: 0, y: 36 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.75, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <span className="text-foreground">Contact</span>
                        <br />
                        <span className="text-transparent [-webkit-text-stroke:2px_#a68038] dark:[-webkit-text-stroke:2px_rgba(200,169,110,0.5)]">
                            Our Team.
                        </span>
                    </motion.h1>
                    <motion.p
                        className="text-muted-foreground text-lg max-w-lg leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
                    >
                        Questions about tiles, orders, delivery, or your project? We&apos;re on WhatsApp, phone, and email.
                    </motion.p>
                </div>
            </section>

            {/* ── CHANNEL CARDS ────────────────────────────────────── */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
                    {CHANNELS.map((ch, i) => (
                        <motion.a
                            key={ch.label}
                            href={ch.href}
                            target={ch.external ? "_blank" : undefined}
                            rel={ch.external ? "noopener noreferrer" : undefined}
                            className="group relative overflow-hidden bg-card border border-border rounded-3xl p-6 flex flex-col gap-4 hover:border-border transition-colors duration-200"
                            variants={fadeUp}
                            custom={i}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true }}
                            whileHover={{ y: -4 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                        >
                            {/* Hover glow */}
                            <div
                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none"
                                style={{
                                    background: ch.icon === 'whatsapp'
                                        ? 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(37,211,102,0.07) 0%, transparent 80%)'
                                        : 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(200,169,110,0.07) 0%, transparent 80%)',
                                }}
                            />
                            <div
                                className="absolute top-0 left-6 right-6 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                style={{
                                    background: ch.icon === 'whatsapp'
                                        ? 'linear-gradient(90deg, transparent, rgba(37,211,102,0.5), transparent)'
                                        : 'linear-gradient(90deg, transparent, rgba(200,169,110,0.5), transparent)',
                                }}
                            />

                            <div
                                className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0"
                                style={{
                                    background: ch.icon === 'whatsapp' ? 'rgba(37,211,102,0.1)' : 'rgba(200,169,110,0.08)',
                                    border: `1px solid ${ch.icon === 'whatsapp' ? 'rgba(37,211,102,0.2)' : 'rgba(200,169,110,0.15)'}`,
                                }}
                            >
                                <ChannelIcon type={ch.icon} className="w-5 h-5" style={{ color: ch.color }} />
                            </div>
                            <div className="flex-1">
                                <p className="text-muted-foreground text-xs uppercase tracking-widest mb-1">{ch.label}</p>
                                <p className="text-foreground font-semibold text-sm leading-snug" style={ch.icon === 'whatsapp' ? { color: '#25d366' } : {}}>
                                    {ch.value}
                                </p>
                                <p className="text-muted-foreground text-xs mt-1">{ch.sub}</p>
                            </div>
                            <div className="self-end text-muted-foreground/50 group-hover:text-muted-foreground transition-colors text-lg leading-none">
                                →
                            </div>
                        </motion.a>
                    ))}
                </div>

                {/* ── FORM + SIDEBAR ─────────────────────────────── */}
                <div className="grid lg:grid-cols-[1fr_360px] gap-10">

                    {/* Form */}
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                    >
                        <p className="text-[#a68038] dark:text-[#c8a96e] text-xs tracking-[0.25em] uppercase mb-3">Send Enquiry</p>
                        <h2 className="text-foreground font-black text-3xl mb-2" style={{ fontFamily: "'Georgia', serif" }}>
                            Write to Us.
                        </h2>
                        <p className="text-muted-foreground text-sm mb-8 leading-relaxed max-w-md">
                            Fill in the form and your message will be sent to our team via WhatsApp — the fastest way to reach us.
                        </p>

                        <AnimatePresence mode="wait">
                            {submitted ? (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                    className="bg-card border border-[#25d366]/20 rounded-3xl p-12 text-center"
                                >
                                    <div className="relative inline-flex items-center justify-center mb-6">
                                        <motion.div
                                            className="absolute w-20 h-20 rounded-full"
                                            style={{ background: 'rgba(37,211,102,0.12)' }}
                                            animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
                                            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                                        />
                                        <div className="relative w-14 h-14 bg-[#25d366]/10 border border-[#25d366]/20 rounded-full flex items-center justify-center">
                                            <svg className="w-6 h-6 text-[#25d366]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                    </div>
                                    <h3 className="text-foreground font-black text-xl mb-2" style={{ fontFamily: "'Georgia', serif" }}>
                                        Message sent!
                                    </h3>
                                    <p className="text-muted-foreground text-sm mb-6 max-w-xs mx-auto">
                                        Your enquiry has been opened on WhatsApp. We&apos;ll reply in under 10 minutes during business hours.
                                    </p>
                                    <button
                                        onClick={() => { setSubmitted(false); setForm({ name: "", phone: "", email: "", topic: "", message: "" }); }}
                                        className="text-sm text-[#a68038] dark:text-[#c8a96e] border border-[#a68038] dark:border-[#c8a96e]/30 rounded-full px-5 py-2 hover:bg-[#c8a96e]/10 transition-colors"
                                    >
                                        Send another message
                                    </button>
                                </motion.div>
                            ) : (
                                <motion.form
                                    key="form"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onSubmit={handleSubmit}
                                    className="flex flex-col gap-5"
                                >
                                    <div className="grid sm:grid-cols-2 gap-5">
                                        <div>
                                            <label className="text-muted-foreground text-xs uppercase tracking-widest block mb-2">Full Name *</label>
                                            <input
                                                type="text" name="name" value={form.name} onChange={handleChange}
                                                placeholder="e.g. Adaeze Okonkwo" required
                                                className="w-full bg-card border border-border focus:border-[#a68038] dark:border-[#c8a96e]/50 rounded-xl px-4 py-3.5 text-foreground placeholder-muted-foreground/50 text-sm focus:outline-none transition-colors"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-muted-foreground text-xs uppercase tracking-widest block mb-2">Phone / WhatsApp</label>
                                            <input
                                                type="tel" name="phone" value={form.phone} onChange={handleChange}
                                                placeholder="0810 123 4567"
                                                className="w-full bg-card border border-border focus:border-[#a68038] dark:border-[#c8a96e]/50 rounded-xl px-4 py-3.5 text-foreground placeholder-muted-foreground/50 text-sm focus:outline-none transition-colors"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid sm:grid-cols-2 gap-5">
                                        <div>
                                            <label className="text-muted-foreground text-xs uppercase tracking-widest block mb-2">Email Address</label>
                                            <input
                                                type="email" name="email" value={form.email} onChange={handleChange}
                                                placeholder="e.g. adaeze@email.com"
                                                className="w-full bg-card border border-border focus:border-[#a68038] dark:border-[#c8a96e]/50 rounded-xl px-4 py-3.5 text-foreground placeholder-muted-foreground/50 text-sm focus:outline-none transition-colors"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-muted-foreground text-xs uppercase tracking-widest block mb-2">Topic</label>
                                            <select
                                                name="topic" value={form.topic} onChange={handleChange}
                                                className="w-full bg-card border border-border focus:border-[#a68038] dark:border-[#c8a96e]/50 rounded-xl px-4 py-3.5 text-foreground/70 text-sm focus:outline-none appearance-none"
                                            >
                                                <option value="">Select a topic…</option>
                                                {TOPICS.map((t) => (
                                                    <option key={t} value={t} className="bg-card">{t}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-muted-foreground text-xs uppercase tracking-widest block mb-2">
                                            Message <span className="text-[#a68038] dark:text-[#c8a96e]">*</span>
                                        </label>
                                        <textarea
                                            name="message" value={form.message} onChange={handleChange}
                                            placeholder="Tell us about your project, the tiles you're interested in, or your questions…"
                                            required rows={5}
                                            className="w-full bg-card border border-border focus:border-[#a68038] dark:border-[#c8a96e]/50 rounded-xl px-4 py-3.5 text-foreground placeholder-muted-foreground/50 text-sm focus:outline-none transition-colors resize-none"
                                        />
                                    </div>
                                    <motion.button
                                        type="submit"
                                        disabled={!isValid || loading}
                                        className="flex items-center justify-center gap-2.5 w-full sm:w-auto sm:self-start py-4 px-9 bg-[#25d366] hover:bg-[#1fb859] disabled:bg-white/8 disabled:text-muted-foreground/70 text-foreground font-black text-sm rounded-full transition-colors duration-200"
                                        whileHover={isValid && !loading ? { scale: 1.03, boxShadow: '0 0 28px rgba(37,211,102,0.25)' } : {}}
                                        whileTap={isValid && !loading ? { scale: 0.97 } : {}}
                                    >
                                        {loading ? (
                                            <>
                                                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                                </svg>
                                                Sending…
                                            </>
                                        ) : (
                                            <>
                                                <WhatsAppIcon className="w-4 h-4" />
                                                Send via WhatsApp
                                            </>
                                        )}
                                    </motion.button>
                                    <p className="text-muted-foreground/70 text-xs">
                                        Submitting opens WhatsApp with your message pre-filled. Fields marked <span className="text-[#a68038] dark:text-[#c8a96e]">*</span> are required.
                                    </p>
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </motion.div>

                    {/* Sidebar */}
                    <div className="flex flex-col gap-5">
                        {/* Showroom Card */}
                        <motion.div
                            className="bg-card border border-border rounded-3xl overflow-hidden"
                            variants={fadeUp}
                            custom={1}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true }}
                        >
                            <div
                                className="h-44 relative flex items-center justify-center"
                                style={{ background: 'linear-gradient(135deg, #0a1309 0%, #141e16 100%)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
                            >
                                <div
                                    className="absolute inset-0 opacity-[0.07]"
                                    style={{
                                        backgroundImage: 'linear-gradient(#c8a96e 1px, transparent 1px), linear-gradient(90deg, #c8a96e 1px, transparent 1px)',
                                        backgroundSize: '32px 32px',
                                    }}
                                />
                                <div className="relative text-center">
                                    <motion.div
                                        className="text-[#a68038] dark:text-[#c8a96e] mb-3 flex justify-center"
                                        animate={{ y: [0, -5, 0] }}
                                        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                                    >
                                        <MapPin className="w-10 h-10" strokeWidth={1.5} />
                                    </motion.div>
                                    <p className="text-foreground/60 text-sm font-semibold">Victoria Island, Lagos</p>
                                    <a
                                        href="https://maps.google.com/?q=12+Tiles+Avenue+Victoria+Island+Lagos"
                                        target="_blank" rel="noopener noreferrer"
                                        className="inline-block mt-3 text-xs text-[#a68038] dark:text-[#c8a96e] border border-[#a68038] dark:border-[#c8a96e]/30 rounded-full px-4 py-1.5 hover:bg-[#c8a96e]/10 transition-colors"
                                    >
                                        Open in Maps →
                                    </a>
                                </div>
                            </div>
                            <div className="p-5 flex flex-col gap-3">
                                <div>
                                    <p className="text-muted-foreground/70 text-xs uppercase tracking-widest mb-1">Address</p>
                                    <p className="text-foreground/70 text-sm">{ADDRESS}</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground/70 text-xs uppercase tracking-widest mb-1">Hours</p>
                                    <p className="text-foreground/70 text-sm">{HOURS}</p>
                                </div>
                                <a
                                    href={waGeneralLink("Hello! I'd like to book a showroom visit.")}
                                    target="_blank" rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 w-full mt-1 py-3 bg-[#25d366]/10 hover:bg-[#25d366]/20 border border-[#25d366]/20 text-[#25d366] text-sm font-bold rounded-xl transition-all"
                                >
                                    <WhatsAppIcon className="w-4 h-4" />
                                    Book a Showroom Visit
                                </a>
                            </div>
                        </motion.div>

                        {/* Response times */}
                        <motion.div
                            className="bg-card border border-border rounded-3xl p-5"
                            variants={fadeUp}
                            custom={2}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true }}
                        >
                            <p className="text-muted-foreground text-xs uppercase tracking-widest mb-4">Response Times</p>
                            <div className="flex flex-col gap-3">
                                {RESPONSE_TIMES.map((r) => (
                                    <div key={r.channel} className="flex items-center justify-between">
                                        <span className="text-muted-foreground text-sm">{r.channel}</span>
                                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ color: r.color, background: `${r.color}12`, border: `1px solid ${r.color}25` }}>
                                            {r.time}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Trade */}
                        <motion.div
                            className="bg-[#c8a96e]/[0.05] border border-[#a68038] dark:border-[#c8a96e]/15 rounded-3xl p-5"
                            variants={fadeUp}
                            custom={3}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true }}
                        >
                            <p className="text-[#a68038] dark:text-[#c8a96e] text-xs uppercase tracking-widest mb-2 font-semibold">Trade & Bulk Orders</p>
                            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                                Contractors, architects, or developers? We offer trade pricing on bulk orders.
                            </p>
                            <a
                                href={waGeneralLink("Hello! I'm a contractor / developer and I'd like to discuss trade pricing for a bulk order.")}
                                target="_blank" rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-[#a68038] dark:text-[#c8a96e] text-sm font-bold hover:text-[#d4b87e] transition-colors"
                            >
                                <WhatsAppIcon className="w-4 h-4" />
                                Discuss Trade Pricing →
                            </a>
                        </motion.div>
                    </div>
                </div>
            </section>

            <Footer />
            <FloatingWhatsApp />
        </div>
    );
}
