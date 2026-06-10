import { ReactNode } from 'react'

interface PageHeroProps {
    label: string;
    title: ReactNode;
    subtitle?: string;
    children?: ReactNode;
    image?: string;
}

export default function PageHero({ label, title, subtitle, children, image }: PageHeroProps) {
  return (
    <section className="relative bg-[#0f1a12] pt-32 pb-16 overflow-hidden">
        {/* Optional hero background image */}
        {image && (
            <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${image})` }}
            >
                <div className="absolute inset-0 bg-[#0f1a12]/80" />
            </div>
        )}

        {/* Subtle tile grid background */}
        <div 
        className="absolute inset-0 opacity-5"
        style={{
            backgroundImage: 'lineargradient(#c8a96e 1px, transparent 1px), linear-gradient(90deg, #c8a96e 1px, transparent 1px)',
            backgroundSize: '80px 80px',
        }}
        />
        {/* Radial Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] opacity-10 rounded-full"
        style={{
            background: 'radial-gradient(ellipse, #c8a96e 0%, transparent 70%)'
        }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
            <p className="text-[#a68038] dark:text-[#c8a96e] text-xs tracking-[0.25rem] uppercase mb-3">
                {label}
            </p>
            <h1 className="text-white font-black leading-tight mb-4"
            style={{
                fontFamily: "'Georgia' serif", fontSize: "clamp(2.2rem, 5vw, 4rem)"
            }}
            >
                {title}
            </h1>
            {
                subtitle && (
                    <p className="text-white/40 text-lg max-w-2xl leading-relaxed">
                        {subtitle}
                    </p>
                )
            }
            {children}
        </div>
    </section>
  );
}
