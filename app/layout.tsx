import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { CartProvider } from "@/components/CartContext";
import "./globals.css";

const cormorant = Cormorant_Garamond({
 weight: ["300", "400", "500", "600", "700"],
 subsets: ["latin"],
 variable: "--font-cormorant",
});

const inter = Inter({
 subsets: ["latin"],
 variable: "--font-inter",
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
  <html lang="en" className="light">
   <body
    className={`${cormorant.variable} ${inter.variable} font-sans antialiased bg-background text-foreground`}
   >
    <CartProvider>
     {children}
    </CartProvider>
   </body>
  </html>
 );
}
