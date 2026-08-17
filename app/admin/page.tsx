'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Check, AlertCircle } from 'lucide-react';
import Navbar from "@/components/navbar";
import Footer from "@/components/Footer";
import { Product } from "@/lib/data";
import { fetchProducts, ApiProduct } from "@/lib/api";

// ── Constants ────────────────────────────────────────────────────────────────
const ITEMS_PER_PAGE = 10;
const API_BASE = "https://ceramika-backend.onrender.com/api/v1";

const EFFECT_OPTIONS = [
  "COLORED CLAY", "MARBLE", "TRAVERTINE", "WOOD", "CEMENT",
  "BRICK FACE", "RUSTIC", "MOSAIC", "BASIC", "STONE", "GRANITE",
];

// ── Toast Component ──────────────────────────────────────────────────────────
function Toast({ message, type, onClose }: { message: string; type: 'success' | 'error'; onClose: () => void }) {
  useEffect(() => {
    const t = setTimeout(onClose, 4000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      className={`fixed bottom-6 right-6 z-[200] flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-2xl text-sm font-semibold ${
        type === 'success'
          ? 'bg-green-600 text-white'
          : 'bg-red-600 text-white'
      }`}
    >
      {type === 'success' ? <Check className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
      {message}
    </motion.div>
  );
}

// ── Form field type ──────────────────────────────────────────────────────────
interface ProductFormData {
  sku: string;
  name: string;
  effect: string;
  size: string;
  price_per_sqm: number;
  price_per_sqm_vat: number;
  stock_sqm: number;
  sqm_per_carton: number;
  pieces_per_carton: number;
  weight_per_carton_kg: number;
  image_url: string;
}

const emptyForm: ProductFormData = {
  sku: '',
  name: '',
  effect: 'COLORED CLAY',
  size: '',
  price_per_sqm: 0,
  price_per_sqm_vat: 0,
  stock_sqm: 0,
  sqm_per_carton: 0,
  pieces_per_carton: 0,
  weight_per_carton_kg: 0,
  image_url: '',
};

function productToFormData(p: Product): ProductFormData {
  return {
    sku: p.sku || p.id,
    name: p.name,
    effect: p.effect || '',
    size: p.size,
    price_per_sqm: p.pricePerSqm,
    price_per_sqm_vat: p.pricePerSqmVat,
    stock_sqm: p.stockSqm,
    sqm_per_carton: p.cartonSqm,
    pieces_per_carton: p.piecesPerCarton,
    weight_per_carton_kg: p.weightPerCartonKg,
    image_url: p.image || '',
  };
}

// ── Product Modal ────────────────────────────────────────────────────────────
function ProductModal({
  mode,
  initialData,
  onClose,
  onSubmit,
  saving,
}: {
  mode: 'add' | 'edit';
  initialData: ProductFormData;
  onClose: () => void;
  onSubmit: (data: ProductFormData) => void;
  saving: boolean;
}) {
  const [form, setForm] = useState<ProductFormData>(initialData);

  const set = (key: keyof ProductFormData, value: string | number) =>
    setForm(prev => ({ ...prev, [key]: value }));

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  const inputClass = "w-full bg-transparent border border-border rounded-lg px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-[#c8a96e]/50 focus:border-[#c8a96e] transition-all";
  const labelClass = "block text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="bg-card w-full max-w-2xl rounded-2xl shadow-2xl border border-border overflow-hidden max-h-[90vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border">
          <div>
            <h2 className="text-xl font-black text-foreground" style={{ fontFamily: "'Georgia', serif" }}>
              {mode === 'add' ? 'Add New Product' : 'Edit Product'}
            </h2>
            <p className="text-xs text-muted-foreground mt-1">
              {mode === 'add' ? 'Fill in the details to create a new product.' : `Editing: ${initialData.name}`}
            </p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-muted rounded-lg transition-colors">
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-6 py-6 space-y-5">
          {/* Row 1: SKU + Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>SKU</label>
              <input
                className={inputClass}
                value={form.sku}
                onChange={e => set('sku', e.target.value)}
                placeholder="e.g. PRSCE11CROSEASTIVRM2"
                required
                disabled={mode === 'edit'}
              />
            </div>
            <div>
              <label className={labelClass}>Product Name</label>
              <input
                className={inputClass}
                value={form.name}
                onChange={e => set('name', e.target.value)}
                placeholder="e.g. RS WEST IVORY MT"
                required
              />
            </div>
          </div>

          {/* Row 2: Effect + Size */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Effect / Finish</label>
              <select
                className={inputClass}
                value={form.effect}
                onChange={e => set('effect', e.target.value)}
              >
                {EFFECT_OPTIONS.map(e => (
                  <option key={e} value={e}>{e}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>Size</label>
              <input
                className={inputClass}
                value={form.size}
                onChange={e => set('size', e.target.value)}
                placeholder="e.g. 120x120"
              />
            </div>
          </div>

          {/* Row 3: Price + Price VAT */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Price (₦/sqm)</label>
              <input
                type="number"
                className={inputClass}
                value={form.price_per_sqm || ''}
                onChange={e => set('price_per_sqm', Number(e.target.value))}
                placeholder="36900"
                required
              />
            </div>
            <div>
              <label className={labelClass}>Price w/ VAT (₦/sqm)</label>
              <input
                type="number"
                className={inputClass}
                value={form.price_per_sqm_vat || ''}
                onChange={e => set('price_per_sqm_vat', Number(e.target.value))}
                placeholder="43065"
              />
            </div>
          </div>

          {/* Row 4: Stock + SQM per carton */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Stock (sqm)</label>
              <input
                type="number"
                className={inputClass}
                value={form.stock_sqm || ''}
                onChange={e => set('stock_sqm', Number(e.target.value))}
                placeholder="282"
              />
            </div>
            <div>
              <label className={labelClass}>SQM per Carton</label>
              <input
                type="number"
                step="0.01"
                className={inputClass}
                value={form.sqm_per_carton || ''}
                onChange={e => set('sqm_per_carton', Number(e.target.value))}
                placeholder="1.44"
              />
            </div>
          </div>

          {/* Row 5: Pieces per carton + Weight */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Pieces per Carton</label>
              <input
                type="number"
                className={inputClass}
                value={form.pieces_per_carton || ''}
                onChange={e => set('pieces_per_carton', Number(e.target.value))}
                placeholder="3"
              />
            </div>
            <div>
              <label className={labelClass}>Weight per Carton (kg)</label>
              <input
                type="number"
                step="0.1"
                className={inputClass}
                value={form.weight_per_carton_kg || ''}
                onChange={e => set('weight_per_carton_kg', Number(e.target.value))}
                placeholder="32.5"
              />
            </div>
          </div>

          {/* Row 6: Image URL */}
          <div>
            <label className={labelClass}>Image URL</label>
            <input
              className={inputClass}
              value={form.image_url}
              onChange={e => set('image_url', e.target.value)}
              placeholder="https://res.cloudinary.com/..."
            />
          </div>
        </form>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-border bg-muted/30">
          <button
            type="button"
            onClick={onClose}
            className="text-xs font-semibold text-muted-foreground hover:text-foreground px-5 py-2.5 rounded-lg border border-border transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            onClick={handleSubmit}
            className="bg-[#c8a96e] hover:bg-[#d4b87e] disabled:opacity-50 text-[#0f1a12] font-black text-xs uppercase tracking-widest px-6 py-2.5 rounded-lg transition-all"
          >
            {saving ? 'Saving...' : mode === 'add' ? 'Create Product' : 'Save Changes'}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Main Admin Page ──────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  // Modal state
  const [modalMode, setModalMode] = useState<'add' | 'edit' | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [saving, setSaving] = useState(false);

  // Toast state
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    fetchProducts()
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load products:", err);
        setLoading(false);
      });
  }, []);

  // ── Pagination logic ─────────────────────────────────────────────────────
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return products.slice(start, start + ITEMS_PER_PAGE);
  }, [products, currentPage]);

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  // Generate page numbers to display
  const pageNumbers = useMemo(() => {
    const pages: (number | '...')[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('...');
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        pages.push(i);
      }
      if (currentPage < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  }, [currentPage, totalPages]);

  // ── Handlers ─────────────────────────────────────────────────────────────
  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setModalMode('edit');
  };

  const handleAddNew = () => {
    setEditingProduct(null);
    setModalMode('add');
  };

  const handleDelete = async (product: Product) => {
    if (!confirm(`Are you sure you want to delete "${product.name}"?`)) return;

    // Try backend first
    try {
      const res = await fetch(`${API_BASE}/products/${product.sku}`, { method: 'DELETE' });
      if (res.ok) {
        setProducts(prev => prev.filter(p => p.id !== product.id));
        setToast({ message: `"${product.name}" deleted successfully.`, type: 'success' });
        return;
      }
    } catch { /* Backend not available */ }

    // Optimistic local delete
    setProducts(prev => prev.filter(p => p.id !== product.id));
    setToast({ message: `"${product.name}" removed locally. Backend sync pending.`, type: 'success' });
  };

  const handleModalSubmit = async (data: ProductFormData) => {
    setSaving(true);

    if (modalMode === 'edit' && editingProduct) {
      // Try PUT to backend
      try {
        const res = await fetch(`${API_BASE}/products/${editingProduct.sku || editingProduct.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        if (res.ok) {
          // Update local state with backend response
          setProducts(prev => prev.map(p =>
            p.id === editingProduct.id
              ? { ...p, name: data.name, effect: data.effect, size: data.size, pricePerSqm: data.price_per_sqm, pricePerSqmVat: data.price_per_sqm_vat, stockSqm: data.stock_sqm, inStock: data.stock_sqm > 0, cartonSqm: data.sqm_per_carton, piecesPerCarton: data.pieces_per_carton, weightPerCartonKg: data.weight_per_carton_kg }
              : p
          ));
          setToast({ message: `"${data.name}" updated successfully!`, type: 'success' });
          setModalMode(null);
          setSaving(false);
          return;
        }
      } catch { /* Backend not available */ }

      // Optimistic local update
      setProducts(prev => prev.map(p =>
        p.id === editingProduct.id
          ? { ...p, name: data.name, effect: data.effect, size: data.size, pricePerSqm: data.price_per_sqm, pricePerSqmVat: data.price_per_sqm_vat, stockSqm: data.stock_sqm, inStock: data.stock_sqm > 0, cartonSqm: data.sqm_per_carton, piecesPerCarton: data.pieces_per_carton, weightPerCartonKg: data.weight_per_carton_kg }
          : p
      ));
      setToast({ message: `"${data.name}" updated locally. Backend sync pending.`, type: 'success' });
    }

    if (modalMode === 'add') {
      // Try POST to backend
      try {
        const res = await fetch(`${API_BASE}/products`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        if (res.ok) {
          const json = await res.json();
          // Refetch to get the transformed product
          const refreshed = await fetchProducts();
          setProducts(refreshed);
          setToast({ message: `"${data.name}" created successfully!`, type: 'success' });
          setModalMode(null);
          setSaving(false);
          return;
        }
      } catch { /* Backend not available */ }

      // Optimistic local add
      const newProduct: Product = {
        id: data.sku,
        sku: data.sku,
        name: data.name,
        material: 'Porcelain',
        finish: data.effect,
        effect: data.effect,
        room: 'Floor',
        pricePerSqm: data.price_per_sqm,
        pricePerSqmVat: data.price_per_sqm_vat,
        size: data.size,
        gradient: 'from-stone-200 to-amber-100',
        accent: '#c8a96e',
        description: `${data.name} — ${data.size} porcelain tile`,
        cartonSqm: data.sqm_per_carton,
        piecesPerCarton: data.pieces_per_carton,
        weightPerCartonKg: data.weight_per_carton_kg,
        stockSqm: data.stock_sqm,
        inStock: data.stock_sqm > 0,
        image: data.image_url,
      };
      setProducts(prev => [newProduct, ...prev]);
      setCurrentPage(1); // Go to first page to see new product
      setToast({ message: `"${data.name}" added locally. Backend sync pending.`, type: 'success' });
    }

    setModalMode(null);
    setSaving(false);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col pt-20">
      <Navbar cartCount={0} onCartOpen={() => {}} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8 border-b border-border pb-6">
          <div>
            <h1 className="text-3xl font-black text-foreground mb-2" style={{ fontFamily: "'Georgia', serif" }}>
              Admin Product Management
            </h1>
            <p className="text-muted-foreground text-sm">
              View, edit, or manage products fetched live from the backend database.
              <span className="ml-2 text-xs text-muted-foreground/70">({products.length} total products)</span>
            </p>
          </div>
          <button
            onClick={handleAddNew}
            className="bg-[#c8a96e] hover:bg-[#d4b87e] text-[#0f1a12] font-black text-xs uppercase tracking-widest px-6 py-3 rounded-xl transition-all"
          >
            + Add New Product
          </button>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-sm animate-pulse">Loading backend inventory...</p>
          </div>
        ) : (
          <>
            <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-muted/50 text-muted-foreground text-xs uppercase tracking-wider border-b border-border">
                    <tr>
                      <th className="p-4">SKU / ID</th>
                      <th className="p-4">Product Name</th>
                      <th className="p-4">Effect</th>
                      <th className="p-4">Size</th>
                      <th className="p-4">Price (₦/sqm)</th>
                      <th className="p-4">Stock (sqm)</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {paginatedProducts.map((p) => (
                      <tr key={p.id} className="hover:bg-muted/30 transition-colors">
                        <td className="p-4 font-mono text-xs text-muted-foreground">{p.sku || p.id}</td>
                        <td className="p-4 font-semibold text-foreground">{p.name}</td>
                        <td className="p-4 text-muted-foreground">{p.finish}</td>
                        <td className="p-4 text-muted-foreground font-mono text-xs">{p.size}</td>
                        <td className="p-4 font-semibold text-[#c8a96e]">₦{p.pricePerSqm.toLocaleString()}</td>
                        <td className="p-4">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${p.inStock ? 'bg-green-500/10 text-green-600' : 'bg-red-500/10 text-red-600'}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${p.inStock ? 'bg-green-500' : 'bg-red-500'}`} />
                            {p.inStock ? `${p.stockSqm.toFixed(0)} sqm` : 'Out of Stock'}
                          </span>
                        </td>
                        <td className="p-4 text-right space-x-2">
                          <button
                            onClick={() => handleEdit(p)}
                            className="text-xs font-semibold text-muted-foreground hover:text-foreground px-3 py-1.5 rounded border border-border hover:border-[#c8a96e] hover:text-[#c8a96e] transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(p)}
                            className="text-xs font-semibold text-red-500 hover:text-red-600 px-3 py-1.5 rounded border border-red-200 hover:border-red-300 transition-colors"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-6 px-2">
                <p className="text-xs text-muted-foreground">
                  Showing {((currentPage - 1) * ITEMS_PER_PAGE) + 1}–{Math.min(currentPage * ITEMS_PER_PAGE, products.length)} of {products.length} products
                </p>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg border border-border hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  {pageNumbers.map((page, idx) =>
                    page === '...' ? (
                      <span key={`dots-${idx}`} className="px-2 text-muted-foreground text-sm">…</span>
                    ) : (
                      <button
                        key={page}
                        onClick={() => goToPage(page as number)}
                        className={`w-9 h-9 rounded-lg text-xs font-bold transition-all ${
                          currentPage === page
                            ? 'bg-[#c8a96e] text-[#0f1a12] shadow-md'
                            : 'border border-border hover:bg-muted text-muted-foreground'
                        }`}
                      >
                        {page}
                      </button>
                    )
                  )}

                  <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg border border-border hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </main>

      <Footer />

      {/* Product Modal (Add / Edit) */}
      <AnimatePresence>
        {modalMode && (
          <ProductModal
            mode={modalMode}
            initialData={editingProduct ? productToFormData(editingProduct) : emptyForm}
            onClose={() => { setModalMode(null); setEditingProduct(null); }}
            onSubmit={handleModalSubmit}
            saving={saving}
          />
        )}
      </AnimatePresence>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      </AnimatePresence>
    </div>
  );
}
