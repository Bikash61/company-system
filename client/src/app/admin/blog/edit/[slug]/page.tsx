// src/app/admin/blog/edit/[slug]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getPostBySlug, updatePost } from '@/services/api';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const RichTextEditor = dynamic(() => import('@/components/RichTextEditor'), { ssr: false });

export default function EditPostPage({ params }: { params: { slug: string } }) {
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [tags, setTags] = useState('');
  const [status, setStatus] = useState('Published');
  const [postId, setPostId] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { slug } = params;

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const post = await getPostBySlug(slug);
        if (cancelled) return;
        setTitle(post.title);
        setExcerpt(post.excerpt || '');
        setContent(post.content);
        setCategory(post.category || '');
        setImageUrl(post.imageUrl || '');
        setTags((post.tags || []).join(', '));
        setStatus(post.status || 'Published');
        setPostId(post._id);
      } catch {
        if (!cancelled) setError('Failed to load post data.');
      }
    };
    load();
    return () => { cancelled = true; };
  }, [slug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const tagsArray = tags.split(',').map(t => t.trim()).filter(Boolean);
      await updatePost(postId, { title, excerpt, content, category, imageUrl, tags: tagsArray, status });
      router.push('/admin/blog');
    } catch (err) {
      const e = err as { response?: { data?: { message?: string } } };
      setError(e?.response?.data?.message || 'Failed to update post. Please try again.');
    }
  };

  const inputClass = 'block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3';
  const labelClass = 'block text-sm font-medium leading-6 text-gray-900 mb-1';

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Edit Post</h1>
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
          <input type="text" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Category</label>
          <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Cover Image URL</label>
          <input type="url" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Tags (comma-separated)</label>
          <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} className={inputClass} />
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
            Update Post
          </button>
        </div>
      </form>
    </div>
  );
}
