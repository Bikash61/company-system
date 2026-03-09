// src/app/admin/portfolio/page.tsx
'use client';

import Link from 'next/link';
import { getPortfolioItems } from '@/services/api';
import { useEffect, useState } from 'react';
import PortfolioActions from './PortfolioActions';

interface PortfolioItem {
  _id: string;
  title: string;
  imageUrl: string;
  projectUrl?: string;
}

export default function AdminPortfolioListPage() {
  const [items, setItems] = useState<PortfolioItem[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const fetchedItems = await getPortfolioItems();
        setItems(fetchedItems);
      } catch (error) {
        console.error("Failed to fetch portfolio items", error);
      }
    };
    fetchItems();
  }, []);


  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Portfolio</h1>
        <Link href="/admin/portfolio/create" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add New Item
        </Link>
      </div>
      <div className="bg-white shadow-md rounded">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-600 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {items.map((item) => (
              <tr key={item._id}>
                <td className="px-6 py-4 whitespace-nowrap">{item.title}</td>
                <PortfolioActions itemId={item._id} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
