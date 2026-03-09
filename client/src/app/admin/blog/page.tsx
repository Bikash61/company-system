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
  author: {
    username: string;
  };
  createdAt: string;
}

export default function AdminBlogListPage() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await getPosts();
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Failed to fetch posts", error);
      }
    };
    fetchPosts();
  }, []);


  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Blog Posts</h1>
        <Link href="/admin/blog/create" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Create New Post
        </Link>
      </div>
      <div className="bg-white shadow-md rounded">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Author</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Created At</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-600 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {posts.map((post) => (
              <tr key={post._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link href={`/blog/${post.slug}`} className="text-blue-600 hover:underline">
                    {post.title}
                  </Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{post.author.username}</td>
                <td className="px-6 py-4 whitespace-nowrap">{new Date(post.createdAt).toLocaleDateString()}</td>
                <BlogActions postId={post._id} postSlug={post.slug} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
