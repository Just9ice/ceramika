import re

# ═══════════════════════════════════════════════════════════
# 1. FIX CONTACT PAGE — full light/dark mode
# ═══════════════════════════════════════════════════════════
with open('app/contact/page.tsx', 'r', encoding='utf-8') as f:
    c = f.read()

c = c.replace('bg-[#0b1410]', 'bg-background')
c = c.replace('bg-[#141e16]', 'bg-card')

# text-white but NOT text-white/ patterns (those have opacity) and not inside style strings
c = c.replace('"text-white"', '"text-foreground"')
c = c.replace('"text-white ', '"text-foreground ')
c = c.replace(' text-white"', ' text-foreground"')
c = c.replace(' text-white ', ' text-foreground ')

# text-white/NN patterns
c = c.replace('text-white/40', 'text-muted-foreground')
c = c.replace('text-white/35', 'text-muted-foreground')
c = c.replace('text-white/30', 'text-muted-foreground')
c = c.replace('text-white/25', 'text-muted-foreground')
c = c.replace('text-white/20', 'text-muted-foreground/70')
c = c.replace('text-white/15', 'text-muted-foreground/50')
c = c.replace('text-white/60', 'text-foreground/70')
c = c.replace('text-white/50', 'text-foreground/60')
c = c.replace('text-white/55', 'text-foreground/65')
c = c.replace('text-white/45', 'text-muted-foreground')

# borders
c = c.replace('border-white/5', 'border-border')
c = c.replace('border-white/8', 'border-border')
c = c.replace('border-white/10', 'border-border')
c = c.replace('hover:border-white/10', 'hover:border-border')
c = c.replace('hover:border-white/15', 'hover:border-border')

# bg
c = c.replace('bg-white/[0.03]', 'bg-muted/30')
c = c.replace('bg-white/[0.04]', 'bg-muted')

# placeholders
c = c.replace('placeholder-white/20', 'placeholder-muted-foreground/50')

# Fix the inline text stroke for Contact page heading
c = c.replace(
    """<span className="text-transparent" style={{ WebkitTextStroke: '2px rgba(200,169,110,0.5)' }}>""",
    """<span className="text-transparent [-webkit-text-stroke:2px_#a68038] dark:[-webkit-text-stroke:2px_rgba(200,169,110,0.5)]">"""
)

# Fix "Contact" text-foreground
c = c.replace(
    '<span className="text-foreground">Contact</span>',
    '<span className="text-foreground">Contact</span>'
)

with open('app/contact/page.tsx', 'w', encoding='utf-8') as f:
    f.write(c)

print("✓ Contact page fixed")


# ═══════════════════════════════════════════════════════════
# 2. FIX DELIVERY PAGE — full light/dark mode
# ═══════════════════════════════════════════════════════════
with open('app/delivery/page.tsx', 'r', encoding='utf-8') as f:
    c = f.read()

c = c.replace('className="min-h-screen bg-[#0b1410] overflow-x-hidden"', 'className="min-h-screen bg-background overflow-x-hidden"')
c = c.replace('bg-[#0a1309]', 'bg-muted/20')
c = c.replace('bg-[#141e16]', 'bg-card')
c = c.replace('bg-[#1a2518]', 'bg-card')

# text-white (solid)
c = c.replace('"text-white ', '"text-foreground ')
c = c.replace(' text-white"', ' text-foreground"')
c = c.replace(' text-white ', ' text-foreground ')
c = c.replace('"text-white"', '"text-foreground"')

# text-white/NN
c = c.replace('text-white/40', 'text-muted-foreground')
c = c.replace('text-white/35', 'text-muted-foreground')
c = c.replace('text-white/30', 'text-muted-foreground')
c = c.replace('text-white/25', 'text-muted-foreground/70')
c = c.replace('text-white/20', 'text-muted-foreground/60')
c = c.replace('text-white/15', 'text-muted-foreground/50')
c = c.replace('text-white/60', 'text-foreground/70')
c = c.replace('text-white/55', 'text-foreground/65')
c = c.replace('text-white/50', 'text-foreground/60')
c = c.replace('text-white/45', 'text-muted-foreground')

# borders
c = c.replace('border-white/5', 'border-border')
c = c.replace('border-white/8', 'border-border')
c = c.replace('border-white/10', 'border-border')
c = c.replace('hover:border-white/10', 'hover:border-border')
c = c.replace('hover:border-white/15', 'hover:border-border')

# bg
c = c.replace('bg-white/[0.03]', 'bg-muted/30')
c = c.replace('bg-white/[0.04]', 'bg-muted')

# Fix inline gradient backgrounds
c = c.replace(
    """style={{ background: "linear-gradient(to bottom, #0a1309, #0b1410)" }}""",
    """style={{ background: 'var(--gradient-section, transparent)' }} className="absolute inset-0 pointer-events-none bg-gradient-to-b from-muted/20 to-background\""""
)

# Fix the inline text stroke for Delivery headings
c = c.replace(
    """style={{ WebkitTextStroke: "2px rgba(200,169,110,0.55)" }}""",
    """className="[-webkit-text-stroke:2px_#a68038] dark:[-webkit-text-stroke:2px_rgba(200,169,110,0.55)]\" """
)
c = c.replace(
    """style={{
                                WebkitTextStroke: "1px rgba(200,169,110,0.5)",
                            }}""",
    """className="[-webkit-text-stroke:1px_#a68038] dark:[-webkit-text-stroke:1px_rgba(200,169,110,0.5)]\" """
)

with open('app/delivery/page.tsx', 'w', encoding='utf-8') as f:
    f.write(c)

print("✓ Delivery page fixed")


# ═══════════════════════════════════════════════════════════
# 3. FIX LEGAL LAYOUT — duplicate className on policy links div
# ═══════════════════════════════════════════════════════════
with open('components/LegalLayout.tsx', 'r', encoding='utf-8') as f:
    c = f.read()

# Fix the duplicate className attributes
c = c.replace(
    'className="border-t border-border py-10" className="bg-gradient-to-b from-muted/30 to-background"',
    'className="border-t border-border py-10 bg-gradient-to-b from-muted/30 to-background"'
)

# Fix low-contrast sidebar text
c = c.replace('text-foreground/20', 'text-muted-foreground')
c = c.replace('text-foreground/30', 'text-muted-foreground')
c = c.replace('text-foreground/35', 'text-muted-foreground')
c = c.replace('text-foreground/50', 'text-foreground/70')

with open('components/LegalLayout.tsx', 'w', encoding='utf-8') as f:
    f.write(c)

print("✓ LegalLayout fixed")


# ═══════════════════════════════════════════════════════════
# 4. FIX FLOATING WHATSAPP — dark-only styles
# ═══════════════════════════════════════════════════════════
with open('components/FloatingWhatsApp.tsx', 'r', encoding='utf-8') as f:
    c = f.read()

c = c.replace('bg-[#0f1a12]', 'bg-card')
c = c.replace('bg-[#1a2518]', 'bg-muted')
c = c.replace('border-white/8', 'border-border')
c = c.replace('text-white/60', 'text-muted-foreground')
c = c.replace('"text-white ', '"text-foreground ')
c = c.replace(' text-white"', ' text-foreground"')
c = c.replace(' text-white ', ' text-foreground ')

with open('components/FloatingWhatsApp.tsx', 'w', encoding='utf-8') as f:
    f.write(c)

print("✓ FloatingWhatsApp fixed")

print("\n✅ All pages fixed!")
