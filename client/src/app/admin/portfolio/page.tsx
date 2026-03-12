// src/app/admin/portfolio/page.tsx
'use client';

import Link from 'next/link';
import { getPortfolioItems, deletePortfolioItem } from '@/services/api';
import { useEffect, useState } from 'react';

interface PortfolioItem {
  _id: string;
  title: string;
  description: string;
  tags: string[];
}

export default function AdminPortfolioListPage() {
  const [items, setItems] = useState<PortfolioItem[]>([]);

  const load = () => getPortfolioItems().then(setItems).catch(console.error);

  useEffect(() => { load(); }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this portfolio item?')) return;
    try {
      await deletePortfolioItem(id);
      load();
    } catch { alert('Failed to delete item.'); }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Portfolio Items</h1>
        <Link href="/admin/portfolio/create" className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">
          + Add Item
        </Link>
      </div>
      <div className="bg-white shadow-sm rounded-xl overflow-hidden ring-1 ring-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Tags</th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {items.length === 0 && (
              <tr><td colSpan={3} className="px-6 py-10 text-center text-gray-400">No portfolio items yet.</td></tr>
            )}
            {items.map((item) => (
              <tr key={item._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">{item.title}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{(item.tags || []).join(', ')}</td>
                <td className="px-6 py-4 text-right text-sm font-medium space-x-4">
                  <Link href={`/admin/portfolio/edit/${item._id}`} className="text-indigo-600 hover:text-indigo-900">Edit</Link>
                  <button onClick={() => handleDelete(item._id)} className="text-red-600 hover:text-red-900">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
