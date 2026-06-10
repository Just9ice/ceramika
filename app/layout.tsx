import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { CartProvider } from "@/components/CartContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | CeramiKa",
    default: "CeramiKa | Nigeria's Premier Tile Store",
  },
  description: "Premium porcelain, ceramic, and marble tiles. Shop the best tile collections for floors and walls online, with delivery across Nigeria.",
  keywords: ["tiles", "nigeria", "porcelain", "ceramic", "marble", "ceramika", "flooring", "wall tiles"],
  openGraph: {
    title: "CeramiKa | Nigeria's Premier Tile Store",
    description: "Premium porcelain, ceramic, and marble tiles. Delivered across Nigeria.",
    siteName: "CeramiKa",
    locale: "en_NG",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <CartProvider>
            {children}
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
