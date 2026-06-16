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
  <section className="relative bg-background pt-32 pb-16 border-b border-border">
    {/* Optional hero background image */}
    {image && (
      <div
      className="absolute inset-0 bg-cover bg-center opacity-10"
      style={{ backgroundImage: `url(${image})` }}
      />
    )}

    {/* Subtle grid background */}
    <div 
    className="absolute inset-0 opacity-[0.03] pointer-events-none"
    style={{
      backgroundImage: 'linear-gradient(var(--color-foreground) 1px, transparent 1px), linear-gradient(90deg, var(--color-foreground) 1px, transparent 1px)',
      backgroundSize: '80px 80px',
    }}
    />

    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center">
      <p className="text-muted-foreground text-xs font-semibold tracking-widest uppercase mb-4">
        {label}
      </p>
      <h1 className="text-foreground font-serif font-black leading-tight mb-6"
      style={{
        fontSize: "clamp(2.5rem, 6vw, 4.5rem)"
      }}
      >
        {title}
      </h1>
      {
        subtitle && (
          <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed mb-8 font-sans">
            {subtitle}
          </p>
        )
      }
      {children}
    </div>
  </section>
 );
}
