// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

export interface Product {
  id: number;
  name: string;
  material: "Porcelain" | "Ceramic" | "Marble" | "Granite";
  finish: "Glossy" | "Matte" | "Polished" | "Satin";
  room: "Bathroom" | "Kitchen" | "Floor" | "Wall" | "Outdoor";
  pricePerSqm: number;
  size: string;
  tag?: "Bestseller" | "New" | "Premium" | "Luxury" | "Sale";
  gradient: string;   // Tailwind gradient classes e.g. "from-stone-200 to-amber-100"
  accent: string;     // hex colour for tag text and highlights
  description: string;
  cartonSqm: number;  // how many sqm come in one carton
  inStock: boolean;
  rating: number;     // 1–5
  reviewCount: number;
  image?: string;      // primary product photo path e.g. "/products/lagos-ivory.jpg"
  image2?: string;     // secondary photo shown on hover
}

export interface CartItem extends Product {
  sqm: number; // quantity the user wants, in square metres
}

export interface Project {
  id: number;
  title: string;
  location: string;
  type: "Residential" | "Commercial" | "Hospitality" | "Industrial" | "Healthcare" | "Education" | "Other";
  gradient: string;
  tiles: string[];   // product names used
  year: number;
  image: string;
  gallery?: string[];
}

export interface Testimonial {
  name: string;
  location: string;
  text: string;
  stars: number;
  project: string;
}

export interface FaqItem {
  q: string;
  a: string;
  category: "Ordering" | "Delivery" | "Payment" | "Products" | "Showroom";
}

// ─────────────────────────────────────────────────────────────────────────────
// SITE CONSTANTS  (change these to real values before go-live)
// ─────────────────────────────────────────────────────────────────────────────

export const WA_NUMBER = "2348100000000"; // no + sign, no spaces
export const PHONE = "+234 810 000 0000";
export const EMAIL = "hello@ceramika.ng";
export const ADDRESS = "12 Tiles Avenue, Victoria Island, Lagos";
export const HOURS = "Monday – Saturday: 8:00 am – 6:00 pm";

// ─────────────────────────────────────────────────────────────────────────────
// WHATSAPP HELPERS
// ─────────────────────────────────────────────────────────────────────────────

/** Opens WhatsApp with a pre-filled message about a specific product */
export function waProductLink(product: Product): string {
  const text = [
    `Hello CeramiKa! `,
    `I'm interested in *${product.name}* (${product.size}, ${product.finish} ${product.material}).`,
    `Price: ₦${product.pricePerSqm.toLocaleString()}/sqm`,
    ``,
    `Can I get more details and confirm availability?`,
  ].join("\n");
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
}

/** Opens WhatsApp with the user's full cart as a pre-filled order message */
export function waCartLink(items: CartItem[]): string {
  const lines = items.map(
    (i) =>
      `• ${i.name} — ${i.sqm} sqm × ₦${i.pricePerSqm.toLocaleString()} = ₦${(
        i.sqm * i.pricePerSqm
      ).toLocaleString()}`
  );
  const total = items.reduce((s, i) => s + i.sqm * i.pricePerSqm, 0);
  const text = [
    `Hello CeramiKa!  I'd like to place an order:`,
    ``,
    ...lines,
    ``,
    `*Total: ₦${total.toLocaleString()}*`,
    ``,
    `Please confirm availability and delivery details.`,
  ].join("\n");
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
}

/** Opens WhatsApp with a general / custom message */
export function waGeneralLink(
  message = "Hello CeramiKa! I need help choosing tiles for my project."
): string {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}

