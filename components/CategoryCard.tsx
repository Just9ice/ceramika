'use client'

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { type LucideIcon } from "lucide-react";

interface Props {
  label: string;
  Icon: LucideIcon;
  count: number;
  href: string;
  image?: string;
}

export default function CategoryCard({ label, Icon, count, href, image }: Props) {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  return (
    <motion.a
      href={href}
      onMouseMove={(e) => {
        const rect = (e.currentTarget as HTMLAnchorElement).getBoundingClientRect();
        setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
      whileHover={{ scale: 1.03 }}
      className="relative group rounded-2xl overflow-hidden border border-border bg-card p-6 h-[180px] flex flex-col justify-between transition-all shadow-sm group-hover:shadow-md"
    >
      {/* Background Image */}
      {image && (
        <Image
          src={image}
          alt={label}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-40 transition-opacity duration-500"
        />
      )}

      {/* Overlay */}
      {image && (
        <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-card/60 to-card/40 dark:from-background/90 dark:via-background/60 dark:to-background/40" />
      )}

      {/* Cursor glow */}
      <motion.div
        className="pointer-events-none absolute w-40 h-40 bg-[#c8a96e]/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition"
        animate={{ x: pos.x - 80, y: pos.y - 80 }}
      />

      {/* Content */}
      <div className="relative z-10">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center mb-1 bg-muted border border-border"
        >
          <Icon className="w-5 h-5 text-[#a68038] dark:text-[#c8a96e]" />
        </div>
        <h3 className="text-card-foreground font-bold mt-4 text-lg">{label}</h3>
        <p className="text-muted-foreground text-sm">{count} products</p>
      </div>

      {/* Bottom hover line */}
      <div className="relative z-10 h-[2px] w-0 bg-[#c8a96e] group-hover:w-full transition-all duration-300" />
    </motion.a>
  );
}
