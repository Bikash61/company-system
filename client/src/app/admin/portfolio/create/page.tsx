// src/app/admin/portfolio/create/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createPortfolioItem } from '@/services/api';
import Link from 'next/link';

export default function CreatePortfolioItemPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [projectUrl, setProjectUrl] = useState('');
  const [tags, setTags] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const tagsArray = tags.split(',').map(t => t.trim()).filter(Boolean);
      await createPortfolioItem({ title, description, imageUrl, projectUrl, tags: tagsArray });
      router.push('/admin/portfolio');
    } catch (err) {
      const e = err as { response?: { data?: { message?: string } } };
      setError(e?.response?.data?.message || 'Failed to create item.');
    }
  };

  const inp = 'block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3';

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Add Portfolio Item</h1>
        <Link href="/admin/portfolio" className="text-sm text-indigo-600 hover:text-indigo-500">← Back</Link>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6 bg-white shadow-sm rounded-xl p-8">
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div><label className="block text-sm font-medium text-gray-900 mb-1">Title *</label><input type="text" value={title} onChange={e => setTitle(e.target.value)} className={inp} required /></div>
        <div><label className="block text-sm font-medium text-gray-900 mb-1">Description *</label><textarea value={description} onChange={e => setDescription(e.target.value)} className={`${inp} h-28`} required /></div>
        <div><label className="block text-sm font-medium text-gray-900 mb-1">Image URL *</label><input type="url" value={imageUrl} onChange={e => setImageUrl(e.target.value)} className={inp} required /></div>
        <div><label className="block text-sm font-medium text-gray-900 mb-1">Project URL</label><input type="url" value={projectUrl} onChange={e => setProjectUrl(e.target.value)} className={inp} placeholder="https://..." /></div>
        <div><label className="block text-sm font-medium text-gray-900 mb-1">Tags (comma-separated)</label><input type="text" value={tags} onChange={e => setTags(e.target.value)} className={inp} placeholder="react, nextjs" /></div>
        <div className="flex justify-end gap-4">
          <Link href="/admin/portfolio" className="rounded-md px-4 py-2 text-sm font-medium text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50">Cancel</Link>
          <button type="submit" className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">Add Item</button>
        </div>
      </form>
    </div>
  );
}
