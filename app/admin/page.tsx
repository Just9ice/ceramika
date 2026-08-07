'use client';

import React, { useState, useEffect } from 'react';
import Navbar from "@/components/navbar";
import Footer from "@/components/Footer";
import { Product } from "@/lib/data";
import { fetchProducts } from "@/lib/api";

export default function AdminDashboard() {
 const [products, setProducts] = useState<Product[]>([]);
 const [loading, setLoading] = useState(true);
 const [editingId, setEditingId] = useState<string | null>(null);

 // Form State for editing / adding
 const [formData, setFormData] = useState<Partial<Product>>({});

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

 const handleEdit = (product: Product) => {
  setEditingId(product.id);
  setFormData(product);
 };

 const handleSave = () => {
  if (editingId) {
   setProducts(prev => prev.map(p => p.id === editingId ? { ...p, ...formData } as Product : p));
  }
  setEditingId(null);
  setFormData({});
 };

 const handleDelete = (id: string) => {
  setProducts(prev => prev.filter(p => p.id !== id));
 };

 // Mock functions waiting for backend
 const handleAddNew = () => {
   alert("This will add a new product once the backend database is connected!");
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
          {products.map((p) => (
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
              className="text-xs font-semibold text-muted-foreground hover:text-foreground px-3 py-1.5 rounded border border-border"
             >
              Edit
             </button>
             <button
              onClick={() => handleDelete(p.id)}
              className="text-xs font-semibold text-red-500 hover:text-red-600 px-3 py-1.5 rounded border border-red-200 hover:border-red-300"
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
    )}
   </main>

   <Footer />
  </div>
 );
}
