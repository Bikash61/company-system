// src/app/admin/portfolio/PortfolioActions.tsx
'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { deletePortfolioItem } from '@/services/api';

interface PortfolioActionsProps {
  itemId: string;
}

export default function PortfolioActions({ itemId }: PortfolioActionsProps) {
  const router = useRouter();

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/auth/login');
          return;
        }
        await deletePortfolioItem(itemId, token);
        router.refresh();
      } catch (error) {
        console.error('Failed to delete item', error);
        alert('Failed to delete item. Please try again.');
      }
    }
  };

  return (
    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
      <Link href={`/admin/portfolio/edit/${itemId}`} className="text-indigo-600 hover:text-indigo-900 mr-4">
        Edit
      </Link>
      <button onClick={handleDelete} className="text-red-600 hover:text-red-900">
        Delete
      </button>
    </td>
  );
}
