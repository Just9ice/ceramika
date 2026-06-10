'use client';

import React, { useState } from 'react';
import Navbar from "@/components/navbar";
import Footer from "@/components/Footer";
import { PRODUCTS, Product } from "@/lib/data";

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [editingId, setEditingId] = useState<number | null>(null);

  // Form State for editing / adding
  const [formData, setFormData] = useState<Partial<Product>>({});

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

  const handleDelete = (id: number) => {
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
        <div className="flex items-center justify-between mb-8 border-b border-border/50 pb-6">
          <div>
            <h1 className="text-3xl font-black text-foreground" style={{ fontFamily: "'Georgia', serif" }}>Admin Dashboard</h1>
            <p className="text-muted-foreground text-sm mt-1">Manage your inventory, prices, and bestsellers. (UI Mockup for Backend Devs)</p>
          </div>
          <button onClick={handleAddNew} className="bg-[#25d366] hover:bg-[#1fb859] text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-sm transition-colors">
            + Add New Product
          </button>
        </div>

        <div className="bg-card border border-border shadow-sm rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-muted-foreground">
              <thead className="bg-muted text-xs uppercase font-bold text-foreground/70 border-b border-border">
                <tr>
                  <th className="px-6 py-4">Image</th>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Price (₦)</th>
                  <th className="px-6 py-4">Tag</th>
                  <th className="px-6 py-4">Stock</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${product.gradient} border border-border/50 shrink-0`}></div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-foreground">
                      {editingId === product.id ? (
                        <input
                          className="w-full bg-input border border-border rounded px-2 py-1 text-sm focus:border-accent outline-none"
                          value={formData.name || ''}
                          onChange={e => setFormData({ ...formData, name: e.target.value })}
                        />
                      ) : (
                        product.name
                      )}
                    </td>
                    <td className="px-6 py-4">
                       {editingId === product.id ? (
                        <input
                          type="number"
                          className="w-24 bg-input border border-border rounded px-2 py-1 text-sm focus:border-accent outline-none"
                          value={formData.pricePerSqm || 0}
                          onChange={e => setFormData({ ...formData, pricePerSqm: Number(e.target.value) })}
                        />
                      ) : (
                         `₦${product.pricePerSqm.toLocaleString()}`
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {editingId === product.id ? (
                        <select
                          className="bg-input border border-border rounded px-2 py-1 text-sm focus:border-accent outline-none"
                          value={formData.tag || ''}
                          onChange={e => setFormData({ ...formData, tag: e.target.value })}
                        >
                          <option value="">None</option>
                          <option value="Bestseller">Bestseller</option>
                          <option value="Sale">Sale</option>
                          <option value="New">New</option>
                          <option value="Premium">Premium</option>
                          <option value="Luxury">Luxury</option>
                        </select>
                      ) : (
                        <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${product.tag ? 'border border-border bg-muted text-foreground' : 'text-muted-foreground'}`}>
                          {product.tag || 'No Tag'}
                        </span>
                      )}
                    </td>
                     <td className="px-6 py-4">
                      {editingId === product.id ? (
                        <input
                          type="checkbox"
                          className="w-4 h-4 rounded focus:ring-accent accent-primary"
                          checked={formData.inStock}
                          onChange={e => setFormData({ ...formData, inStock: e.target.checked })}
                        />
                      ) : (
                         <span className={product.inStock ? 'text-green-500 font-semibold' : 'text-red-500 font-semibold'}>
                           {product.inStock ? 'In Stock' : 'Out of Stock'}
                         </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      {editingId === product.id ? (
                         <button onClick={handleSave} className="text-xs font-bold bg-[#25d366] hover:bg-[#1fb859] text-white px-3 py-1.5 rounded-lg transition-colors">
                           Save
                         </button>
                      ) : (
                        <div className="flex items-center justify-end gap-3">
                           <button onClick={() => handleEdit(product)} className="text-xs font-bold text-accent hover:underline">
                            Edit
                          </button>
                          <button onClick={() => handleDelete(product.id)} className="text-xs font-bold text-destructive hover:underline">
                            Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
