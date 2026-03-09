'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { deletePost } from '@/services/api';

interface BlogActionsProps {
  postId: string;
  postSlug: string;
}

export default function BlogActions({ postId, postSlug }: BlogActionsProps) {
  const router = useRouter();

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/auth/login');
          return;
        }
        await deletePost(postId, token);
        // Refresh the page to see the updated list
        router.refresh();
      } catch (error) {
        console.error('Failed to delete post', error);
        alert('Failed to delete post. Please try again.');
      }
    }
  };

  return (
    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
      <Link href={`/admin/blog/edit/${postSlug}`} className="text-indigo-600 hover:text-indigo-900 mr-4">
        Edit
      </Link>
      <button onClick={handleDelete} className="text-red-600 hover:text-red-900">
        Delete
      </button>
    </td>
  );
}
