// src/app/admin/blog/page.tsx
'use client';

import Link from 'next/link';
import { getPosts } from '@/services/api';
import { useEffect, useState } from 'react';
import BlogActions from './BlogActions';

interface Post {
  _id: string;
  title: string;
  slug: string;
  status: string;
  category: string;
  author: { name: string };
  createdAt: string;
}

export default function AdminBlogListPage() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    getPosts().then(setPosts).catch(console.error);
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Blog Posts</h1>
        <Link href="/admin/blog/create" className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">
          + New Post
        </Link>
      </div>
      <div className="bg-white shadow-sm rounded-xl overflow-hidden ring-1 ring-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Author</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {posts.length === 0 && (
              <tr><td colSpan={6} className="px-6 py-10 text-center text-gray-400">No posts yet. Create your first one!</td></tr>
            )}
            {posts.map((post) => (
              <tr key={post._id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <Link href={`/blog/${post.slug}`} className="font-medium text-indigo-600 hover:underline" target="_blank">
                    {post.title}
                  </Link>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">{post.category || '—'}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    post.status === 'Published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>{post.status || 'Published'}</span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">{post.author?.name || '—'}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{new Date(post.createdAt).toLocaleDateString()}</td>
                <BlogActions postId={post._id} postSlug={post.slug} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
