"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer({ theme }: { theme?: "light" | "dark" }) {
  const pathname = usePathname();

  // Default to dark on /about or if explicitly passed
  const isDark = theme === "dark" || pathname === "/about";

  const bgClass = isDark ? "bg-[#282828]" : "bg-[#f3f0e8]";
  const textClass = isDark ? "text-white" : "text-black";
  const mutedTextClass = isDark ? "text-white/70" : "text-black/70";
  const borderClass = isDark ? "border-white/10" : "border-black/10";

  return (
    <footer className={`${bgClass} ${textClass} border-t ${borderClass}`}>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-8">
          {/* Column 1: Logo & Tagline (Spans 2 columns to push others right) */}
          <div className="md:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <img
                src="/Logo.png"
                alt="Ceramika Logo"
                className={`h-20 sm:h-25 w-auto object-contain ${isDark ? "brightness-0 invert" : ""}`}
              />
            </Link>
            <p
              className={`text-[10px] sm:text-xs ${mutedTextClass} leading-relaxed max-w-xs pr-4`}
            >
              Quality Spanish tiles at the best rate. Part of Impacto Grupo
            </p>
          </div>

          {/* Column 2: Links */}
          <div className="md:col-span-1">
            <h4 className="font-semibold tracking-widest text-[10px] uppercase mb-6">
              LINKS
            </h4>
            <ul className="flex flex-col gap-3">
              {[
                { label: "Shop All", href: "/shop" },
                { label: "About Us", href: "/about" },
                { label: "Privacy Policy", href: "/policy/privacy" },
                { label: "Return Policy", href: "/policy/return" },
                { label: "Terms", href: "/terms" },
              ].map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className={`text-[11px] ${mutedTextClass} hover:${textClass} transition-colors`}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact & Socials */}
          <div className="md:col-span-1 flex flex-col items-start text-left">
            <h4 className="font-semibold tracking-widest text-[10px] uppercase mb-6">
              CONTACT
            </h4>
            <ul className="flex flex-col gap-3 mb-8">
              <li className={`text-[11px] ${mutedTextClass} max-w-[200px]`}>
                12 Tiles Avenue, Victoria Island, Lagos
              </li>
              <li className={`text-[11px] ${mutedTextClass}`}>
                +234 810 000 0000
              </li>
              <li className={`text-[11px] ${mutedTextClass}`}>
                hello@ceramika.ng
              </li>
            </ul>

            {/* Socials placed below contact */}
            <div className="flex flex-row gap-6 items-center">
              <a
                href="#"
                className="font-semibold tracking-widest text-[10px] uppercase hover:opacity-70 transition-opacity"
              >
                INSTAGRAM
              </a>
              <a
                href="#"
                className="font-semibold tracking-widest text-[10px] uppercase hover:opacity-70 transition-opacity"
              >
                WHATSAPP
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className={`border-t ${borderClass}`}>
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p
            className={`text-[10px] uppercase tracking-widest ${mutedTextClass} text-center sm:text-left`}
          >
            © 2026 CERAMIKA
          </p>
          <div
            className={`text-[10px] uppercase tracking-widest ${mutedTextClass} text-center sm:text-right`}
          >
            BETTER MATERIALS. BETTER SPACES. BETTER VALUE.
          </div>
        </div>
      </div>
    </footer>
  );
}