// ─────────────────────────────────────────────────────────────────────────────
// PRODUCTS  (replace with CMS / API fetch in production)
// ─────────────────────────────────────────────────────────────────────────────

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Lagos Ivory Marble",
    material: "Porcelain",
    finish: "Glossy",
    room: "Bathroom",
    pricePerSqm: 18500,
    size: "60×60cm",
    tag: "Bestseller",
    gradient: "from-stone-200 to-amber-100",
    accent: "#c8a96e",
    description:
      "Luxurious ivory marble-effect porcelain with deep veining. Perfect for bathrooms and feature walls. Easy to clean and highly water resistant.",
    cartonSqm: 1.44,
    inStock: true,
    rating: 4.9,
    reviewCount: 87,
    image: '/NORWHICH_SAND_MATE.jpg',
    image2: '/Norwich_sand_mate_2.jpg'
  },
  {
    id: 2,
    name: "Abuja Slate Grey",
    material: "Ceramic",
    finish: "Matte",
    room: "Floor",
    pricePerSqm: 12000,
    size: "80×80cm",
    tag: "New",
    gradient: "from-slate-300 to-gray-200",
    accent: "#6b7280",
    description:
      "Contemporary slate-effect ceramic with a refined matte finish. Slip-resistant and highly durable for high-traffic floor areas.",
    cartonSqm: 1.92,
    inStock: true,
    rating: 4.7,
    reviewCount: 43,
    image: '/slate-gray.jpg',
    image2: '/slate2.jpg'
  },
  {
    id: 3,
    name: "Enugu Forest Green",
    material: "Porcelain",
    finish: "Matte",
    room: "Kitchen",
    pricePerSqm: 22000,
    size: "60×120cm",
    tag: "Premium",
    gradient: "from-emerald-200 to-teal-100",
    accent: "#059669",
    description:
      "Bold forest green large-format porcelain. Makes a dramatic statement in kitchens and open-plan spaces. Stain and scratch resistant.",
    cartonSqm: 1.44,
    inStock: true,
    rating: 4.8,
    reviewCount: 31,
    image: '/green2.jpg',
    image2: '/forest-green.jpg'
  },
  {
    id: 4,
    name: "Kano Desert Sand",
    material: "Ceramic",
    finish: "Matte",
    room: "Floor",
    pricePerSqm: 9500,
    size: "45×45cm",
    gradient: "from-amber-200 to-yellow-100",
    accent: "#d97706",
    description:
      "Warm desert sand tones with subtle texture. Affordable and versatile, suitable for living rooms, hallways, and outdoor terraces.",
    cartonSqm: 1.215,
    inStock: true,
    rating: 4.5,
    reviewCount: 128,
    image: '/desert-sand.jpg',
    image2: '/sand2.jpg'
  },
  {
    id: 5,
    name: "Port Harcourt Noir",
    material: "Marble",
    finish: "Polished",
    room: "Bathroom",
    pricePerSqm: 35000,
    size: "60×60cm",
    tag: "Luxury",
    gradient: "from-zinc-800 to-neutral-700",
    accent: "#d4af37",
    description:
      "Genuine black marble with gold veining. The ultimate luxury statement for master bathrooms and hotel-grade finishes.",
    cartonSqm: 1.44,
    inStock: true,
    rating: 5.0,
    reviewCount: 19,
    image: '/noir2.jpg',
    image2: '/Noir.jpg'
  },
  {
    id: 6,
    name: "Ibadan Terracotta",
    material: "Ceramic",
    finish: "Matte",
    room: "Kitchen",
    pricePerSqm: 11000,
    size: "30×60cm",
    gradient: "from-orange-200 to-red-100",
    accent: "#ea580c",
    description:
      "Warm terracotta-inspired ceramic with handcrafted texture variation. Brings an authentic Nigerian aesthetic to kitchens and dining areas.",
    cartonSqm: 1.08,
    inStock: true,
    rating: 4.6,
    reviewCount: 55,
    image: '/terracotta.jpg',
    image2: '/terracotta2.jpg'
  },
  {
    id: 7,
    name: "Kaduna Arctic White",
    material: "Porcelain",
    finish: "Glossy",
    room: "Wall",
    pricePerSqm: 14500,
    size: "30×90cm",
    tag: "New",
    gradient: "from-white to-slate-100",
    accent: "#94a3b8",
    description:
      "Pure arctic white high-gloss wall porcelain. Maximises light reflection in smaller spaces. Ideal for bathrooms, kitchens, and feature walls.",
    cartonSqm: 1.35,
    inStock: true,
    rating: 4.7,
    reviewCount: 22,
    image: '/white.jpg',
    image2: '/white2.jpg'
  },
  {
    id: 8,
    name: "Benin Bronze",
    material: "Ceramic",
    finish: "Satin",
    room: "Floor",
    pricePerSqm: 16000,
    size: "60×60cm",
    tag: "Premium",
    gradient: "from-yellow-700 to-amber-600",
    accent: "#92400e",
    description:
      "Rich bronze-toned ceramic inspired by Benin Kingdom artistry. A cultural statement piece with a sophisticated satin finish.",
    cartonSqm: 1.44,
    inStock: false,
    rating: 4.8,
    reviewCount: 14,
    image: '/bronze.jpg',
    image2: '/bronze2.jpg'
  },
  {
    id: 9,
    name: "Calabar Ocean Blue",
    material: "Porcelain",
    finish: "Glossy",
    room: "Bathroom",
    pricePerSqm: 19500,
    size: "30×60cm",
    gradient: "from-blue-300 to-cyan-200",
    accent: "#0891b2",
    description:
      "Deep ocean blue glazed porcelain inspired by the Cross River. Brings a calming coastal energy to any bathroom or wet room.",
    cartonSqm: 1.08,
    inStock: true,
    rating: 4.6,
    reviewCount: 38,
    image: '/blue.jpg',
    image2: '/blue2.jpg'
  },
  {
    id: 10,
    name: "Ogun Granite Grey",
    material: "Granite",
    finish: "Polished",
    room: "Outdoor",
    pricePerSqm: 27000,
    size: "60×60cm",
    tag: "Premium",
    gradient: "from-gray-500 to-stone-400",
    accent: "#78716c",
    description:
      "Natural granite quarried from Ogun State. Extremely durable, frost resistant, and ideal for driveways, patios, and outdoor spaces.",
    cartonSqm: 1.44,
    inStock: true,
    rating: 4.9,
    reviewCount: 29,
    image: '/slate-gray.jpg',
    image2: '/slate-gray2.jpg'
  },
  {
    id: 11,
    name: "Sokoto Rose Quartz",
    material: "Marble",
    finish: "Polished",
    room: "Wall",
    pricePerSqm: 42000,
    size: "60×120cm",
    tag: "Luxury",
    gradient: "from-pink-200 to-rose-100",
    accent: "#e11d48",
    description:
      "Rare rose quartz marble from northern Nigeria. Each slab is unique. Exclusively for high-end residential and hospitality projects.",
    cartonSqm: 1.44,
    inStock: true,
    rating: 5.0,
    reviewCount: 7,
    image: '/rose-quartz.jpg',
    image2: '/rose-quartz2.jpg'
  },
  {
    id: 12,
    name: "Ondo Olive Green",
    material: "Ceramic",
    finish: "Matte",
    room: "Kitchen",
    pricePerSqm: 10500,
    size: "15×60cm",
    tag: "Sale",
    gradient: "from-lime-200 to-green-100",
    accent: "#65a30d",
    description:
      "Trending elongated format in earthy olive green. Perfect for kitchen splashbacks and bathroom walls. Currently on sale while stocks last.",
    cartonSqm: 0.9,
    inStock: true,
    rating: 4.4,
    reviewCount: 67,
    image: '/olive-green.jpg',
    image2: '/olive-green2.jpg'
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// PROJECTS
// ─────────────────────────────────────────────────────────────────────────────

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Ikoyi Luxury Villa",
    location: "Ikoyi, Lagos",
    type: "Residential",
    gradient: "from-stone-300 to-amber-200",
    tiles: ["Lagos Ivory Marble", "Port Harcourt Noir"],
    year: 2024,
    image: '/ikoyi-villa-1.jpg',
    gallery: [
      '/ikoyi-villa-1.jpg',
      '/ikoyi-villa-2.jpg',
      '/ikoyi-villa-3.jpg',
    ],
  },
  {
    id: 2,
    title: "Transcorp Hilton Renovation",
    location: "Maitama, Abuja",
    type: "Hospitality",
    gradient: "from-slate-400 to-zinc-300",
    tiles: ["Abuja Slate Grey", "Kaduna Arctic White"],
    year: 2024,
    image: '/transcorp-hilton-1.jpg',
    gallery: [
      '/transcorp-hilton-1.jpg',
      '/transcorp-hilton-2.jpg',
      '/transcorp-hilton-3.jpg',
    ],
  },
  {
    id: 3,
    title: "Mainland Modern Apartments",
    location: "Yaba, Lagos",
    type: "Residential",
    gradient: "from-emerald-300 to-teal-200",
    tiles: ["Enugu Forest Green", "Kano Desert Sand"],
    year: 2023,
    image: '/mainland-apartments-1.jpg',
    gallery: [
      '/mainland-apartments-1.jpg',
      '/mainland-apartments-2.jpg',
      '/mainland-apartments-3.jpg',
    ],
  },
  {
    id: 4,
    title: "Lekki Phase 1 Penthouse",
    location: "Lekki, Lagos",
    type: "Residential",
    gradient: "from-amber-300 to-orange-200",
    tiles: ["Sokoto Rose Quartz", "Benin Bronze"],
    year: 2024,
    image: '/lekki-penthouse-1.jpg',
    gallery: [
      '/lekki-penthouse-1.jpg',
      '/lekki-penthouse-2.jpg',
      '/lekki-penthouse-3.jpg',
    ],
  },
  {
    id: 5,
    title: "Port Harcourt Mall",
    location: "GRA, Port Harcourt",
    type: "Commercial",
    gradient: "from-blue-300 to-cyan-200",
    tiles: ["Ogun Granite Grey", "Calabar Ocean Blue"],
    year: 2023,
    image: '/ph-mall-1.jpg',
    gallery: [
      '/ph-mall-1.jpg',
      '/ph-mall-2.jpg',
      '/ph-mall-3.jpg',
    ],
  },
  {
    id: 6,
    title: "Asokoro Diplomatic Residence",
    location: "Asokoro, Abuja",
    type: "Residential",
    gradient: "from-rose-300 to-pink-200",
    tiles: ["Port Harcourt Noir", "Kaduna Arctic White"],
    year: 2024,
    image: '/asokoro-residence-1.jpg',
    gallery: [
      '/asokoro-residence-1.jpg',
      '/asokoro-residence-2.jpg',
      '/asokoro-residence-3.jpg',
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// TESTIMONIALS
// ─────────────────────────────────────────────────────────────────────────────

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Adaeze Julia O.",
    location: "Lekki, Lagos",
    text: "Ordered 120 sqm for my new build. Tiles arrived in perfect condition, WhatsApp updates throughout. Absolutely love the quality!",
    stars: 5,
    project: "New Build Home",
  },
  {
    name: "Awesome Ebube R.",
    location: "Asokoro, Abuja",
    text: "The SQM calculator saved me from over-ordering. Saved almost ₦80,000 compared to my estimate. Will order again.",
    stars: 5,
    project: "Office Renovation",
  },
  {
    name: "Chidinmma A.",
    location: "GRA, Port Harcourt",
    text: "Fast response on WhatsApp, even on weekends. The showroom photos helped me decide between two tiles. Highly recommend.",
    stars: 5,
    project: "Bathroom Remodel",
  },
  {
    name: "Biodun K.",
    location: "Yaba, Lagos",
    text: "Best tile prices I found in Nigeria. Delivery to my site was on time and the driver called ahead. Professional all round.",
    stars: 5,
    project: "Apartment Complex",
  },
  {
    name: "Chisom E.",
    location: "Enugu",
    text: "I was skeptical about ordering tiles online but the team on WhatsApp was so helpful. They sent me samples first. Converted!",
    stars: 4,
    project: "Kitchen Remodel",
  },
  {
    name: "Musa B.",
    location: "Kano",
    text: "Delivered to Kano in 5 days. Packaging was excellent — not a single broken tile. Will be using CeramiKa for all my projects.",
    stars: 5,
    project: "Hotel Renovation",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// FAQs
// ─────────────────────────────────────────────────────────────────────────────

export const FAQS: FaqItem[] = [
  {
    q: "Do you deliver outside Lagos?",
    a: "Yes! We deliver nationwide across Nigeria. Lagos and Abuja are typically 1–3 business days; other states take 3–7 days. Contact us on WhatsApp for a delivery quote.",
    category: "Delivery",
  },
  {
    q: "Can I order via WhatsApp without using the website checkout?",
    a: "Absolutely — most of our customers prefer WhatsApp ordering. Send us your tile choice, quantity in SQM, and delivery address. Our team will confirm stock, send a payment link, and coordinate delivery.",
    category: "Ordering",
  },
  {
    q: "How do I calculate how many tiles I need?",
    a: "Use our free SQM Calculator. Enter your room's length and width in metres — we calculate the SQM, add a 10% wastage buffer, and show the total cost and number of cartons.",
    category: "Products",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept Paystack, Flutterwave (card payments), Direct Bank Transfer, and cash on delivery for select Lagos locations. All prices are in Nigerian Naira (₦).",
    category: "Payment",
  },
  {
    q: "Can I visit a showroom before buying?",
    a: "Yes! Our showroom at 12 Tiles Avenue, Victoria Island Lagos is open Monday to Saturday, 8am–6pm. See full tile samples, room scenes, and speak with our design consultants.",
    category: "Showroom",
  },
  {
    q: "What is your returns policy?",
    a: "Unused tiles in original packaging can be returned within 14 days of delivery. We do not accept returns on cut tiles. Contact us within 48 hours of delivery if tiles arrive damaged — we'll arrange a replacement.",
    category: "Ordering",
  },
  {
    q: "Do you offer installation services?",
    a: "We don't install directly, but we have a vetted network of professional tilers across Lagos and Abuja. Ask our team on WhatsApp for a referral.",
    category: "Products",
  },
  {
    q: "Are your tiles suitable for outdoor use?",
    a: "Some tiles — like Ogun Granite Grey — are specifically rated for outdoor use. They are slip-resistant and frost-resistant. Look for the 'Outdoor' room tag when browsing.",
    category: "Products",
  },
];
