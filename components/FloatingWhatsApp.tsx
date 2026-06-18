'use client';

import { useState, useEffect } from 'react';
import { waGeneralLink } from '@/lib/data';
import WhatsAppIcon from './ui/WhatsAppIcon';
import { motion, AnimatePresence } from 'framer-motion';
import { Smile } from 'lucide-react';


const MESSAGES = [
  'Chat with us!',
  'Need help?',
  'Order on WhatsApp',
];

export default function FloatingWhatsApp() {
  const [open, setOpen] = useState(false);
  const [msgIndex, setMsgIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  // Rotate tooltip messages every 4 seconds
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const t = setInterval(() => {
      setMsgIndex((i) => (i + 1) % MESSAGES.length);
    }, 4000);
    return () => clearInterval(t);
  }, []);

  // Show a subtle bounce-in after 3 seconds
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="fixed bottom-7 right-7 z-50 flex flex-col items-end gap-3">

      {/* ── Tooltip / mini-card ─────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.92 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative bg-card border border-border rounded-2xl p-4 w-64 shadow-2xl shadow-black/50"
          >
            {/* Top hairline */}
            <div
              className="absolute top-0 left-6 right-6 h-px"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(37,211,102,0.5), transparent)' }}
            />
            {/* Header */}
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                style={{ background: 'rgba(37,211,102,0.12)', border: '1px solid rgba(37,211,102,0.25)' }}
              >
                <WhatsAppIcon className="w-5 h-5 text-[#25d366]" />
              </div>
              <div>
                <p className="text-foreground font-bold text-sm leading-none">CeramiKa</p>
                <p className="text-[#25d366] text-[11px] flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#25d366] inline-block" />
                  Online
                </p>
              </div>
            </div>
            {/* Rotating message */}
            <div className="bg-muted rounded-xl px-3 py-2.5 mb-3 min-h-[2.5rem] flex items-center overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.p
                  key={msgIndex}
                  className="text-muted-foreground text-xs leading-relaxed"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="flex items-center gap-1.5"><Smile className="w-3.5 h-3.5 text-[#a68038] " /> Hi! How can we help you today?</span>
                </motion.p>
              </AnimatePresence>
            </div>
            <motion.a
              href={waGeneralLink('Hello CeramiKa! I need help with tiles.')}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 bg-[#25d366] hover:bg-[#1fb859] text-foreground text-xs font-black rounded-xl transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              <WhatsAppIcon className="w-4 h-4" />
              Start Chatting
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Floating button ─────────────────────────────────── */}
      <div className="relative">
        {/* Outer pulse ring — animates continuously */}
        <motion.div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{ background: 'rgba(37,211,102,0.25)' }}
          animate={{ scale: [1, 1.5, 1.8], opacity: [0.6, 0.2, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
        />
        {/* Inner pulse ring — offset timing */}
        <motion.div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{ background: 'rgba(37,211,102,0.15)' }}
          animate={{ scale: [1, 1.35, 1.55], opacity: [0.5, 0.2, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut', delay: 0.5 }}
        />

        {/* Tooltip label (non-open state) */}
        <AnimatePresence>
          {!open && (
            <motion.div
              className="absolute right-[calc(100%+12px)] top-1/2 -translate-y-1/2 whitespace-nowrap pointer-events-none"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={msgIndex}
                  className="block bg-card border border-border text-muted-foreground text-xs font-medium px-3 py-2 rounded-xl shadow-xl"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.28 }}
                >
                  {MESSAGES[msgIndex]}
                </motion.span>
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main button */}
        <motion.button
          onClick={() => setOpen((v) => !v)}
          aria-label="Chat on WhatsApp"
          className="relative w-16 h-16 rounded-full flex items-center justify-center shadow-2xl"
          style={{
            background: 'linear-gradient(135deg, #25d366 0%, #1fb859 100%)',
            boxShadow: '0 8px 32px rgba(37,211,102,0.35), 0 2px 8px rgba(0,0,0,0.3)',
          }}
          animate={mounted ? { scale: 1, opacity: 1 } : { scale: 0.5, opacity: 0 }}
          initial={{ scale: 0.5, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 360, damping: 22 }}
          whileHover={{ scale: 1.08, boxShadow: '0 12px 40px rgba(37,211,102,0.45)' }}
          whileTap={{ scale: 0.93 }}
        >
          {/* Icon morphs between WA and X */}
          <AnimatePresence mode="wait">
            {open ? (
              <motion.span
                key="close"
                initial={{ rotate: -45, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 45, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="text-white font-black text-xl leading-none"
              >
                X
              </motion.span>
            ) : (
              <motion.span
                key="wa"
                initial={{ rotate: 45, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -45, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <WhatsAppIcon className="w-9 h-9 text-white" />
              </motion.span>
            )}
          </AnimatePresence>

          {/* Notification dot */}
          {!open && (
            <motion.div
              className="absolute top-1 right-1 w-3 h-3 bg-white rounded-full border-2 border-[#25d366]"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          )}
        </motion.button>
      </div>
    </div>
  );
}
