// src/app/admin/blog/create/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createPost } from '@/services/api';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const RichTextEditor = dynamic(() => import('@/components/RichTextEditor'), { ssr: false });

export default function CreatePostPage() {
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [tags, setTags] = useState('');
  const [status, setStatus] = useState('Published');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const tagsArray = tags.split(',').map(t => t.trim()).filter(Boolean);
      await createPost({ title, excerpt, content, category, imageUrl, tags: tagsArray, status });
      router.push('/admin/blog');
    } catch (err) {
      const e = err as { response?: { data?: { message?: string } } };
      setError(e?.response?.data?.message || 'Failed to create post. Please try again.');
    }
  };

  const inputClass = 'block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3';
  const labelClass = 'block text-sm font-medium leading-6 text-gray-900 mb-1';

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Create New Post</h1>
        <Link href="/admin/blog" className="text-sm text-indigo-600 hover:text-indigo-500">← Back to posts</Link>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6 bg-white shadow-sm rounded-xl p-8">
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div>
          <label className={labelClass}>Title *</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className={inputClass} required />
        </div>
        <div>
          <label className={labelClass}>Excerpt</label>
          <input type="text" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} className={inputClass} placeholder="Short summary of the post" />
        </div>
        <div>
          <label className={labelClass}>Category</label>
          <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} className={inputClass} placeholder="e.g. Technology, News" />
        </div>
        <div>
          <label className={labelClass}>Cover Image URL</label>
          <input type="url" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className={inputClass} placeholder="https://..." />
        </div>
        <div>
          <label className={labelClass}>Tags (comma-separated)</label>
          <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} className={inputClass} placeholder="nextjs, react, typescript" />
        </div>
        <div>
          <label className={labelClass}>Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)} className={inputClass}>
            <option value="Published">Published</option>
            <option value="Draft">Draft</option>
          </select>
        </div>
        <div>
          <label className={labelClass}>Content *</label>
          <RichTextEditor value={content} onChange={setContent} />
        </div>
        <div className="flex justify-end gap-4">
          <Link href="/admin/blog" className="rounded-md px-4 py-2 text-sm font-medium text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50">Cancel</Link>
          <button type="submit" className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">
            Create Post
          </button>
        </div>
      </form>
    </div>
  );
}
