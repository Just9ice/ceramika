// ─────────────────────────────────────────────────────────────────────────────
// API LAYER – talks to Ceramika backend on Render
// ─────────────────────────────────────────────────────────────────────────────

import type { Product } from "./data";

const API_BASE = "https://ceramika-backend.onrender.com/api/v1";
const CLOUDINARY_BASE = "https://res.cloudinary.com/dpsufnobu/image/upload";

// ── Types from the backend ──────────────────────────────────────────────────

export interface ApiProduct {
  _id: string;
  sku: string;
  name: string;
  size: string;
  stock_sqm: number;
  effect: string;
  price_per_sqm: number;
  price_per_sqm_vat: number;
  sqm_per_carton: number;
  pieces_per_carton: number;
  weight_per_carton_kg: number;
  image_url: string;
  gallery_urls: string[];
  createdAt: string;
  updatedAt: string;
}

interface ApiProductsResponse {
  success: boolean;
  count: number;
  data: ApiProduct[];
}

export interface CheckoutPayload {
  customer_name: string;
  customer_phone: string;
  cart_items: {
    sku: string;
    name: string;
    cartons: number;
    price_per_carton: number;
  }[];
}

interface CheckoutResponse {
  success: boolean;
  reference: string;
  whatsapp_url: string;
}

// ── Effect → finish mapping ─────────────────────────────────────────────────
// The backend uses "effect" (e.g. "COLORED CLAY"), the frontend uses "finish"

function mapEffectToFinish(effect: string): string {
  const map: Record<string, string> = {
    "COLORED CLAY": "Coloured Clay",
    "MARBLE": "Marble",
    "TRAVERTINE": "Travertine",
    "WOOD": "Wood",
    "CEMENT": "Cement",
    "BRICK FACE": "Brick Face",
    "RUSTIC": "Rustic",
    "MOSAIC": "Mosaic",
    "BASIC": "Basic",
    "STONE": "Stone",
    "GRANITE": "Granite",
  };
  return map[effect.toUpperCase()] || effect;
}

// ── Resolve a working Cloudinary image URL ──────────────────────────────────
// The backend currently has placeholder cloud names. We construct the correct
// URL client-side from the SKU until the backend is updated.

function resolveImageUrl(apiUrl: string, sku: string): string {
  // If the backend URL already has our real cloud name, use it directly
  if (apiUrl.includes("dpsufnobu") && !apiUrl.includes("your_cloud_name_here")) {
    return apiUrl;
  }
  // Otherwise, construct from SKU
  return `${CLOUDINARY_BASE}/products/${sku}.jpg`;
}

function resolveAltImageUrl(sku: string): string {
  return `${CLOUDINARY_BASE}/products/${sku}_alt.jpg`;
}

// ── Gradient palette based on effect ────────────────────────────────────────

function effectGradient(effect: string): string {
  const map: Record<string, string> = {
    "COLORED CLAY": "from-stone-200 to-amber-100",
    "MARBLE": "from-white to-slate-100",
    "TRAVERTINE": "from-amber-100 to-stone-200",
    "WOOD": "from-amber-200 to-yellow-100",
    "CEMENT": "from-gray-200 to-stone-100",
    "BRICK FACE": "from-orange-200 to-red-100",
    "RUSTIC": "from-orange-300 to-amber-200",
    "MOSAIC": "from-blue-200 to-cyan-100",
    "BASIC": "from-stone-100 to-gray-100",
    "STONE": "from-slate-200 to-gray-100",
    "GRANITE": "from-gray-300 to-stone-200",
  };
  return map[effect.toUpperCase()] || "from-stone-200 to-amber-100";
}

function effectAccent(effect: string): string {
  const map: Record<string, string> = {
    "COLORED CLAY": "#c8a96e",
    "MARBLE": "#94a3b8",
    "TRAVERTINE": "#d97706",
    "WOOD": "#92400e",
    "CEMENT": "#6b7280",
    "BRICK FACE": "#ea580c",
    "RUSTIC": "#ea580c",
    "MOSAIC": "#0891b2",
    "BASIC": "#78716c",
    "STONE": "#78716c",
    "GRANITE": "#57534e",
  };
  return map[effect.toUpperCase()] || "#c8a96e";
}

// ── Transform API product → frontend Product ───────────────────────────────

function transformProduct(api: ApiProduct): Product {
  return {
    id: api.sku, // Use SKU as the unique ID (human-readable, SEO-friendly)
    name: api.name,
    sku: api.sku,
    material: "Porcelain", // All products from this supplier are porcelain
    finish: mapEffectToFinish(api.effect),
    effect: api.effect,
    room: "Floor", // Default; could be enriched later
    pricePerSqm: api.price_per_sqm,
    pricePerSqmVat: api.price_per_sqm_vat,
    size: api.size,
    gradient: effectGradient(api.effect),
    accent: effectAccent(api.effect),
    description: `${api.name} — ${api.size} porcelain tile with ${mapEffectToFinish(api.effect).toLowerCase()} effect. Premium quality Spanish porcelain.`,
    cartonSqm: api.sqm_per_carton,
    piecesPerCarton: api.pieces_per_carton,
    weightPerCartonKg: api.weight_per_carton_kg,
    stockSqm: api.stock_sqm,
    inStock: api.stock_sqm > 0,
    image: resolveImageUrl(api.image_url, api.sku),
    image2: resolveAltImageUrl(api.sku),
  };
}

// ── Public API ──────────────────────────────────────────────────────────────

let cachedProducts: Product[] | null = null;

export async function fetchProducts(): Promise<Product[]> {
  if (cachedProducts) return cachedProducts;

  const res = await fetch(`${API_BASE}/products`, {
    next: { revalidate: 300 }, // Cache for 5 minutes in Next.js
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch products: ${res.status}`);
  }

  const json: ApiProductsResponse = await res.json();
  cachedProducts = json.data.map(transformProduct);
  return cachedProducts;
}

/** Force a fresh fetch (e.g., after stock changes) */
export function invalidateProductCache() {
  cachedProducts = null;
}

export async function submitWhatsAppCheckout(
  payload: CheckoutPayload
): Promise<CheckoutResponse> {
  const res = await fetch(`${API_BASE}/whatsapp-checkout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(
      (err as { message?: string }).message || `Checkout failed: ${res.status}`
    );
  }

  return res.json();
}
