// src/app/admin/blog/edit/[slug]/page.tsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { getPostBySlug, updatePost } from '@/services/api';

export default function EditPostPage({ params }: { params: { slug: string } }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [postId, setPostId] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { slug } = params;

  const fetchPost = useCallback(async () => {
    try {
      const post = await getPostBySlug(slug);
      setTitle(post.title);
      setContent(post.content);
      setPostId(post._id);
    } catch (err) {
      setError('Failed to load post data.');
    }
  }, [slug]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('You must be logged in to update a post.');
        router.push('/auth/login');
        return;
      }
      await updatePost(postId, { title, content }, token);
      router.push('/admin/blog');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update post. Please try again.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Edit Post</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline h-64"
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Update Post
          </button>
        </div>
      </form>
    </div>
  );
}
